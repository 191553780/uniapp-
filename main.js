import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 挂载全局方法
import config from './common/config.js'
import lib from './common/lib.js'
import User from './common/user.js'
import request from './common/request.js'
Vue.prototype.config = config
Vue.prototype.lib = lib 
Vue.prototype.User = User
Vue.prototype.$http = request;

App.mpType = 'app'

const app = new Vue({
    ...App,
		config,
		lib
})
app.$mount()
