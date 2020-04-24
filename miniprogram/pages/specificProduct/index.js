// miniprogram/pages/specificProduct/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageDataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    const db = wx.cloud.database()
    const _this = this
    var _id = ''
    eventChannel.on('data', function (data) {
      console.log(data)
      if(data.data === '离合器摩擦片'){
        _id = '离合器摩擦片'
      } else if (data.data === '摩托车刹车片') {
        _id = '摩托车刹车片'
      } else if (data.data === '拖拉机摩擦片'){
        _id = '拖拉机摩擦片'
      }else if(data.data === '工程机械摩擦片'){
        _id = '工程机械摩擦片'
      } else if(data.data === '离合器铆钉'){
        _id = '离合器铆钉'
      }else if(data.data === '刹车片铆钉'){
        _id = '刹车片铆钉'
      }else if(data.data === '箱包铆钉'){
        _id = '箱包铆钉'
      }
      db.collection('productInfo').doc(_id).get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        _this.setData({
          productList: res.data.productList
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})