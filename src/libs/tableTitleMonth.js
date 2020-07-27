import moment from 'moment';
export function tableTitleMonthDeal (arr) {
    const title = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '8月', '10月', '11月', '12月'];
    const key = ['month01', 'month02', 'month03', 'month04', 'month05', 'month06', 'month07', 'month08', 'month09', 'month10', 'month11', 'month12'];
    const startTime = ['01-01 00:00:00', '02-01 00:00:00', '03-01 00:00:00', '04-01 00:00:00',
        '05-01 00:00:00', '06-01 00:00:00', '07-01 00:00:00', '08-01 00:00:00', '09-01 00:00:00',
        '10-01 00:00:00', '11-01 00:00:00', '12-01 00:00:00'
    ];
    const endTime = ['02-01 00:00:00', '03-01 00:00:00', '04-01 00:00:00',
        '05-01 00:00:00', '06-01 00:00:00', '07-01 00:00:00', '08-01 00:00:00', '09-01 00:00:00',
        '10-01 00:00:00', '11-01 00:00:00', '12-01 00:00:00', '12-31 23:59:59'
    ];

    const date = parseInt(moment(new Date()).format('M'));

    for (let i = 0; i < date; i++) {
        if (i < 6) {
            var item = tableTitleForMat(title[i], key[i], startTime[i], endTime[i], '');
            arr.push(item);
        } else {
            var item = tableTitleForMat(title[i], key[i], startTime[i], endTime[i], 'right');
            arr.push(item);
        }
    }
    console.log(arr);
    return arr;
}

function tableTitleForMat (title, key, startTime, endTime, fiexd) {
    const tmp = {
        title: title,
        align: 'center',
        fixed: fiexd,
        key: key,
        render: (h, params) => {
            return format(h, params, {
                startTime: startTime,
                endTime: endTime
            });
        }
    };
    return tmp;
}

function format (h, params, data) {
    return h('div', {
        style: {
            color: '#2d8cf0',
            cursor: 'pointer'
        },
        on: {
            click: () => {
                // this.modal.isShow = true
                var _year = new Date().getFullYear();
                data.startTime = _year + '-' + data.startTime;
                data.endTime = _year + '-' + data.endTime;
                data.id = params.row.id;
                session.setMMTData('telphone-consultation', data);
                this.$router.push({
                    path: 'telphone-consultation'
                });
            }
        }
    }, params.row[params.column.key]);
}
