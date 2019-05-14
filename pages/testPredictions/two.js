// pages/login/subjects.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mockItem: '',

    chinese: '', //语文分数
    mathematics: '', //数学分数
    english: '', //英语分数
    average: '', //综合分数
    ComprehensiveType: ''

  },
  toVoluntPage() {
    let { chinese, mathematics, english, average } = this.data
    let userPerf = wx.getStorageSync('twotab')
    let mock;
    mock = {
      chinese: chinese || 0,
      mathematics: mathematics || 0,
      english: english || 0,
      average: average || 0
    }
    switch (this.data.mockItem) {
      case '一':
        userPerf.mock_one = Object.assign(userPerf.mock_one, mock)
        break;
      case '二':
        userPerf.mock_two = Object.assign(userPerf.mock_two, mock)
        break;
      case '三':
        userPerf.mock_three = Object.assign(userPerf.mock_three, mock)
        break;
    }
    wx.setStorageSync('twotab', userPerf)
    console.log(userPerf)
    wx.navigateBack({
      delta: 1
    })
  },
  changeData(e) { //改变各科数据
    let type = e.target.dataset.type
    let value = e.detail.value
    this.setData({
      [type]: value
    })
    console.log(type, value, this.data[type])
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let item = options.item
    switch (item) {
      case '1':
        this.setData({
          mockItem: '一'
        })
        break;

      case '2':
        this.setData({
          mockItem: '二'
        })
        break;
      case '3':
        this.setData({
          mockItem: '三'
        })
        break;
    }
    let { mock } = wx.getStorageSync('UserInfo')
    if (mock.type == 1) {
      this.setData({
        ComprehensiveType: '文综'
      })
    } else if (mock.type == 2) {
      this.setData({
        ComprehensiveType: '理综'
      })
    } else {
      this.setData({
        ComprehensiveType: '综合'
      })
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