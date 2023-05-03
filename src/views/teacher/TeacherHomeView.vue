<template>
  <div>
    <el-row v-if="releaseWorkNum != 0">
      <el-col :span="5" v-for="(work, index) in works" :key="index" :offset="1">
        <el-card
          :body-style="{ padding: '0px' }"
          class="mb-5 el-card"
          shadow="hover"
        >
          <el-image
            :src="work.serverFilePath"
            class="d-block w-100 image"
            fit="cover"
            :preview-src-list="[work.serverFilePath]"
          ></el-image>
          <div style="padding: 14px">
            <span style="font-size: 14px; color: #999">{{
              work.workname
            }}</span>
            <span class="mx-3">{{ work.workrequirement }}</span>
            <div style="color: #2fbd56; padding-top: 2px">
              {{ work.aClass.classname }}
            </div>
            <div style="padding-top: 6px">
              <el-tag
                type="success"
                effect="plain"
                v-if="work.allowLateSubmission == '1'"
                >允许迟交</el-tag
              ><el-tag
                type="danger"
                effect="plain"
                v-if="work.allowLateSubmission == '0'"
                >禁止迟交</el-tag
              >
            </div>
            <div class="bottom clearfix">
              <time class="time">{{ work.endtime }}截止</time>
              <el-button type="text" class="button" @click="gotoUpdate"
                >去修改</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="releaseWorkNum == 0" type="flex" justify="center">
      <el-col :span="12" class="fontContent mt-5"
        >您还没有发布任何作业，赶快去发布吧</el-col
      >
    </el-row>
  </div>
</template>

<script>
import { getWorkByTid } from "@/api/ReleaseWorkAPI.js";
import userAuthStore from "@/store/auth.store.js";
import { parseTime } from "@/utils/ruoyi.js";
export default {
  name: "TeacherHomeView",
  data: function () {
    return {
      releaseWorkNum: Number,
      works: [],
      work: {
        workid: "",
        workname: "",
        workrequirement: "",
        starttime: "",
        endtime: "",
        tid: "",
        aClass: {},
        allowLateSubmission: "",
        filePath: "",
        oldFileName: "",
        serverFilePath: "",
      },
    };
  },
  methods: {
    gotoUpdate() {
      this.$router.push({ path: "/teacher/releaseWorkView" });
    },
    getWorksByTid(tid) {
      getWorkByTid(tid).then((res) => {
        this.works = res.data.data;
        for (let i = 0; i < this.works.length; i++) {
          this.works[i].starttime = parseTime(this.works[i].starttime);
          this.works[i].endtime = parseTime(this.works[i].endtime);
        }
        if (res.data.data == 0) {
          this.releaseWorkNum = 0;
        } else {
          this.releaseWorkNum = this.works.length;
        }
      });
    },
  },
  created() {
    this.work.tid = userAuthStore().user.userid;
    this.getWorksByTid(this.work.tid);
  },
};
</script>

<style scoped>
.el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.fontContent {
  font-size: 2em;
  font-family: "宋体";
  color: rgb(127, 174, 255);
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: 163px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>