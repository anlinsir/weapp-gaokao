// pages/vip/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    num:'',
    mobile:'',
    textarr:[
      '考前预测',
      '志愿测评',
      '所有',
    ]
  },
  Pays(){
    
    app.request.forcePay({ level: this.data.id })
      .then(r => {
        console.log(r, r.data.payinfo.timeStamp)
        wx.showLoading({
          title: '正在发起支付',
          mask: true
        })
        wx.requestPayment({
          timeStamp: r.data.payinfo.timeStamp,
          nonceStr: r.data.payinfo.nonceStr,
          package: r.data.payinfo.package,
          signType: r.data.payinfo.signType,
          paySign: r.data.payinfo.paySign,
          success(se) {
            console.log(se)
          },
          fail(e) {
            console.log(e)
          },
          complete(c) {
            console.log(c)
            wx.hideLoading()
          }
        })
      })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  
    let { mobile ,discount} = wx.getStorageSync('UserInfo')
    this.setData({
      id: options.id,
      mobile: mobile|| '无'
    })
    if (this.data.id == 1){
      if (discount === 1) { 
        this.setData({
          num: 35
        })
      }else{
        this.setData({
          num: 50
        })
      }
    } else if (this.data.id == 2){
      if (discount === 1) { 
        this.setData({
          num: 175
        })
      }else{
        
        this.setData({
          num: 250
        })
      }
    }else{
      if (discount === 1) { 
        this.setData({
          num: 196
        })
      }else{
        this.setData({
          num: 280
        })
      }
    }
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