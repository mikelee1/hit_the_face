//index.js
//获取应用实例
const app = getApp()
var timer = 7
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindButtonTap:function(event){
    console.log(event)
    wx.request({
      url: app.globalData.baseUrl+'/test',
      success: function (res) {
        console.log(res.data)
      },
      error:function(e){
        console.log(e)
      }
    })
  },

 changephoto:function(){
   var that = this
   wx.chooseImage({
     count: 1, // 默认9
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
       var tempFilePaths = res.tempFilePaths
       app.globalData.imgpath = tempFilePaths
       that.setData({
         imgpath: tempFilePaths
       })

     }
   })
 },

 search:function(){
    timer = 7
   var data1 = this.data.imgpath;
    wx.uploadFile({
      url: app.globalData.baseUrl + '/dopuploadimg/',
      filePath: data1[0],
      name: 'file',
      formData: {
        'userid': app.globalData.openid,
        'nickname':app.globalData.nickname
      },
      success:function(res){
        console.log(res)
        var resultimg = res.data
        var that = this
        if (resultimg == ''){
          wx.showToast({
            title: 'no suitable',
            duration: 4000
          })

        }else if (resultimg == 'no head'){
          wx.showToast({
            title: 'no head',
            duration: 4000
          })

        }else{
          app.globalData.inputimg = resultimg
          wx.navigateTo({
            url: '../result/result',
            success: function () {
              console.log(resultimg)
            }
          })
        }
      },
      fail:function(res){
        console.log(res.errMsg);
      },
    })
    minus(this)
 },

  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.imgpath)
      this.setData({
        imgpath: app.globalData.imgpath,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        openid:app.globalData.openid
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      
      app.userInfoReadyCallback = res => {
        app.globalData.nickname = res.userInfo.nickName;
        this.setData({
          imgpath: app.globalData.imgpath,
          userInfo: res.userInfo,
          hasUserInfo: true,
          openid: app.globalData.openid
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      imgpath:null,

    })
    
  }
})


function minus(that) {
  if (timer < 1) {
    // timer = 7
    // minus(that)
    console.log('out')
  } else {
    app.globalData.scrollimage = '/images/' + timer + '.jpg',
      timer = timer - 1,
      console.log(timer)
    setTimeout(function () {
      that.setData({
        scrollimage: app.globalData.scrollimage
      })
      minus(that)
    }, 100)
  }
}