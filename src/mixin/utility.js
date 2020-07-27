var mixin = {
    methods: {
        checkPositiveNumber (val, min, max) {
            if (!Number.isInteger(parseFloat(val))) {
                return false;
            }
            if (!this.isEmpty(min) && val < min) {
                return false;
            }
            if (!this.isEmpty(max) && val > max) {
                return false;
            }
            return true;
        },
        isEmpty (val) {
            if (val == null || val === '') {
                return true;
            }
            return false;
        },
        checkIdCard (val) {
            const regex = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            return regex.test(val);
        }
    }
};

export default mixin;
