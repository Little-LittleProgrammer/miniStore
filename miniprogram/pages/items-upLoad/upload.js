// pages/items-upLoad/upload.js
import Toast from '@vant/weapp/toast/toast';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList:[],
    clientInfo: {
      address: '',
      phoneNum: '',
      userName: '',
      companyName:'',
      message:'',
      url:''
    },
    popupShow:false,
    showUpAdderss: false,
    areaList: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* 文件上传 */
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    var num = ''
    for(var i=0;i<8;i++){
      num+=Math.floor(Math.random() * 10);
    }
    const filePath = file.path
    const name = this.data.clientInfo.companyName
    const cloudPath = 'VIPclient/' + name +'/'+ num + filePath.match(/\.[^.]+?$/)[0]
    this.data.clientInfo.url = 'VIPclient/' + name 
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        // 上传完成需要更新 fileList
        console.log(res);
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.fileID })
        
        this.setData({ fileList });
      }
    });
  },
  /* 获取数据 */
  getUserName(e){
    this.data.clientInfo.userName = e.detail.value
  },
  getPhoneNum(e){
    this.data.clientInfo.phoneNum = e.detail.value
  },
  getCompanyName(e){
    this.data.clientInfo.companyName = e.detail.value
  },
  getAddress(e){
    this.data.clientInfo.address = e.detail.value
  },
  getMessage(e){
    this.data.clientInfo.message = e.detail.value
  },
  addressOK(e) {
    console.log(e)
    let address = ""
    for (var i = 0; i < e.detail.values.length; i++) {
      this.data.clientInfo.address += e.detail.values[i].name + ' '
    }
    this.setData({
      ['clientInfo.address']: this.data.clientInfo.address
    })
    this.data.showUpAdderss = false
    this.setData({
      showUpAdderss: false
    })
  },
  addressCancel() {
    this.data.showUpAdderss = false
    this.setData({
      showUpAdderss: false
    })
  },
  choiceAddress() {
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
  onClose() {
    this.data.showUpAdderss = false
    this.setData({
      showUpAdderss: false
    })
  },
  /* 提示 */
  onClickIcon(){
    Toast('请认真填写数据，我们会派专门的技术人员和您沟通，谢谢您的配合，我们将为您提供最优秀的服务');
   /*  this.data.popupShow = true
    this.setData({ popupShow:true}) */
  },
  onClose(){
    this.setData({ popupShow: false })
  },
  confirmInfo(){
    console.log(this.data.clientInfo)
    const db = wx.cloud.database()
    if (this.data.clientInfo.userName == '' || this.data.clientInfo.phoneNum == '' || this.data.clientInfo.companyName == '' || this.data.clientInfo.address == ''){
      Toast('请填写所有数据');
    } else {
      db.collection('VIPclient').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          _id: this.data.clientInfo.companyName,
          detail: this.data.clientInfo
        },
      })
      .then(res => {
        console.log(res)
        wx.navigateTo({
          url: '/pages/index/index',
        })
      })
    }
    // db.collection('VIPclient').add({
    //   // data 字段表示需新增的 JSON 数据
    //   data: {
    //     _id:this.data.clientInfo.userName
    //   },
    //   success: function (res) {
    //     // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //     console.log(res)
    //   }
    // })
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