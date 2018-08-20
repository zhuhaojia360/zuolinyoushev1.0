// pages/booking/cleanup/cleanup.js

/**
 * 日常保洁
 */

//var app = getApp()
//var fileData = require('../../utils/data.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '擦玻璃' , checked: false },
      { name: '2', value: '擦油烟机表面', checked: false },
      { name: '3', value: '专业除螨', checked: false },
      { name: '4', value: '擦冰箱内部', checked: false },
      { name: '5', value: '擦柜子内部', checked: false },
      { name: '6', value: '84消毒', checked: false },
      { name: '7', value: '高温蒸汽消毒', checked: false },
      { name: '8', value: '机洗窗帘', checked: false },
      { name: '9', value: '拆洗沙发套', checked: false }
    ],
    allGoodsFilte: [
      { name: '专人配送', value: '0', checked: true },
      { name: '精品品牌', value: '1', checked: false },
      { name: '超值优惠', value: '2', checked: false },
      { name: '门店自提', value: '3', checked: false },
      { name: '最快三小时', value: '4', checked: false },
    ],
    scroll_x: true,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    date: '2018-08-08',
    time: '12:00',
    region: ['湖南省', '长沙市', '岳麓区'],
    index: 0,
    /*customItem: '全部'*/
    array: ['日常保洁', '新房开荒', '高级保姆', '金牌月嫂', '管道疏通', '家电清洗']
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindServiceChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    /*var items = this.data.items;
    var checkItems = e.detail.value;
    for(var i=0; i<items.length; i++){
      if(checkItems.indexOf(i)!=-1){
        items[i].checked=true;
      }else{
        items[i].checked=false;
      }
    }
    this.setData({
      items:items
    })*/
  },
  serviceValChange: function (e) {
    var allGoodsFilte = this.data.allGoodsFilte;
    var checkArr = e.detail.value;
    for (var i = 0; i < allGoodsFilte.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        allGoodsFilte[i].checked = true;
      } else {
        allGoodsFilte[i].checked = false;
      }
    }
    this.setData({
      allGoodsFilte: allGoodsFilte
    })
  },

  onSubmitClick: function (event) {
    var name = event.detail.value.name;
    var phone = event.detail.value.phone;
    var workIntent = event.detail.value.workIntent;
    var recomPeo = event.detail.value.recomPeo;
    var _this = this;
    if (!name) {
      wx.showModal({
        title: '提示',
        content: '请输入您的名称',
      })
      return;
    }
    if (!phone) {
      wx.showModal({
        title: '提示',
        content: '请输入您的电话号码',
      })
      return;
    }
    if (!workIntent) {
      wx.showModal({
        title: '提示',
        content: '请输入您的工作意向',
      })
      return;
    }
    if (this.data.userId) {
      wx.showLoading({
        title: '提交中',
        mask: true,
      })
      //提交订单
      wx.request({
        url: 'http://192.168.1.104:8080/dreamhome/employ/add',
        data: {
          cName: name,
          cPhoneNum: phone,
          cWorkContent: workIntent,
          cRecomPeople: recomPeo,
          cUserId: this.data.userId,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          //提交成功
          _this.setData({ nullvalue: null });
          console.log(res.data);
          wx.showToast({
            title: '提交成功',
            icon: 'none',
          })
        },
        fail(res) {
          //提交失败
          wx.showToast({
            title: '提交失败',
            icon: 'none',
          })
        },
        complete: function () {
          wx.hideLoading()
        }
      })
      //提交订单结束
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*var str = options.detail;
    var detail = str.split("|");*/
    this.setData({
      /*date: detail[0],
      time: detail[1],
      region: detail[2],
      index: detail[3]*/
      date: options.date,
      time: options.time,
      //region: options.region,
      index: options.index
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