// pages/universityQuery/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    showAddress: -1,
    activeAddress: {},//选择地址集合
    examinationBatch: [{
      name: '本科一批次',
      id: 1
    }, {
      name: "本科二批次",
      id: 2
    }, {
      name: '专科',
      id: 3
    }],
    examinationBatchChoose: 0,//选择的报考批次

    probabilityList: [{
      name: '推荐',
      id: 1
    }, {
      name: '冲刺',
      id: 2
    }],//录取概率列表
    probabilityID: '',//录取概率Id
  },
  addNum() {
    console.log(this.data.num++)
    this.setData({
      num: this.data.num++
    })
  },
  cancelModel() {//隐藏模态框
    this.setData({
      showAddress: -1
    })
  },
  changeAddressStatus(e) { //显示下拉框
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == this.data.showAddress) {
      this.cancelModel()
      return
    }
    this.setData({
      showAddress: e.currentTarget.dataset.id
    })
  },
  getAddress(e) { //保存选中的地址
    var arr = this.data.activeAddress
    if (!arr[Number(e.currentTarget.dataset.id)]) {
      arr[Number(e.currentTarget.dataset.id)] = true
    } else {
      arr[Number(e.currentTarget.dataset.id)] = false
    }
    this.setData({
      activeAddress: arr
    })
  },
  BatchChoose(e) {//选择报考批次
    this.setData({
      examinationBatchChoose: e.currentTarget.dataset.id
    })
    this.cancelModel()
  },
  probabilityChoose(e) {//选择录取概率
    this.setData({
      probabilityID: e.currentTarget.dataset.id
    })
    this.cancelModel()
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