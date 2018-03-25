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
    content: ''
  },
 


  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      path: '/page/user?id=123'
    }
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
        var rightimg = res.tempFilePath;
        // var leftimg = '../../images/1.jpg'
        // var rightimg = '../../images/3.jpg'


        var bgImgPath = app.globalData.imgpath;
        var qrPath = '../../images/qrcode2.jpg'
        var bgImga = '../../images/back1.jpg'
        var similarpic = '../../images/similar.jpg'
        var picsize = 0.4

        ctx.drawImage(bgImga, 0.05 * width, 0.05 * height, 0.9*width, 0.9*height); //背景
        ctx.drawImage(similarpic,0.13*width,0.25*width,195,43)
        ctx.font = "45px Arial";
        ctx.setFillStyle('#8B4789')
        ctx.fillText('99%', 0.65 * width, 0.35 * width);

        ctx.font = "17px Arial";
        ctx.setFillStyle('#8B4789')
        ctx.fillText('', 40, 0.45 * height);
        ctx.drawImage(leftimg, 0.07*width, 0.25 * height, picsize * width, picsize* width);
        ctx.drawImage(rightimg, 0.53 * width, 0.25 * height, picsize * width, picsize * width);
        ctx.drawImage(bgImgPath, 30, 0.55 * height, 60, 60);
        ctx.drawImage(qrPath, 0.65 * width, 0.65 * height+20, 0.25 * width, 0.25 * width);

        ctx.font = "17px Arial";
        ctx.setFillStyle('#8B4789')
        ctx.fillText('tianna,相似度，简直不可思议', 100, 0.6 * height);



        ctx.setFontSize(15);
        ctx.setFillStyle('#515151');
        ctx.fillText('长按扫码查看和你最像的人', 40, 0.8 * height)
        ctx.draw()

      
      }})


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

