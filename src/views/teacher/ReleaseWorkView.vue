<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="openSaveWork"
          >添加作业</el-button
        >
        <el-dialog
          title="添加作业"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>
            <el-form
              :model="work"
              :rules="rules"
              status-icon
              label-width="110px"
              ref="addForm"
            >
              <el-form-item label="作业名称：" prop="workname">
                <el-input
                  v-model="work.workname"
                  placeholder="请输入作业名称"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="作业要求：" prop="workrequirement">
                <el-input
                  v-model="work.workrequirement"
                  placeholder="请输入作业要求"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="开始时间：" prop="starttime">
                <el-date-picker
                  class="w-100"
                  v-model="work.starttime"
                  type="datetime"
                  placeholder="选择开始日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="截至时间：" prop="endtime">
                <el-date-picker
                  class="w-100"
                  v-model="work.endtime"
                  type="datetime"
                  placeholder="选择结束日期时间"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="所属班级：" prop="aClass">
                <el-select
                  value-key="classid"
                  clearable
                  class="w-100"
                  v-model="work.aClass"
                  filterable
                  placeholder="请选择作业所属的班级"
                >
                  <el-option
                    v-for="item in classes"
                    :key="item.classid"
                    :label="item.classname"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="允许迟交：" prop="allowLateSubmission">
                <el-radio-group v-model="work.allowLateSubmission">
                  <el-radio label="0">禁止</el-radio>
                  <el-radio label="1">允许</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上传文件：" prop="filePath">
                <el-upload
                  class="upload-demo"
                  :headers="headers"
                  action="/api/gradeCourse/releasework/uploadWorkImg"
                  :show-file-list="true"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="addFileList"
                  :on-success="onUploadSuccess"
                  :before-upload="beforeUpload"
                >
                  <el-button slot="trigger" size="small" type="primary"
                    >选取文件</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过1MB
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="canelSaveWork">取 消</el-button>
            <el-button type="primary" @click="saveWork">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="14" class="mx-3">
            <el-input v-model="keyword" placeholder=""></el-input>
          </el-col>
          <el-col :span="6">
            <el-button
              @click="searchWork"
              size="small"
              type="warning"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
      <el-table-column prop="aClass.classname" label="所属班级" width="100px">
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
          <el-dialog
            title="修改作业信息"
            :visible.sync="centerDialogVisible"
            :before-close="handleClose"
            width="30%"
            center
            class="updateDialog"
          >
            <span
              ><el-form
                :model="work"
                :rules="rules1"
                status-icon
                label-width="110px"
                ref="updateForm"
              >
                <el-form-item label="作业名称：" prop="workname">
                  <el-input
                    v-model="work.workname"
                    placeholder="请输入作业名称"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="作业要求：" prop="workrequirement">
                  <el-input
                    v-model="work.workrequirement"
                    placeholder="请输入作业要求"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="开始时间：" prop="starttime">
                  <el-date-picker
                    class="w-100"
                    v-model="work.starttime"
                    type="datetime"
                    placeholder="选择开始日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="截至时间：" prop="endtime">
                  <el-date-picker
                    class="w-100"
                    v-model="work.endtime"
                    type="datetime"
                    placeholder="选择结束日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="所属班级：" prop="aClass">
                  <el-select
                    value-key="classid"
                    clearable
                    class="w-100"
                    v-model="work.aClass"
                    filterable
                    placeholder="请选择作业所属的班级"
                  >
                    <el-option
                      v-for="item in classes"
                      :key="item.classid"
                      :label="item.classname"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="允许迟交：" prop="allowLateSubmission">
                  <el-radio-group v-model="work.allowLateSubmission">
                    <el-radio label="0">禁止</el-radio>
                    <el-radio label="1">允许</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="上传文件："
                  prop="filePath"
                  class="uploadFormItem"
                >
                  <el-upload
                    class="upload-demo"
                    :headers="headers"
                    action="/api/gradeCourse/releasework/uploadWorkImg"
                    :show-file-list="true"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="updateFileList"
                    :on-success="onUploadSuccess"
                    :before-upload="beforeUpload"
                  >
                    <el-button slot="trigger" size="mini" type="primary"
                      >选取文件</el-button
                    >
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过1MB
                    </div>
                  </el-upload>
                </el-form-item>
              </el-form>
              <el-row type="flex" justify="center" :gutter="30">
                <el-col :span="4"
                  ><el-button @click="canelUpdateWork">取 消</el-button></el-col
                >
                <el-col :span="4"
                  ><el-button type="primary" @click="updateWork"
                    >确 定</el-button
                  ></el-col
                >
              </el-row>
            </span>
          </el-dialog>
          <el-button
            type="success"
            class="el-icon-edit"
            size="small"
            @click="openUpdateWork(scope.row)"
            >修改</el-button
          >

          <el-button
            type="danger"
            size="small"
            class="el-icon-delete"
            @click="openDeleteWork(scope.row)"
            >删除</el-button
          >
        </el-row>
      </el-table-column>
      <el-table-column label="相关资料">
        <el-row slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            class="el-icon-upload"
            @click="uploadMaterial(scope.row)"
            >上传</el-button
          >
        </el-row>
        <!-- 教师导入相关资料对话框 -->
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
            :action="upload.url + '?workid=' + upload.workid"
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
            <el-button type="primary" @click="submitFileForm">确 定</el-button>
            <el-button @click="upload.open = false">取 消</el-button>
          </div>
        </el-dialog>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getWorkByTid,
  saveWork,
  updateWork,
  deleteWork,
  searchWork,
} from "@/api/ReleaseWorkAPI.js";
import userAuthStore from "@/store/auth.store.js";
import { parseTime } from "@/utils/ruoyi.js";
import { getAllClasses } from "@/api/ClassesAPI";
export default {
  name: "ReleaseWorkView",
  data: function () {
    return {
      // 相关资料导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        workid: "",
        // 设置上传的请求头部
        headers: {
          authorization: "",
        },
        // 上传的地址
        url: "/api/gradeCourse/releasework/uploadRelevantMaterial",
      },
      keyword: "",
      centerDialogVisible: false,
      dialogVisible: false,
      headers: {
        authorization: "",
      },
      addFileList: [],
      updateFileList: [],
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
        relevantMaterial: "",
      },
      rawMaterial: {
        workid: "",
        workname: "",
        workrequirement: "",
        starttime: "",
        endtime: "",
        tid: "",
        allowLateSubmission: "",
        filePath: "",
        oldFileName: "",
        serverFilePath: "",
        relevantMaterial: "",
      },
      classes: [],
      works: [],
      rules: {
        workname: [
          {
            required: true,
            message: "请输入作业名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        workrequirement: [
          { required: true, message: "请输入作业要求", trigger: "blur" },
        ],
        starttime: [
          { required: true, message: "请输入开始时间", trigger: "blur" },
        ],
        endtime: [
          { required: true, message: "请输入截至时间", trigger: "blur" },
        ],
        aClass: [
          {
            required: true,
            message: "请选择学生所属班级",
            trigger: "change",
          },
        ],
        allowLateSubmission: [
          {
            required: true,
            message: "请选择是否允许迟交",
            trigger: "change",
          },
        ],
        filePath: [
          {
            required: true,
            message: "请提交文件",
            trigger: "change",
          },
        ],
      },
      rules1: {
        workname: [
          {
            required: true,
            message: "请输入作业名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        workrequirement: [
          { required: true, message: "请输入作业要求", trigger: "blur" },
        ],
        starttime: [
          { required: true, message: "请输入开始时间", trigger: "blur" },
        ],
        endtime: [
          { required: true, message: "请输入截至时间", trigger: "blur" },
        ],
        aClass: [
          {
            required: true,
            message: "请选择学生所属班级",
            trigger: "change",
          },
        ],
        allowLateSubmission: [
          {
            required: true,
            message: "请选择是否允许迟交",
            trigger: "change",
          },
        ],
        filePath: [
          {
            required: true,
            message: "请提交文件",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    //上传相关资料
    uploadMaterial(row) {
      if (row.relevantMaterial != null) {
        this.$confirm("重复上传将覆盖掉之前上传的资料, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.upload.workid = row.workid;
            this.upload.title = "相关资料上传";
            this.upload.open = true;
            this.upload.headers.authorization =
              "Bearer " + userAuthStore().token;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消上传",
            });
          });
      } else {
        this.upload.workid = row.workid;
        this.upload.title = "相关资料上传";
        this.upload.open = true;
        this.upload.headers.authorization = "Bearer " + userAuthStore().token;
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

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`);
    },
    beforeUpload(file) {
      // 文件验证逻辑
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt500K = file.size / 1024 < 1024;
      if (!isJPG || !isLt500K) {
        this.$message.error("只能上传jpg/png文件，且不超过1MB");
        return false;
      }
      this.headers.authorization = "Bearer " + userAuthStore().token;
      this.work.oldFileName = file.name;
      return true;
    },
    onUploadSuccess(response, file, fileList) {
      // 上传成功回调逻辑
      if (response.code != "1") {
        this.$message.error(response.msg);
      } else {
        this.work.filePath = response.data;
        this.work.serverFilePath =
          "/api/gradeCourse" +
          this.work.filePath.substring(
            this.work.filePath.lastIndexOf("/img", this.work.filePath.length)
          );
      }
    },

    searchWork: function () {
      if (this.keyword.trim() == "" || this.keyword.trim() == null) {
        this.$message({
          message: "搜索内容不能为空！",
          type: "error",
        });
      } else {
        searchWork(this.keyword.trim(), this.work.tid).then((res) => {
          if (res.data.code == "0") {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else {
            this.works = res.data.data;
            for (let i = 0; i < this.works.length; i++) {
              this.works[i].starttime = parseTime(this.works[i].starttime);
              this.works[i].endtime = parseTime(this.works[i].endtime);
            }
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
      }
    },
    openDeleteWork: function (row) {
      this.$confirm("此操作将永久删除该作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.work = JSON.parse(JSON.stringify(row));
          this.work.starttime = new Date(this.work.starttime);
          this.work.endtime = new Date(this.work.endtime);
          deleteWork(this.work).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                type: "success",
                message: "删除作业信息成功!",
              });
              this.getWorksByTid(this.work.tid);
            } else {
              this.$message({
                type: "error",
                message: "删除作业信息失败!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    openUpdateWork: function (row) {
      this.clearWork();
      this.centerDialogVisible = true;
      this.work = JSON.parse(JSON.stringify(row));
      this.rawMaterial = JSON.parse(JSON.stringify(row));
      this.updateFileList.splice(0, this.updateFileList.length);
      this.updateFileList.push({
        name: this.work.oldFileName,
        url: this.work.filePath,
      });
    },
    canelUpdateWork: function () {
      this.centerDialogVisible = false;
      this.updateFileList.splice(0, this.updateFileList.length);
    },
    updateWork: function () {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          this.work.starttime = new Date(this.work.starttime);
          this.work.endtime = new Date(this.work.endtime);
          updateWork(this.work).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，修改作业信息成功！",
                type: "success",
              });
              this.centerDialogVisible = false;
              this.getWorksByTid(this.work.tid);
              this.updateFileList.splice(0, this.updateFileList.length);
            } else {
              this.$message({
                message: "抱歉，修改作业信息失败",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    saveWork() {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          saveWork(this.work).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，添加成功！",
                type: "success",
              });
              this.dialogVisible = false;
              this.getWorksByTid(this.work.tid);
              this.addFileList.splice(0, this.addFileList.length);
            } else {
              this.$message({
                message: "添加失败",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    openSaveWork() {
      this.clearWork();
      this.dialogVisible = true;
      this.addFileList.splice(0, this.addFileList.length);
    },
    canelSaveWork() {
      this.dialogVisible = false;
      this.addFileList.splice(0, this.addFileList.length);
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          this.addFileList.splice(0, this.addFileList.length);
          this.updateFileList.splice(0, this.updateFileList.length);
        })
        .catch(() => {});
    },
    clearWork: function () {
      this.work.workname = "";
      this.work.workrequirement = "";
      this.work.starttime = "";
      this.work.endtime = "";
      this.work.aClass = "";
      this.work.allowLateSubmission = "";
      this.work.filePath = "";
      this.$nextTick(() => this.$refs.addForm.clearValidate());
      this.$nextTick(() => this.$refs.updateForm.clearValidate());
    },
  },
  created() {
    this.work.tid = userAuthStore().user.userid;
    this.getWorksByTid(this.work.tid);
    getAllClasses().then((res) => {
      this.classes = res.data.data;
    });
  },
};
</script>

<style>
.updateDialog {
  height: 900px;
  margin: 0px;
}
.uploadFormItem {
  height: 123px;
}
</style>