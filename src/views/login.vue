<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="6" :sm="8" :md="10" :lg="12" :xl="14">
      <el-form :model="form" :rules="rules" label-width="80px" label-position="top" ref="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" size="small">登录</el-button>
          <el-button size="small" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>

import axios from "axios"

export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          axios({
            url: 'http://localhost:8888/api/private/v1/login',
            method: 'post',
            data: this.form
          }).then( ({data: {data, meta}}) => {
            if (meta.status === 200) {
              // 登录成功之后服务端会返回一个token,我们要把他保存到本地,用来下次访问的时候判断有没有登录
              localStorage.setItem('token',data.token)
              this.$router.push('/home')
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    }
  }
};
</script>


<style>
.el-row {
  height: 100%;
  background: rgb(1, 51, 16);
}

.el-col {
  background: #fff;
  padding: 30px 20px;
  min-width: 300px;
  border-radius: 10px;
}
</style>
