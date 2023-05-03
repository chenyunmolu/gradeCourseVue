<template>
  <div>
    <el-table :data="works" stripes style="width: 100%">
      <el-table-column prop="workname" label="作业名称" width="100px">
      </el-table-column>
      <el-table-column prop="workrequirement" label="作业要求">
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
      <el-table-column prop="starttime" label="开始时间" width="160px">
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="截至时间"
        width="160px"
      ></el-table-column>
      <el-table-column prop="teacher.tname" label="所属老师"> </el-table-column>
      <el-table-column prop="relevantMaterial" label="相关资料">
        <template slot-scope="scope">
          <el-link
            :underline="false"
            v-if="scope.row.relevantMaterial != null"
            :href="scope.row.relevantMaterial"
            type="warning"
            ><i class="el-icon-download"></i>下载资料</el-link
          >
          <el-link
            :underline="false"
            v-if="scope.row.relevantMaterial == null"
            :href="scope.row.serverHtmlFilePath"
            type="warning"
            disabled
            ><i class="el-icon-download"></i>下载资料</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="allowLateSubmission" label="允许迟交">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              type="success"
              effect="plain"
              v-if="scope.row.allowLateSubmission == '1'"
              >允许</el-tag
            >
            <el-tag
              type="danger"
              effect="plain"
              v-if="scope.row.allowLateSubmission == '0'"
              >禁止</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="submitStatus" label="提交状态">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              type="success"
              effect="dark"
              v-if="scope.row.submitStatus == '已提交'"
              >{{ scope.row.submitStatus }}</el-tag
            >
            <el-tag
              type="danger"
              effect="dark"
              v-if="scope.row.submitStatus == '未提交'"
              >{{ scope.row.submitStatus }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="timeStatus" label="时间状态">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              type="success"
              v-if="scope.row.timeStatus == '已按时提交'"
              >{{ scope.row.timeStatus }}</el-tag
            >
            <el-tag type="success" v-if="scope.row.timeStatus == '未超时'">{{
              scope.row.timeStatus
            }}</el-tag>
            <el-tag type="danger" v-if="scope.row.timeStatus == '已迟交'">{{
              scope.row.timeStatus
            }}</el-tag>
            <el-tag type="danger" v-if="scope.row.timeStatus == '已超时'">{{
              scope.row.timeStatus
            }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            plain
            icon="el-icon-upload2"
            @click="handleImport(scope.row)"
            >提交作业</el-button
          >
          <!-- 学生导入对话框 -->
          <el-dialog
            :title="upload.title"
            :visible.sync="upload.open"
            width="400px"
            append-to-body
          >
            <el-upload
              ref="upload"
              :limit="1"
              accept=".zip"
              :headers="upload.headers"
              :action="
                upload.url +
                '?stuid=' +
                upload.stuid +
                '&workid=' +
                upload.workid
              "
              :disabled="upload.isUploading"
              :on-progress="handleFileUploadProgress"
              :on-success="handleFileSuccess"
              :auto-upload="false"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip text-center" slot="tip">
                <span>仅允许导入zip格式的压缩文件。</span>
              </div>
            </el-upload>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitFileForm"
                >确 定</el-button
              >
              <el-button @click="upload.open = false">取 消</el-button>
            </div>
          </el-dialog>
        </el-row>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMyWork } from "@/api/StudentAPI.js";
import userAuthStore from "@/store/auth.store.js";
import { parseTime } from "../../utils/ruoyi.js";
export default {
  name: "SubmitWork",
  data: function () {
    return {
      centerDialogVisible: false,
      user: {
        stuid: "",
      },
      works: [],
      // 学生导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        stuid: "",
        workid: "",
        // 设置上传的请求头部
        headers: {
          authorization: "",
        },
        // 上传的地址
        url: "/api/gradeCourse/students/uploadWork",
      },
    };
  },
  methods: {
    handleImport(row) {
      if (row.allowLateSubmission == "0" && row.timeStatus == "已超时") {
        this.$message({
          type: "error",
          message: "抱歉！该作业不允许迟交",
        });
      } else {
        this.upload.stuid = userAuthStore().user.userid;
        this.upload.workid = row.workid;
        this.upload.title = "作业上传";
        this.upload.open = true;
        this.upload.headers.authorization = "Bearer " + userAuthStore().token;

        if (row.submitStatus == "已提交") {
          this.$notify({
            title: "提示",
            message: "已提交过，请谨慎提交!",
            type: "info",
          });
        }

        if (
          row.submitStatus == "未提交" &&
          row.timeStatus == "已超时" &&
          row.allowLateSubmission == "1"
        ) {
          this.$notify({
            title: "警告",
            message: "已经超时，请尽快提交!",
            type: "warning",
            offset: 250,
          });
        }
      }
    },

    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          "</div>",
        "导入结果",
        { dangerouslyUseHTMLString: true }
      );
      this.getMyWorks();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    getMyWorks() {
      getMyWork(this.user.stuid).then((res) => {
        this.works = res.data.data;
        for (let i = 0; i < this.works.length; i++) {
          this.works[i].starttime = parseTime(this.works[i].starttime);
          this.works[i].endtime = parseTime(this.works[i].endtime);
        }
      });
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
      if (flag != 0) {
        this.$message({
          type: "warning",
          message: "还有" + flag + "个作业没有提交，请尽快完成",
        });
      }
    });
  },
};
</script>

<style>
</style>