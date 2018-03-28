import util from '../../utils/util'

const app = getApp();
var width = app.globalData.screenwidth
var height = app.globalData.screenheight


Page({
  
  data: {
    windowWidth: width,
    windowHeight:0.9* height,
    contentHeight: 0,
    thinkList: [],
    footer: '',
    offset: 0,
    lineHeight: 30,
    content: '',
    cachedoor:false
  },
 


  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
  },
  onLoad: function (options) {
  if (options.cachedoor=='true'){
    this.setData({
      cachedoor:true
    })
  }else{
    this.setData({
      cachedoor: false
    })
    wx.showLoading({
      title: '耐心等待几秒钟,答案马上揭晓...',
    })

  }

    var that = this;
    app.globalData.sharepagedoor = true
  },

//   onShow: function () {

//     // wx.downloadFile({
//     //   url: app.globalData.baseUrl + '/static/avatar/'+app.globalData.openid+'.jpg',
//     //   success: function (res) {
//     //    var avatarimg = res.tempFilePath

//     //     wx.downloadFile({
//     //       url: app.globalData.inputimg[0]['img'],
//     //       success: function (res) {


//             const ctx = wx.createCanvasContext('myCanvas');
//             // var leftimg = app.globalData.headimgpath;
//             // var rightimg = res.tempFilePath;
//             var leftimg = '../../images/1.jpg'
//             var rightimg = '../../images/3.jpg'

//             // var avatar = avatarimg;
//             var avatar = '../../images/2.jpg';

//             var qrPath = '../../images/qrcode2.jpg'
//             var bgImga = '../../images/back1.jpg'
//             var similarpic = '../../images/similar.jpg'
//             var picsize = 0.4
//             // var nickname = app.globalData.nickname
//             var nickname = 'xxxxxx'
//             // var rate = app.globalData.rate
//             var rate = '99%'
//             // var humword = app.globalData.humword
//             var humword = '哈哈,翻出了你的旧照'

//             ctx.drawImage(bgImga, 0.05 * width, 0.05 * height, 0.9 * width, 0.9 * height); //背景
//             ctx.drawImage(similarpic, 0.13 * width, 0.25 * width, 0.5*width, 0.11*width)
//             ctx.font = "45px Arial";
//             ctx.setFillStyle('red')
//             ctx.fillText(rate, 0.65 * width, 0.35 * width);


//             ctx.drawImage(leftimg, 0.07 * width, 0.25 * height, picsize * width, picsize * width);
//             ctx.drawImage(rightimg, 0.53 * width, 0.25 * height, picsize * width, picsize * width);

//             ctx.drawImage(avatar, 30, 0.3 * height + picsize * width, 60, 60);
//             ctx.drawImage(qrPath, 0.65 * width, 0.65 * height + 20, 0.25 * width, 0.25 * width);

//             ctx.font = "18rpx Arial";
//             ctx.setFillStyle('#8B4789')
//             ctx.fillText(nickname, 100, 0.3 * height + picsize * width+27)
//             ctx.fillText(humword, 30, 0.3 * height + picsize * width+100);
//             ctx.font = "12rpx Arial";
//             ctx.setFillStyle('black');
//             ctx.fillText('长按扫码查看和你最像的人', 40, 0.8 * height)
//             ctx.draw()
//       //     }
//       //   })


//       // }})

// },



  onShow: function () {



  if(this.data.cachedoor){
var rightimgcache;
var avatarimgcache;
    rightimgcache=wx.getStorageSync( 'rightimg' )

    avatarimgcache=wx.getStorageSync( 'avatarimg')

            const ctx = wx.createCanvasContext('myCanvas');
            var leftimg = app.globalData.headimgpath;
            var rightimg = rightimgcache;
            var avatar = avatarimgcache;
            var qrPath = '../../images/qrcode2.jpg'
            var bgImga = '../../images/share222.jpg'
            var similarpic = '../../images/similar.jpg'
            var picsize = 0.4
            var nickname = app.globalData.nickname
            var rate = app.globalData.rate
            var humword = app.globalData.humword
            ctx.drawImage(bgImga,  0, 0,  width, height); //背景
            ctx.drawImage(similarpic, 0.13 * width, 0.25 * width, 0.5 * width, 0.11 * width)
            ctx.font = "45px Arial";
            ctx.setFillStyle('red')
            ctx.fillText(rate, 0.65 * width, 0.35 * width);


            ctx.drawImage(leftimg, 0.07 * width, 0.25 * height, picsize * width, picsize * width);
            ctx.drawImage(rightimg, 0.53 * width, 0.25 * height, picsize * width, picsize * width);

            ctx.drawImage(avatar, 30, 0.3 * height + picsize * width, 60, 60);
            ctx.drawImage(qrPath, 0.75 * width, 0.9 * height - 0.25 * width, 0.25 * width, 0.25 * width);//////////////////////////////

            ctx.font = "18rpx Arial";
            ctx.setFillStyle('#8B4789')
            ctx.fillText(nickname, 100, 0.3 * height + picsize * width + 27)
            ctx.fillText(humword, 30, 0.3 * height + picsize * width + 100);
            ctx.font = "12rpx Arial";
            ctx.setFillStyle('white');////////////////////////////
            ctx.fillText('长按扫码查看和你最像的人', 40, 0.88 * height)/////////////////////////////
            ctx.draw()
  }else{
    wx.downloadFile({
      url: app.globalData.baseUrl + '/static/avatar/' + app.globalData.openid + '.jpg',
      success: function (res) {
        var avatarimg = res.tempFilePath

        wx.downloadFile({
          url: app.globalData.inputimg[0]['img'],
          success: function (res) {


            const ctx = wx.createCanvasContext('myCanvas');
            var leftimg = app.globalData.headimgpath;
            var rightimg = res.tempFilePath;
            var avatar = avatarimg;
            var qrPath = '../../images/qrcode2.jpg'
            var bgImga = '../../images/share222.jpg'
            var similarpic = '../../images/similar.jpg'
            var picsize = 0.4
            var nickname = app.globalData.nickname
            var rate = app.globalData.rate
            var humword = app.globalData.humword

            ctx.drawImage(bgImga,0, 0,  width, height); 
            ctx.drawImage(similarpic, 0.13 * width, 0.25 * width, 0.5 * width, 0.11 * width)
            ctx.font = "45px Arial";
            ctx.setFillStyle('red')
            ctx.fillText(rate, 0.65 * width, 0.35 * width);


            ctx.drawImage(leftimg, 0.07 * width, 0.25 * height, picsize * width, picsize * width);
            ctx.drawImage(rightimg, 0.53 * width, 0.25 * height, picsize * width, picsize * width);

            ctx.drawImage(avatar, 30, 0.3 * height + picsize * width, 60, 60);
            ctx.drawImage(qrPath, 0.75 * width, 0.9 * height - 0.25 * width, 0.25 * width, 0.25 * width);

            ctx.font = "18rpx Arial";
            ctx.setFillStyle('#8B4789')
            ctx.fillText(nickname, 100, 0.3 * height + picsize * width + 27)
            ctx.fillText(humword, 30, 0.3 * height + picsize * width + 100);
            ctx.font = "12rpx Arial";
            ctx.setFillStyle('white');////////////////////////////
            ctx.fillText('长按扫码查看和你最像的人', 40, 0.88 * height)/////////////////////////////
            ctx.draw()
            wx.hideLoading()
            wx.setStorageSync("rightimg", rightimg)
            wx.setStorageSync("avatarimg",avatarimg)
          }
        })


      }
    })

  }


  },





  donate: function () {
    var imgmo = app.globalData.baseUrl + '/static/moneyqr.jpg';
    wx.previewImage({
      urls: imgmo.split(','),
    })
    wx.redirectTo({
      url: '../share/share?cachedoor=true',
    })
  },

  savePic: function () {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 50,
      width: that.data.windowWidth,
      height: that.data.contentHeight,
      canvasId: 'myCanvas',
      success: function (res) {
        util.savePicToAlbum(res.tempFilePath)
        wx.showModal({
          title: '提示',
          content: '打开相册并分享到朋友圈吧~',
          success: function (res) {
            console.log(res)
          }
        })
      }
    })

  },
});

