// pages/itemsInfo/itemsInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsItems:[
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const db = wx.cloud.database()
    const _ = db.command
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      db.collection('productInfo').where({
        _id: db.RegExp({
          regexp: '.*'+data.data,
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i',
          //大小写不区分
        })
      }).get().then(res => {
        // res.data 包含该记录的数据
        console.log(res)
        for(var i=0;i<res.data.length;i++){
          _this.data.goodsItems.push.apply(_this.data.goodsItems,res.data[i].productList)
        }
        console.log(_this.data.goodsItems)
        for (var i = 0; i < _this.data.goodsItems.length;i++){
          if (_this.data.goodsItems[i].imageUrl.indexOf('MaoDing') !=-1){
            _this.data.goodsItems[i].tag = '铆钉'
          } else{
            _this.data.goodsItems[i].tag = '摩擦片'
          }
        }
        _this.setData({
          goodsItems: _this.data.goodsItems
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