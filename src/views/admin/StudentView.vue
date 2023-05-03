<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="18">
        <el-button
          type="primary"
          plain
          size="small"
          class="el-icon-plus"
          @click="openAddStudent"
          >添加学生</el-button
        >
        <el-button
          type="success"
          plain
          size="small"
          icon="el-icon-upload2"
          @click="handleImport"
          >导入</el-button
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
            accept=".xlsx, .xls"
            :headers="upload.headers"
            :action="upload.url + '?updateSupport=' + upload.updateSupport"
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
              <span>仅允许导入xls、xlsx格式文件。</span>
              <el-link
                type="primary"
                :underline="false"
                style="font-size: 12px; vertical-align: baseline"
                @click="importTemplate"
                >下载模板</el-link
              >
            </div>
          </el-upload>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFileForm">确 定</el-button>
            <el-button @click="upload.open = false">取 消</el-button>
          </div>
        </el-dialog>
        <!-- 学生导出！ -->
        <el-button
          type="warning"
          plain
          size="small"
          class="el-icon-download mx-2"
          @click="exportStu()"
          >导出</el-button
        >
        <el-dialog
          title="添加学生"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>
            <el-form
              :model="student"
              :rules="rules"
              status-icon
              label-width="100px"
              ref="addForm"
            >
              <el-form-item label="学生编号:" prop="stuid">
                <el-input
                  v-model="student.stuid"
                  placeholder="请输入学生编号"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="学生姓名:" prop="sname">
                <el-input
                  v-model="student.sname"
                  placeholder="请输入学生姓名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="学生班级:" prop="aClass">
                <el-select
                  value-key="classid"
                  clearable
                  class="w-100"
                  v-model="student.aClass"
                  filterable
                  placeholder="请选择学生所属的班级"
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
              <el-form-item label="手机号码" prop="telphone">
                <el-input
                  v-model="student.telphone"
                  maxlength="11"
                  placeholder="请输入手机号码"
                />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="student.email"
                  maxlength="50"
                  placeholder="请输入邮箱地址"
                />
              </el-form-item>
              <el-form-item label="性别" prop="ssex">
                <el-radio-group v-model="student.ssex">
                  <el-radio label="0">男</el-radio>
                  <el-radio label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addStudent">确 定</el-button>
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
              @click="searchStudent"
              size="small"
              type="warning"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="students.list" stripes style="width: 100%" height="618px">
      <el-table-column type="index" label="序号" width="150px">
      </el-table-column>
      <el-table-column prop="stuid" label="学生编号"></el-table-column>
      <el-table-column prop="sname" label="学生姓名"> </el-table-column>
      <el-table-column prop="aClass.classname" label="学生班级" width="150px">
      </el-table-column>
      <el-table-column prop="ssex" label="性别" width="150px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.ssex == '0'" effect="plain">男生</el-tag>
          <el-tag v-if="scope.row.ssex == '1'" effect="plain" type="danger"
            >女生</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200px">
      </el-table-column>
      <el-table-column prop="telphone" label="手机号码" width="120px">
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope">
          <el-dialog
            title="修改学生信息"
            :visible.sync="updateDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span
              ><el-form
                :model="student"
                :rules="rules1"
                status-icon
                label-width="100px"
                ref="updateForm"
              >
                <el-form-item label="学生编号:" prop="stuid">
                  <el-input
                    v-model="student.stuid"
                    placeholder="请输入学生编号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="学生姓名:" prop="sname">
                  <el-input
                    v-model="student.sname"
                    placeholder="请输入学生姓名"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="学生班级:" prop="aClass">
                  <el-select
                    value-key="classid"
                    clearable
                    class="w-100"
                    v-model="student.aClass"
                    filterable
                    placeholder="请选择学生所属的教研室"
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
                <el-form-item label="手机号码" prop="telphone">
                  <el-input
                    v-model="student.telphone"
                    maxlength="11"
                    placeholder="请输入手机号码"
                  />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input
                    v-model="student.email"
                    maxlength="50"
                    placeholder="请输入邮箱地址"
                  />
                </el-form-item>
                <el-form-item label="性别" prop="ssex">
                  <el-radio-group v-model="student.ssex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form></span
            >
            <span slot="footer" class="dialog-footer">
              <el-button @click="updateDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateStudent">确 定</el-button>
            </span>
          </el-dialog>
          <el-button
            type="success"
            class="el-icon-edit"
            size="small"
            @click="openUpdateStudent(scope.row)"
            >修改</el-button
          >

          <el-button
            type="danger"
            class="el-icon-delete"
            size="small"
            @click="openDeleteStudent(scope.row)"
            >删除</el-button
          >
        </el-row>
      </el-table-column>
    </el-table>
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
  getAllStudents,
  getCurrentPageStudent,
  saveStudent,
  deleteStudent,
  updateStudent,
  searchStudent,
  exportStudent,
  importTemplate,
} from "@/api/StudentAPI.js";
import { blobValidate } from "@/utils/ruoyi.js";
import { saveAs } from "file-saver";
import { getAllClasses } from "@/api/ClassesAPI";
import userAuthStore from "@/store/auth.store.js";
export default {
  name: "StudentView",
  data: function () {
    var validateStudenstuid = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.allStudentList.length; i++) {
        if (value == this.allStudentList[i].stuid) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("学生编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    var validateStudenstuid1 = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.allStudentList.length; i++) {
        if (
          value == this.allStudentList[i].stuid &&
          value != this.rawMaterial.stuid
        ) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("学生编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    return {
      user: {},
      rules: {
        stuid: [
          { required: true, message: "学生编号不能为空", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
          { validator: validateStudenstuid, trigger: "blur" },
        ],
        sname: [
          { required: true, message: "学生姓名不能为空", trigger: "blur" },
        ],
        aClass: [
          {
            required: true,
            message: "学生班级不能为空",
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        telphone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      rules1: {
        stuid: [
          { required: true, message: "学生编号不能为空", trigger: "blur" },
          {
            min: 1,
            max: 15,
            message: "长度在 1 到 15 个字符",
            trigger: "blur",
          },
          { validator: validateStudenstuid1, trigger: "blur" },
        ],
        sname: [
          { required: true, message: "学生姓名不能为空", trigger: "blur" },
        ],
        aClass: [
          {
            required: true,
            message: "学生班级不能为空",
            trigger: "change",
          },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        telphone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
      keyword: "",
      dialogVisible: false,
      updateDialogVisible: false,

      // 学生导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {
          authorization: "",
        },
        // 上传的地址
        url: "/api/gradeCourse/students/upload",
      },

      flag: false,
      students: {
        total: "",
        list: [],
        pageNum: "",
        pageSize: "",
        pages: "",
      },
      allStudentList: [],
      student: {
        stuid: "",
        sname: "",
        aClass: {},
        ssex: "",
        email: "",
        telphone: "",
      },
      rawMaterial: {
        stuid: "",
        sname: "",
        aClass: {},
      },
      classes: [],
      fileList: [],
    };
  },
  methods: {
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "学生导入";
      this.upload.open = true;
      this.upload.headers.authorization = "Bearer " + userAuthStore().token;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate()
        .then(async (res) => {
          const data = res.data;
          const isLogin = await blobValidate(data);
          if (isLogin) {
            const blob = new Blob([data]);
            saveAs(blob, `student_${new Date().getTime()}.xls`);
          } else {
            this.$message.error("下载模板失败！");
          }
        })
        .catch((r) => {
          console.error(r);
          this.$message.error("下载模板失败！");
        });
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
      getCurrentPageStudent(this.students.pageNum, this.students.pageSize).then(
        (res) => {
          this.students = res.data.data;
          getAllStudents().then((res) => {
            this.allStudentList = res.data.data;
          });
        }
      );
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    //导出学生
    exportStu() {
      exportStudent()
        .then(async (res) => {
          const data = res.data;
          const isLogin = await blobValidate(data);
          if (isLogin) {
            const blob = new Blob([data]);
            saveAs(blob, `student_${new Date().getTime()}.xls`);
          } else {
            this.$message.error("下载文件失败！");
          }
        })
        .catch((r) => {
          console.error(r);
          this.$message.error("下载文件失败！");
        });
    },
    //文件上传

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handlePageChange: function (newPageNum) {
      if (this.flag == false) {
        this.students.pageNum = newPageNum;
        getCurrentPageStudent(
          this.students.pageNum,
          this.students.pageSize
        ).then((res) => {
          this.students = res.data.data;
        });
      } else {
        this.students.pageNum = newPageNum;
        searchStudent(
          this.keyword,
          this.students.pageNum,
          this.students.pageSize
        ).then((res) => {
          this.students = res.data.data;
        });
      }
    },
    clearStudent: function () {
      this.student.stuid = "";
      this.student.sname = "";
      this.student.aClass = "";
      this.student.telphone = "";
      this.student.email = "";
      this.student.ssex = "";
      this.$nextTick(() => this.$refs.addForm.clearValidate());
      this.$nextTick(() => this.$refs.updateForm.clearValidate());
    },
    searchStudent: function () {
      if (this.keyword.trim() == "" || this.keyword.trim() == null) {
        this.$message({
          message: "搜索内容不能为空！",
          type: "error",
        });
      } else {
        searchStudent(this.keyword.trim()).then((res) => {
          if (res.data.code == "0") {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else {
            this.students = res.data.data;
            this.flag = true;
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
      }
    },

    openDeleteStudent: function (row) {
      this.$confirm("此操作将永久删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteStudent(row).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              getCurrentPageStudent(
                this.students.pageNum,
                this.students.pageSize
              ).then((res) => {
                this.students = res.data.data;
                getAllStudents().then((res) => {
                  this.allStudentList = res.data.data;
                });
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
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

    openUpdateStudent: function (row) {
      this.clearStudent();
      this.updateDialogVisible = true;
      this.student = JSON.parse(JSON.stringify(row));
      this.rawMaterial = JSON.parse(JSON.stringify(row));
      getAllClasses().then((res) => {
        this.classes = res.data.data;
      });
    },
    updateStudent: function () {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          updateStudent(this.student, this.rawMaterial.stuid).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，修改学生信息成功！",
                type: "success",
              });
              this.updateDialogVisible = false;
              getCurrentPageStudent(
                this.students.pageNum,
                this.students.pageSize
              ).then((res) => {
                this.students = res.data.data;
                getAllStudents().then((res) => {
                  this.allStudentList = res.data.data;
                });
              });
            } else {
              this.$message({
                message: "修改学生信息失败",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    openAddStudent: function () {
      this.clearStudent();
      this.dialogVisible = true;
      getAllClasses().then((res) => {
        this.classes = res.data.data;
      });
    },
    addStudent: function () {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          saveStudent(this.student).then((res) => {
            console.log(this.student);
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，添加成功！",
                type: "success",
              });
              this.dialogVisible = false;
              getCurrentPageStudent(
                this.students.pageNum,
                this.students.pageSize
              ).then((res) => {
                this.students = res.data.data;
                getAllStudents().then((res) => {
                  this.allStudentList = res.data.data;
                });
              });
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
  },
  created() {
    getCurrentPageStudent(1, 10).then((res) => {
      this.students = res.data.data;
    });
    getAllStudents().then((res) => {
      this.allStudentList = res.data.data;
    });
    getAllClasses().then((res) => {
      this.classes = res.data.data;
    });
  },
};
</script>
    
<style>
</style>