import httpAxios from '@/httpAxios.js'

export default {
    name: 'Register-Module',
	metaInfo: function() {
		return {
			title: this.$t('auth.register'),
		}
	},
	data() {
        return {
            registerData: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
            },
            errors: {
				first_name: false,
				last_name: false,
				email: false,
				password: false,
			}
        }
    },
    methods: {
        // Store a new user
        register: function() {
            const self = this

            // Clear Errors
            Object.keys(self.errors).forEach(function(key) {
                self.errors[key] = false
            })
            
            // Ajax Request
            httpAxios({
                url: this.$backendUrl + '/register',
                method: 'POST',
                data: self.registerData
            })
			.then(response => {
				Object.keys(self.registerData).forEach(function(key) {
                    self.registerData[key] = ''
                })

                self.$notify({
                    group: 'notify',
                    type: 'success',
                    title: self.$t('general.success'),
                    text: 'The process was successfully completed'
                })
                
                setTimeout(() => self.$router.push({ name: 'login' }), 3000)

                console.log(response)
            })
            .catch(error => {
                try {
                    console.log(error)
					if(error.response.status == 422) {
						for(var errorKey in error.response.data.errors) {
							if(errorKey in self.errors) {
                                self.errors[errorKey] = true
                            }
						}
					}
				} catch(e) {
					console.log(e)
				}
            });
        }
	},
}