//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    show:true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    data:'',
    tabList:['推荐','公司详情'],
    swipeList:[],
    companyIntroduce:[],
    productImage: [
    ],
    swipeListLogn:[],
    showPage:true
  },
  onClickHide() {
    this.setData({ show: false });
  },
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch() {
    
  },
  onChangePage(e){
    console.log(e.detail)
    if(e.detail.name === 0){
      this.showPage = true
      this.setData({
        showPage: true
      });
    } else {
      this.showPage = false
      this.setData({
        showPage: false
      });
    }
  },
  onClick() {
    wx.navigateTo({
      url: '/pages/itemsInfo/itemsInfo',
    })
   /*  wx.request({
      url: 'http://127.0.0.1:8181/upUserPass',  //本地服务器地址
      data: {
        userName: 'wal',
        password: 'e10adc3949ba59abbe56e057f20f883e',
      },
      method: 'post',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log(res.data);
      },
      fail: function (res) {
        console.log("失败");
      }
    }) */
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 获取热销产品
    const db = wx.cloud.database()
    const _this = this
    db.collection('productInfo').doc('离合器摩擦片').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      _this.setData({
        productImage: res.data.productList
      })
    })
    db.collection('static').doc('swipe-item').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      _this.setData({
        swipeList: res.data.productList,
        swipeListLogn: res.data.productList
      })
    })
    db.collection('static').doc('company-introduce').get().then(res => {
      // res.data 包含该记录的数据
      console.log(res.data)
      _this.setData({
        companyIntroduce: res.data.introduceList
      })
    })
  },
 
})
