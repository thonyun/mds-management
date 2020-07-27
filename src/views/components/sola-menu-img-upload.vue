<template>
  <div>
    <Upload ref="imgUpload"
            :on-success="handleImgSuccess"
            v-if="!disabled"
            :format="format"
            :max-size="maxSize"
            :on-format-error="handleImgFormatError"
            :on-exceeded-size="handleSizeExceed"
            :before-upload="handleBeforeImgUpload"
            :action="imgUploadUrl"
            :show-upload-list="false"
            class="img-upload"
            name="myFileName">
      <div class="img-upload-content">
        <Icon type="ios-add"
              size="26"></Icon>
        <div class="img-upload-title">上传/更换</div>
      </div>
    </Upload>
    <div class="img-upload-list"
         v-if="imgUrl">
      <img :src="imgUrl">
    </div>
    <div style="color: #b8b8b8;"
         v-if="hint.length>0">
      <div v-for="(item,index) in hint"
           :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
	import util from './../../libs/util.js';
	
	export default {
	    name: 'sola-menu-img-upload',
    props: ['img', 'format', 'hint', 'width', 'height', 'maxSize', 'disabled'],
	    data () {
	        return {
	            imgUploadUrl: util.ajax.defaults.baseURL + 'api/MedicalKit/uploadArticleFile',
	            imgUrl: ''
	        };
	    },
	    methods: {
	        handleImgSuccess (response, file, fileList) {
	            if (response.errno === 0) {
	                this.imgUrl = response.data[0];
	            } else {
	                this.$Message.error({
	                    content: response.data
	                });
	            }
	        },
	        handleImgFormatError () {
	            this.$Message.error({
	                content: '文件格式错误！'
	            });
	        },
	        handleSizeExceed () {
	            this.$Message.error({
	                content: '图片大小超出限制！',
	                duration: 3
	            });
	        },
	        handleBeforeImgUpload (file) {
	            if (this.width === null || this.height === null) {
	                return;
            }
	            return this.checkImageWH(file, this.width, this.height);
	        },
	        checkImageWH (file, width, height) {
	            let self = this;
	            return new Promise(function (resolve, reject) {
	                let filereader = new FileReader();
	                filereader.onload = e => {
	                    let src = e.target.result;
	                    const image = new Image();
	                    image.onload = function () {
	                        if (width && this.width != width) {
	                            // console.log('hhhh')
	                            self.$Message.error({
	                                content: `请上传宽为${width},高为${height}的图片`,
	                                duration: 3
	                            });
	                            reject();
	                        } else if (height && this.height != height) {
	                            self.$Message.error({
	                                content: `请上传宽为${width},高为${height}的图片`,
	                                duration: 3
	                            });
	                            reject();
	                        } else {
	                            resolve();
	                        }
	                    };
	                    image.onerror = reject;
	                    image.src = src;
	                };
	                filereader.readAsDataURL(file);
	            });
	        }
	
	    },
	    watch: {
	        imgUrl () {
	            this.$emit('change', this.imgUrl);
	        },
	        img (val) {
            this.imgUrl = val;
            console.log('这是返回的图片：' + val);
	        }
	    }
	};
</script>

<style scoped lang="less">
.img-upload {
  display: inline-block;
  width: 100px;
  border: 1px dashed #eee;
  background: #fafafa;
  border-radius: 4px;
  vertical-align: middle;

  .img-upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 98px;
    height: 98px;
  }
}

.img-upload-list {
  display: inline-block;
  width: 98px;
  height: 98px;
  text-align: center;
  line-height: 98px;
  border: 1px dashed #eee;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-left: 14px;
  vertical-align: middle;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
