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
        },

        // Toggle class,
        toggleClass: function(elementId, className) {
            if(elementId != 'body') {
                if(document.getElementById(elementId) == null) {
                    console.log('Element does not exist!')
                    return
                }
            }

            var el = document.getElementById(elementId)
            if(elementId == 'body') {
                el = document.body
            }

            if(el.classList.contains(className)) {
                el.classList.remove(className)
            } else {
                el.classList.add(className)
            }
        },
    },
}