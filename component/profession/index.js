// component/profession/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    majorsList:{
      type:Array
    },
    submajorsList:{
      type:Array
    },
    SubsubmajorsList:{
      type:Array
    },
    name:{
      type:String
    },
    types:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    urlId: 0,
    professionalActive1: '01'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeSwier({detail}){
      this.setData({
        urlId: detail.current
      })
    },
    changeSubMajors(e){
      let id = (e.currentTarget.dataset.id)
      this.triggerEvent('changeSubMajors', [this.data.urlId, id])
    },
    toPorfess(){
      if (this.data.types == 2){
        wx.navigateTo({
          url: '/pages/VPSubjectIn/school',
        })
      }else{
        wx.navigateTo({
          url: '/pages/proDetail/index',
        })
      }
      
    },
    toSomePage(e) {
      let id = Number(e.currentTarget.dataset.id)
      this.setData({
        urlId: id
      })
      this.triggerEvent('changePages',id+1)
    },
    changeActive(e) {//更换专业大类
      let id = (e.currentTarget.dataset.id)
      this.setData({
        professionalActive1: id
      })
      this.triggerEvent('changeMajors', [this.data.urlId, this.data.professionalActive1]);
    },
  }
})
