App({
  globalData: {
    userInfo: null,
    baseUrl: 'https://www.liyuanye.club',
    inputimg: null,
    avatar: '',
    headimgpath: '',
    session_key: null,
    openid: null,
    nickname: null,
    scrollimage: null,
    qrpath: null,
    moneyqr: null,
    screenwidth: wx.getSystemInfoSync().windowWidth,
    screenheight: wx.getSystemInfoSync().windowHeight,
    totalnum: 0,
    chooseimagebut: true,
    prank: true,
    rate:0,
    humword:'',
    items: [
      { name: 'prank', value: '整蛊版', checked: 'true' },
      { name: 'normal', value: '正常版' },
    ],
    avatarcache: ''
  },



  onLaunch: function () {
    var that = this;
    
    wx.login({
      success: res => {
        wx.request({
          data: { js_code: res.code},
          url: this.globalData.baseUrl +'/dopgetopenid/',
          method: 'GET',
          success: function (res) {
              that.globalData.openid = res.data; 
          },
          fail:function(e){
          }
        })
      }
    })
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
              that.globalData.avatar = res.userInfo.avatarUrl
              getCurrentPages()[0].onShow()

            },
            fail:function(){
                      wx.showModal({
                        cancelText:'拒绝授权',
                        confirmText: '确定授权',
                        title: '提示',
                        content: '您点击了拒绝授权,将无法体验,退出后重新获取授权。',
                        success: function (res) {
                          if (res.confirm) {
                            wx.openSetting({
                              success: (res) => {
                                res.authSetting["scope.userInfo"] = true
                                if (res.authSetting["scope.userInfo"]) {
                                  wx.getUserInfo({
                                    success: function (res) {
                                      loading(that)
                                      that.globalData.avatar = res.userInfo.avatarUrl
                                      getCurrentPages()[0].onShow()
                                    }
                                  })
                                }
                              }, fail: function (res) {
          
                              }
                            })
                          }else{
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
})


function loading(that){
    if (that.globalData.openid) {
      wx.showToast({
        title: 'load complete!',
      })
      that.globalData.chooseimagebut=false
      getCurrentPages()[0].onShow()
    } else {
      setTimeout(function () {
        wx.showLoading({
          title: 'loading',
        })
        loading(that)
      }, 100)
    }
}
