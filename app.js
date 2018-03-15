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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl:'https://www.liyuanye.club',
    // baseUrl: 'http://127.0.0.1:8091',
    inputimg:null,
    imgpath: '/images/igglybuff.png',
    session_key:null,
    openid:null,
    nickname:null,
    scrollimage:null,
    qrpath: null,
    moneyqr:null
  }
})