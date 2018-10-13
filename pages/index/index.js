const app = getApp()
var timer = 48
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
    chooseimagebut: app.globalData.chooseimagebut,
    array: ['prank', 'normal'],
    index: 0,
    items: [
      { name: 'prank', value: '整蛊版', checked: 'true' },
      { name: 'normal', value: '素人版' },
      { name: 'star', value: '明星版' },
    ],
    prank: true,
    sharepagedoor: app.globalData.sharepagedoor

  },

  radioChange: function (e) {
    if (e.detail.value == 'normal') {
      app.globalData.prank = false
      app.globalData.star = false
      app.globalData.items = [
        { name: 'prank', value: '整蛊版' },
        { name: 'normal', value: '素人版', checked: 'true' },
        { name: 'star', value: '明星版' },
      ]

    } else if (e.detail.value == 'prank'){
      app.globalData.prank = true
      app.globalData.star = false
      app.globalData.items = [
        { name: 'prank', value: '整蛊版', checked: 'true' },
        { name: 'normal', value: '素人版' },
        { name: 'star', value: '明星版' },
      ]
    }
    else if (e.detail.value == 'star') {
      app.globalData.star = true
      app.globalData.prank = false
      app.globalData.items = [
        { name: 'prank', value: '整蛊版' },
        { name: 'normal', value: '素人版' },
        { name: 'star', value: '明星版', checked: 'true' },
      ]
    }
  },


  tosharepage: function () {

    wx.navigateTo({
      url: '../share/share?cachedoor=true',
    })
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
    timer = 48
    var data1 = app.globalData.headimgpath;

    wx.uploadFile({
      url: app.globalData.baseUrl + '/prankuploadimg/',
      filePath: data1,
      name: 'file',
      formData: {
        'userid': app.globalData.openid,
        'nickname': app.globalData.nickname,
        'avatar': app.globalData.avatar
      },
      success: function (res) {
        console.log("upload success")
        close = true
        if (res.data == 'userid is not avaiable') {
          wx.showToast({
            title: 'userid is not avaiable',
          })
        }
        var result = JSON.parse(res.data)
        var resultimg = result.msg
        var test = result.test
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
          app.globalData.rate = result.msg[0].rate
          app.globalData.humword = result.msg[0].humword
          wx.navigateTo({
            url: '../share/share',
            success: function () {

            }
          })
        }
        that.setData({ chooseimagebut: false })
      },
      fail: function (res) {
      },
    })
    wx.showToast({
      title: '等待15秒~',
    }, 6000)
    minus(this)
  },



  search: function () {
    this.setData({
      showIf: 'show'
    })
    var that = this
    close = false
    timer = 48
    var data1 = app.globalData.headimgpath;

    wx.uploadFile({
      url: app.globalData.baseUrl + '/dopuploadimg/',
      filePath: data1,
      name: 'file',
      formData: {
        'userid': app.globalData.openid,
        'nickname': app.globalData.nickname,
        'avatar': app.globalData.avatar
      },
      success: function (res) {

        close = true

        var result = JSON.parse(res.data)
        var resultimg = result.msg
        var signal = result.signal
        var test = result.test
        if (result.msg == '400') {
          wx.showToast({
            title: '服务器升级中...',
          })
          that.setData({ chooseimagebut: false })
        }
        else {
          if (resultimg == 'no head') {
            wx.showToast({
              title: '照片中无人脸',
              duration: 4000
            })

          } else if (signal == 'false') {
            wx.showToast({
              title: '未找到匹配照',
              duration: 4000
            })
            app.globalData.inputimg = resultimg;
            app.globalData.rate = result.msg[0].rate;
            app.globalData.humword = result.msg[0].humword
            wx.navigateTo({
              url: '../share/share',
              success: function () {

              }
            })
          } else {
            app.globalData.inputimg = resultimg;
            app.globalData.totalnum = result.totalnum;
            app.globalData.rate = result.msg[0].rate;
            app.globalData.humword = result.msg[0].humword
            wx.navigateTo({
              url: '../share/share',
              success: function () {
              }
            })
          }
          that.setData({ chooseimagebut: false })

        }

      },
      fail: function (res) {
      },
    })
    wx.showToast({
      title: '等待15秒~',
    },6000)
    minus(this)
  },










  starsearch: function () {
    this.setData({
      showIf: 'show'
    })
    var that = this
    close = false
    timer = 48
    var data1 = app.globalData.headimgpath;

    wx.uploadFile({
      url: app.globalData.baseUrl + '/staruploadimg/',
      filePath: data1,
      name: 'file',
      formData: {
        'userid': app.globalData.openid,
        'nickname': app.globalData.nickname,
        'avatar': app.globalData.avatar
      },
      success: function (res) {

        close = true

        var result = JSON.parse(res.data)
        var resultimg = result.msg
        var signal = result.signal
        var test = result.test
        if (result.msg == '400') {
          wx.showToast({
            title: '服务器升级中...',
          })
          that.setData({ chooseimagebut: false })
        }
        else {
          if (resultimg == 'no head') {
            wx.showToast({
              title: '照片中无人脸',
              duration: 4000
            })

          } else if (signal == 'false') {
            wx.showToast({
              title: '未找到匹配照',
              duration: 4000
            })
            app.globalData.inputimg = resultimg;
            app.globalData.rate = result.msg[0].rate;
            app.globalData.humword = result.msg[0].humword
            wx.navigateTo({
              url: '../share/share',
              success: function () {

              }
            })
          } else {
            app.globalData.inputimg = resultimg;
            app.globalData.totalnum = result.totalnum;
            app.globalData.rate = result.msg[0].rate;
            app.globalData.humword = result.msg[0].humword
            wx.navigateTo({
              url: '../share/share',
              success: function () {
              }
            })
          }
          that.setData({ chooseimagebut: false })

        }

      },
      fail: function (res) {
      },
    })
    wx.showToast({
      title: '等待15秒~',
    }, 6000)
    minus(this)
  },







  onShow: function () {
    this.setData({
      sharepagedoor: app.globalData.sharepagedoor,
      headimgpath: app.globalData.headimgpath,
      items: app.globalData.items
    })
    app.globalData.chooseimagebut = false
  },



  onLoad: function (options) {
    var that = this
    if (options.startsearch == null) {
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                app.globalData.avatar = res.userInfo.avatarUrl
                app.globalData.nickname = res.userInfo.nickName
                if (app.userInfoReadyCallback) {
                  app.userInfoReadyCallback(res)
                }
              }, complete: function (res) {

              }
            })
          }
          else {
            wx.navigateTo({
              url: '/pages/getuserinfo/getuserinfo',
            })
          }
        },
        fail: function (res) {
        }
      })
    }



    if (options.startsearch != null) {
      that.setData({ chooseimagebut: true })
      if (app.globalData.prank) {
        this.pranksearch()
      } else if (app.globalData.star) {
        this.starsearch()
      }else{
        this.search()
      }
    } else {
      loading(that)
      if (app.globalData.userInfo) {
        this.setData({
          headimgpath: app.globalData.headimgpath,
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
          openid: app.globalData.openid
        })
      } else if (this.data.canIUse) {

        app.userInfoReadyCallback = res => {
          app.globalData.nickname = res.userInfo.nickName;
          this.setData({
            avatar: res.userInfo.avatarUrl,
            userInfo: res.userInfo,
            hasUserInfo: true,
            openid: app.globalData.openid
          })

        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理

        this.data.headimgpath = app.globalData.headimgpath,
          wx.getUserInfo({
            success: res => {
              that.setData({
                avatar: res.userInfo.avatarUrl
              })
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })

            }
          })
      }
      this.setData({ chooseimagebut: false })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      avatar: null,
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
    if (timer < 1) {
      timer = 48
    }
    setTimeout(function () {
      that.setData({
        scrollimage: app.globalData.scrollimage
      })
      minus(that)
    }, 100)
  }
}





function loading(that) {
  if (app.globalData.openid) {
    wx.showToast({
      title: '加载完成~',
    })
    app.globalData.chooseimagebut = false
    that.onShow()
  } else {
    setTimeout(function () {
      wx.showLoading({
        title: '加载中',
      })
      loading(that)
    }, 100)
  }
}
