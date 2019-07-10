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
            var self = this

            // Clear Errors
            Object.keys(self.errors).forEach(function(key) {
                self.errors[key] = false
            })
            
            // Ajax Request
			this.$http.post(this.$backendUrl + 'register', self.registerData)
			.then(function(response) {
				Object.keys(self.registerData).forEach(function(key) {
                    self.registerData[key] = ''
                })

                self.$notice['success']({
					title: self.$t('success'),
					description: self.$t(String(response.data.message))
                })

                setTimeout(() => self.$router.push({ name: 'login' }), 3000)
            })
            .catch(function(error) {
                var errors = error

                try {
                    if(error.response.status == 422) {
                        errors = '';
						for(var errorKey in error.response.data.errors) {
                            if(errorKey in self.errors) {
                                self.errors[errorKey] = true
                            }

							for(var i = 0; i < error.response.data.errors[errorKey].length; i++) {
								errors += (String(error.response.data.errors[errorKey][i])) + '<br>'
							}
						}
                    }

                    if(error.response.status == 500) {
                        errors = error.response.data.message
                    }
                } catch(e) {
					console.log(e)
				}

				self.$notice['error']({
					title: self.$t('error'),
					description: String(errors)
				})
            });
        }
	},
}