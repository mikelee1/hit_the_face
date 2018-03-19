//index.js
//获取应用实例
const app = getApp()
var timer = 15
var close = false
Page({
  data: {
    imgpath: app.globalData.imgpath,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showIf: ''//新增的
  },
  
  upload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },
  //事件处理函数
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

   this.setData({//新增
     showIf: 'show'
   })

   close = false
    timer = 7
   var data1 = app.globalData.imgpath;
   console.log(data1)
    wx.uploadFile({
      url: app.globalData.baseUrl + '/dopuploadimg/',
      filePath: data1,
      name: 'file',
      formData: {
        'userid': app.globalData.openid,
        'nickname':app.globalData.nickname
      },
      success:function(res){
        close = true
        console.log(res)
        var result = JSON.parse(res.data)
        var resultimg = result.msg
        var test = result.test
        var that = this
        console.log(test)
        if (resultimg == 'no head'){
          wx.showToast({
            title: '照片中无人脸',
            duration: 4000
          })

        }else if (resultimg == ''){
          wx.showToast({
            title: '未找到匹配照',
            duration: 4000
          })

        }else{
          app.globalData.inputimg = resultimg;
          app.globalData.totalnum = result.totalnum;
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
 onShow:function(){
   this.setData({
     imgpath:app.globalData.imgpath
   })
 },
  onLoad: function () {

    if (app.globalData.userInfo) {
      console.log('333')
      console.log(app)
      this.setData({
        imgpath: app.globalData.imgpath,
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        openid:app.globalData.openid
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log('111')
      app.userInfoReadyCallback = res => {
        console.log(res);
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
      console.log('222')
      this.data.imgpath = app.globalData.imgpath,
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
  if (close) {
    app.globalData.scrollimage = '/images/4.jpg',
      that.setData({
        scrollimage: app.globalData.scrollimage
      })
  } else {
      app.globalData.scrollimage = '/images/' + timer + '.jpg',
      timer = timer - 1;
      if (timer < 1){
        timer = 7
      }
    setTimeout(function () {
      that.setData({
        scrollimage: app.globalData.scrollimage
      })
      minus(that)
    }, 100)
  }
}