// pages/VPSubjectIn/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:'',//总成绩
    chinese: '', //语文分数
    mathematics: '', //数学分数
    english: '', //英语分数
    average: '', //综合分数
    pLevel:'',//省内排名

    type:'',//判断下一步去哪一个页面
    desable:false
  },
  toSchoolPage(){
    this.saveAchi()
  },
  changeData(e){
    let type = e.target.dataset.type
    let value = e.detail.value
    this.setData({
      [type]: value
    })
  },
  saveAchi(){
    let data = {
      total: this.data.total,
      ranking: this.data.pLevel,
      chinese: this.data.chinese,
      english: this.data.english,
      mathematics: this.data.mathematics,
      complex: this.data.average,
    }
    wx.showLoading({
      title: '加载中',
    })
    app.request.achievementUpdate({ ...data })
      .then(r =>{
        console.log(r)
            wx.hideLoading()
            if(r.code === 2000){
              wx.setStorageSync('UserInfo', r.data)
              if (this.data.type == 1) {
                wx.navigateTo({
                  url: `/pages/VPSubjectIn/school?type=${1}`,
                })
              } else if (this.data.type == 2) {
                wx.setNavigationBarTitle({
                  title: '专业匹配'
                })
                wx.navigateTo({
                  url: '/pages/professionalInto/index',
                })
              } else if (this.data.type == 3) {
                wx.setNavigationBarTitle({
                  title: '学校、专业精准匹配'
                })
                wx.navigateTo({
                  url: '/pages/characterTest/index',
                })
              }
            
            } else if (r.code === 0 || r.message == '修改失败, 每天只能修改一次'){
                wx.showModal({
                  title: '当日不能修改成绩',
                  showCancel:false,
                  success:()=>{
                    if (this.data.type == 1) {
                      wx.navigateTo({
                        url: `/pages/VPSubjectIn/school?type=${1}`,
                      })
                    } else if (this.data.type == 2) {
                      wx.navigateTo({
                        url: '/pages/professionalInto/index',
                      })
                    } else if (this.data.type == 3) {
                      wx.navigateTo({
                        url: '/pages/characterTest/index',
                      })
                    }
                  }
                })
            }
              
            
          })
        
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    if (this.data.type == 1) {
      
    } else if (this.data.type == 2) {
      wx.setNavigationBarTitle({
        title: '专业匹配'
      })
    } else if (this.data.type == 3) {
      wx.setNavigationBarTitle({
        title: '学校、专业精准匹配'
      })
    }

    wx.showLoading({
      title:"获取信息中"
    })
    app.request.getUserInfo()
      .then(r => {
        wx.hideLoading()
        wx.setStorageSync('UserInfo', r.data)
        var user = wx.getStorageSync('UserInfo')
        let { total, ranking, chinese, mathematics, english, complex } = user.achievement
        total = total == 0 ? '' : total
        ranking = ranking == 0 ? '' : ranking
        chinese = chinese == 0 ? '' : chinese
        mathematics = mathematics == 0 ? '' : mathematics
        english = english == 0 ? '' : english
        complex = complex == 0 ? '' : complex


        this.setData({
          total,//总成绩
          chinese, //语文分数
          mathematics, //数学分数
          english, //英语分数
          average: complex, //综合分数
          pLevel: ranking,//省内排名
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