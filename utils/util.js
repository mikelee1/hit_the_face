// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }






const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function savePicToAlbum(tempFilePath) {
  let that = this;
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,
              success(res) {
                wx.showToast({
                  title: '图片已保存到相册，赶紧晒一下吧~'
                });
              },
              fail(res) {
                console.log(res);
              }
            })
          },
          fail() {
            // 用户拒绝授权,打开设置页面
            wx.openSetting({
              success: function (data) {
                console.log("openSetting: success");
              },
              fail: function (data) {
                console.log("openSetting: fail");
              }
            });
          }
        })
      } else {
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '图片已保存到相册，赶紧晒一下吧~',
            });
          },
          fail(res) {
            console.log(res);
          }
        })
      }
    },
    fail(res) {
      console.log(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  savePicToAlbum: savePicToAlbum
}

