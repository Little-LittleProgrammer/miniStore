// pages/header-Bar/headerBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    textValue:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e){
      this.setData({
        textValue: e.detail
      });
    },
    onClick() {
      console.log(this.data.textValue)
      const _this = this
      wx.navigateTo({
        url: '/pages/itemsInfo/itemsInfo',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.data.textValue})
          _this.setData({
            textValue: ''
          });
        }
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
  }
})
