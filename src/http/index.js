import axios from "axios";
import userAuthStore from "../store/auth.store.js";
import { Notification, MessageBox, Message } from 'element-ui'
import errorCode from "../utils/errorCode.js"
import router from "../router/index.js";


// 是否显示重新登录
let isReloginShow;

// 创建Axios实例
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/",
  timeout: 2000,        // 配置请求超时
});


axiosInstance.interceptors.request.use(
  function (config) {
    let authStore = userAuthStore();

    if (authStore && authStore.token) {
      config.headers.authorization = "Bearer " + authStore.token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);


// 响应拦截器
axiosInstance.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  if (code !== "1" && code!==200) {
    Notification.error({
      title: msg
    })
    return Promise.reject('error')
  } else {
    return res
  }
},
error => {
  console.log('err' + error)
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  }
  else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  }
  else if (message.includes("Request failed with status code")) {
    if(message.substr(message.length - 3)==401){
      message = "认证失败，用户名或者密码错误！"
    }else if(message.substr(message.length - 3)==500){
      userAuthStore().user=null,
      userAuthStore().token=null,
      message = "登录过期，请重新登录！",
      router.push({path:'/'})   
    }else if(message.substr(message.length - 3)==400){
      message = "请求错误或者重复登录",
      router.push({path:'/home'})   
    }
  }
  Message({
    message: message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)


//导出Axios实例
export default axiosInstance;
