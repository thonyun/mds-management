import util from './../libs/util.js';

var mixin = {
    data () {
        return {
            show: true
        };
    },
    methods: {
        export (val) {
            let url = util.ajax.defaults.baseURL + val + '?' + '&TOKEN=' + util.getToken();
            this.$lodash.forOwn(this.filters, (v, k) => {
                if (k != 'page' && k != 'pageSize' && k != 'pageNo') {
                    url += '&' + k + '=' + v;
                }
            });
            window.location.href = url;
        },
        toggle (val) {
            this.show = val !== 1;
        },
        filterWith (...val) {
            const query = Object.assign({}, ...val);
            this.cleanupQueryObject(query);
            this.$router.push({
                name: this.routeName,
                query: query
            });
        },
        convertQueryObjectPropertiesInt (obj, properties) {
            this.$lodash.forOwn(obj, (v, k) => {
                if (this.$lodash.indexOf(properties, k) > -1) {
                    if (v !== '' && v !== undefined) {
                        obj[k] = parseInt(v, 10);
                    }
                }
            });
            return obj;
        },
        cleanupQueryObject (val) {
            this.$lodash.forOwn(val, (v, k) => {
                if (v === '' || k === undefined || k == []) {
                    delete val[k];
                }
            });
        },
        cleanParamsObject (val) {
            this.$lodash.forOwn(val, (v, k) => {
                if (v === '' || k === 'random' || k === undefined || k == [] || k === 'isCheck' || v == null) {
                    delete val[k];
                }
            });
        }
    }
};

export default mixin;
