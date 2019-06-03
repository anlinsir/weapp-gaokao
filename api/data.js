import request from './request'
import {
  baseUrl
} from './config.js'
class api {
  constructor() {
    this._baseUrl = baseUrl
    this._defaultHeader = {

    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {}

  UnToken(res) {
    console.log(res)
  }

  //模考录入
  Mocks({ ...data
  }) {
    return this._request.postRequest(this._baseUrl + '/api/v1/mock', { ...data
    }).then(res => res.data)

  }
  /**
   * 获取区域列表
   */
  getAreasList({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/areas', { ...data
    }).then(res => res.data)
  }
  //登录
  Login({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/auth/session', { ...data
    }).then(res => res.data)
  }
  //用户信息更新
  UserInfoUpdata({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/auth/update', { ...data
    }).then(res => res.data)
  }
  //高效列表
  Univer({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/search', { ...data
    }).then(res => res.data)
  }
  //专业列表
  majors({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/majors', { ...data
    }).then(res => res.data)

  }
  //类型列表 获取学校列表筛选时
  getTypeList({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/type', { ...data
    }).then(res => res.data)

  }

  //获取学校详情
  schoolDetail({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/detail', { ...data
    }).then(res => res.data)

  }

  //学校详情 --- 院校分数线
  schoolDetailScores({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/college/scores', { ...data
    }).then(res => res.data)

  }

  //学校列表 --- 通过专业搜索院校列表
  schoolListScoresMajor({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/college/majors', {
      ...data
    }).then(res => res.data)
  }

  //学校详情 --- 专业录取分数线
  schoolDetailScoresMajor({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/college/type', {
      ...data
    }).then(res => res.data)
  }

  //获取题目列表
  getSubjectList({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/subject', { ...data
    }).then(res => res.data)

  }
  //题目部分列表
  getpartSubjectList({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/subject/step', { ...data
    }).then(res => res.data)

  }
  //题目结果
  getsubjectresulte({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/subject/exam', { ...data
    }).then(res => res.data)

  }

  //发起预支付
  forcePay({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/pay', { ...data
    }).then(res => res.data)

  }

  //考前预测
  forecastList({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/forecast', { ...data
    }).then(res => res.data)

  }


  //志愿测评
  achievementUpdate({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/achievement/update', { ...data
    }).then(res => res.data)

  }
  //推荐高校列表
  recommendedSchools({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/achievement', { ...data
    }).then(res => res.data)

  }

  //测试完之后使用的列表
  testoverList({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/subject/college', { ...data
    }).then(res => res.data)

  }


  //获取用户信息

  getUserInfo({ ...data
  }) {
    return this._request.postRequest(this._baseUrl + '/api/v1/auth/info', { ...data
    }).then(res => res.data)

  }

  //批次查询
  getbatchItem({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/batchItem', { ...data
    }).then(res => res.data)

  }

  //专业详情
  majorDetails({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/majors/info', { ...data
    }).then(res => res.data)

  }

  //专业 学校查询

  majorSchool({ ...data
  }) {
    return this._request.getRequest(this._baseUrl + '/api/v1/college/majors', { ...data
    }).then(res => res.data)

  }


  majorQuery({...data}){
    return this._request.getRequest(this._baseUrl + '/api/v1/majors/college', {
      ...data
    }).then(res => res.data)
  }
    
  //判断能否支付

  canPay({...data}){
    return this._request.getRequest(this._baseUrl + '/api/v1/options/vip', {
    ...data}).then(res => res.data)

  }



}
export default api  