var mixin = {
	data() {
		return {
			"provinces": [
				{
					"label": "北京市",
					"id": "110100",
				},
			// 	{
			// 		"label": "天津市",
			// 		"id": "1200",
			// 	},
			// 	{
			// 		"label": "河北省",
			//
			// 		"id": "1300",
			// 		"children": [
			// 			{
			// 				"label": "石家庄市",
			//
			// 				"id": "1301"
			// 			},
			// 			{
			// 				"label": "唐山市",
			//
			// 				"id": "1302"
			// 			},
			// 			{
			// 				"label": "秦皇岛市",
			//
			// 				"id": "1303"
			// 			},
			// 			{
			// 				"label": "邯郸市",
			//
			// 				"id": "1304"
			// 			},
			// 			{
			// 				"label": "邢台市",
			//
			// 				"id": "1305"
			// 			},
			// 			{
			// 				"label": "保定市",
			//
			// 				"id": "1306"
			// 			},
			// 			{
			// 				"label": "张家口市",
			//
			// 				"id": "1307"
			// 			},
			// 			{
			// 				"label": "承德市",
			//
			// 				"id": "1308"
			// 			},
			// 			{
			// 				"label": "沧州市",
			//
			// 				"id": "1309"
			// 			},
			// 			{
			// 				"label": "廊坊市",
			//
			// 				"id": "1310"
			// 			},
			// 			{
			// 				"label": "衡水市",
			//
			// 				"id": "1311"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "山西省",
			//
			// 		"id": "1400",
			// 		"children": [
			// 			{
			// 				"label": "太原市",
			//
			// 				"id": "1401"
			// 			},
			// 			{
			// 				"label": "大同市",
			//
			// 				"id": "1402"
			// 			},
			// 			{
			// 				"label": "阳泉市",
			//
			// 				"id": "1403"
			// 			},
			// 			{
			// 				"label": "长治市",
			//
			// 				"id": "1404"
			// 			},
			// 			{
			// 				"label": "晋城市",
			//
			// 				"id": "1405"
			// 			},
			// 			{
			// 				"label": "朔州市",
			//
			// 				"id": "1406"
			// 			},
			// 			{
			// 				"label": "晋中市",
			//
			// 				"id": "1407"
			// 			},
			// 			{
			// 				"label": "运城市",
			//
			// 				"id": "1408"
			// 			},
			// 			{
			// 				"label": "忻州市",
			//
			// 				"id": "1409"
			// 			},
			// 			{
			// 				"label": "临汾市",
			//
			// 				"id": "1410"
			// 			},
			// 			{
			// 				"label": "吕梁市",
			//
			// 				"id": "1411"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "内蒙古自治区",
			//
			// 		"id": "1500",
			// 		"children": [
			// 			{
			// 				"label": "呼和浩特市",
			//
			// 				"id": "1501"
			// 			},
			// 			{
			// 				"label": "包头市",
			//
			// 				"id": "1502"
			// 			},
			// 			{
			// 				"label": "乌海市",
			//
			// 				"id": "1503"
			// 			},
			// 			{
			// 				"label": "赤峰市",
			//
			// 				"id": "1504"
			// 			},
			// 			{
			// 				"label": "通辽市",
			//
			// 				"id": "1505"
			// 			},
			// 			{
			// 				"label": "鄂尔多斯市",
			//
			// 				"id": "1506"
			// 			},
			// 			{
			// 				"label": "呼伦贝尔市",
			//
			// 				"id": "1507"
			// 			},
			// 			{
			// 				"label": "巴彦淖尔市",
			//
			// 				"id": "1508"
			// 			},
			// 			{
			// 				"label": "乌兰察布市",
			//
			// 				"id": "1509"
			// 			},
			// 			{
			// 				"label": "兴安盟",
			//
			// 				"id": "1522"
			// 			},
			// 			{
			// 				"label": "锡林郭勒盟",
			//
			// 				"id": "1525"
			// 			},
			// 			{
			// 				"label": "阿拉善盟",
			//
			// 				"id": "1529"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "辽宁省",
			//
			// 		"id": "2100",
			// 		"children": [
			// 			{
			// 				"label": "沈阳市",
			//
			// 				"id": "2101"
			// 			},
			// 			{
			// 				"label": "大连市",
			//
			// 				"id": "2102"
			// 			},
			// 			{
			// 				"label": "鞍山市",
			//
			// 				"id": "2103"
			// 			},
			// 			{
			// 				"label": "抚顺市",
			//
			// 				"id": "2104"
			// 			},
			// 			{
			// 				"label": "本溪市",
			//
			// 				"id": "2105"
			// 			},
			// 			{
			// 				"label": "丹东市",
			//
			// 				"id": "2106"
			// 			},
			// 			{
			// 				"label": "锦州市",
			//
			// 				"id": "2107"
			// 			},
			// 			{
			// 				"label": "营口市",
			//
			// 				"id": "2108"
			// 			},
			// 			{
			// 				"label": "阜新市",
			//
			// 				"id": "2109"
			// 			},
			// 			{
			// 				"label": "辽阳市",
			//
			// 				"id": "2110"
			// 			},
			// 			{
			// 				"label": "盘锦市",
			//
			// 				"id": "2111"
			// 			},
			// 			{
			// 				"label": "铁岭市",
			//
			// 				"id": "2112"
			// 			},
			// 			{
			// 				"label": "朝阳市",
			//
			// 				"id": "2113"
			// 			},
			// 			{
			// 				"label": "葫芦岛市",
			//
			// 				"id": "2114"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "吉林省",
			//
			// 		"id": "2200",
			// 		"children": [
			// 			{
			// 				"label": "长春市",
			//
			// 				"id": "2201"
			// 			},
			// 			{
			// 				"label": "吉林市",
			//
			// 				"id": "2202"
			// 			},
			// 			{
			// 				"label": "四平市",
			//
			// 				"id": "2203"
			// 			},
			// 			{
			// 				"label": "辽源市",
			//
			// 				"id": "2204"
			// 			},
			// 			{
			// 				"label": "通化市",
			//
			// 				"id": "2205"
			// 			},
			// 			{
			// 				"label": "白山市",
			//
			// 				"id": "2206"
			// 			},
			// 			{
			// 				"label": "松原市",
			//
			// 				"id": "2207"
			// 			},
			// 			{
			// 				"label": "白城市",
			//
			// 				"id": "2208"
			// 			},
			// 			{
			// 				"label": "延边朝鲜族自治州",
			//
			// 				"id": "2224"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "黑龙江省",
			//
			// 		"id": "2300",
			// 		"children": [
			// 			{
			// 				"label": "哈尔滨市",
			//
			// 				"id": "2301"
			// 			},
			// 			{
			// 				"label": "齐齐哈尔市",
			//
			// 				"id": "2302"
			// 			},
			// 			{
			// 				"label": "鸡西市",
			//
			// 				"id": "2303"
			// 			},
			// 			{
			// 				"label": "鹤岗市",
			//
			// 				"id": "2304"
			// 			},
			// 			{
			// 				"label": "双鸭山市",
			//
			// 				"id": "2305"
			// 			},
			// 			{
			// 				"label": "大庆市",
			//
			// 				"id": "2306"
			// 			},
			// 			{
			// 				"label": "伊春市",
			//
			// 				"id": "2307"
			// 			},
			// 			{
			// 				"label": "佳木斯市",
			//
			// 				"id": "2308"
			// 			},
			// 			{
			// 				"label": "七台河市",
			//
			// 				"id": "2309"
			// 			},
			// 			{
			// 				"label": "牡丹江市",
			//
			// 				"id": "2310"
			// 			},
			// 			{
			// 				"label": "黑河市",
			//
			// 				"id": "2311"
			// 			},
			// 			{
			// 				"label": "绥化市",
			//
			// 				"id": "2312"
			// 			},
			// 			{
			// 				"label": "大兴安岭地区",
			//
			// 				"id": "2327"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "上海市",
			// 		"id": "3100",
			// 	},
			// 	{
			// 		"label": "江苏省",
			//
			// 		"id": "3200",
			// 		"children": [
			// 			{
			// 				"label": "南京市",
			//
			// 				"id": "3201"
			// 			},
			// 			{
			// 				"label": "无锡市",
			//
			// 				"id": "3202"
			// 			},
			// 			{
			// 				"label": "徐州市",
			//
			// 				"id": "3203"
			// 			},
			// 			{
			// 				"label": "常州市",
			//
			// 				"id": "3204"
			// 			},
			// 			{
			// 				"label": "苏州市",
			//
			// 				"id": "3205"
			// 			},
			// 			{
			// 				"label": "南通市",
			//
			// 				"id": "3206"
			// 			},
			// 			{
			// 				"label": "连云港市",
			//
			// 				"id": "3207"
			// 			},
			// 			{
			// 				"label": "淮安市",
			//
			// 				"id": "3208"
			// 			},
			// 			{
			// 				"label": "盐城市",
			//
			// 				"id": "3209"
			// 			},
			// 			{
			// 				"label": "扬州市",
			//
			// 				"id": "3210"
			// 			},
			// 			{
			// 				"label": "镇江市",
			//
			// 				"id": "3211"
			// 			},
			// 			{
			// 				"label": "泰州市",
			//
			// 				"id": "3212"
			// 			},
			// 			{
			// 				"label": "宿迁市",
			//
			// 				"id": "3213"
			// 			}
			// 		]
			// 	},
				{
					"label": "浙江省",

					"id": "330000",
					"children": [
						{
							"label": "杭州市",

							"id": "330100"
						},
			// 			{
			// 				"label": "宁波市",
			//
			// 				"id": "3302"
			// 			},
			// 			{
			// 				"label": "温州市",
			//
			// 				"id": "3303"
			// 			},
			// 			{
			// 				"label": "嘉兴市",
			//
			// 				"id": "3304"
			// 			},
			// 			{
			// 				"label": "湖州市",
			//
			// 				"id": "3305"
			// 			},
			// 			{
			// 				"label": "绍兴市",
			//
			// 				"id": "3306"
			// 			},
			// 			{
			// 				"label": "金华市",
			//
			// 				"id": "3307"
			// 			},
			// 			{
			// 				"label": "衢州市",
			//
			// 				"id": "3308"
			// 			},
			// 			{
			// 				"label": "舟山市",
			//
			// 				"id": "3309"
			// 			},
			// 			{
			// 				"label": "台州市",
			//
			// 				"id": "3310"
			// 			},
			// 			{
			// 				"label": "丽水市",
			//
			// 				"id": "3311"
			// 			}
					]
				},
			// 	{
			// 		"label": "安徽省",
			//
			// 		"id": "3400",
			// 		"children": [
			// 			{
			// 				"label": "合肥市",
			//
			// 				"id": "3401"
			// 			},
			// 			{
			// 				"label": "芜湖市",
			//
			// 				"id": "3402"
			// 			},
			// 			{
			// 				"label": "蚌埠市",
			//
			// 				"id": "3403"
			// 			},
			// 			{
			// 				"label": "淮南市",
			//
			// 				"id": "3404"
			// 			},
			// 			{
			// 				"label": "马鞍山市",
			//
			// 				"id": "3405"
			// 			},
			// 			{
			// 				"label": "淮北市",
			//
			// 				"id": "3406"
			// 			},
			// 			{
			// 				"label": "铜陵市",
			//
			// 				"id": "3407"
			// 			},
			// 			{
			// 				"label": "安庆市",
			//
			// 				"id": "3408"
			// 			},
			// 			{
			// 				"label": "黄山市",
			//
			// 				"id": "3410"
			// 			},
			// 			{
			// 				"label": "滁州市",
			//
			// 				"id": "3411"
			// 			},
			// 			{
			// 				"label": "阜阳市",
			//
			// 				"id": "3412"
			// 			},
			// 			{
			// 				"label": "宿州市",
			//
			// 				"id": "3413"
			// 			},
			// 			{
			// 				"label": "巢湖市",
			//
			// 				"id": "3414"
			// 			},
			// 			{
			// 				"label": "六安市",
			//
			// 				"id": "3415"
			// 			},
			// 			{
			// 				"label": "亳州市",
			//
			// 				"id": "3416"
			// 			},
			// 			{
			// 				"label": "池州市",
			//
			// 				"id": "3417"
			// 			},
			// 			{
			// 				"label": "宣城市",
			//
			// 				"id": "3418"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "福建省",
			//
			// 		"id": "3500",
			// 		"children": [
			// 			{
			// 				"label": "福州市",
			//
			// 				"id": "3501"
			// 			},
			// 			{
			// 				"label": "厦门市",
			//
			// 				"id": "3502"
			// 			},
			// 			{
			// 				"label": "莆田市",
			//
			// 				"id": "3503"
			// 			},
			// 			{
			// 				"label": "三明市",
			//
			// 				"id": "3504"
			// 			},
			// 			{
			// 				"label": "泉州市",
			//
			// 				"id": "3505"
			// 			},
			// 			{
			// 				"label": "漳州市",
			//
			// 				"id": "3506"
			// 			},
			// 			{
			// 				"label": "南平市",
			//
			// 				"id": "3507"
			// 			},
			// 			{
			// 				"label": "龙岩市",
			//
			// 				"id": "3508"
			// 			},
			// 			{
			// 				"label": "宁德市",
			//
			// 				"id": "3509"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "江西省",
			//
			// 		"id": "3600",
			// 		"children": [
			// 			{
			// 				"label": "南昌市",
			//
			// 				"id": "3601"
			// 			},
			// 			{
			// 				"label": "景德镇市",
			//
			// 				"id": "3602"
			// 			},
			// 			{
			// 				"label": "萍乡市",
			//
			// 				"id": "3603"
			// 			},
			// 			{
			// 				"label": "九江市",
			//
			// 				"id": "3604"
			// 			},
			// 			{
			// 				"label": "新余市",
			//
			// 				"id": "3605"
			// 			},
			// 			{
			// 				"label": "鹰潭市",
			//
			// 				"id": "3606"
			// 			},
			// 			{
			// 				"label": "赣州市",
			//
			// 				"id": "3607"
			// 			},
			// 			{
			// 				"label": "吉安市",
			//
			// 				"id": "3608"
			// 			},
			// 			{
			// 				"label": "宜春市",
			//
			// 				"id": "3609"
			// 			},
			// 			{
			// 				"label": "抚州市",
			//
			// 				"id": "3610"
			// 			},
			// 			{
			// 				"label": "上饶市",
			//
			// 				"id": "3611"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "山东省",
			//
			// 		"id": "3700",
			// 		"children": [
			// 			{
			// 				"label": "济南市",
			//
			// 				"id": "3701"
			// 			},
			// 			{
			// 				"label": "青岛市",
			//
			// 				"id": "3702"
			// 			},
			// 			{
			// 				"label": "淄博市",
			//
			// 				"id": "3703"
			// 			},
			// 			{
			// 				"label": "枣庄市",
			//
			// 				"id": "3704"
			// 			},
			// 			{
			// 				"label": "东营市",
			//
			// 				"id": "3705"
			// 			},
			// 			{
			// 				"label": "烟台市",
			//
			// 				"id": "3706"
			// 			},
			// 			{
			// 				"label": "潍坊市",
			//
			// 				"id": "3707"
			// 			},
			// 			{
			// 				"label": "济宁市",
			//
			// 				"id": "3708"
			// 			},
			// 			{
			// 				"label": "泰安市",
			//
			// 				"id": "3709"
			// 			},
			// 			{
			// 				"label": "威海市",
			//
			// 				"id": "3710"
			// 			},
			// 			{
			// 				"label": "日照市",
			//
			// 				"id": "3711"
			// 			},
			// 			{
			// 				"label": "莱芜市",
			//
			// 				"id": "3712"
			// 			},
			// 			{
			// 				"label": "临沂市",
			//
			// 				"id": "3713"
			// 			},
			// 			{
			// 				"label": "德州市",
			//
			// 				"id": "3714"
			// 			},
			// 			{
			// 				"label": "聊城市",
			//
			// 				"id": "3715"
			// 			},
			// 			{
			// 				"label": "滨州市",
			//
			// 				"id": "3716"
			// 			},
			// 			{
			// 				"label": "菏泽市",
			//
			// 				"id": "3717"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "河南省",
			//
			// 		"id": "4100",
			// 		"children": [
			// 			{
			// 				"label": "郑州市",
			//
			// 				"id": "4101"
			// 			},
			// 			{
			// 				"label": "开封市",
			//
			// 				"id": "4102"
			// 			},
			// 			{
			// 				"label": "洛阳市",
			//
			// 				"id": "4103"
			// 			},
			// 			{
			// 				"label": "平顶山市",
			//
			// 				"id": "4104"
			// 			},
			// 			{
			// 				"label": "安阳市",
			//
			// 				"id": "4105"
			// 			},
			// 			{
			// 				"label": "鹤壁市",
			//
			// 				"id": "4106"
			// 			},
			// 			{
			// 				"label": "新乡市",
			//
			// 				"id": "4107"
			// 			},
			// 			{
			// 				"label": "焦作市",
			//
			// 				"id": "4108"
			// 			},
			// 			{
			// 				"label": "濮阳市",
			//
			// 				"id": "4109"
			// 			},
			// 			{
			// 				"label": "许昌市",
			//
			// 				"id": "4110"
			// 			},
			// 			{
			// 				"label": "漯河市",
			//
			// 				"id": "4111"
			// 			},
			// 			{
			// 				"label": "三门峡市",
			//
			// 				"id": "4112"
			// 			},
			// 			{
			// 				"label": "南阳市",
			//
			// 				"id": "4113"
			// 			},
			// 			{
			// 				"label": "商丘市",
			//
			// 				"id": "4114"
			// 			},
			// 			{
			// 				"label": "信阳市",
			//
			// 				"id": "4115"
			// 			},
			// 			{
			// 				"label": "周口市",
			//
			// 				"id": "4116"
			// 			},
			// 			{
			// 				"label": "驻马店市",
			//
			// 				"id": "4117"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "湖北省",
			//
			// 		"id": "4200",
			// 		"children": [
			// 			{
			// 				"label": "武汉市",
			//
			// 				"id": "4201"
			// 			},
			// 			{
			// 				"label": "黄石市",
			//
			// 				"id": "4202"
			// 			},
			// 			{
			// 				"label": "十堰市",
			//
			// 				"id": "4203"
			// 			},
			// 			{
			// 				"label": "宜昌市",
			//
			// 				"id": "4205"
			// 			},
			// 			{
			// 				"label": "襄樊市",
			//
			// 				"id": "4206"
			// 			},
			// 			{
			// 				"label": "鄂州市",
			//
			// 				"id": "4207"
			// 			},
			// 			{
			// 				"label": "荆门市",
			//
			// 				"id": "4208"
			// 			},
			// 			{
			// 				"label": "孝感市",
			//
			// 				"id": "4209"
			// 			},
			// 			{
			// 				"label": "荆州市",
			//
			// 				"id": "4210"
			// 			},
			// 			{
			// 				"label": "黄冈市",
			//
			// 				"id": "4211"
			// 			},
			// 			{
			// 				"label": "咸宁市",
			//
			// 				"id": "4212"
			// 			},
			// 			{
			// 				"label": "随州市",
			//
			// 				"id": "4213"
			// 			},
			// 			{
			// 				"label": "恩施土家族苗族自治州",
			//
			// 				"id": "4228"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "湖南省",
			//
			// 		"id": "4300",
			// 		"children": [
			// 			{
			// 				"label": "长沙市",
			//
			// 				"id": "4301"
			// 			},
			// 			{
			// 				"label": "株洲市",
			//
			// 				"id": "4302"
			// 			},
			// 			{
			// 				"label": "湘潭市",
			//
			// 				"id": "4303"
			// 			},
			// 			{
			// 				"label": "衡阳市",
			//
			// 				"id": "4304"
			// 			},
			// 			{
			// 				"label": "邵阳市",
			//
			// 				"id": "4305"
			// 			},
			// 			{
			// 				"label": "岳阳市",
			//
			// 				"id": "4306"
			// 			},
			// 			{
			// 				"label": "常德市",
			//
			// 				"id": "4307"
			// 			},
			// 			{
			// 				"label": "张家界市",
			//
			// 				"id": "4308"
			// 			},
			// 			{
			// 				"label": "益阳市",
			//
			// 				"id": "4309"
			// 			},
			// 			{
			// 				"label": "郴州市",
			//
			// 				"id": "4310"
			// 			},
			// 			{
			// 				"label": "永州市",
			//
			// 				"id": "4311"
			// 			},
			// 			{
			// 				"label": "怀化市",
			//
			// 				"id": "4312"
			// 			},
			// 			{
			// 				"label": "娄底市",
			//
			// 				"id": "4313"
			// 			},
			// 			{
			// 				"label": "湘西土家族苗族自治州",
			//
			// 				"id": "4331"
			// 			}
			// 		]
			// 	},
				{
					"label": "广东省",

					"id": "440000",
					"children": [
						{
							"label": "广州市",

							"id": "440100"
						},
			// 			{
			// 				"label": "韶关市",
			//
			// 				"id": "4402"
			// 			},
			// 			{
			// 				"label": "深圳市",
			//
			// 				"id": "4403"
			// 			},
			// 			{
			// 				"label": "珠海市",
			//
			// 				"id": "4404"
			// 			},
			// 			{
			// 				"label": "汕头市",
			//
			// 				"id": "4405"
			// 			},
			// 			{
			// 				"label": "佛山市",
			//
			// 				"id": "4406"
			// 			},
			// 			{
			// 				"label": "江门市",
			//
			// 				"id": "4407"
			// 			},
			// 			{
			// 				"label": "湛江市",
			//
			// 				"id": "4408"
			// 			},
			// 			{
			// 				"label": "茂名市",
			//
			// 				"id": "4409"
			// 			},
			// 			{
			// 				"label": "肇庆市",
			//
			// 				"id": "4412"
			// 			},
			// 			{
			// 				"label": "惠州市",
			//
			// 				"id": "4413"
			// 			},
			// 			{
			// 				"label": "梅州市",
			//
			// 				"id": "4414"
			// 			},
			// 			{
			// 				"label": "汕尾市",
			//
			// 				"id": "4415"
			// 			},
			// 			{
			// 				"label": "河源市",
			//
			// 				"id": "4416"
			// 			},
			// 			{
			// 				"label": "阳江市",
			//
			// 				"id": "4417"
			// 			},
			// 			{
			// 				"label": "清远市",
			//
			// 				"id": "4418"
			// 			},
			// 			{
			// 				"label": "东莞市",
			//
			// 				"id": "4419"
			// 			},
			// 			{
			// 				"label": "中山市",
			//
			// 				"id": "4420"
			// 			},
			// 			{
			// 				"label": "潮州市",
			//
			// 				"id": "4451"
			// 			},
			// 			{
			// 				"label": "揭阳市",
			//
			// 				"id": "4452"
			// 			},
			// 			{
			// 				"label": "云浮市",
			//
			// 				"id": "4453"
			// 			}
					]
				},
			// 	{
			// 		"label": "广西壮族自治区",
			//
			// 		"id": "4500",
			// 		"children": [
			// 			{
			// 				"label": "南宁市",
			//
			// 				"id": "4501"
			// 			},
			// 			{
			// 				"label": "柳州市",
			//
			// 				"id": "4502"
			// 			},
			// 			{
			// 				"label": "桂林市",
			//
			// 				"id": "4503"
			// 			},
			// 			{
			// 				"label": "梧州市",
			//
			// 				"id": "4504"
			// 			},
			// 			{
			// 				"label": "北海市",
			//
			// 				"id": "4505"
			// 			},
			// 			{
			// 				"label": "防城港市",
			//
			// 				"id": "4506"
			// 			},
			// 			{
			// 				"label": "钦州市",
			//
			// 				"id": "4507"
			// 			},
			// 			{
			// 				"label": "贵港市",
			//
			// 				"id": "4508"
			// 			},
			// 			{
			// 				"label": "玉林市",
			//
			// 				"id": "4509"
			// 			},
			// 			{
			// 				"label": "百色市",
			//
			// 				"id": "4510"
			// 			},
			// 			{
			// 				"label": "贺州市",
			//
			// 				"id": "4511"
			// 			},
			// 			{
			// 				"label": "河池市",
			//
			// 				"id": "4512"
			// 			},
			// 			{
			// 				"label": "来宾市",
			//
			// 				"id": "4513"
			// 			},
			// 			{
			// 				"label": "崇左市",
			//
			// 				"id": "4514"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "海南省",
			//
			// 		"id": "4600",
			// 		"children": [
			// 			{
			// 				"label": "海口市",
			//
			// 				"id": "4601"
			// 			},
			// 			{
			// 				"label": "三亚市",
			//
			// 				"id": "4602"
			// 			}
			// 		]
			// 	},
				{
					"label": "重庆市",

					"id": "500100",
				},
				{
					"label": "四川省",

					"id": "510000",
					"children": [
						{
							"label": "成都市",

							"id": "510100"
						},
			// 			{
			// 				"label": "自贡市",
			//
			// 				"id": "5103"
			// 			},
			// 			{
			// 				"label": "攀枝花市",
			//
			// 				"id": "5104"
			// 			},
			// 			{
			// 				"label": "泸州市",
			//
			// 				"id": "5105"
			// 			},
			// 			{
			// 				"label": "德阳市",
			//
			// 				"id": "5106"
			// 			},
			// 			{
			// 				"label": "绵阳市",
			//
			// 				"id": "5107"
			// 			},
			// 			{
			// 				"label": "广元市",
			//
			// 				"id": "5108"
			// 			},
			// 			{
			// 				"label": "遂宁市",
			//
			// 				"id": "5109"
			// 			},
			// 			{
			// 				"label": "内江市",
			//
			// 				"id": "5110"
			// 			},
			// 			{
			// 				"label": "乐山市",
			//
			// 				"id": "5111"
			// 			},
			// 			{
			// 				"label": "南充市",
			//
			// 				"id": "5113"
			// 			},
			// 			{
			// 				"label": "眉山市",
			//
			// 				"id": "5114"
			// 			},
			// 			{
			// 				"label": "宜宾市",
			//
			// 				"id": "5115"
			// 			},
			// 			{
			// 				"label": "广安市",
			//
			// 				"id": "5116"
			// 			},
			// 			{
			// 				"label": "达州市",
			//
			// 				"id": "5117"
			// 			},
			// 			{
			// 				"label": "雅安市",
			//
			// 				"id": "5118"
			// 			},
			// 			{
			// 				"label": "巴中市",
			//
			// 				"id": "5119"
			// 			},
			// 			{
			// 				"label": "资阳市",
			//
			// 				"id": "5120"
			// 			},
			// 			{
			// 				"label": "阿坝藏族羌族自治州",
			//
			// 				"id": "5132"
			// 			},
			// 			{
			// 				"label": "甘孜藏族自治州",
			//
			// 				"id": "5133"
			// 			},
			// 			{
			// 				"label": "凉山彝族自治州",
			//
			// 				"id": "5134"
			// 			}
					]
				},
			// 	{
			// 		"label": "贵州省",
			//
			// 		"id": "5200",
			// 		"children": [
			// 			{
			// 				"label": "贵阳市",
			//
			// 				"id": "5201"
			// 			},
			// 			{
			// 				"label": "六盘水市",
			//
			// 				"id": "5202"
			// 			},
			// 			{
			// 				"label": "遵义市",
			//
			// 				"id": "5203"
			// 			},
			// 			{
			// 				"label": "安顺市",
			//
			// 				"id": "5204"
			// 			},
			// 			{
			// 				"label": "铜仁地区",
			//
			// 				"id": "5222"
			// 			},
			// 			{
			// 				"label": "黔西南布依族苗族自治州",
			//
			// 				"id": "5223"
			// 			},
			// 			{
			// 				"label": "毕节地区",
			//
			// 				"id": "5224"
			// 			},
			// 			{
			// 				"label": "黔东南苗族侗族自治州",
			//
			// 				"id": "5226"
			// 			},
			// 			{
			// 				"label": "黔南布依族苗族自治州",
			//
			// 				"id": "5227"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "云南省",
			//
			// 		"id": "5300",
			// 		"children": [
			// 			{
			// 				"label": "昆明市",
			//
			// 				"id": "5301"
			// 			},
			// 			{
			// 				"label": "曲靖市",
			//
			// 				"id": "5303"
			// 			},
			// 			{
			// 				"label": "玉溪市",
			//
			// 				"id": "5304"
			// 			},
			// 			{
			// 				"label": "保山市",
			//
			// 				"id": "5305"
			// 			},
			// 			{
			// 				"label": "昭通市",
			//
			// 				"id": "5306"
			// 			},
			// 			{
			// 				"label": "丽江市",
			//
			// 				"id": "5307"
			// 			},
			// 			{
			// 				"label": "普洱市",
			//
			// 				"id": "5308"
			// 			},
			// 			{
			// 				"label": "临沧市",
			//
			// 				"id": "5309"
			// 			},
			// 			{
			// 				"label": "楚雄彝族自治州",
			//
			// 				"id": "5323"
			// 			},
			// 			{
			// 				"label": "红河哈尼族彝族自治州",
			//
			// 				"id": "5325"
			// 			},
			// 			{
			// 				"label": "文山壮族苗族自治州",
			//
			// 				"id": "5326"
			// 			},
			// 			{
			// 				"label": "西双版纳傣族自治州",
			//
			// 				"id": "5328"
			// 			},
			// 			{
			// 				"label": "大理白族自治州",
			//
			// 				"id": "5329"
			// 			},
			// 			{
			// 				"label": "德宏傣族景颇族自治州",
			//
			// 				"id": "5331"
			// 			},
			// 			{
			// 				"label": "怒江傈僳族自治州",
			//
			// 				"id": "5333"
			// 			},
			// 			{
			// 				"label": "迪庆藏族自治州",
			//
			// 				"id": "5334"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "西藏自治区",
			//
			// 		"id": "5400",
			// 		"children": [
			// 			{
			// 				"label": "拉萨市",
			//
			// 				"id": "5401"
			// 			},
			// 			{
			// 				"label": "昌都地区",
			//
			// 				"id": "5421"
			// 			},
			// 			{
			// 				"label": "山南地区",
			//
			// 				"id": "5422"
			// 			},
			// 			{
			// 				"label": "日喀则地区",
			//
			// 				"id": "5423"
			// 			},
			// 			{
			// 				"label": "那曲地区",
			//
			// 				"id": "5424"
			// 			},
			// 			{
			// 				"label": "阿里地区",
			//
			// 				"id": "5425"
			// 			},
			// 			{
			// 				"label": "林芝地区",
			//
			// 				"id": "5426"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "陕西省",
			//
			// 		"id": "6100",
			// 		"children": [
			// 			{
			// 				"label": "西安市",
			//
			// 				"id": "6101"
			// 			},
			// 			{
			// 				"label": "铜川市",
			//
			// 				"id": "6102"
			// 			},
			// 			{
			// 				"label": "宝鸡市",
			//
			// 				"id": "6103"
			// 			},
			// 			{
			// 				"label": "咸阳市",
			//
			// 				"id": "6104"
			// 			},
			// 			{
			// 				"label": "渭南市",
			//
			// 				"id": "6105"
			// 			},
			// 			{
			// 				"label": "延安市",
			//
			// 				"id": "6106"
			// 			},
			// 			{
			// 				"label": "汉中市",
			//
			// 				"id": "6107"
			// 			},
			// 			{
			// 				"label": "榆林市",
			//
			// 				"id": "6108"
			// 			},
			// 			{
			// 				"label": "安康市",
			//
			// 				"id": "6109"
			// 			},
			// 			{
			// 				"label": "商洛市",
			//
			// 				"id": "6110"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "甘肃省",
			//
			// 		"id": "6200",
			// 		"children": [
			// 			{
			// 				"label": "兰州市",
			//
			// 				"id": "6201"
			// 			},
			// 			{
			// 				"label": "嘉峪关市",
			//
			// 				"id": "6202"
			// 			},
			// 			{
			// 				"label": "金昌市",
			//
			// 				"id": "6203"
			// 			},
			// 			{
			// 				"label": "白银市",
			//
			// 				"id": "6204"
			// 			},
			// 			{
			// 				"label": "天水市",
			//
			// 				"id": "6205"
			// 			},
			// 			{
			// 				"label": "武威市",
			//
			// 				"id": "6206"
			// 			},
			// 			{
			// 				"label": "张掖市",
			//
			// 				"id": "6207"
			// 			},
			// 			{
			// 				"label": "平凉市",
			//
			// 				"id": "6208"
			// 			},
			// 			{
			// 				"label": "酒泉市",
			//
			// 				"id": "6209"
			// 			},
			// 			{
			// 				"label": "庆阳市",
			//
			// 				"id": "6210"
			// 			},
			// 			{
			// 				"label": "定西市",
			//
			// 				"id": "6211"
			// 			},
			// 			{
			// 				"label": "陇南市",
			//
			// 				"id": "6212"
			// 			},
			// 			{
			// 				"label": "临夏回族自治州",
			//
			// 				"id": "6229"
			// 			},
			// 			{
			// 				"label": "甘南藏族自治州",
			//
			// 				"id": "6230"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "青海省",
			//
			// 		"id": "6300",
			// 		"children": [
			// 			{
			// 				"label": "西宁市",
			//
			// 				"id": "6301"
			// 			},
			// 			{
			// 				"label": "海东地区",
			//
			// 				"id": "6321"
			// 			},
			// 			{
			// 				"label": "海北藏族自治州",
			//
			// 				"id": "6322"
			// 			},
			// 			{
			// 				"label": "黄南藏族自治州",
			//
			// 				"id": "6323"
			// 			},
			// 			{
			// 				"label": "海南藏族自治州",
			//
			// 				"id": "6325"
			// 			},
			// 			{
			// 				"label": "果洛藏族自治州",
			//
			// 				"id": "6326"
			// 			},
			// 			{
			// 				"label": "玉树藏族自治州",
			//
			// 				"id": "6327"
			// 			},
			// 			{
			// 				"label": "海西蒙古族藏族自治州",
			//
			// 				"id": "6328"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "宁夏回族自治区",
			//
			// 		"id": "6400",
			// 		"children": [
			// 			{
			// 				"label": "银川市",
			//
			// 				"id": "6401"
			// 			},
			// 			{
			// 				"label": "石嘴山市",
			//
			// 				"id": "6402"
			// 			},
			// 			{
			// 				"label": "吴忠市",
			//
			// 				"id": "6403"
			// 			},
			// 			{
			// 				"label": "固原市",
			//
			// 				"id": "6404"
			// 			},
			// 			{
			// 				"label": "中卫市",
			//
			// 				"id": "6405"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "新疆维吾尔自治区",
			//
			// 		"id": "6500",
			// 		"children": [
			// 			{
			// 				"label": "乌鲁木齐市",
			//
			// 				"id": "6501"
			// 			},
			// 			{
			// 				"label": "克拉玛依市",
			//
			// 				"id": "6502"
			// 			},
			// 			{
			// 				"label": "吐鲁番地区",
			//
			// 				"id": "6521"
			// 			},
			// 			{
			// 				"label": "哈密地区",
			//
			// 				"id": "6522"
			// 			},
			// 			{
			// 				"label": "昌吉回族自治州",
			//
			// 				"id": "6523"
			// 			},
			// 			{
			// 				"label": "博尔塔拉蒙古自治州",
			//
			// 				"id": "6527"
			// 			},
			// 			{
			// 				"label": "巴音郭楞蒙古自治州",
			//
			// 				"id": "6528"
			// 			},
			// 			{
			// 				"label": "阿克苏地区",
			//
			// 				"id": "6529"
			// 			},
			// 			{
			// 				"label": "克孜勒苏柯尔克孜自治州",
			//
			// 				"id": "6530"
			// 			},
			// 			{
			// 				"label": "喀什地区",
			//
			// 				"id": "6531"
			// 			},
			// 			{
			// 				"label": "和田地区",
			//
			// 				"id": "6532"
			// 			},
			// 			{
			// 				"label": "伊犁哈萨克自治州",
			//
			// 				"id": "6540"
			// 			},
			// 			{
			// 				"label": "塔城地区",
			//
			// 				"id": "6542"
			// 			},
			// 			{
			// 				"label": "阿勒泰地区",
			//
			// 				"id": "6543"
			// 			}
			// 		]
			// 	},
			// 	{
			// 		"label": "台湾省",
			//
			// 		"id": "7100",
			// 	},
			// 	{
			// 		"label": "香港特别行政区",
			// 		"id": "8100",
			// 	},
			// 	{
			// 		"label": "澳门特别行政区",
			//
			// 		"id": "8200",
			// 	}
			]
		}
	},
}

export default mixin;
