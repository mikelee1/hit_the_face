App({
  globalData: {
    userInfo: null,
    baseUrl: 'https://www.liyuanye.club',
    inputimg: null,
    avatar: '',
    headimgpath: '',
    session_key: null,
    openid: null,
    nickname: null,
    scrollimage: null,
    qrpath: null,
    moneyqr: null,
    screenwidth: wx.getSystemInfoSync().windowWidth,
    screenheight: wx.getSystemInfoSync().windowHeight,
    totalnum: 0,
    chooseimagebut: true,
    prank: true,
    star:false,
    rate:0,
    humword:'',
    sharepagedoor:false,
    items: [
      { name: 'prank', value: '整蛊版', checked: 'true' },
      { name: 'normal', value: '素人版' },
      { name: 'star', value: '明星版' },
    ],
    avatarcache: ''
  },



  onLaunch: function () {
    var that = this;
    
    wx.login({
      success: res => {
        wx.request({
          data: { js_code: res.code},
          url: this.globalData.baseUrl +'/dopgetopenid/',
          method: 'GET',
          success: function (res) {
              console.log(res)
              that.globalData.openid = res.data; 
          },
          fail:function(e){
            console.log(e)
          }
        })
      }
    })


  },
})

