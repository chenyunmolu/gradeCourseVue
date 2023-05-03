<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <el-button
          type="primary"
          size="small"
          class="el-icon-plus"
          @click="openSaveClass"
          >添加班级</el-button
        >
        <el-dialog
          title="添加班级"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>
            <el-form
              :model="aClass"
              :rules="rules"
              status-icon
              label-width="110px"
              ref="addForm"
            >
              <el-form-item label="班级编号:" prop="classid">
                <el-input
                  v-model="aClass.classid"
                  placeholder="请输入班级编号"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="班级名称:" prop="classname">
                <el-input
                  v-model="aClass.classname"
                  placeholder="请输入班级名称"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="班级所属专业:" prop="speciality">
                <el-select
                  value-key="specid"
                  clearable
                  class="w-100"
                  v-model="aClass.speciality"
                  filterable
                  placeholder="请选择班级所属专业"
                >
                  <el-option
                    v-for="item in specs"
                    :key="item.specid"
                    :label="item.specname"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="入学年份:" prop="enrolyear">
                <el-input
                  v-model="aClass.enrolyear"
                  placeholder="请输入入学年份"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="毕业年份:" prop="gradyear">
                <el-input
                  v-model="aClass.gradyear"
                  placeholder="请输入毕业年份"
                  clearable
                ></el-input>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveClass">确 定</el-button>
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
              @click="searchClass"
              size="small"
              type="warning"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="classes" stripes style="width: 100%">
      <el-table-column prop="classid" label="班级编号"></el-table-column>
      <el-table-column prop="classname" label="班级名称"> </el-table-column>
      <el-table-column prop="speciality.specname" label="所属专业">
      </el-table-column>
      <el-table-column prop="enrolyear" label="入学年份"> </el-table-column>
      <el-table-column prop="gradyear" label="毕业年份"></el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope">
          <el-dialog
            title="修改班级信息"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <span
              ><el-form
                :model="aClass"
                :rules="rules2"
                status-icon
                label-width="110px"
                ref="updateForm"
              >
                <el-form-item label="班级编号:" prop="classid">
                  <el-input
                    v-model="aClass.classid"
                    placeholder="请输入班级编号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="班级名称:" prop="classname">
                  <el-input
                    v-model="aClass.classname"
                    placeholder="请输入班级名称"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="班级所属专业:" prop="speciality">
                  <el-select
                    value-key="specid"
                    clearable
                    class="w-100"
                    v-model="aClass.speciality"
                    filterable
                    placeholder="请选择班级所属专业"
                  >
                    <el-option
                      v-for="item in specs"
                      :key="item.specid"
                      :label="item.specname"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入学年份:" prop="enrolyear">
                  <el-input
                    v-model="aClass.enrolyear"
                    placeholder="请输入入学年份"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item label="毕业年份:" prop="gradyear">
                  <el-input
                    v-model="aClass.gradyear"
                    placeholder="请输入毕业年份"
                    clearable
                  ></el-input>
                </el-form-item> </el-form
            ></span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateClass">确 定</el-button>
            </span>
          </el-dialog>
          <el-button
            type="success"
            class="el-icon-edit"
            size="small"
            @click="openUpdateClass(scope.row)"
            >修改</el-button
          >

          <el-button
            type="danger"
            class="el-icon-delete"
            size="small"
            @click="openDeleteClass(scope.row)"
            >删除</el-button
          >
        </el-row>
      </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
import {
  getAllClasses,
  saveClass,
  updateClass,
  deleteClass,
  searchClass,
} from "@/api/ClassesAPI.js";
import { getAllSpec } from "@/api/SpecialityAPI.js";
export default {
  name: "ClassesView",
  data: function () {
    var validateClassid = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.classes.length; i++) {
        if (value == this.classes[i].classid) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("班级编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    var validateClassid2 = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.classes.length; i++) {
        if (
          value == this.classes[i].classid &&
          value != this.rawMaterial.classid
        ) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("班级编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    return {
      keyword: "",
      centerDialogVisible: false,
      dialogVisible: false,
      aClass: {
        classid: "",
        classname: "",
        speciality: {},
        enrolyear: "",
        gradyear: "",
      },
      rawMaterial: {
        classid: "",
        classname: "",
        speciality: {},
        enrolyear: "",
        gradyear: "",
      },
      classes: [],
      specs: [],
      rules: {
        classid: [
          {
            required: true,
            message: "请输入班级编号",
            trigger: "blur",
          },
          {
            min: 1,
            max: 5,
            message: "长度在 1 到 5 个字符",
            trigger: "blur",
          },
          { validator: validateClassid, trigger: "blur" },
        ],
        classname: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        speciality: [
          {
            required: true,
            message: "请选择班级所属专业",
            trigger: "change",
          },
        ],
        enrolyear: [
          {
            required: true,
            message: "请选择入学年份",
            trigger: "blur",
          },
        ],
        gradyear: [
          {
            required: true,
            message: "请选择毕业年份",
            trigger: "blur",
          },
        ],
      },
      rules2: {
        classid: [
          {
            required: true,
            message: "请输入班级编号",
            trigger: "blur",
          },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
          { validator: validateClassid2, trigger: "blur" },
        ],
        classname: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
        speciality: [
          {
            required: true,
            message: "请选择班级所属专业",
            trigger: "change",
          },
        ],
        enrolyear: [
          {
            required: true,
            message: "请选择入学年份",
            trigger: "blur",
          },
        ],
        gradyear: [
          {
            required: true,
            message: "请选择毕业年份",
            trigger: "blur",
          },
        ],
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
    clearClass: function () {
      this.aClass.classid = "";
      this.aClass.classname = "";
      this.aClass.speciality = "";
      this.aClass.enrolyear = "";
      this.aClass.gradyear = "";
      this.$nextTick(() => this.$refs.addForm.clearValidate());
      this.$nextTick(() => this.$refs.updateForm.clearValidate());
    },
    searchClass: function () {
      if (this.keyword.trim() == "" || this.keyword.trim() == null) {
        this.$message({
          message: "搜索内容不能为空！",
          type: "error",
        });
      } else {
        searchClass(this.keyword.trim()).then((res) => {
          if (res.data.code == "0") {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else {
            this.classes = res.data.data;
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
      }
    },
    openUpdateClass: function (row) {
      this.clearClass();
      this.centerDialogVisible = true;
      this.aClass = JSON.parse(JSON.stringify(row));
      this.rawMaterial = JSON.parse(JSON.stringify(row));
      getAllSpec().then((res) => {
        this.specs = res.data.data;
      });
    },
    updateClass: function () {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          updateClass(this.aClass, this.rawMaterial.classid).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，修改成功！",
                type: "success",
              });
              this.centerDialogVisible = false;
              getAllClasses().then((res) => {
                this.classes = res.data.data;
              });
            } else {
              this.$message({
                message: "抱歉，修改失败",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    openSaveClass: function () {
      this.clearClass();
      this.dialogVisible = true;
      getAllSpec().then((res) => {
        this.specs = res.data.data;
      });
    },
    saveClass: function () {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          saveClass(this.aClass).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，添加成功！",
                type: "success",
              });
              this.dialogVisible = false;
              getAllClasses().then((res) => {
                this.classes = res.data.data;
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
    openDeleteClass: function (row) {
      this.$confirm("此操作将永久删除该班级, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteClass(row).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              getAllClasses().then((res) => {
                this.classes = res.data.data;
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
  },
  created() {
    getAllClasses().then((res) => {
      this.classes = res.data.data;
    });
    getAllSpec().then((res) => {
      this.specs = res.data.data;
    });
  },
};
</script>
  
  <style>
</style>