<template>
  <div class="background-video container-fluid">
    <video loop="loop" muted="muted" autoplay ref="videoRef">
      <source src="../assets/video.mp4" type="video/mp4" />
    </video>
    <el-container class="content">
      <el-header height="100px"></el-header>
      <el-container>
        <el-main class="">
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-card
                body-style="{ padding: '0px' }"
                class="bg-opacity-10 bg-primary"
              >
                <el-row type="flex" justify="center">
                  <el-col :span="12">
                    <img
                      src="src/assets/img/sdjz.jpg"
                      class="img d-block avatarImg"
                    />
                  </el-col>
                </el-row>

                <div style="padding: 14px">
                  <div class="bottom clearfix">
                    <el-row>
                      <el-form
                        ref="form"
                        :model="user"
                        label-width="80px"
                        :rules="rules"
                        status-icon
                      >
                        <el-form-item label="用戶名:" prop="userName">
                          <el-input
                            clearable
                            v-model="user.userName"
                            placeholder="请输入用户名"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="password">
                          <el-input
                            clearable
                            show-password
                            v-model="user.password"
                            placeholder="请输入密码"
                          ></el-input>
                        </el-form-item>
                      </el-form>
                    </el-row>
                    <el-row type="flex" justify="space-around">
                      <el-button type="primary" plain @click="resetForm()"
                        >重置</el-button
                      >
                      <el-button type="success" plain @click="handleLoginUser()"
                        >登录</el-button
                      >
                    </el-row>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer height="140px"></el-footer>
    </el-container>
  </div>
</template>

<script>
import userAuthStore from "../store/auth.store.js";
export default {
  name: "LoginView",
  data: function () {
    return {
      user: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 18,
            message: "长度在 5 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleLoginUser: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          userAuthStore().login(this.user);
        } else {
          return false;
        }
      });
    },
    resetForm: function () {
      (this.user.userName = ""),
        (this.user.password = ""),
        this.$message({
          message: "恭喜你，重置成功！",
          type: "success",
        });
    },
  },
};
</script>

<style scoped>
.background-video {
  position: relative;
  width: 100%;
  height: 100%;
}

.background-video video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 802px;
  object-fit: cover;
}

.background-video .content {
  position: relative;
  z-index: 1;
  /* 页面内容样式 */
}
.avatarImg {
  width: 250px;
  height: 250px;
  opacity: 70%;
}
</style>