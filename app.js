//app.js
var Bmob = require('/dist/Bmob-2.2.5.min.js');
Bmob.initialize("56f38f7a4da86d2b", "123456");
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //一键登录bmob,等待启用
    var userData
    Bmob.User.auth().then(res => {
      // console.log(res);
      // console.log(userData);
      console.log("一键登录成功");
      userData = {
        nickName: res.nickName,
        objectId: res.objectId,
        openid: res.authData.weapp.openid,
        userPic: res.userPic,
        username: res.username
      };
      // console.log(userData);
      wx.setStorageSync('userData', userData);
      wx.setStorageSync('openid', res.authData.weapp.openid)
    }).catch(err => {
      console.log(err);
    })

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})