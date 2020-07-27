<template>
  <div>
    <div class="demo-upload-list"
         v-for="(item,index) in uploadList"
         :key="index">
      <template>
        <img :src="item">
        <div class="demo-upload-list-cover"
             v-if="!disabled">
          <Icon type="ios-eye-outline"
                @click.native="handleView(item)"
                v-if="view"></Icon>
          <!-- <Icon type="ios-trash-outline"
                @click.native="handleRemove(index)"
                v-if="fistDelete"></Icon>
          <Icon type="ios-trash-outline"
                @click.native="handleRemove(index)"
                v-else-if="fistDelete==false&&uploadList.length!=1"></Icon> -->
        </div>
      </template>
    </div>
    <!-- <Upload v-if="!disabled"
            ref="upload"
            :show-upload-list="false"
            name="myFileName"
            :on-success="handleSuccess"
            :format="format"
            :max-size="maxSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :action="imgUploadUrl"
            style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera"
              size="20"></Icon>
      </div>
    </Upload> -->
    <div style="color: #b8b8b8;"
         v-if="hint.length>0">
      <div v-for="(item,index) in hint"
           :key="index">
        {{item}}
      </div>
    </div>
    <Modal v-model="visible">
      <img :src="magnifyUrl"
           v-if="visible"
           style="width: 100%">
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
	import util from '../../libs/util.js';
	
	export default {
	    name: 'upload-img',
	    props: {
	        disabled: {
	            type: Boolean,
	            default: false
        },
	        width: {
	            type: Number
        },
        height: {
	            type: Number
        },
	        view: {
	            type: Boolean,
	            default: true
	        },
	        fistDelete: {
	            type: Boolean,
	            default: false
	        },
	        imgList: {
	            type: Array
	        },
	        hint: {
	            type: Array,
	            default: function () {
	                return [];
	            }
	        },
	        format: {
	            type: Array,
            default: function () {
                return ['jpg', 'jpeg', 'png'];
            }
        },
	        maxSize: {
	            type: Number,
	            default: 2048
	        }
	    },
	    data () {
	        return {
	            imgUploadUrl: util.ajax.defaults.baseURL + 'api/MedicalKit/uploadArticleFile',
	            magnifyUrl: '',
	            visible: false,
	            uploadList: []
	        };
	    },
	    methods: {
	        handleView (url) {
	            this.visible = true;
	            this.magnifyUrl = url;
	        },
	        handleRemove (val) {
	            this.uploadList.splice(val, 1);
	        },
	        handleSuccess (response, file) {
	            if (response.errno === 0) {
	                this.uploadList.push(response.data[0]);
	            } else {
	                this.$Message.error({
	                    content: response.data,
	                    duration: 3
	                });
	            }
	        },
	        handleFormatError (file) {
	            this.$Message.error({
	                content: '文件格式错误！',
	                duration: 3
	            });
	        },
	        handleMaxSize (file) {
	            this.$Message.error({
	                content: '图片大小超出限制！',
	                duration: 3
	            });
	        },
	        handleBeforeUpload (file) {
	            if (this.width == null || this.height == null) {
	                return;
	            }
	            return this.checkImageWH(file, 494, 715);
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
	        uploadList (val) {
	            this.$emit('changeImgList', val);
	        },
	        imgList (val) {
	            this.uploadList = val;
	        }
	    }
	};
</script>

<style scoped>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}

.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}

.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
