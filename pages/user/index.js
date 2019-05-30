// pages/user/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    hideVip:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  toUserInfo(){
    wx.navigateTo({
      url: "/pages/EXAinformation/index"
    })
  },
  toVIP(){
    wx.navigateTo({
      url: "/pages/vip/index"
    })
  },
  onLoad: function (options) {
    var user = wx.getStorageSync('UserInfo')
      //加载用户信息
      app.request.getUserInfo()
        .then(r=>{
          wx.setStorageSync('UserInfo', r.data)
        })
    this.setData({
      userInfo:user
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
    var user = wx.getStorageSync('UserInfo')
    //加载用户信息
    app.request.getUserInfo()
      .then(r => {
        wx.setStorageSync('UserInfo', r.data)
      })
    this.setData({
      userInfo: user
    })

    app.request.canPay()
      .then(r => {
        console.log(r)
        if (r.code === 1000) {
          wx.setStorageSync('noPay', 1)
          this.setData({
            hideVip:true
          })
        } else if (r.code === 2000) {
          wx.setStorageSync('noPay', 0)
          this.setData({
            hideVip:false
          })
        }
      })
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