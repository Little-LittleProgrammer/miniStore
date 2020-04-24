// pages/selfInfo/selfInfo.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    clientInfo:{
      address:'',
      phoneNum:'',
      name:'',
      companyName:'',
      userName:''
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    data: '',
    successFlag:false,
    noticy:'',
    areaList:{
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  addressOK(e){
    console.log(e)
    if(e.type === 'confirm'){
      this.data.clientInfo.address = ''
    }
    let address = ""
    for(var i=0;i<e.detail.values.length;i++){
      this.data.clientInfo.address += e.detail.values[i].name +' '
    }
    this.setData({
      ['clientInfo.address']: this.data.clientInfo.address
    })
    this.data.showUpAdderss = false
    this.setData({
      showUpAdderss:false
    })
  },
  addressCancel(){
    this.data.showUpAdderss = false
    this.setData({
      showUpAdderss: false
    })
  },
  /* 获取用户信息 */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scancode() {
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res);
        var token = res.result.split('=')[1]
        app.globalData.token = token
        wx.navigateTo({
          url: '/pages/confirmLogin/index',
        })
      },
      fail: (res) => {
        console.log(res);

      }
    })
  },
  choiceAddress(){
    const db = wx.cloud.database()
    db.collection('address').doc('9cdEmnV4v4WDfdz1skduveb5QFPdqco4AZEiD2tRRjUOk1iF').get().then(res => {
      // res.data 包含该记录的数据
      this.data.areaList = res.data
      this.data.showUpAdderss = true
      this.setData({
        showUpAdderss: true,
        areaList: this.data.areaList
      })
    })
  },
  onClose(){
    this.data.showUpAdderss = false
    this.setData({
      showUpAdderss: false
    })
  },
  async submitInfo(){
    const db = wx.cloud.database()
    const _ = db.command
    const _this = this
    console.log('asd')
    await db.collection('VIPclient').where({
      wxName: _.eq(app.globalData.userInfo.nickName)
    }).update({
      data:{
        detail: {
          userName: _this.data.clientInfo.userName,
          address: _this.data.clientInfo.address,
          phoneNum: _this.data.clientInfo.phoneNum,
        },
      },
      success:function(res){
        Toast.success('更新成功');
      },
      fail:function(res){
        Toast.fail('更新失败');
      }
    })
  },
  cancelInfo(){
    wx.redirectTo({
      url: '/pages/selfInfo/selfInfo',
    })
  },
  onClosePopup(){
    this.setData({ successFlag: false });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('VIPclient').where({
      wxName:_.eq(app.globalData.userInfo.nickName)
    }).get().then(res => {
      // res.data 包含该记录的数据
      console.log(res)
      this.data.clientInfo.phoneNum = res.data[0].detail.phoneNum
      this.data.clientInfo.address = res.data[0].detail.address
      this.data.clientInfo.companyName = res.data[0].detail.companyName
      this.data.clientInfo.userName = res.data[0].detail.userName
      this.setData({
        ['clientInfo.phoneNum']: this.data.clientInfo.phoneNum,
        ['clientInfo.address']: this.data.clientInfo.address,
        ['clientInfo.companyName']: this.data.clientInfo.companyName,
        ['clientInfo.userName']: this.data.clientInfo.userName,
      })
    })
  },
  onChangeInfoName(e) {
    console.log(e)
    this.data.clientInfo.userName= e.detail
  },
  onChangeInfoPhone(e) {
    console.log(e)
    this.data.clientInfo.phoneNum = e.detail
  },
  onChangeInfoCompany(e) {
    console.log(e)
    this.data.clientInfo.companyName = e.detail
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