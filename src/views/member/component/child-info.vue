<template>
  <Card dis-hover>
    <p slot="title">子女信息{{index+1}}</p>
    <a href="#"
       slot="extra"
       @click.prevent="getChildImgDate()">
      理赔照片
    </a>
    <a href="#"
       slot="extra"
       v-if="!childInfo.visit"
       @click.prevent="handleEditChildInfo(childInfo.id)">
      编辑
    </a>
    <template v-else>
      <a href="#"
         class="c-gray"
         slot="extra"
         @click.prevent="handleCancelEditChildInfo(childInfo.id)">
        取消
      </a>
      <a href="#"
         slot="extra"
         @click.prevent="handleSubmitChildInfo(childInfo,index)">
        保存
      </a>
    </template>
    <Form v-if="childInfo.visit"
          ref="childFrom"
          :rules="childFrom.rule">
      <Row>
        <Col :span="8">
        <FormItem label="姓名："
                  prop="realname">
          <Input type="text"
                 v-model="childInfo.realname"
                 style="width: 200px">
          </Input>
        </FormItem>
        </Col>
        <Col :span="8">
        <FormItem label="证件类型："
                  prop="cardType">
          <Select v-model="childInfo.cardType"
                  style="width: 200px">
            <Option v-for="(childInfo,index) in selectList"
                    :key="index"
                    :value="childInfo.value">{{childInfo.label}}
            </Option>
          </Select>
        </FormItem>
        </Col>
        <Col :span="8">
        <FormItem label="证件号码："
                  prop="idcard">
          <Input type="text"
                 v-model="childInfo.idcard"
                 @on-blur="autoEdit"
                 style="width: 200px">
          </Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="8">
        <FormItem label="性别："
                  prop="gender">
          <RadioGroup v-model="childInfo.gender">
            <Radio :label="1">男</Radio>
            <Radio :label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        </Col>
        <Col :span="8">
        <FormItem label="出生日期："
                  prop="birth">
          <DatePicker format="yyyy-MM-dd"
                      :value="childInfo.birth"
                      @on-change="changeChildBirth"
                      type="date"
                      placement="bottom-end"></DatePicker>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <template v-else>
      <Row>
        <Col :span="8">
        <span>姓名：</span>
        <span>{{childInfo.realname}}</span>
        </Col>
        <Col :span="8">
        <span>证件类型：</span>
        <span>{{childInfo.cardTypeDesc}}</span>
        </Col>
        <Col :span="8">
        <span>证件号码：</span>
        <span>{{childInfo.idcard}}</span>
        </Col>
      </Row>
      <Row>
        <Col :span="8">
        <span>性别：</span>
        <span>{{childInfo.genderDesc}}</span>
        </Col>
        <Col :span="8">
        <span>出生日期：</span>
        <span>{{childInfo.birth}}</span>
        </Col>
      </Row>
    </template>

  </Card>
</template>

