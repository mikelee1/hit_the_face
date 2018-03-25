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
        var bgImga = '../../images/background.jpg'
  
        

        // ctx.setFillStyle('white')
        // ctx.fillRect(0, 0.6 * height, width, height);

        // ctx.drawImage(imgPath, 30, 500, 60, 60);
        ctx.drawImage(bgImga, 20, 20, width-50, height); //背景
        ctx.drawImage(leftimg, 50, 35, 0.3 * width, 0.3 * height);
        
        ctx.drawImage(res.tempFilePath, 0.5 * width, 35, 0.3 * width, 0.3* height);
        ctx.drawImage(bgImgPath, 30, 0.64 * height, 60, 60);
        ctx.drawImage(qrPath, 0.55 * width, 0.67 * height-20, 100, 100);
        // ctx.setFontSize(24)
        // ctx.setFillStyle('#6F6F6F')
        // ctx.fillText('妖妖灵', 110, 0.72 * height)
        ctx.font = "17px Arial";
        ctx.setFillStyle('#8B4789')
        ctx.fillText('相似度       ，简直不可思议', 40, 0.45 * height);
        ctx.fillText('99%', 93, 0.45 * height);

        // ctx.setFontSize(25)
        // ctx.setFillStyle('#111111')
        // ctx.fillText('朋友们快来看', 30, 0.78 * height)
        
      
        ctx.setFontSize(12);
        ctx.setFillStyle('#515151');
        ctx.fillText('长按扫码查看和你最像的人', 23, 0.8 * height)
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

