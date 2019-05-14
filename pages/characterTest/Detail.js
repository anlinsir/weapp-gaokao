// pages/characterTest/Detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruit: [{
      id: 1,
      name: '有让人羡慕的身材或外表',
    }, {
      id: 2,
        name: '有出色的厨艺'
    }, {
      id: 3,
        name: '胖'
    }, {
      id: 4,
      name: '打篮球像蔡徐坤',
    }],
    current: '苹果',
    position: 'left',
    animal: '熊猫',
    checked: false,
    disabled: false,
    urlId: 0,
    swiperNum:6,

    subjectlist:[],//题目列表
    subjectresult:[],//最终结果
    result:{},
  },
  changeSwiper(val){
    console.log(val)
    this.setData({
      urlId: val.detail.current
    })
  },
  testconfrim(){
    //到最后一个的时候
    let result = {}
    for (var i in this.data.subjectlist) {
      var title = this.data.subjectresult[i]
      for (var j of this.data.subjectlist[i].options) {
        if (j.title === title) {
          if (!result[j.weight]) {
            result[j.weight] = 1
          } else {
            result[j.weight] = result[j.weight] + 1
          }
        }
      }
    }
    this.setData({
      result: result
    })
    app.request.getsubjectresulte({ ...this.data.result})
      .then(r=>{
        console.log(r)
        let {exam,id,user_id} = r.data
      })
    // wx.navigateBack({
    //   delta:1
    // })
  },
  addIndex() {
    var a = Number(this.data.urlId)
    if (a == this.data.swiperNum) {
      return
    }
    a++
    this.setData({
      urlId: a 
    })
  },
  subIndex(){
    var a = Number(this.data.urlId)
    if (a == 0) {
      return
    }
    a--
    this.setData({
      urlId:a
    })
  },
  handleFruitChange(e) {
    console.log(e)
    let { detail } = e 
    let id = e.currentTarget.dataset.id
    let subjectresult = this.data.subjectresult
    subjectresult[id] = detail.value
    this.setData({
      subjectresult: subjectresult
    })
    this.setData({
      current: detail.value 
    });
  },
  addVar(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '加载中...',
      icon: 'none',
      duration: 100000
    })
    app.request.getSubjectList()
      .then(r => {
        this.setData({
          subjectlist:r.data
        })
        this.setData({
          swiperNum: this.data.subjectlist.length
        })
        wx.hideToast()
      })
    // app.request.getpartSubjectList()
    //   .then(r => {
    //     console.log(r)
    //   })

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