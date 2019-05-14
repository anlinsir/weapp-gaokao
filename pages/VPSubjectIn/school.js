// pages/VPSubjectIn/school.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAddress:-1,
    activeAddress: {},//已选区域列表
    examinationBatch:[],//批次列表
    examinationBatchChoose:'',//选择的报考批次
    probabilityList:[],//录取概率列表
    probabilityID:'',//录取概率Id
    areaslist:[],//区域列表

    schoolList:[],//学校列表
    currentPages:1,//当前页数
    loading:false,//
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
  cancelModel(){//隐藏模态框
    this.setData({
      showAddress: -1
    })
  },
  changeAddressStatus(e){ //显示下拉框
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id == this.data.showAddress){
      this.cancelModel()
      return
    }
      this.setData({
        showAddress: e.currentTarget.dataset.id
      })
  },
  getAddress(e){ //保存选中的地址
    var arr = this.data.activeAddress
    if (!arr[Number(e.currentTarget.dataset.id)]){
      arr[Number(e.currentTarget.dataset.id)] = true
    }else{
      arr[Number(e.currentTarget.dataset.id)] = false
    }
    this.setData({
      activeAddress: arr
    })
    this.setData({
      currentPages: 1
    })
  },  
  BatchChoose(e){//选择报考批次
    this.setData({
      examinationBatchChoose:e.currentTarget.dataset.id
    })
    this.cancelModel()
    this.setData({
      currentPages: 1
    })
    this.getSchoolList()
  },
  probabilityChoose(e){//选择录取概率
    this.setData({
      probabilityID: e.currentTarget.dataset.id
    })
    this.cancelModel()
    this.setData({
      currentPages: 1
    })
  },
  getSchoolList({...data}){
    if (this.data.loading) return
    this.setData({
      loading:true
    })
    let arrareas = []
    for(var i in this.data.activeAddress){
      if (this.data.activeAddress[i]){
        arrareas.push(i)
      }
    }
    // arrareas
    let pro = {
      area:'',
      batch: this.data.examinationBatchChoose
    }
    app.request.Univer({ ...data, ...pro, page: this.data.currentPages, })
      .then(r=>{
        if (this.data.currentPages === 1){
          this.setData({
            schoolList:r.data.data
          })
        } else {
          let schoolList = this.data.schoolList
          schoolList = schoolList.concat(r.data.data)
          this.setData({
            schoolList: schoolList
          })
        }
        if (r.data.data.length && r.data.data.length >= 15){
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
    this.GETAreasList()
    this.getSchoolList()
    this.setData({
      probabilityList: app.probabilityList
    })
    this.setData({
      examinationBatch: app.examinationBatch
    })
    this.getReSchoolList()
  },
  getReSchoolList({ ...data }){
    app.request.recommendedSchools({...data})
      .then(r=>{
        console.log(r)
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
    this.setData({
      currentPages:1
    })
    this.getSchoolList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getSchoolList()
    console.log('tuyhijuoip')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})