<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4"
        ><el-button type="primary" class="el-icon-plus" @click="openSaveSpec"
          >添加专业</el-button
        >
        <el-dialog
          title="添加专业"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>
            <el-form
              status-icon
              :rules="rules"
              :model="spec"
              label-width="100px"
              ref="addForm"
            >
              <el-form-item label="专业编号：" prop="specid">
                <el-input
                  clearable
                  v-model="spec.specid"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item label="专业名称：" prop="specname">
                <el-input
                  clearable
                  v-model="spec.specname"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item label="专业负责人" prop="teacher">
                <el-select
                  value-key="tid"
                  clearable
                  class="w-100"
                  v-model="spec.teacher"
                  filterable
                  placeholder="请选择专业负责人"
                >
                  <el-option
                    v-for="item in teachers"
                    :key="item.tid"
                    :label="item.tname"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSaveSpec">取 消</el-button>
            <el-button type="primary" @click="saveSpeciality">确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="14" class="mx-3">
            <el-input v-model="keyword" placeholder=""></el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="searchSpec" type="warning" icon="el-icon-search"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table :data="specs" stripe style="width: 100%">
      <el-table-column prop="specid" label="专业id"> </el-table-column>
      <el-table-column prop="specname" label="专业名称"> </el-table-column>
      <el-table-column prop="teacher.tname" label="专业负责人">
      </el-table-column>
      <el-table-column label="操作">
        <el-row slot-scope="scope">
          <el-dialog
            title="修改专业"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
          >
            <span>
              <el-form
                status-icon
                :model="spec"
                :rules="rules1"
                label-width="100px"
                ref="updateForm"
              >
                <el-form-item label="专业编号：" prop="specid">
                  <el-input
                    clearable
                    v-model="spec.specid"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item label="专业名称：" prop="specname">
                  <el-input
                    clearable
                    v-model="spec.specname"
                    placeholder=""
                  ></el-input>
                </el-form-item>
                <el-form-item label="专业负责人" prop="teacher">
                  <el-select
                    value-key="tid"
                    clearable
                    class="w-100"
                    v-model="spec.teacher"
                    filterable
                    placeholder="请选择专业负责人"
                  >
                    <el-option
                      v-for="item in teachers"
                      :key="item.tid"
                      :label="item.tname"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancelUpdateSpeciality">取 消</el-button>
              <el-button type="primary" @click="updateSpeciality"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <el-button
            type="success"
            class="el-icon-edit"
            @click="openUpdateSpec(scope.$index, scope.row)"
            >修改</el-button
          >

          <el-button
            type="danger"
            class="el-icon-delete"
            @click="openDeleteSpec(scope.row)"
            >删除</el-button
          >
        </el-row>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getAllSpec,
  saveSpec,
  updateSpec,
  deleteSpec,
  searchSpec,
} from "@/api/SpecialityAPI.js";
import { getAllPureTeachers } from "@/api/TeacherAPI.js";
export default {
  name: "SpecialityView",
  data: function () {
    var validateSpecid = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.specs.length; i++) {
        if (value == this.specs[i].specid) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("专业编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    var validateSpecid2 = (rule, value, callback) => {
      let index = 0;
      for (let i = 0; i < this.specs.length; i++) {
        if (value == this.specs[i].specid && value != this.rawMaterial.specid) {
          index++;
        }
      }
      if (index != 0) {
        callback(new Error("专业编号已经存在，请修改！"));
      } else {
        callback();
      }
    };
    return {
      keyword: "",
      centerDialogVisible: false,
      dialogVisible: false,
      specs: [],
      spec: {
        specid: "",
        specname: "",
        teacher: {},
      },
      rawMaterial: {
        specid: "",
        specname: "",
        teacher: {},
      },
      teachers: [],
      rules: {
        specid: [
          { required: true, message: "请输入专业编号", trigger: "blur" },
          { min: 1, max: 3, message: "长度在 1 到 3 个字符", trigger: "blur" },
          { validator: validateSpecid, trigger: "blur" },
        ],
        specname: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
        ],
        teacher: [
          {
            required: true,
            message: "请选择教师名称",
            trigger: "change",
          },
        ],
      },
      rules1: {
        specid: [
          { required: true, message: "请输入专业编号", trigger: "blur" },
          { min: 1, max: 3, message: "长度在 1 到 3 个字符", trigger: "blur" },
          { validator: validateSpecid2, trigger: "blur" },
        ],
        specname: [
          { required: true, message: "请输入专业名称", trigger: "blur" },
        ],
        teacher: [
          {
            required: true,
            message: "请选择教师名称",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          this.clearSpec();
          done();
        })
        .catch(() => {});
    },
    searchSpec: function () {
      if (this.keyword.trim() == "" || this.keyword.trim() == null) {
        this.$message({
          message: "搜索内容不能为空！",
          type: "error",
        });
      } else {
        searchSpec(this.keyword.trim()).then((res) => {
          if (res.data.code == "0") {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else {
            this.specs = res.data.data;
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
      }
    },
    clearSpec: function () {
      // this.$refs["addForm"].resetFields();
      // this.$refs["updateForm"].resetFields()
      this.spec.specid = "";
      this.spec.specname = "";
      this.spec.teacher = null;
      this.$nextTick(() => this.$refs.addForm.clearValidate());
      this.$nextTick(() => this.$refs.updateForm.clearValidate());
    },
    openSaveSpec: function () {
      this.dialogVisible = true;
      this.clearSpec();
      getAllPureTeachers().then((res) => {
        this.teachers = res.data.data;
      });
    },
    cancelSaveSpec: function () {
      this.dialogVisible = false;
    },
    saveSpeciality: function () {
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          saveSpec(this.spec).then((res) => {
            console.log("saveSpec" + this.spec);
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，添加成功！",
                type: "success",
              });
              this.dialogVisible = false;
              getAllSpec().then((res) => {
                this.specs = res.data.data;
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
    openUpdateSpec: function (index, row) {
      this.clearSpec();
      this.centerDialogVisible = true;
      this.spec = JSON.parse(JSON.stringify(row));
      this.rawMaterial = JSON.parse(JSON.stringify(row));
      getAllPureTeachers().then((res) => {
        this.teachers = res.data.data;
      });
    },
    cancelUpdateSpeciality: function () {
      this.centerDialogVisible = false;
    },
    updateSpeciality: function () {
      this.$refs["updateForm"].validate((valid) => {
        if (valid) {
          updateSpec(this.spec, this.rawMaterial.specid).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                message: "恭喜你，修改成功！",
                type: "success",
              });
              this.centerDialogVisible = false;
              getAllSpec().then((res) => {
                this.specs = res.data.data;
              });
            } else {
              this.$message({
                message: "修改失败",
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    openDeleteSpec: function (row) {
      this.$confirm("此操作将永久删除该专业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSpec(row).then((res) => {
            if (res.data.code == "1") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              getAllSpec().then((res) => {
                this.specs = res.data.data;
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
    getAllSpec().then((res) => {
      this.specs = res.data.data;
    });

    getAllPureTeachers().then((res) => {
      this.teachers = res.data.data;
    });
  },
};
</script>

<style>
</style>