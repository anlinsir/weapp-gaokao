// pages/voluntPredict/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openPicker: false,
    needAnimation: false,
  },
  onPickHeaderClick() {
    console.log(this.data.openPicker)
    this.setData({
      openPicker: !this.data.openPicker,
      needAnimation: true
    });
  },
  toSubjectIn(){//去成绩录入页面
    wx.navigateTo({
      url: `/pages/VPSubjectIn/index?type=${1}`,
    })
  },
  toprofessional(){//去成绩录入页面
    wx.navigateTo({
      url: `/pages/VPSubjectIn/index?type=${2}`,
    })
    // wx.navigateTo({
    //   url: '/pages/professionalInto/index',
    // })
  },
  tocharactertest(){//去性格测试页面
    wx.navigateTo({
      url: `/pages/VPSubjectIn/index?type=${3}`,
    })
    // wx.navigateTo({
    //   url: '/pages/characterTest/index',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  getUserInfo:function(r){
    console.log(r)
  },
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
    var user = wx.getStorageSync("UserInfo")
    app.request.canPay()
      .then(r => {
        console.log(r)
        if (r.code === 1000) {
          wx.setStorageSync('noPay', 1)
        } else if (r.code === 2000) {
          wx.setStorageSync('noPay', 0)
        }
      })
    // if (!user.vip_level  || user.vip_level < 2){
    //  wx.showModal({
    //   title: '您的等级不足，不能使用此功能',
    //   content: '需要vip等级为 2 才能使用志愿测评功能',
    //   showCancel: true,
    //   cancelText: '开通vip',
    //   cancelColor: '#EA5252',
    //   confirmText: '好的',
    //   success: function(res) {
    //     if (res.confirm) {
    //       wx.switchTab({
    //         url: '/pages/user/index',
    //       })
    //     } else if (res.cancel) {
    //       wx.navigateTo({
    //         url: '/pages/vip/index',
    //       })
    //     }
       
    //   },
    // })
    // }
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