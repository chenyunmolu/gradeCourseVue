import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import LayoutView from '../layout/index.vue'
import SpecialityView from "../views/admin/SpecialityView.vue"
import ClassesView from "../views/admin/ClassesView.vue"
import TeacherView from "../views/admin/TeacherView.vue"
import StudentView from "../views/admin/StudentView.vue"
import ReleaseWorkView from "../views/teacher/ReleaseWorkView.vue"
import Profile from "@/views/student/profile/index.vue"
import StudentHomeView from "@/views/student/StudentHomeView.vue"
import TeacherHomeView from "@/views/teacher/TeacherHomeView.vue"
import TeacherProfile from "@/views/teacher/profile/index.vue"
import AdminProfile from "@/views/admin/profile/index.vue"
import SubmitWork from "@/views/student/SubmitWork.vue"
import BrowseWorkView from "@/views/teacher/BrowseWorkView.vue"
import SubmitSituation from "@/views/teacher/SubmitSituation.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "LoginView",
      component: LoginView
    },
    {
      path:'/LayoutView',
      name:'LayoutView',
      component:LayoutView,
      redirect:"/home",
      children:[
        {
          path: "/home",
          name: "home",
          component: HomeView
        }
      ]
    },
    {
      path:"/admin",
      component:LayoutView,
      redirect: 'noredirect',
      children:[
        {
          path:"profile",
          name:"AdminProfile",
          component:AdminProfile
        },
        {
          path:"SpecialityView",
          name:"SpecialityView",
          component:SpecialityView
        },
        {
          path:"ClassesView",
          name:"ClassesView",
          component:ClassesView
        },
        {
          path:"TeacherView",
          name:"TeacherView",
          component:TeacherView
        },
        {
          path:"StudentView",
          name:"StudentView",
          component:StudentView
        }
      ]
    },
    {
      path: "/student",
      component: LayoutView,
      redirect: 'noredirect',
      children:[
        {
          path:"profile",
          name:"Profile",
          component:Profile
        },
        {
          path:"submitWork",
          name:"SubmitWork",
          component:SubmitWork
        },{
          path:"studentHomeView",
          name:"StudentHomeView",
          component:StudentHomeView
        }
      ]
    },
    {
      path: "/teacher",
      component: LayoutView,
      redirect: 'noredirect',
      children:[
        {
          path:"profile",
          name:"TeacherProfile",
          component:TeacherProfile
        },
        {
          path:"browseWorkView",
          name:"BrowseWorkView",
          component:BrowseWorkView
        },
        {
          path:"submitSituation",
          name:"SubmitSituation",
          component:SubmitSituation
        },
        {
          path:"releaseWorkView",
          name:"ReleaseWorkView",
          component:ReleaseWorkView
        },
        {
          path:"teacherHomeView",
          name:"TeacherHomeView",
          component:TeacherHomeView
        },
        {
          path:"StudentView",
          name:"StudentView",
          component:StudentView
        }
      ]
    },
  ]
})

export default router
