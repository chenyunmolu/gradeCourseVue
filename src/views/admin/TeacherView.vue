<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <el-button
          type="primary"
          class="el-icon-plus"
          size="small"
          @click="openAddTeacher"
          >添加教师</el-button
        >
        <el-dialog
          title="添加教师"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>
            <el-form
              :model="teacher"
              :rules="rules"
              status-icon
              label-width="100px"
              ref="addForm"
            >
              <el-form-item label="教师编号:" prop="tid">
                <el-input
                  v-model="teacher.tid"
                  placeholder="请输入教师编号"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="教师姓名:" prop="tname">
                <el-input
                  v-model="teacher.tname"
                  placeholder="请输入教师姓名"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="教师教研室:" prop="tdept">
                <el-select
                  value-key="tid"
                  clearable
                  class="w-100"
                  v-model="teacher.tdept"
                  filterable
                  placeholder="请选择教师所属的教研室"
                >
                  <el-option
                    v-for="item in tdepts"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教师职称:" prop="tpost">
                <el-select
                  value-key="tid"
                  clearable
                  class="w-100"
                  v-model="teacher.tpost"
                  filterable
                  placeholder="请选择教师的职称"
                >
                  <el-option
                    v-for="item in tposts"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="教师学位:" prop="tdegree">
                <el-select
                  value-key="tid"
                  clearable
                  class="w-100"
                  v-model="teacher.tdegree"
                  filterable
                  placeholder="请选择教师的学位"
                >
                  <el-option
                    v-for="item in tdegrees"
                    :key="item.id"
                    :label="item.content"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addTeacher">确 定</el-button>
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
              @click="searchTeacher"
              type="warning"
              size="small"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="teachers.list" stripes style="width: 100%" height="618px">
      <el-table-column prop="tid" label="教师编号"></el-table-column>
      <el-table-column prop="tname" label="教师姓名"> </el-table-column>
      <el-table-column prop="tdept" label="教师教研室"> </el-table-column>
      <el-table-column prop="tpost" label="教师职称"> </el-table-column>
      <el-table-column prop="tdegree" label="教师学位"></el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope">
          <el-dialog
            title="修改教师信息"
            :visible.sync="updateDialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <span
              ><el-form
                :model="teacher"
                :rules="rules1"
                status-icon
                label-width="100px"
                ref="updateForm"
              >
                <el-form-item label="教师编号:" prop="tid">
                  <el-input
                    v-model="teacher.tid"
                    placeholder="请输入教师编号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="教师姓名:" prop="tname">
                  <el-input
                    v-model="teacher.tname"
                    placeholder="请输入教师姓名"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="教师教研室:" prop="tdept">
                  <el-select
                    value-key="id"
                    clearable
                    class="w-100"
                    v-model="teacher.tdept"
                    filterable
                    placeholder="请选择教师所属的教研室"
                  >
                    <el-option
                      v-for="item in tdepts"
                      :key="item.id"
                      :label="item.content"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="教师职称:" prop="tpost">
                  <el-select
                    value-key="id"
                    clearable
                    class="w-100"
                    v-model="teacher.tpost"
                    filterable
                    placeholder="请选择教师的职称"
                  >
                    <el-option
                      v-for="item in tposts"
                      :key="item.id"
                      :label="item.content"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="教师学位:" prop="tdegree">
                  <el-select
                    value-key="id"
                    clearable
                    class="w-100"
                    v-model="teacher.tdegree"
                    filterable
                    placeholder="请选择教师的学位"
                  >
                    <el-option
                      v-for="item in tdegrees"
                      :key="item.id"
                      :label="item.content"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item> </el-form
            ></span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="updateDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateTeacher">确 定</el-button>
            </span>
          </el-dialog>
          <el-button
            type="success"
            class="el-icon-edit"
            size="small"
            @click="openUpdateTeacher(scope.row)"
            >修改</el-button
          >

          <el-button
            type="danger"
            class="el-icon-delete"
            size="small"
            @click="openDeleteTeacher(scope.row)"
            >删除</el-button
          >
        </el-row>
      </el-table-column>
    </el-table>
    <div class="d-flex justify-content-end mt-2">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="teachers.total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getAllTeachers,
  saveTeacher,
  deleteTeacher,
  updateTeacher,
  searchTeacher,
} from "@/api/TeacherAPI.js";
export default {
  name: "TeacherView",
  data: function () {
    var validateTeacherid = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.allTeacherList.length; i++) {
        if (value == this.allTeacherList[i].tid) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("教师编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    var validateTeacherid1 = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.allTeacherList.length; i++) {
        if (
          value == this.allTeacherList[i].tid &&
          value != this.rawMaterial.tid
        ) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("教师编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    return {
      rules: {
        tid: [
          { required: true, message: "请输入教师编号", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
          { validator: validateTeacherid, trigger: "blur" },
        ],
        tname: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        tdept: [
          {
            required: true,
            message: "请选择教师所属教研室",
            trigger: "change",
          },
        ],
        tpost: [
          {
            required: true,
            message: "请选择教师的职称",
            trigger: "change",
          },
        ],
        tdegree: [
          {
            required: true,
            message: "请选择教师的职称",
            trigger: "change",
          },
        ],
      },
      rules1: {
        tid: [
          { required: true, message: "请输入教师编号", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
          { validator: validateTeacherid1, trigger: "blur" },
        ],
        tname: [{ required: true, message: "请输入教师姓名", trigger: "blur" }],
        tdept: [
          {
            required: true,
            message: "请选择教师所属教研室",
            trigger: "change",
          },
        ],
        tpost: [
          {
            required: true,
            message: "请选择教师的职称",
            trigger: "change",
          },
        ],
        tdegree: [
          {
            required: true,
            message: "请选择教师的职称",
            trigger: "change",
          },
        ],
      },
      keyword: "",
      dialogVisible: false,
      updateDialogVisible: false,
      flag: false,
      teachers: {
        total: "",
        list: [],
        pageNum: "",
        pageSize: "",
        pages: "",
      },
      allTeacherList: [],
      tdepts: [
        {
          id: "1",
          content: "计算机科学教研室",
        },
        {
          id: "2",
          content: "网络工程教研室",
        },
        {
          id: "3",
          content: "软件工程教研室",
        },
        {
          id: "4",
          content: "信息技术教研室",
        },
        {
          id: "5",
          content: "学院实验室",
        },
      ],
      tposts: [
        {
          id: "1",
          content: "教授",
        },
        {
          id: "2",
          content: "副教授",
        },
        {
          id: "3",
          content: "讲师",
        },
        {
          id: "4",
          content: "助教",
        },
      ],
      tdegrees: [
        {
          id: "1",
          content: "博士",
        },
        {
          id: "2",
          content: "硕士",
        },
        {
          id: "3",
          content: "学士",
        },
      ],
      teacher: {
        tid: "",
        tname: "",
        tdept: "",
        tpost: "",
        tdegree: "",
      },
      rawMaterial: {
        tid: "",
        tname: "",
        tdept: "",
        tpost: "",
        tdegree: "",
      },
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
    handlePageChange: function (newPageNum) {
      if (this.flag == false) {
        this.teachers.pageNum = newPageNum;
        getAllTeachers(this.teachers.pageNum, this.teachers.pageSize).then(
          (res) => {
            this.teachers = res.data.data;
          }
        );
      } else {
        this.teachers.pageNum = newPageNum;
        searchTeacher(
          this.keyword,
          this.teachers.pageNum,
          this.teachers.pageSize
        ).then((res) => {
          this.teachers = res.data.data;
        });
      }
    },
    clearTeacher: function () {
      this.teacher.tid = "";
      this.teacher.tname = "";
      this.teacher.tdept = "";
      this.teacher.tpost = "";
      this.teacher.tdegree = "";
      this.$nextTick(() => this.$refs.addForm.clearValidate());
      this.$nextTick(() => this.$refs.updateForm.clearValidate());
    },
    searchTeacher: function () {
      if (this.keyword.trim() == "" || this.keyword.trim() == null) {
        this.$message({
          message: "搜索内容不能为空！",
          type: "error",
        });
      } else {
        searchTeacher(this.keyword.trim()).then((res) => {
          if (res.data.code == "0") {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else {
            this.teachers = res.data.data;
            this.flag = true;
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
      }
    },

    openDeleteTeacher: function (row) {
      this.$confirm("此操作将永久删除该教师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteTeacher(row).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              getAllTeachers(
                this.teachers.pageNum,
                this.teachers.pageSize
              ).then((res) => {
                this.teachers = res.data.data;
                this.getAllTeacherList();
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

    openUpdateTeacher: function (row) {
      this.clearTeacher();
      this.updateDialogVisible = true;
      this.teacher = JSON.parse(JSON.stringify(row));
      this.rawMaterial = JSON.parse(JSON.stringify(row));
    },
    updateTeacher: function () {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          //修改teacher的数据
          for (var i = 0; i < this.tdepts.length; i++) {
            if (this.teacher.tdept == this.tdepts[i].content) {
              this.teacher.tdept = this.tdepts[i].id;
            }
          }
          for (var j = 0; j < this.tposts.length; j++) {
            console.log(this.tposts[j]);
            if (this.teacher.tpost == this.tposts[j].content) {
              this.teacher.tpost = this.tposts[j].id;
            }
          }
          for (var k = 0; k < this.tdegrees.length; k++) {
            if (this.teacher.tdegree == this.tdegrees[k].content) {
              this.teacher.tdegree = this.tdegrees[k].id;
            }
          }

          updateTeacher(this.teacher, this.rawMaterial.tid).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，修改教师信息成功！",
                type: "success",
              });
              this.updateDialogVisible = false;
              getAllTeachers(
                this.teachers.pageNum,
                this.teachers.pageSize
              ).then((res) => {
                this.teachers = res.data.data;
                this.getAllTeacherList();
              });
            } else {
              this.$message({
                message: "修改教师信息失败",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    openAddTeacher: function () {
      this.clearTeacher();
      this.dialogVisible = true;
    },
    addTeacher: function () {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          saveTeacher(this.teacher).then((res) => {
            console.log(this.teacher);
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，添加成功！",
                type: "success",
              });
              this.dialogVisible = false;
              getAllTeachers(
                this.teachers.pageNum,
                this.teachers.pageSize
              ).then((res) => {
                this.teachers = res.data.data;
                this.getAllTeacherList();
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
    getAllTeacherList: function () {
      getAllTeachers(1, this.teachers.total).then((res) => {
        this.allTeacherList = res.data.data.list;
      });
    },
  },
  created() {
    getAllTeachers(1, 10).then((res) => {
      this.teachers = res.data.data;
      this.getAllTeacherList();
    });
  },
};
</script>
  
  
<style>
</style>