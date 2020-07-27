<style lang="less">
@import './main.less';
</style>
<template>
  <div class="main"
       :class="{'main-hide-text': shrink}">
    <Modal v-model="PassWordModal"
           title="修改密码"
           :mask-closable="false"
           width="360">
      <Form ref="changePassword"
            :model="changePassword"
            :rules="ruleCustom">
        <FormItem prop="oldPassword">
          <Input type="password"
                 v-model="changePassword.oldPassword"
                 placeholder="请输入旧密码"
                 clearable></Input>
        </FormItem>
        <FormItem prop="newPassword">
          <Input type="password"
                 v-model="changePassword.newPassword"
                 placeholder="请输入新密码"
                 clearable></Input>
        </FormItem>
        <FormItem prop="checkPassword">
          <Input type="password"
                 v-model="changePassword.checkPassword"
                 placeholder="确认新密码"
                 clearable></Input>
        </FormItem>
      </Form>

      <div slot="footer">
        <Button type="text"
                size="large"
                @click="handleReset">重置</Button>
        <Button type="primary"
                size="large"
                @click="sumbit">确定</Button>
      </div>
    </Modal>
    <div class="sidebar-menu-con"
         :style="{width: shrink?'60px':'230px', overflow: shrink ? 'visible' : 'auto'}">
      <!-- <scroll-bar ref="scrollBar"> -->
      <shrinkable-menu :shrink="shrink"
                       @on-change="handleSubmenuChange"
                       :theme="menuTheme"
                       :before-push="beforePush"
                       :open-names="openedSubmenuArr"
                       :menu-list="menuList">
        <div slot="top"
             class="logo-con">
          <img v-show="!shrink"
               src="../images/logo.jpg"
               key="max-logo" />
          <img v-show="shrink"
               src="../images/logo.jpg"
               key="min-logo" />
        </div>
      </shrinkable-menu>
      <!-- </scroll-bar> -->
    </div>
    <div class="main-header-con"
         :style="{paddingLeft: shrink?'60px':'230px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
                  type="text"
                  @click="toggleClick">
            <Icon type="md-menu"
                  size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con"
               style="width: 300px;">
            <Row type="flex"
                 justify="end"
                 align="middle"
                 class="user-dropdown-innercon">
              <Dropdown transfer
                        trigger="click"
                        @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}，已登录</span>
                  <Icon type="ios-arrow-down" />
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="changePassword">修改密码</DropdownItem>
                  <DropdownItem name="loginout"
                                divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath"
                      style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="single-page-con"
         :style="{left: shrink?'60px':'230px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
	import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
	import tagsPageOpened from './main-components/tags-page-opened.vue';
	import breadcrumbNav from './main-components/breadcrumb-nav.vue';
	import messageTip from './main-components/message-tip.vue';
	import themeSwitch from './main-components/theme-switch/theme-switch.vue';
	import Cookies from 'js-cookie';
	import scrollBar from '@/views/my-components/scroll-bar/vue-scroller-bars';
	
	export default {
	    provide () {
	        return {
	            refresh: this.refresh
	        };
	    },
	    components: {
	        shrinkableMenu,
	        tagsPageOpened,
	        breadcrumbNav,
	        messageTip,
	        themeSwitch,
	        scrollBar
	    },
	    data () {
	        const validatePass = (rule, value, callback) => {
	            if (value === '') {
	                callback(new Error('请输再次输入新密码'));
	            } else {
	                if (this.changePassword.newPassword !== this.changePassword.checkPassword) {
	                    callback(new Error('两次输入的密码不一致，请重新输入'));
	                }
	                callback();
	            }
	        };
	        let validateNewPassword = (rule, value, callback) => {
	            if (value === '' || value == null) {
	                callback(new Error('请输入密码'));
	                return;
	            }
	            if (value.length > 20 || value.length < 8) {
	                callback(new Error('密码长度须为8-20位之间'));
	                return;
	            }
	            if (!(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])^[0-9A-Za-z]{8,20}$/.test(value))) {
	                callback(new Error('至少需包含大小写字母+数字的组合'));
	                return;
	            }
	            callback();
        };
	        return {
	            shrink: false,
	            userName: '',
	            isRouterAlive: true,
	            openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
	            PassWordModal: false,
	            changePassword: {
	                oldPassword: '',
	                newPassword: '',
	                checkPassword: ''
	            },
	            ruleCustom: {
	                oldPassword: [
	                    {required: true, message: '请输入旧密码', trigger: 'blur'}
	                ],
	                newPassword: [
	                    {required: true, validator: validateNewPassword, trigger: 'blur'}
	                ],
	                checkPassword: [
	                    {validator: validatePass, trigger: 'blur'}
	                ]
	
	            }
	        };
	    },
	    computed: {
	        menuList () {
	            return this.$store.state.app.menuList;
	        },
	        pageTagsList () {
	            // 打开的页面的页面对象
	            return this.$store.state.app.pageOpenedList;
	        },
	        currentPath () {
	            return this.$store.state.app.currentPath; // 当前面包屑数组
	        },
	        avatorPath () {
	            return localStorage.avatorImgPath;
	        },
	        cachePage () {
	            return this.$store.state.app.cachePage;
	        },
	        lang () {
	            return this.$store.state.app.lang;
	        },
	        menuTheme () {
	            return this.$store.state.app.menuTheme;
	        }
	    },
	    methods: {
	        refresh () {
	            this.isRouterAlive = false;
	            this.$nextTick(() => {
	                this.isRouterAlive = true;
	            });
        },
	        handleReset () {
	            this.$refs.changePassword.resetFields();
	        },
	        sumbit () {
	            this.$refs.changePassword.validate((valid) => {
	                if (valid) {
	                    this.$util.ajax.post('jurisdiction/api/user/updatePassword', {
	                        newPassword: this.changePassword.newPassword,
	                        oldPassword: this.changePassword.oldPassword
	                    }).then((res) => {
	                        if (res.data.code !== '000') {
	                            this.$Message.error(res.data.msg);
	                            return;
	                        }
	                        this.$Message.success('修改成功!');
	                        this.PassWordModal = false;
	                        this.$refs.changePassword.resetFields();
	                    });
	                }
	            });
	        },
	        init () {
	            let pathArr = this.$util.setCurrentPath(this, this.$route.name);
	            this.$store.dispatch('getMenuInfo'); // 在这里获取动态菜单
				console.log('数字',pathArr)
	            if (pathArr.length >= 2) {
	                this.$store.commit('addOpenSubmenu', pathArr[1].name);
	            }
	            this.userName = Cookies.get('user');
	            let messageCount = 3;
	            this.messageCount = messageCount.toString();
	            this.checkTag(this.$route.name);
	            this.$store.commit('setMessageCount', 3);
	        },
	        toggleClick () {
	            this.shrink = !this.shrink;
	        },
	        handleClickUserDropdown (name) {
	            if (name === 'changePassword') {
	                this.PassWordModal = true;
	            } else if (name === 'loginout') {
	                // 退出登录
	                this.$store.commit('logout', this);
	                this.$store.commit('clearOpenedSubmenu');
	                this.$router.push({
	                    name: 'login'
	                });
	            }
	        },
	        checkTag (name) {
	            let openpageHasTag = this.pageTagsList.some(item => {
	                if (item.name === name) {
	                    return true;
	                }
	            });
	            if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
	                this.$util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
	            }
	        },
	        handleSubmenuChange (val) {
	            // tabs数量过多时，对其他闲置标签进行关闭
	            const pageList = this.$store.state.app.pageOpenedList;
	            if (pageList.length > 5) {
	                pageList.forEach((item, index) => {
	                    if (index > 0 && index < pageList.length - 4) {
	                        this.$store.commit('removeTag', item.name);
	                    }
	                });
	            }
	        },
	        beforePush (name) {
	            // if (name === 'accesstest_index') {
	            //     return false;
	            // } else {
	            //     return true;
	            // }
	            return true;
	        },
	
	        scrollBarResize () {
	            // this.$refs.scrollBar.resize();
	        }
	    },
	    watch: {
	        PassWordModal (val) {
	            if (!val) {
	                this.$refs.changePassword.resetFields();
	            }
	        },
	        '$route' (to) {
	            this.$store.commit('setCurrentPageName', to.name);
	            let pathArr = this.$util.setCurrentPath(this, to.name);
	            if (pathArr.length > 2) {
	                this.$store.commit('addOpenSubmenu', pathArr[1].name);
	            }
	            this.checkTag(to.name);
	            localStorage.currentPageName = to.name;
	        },
	        lang () {
	            this.$util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
	        },
	        openedSubmenuArr () {
	            setTimeout(() => {
	                this.scrollBarResize();
	            }, 300);
	        }
	    },
	    mounted () {
        this.$nextTick(() => {
            this.init();
            window.addEventListener('resize', this.scrollBarResize);
        });
	    },
	    created () {
	        // 显示打开的页面的列表
	        this.$store.commit('setOpenedList');
	    },
	    dispatch () {
	        window.removeEventListener('resize', this.scrollBarResize);
	    }
	};
</script>
