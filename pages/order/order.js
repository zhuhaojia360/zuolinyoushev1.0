// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    orderlist: []
  },
  
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var login = wx.getStorageSync('login')
    wx.request({
      url: `${app.globalData.API_URL}` + '/order',
      data: {
        id: login.mid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          orderlist: res.data
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  payorder: function (e) {
    var orderid = e.target.dataset.id;
    wx.setStorageSync('orderid', orderid)
    uctooPay.generateOrder();
  },

  switchSlider: function (e) {
    this.setData({
      current: e.target.dataset.index
    })
  },

  changeSlider: function (e) {
    this.setData({
      current: e.detail.current
    })
  },

  delorder: function (e) {
    wx.showToast({
      title: '正在取消订单，请稍候...',
      icon: 'loading',
      duration: 10000
    })
    var that = this
    console.log(e.target.dataset.id)
    wx.request({
      url: `${app.globalData.API_URL}` + '/order/' + e.target.dataset.id,
      method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data == 1) {
          that.onLoad()
          wx.hideToast()
        }

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
  
  }
})