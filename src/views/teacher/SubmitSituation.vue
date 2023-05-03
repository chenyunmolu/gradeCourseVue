<template>
  <div class="submitSituation">
    <el-row justify="start">
      <el-col :span="1" class="mt-2">
        <el-button
          type="primary"
          plain
          class="el-icon-back"
          size="small"
          @click="backPage"
        ></el-button>
      </el-col>
      <el-col :span="12" class="mt-3">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            >班级人数：{{ allStudents.total }}</el-breadcrumb-item
          >
          <el-breadcrumb-item
            >提交人数：{{ allStudents.submited }}</el-breadcrumb-item
          >
          <el-breadcrumb-item
            >未交人数：{{ allStudents.unsubmited }}</el-breadcrumb-item
          >
        </el-breadcrumb></el-col
      >
    </el-row>
    <el-table :data="students.list" stripes style="width: 100%" height="627px">
      <el-table-column prop="stuid" label="学生编号"></el-table-column>
      <el-table-column prop="sname" label="学生姓名"> </el-table-column>
      <el-table-column prop="aClass.classname" label="学生班级">
      </el-table-column>
      <el-table-column label="作业名称">
        <template>
          <el-popover trigger="hover" placement="top">
            <p>作业名称: {{ work.workname }}</p>
            <p>作业要求: {{ work.workrequirement }}</p>
            <p>截止时间: {{ work.endtime }}</p>
            <p>允许迟交: {{ work.allowLateSubmission }}</p>
            <div class="d-inline specialImg">参考图片：</div>
            <div class="demo-image__preview d-inline">
              <el-image
                style="width: 50px; height: 50px"
                fit="cover"
                :src="work.serverFilePath"
                :preview-src-list="[work.serverFilePath]"
              >
              </el-image>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ work.workname }}</el-tag>
            </div>
          </el-popover>
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
              effect="plain"
              v-if="scope.row.timeStatus == '已按时提交'"
              >{{ scope.row.timeStatus }}</el-tag
            >
            <el-tag
              type="success"
              effect="plain"
              v-if="scope.row.timeStatus == '未超时'"
              >{{ scope.row.timeStatus }}</el-tag
            >
            <el-tag
              type="danger"
              effect="plain"
              v-if="scope.row.timeStatus == '已迟交'"
              >{{ scope.row.timeStatus }}</el-tag
            >
            <el-tag
              type="danger"
              effect="plain"
              v-if="scope.row.timeStatus == '已超时'"
              >{{ scope.row.timeStatus }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="systemGrade" label="系统评分">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag
              type="success"
              effect="light"
              v-if="scope.row.systemGrade >= 60"
              >{{ scope.row.systemGrade }}</el-tag
            >
            <el-tag
              type="danger"
              effect="light"
              v-if="scope.row.systemGrade < 60"
              >{{ scope.row.systemGrade }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="duplicate" label="雷同">
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
            v-if="scope.row.submitStatus == '已提交'"
          >
            <el-tag type="success" effect="dark" v-if="!scope.row.duplicate">
              正常
            </el-tag>
            <el-tag type="danger" effect="dark" v-if="scope.row.duplicate">
              雷同
            </el-tag>
          </div>
          <div
            slot="reference"
            class="name-wrapper"
            v-if="scope.row.submitStatus == '未提交'"
          >
            <el-tag effect="dark" v-if="!scope.row.duplicate"> 待提交 </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="serverHtmlFilePath">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.submitStatus == '已提交'"
            :href="scope.row.serverHtmlFilePath"
            target="_blank"
            type="warning"
            ><i class="el-icon-view"></i>浏览作业</el-link
          >
          <el-link
            v-if="scope.row.submitStatus == '未提交'"
            :href="scope.row.serverHtmlFilePath"
            target="_blank"
            type="warning"
            disabled
            ><i class="el-icon-view"></i>浏览作业</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="编辑" prop="operation">
        <el-row slot-scope="scope">
          <el-button
            type="success"
            size="small"
            plain
            @click="openUpdateSubmitWork(scope.row)"
            ><i class="el-icon-edit"></i>修改评分</el-button
          >
        </el-row>
      </el-table-column>
      <el-table-column prop="lastGrade" label="最终评分">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag v-if="scope.row.lastGrade == null">待评分</el-tag>
            <el-tag type="success" v-if="scope.row.lastGrade >= 60">{{
              scope.row.lastGrade
            }}</el-tag>
            <el-tag
              type="danger"
              v-if="scope.row.lastGrade < 60 && scope.row.lastGrade != null"
              >{{ scope.row.lastGrade }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改评分信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span
        ><el-form
          :model="submitWork"
          :rules="rules"
          status-icon
          label-width="110px"
          ref="updateForm"
        >
          <el-form-item label="最终评分:" prop="lastGrade">
            <el-input
              v-model="submitWork.lastGrade"
              placeholder="请输入最终评分"
              clearable
            ></el-input>
          </el-form-item> </el-form
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmitWork">确 定</el-button>
      </span>
    </el-dialog>
    <div class="d-flex justify-content-end mt-2">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="students.total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getCurrentStudentByClassid,
  getAllStudentsByClassid,
} from "@/api/BrowseWorkAPI.js";
import { updateSubmitWork } from "@/api/SubmitWorkAPI.js";

export default {
  name: "SubmitSituation",
  data: function () {
    var validateLastGrade = (rule, value, callback) => {
      var pattern = /^(\d{1,3})+(\.[0-9]{1,2})?$/;
      if (pattern.test(this.submitWork.lastGrade)) {
        if (Number(this.submitWork.lastGrade) <= 100) {
          callback();
        } else {
          callback(new Error("评分不能超过100分，请修改！"));
        }
      } else {
        callback(new Error("评分只能是数字，请修改！"));
      }
    };
    return {
      centerDialogVisible: false,
      work: "",
      submitWork: {
        id: "",
        lastGrade: "",
      },
      students: {
        total: "",
        list: [],
        pageNum: "",
        pageSize: "",
        pages: "",
      },
      allStudents: {
        submited: "",
        unsubmited: "",
        total: "",
        list: [],
        pageNum: "",
        pageSize: "",
        pages: "",
      },
      rules: {
        lastGrade: [
          {
            required: true,
            message: "请输入最终评分",
            trigger: "blur",
          },
          {
            min: 1,
            max: 5,
            message: "长度在 1 到 5 个字符",
            trigger: "blur",
          },
          { validator: validateLastGrade, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    openUpdateSubmitWork(row) {
      if (row.submitStatus == "未提交") {
        this.$message.error("该学生作业没有提交，无法进行修改！");
      } else {
        if (row.lastGrade == null) {
          this.submitWork.lastGrade = "";
        } else {
          this.submitWork.lastGrade = row.lastGrade;
        }
        this.submitWork.id = row.submitWorkid;
        this.centerDialogVisible = true;
      }
    },
    updateSubmitWork() {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          updateSubmitWork(this.submitWork).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，修改成功！",
                type: "success",
              });
              this.centerDialogVisible = false;
              getCurrentStudentByClassid(
                this.students.pageNum,
                this.students.pageSize,
                this.work.classid,
                this.work.workid
              ).then((resquest) => {
                this.students = resquest.data.data;
              });
            } else {
              this.$message({
                message: "抱歉，修改失败!",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    backPage() {
      this.$router.push({ path: "/teacher/browseWorkView" });
    },
    handlePageChange(newPageNum) {
      this.students.pageNum = newPageNum;
      getCurrentStudentByClassid(
        this.students.pageNum,
        this.students.pageSize,
        this.work.classid,
        this.work.workid
      ).then((res) => {
        this.students = res.data.data;
      });
    },
  },

  created() {
    this.work = JSON.parse(localStorage.getItem("work"));
    if (this.work.allowLateSubmission == "0") {
      this.work.allowLateSubmission = "禁止";
    } else {
      this.work.allowLateSubmission = "允许";
    }
    getCurrentStudentByClassid(1, 10, this.work.classid, this.work.workid).then(
      (res) => {
        this.students = res.data.data;
      }
    );
    getAllStudentsByClassid(this.work.classid, this.work.workid).then((res) => {
      this.allStudents = res.data.data;
      var list = this.allStudents.list;
      let flag = 0;
      for (let i = 0; i < list.length; i++) {
        if (list[i].submitStatus == "已提交") {
          flag++;
        }
      }
      this.allStudents.submited = flag;
      this.allStudents.unsubmited = this.allStudents.total - flag;
    });
  },
};
</script>

<style>
.submitSituation {
  position: relative;
  top: -20px;
  left: -10px;
}
.specialImg {
  position: relative;
  top: -20px;
}
</style>