<template>
  <div class="container-fluid">
    <el-container>
      <el-aside style="height: 800px" width="20%">
        <el-row class="tac">
          <el-col :span="24">
            <h5 class="text-center mt-3">课程评分系统</h5>
            <el-menu
              v-hasRole="'管理员'"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <router-link class="text-decoration-none" to="/home"
                  >主页</router-link
                >
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <router-link
                  class="text-decoration-none"
                  to="/admin/SpecialityView"
                  >专业管理</router-link
                >
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-school"></i>
                <router-link
                  class="text-decoration-none"
                  to="/admin/ClassesView"
                  >班级管理</router-link
                >
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-s-custom"></i>
                <router-link
                  class="text-decoration-none"
                  to="/admin/TeacherView"
                  >教师管理</router-link
                >
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-user"></i>
                <router-link
                  class="text-decoration-none"
                  to="/admin/StudentView"
                  >学生管理</router-link
                >
              </el-menu-item>
              <el-menu-item index="6">
                <i class="el-icon-user-solid"></i>
                <router-link class="text-decoration-none" to="/admin/profile"
                  >个人信息</router-link
                >
              </el-menu-item>
            </el-menu>
            <el-menu
              v-hasRole="'学生'"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <router-link
                  class="text-decoration-none"
                  to="/student/studentHomeView"
                  >主页</router-link
                >
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-s-order"></i>
                <router-link
                  to="/student/submitWork"
                  class="text-decoration-none"
                  >我的作业</router-link
                >
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-user-solid"></i>
                <router-link to="/student/profile" class="text-decoration-none"
                  >个人信息</router-link
                >
              </el-menu-item>
            </el-menu>
            <el-menu
              v-hasRole="'教师'"
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-menu-item index="1">
                <i class="el-icon-document"></i>
                <router-link
                  class="text-decoration-none"
                  to="/teacher/teacherHomeView"
                  >主页</router-link
                >
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-user"></i>
                <router-link
                  to="/teacher/StudentView"
                  class="text-decoration-none"
                  >学生管理</router-link
                >
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <router-link
                  to="/teacher/releaseWorkView"
                  class="text-decoration-none"
                  >作业管理</router-link
                >
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-s-platform"></i>
                <router-link
                  to="/teacher/browseWorkView"
                  class="text-decoration-none"
                  >作业浏览</router-link
                >
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-user-solid"></i>
                <router-link to="/teacher/profile" class="text-decoration-none"
                  >个人信息</router-link
                >
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header height="60px">
          <div class="right-menu">
            <el-dropdown
              class="avatar-container right-menu-item hover-effect"
              trigger="click"
            >
              <div class="avatar-wrapper">
                <img :src="user.avatar" class="user-avatar" />
                <i class="el-icon-caret-bottom" />
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link
                  v-if="user.usertype == '管理员'"
                  to="/admin/profile"
                  class="text-decoration-none"
                >
                  <el-dropdown-item><span>个人中心</span></el-dropdown-item>
                </router-link>
                <router-link
                  v-if="user.usertype == '学生'"
                  to="/student/profile"
                  class="text-decoration-none"
                >
                  <el-dropdown-item><span>个人中心</span></el-dropdown-item>
                </router-link>
                <router-link
                  v-if="user.usertype == '教师'"
                  to="/teacher/profile"
                  class="text-decoration-none"
                >
                  <el-dropdown-item><span>个人中心</span></el-dropdown-item>
                </router-link>
                <el-dropdown-item divided @click.native="logout">
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="right-menu-item">
              <el-row class="mt-2">
                <el-col :span="24">{{ user.username }}</el-col>
              </el-row>
            </span>
          </div>
        </el-header>
        <el-divider class="my-0"></el-divider>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import hasRole from "../directive/hasRole.js";
import userAuthStore from "../store/auth.store.js";
export default {
  name: "LayoutView",
  data: function () {
    return {
      user: {
        username: "",
        usertype: "",
        avatar: "",
      },
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          (userAuthStore().user = null),
            (userAuthStore().token = null),
            this.$router.push({ path: "/" });
        })
        .catch(() => {});
    },
  },
  created() {
    this.user = userAuthStore().user;
    console.log(this.user);
  },
  directives: {
    hasRole,
  },
};
</script>

<style lang="scss" scoped>
.right-menu {
  float: right;
  height: 100%;
  line-height: 50px;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 5px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>