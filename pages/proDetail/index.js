// pages/stuDetail/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlId: 0,
    majorDetail:{},
    page:1,
    id:"",

  },
  toStuDetail(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/stuDetail/index?id=${id}&title=${title}`,
    })
  },
  toSomePage(e) {
    let id = Number(e.currentTarget.dataset.id)
    this.setData({
      urlId: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    app.request.majorDetails({ code: options.id})
      .then(r=>{
        this.setData({
          majorDetail:r.data
        })
      })
    this.getSchool()
  },
  getSchool(){
    app.request.schoolListScoresMajor({ code: this.data.id, page: this.data.page	})
      .then(r=>{
        this.setData({
          schoolList: r.data.college.data
        })

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