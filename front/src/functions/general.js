export default {
    methods: {
        // Get image url
        getImg: function(imgName) {
            try {
                return require('@/assets/images/' + imgName) 
            } catch(error) {
                return
            }
        },
    },
}