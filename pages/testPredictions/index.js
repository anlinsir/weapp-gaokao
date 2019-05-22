// pages/login/two.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,

    scoreOne: '',
    scoreTwo: '',
    scoreThere: '',

    
  },
  saveData() {
    let { scoreOne, scoreTwo, scoreThere } = this.data
    let temData = {}
    let userPerf = wx.getStorageSync('twotab') || {}
    //     mock_1: {
    //         total: scoreOne
    //     },
    //     mock_2: {
    //         total: scoreTwo
    //     },
    //     mock_3: {
    //         total: scoreThere
    //     },
    // }

    temData.mock_one = userPerf.mock_one || {}
    temData.mock_two = userPerf.mock_two || {}
    temData.mock_three = userPerf.mock_three || {}

    temData.mock_one.total = scoreOne || 0
    temData.mock_two.total = scoreTwo || 0
    temData.mock_three.total = scoreThere || 0


    userPerf = Object.assign(userPerf, temData)
    console.log(userPerf)
    wx.setStorageSync('twotab', userPerf)
    console.log(wx.getStorageSync('twotab'))
  },
  toIndex() {
    this.saveData()
    let { provinceId, branchSubjectindex, ...data } = wx.getStorageSync('twotab')
    let type = Number(branchSubjectindex) + 1
    let area_id = provinceId
    app.request.Mocks({ ...data, type, area_id })
      .then(r => {
        wx.navigateTo({
          url: '/pages/testPredictions/school',
        })
      })
      .catch(e => {

      })
    return

  },
  changescore(e) { //改变分数值
    console.log()
    let item = e.target.dataset.item
    let value = e.detail.value
    switch (item) {
      case '1':
        this.setData({
          scoreOne: value
        })
        break;
      case '2':
        this.setData({
          scoreTwo: value
        })
        break;
      case '3':
        this.setData({
          scoreThere: value
        })
        break;
    }

  },
  toBranch(e) {
    let item = e.target.dataset.item
    this.saveData()
    wx.navigateTo({
      url: `/pages/testPredictions/two?item=${item}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userPerf = wx.getStorageSync('twotab') || wx.getStorageSync('userPerf')
    if (userPerf) {
      this.setData({
        scoreOne: userPerf.mock_one.total,
        scoreTwo: userPerf.mock_two.total,
        scoreThere: userPerf.mock_three.total
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
    var user = wx.getStorageSync("UserInfo")
    // if (user.vip_level < 1) {
    //   wx.showModal({
    //     title: '您的等级不足，不能使用此功能',
    //     content: '需要vip等级为 1 才能使用志愿测评功能',
    //     showCancel: true,
    //     cancelText: '开通vip',
    //     cancelColor: '#EA5252',
    //     confirmText: '好的',
    //     success: function (res) {
    //         if (res.confirm) {
    //           wx.switchTab({
    //             url: '/pages/user/index',
    //           })
    //         } else if (res.cancel) {
    //           wx.navigateTo({
    //             url: '/pages/vip/index',
    //           })
    //         }
    //     }
    //   })
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