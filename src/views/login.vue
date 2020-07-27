<style lang="less">
@import "./login.less";
</style>
<template>
  <div class="login"
       @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="ios-log-in" /> 欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm"
                :model="form"
                :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName"
                     placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16"
                      type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password"
                     v-model="form.password"
                     placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14"
                      type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit"
                      type="primary"
                      long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import util from "./../libs/util.js";
import baseUtil from "./../libs/util.js";
import { showRouteArr } from "./login/showRouteArr";
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    putTrim(str) {
      let val = str.replace(/\s*/g, "");
      return val;
    },
    handleSubmit() {
      //  先判断表单数据的有效性
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 请求登录接口
          util.ajax
            // .post("jurisdiction/api/user/adminLogin", {
            //   userName: this.putTrim(this.form.userName),
            //   password: this.putTrim(this.form.password),
            //   applicationName: "中后台"
            // })
            .post("api/user/login", {
              userName: this.putTrim(this.form.userName),
              password: this.putTrim(this.form.password),
              applicationName: "中后台"
            })
            .then(res => {
              if (res.data.code == 0) {
                const respData = res.data.data;
                console.log("肖高杰", respData);
                Cookies.set("token", respData.token);
                Cookies.set("user", this.form.userName);
                Cookies.set("permissionAdmin", respData.permissionAdmin);
                // Cookies.set('password', this.form.password);
                this.$store.commit(
                  "setAvator",
                  "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
                );
                // this.$store.dispatch('getMenuInfo');

                this.$router.push({
                  name: "home_index"
                });
              } else {
                this.$Message.error(res.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    // 判断本地是否含有token
    tokenConfirm() {
      const token = Cookies.get("token");
      if (token) {
        util.ajax
          .post("api/user/tokenConfirm", {
            token: token
          })
          .then(res => {
            console.log("521", res);
          });
      }
    }
  },
  watch: {
    $route() {
      console.log("路由变化");
      this.tokenConfirm();
    }
  },
  created() {
    this.tokenConfirm();
    localStorage.setItem("dynamicMenuArr", JSON.stringify(showRouteArr));
  }
};
</script>
