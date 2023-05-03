import { defineStore } from "pinia";
import { login } from "../api/loginAPI";
import router from "../router/index.js";
const userAuthStore = defineStore( {
  id:"user",
  persist: {
    enabled: true
  },
  state: () => {
    return {
      user: null,
      token: null,
    };
  },
  actions: {
    login(credentials) {
      login(credentials).then(res=>{
          this.user=res.data.user;
          this.token=res.data.token;
          if(this.user.usertype=='学生'){
            router.push({path:'/student/studentHomeView'})
          }else if(this.user.usertype=='教师'){
            router.push({path:'/teacher/teacherHomeView'})
          }else{
            router.push({path:'/home'})
          }
                
      })
    },
  },
});

export default userAuthStore;
