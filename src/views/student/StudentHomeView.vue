<template>
  <div>
    <el-row v-if="unSubmitedWorkNum != 0">
      <el-col :span="5" v-for="(work, index) in works" :key="index" :offset="1">
        <el-card
          v-if="work.submitStatus == '未提交'"
          :body-style="{ padding: '0px' }"
          shadow="hover"
          class="mb-5 cardBorder"
        >
          <div class="top" style="padding: 8px">
            <span
              ><el-tag type="success"
                ><i class="el-icon-edit"></i>作业</el-tag
              ></span
            >
          </div>
          <el-divider class="m-0"></el-divider>
          <div class="workname">{{ work.workname }}</div>
          <div class="workrequirement">{{ work.workrequirement }}</div>
          <div style="padding: 14px">
            <span>{{ work.teacher.tname }}</span>
            <span class="mx-3"
              ><el-tag type="success" v-if="work.timeStatus == '未超时'">{{
                work.timeStatus
              }}</el-tag>
              <el-tag type="danger" v-if="work.timeStatus == '已超时'">{{
                work.timeStatus
              }}</el-tag></span
            >
            <div class="bottom clearfix">
              <time class="time">{{ work.endtime }}截止 </time>
              <el-button type="text" class="button" @click="gotoSubmit"
                >去提交</el-button
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="unSubmitedWorkNum == 0" type="flex" justify="center">
      <el-col :span="12" class="fontContent mt-5"
        >您的作业已经全部完成，休息一下吧</el-col
      >
    </el-row>
  </div>
</template>

<script>
import { getMyWork } from "@/api/StudentAPI.js";
import userAuthStore from "@/store/auth.store.js";
import { parseTime } from "../../utils/ruoyi.js";
export default {
  name: "StudentHomeView",
  data: function () {
    return {
      user: {
        stuid: "",
      },
      works: [],
      unSubmitedWorkNum: Number,
    };
  },
  methods: {
    gotoSubmit() {
      this.$router.push({ path: "/student/submitWork" });
    },
  },
  created() {
    this.user.stuid = userAuthStore().user.userid;
    getMyWork(this.user.stuid).then((res) => {
      this.works = res.data.data;
      for (let i = 0; i < this.works.length; i++) {
        this.works[i].starttime = parseTime(this.works[i].starttime);
        this.works[i].endtime = parseTime(this.works[i].endtime);
      }
      let flag = 0;
      for (var i = 0; i < this.works.length; i++) {
        if (this.works[i].submitStatus == "未提交") {
          flag++;
        }
      }
      if (flag == 0) {
        this.$message({
          type: "success",
          message: "恭喜您，作业已经全部完成！",
        });
        this.unSubmitedWorkNum = 0;
      } else {
        this.unSubmitedWorkNum = flag;
      }
    });
  },
};
</script>

<style scoped>
.el-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.cardBorder {
  border-color: rgb(255, 160, 179);
}
.fontContent {
  font-size: 2em;
  font-family: "宋体";
  color: rgb(127, 174, 255);
}
.workname {
  font-size: 16px;
  color: #999999bf;
  padding-left: 14px;
  padding-top: 10px;
}

.workrequirement {
  font-family: "楷体";
  font-size: 20px;
  padding-left: 14px;
  padding-top: 10px;
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
  width: 100%;
  display: block;
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