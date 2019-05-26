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
        school:''
    },
    saveData() {
        let { scoreOne, scoreTwo, scoreThere,school } = this.data
        let temData = {}
        let userPerf = wx.getStorageSync('userPerf')
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
      temData.school = school || userPerf.school
        temData.mock_one.total = scoreOne || 0
        temData.mock_two.total = scoreTwo || 0
        temData.mock_three.total = scoreThere || 0
        


        userPerf = Object.assign(userPerf, temData)
        console.log(userPerf)
        wx.setStorageSync('userPerf', userPerf)
        console.log(wx.getStorageSync('userPerf'))
    },
    toIndex() {
        this.saveData()
      let { provinceId, branchSubjectindex,...data} = wx.getStorageSync('userPerf')
      let type = Number(branchSubjectindex) + 1
        let area_id = provinceId
      app.request.Mocks({ ...data, type, area_id })
        .then(r=>{
          console.log(r)
          wx.switchTab({
            url: '/pages/voluntPredict/index',
          })
        })
        .catch(e=>{
          
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
            case '4':
                this.setData({
                  school: value
                })
                break;
        }

    },
    toBranch(e) {
        let item = e.target.dataset.item
        this.saveData()
        wx.navigateTo({
            url: `/pages/login/subjects?item=${item}`,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      app.request.getUserInfo()
        .then(r=>{
          wx.setStorageSync('UserInfo', r.data)
          let userPerf = wx.getStorageSync('UserInfo')
          console.log(userPerf)
          if (userPerf) {
            this.setData({
              scoreOne: userPerf.mock.mock_one.total,
              scoreTwo: userPerf.mock.mock_two.total,
              scoreThere: userPerf.mock.mock_three.total,
              school: userPerf.school
            })
          }
        })
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})