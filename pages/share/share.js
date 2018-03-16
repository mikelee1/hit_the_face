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

    console.log(wx.getSystemInfoSync().windowWidth)


    var that = this;
    //1. 请求后端API生成小程序码
    // that.getQr();

    //2. canvas绘制文字和图片(startx,starty,endx,endy)
    const ctx = wx.createCanvasContext('myCanvas');
    var imgPath = '../../images/1.jpg'
    var bgImgPath = '../../images/2.jpg';
    var qrPath = '../../images/qrcode.jpg'
    ctx.drawImage(imgPath, 0, 0, width, 0.6*height);

    ctx.setFillStyle('white')
    ctx.fillRect(0, 0.6 * height, width, height);

    // ctx.drawImage(imgPath, 30, 500, 60, 60);
    ctx.drawImage(bgImgPath, 20, 0.65*height, 60, 60);
    ctx.drawImage(qrPath, 0.6*width, 0.6*height, 150, 150);

    ctx.setFontSize(24)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText('妖妖灵', 110, 0.72* height)

    ctx.setFontSize(25)
    ctx.setFillStyle('#111111')
    ctx.fillText('朋友们快来看，', 30, 0.78 * height)


    ctx.setFontSize(15)
    ctx.fillText('长按扫码查看详情', 30, 0.83 * height)
    ctx.draw()
  },

  onShow: function () {

  },

  // getData: function () {
  //   let that = this;

  //   let i = 0;
  //   let lineNum = 1;
  //   let thinkStr = '';
  //   let thinkList = [];
  //   for (let item of that.data.content) {
  //     if (item === '\n') {
  //       thinkList.push(thinkStr);
  //       thinkList.push('a');
  //       i = 0;
  //       thinkStr = '';
  //       lineNum += 1;
  //     } else if (i === 19) {
  //       thinkList.push(thinkStr);
  //       i = 1;
  //       thinkStr = item;
  //       lineNum += 1;
  //     } else {
  //       thinkStr += item;
  //       i += 1;
  //     }
  //   }
  //   thinkList.push(thinkStr);
  //   that.setData({ thinkList: thinkList });
  //   that.createNewImg(lineNum, '../../images/qrcode.jpg');
  // },

  // drawSquare: function (ctx, height) {
  //   ctx.rect(0, 50, this.data.windowWidth, height);
  //   ctx.setFillStyle("#f5f6fd");
  //   ctx.fill()
  // },

  // drawFont: function (ctx, content, height) {
  //   ctx.setFontSize(16);
  //   ctx.setFillStyle("#484a3d");
  //   ctx.fillText(content, this.data.offset, height);
  // },

  // // drawLine: function (ctx, height) {
  // //   ctx.beginPath();
  // //   ctx.moveTo(this.data.offset, height);
  // //   ctx.lineTo(this.data.windowWidth - this.data.offset, height);
  // //   ctx.stroke('#eee');
  // //   ctx.closePath();
  // // },

  // createNewImg: function (lineNum,imgname) {
  //   let that = this;
  //   let ctx = wx.createCanvasContext('myCanvas');
  //   let contentHeight = lineNum * that.data.lineHeight + 180;
  //   that.drawSquare(ctx, contentHeight);
  //   that.setData({ contentHeight: contentHeight });
  //   let height = 100;
  //   for (let item of that.data.thinkList) {
  //     if (item !== 'a') {
  //       that.drawFont(ctx, item, height);
  //       height += that.data.lineHeight;
  //     }
  //   }
  //   // that.drawLine(ctx, lineNum * that.data.lineHeight + 120);
  //   that.drawFont(ctx, that.data.footer, lineNum * that.data.lineHeight + 156);
  //   ctx.drawImage(imgname, that.data.windowWidth - that.data.offset - 50, lineNum * that.data.lineHeight + 125, 50, 50);
  //   ctx.draw();
  // },

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