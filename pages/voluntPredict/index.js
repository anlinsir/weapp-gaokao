// pages/voluntPredict/index.js
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