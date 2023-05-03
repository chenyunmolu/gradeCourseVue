<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" />
                <i class="el-icon-user-solid"> 用户名称：</i>
                <div class="pull-right">{{ user.sname }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />
                <i class="el-icon-phone"> 手机号码：</i>
                <div class="pull-right">{{ user.telphone }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" />
                <i class="el-icon-message"> 用户邮箱：</i>
                <div class="pull-right">{{ user.email }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :stuid="user.stuid" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import resetPwd from "./resetPwd.vue";
import { getUserProfile } from "@/api/StudentAPI.js";
import userAuthStore from "@/store/auth.store.js";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {
        stuid: "",
        avatar: "",
      },
      activeTab: "userinfo",
    };
  },
  created() {
    this.user.stuid = userAuthStore().user.userid;
    this.user.avatar = userAuthStore().user.avatar;
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile(this.user.stuid).then((response) => {
        this.user = response.data.data;
      });
    },
  },
};
</script>
<style scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>