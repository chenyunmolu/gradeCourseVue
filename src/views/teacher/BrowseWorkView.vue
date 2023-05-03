<template>
  <div>
    <el-table :data="works" stripes style="width: 100%">
      <el-table-column type="index" label="序号" width="50px">
      </el-table-column>
      <el-table-column prop="workname" label="作业名称" width="100px">
      </el-table-column>
      <el-table-column prop="workrequirement" label="作业要求" width="150px">
        <el-row slot-scope="scope">
          <el-popover placement="top-start" width="300" trigger="hover">
            <span>{{ scope.row.workrequirement }}</span>
            <span
              slot="reference"
              v-if="scope.row.workrequirement.length > 10"
              >{{ scope.row.workrequirement.substr(0, 10) + "..." }}</span
            >
            <span
              slot="reference"
              v-if="scope.row.workrequirement.length <= 10"
              >{{ scope.row.workrequirement.substr(0, 10) }}</span
            >
          </el-popover>
        </el-row>
      </el-table-column>
      <el-table-column prop="starttime" label="开始时间"> </el-table-column>
      <el-table-column prop="endtime" label="截至时间"></el-table-column>
      <el-table-column prop="aClass.classname" label="所属班级" width="120px">
      </el-table-column>
      <el-table-column
        prop="allowLateSubmission"
        label="允许迟交"
        width="120px"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag type="success" v-if="scope.row.allowLateSubmission == '1'"
              >允许</el-tag
            >
            <el-tag type="danger" v-if="scope.row.allowLateSubmission == '0'"
              >禁止</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="参考图片" prop="serverFilePath" width="120px">
        <template slot-scope="scope">
          <div class="demo-image__preview">
            <el-image
              style="width: 50px; height: 50px"
              fit="cover"
              :src="scope.row.serverFilePath"
              :preview-src-list="[scope.row.serverFilePath]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope">
          <el-button
            type="primary"
            plain
            class="el-icon-s-unfold"
            @click="getSubmitSituation(scope.row)"
            >提交情况</el-button
          >
        </el-row>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWorkByTid } from "@/api/ReleaseWorkAPI";
import userAuthStore from "@/store/auth.store.js";
import { parseTime } from "@/utils/ruoyi.js";
export default {
  name: "BrowseWorkView",
  data: function () {
    return {
      work: {
        workid: "",
        workname: "",
        workrequirement: "",
        starttime: "",
        endtime: "",
        tid: "",
        aClass: {},
      },
      works: [],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    getSubmitSituation(row) {
      localStorage.setItem("work", JSON.stringify(row));
      this.$router.push({ path: "/teacher/submitSituation" });
    },
    getWorksByTid(tid) {
      getWorkByTid(tid).then((res) => {
        this.works = res.data.data;
        for (let i = 0; i < this.works.length; i++) {
          this.works[i].starttime = parseTime(this.works[i].starttime);
          this.works[i].endtime = parseTime(this.works[i].endtime);
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

<style>
</style>