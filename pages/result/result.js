// pages/result.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalnum: app.globalData.totalnum,
    haveclick: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.inputimg){
      this.setData({
        totalnum:app.globalData.totalnum,
        avatar: app.globalData.avatar,
        inputimg: app.globalData.inputimg,
        moneyqr: app.globalData.moneyqr
      })
    }else{

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },






  money:function(){
    this.setData({
      haveclick:true
    })

    this.setData({
      totalnum:this.data.totalnum+1
    })

    wx.request({
      url: app.globalData.baseUrl + '/dopupdatethumbup/',
      
      data: { wxid: app.globalData.openid,thumb:'true'},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },  
      method:'post',
      success:function(){
    
      }
      
    })


  },

  imgclick: function (event) {

    var imgm = event.currentTarget.dataset.id;
    wx.previewImage({
      urls: imgm.split(','),
    })
  },

  /**
   * 用户点击右上角分享
   */

  share:function(){
    app.globalData.qrpath = '../../images/qrcode.jpg'
    wx.navigateTo({
      url: '../share/share',
    })
        // app.globalData.qrpath = res.data
  },

  onShareAppMessage: function () {

    return {

      title: '自定义分享标题',

      desc: '自定义分享描述',

      path: '/'

    }

  },




})