// pages/getuserinfo/getuserinfo.js
const app = getApp()
Page({

  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidewarning:true
  },
  bindGetUserInfo: function (e) {
    console.log(e)
    if(e.detail.userInfo){
      app.globalData.nickname = e.detail.userInfo.nickName
      app.globalData.avatar = e.detail.userInfo.avatarUrl
      wx.request({
        url: app.globalData.baseUrl + '/dopuploadimg/',
        method: 'post',
        data: { 'userid': app.globalData.openid, 'nickname': app.globalData.nickname, 'avatar': app.globalData.avatar },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      })
      wx.navigateBack({
      })
    }
  },

  nobindGetUserInfo: function (e) {
    console.log(app.globalData.baseurl)
    app.globalData.nickname = "路人甲"
    app.globalData.avatar = ""
    
    wx.request({
      url: app.globalData.baseUrl + '/dopuploadimg/',
      method: 'post',
      data: { 'userid': app.globalData.openid, 'nickname': app.globalData.nickname, 'avatar': app.globalData.avatar },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
    wx.navigateBack({
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.status == '1') {
      this.setData({
        hidewarning: false
      })

    }
  },


})