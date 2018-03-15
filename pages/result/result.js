// pages/result.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.inputimg){
      this.setData({
        imgpath:app.globalData.imgpath,
        inputimg: app.globalData.inputimg,
        moneyqr: app.globalData.moneyqr
      })
    }else{
      console.log('no images return')
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
    var imgmo = app.globalData.baseUrl + '/static/moneyqr.jpg';
    wx.previewImage({
      urls: imgmo.split(','),
      // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
    })
    // app.globalData.moneyqr='../../images/moneyqr.jpg'
    
  },


  // previewImage: function (e) {
  //   wx.previewImage({
  //     urls: this.data.scene.split(',')
  //     // 需要预览的图片http链接  使用split把字符串转数组。不然会报错  
  //   })
  // }  ,

  /**
   * 用户点击右上角分享
   */

  share:function(){
    wx.navigateTo({
      url: '../share/share',
    })
    wx.request({
      url: app.globalData.baseUrl +'/dopgetwxqrcode/',
      success:function(res){
        console.log(res.data)
        // app.globalData.qrpath = res.data
        app.globalData.qrpath = '../../images/qrcode.jpg'

      }
    })
  },

  onShareAppMessage: function () {

    return {

      title: '自定义分享标题',

      desc: '自定义分享描述',

      path: '/'

    }

  },


})