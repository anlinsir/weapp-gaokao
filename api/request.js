/**
 * name: api.js
 * description: request处理基础类

 * date: 2018-5-19
 */
class request {
    constructor() {
      this._baseUrl = "http://api.spraycd.com"
    }

    /**
     * 设置统一的异常处理
     */
    setErrorHandler(handler) {
        this._errorHandler = handler;
    }
  

    /**
     * GET类型的网络请求
     */
    getRequest(url, data, header = this._header) {
      console.log('token')
      console.log('Bearer ' + wx.getStorageSync('token'))
      return this.requestAll(url, data, {
        Authorization: 'Bearer ' + wx.getStorageSync('token') || ''
      }, 'GET')
    }

    /**
     * DELETE类型的网络请求
     */
    deleteRequest(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'DELETE')
    }

    /**
     * PUT类型的网络请求
     */
    putRequest(url, data, header = this._header) {
        return this.requestAll(url, data, header, 'PUT')
    }

    /**
     * POST类型的网络请求
     */
    postRequest(url, data, header = this._header) {
      console.log('token')
      console.log('Bearer ' + wx.getStorageSync('token'))
      return this.requestAll(url, data, {
        Authorization: 'Bearer ' + wx.getStorageSync('token') || ''
      }, 'POST')
    }

    /**
     * 网络请求
     */
    requestAll(url, data, header, method) {
      var _this = this
        return new Promise((resolve, reject) => {
            wx.request({
                url: url,
                data: data,
                header: header,
                method: method,
                success: (res => {
                    if (res.statusCode === 200) {
                        //200: 服务端业务处理正常结束
                      
                      // if (res.data.code === 7900){
                      //   wx.showModal({
                      //     title:'提示',
                      //     content:'你的登录已失效,请重新登录',
                      //     showCancel:false,
                      //     confirmText:'重新登录',
                      //     success:(res)=>{
                      //       wx.showLoading({
                      //         title: '登录中',
                      //         mask:true
                      //       })
                      //       wx.login({
                      //         success({ code }) {
                      //           _this.getRequest(_this._baseUrl + '/api/v1/auth/session', { code:code })
                      //           .then(r =>{
                      //             wx.hideLoading()
                      //             wx.showToast({
                      //               title:'登录成功'
                      //             })
                      //             wx.setStorageSync('token', r.data.data.token)
                      //             wx.switchTab({
                      //               url:'/pages/user/index'
                      //             })
                      //           })
                      //         }
                      //       })
                      //     }
                      //   })
                      // }
                        resolve(res)
                    } else {
                        //其它错误，提示用户错误信息
                      
                        if (this._errorHandler != null) {
                            //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理

                            this._errorHandler(res)
                        }
                        reject(res)
                    }
                }),
                fail: (res => {
                  console.log(res)
                    if (this._errorHandler != null) {
                        this._errorHandler(res)
                        
                    }
                    reject(res)
                })
            })
        })
    }
}

export default request