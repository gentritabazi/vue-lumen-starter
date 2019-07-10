export default {
    name: 'Login-Module',
	metaInfo: function() {
		return {
			title: this.$t('auth.login'),
		}
	},
	data() {
		return {
			loginData: {
				email: '',
				password: '',
			},
			errors: {
				email: false,
				password: false,
			}
		}
	},
    methods: {
        login: function() {
			var self = this

			// Clear Errors
            Object.keys(this.errors).forEach(function(key) {
                self.errors[key] = false
            });
			
			// Ajax Request
			this.$http.post(this.$backendUrl + 'login', self.loginData)
			.then(function(response) {
				// Save data
				self.$store.commit('LOGIN_USER', response)

				// Redirect				
				self.$router.push({ name: 'adminDashboard' })
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
					title: self.$t('general.error'),
					description: String(errors)
				})
			})
        }
	},
}