<script>
	import utility from '../../../mixin/utility';
	
	export default {
	    name: 'child-info',
	    props: ['childInfoDate', 'selectList', 'index', 'userId'],
	    mixins: [utility],
	    data () {
	        const validatorRealname = (rule, value, callback) => {
	            if (this.isEmpty(this.childInfo.realname)) {
	                callback(new Error('姓名不能为空'));
	                return;
	            }
	            if (this.childInfo.realname.length > 10) {
	                callback(new Error('姓名不能超过10个字'));
	                return;
	            }
	            callback();
	        };
	        const validatorCardType = (rule, value, callback) => {
	            if (this.isEmpty(this.childInfo.cardType)) {
	                callback(new Error('证件类型不能为空'));
	                return;
	            }
	            if (this.childInfo.cardType == -1) {
	                callback(new Error('证件类型不能为空'));
	                return;
	            }
	            callback();
	        };
	        const validatorIdcard = (rule, value, callback) => {
	            if (this.childInfo.cardType == 1 && (!this.isEmpty(this.childInfo.idcard)) && !this.checkIdCard(this.childInfo.idcard)) {
	                callback(new Error('请输入正确的身份证号'));
	                return;
	            }
	            if (!this.isEmpty(this.childInfo.idcard) && this.childInfo.idcard.length > 30) {
	                callback(new Error('证件号码不能超过30位'));
	                return;
	            }
	            callback();
	        };
	        const validatorGender = (rule, value, callback) => {
	            if (this.isEmpty(this.childInfo.gender)) {
	                callback(new Error('请选择性别'));
	                return;
	            }
	            callback();
	        };
	        const validatorBirth = (rule, value, callback) => {
	            if (this.isEmpty(this.childInfo.birth)) {
	                callback(new Error('请选择出生日期'));
	                return;
	            }
	            callback();
	        };
	        return {
	            childInfo: {
	                visit: this.childInfoDate.visit,
	                realname: this.childInfoDate.realname,
	                cardType: this.childInfoDate.cardType,
	                idcard: this.childInfoDate.idcard,
	                gender: this.childInfoDate.gender,
	                birth: this.childInfoDate.birth,
	                cardTypeDesc: this.childInfoDate.cardTypeDesc,
	                genderDesc: this.childInfoDate.genderDesc,
	                cardImgPath: this.childInfoDate.card_img_path,
	                id: this.childInfoDate.id
	            },
	            childFrom: {
	                rule: {
	                    realname: [
	                        {required: true, validator: validatorRealname, trigger: 'click'}
	                    ],
	                    cardType: [
	                        // {required: true, validator: validatorCardType, trigger: 'click'},
	                    ],
	                    idcard: [
	                        { validator: validatorIdcard, trigger: 'click'}
	                    ],
	                    gender: [
	                        {required: true, validator: validatorGender, trigger: 'click'}
	                    ],
	                    birth: [
	                        {required: true, validator: validatorBirth, trigger: 'click'}
	                    ]
	                }
	            }
	        };
	    },
	    methods: {
	        conversionEmpty (val) {
	            if (val === '' || val == null || val === '--') {
	                return '--';
	            }
	            return val;
	        },
	        changeChildBirth (val) {
	            this.childInfo.birth = val;
	        },
	        autoEdit () {
	            if (this.childInfo.idcard.length == 0 || this.childInfo.cardType != 1 || !(/^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/).test(this.childInfo.idcard)) {
	                return;
	            }
	            const birth = this.childInfo.idcard.substring(6, 10) + '-' + this.childInfo.idcard.substring(10, 12) + '-' + this.childInfo.idcard.substring(12, 14);
	            const gender = this.childInfo.idcard.substring(14, 17) % 2 ? 1 : 2;
	            this.childInfo.gender = gender;
	            this.childInfo.birth = birth;
	        },
	        handleSubmitChildInfo () {
	            this.$refs.childFrom.validate(valid => {
	                if (valid) {
	                    this.$fetch({
	                        url: '/api/patient/editChildBasicInfo',
	                        method: 'post',
	                        data: {
	                            childId: this.childInfo.id,
	                            name: this.childInfo.realname,
	                            cardType: this.childInfo.cardType,
	                            cardNo: this.childInfo.idcard,
	                            gender: this.childInfo.gender,
	                            birth: this.childInfo.birth
	                        }
	                    }).then(res => {
	                        if (res && res.code === '000') {
	                            this.$Message.success('保存子女信息成功');
	                            this.getUserChildInfo();
	                        }
	                    });
	                }
	            });
	        },
	        getUserChildInfo () {
	            this.$fetch({
	                url: '/api/patient/getUserChildInfo',
	                method: 'post',
	                data: {userId: this.userId,
                    childId: this.childInfo.id
	                }
	            }).then(res => {
	                this.childInfo.visit = false;
	                if (res && res.code === '000') {
	                    const data = res.data[0];
	                    this.childInfo.realname = this.conversionEmpty(data.realname);
	                    this.childInfo.cardType = data.card_type;
	                    this.childInfo.idcard = data.idcard;
	                    this.childInfo.gender = data.gender;
	                    this.childInfo.birth = this.conversionEmpty(data.birth);
	                    this.childInfo.cardTypeDesc = this.conversionEmpty(data.cardTypeDesc);
	                    this.childInfo.genderDesc = this.conversionEmpty(data.genderDesc);
	                    this.childInfo.cardImgPath = data.card_img_path;
	                    this.childInfo.id = data.id;
	                }
	            });
	        },
	        handleCancelEditChildInfo (val) {
	            this.childInfo.visit = false;
	            this.getUserChildInfo();
	        },
	        getChildImgDate () {
	            this.$emit('ChildImgDate', {
	                childId: this.childInfo.id,
	                childName: this.childInfo.realname,
	                cardImgPath: this.childInfo.cardImgPath == '' || this.childInfo.cardImgPath == null ? [] : this.childInfo.cardImgPath.split(',')
	            });
	        },
	        handleEditChildInfo (val) {
	            this.childInfo.visit = true;
	        },
	        changeChildVisitStatus (val, status) {
	            let index = this.findChildItem(val);
	            if (index !== -1) {
	                this.$set(this.childList[index], 'visit', status);
	            }
	        },
	        findChildItem (val) {
	            return this.childList.findIndex(item => {
	                return item.id == val;
	            });
	        }
	    }
	};
</script>

<style scoped>
</style>
