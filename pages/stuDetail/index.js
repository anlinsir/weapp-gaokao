// pages/stuDetail/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlId: 0,
    collegeScores: [],//院校分数
    majorScores:[],//专业分数
    schoolDetail:null,//学校详情
    branchSubject:[],//文理科
    branchSubjectId:0,//选中的
    branchSubjectBoxShow:false,//文理科选择框

    yearList: ['2018', '2017', '2016', '2015', '2014', '2013', '2012',],//年份列表
    yearListId:0,
    yearListBox:false

  },
  changeyearListBox(){
    this.setData({
      yearListBox: !this.data.yearListBox
    })
  },
  changeyearList(e){//更换年份
    let id = e.currentTarget.dataset.id
    let year
    if(id === 0){
      year = 0
    }else{
       year = this.data.yearList[id]
    }
    console.log(year)
    this.setData({
      yearListId: id ,
      yearListBox: false
    })
    this.getschoolDetailScoresMajor()
  },
  changebranchSubjectBoxShow(e){
      this.setData({
        branchSubjectBoxShow: !this.data.branchSubjectBoxShow
      })
  },
  changebranchSubject(e){//改变文理科
      let id = e.currentTarget.dataset.id
      this.setData({
        branchSubjectId:Number(id),
        branchSubjectBoxShow:false
      })
    
    this.getschoolDetailScoresMajor()
  },
  toSomePage(e) {
    let id = Number(e.currentTarget.dataset.id)
    this.setData({
      urlId: id
    })
  },
  getSchoolDetail(id){//学校详情获取
    app.request.schoolDetail({id})
      .then(r=>{
        this.setData({
          schoolDetail: r.data
        })
      })
  },
  getschoolDetailScores(id){//获取院校详情
    app.request.schoolDetailScores({ college:id})
      .then(r=>{
        this.setData({
          collegeScores: r.data
        })
      })
  },
  getschoolDetailScoresMajor({...data}){
    //  year: this.data.yearListId, type: (this.data.branchSubjectId)
    wx.showLoading({
      title:'加载中'
    })
    let year = this.data.yearList[this.data.yearListId]
    let type =  this.data.branchSubject[Number(this.data.branchSubjectId) ] 
    app.request.schoolDetailScoresMajor({ college: this.data.id, type, year })
      .then(r=>{
        this.setData({
          majorScores:r.data
        })
        wx.hideLoading()
      })
  },
  getyearList(num){//获取年份列表
    var arr = new Array(num)
    var yearList = this.data.yearList
    for(var i in arr){
      yearList.push(new Date().getFullYear() - i) 
    }
    this.setData({
      yearList: yearList
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: options.title
    }) 
    this.getSchoolDetail(options.id)
    this.getschoolDetailScores(options.id)
    
    let branchSubject = app.branchSubject
    this.setData({
      branchSubject: branchSubject
    })

    this.getschoolDetailScoresMajor()
    this.getyearList(5)
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