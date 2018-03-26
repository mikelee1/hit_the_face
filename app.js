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
        wx.request({
          data: { js_code: res.code},
          url: this.globalData.baseUrl +'/dopgetopenid/',
          method: 'GET',
          success: function (res) {
            OPEN_ID = res.data; 

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

        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {

              this.globalData.userInfo = res.userInfo
              this.globalData.avatar = res.userInfo.avatarUrl
              
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
              that.globalData.avatar = userInfo.avatarUrl
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
                        that.globalData.avatar = userInfo.avatarUrl
                        getCurrentPages()[0].onShow()
                      }
                    })
                  }
                }, fail: function (res) {
  
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
    avatar:'',
    headimgpath:'',
    session_key:null,
    openid:null,
    nickname:null,
    scrollimage:null,
    qrpath: null,
    moneyqr:null,
    screenwidth :wx.getSystemInfoSync().windowWidth,
    screenheight:wx.getSystemInfoSync().windowHeight,
    totalnum:0,
    chooseimagebut:true,
    prank:true,
    items: [
      { name: 'prank', value: 'prank', checked: 'true' },
      { name: 'normal', value: 'normal' },
    ],
    avatarcache:''
  }
})


function loading(that){

    if (that.globalData.openid) {
      wx.showToast({
        title: 'load complete!',
      })
      // wx.hideToast()
      that.globalData.chooseimagebut=false
      getCurrentPages()[0].onShow()    //////////////////////Cannot read property 'onShow' of undefined;
        
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
