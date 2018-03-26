const app = getApp()
var timer = 49
var close = false
Page({
  data: {
    avatar: app.globalData.avatar,
    headimgpath: app.globalData.headimgpath,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showIf: '',
        chooseimagebut:app.globalData.chooseimagebut,
        array:['prank','normal'],
        index:0,
        items: [
          { name: 'prank', value: 'prank', checked: 'true' },
          { name: 'normal', value: 'normal'},
        ],
        prank:true
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value=='normal'){
      app.globalData.prank=false
      app.globalData.items =  [
          { name: 'prank', value: 'prank' },
          { name: 'normal', value: 'normal', checked: 'true'},
        ]
   
    }else{
      app.globalData.prank = true
      app.globalData.items =   [
          { name: 'prank', value: 'prank', checked: 'true' },
          { name: 'normal', value: 'normal' },
        ]
      

    }
  },


  upload() {
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success(res) {
        const src = res.tempFilePaths[0]
        wx.redirectTo({
          url: `../upload/upload?src=${src}`
        })
      }
    })
  },




  pranksearch: function () {
    this.setData({
      showIf: 'show'
    })
  var that = this
    close = false
    timer = 49
    var data1 = app.globalData.headimgpath;

    wx.uploadFile({
      url: app.globalData.baseUrl + '/prankuploadimg/',
      filePath: data1,
      name: 'file',
      formData: {
        'userid': app.globalData.openid,
        'nickname': app.globalData.nickname
      },
      success: function (res) {
        that.setData({ chooseimagebut: false })
        close = true
        console.log(app.globalData.openid)
        console.log(res)
        if (res.data == 'userid is not avaiable') {
          wx.showToast({
            title: 'userid is not avaiable',
          })
        }
        var result = JSON.parse(res.data)
        var resultimg = result.msg
        var test = result.test

        console.log(test)
        if (resultimg == 'no head') {
          wx.showToast({
            title: '照片中无人脸',
            duration: 4000
          })

        } else if (resultimg == '') {
          wx.showToast({
            title: '未找到匹配照',
            duration: 4000
          })

        } else {
          app.globalData.inputimg = resultimg;
          app.globalData.totalnum = result.totalnum;
          wx.navigateTo({
            url: '../share/share',
            success: function () {
              console.log(resultimg)
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      },
    })
    minus(this)
  },



 search:function(){
   this.setData({
     showIf: 'show'
   })
   var that = this
   close = false
    timer = 49
    var data1 = app.globalData.headimgpath;

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
        console.log(app.globalData.openid)
        console.log(res)
        if (res.data =='userid is not avaiable'){
          wx.showToast({
            title: 'userid is not avaiable',
          })
          that.setData({ chooseimagebut: false })
        }
        var result = JSON.parse(res.data)
        var resultimg = result.msg
        var test = result.test
        that.setData({ chooseimagebut: false })
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
            url: '../share/share',
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
      headimgpath: app.globalData.headimgpath,
      items: app.globalData.items
    })
    app.globalData.chooseimagebut = false
  },


  onLoad: function (options) {
    console.log(options)
    var that = this
    if (options.startsearch != null){
      that.setData({chooseimagebut:true})
      if (app.globalData.prank){
        this.pranksearch()
      }else{
        this.search()
      }

    }else{




      this.setData({ chooseimagebut: false })
      if (app.globalData.userInfo) {
        this.setData({
          headimgpath: app.globalData.headimgpath,
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          openid: app.globalData.openid
        })
      } else if (this.data.canIUse) {
        console.log('111')
        app.userInfoReadyCallback = res => {
          console.log(res);
          console.log('chose')
          app.globalData.nickname = res.userInfo.nickName;
          this.setData({
            avatar: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
            openid: app.globalData.openid
          })

          wx.getImageInfo({
            src: that.data.avatar,
            success: function (res) {
              console.log(res)
              console.log(res.path)
              app.globalData.avatarcache = res.path
            }
          })


        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        console.log('222')
        this.data.headimgpath = app.globalData.headimgpath,
          wx.getUserInfo({
            success: res => {
              console.log(res)
              that.setData({
                avatar:res.userInfo.avatarUrl
              })
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })

              wx.getImageInfo({
                src: that.data.avatar,
                success: function (res) {
                  console.log(res)
                  console.log(res.path)
                  app.globalData.avatarcache = res.path
                }
              })

            }
          })
      }
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      avatar:null,
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
        timer = 49
      }
    setTimeout(function () {
      that.setData({
        scrollimage: app.globalData.scrollimage
      })
      minus(that)
    }, 20)
  }
}