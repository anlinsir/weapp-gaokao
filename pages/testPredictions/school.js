// pages/VPSubjectIn/school.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddress: -1,
    activeAddress: {},//已选区域列表
    activeAddressarr: [],//已选区域列表

    examinationBatch: [],//批次列表
    examinationBatchChoose: '',//选择的报考批次
    examinationBatchChoosetitle: '',
    probabilityList: [],//录取概率列表
    probabilityID: '',//录取概率Id
    areaslist: [],//区域列表

    probabilityName: "",

    schoolList: [],//学校列表
    currentPages: 1,//当前页数
    loading: false,//
    vipL: '',
    length:0,
  },
  toStuDetail(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `/pages/stuDetail/index?id=${id}&title=${title}`,
    })
  },
  GETAreasList() {
    const data = wx.getStorageSync('areasList')
    if (data && data.length) {
      this.setData({
        areaslist: data,
      })
    } else {
      app.request.getAreasList()
        .then(r => {
          this.setData({
            areaslist: r.data
          })

          wx.setStorageSync('areasList', r.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  cancelModel() {//隐藏模态框
    this.setData({
      showAddress: -1
    })
  },
  changeAddressStatus(e) { //显示下拉框
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == this.data.showAddress) {
      this.getSchoolList()
      this.cancelModel()
      return
    }
    this.setData({
      showAddress: e.currentTarget.dataset.id
    })


  },
  getAddress(e) { //保存选中的地址
    var arr = this.data.activeAddress
    var newarr = this.data.activeAddressarr
    if (!arr[Number(e.currentTarget.dataset.id)]) {
      arr[Number(e.currentTarget.dataset.id)] = true
      newarr.push(e.currentTarget.dataset.id)
    } else {
      arr[Number(e.currentTarget.dataset.id)] = false
      newarr.splice(newarr.indexOf(e.currentTarget.dataset.id), 1)
    }
    this.setData({
      activeAddress: arr,
      activeAddressarr: newarr
    })



    this.setData({
      currentPages: 1
    })
  },
  BatchChoose(e) {//选择报考批次
    if (e.currentTarget.dataset.id === this.examinationBatchChoose) {
      this.setData({
        examinationBatchChoose: '',
        examinationBatchChoosetitle: ''
      })
    } else {
      this.setData({
        examinationBatchChoose: e.currentTarget.dataset.id,
        examinationBatchChoosetitle: e.currentTarget.dataset.title
      })
    }

    this.setData({
      currentPages: 1
    })
    this.cancelModel()
    this.getSchoolList()
  },
  probabilityChoose(e) {//选择录取概率
    if (this.data.probabilityID === e.currentTarget.dataset.id) {
      this.setData({
        probabilityID: '',
        probabilityName: ''
      })
    } else {
      this.setData({
        probabilityID: e.currentTarget.dataset.id,
        probabilityName: e.currentTarget.dataset.name
      })
    }
    this.setData({
      currentPages: 1
    })
    this.cancelModel()
    this.getSchoolList()
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
      area: this.data.activeAddressarr.join(','),
      batch: this.data.examinationBatchChoosetitle,
      sprint: this.data.probabilityID
    }
    app.request.forecastList({ ...data, ...pro, page: this.data.currentPages, })
      .then(r => {
        
        if (this.data.currentPages === 1) {
          this.setData({
            schoolList: r.data.data,
            length: r.data.data.length
          })
        } else {
          let schoolList = this.data.schoolList
          schoolList = schoolList.concat(r.data.data)
          this.setData({
            schoolList: schoolList
          })
        }
        if (r.data.data.length && r.data.data.length >= 10) {
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
  onLoad: function (options) {
    var user = wx.getStorageSync('UserInfo')
    this.setData({
      vipL: user.vip.vip_level
    })
    this.GETAreasList()
    this.getSchoolList()
    this.setData({
      probabilityList: app.probabilityList
    })
    this.setData({
      examinationBatch: app.examinationBatch
    })
    // this.getReSchoolList()
  },
  // getReSchoolList({ ...data }){
  //   app.request.recommendedSchools({...data})
  //     .then(r=>{
  //       console.log(r)
  //     })
  // },

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
    this.setData({
      currentPages: 1
    })
    this.getSchoolList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // this.getSchoolList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})