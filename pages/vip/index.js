// pages/vip/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  PAY(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    app.request.forcePay({ level : id})
      .then(r=>{
        console.log(r, r.data.payinfo.timeStamp)
        wx.showLoading({
          title:'正在发起支付',
          mask:true
        })
        wx.requestPayment({
          timeStamp: r.data.payinfo.timeStamp,
          nonceStr: r.data.payinfo.nonceStr,
          package: r.data.payinfo.package,
          signType: r.data.payinfo.signType,
          paySign: r.data.payinfo.paySign,
          success(se){
            console.log(se)
          },
          fail(e){
            console.log(e)
          },
          complete(c){
            console.log(c)
            wx.hideLoading()
          }
        })
      })
    
    // wx.navigateTo({
    //   url: '/pages/vip/pay',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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