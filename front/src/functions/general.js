export default {
    data() {
        return {
            authUserName: localStorage.getItem('user_name')
        }
    },
    methods: {
        // Get image url
        getImg: function(imgName) {
            try {
                return require('@/assets/images/' + imgName) 
            } catch(error) {
                return
            }
        }
    },
}