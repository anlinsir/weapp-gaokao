// pages/professionalInto/index.js
const app = getApp()
Page({
  data: {
    name: 'name1',
    urlId:0,
    majorsList: [],//专业
    submajorsList:[],//次级专业
    SubsubmajorsList: [],//次次级专业
    name:'0101',
    professionalActive1:0,
    level:'1'
  },
  toSomePage(e) {
    let id = Number(e.currentTarget.dataset.id)
    console.log(id)
    this.setData({
      urlId: id,
    })
  },
  changePages({ detail}){
    this.setData({
      level: detail
    })
    this.getmajor()
  },
  changeActive(e){//更换专业大类
    let id = Number(e.currentTarget.dataset.id)
    this.setData({
      professionalActive1: id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getmajor(){
    app.request.majors({ level: this.data.level})
      .then(r => {
        this.setData({
          majorsList: r.data
        })
        app.request.majors({ parentId: this.data.majorsList[0].code, level: this.data.level })
          .then(r => {
            this.setData({
              submajorsList: r.data
            })
            app.request.majors({ parentId: this.data.submajorsList[0].code, level: this.data.level })
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
  },
  changeMajors({ detail }){//改变父专业
    this.setData({
      submajorsList:[]
    })
    app.request.majors({ parentId: detail[1], level: this.data.level})
      .then(r => {
        this.setData({
          submajorsList: r.data
        })
        app.request.majors({ parentId: this.data.submajorsList[0].code, level: this.data.level })
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
    app.request.majors({ parentId: detail[1], level: this.data.level })
      .then(r => {
        this.setData({
          SubsubmajorsList: r.data
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