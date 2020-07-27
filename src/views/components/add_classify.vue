<template>
	<Modal 
		:value.sync="showDialog" 
		:title="title"
		:closable='false'
		:mask-closable='false'
		>
		<el-form :model="form" :rules="rules" ref='form'>
		    <el-form-item :label="labelName" label-width="80px" prop="className">
					<el-input :placeholder="placeholder" v-model="form.className" ></el-input>
		    </el-form-item>
		</el-form>
		
		<div slot='footer'>
			<el-button type="primary" @click="ok('form')">提交</el-button>
			<el-button type="infor" @click='cancel'>取消</el-button>
		</div>
	</Modal>
</template>

<script>
	export default {
		props: {
			showDialog: {
			  type: Boolean
			}
		},
		data() {
			return {
				form: {
					className: ''
				},
				rules: {
					className: [
						{required: true, message: '请输入分类名称', trigger: 'blur'}
					]
				},
				title: '添加',
				labelName: '分类名称',
				placeholder: '请输入分类名称'
			}
		},
		computed: {
			type: function() {
				// console.log('type', this.type)
				return this.$store.state.addClassType
			}
		},
		watch: {
			showDialog:function() {
				if(this.showDialog == false) {
					this.form.className = ''
				} else {
					if (this.type === 3) {
						this.form.className = this.$store.state.addClassForm.name
					}
				}
				
			},
			type:function() {
				if (this.type === 1) {
					this.title = '添加'
				} else if(this.type === 2) {
					this.title = '添加子分类'
				} else if(this.type === 3) {
					this.title = '编辑'
				}
			},
			form: function() {
			}
		},
		mounted() {},
		methods: {
			ok(form) {
				this.$refs[form].validate((valid) => {
					if (valid) {
						
						this.form.className = this.form.className.replace(/\s+/g, "")
						
						if (this.form.className === '') {
							this.$message.error('请输入正确的名称')
						} else {
							let data = {}
							let method = ''
							
								if (this.type === 1) {
									// 添加分类
									data = {
										name: this.form.className
									}
									method = 'post'
								} else if(this.type === 2) {
									// 添加子分类
									data = {
										parentId: this.$store.state.addClassForm.id,
										name: this.form.className
									}
									method = 'post'
									
								} else if(this.type === 3) {
									// 编辑
									data = {
										id: this.$store.state.addClassForm.id,
										name: this.form.className
									}
									method = 'put'
								}
								 
								this.$fetch({
									url: 'categoryOpt/category',
									method: method,
									data: data
								})
								.then(res => {
									// console.log('添加',res)
									if (res.code == 1001) {
										this.$message.error(res.message)
										this.$emit('closeDialog', 1)
									} else {
										this.$message.success('提交成功')
										this.$emit('closeDialog', 2)
									}
								})
						}
					}
				})
			},
			cancel() {
				this.$message.info('取消')
				this.$emit('closeDialog', 1)
				this.$nextTick(() => {
				this.$refs.form.resetFields();
				});
			}
		}
	}
</script>

<style>
	.el-input {
		width: 250px;
	}
</style>
