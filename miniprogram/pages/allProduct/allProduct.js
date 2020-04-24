// miniprogram/pages/allProduct/allProduct.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey:0,
    productList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('productInfo').doc('productCollection').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      // this.data.areaList = res.data
      // this.data.showUpAdderss = true
      this.setData({
        productList: res.data.productInfo
      })
    })
  },
  clickItem(e){
    console.log(e)
    wx.navigateTo({
        url: '/pages/specificProduct/index',
        success:function(res){
          res.eventChannel.emit('data', { data: e.currentTarget.dataset.index})
        }
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

  },
  onChangeSidebar(e){
    const db = wx.cloud.database()
    if(e.detail === 0){
      db.collection('productInfo').doc('productCollection').get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          productList: res.data.productInfo
        })
      })
    } else if (e.detail === 1){
      db.collection('productInfo').doc('productMCollection').get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data)
        this.setData({
          productList: res.data.productList
        })
      })
    }
  },

  onChange(){
    
  }
})