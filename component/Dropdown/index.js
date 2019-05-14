// pages/testPredictions/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    // 带有遮罩层的下拉菜单    
    openPicker: false,
    needAnimation: false,
    contentHeight: 1000,
    itemId: 0,      // 默认选中第一个   
    orgList: [
      { Name: '11111' },
      { Name: '22222' },
      { Name: '33333' },
      { Name: '44444' },
      { Name: '55555' },
      { Name: '66666' },
      { Name: '777777' },
    ],
  },
  methods:{
    onPickHeaderClick() {
      this.setData({
        openPicker: !this.data.openPicker,
        needAnimation: true
      });
    },
    clickPick(e) {
      var self = this;
      var ids = e.currentTarget.dataset.id;  //获取自定义的id       
      this.setData({
        itemId: ids,  //把获取的自定义id赋给当前列的id(即获取当前列下标) 
        openPicker: !this.data.openPicker,
      })
    }
  },
  // 带有遮罩层的下拉菜单  
  
  /**   
  * 点击选中下拉列表项   
  * */
  


})