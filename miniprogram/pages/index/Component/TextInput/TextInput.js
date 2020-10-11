// pages/index/Component/TextInput/TextInput.js
var app = getApp();
var racer = require('../funs/racer.js');
Page({
  data: {
    focus: false,
    inputMin: '',
    inputSec: '',
    pacer_km: '',
    t_5km:'',
    t_10km: [0, 0, 0],
    t_half: [0, 0, 0],
    t_mara: [0, 0, 0],
    inputMeter:'',
    inputRate:'',
    inputValue:'',
    inputP400:'',
    ghostImg:'../img/ghost.jpg'
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Pacer 跑的更快更科学',
      path: '/pages/index/Component/TextInput/TextInput',
      success: function(res) {
        // 转发成功
        if (res.errMsg == 'shareAppMessage:ok') {
        }
      },
      fail: function(res) {
        // 转发失败之后的回调
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {
          // 转发失败，其中 detail message 为详细失败信息
        }
      }
    }
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  pace_min: function (e) {
    this.setData({
      inputMin: e.detail.value
    })
  },
  pace_sec: function (e) {
    this.setData({
      inputSec: e.detail.value,
    })
    var min = this.data.inputMin
    var sec = this.data.inputSec
    var km_h = 0
    if (min > 0) {
      km_h = 60 / (parseFloat(sec / 60) + parseFloat(min))
    }
    this.setData({
      pacer_km: km_h.toPrecision(4),
      t_5km: racer.Five_km_race(min, sec),
      t_10km: racer.Ten_km_race(min, sec),
      t_half: racer.Half_marathon_race(min, sec),
      t_mara: racer.Marathon_race(min, sec),
      inputP400: racer.Pkm_to_400m(min, sec)
    })
  },
  pace_400m:function(e)
  {
    var p400_t = e.detail.value
    this.setData({
      inputP400: p400_t
    })
    var min = racer.P400m_to_km(p400_t)[0]
    var sec = racer.P400m_to_km(p400_t)[1]
    var km_h = 0
    if (min > 0) {
      km_h = 60 / (parseFloat(sec / 60) + parseFloat(min))
    }
    this.setData({
      inputMin: min,
      inputSec:sec,
      pacer_km: km_h.toPrecision(4),
      t_5km: racer.Five_km_race(min, sec),
      t_10km: racer.Ten_km_race(min, sec),
      t_half: racer.Half_marathon_race(min, sec),
      t_mara: racer.Marathon_race(min, sec)
    })
  },
  input_rate_meter:function(e)
  {
    var st = e.detail.value
    var min = this.data.inputMin
    var sec = this.data.inputSec
    this.setData({
      inputMeter: st
    })
    if(st && (sec||min))
    {
      this.setData({
        inputRate: racer.getRatemin(min, sec, st)
      }) 
    }
  },
  input_rate_min:function(e)
  {
    var sr = e.detail.value
    var min = this.data.inputMin
    var sec = this.data.inputSec
    this.setData({
      inputRate: sr
    })
    if (sr && (sec || min)) {
      this.setData({
        inputMeter: racer.getStride(min, sec, sr)
      }) 
    }
  },
  about_ghost: function () {
    wx.navigateTo({
      url: "../wxpage/about_ghost",
      //  url: '../logs/logs'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad:' + app.globalData.domain)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
    /*Touched by Ghostxiu 2020.5 */