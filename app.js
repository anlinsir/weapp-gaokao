//app.js
import request from './api/data'
App({
    branchSubject: ['文科', '理科'],
    request: new request(),
    userInfo: null,
    globalData: {
        userInfo: null,
        baseUrl: '',
        //token失效状态码
        loseTokenCode: [],
        //成功状态码
        SCode: 200,
    },
    probabilityList: [{
      name: '推荐',
      id: 1
    }, {
      name: '冲刺',
      id: 2
    }],//录取概率列表
    examinationBatch: [{
      name: '本科一批次',
      id: 1
    }, {
      name: "本科二批次",
      id: 2
    }, {
      name: '专科',
      id: 3
  }],//批次列表
    onLaunch: function() { //获取本地或者远程用户信息
        var _this = this

        if (wx.getStorageSync('token')) {
            _this.globalData.userInfo = wx.getStorageSync('token')
        } else {
            wx.login({
                success({ code }) {
                    if (code) {
                        _this.request.Login({ code })
                            .then(({ data }) => {
                                _this.globalData.userInfo = data
                                wx.setStorageSync('token', data.token)
                            })

                    } else {
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        }
    },
    getuserInfo() { //获取用户信息
        // login useinfo //后台接口

    },
    removeUserInfo() { //移除用户信息

    }
})