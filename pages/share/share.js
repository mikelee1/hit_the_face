import util from '../../utils/util'

const app = getApp();
var width = app.globalData.screenwidth
var height = app.globalData.screenheight
Page({
  
  data: {
    windowWidth: width,
    windowHeight: 0.85*height,
    contentHeight: 0,
    thinkList: [],
    footer: '',
    offset: 0,
    lineHeight: 30,
    content: '王小波的黄金时代'
  },





  onLoad: function (options) {
    var that = this;

  },

  onShow: function () {

    wx.downloadFile({
      url: app.globalData.inputimg[0]['img'],
      success: function (res) {


        //2. canvas绘制文字和图片(startx,starty,imgwidth,imgheight)
        const ctx = wx.createCanvasContext('myCanvas');
        var leftimg = app.globalData.imgpath;


        var bgImgPath = '../../images/2.jpg';
        var qrPath = '../../images/qrcode.jpg'

        ctx.setFillStyle('white')
        ctx.fillRect(0, 0.6 * height, width, height);

        // ctx.drawImage(imgPath, 30, 500, 60, 60);

        ctx.drawImage(leftimg, 0, 0, 0.5 * width, 0.6 * height);
        ctx.drawImage(res.tempFilePath, 0.5 * width, 0, 0.5 * width, 0.6 * height)
        ctx.drawImage(bgImgPath, 20, 0.65 * height, 60, 60);
        ctx.drawImage(qrPath, 0.6 * width, 0.6 * height, 120, 120);

        ctx.setFontSize(24)
        ctx.setFillStyle('#6F6F6F')
        ctx.fillText('妖妖灵', 110, 0.72 * height)

        ctx.setFontSize(25)
        ctx.setFillStyle('#111111')
        ctx.fillText('朋友们快来看，', 30, 0.78 * height)


        ctx.setFontSize(15)
        ctx.fillText('长按扫码查看详情', 30, 0.83 * height)
        ctx.draw()

      }
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
      }
    })
  }
});

