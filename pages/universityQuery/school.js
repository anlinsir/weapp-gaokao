// pages/universityQuery/school.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
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


    schoolTypeList:[],//学校类型列表

    schoolList: [],//学校列表
    currentPages: 1,//当前页数
    loading: false,//
  },
  getTypeList() {//获取学校类型列表
    app.request.getTypeList()
      .then(r => {
       this.setData({
         schoolTypeList:r.data
       })
      })
  },
  addNum(){
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
  getSchoolList({ ...data }) {
    if (this.data.loading) return
    this.setData({
      loading: true
    })
    let arrareas = []
    for (var i in this.data.activeAddress) {
      if (this.data.activeAddress[i]) {
        arrareas.push(i)
      }
    }
    // arrareas
    let pro = {
      area: ''
    }
    app.request.Univer({ ...data, ...pro, page: this.data.currentPages })
      .then(r => {
        if (this.data.currentPages === 1) {
          this.setData({
            schoolList: r.data.data
          })
        } else {
          let schoolList = this.data.schoolList
          schoolList = schoolList.concat(r.data.data)
          this.setData({
            schoolList: schoolList
          })
        }
        if (r.data.data.length && r.data.data.length >= 15) {
          this.setData({
            currentPages: this.data.currentPages + 1
          })
        }
        this.setData({
          loading: false
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  toStuDetail(){
    wx.navigateTo({
      url: '/pages/stuDetail/index',
    })
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