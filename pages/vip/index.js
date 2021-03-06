// pages/vip/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    invite:'',//邀请码
    invitation:'',
  },
  PAY(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    
    wx.navigateTo({
      url: `/pages/vip/pay?id=${id}&invitation=${this.data.invitation}`,
    })
  },
  getinvitation(e){
    console.log(e)
    var val = e.detail.value
    this.setData({
      invitation:val
    })
    console.log(this.data.invitation)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { invite } = wx.getStorageSync('UserInfo')
    this.setData({
      invite: invite
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
    wx.showShareMenu({
      withShareTicket: true
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
  onShareAppMessage: function (res) {
   return{
      title: '高考一点通',
     path: `/pages/login/index?invite=${this.data.invite}`,
    //  imageUrl:""
     success(res){
       console.log(res)
       wx.showShareMenu({
         // 要求小程序返回分享目标信息
         withShareTicket: true
       });
     }
   }
  }
})