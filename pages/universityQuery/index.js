// pages/universityQuery/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlId:0 ,
    name: 'name1',
    majorsList: [],//专业
    submajorsList: [],//次级专业
    SubsubmajorsList: [],//次次级专业
    professionalActive1: 0,

    //school
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
    examinationBatchChoose:-1,//选择的报考批次

    probabilityList: [{
      name: '推荐',
      id: 1
    }, {
      name: '冲刺',
      id: 2
    }],//录取概率列表
    probabilityID: '',//录取概率Id


    schoolTypeList: [],//学校类型列表
    typeId:'',

    schoolList: [],//学校列表
    currentPages: 1,//当前页数
    loading: false,//

    //school

    areaslist: [],//区域列表
    activeAddress: {},//已选区域列表
    activeAddressNum:0,
    yearList: ['全部', '2018', '2017', '2016', '2015', '2014', '2013', '2012',],//年份列表
    yearListId:-1,

    Sareaslist:[],//批次区域列表
    SactiveAddress:{},
    SactiveAddressNum:0

  },
  changeSwiper({detail}){
    this.setData({
      urlId: detail.current
    })
  },
  GETAreasList() {
    const data = wx.getStorageSync('areasList')
    if (data && data.length) {
      this.setData({
        areaslist: data,
        Sareaslist:data
      })
    } else {
      app.request.getAreasList()
        .then(r => {
          this.setData({
            areaslist: r.data,
            Sareaslist:r.data
          })

          wx.setStorageSync('areasList', r.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  getAddress(e) { //保存选中的地址
    var arr = this.data.activeAddress
    if (!arr[Number(e.currentTarget.dataset.id)]) {
      arr[Number(e.currentTarget.dataset.id)] = e.currentTarget.dataset.name
      this.setData({
        activeAddressNum: this.data.activeAddressNum + 1
      })
    } else {
      delete arr[Number(e.currentTarget.dataset.id)] 
      this.setData({
        activeAddressNum: this.data.activeAddressNum - 1
      })
    }
    this.setData({
      activeAddress: arr
    })
   
  }, 

  SgetAddress(e){
    console.log(e)
    var arr = this.data.SactiveAddress
    if (!arr[Number(e.currentTarget.dataset.id)]) {
      arr[Number(e.currentTarget.dataset.id)] = e.currentTarget.dataset.name
      this.setData({
        SactiveAddressNum: this.data.SactiveAddressNum + 1
      })
    } else {
      delete arr[Number(e.currentTarget.dataset.id)]
      this.setData({
        SactiveAddressNum: this.data.SactiveAddressNum - 1
      })
    }
    this.setData({
      SactiveAddress: arr
    })
  } ,
  toSomePage(e){
    let id = Number(e.currentTarget.dataset.id)
    this.setData({
      urlId: id,
      showAddress: -1,
    })
  },

  changeActive(e) {//更换专业大类
    let id = Number(e.currentTarget.dataset.id)
    this.setData({
      professionalActive1: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getmajor() {
    app.request.majors()
      .then(r => {
        this.setData({
          majorsList: r.data
        })
        app.request.majors({ parentId: this.data.majorsList[0].code })
          .then(r => {
            this.setData({
              submajorsList: r.data
            })
            app.request.majors({ parentId: this.data.submajorsList[0].code })
              .then(r => {
                this.setData({
                  SubsubmajorsList: r.data
                })

              })
          })
      })
  },
  onLoad: function (options) {
    this.getmajor()
    this.getSchoolList()
    this.getTypeList()
    this.GETAreasList()
  },
  changeMajors({ detail }) {//改变父专业
    this.setData({
      submajorsList: []
    })
    app.request.majors({ parentId: detail[1] })
      .then(r => {
        this.setData({
          submajorsList: r.data
        })
        app.request.majors({ parentId: this.data.submajorsList[0].code })
          .then(r => {
            this.setData({
              SubsubmajorsList: r.data
            })

          })
      })
  },
  changeSubMajors({ detail }) {//改变次专业
    // this.setData({
    //   SubsubmajorsList: []
    // })
    app.request.majors({ parentId: detail[1] })
      .then(r => {
        this.setData({
          SubsubmajorsList: r.data
        })


      })
  },

  //school

  getTypeList() {//获取学校类型列表
    app.request.getTypeList()
      .then(r => {
        this.setData({
          schoolTypeList: r.data
        })
      })
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
  // getAddress(e) { //保存选中的地址
  //   var arr = this.data.activeAddress
  //   if (!arr[Number(e.currentTarget.dataset.id)]) {
  //     arr[Number(e.currentTarget.dataset.id)] = true
  //   } else {
  //     arr[Number(e.currentTarget.dataset.id)] = false
  //   }
  //   this.setData({
  //     activeAddress: arr
  //   })
  // },
  typeChoose(e) {//选择学校类型
    this.setData({
      typeId: e.currentTarget.dataset.id
    })
    this.cancelModel()
  },
  BatchChoose(e) {//选择报考批次
    this.setData({
      examinationBatchChoose: e.currentTarget.dataset.id
    })
    this.cancelModel()
  },
  yearChoose(e){//切换年份
    this.setData({
      yearListId: e.currentTarget.dataset.id
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
  toStuDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/stuDetail/index?id=${id}`,
    })
  },












  /**
   * 生命周期函数--监听页面加载
   */


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
    this.getSchoolList()
    console.log('tuyhijuoip')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})