var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key  
//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          //获取openid接口  
          data: { js_code: res.code},
          url: this.globalData.baseUrl +'/dopgetopenid/',
          method: 'GET',
          success: function (res) {
            OPEN_ID = res.data;//获取到的openid  
            console.log(res.data)
            that.globalData.openid = OPEN_ID
          },
          fail:function(e){
            console.log(e)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.imgpath = res.userInfo.avatarUrl
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }, complete: function (res) {


            }
          })
          loading(that)
        }
        else{
          wx.getUserInfo({
            success: function (res) {
              loading(that)
              var userInfo = res.userInfo;
              that.globalData.imgpath = userInfo.avatarUrl
              getCurrentPages()[0].onShow()

            },
            fail:function(){
              console.log('fail to access userinfo')
                      wx.showModal({
                        cancelText:'jujue',
                        confirmText:'shouquan',
                        title: '提示',
                        content: '您点击了拒绝授权,将无法体验,退出后重新获取授权。',

          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  res.authSetting["scope.userInfo"] = true
                  if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                    wx.getUserInfo({
                      success: function (res) {
                        loading(that)
                        var userInfo = res.userInfo;
                        that.globalData.imgpath = userInfo.avatarUrl
                        getCurrentPages()[0].onShow()
                      }
                    })
                  }
                }, fail: function (res) {
                    console.log(res)
                    console.log('u r forbidden')
                }
              })
            }else{
              console.log('tui chu')
              wx.redirectTo({
                url: '../index/index'
              })
            }
          }
        })
            }
            
          })

        }

      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl:'https://www.liyuanye.club',
    inputimg:null,
    // imgpath: '/images/igglybuff.png',
    imgpath:'',
    session_key:null,
    openid:null,
    nickname:null,
    scrollimage:null,
    qrpath: null,
    moneyqr:null,
    screenwidth :wx.getSystemInfoSync().windowWidth,
    screenheight:wx.getSystemInfoSync().windowHeight,
    totalnum:0,
    chooseimagebut:true
  }
})


function loading(that){

    if (that.globalData.openid) {
      wx.showToast({
        title: 'load complete!',
      })
      // wx.hideToast()
      that.globalData.chooseimagebut=false
      getCurrentPages()[0].onShow()
        
    } else {

      setTimeout(function () {
        wx.showLoading({
          title: 'loading',
        })
        // wx.hideLoading()
        loading(that)
      }, 100)
    }
}
