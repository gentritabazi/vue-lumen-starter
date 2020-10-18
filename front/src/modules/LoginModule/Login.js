import httpAxios from '@/httpAxios.js'

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
			const self = this

			// Clear Errors
            Object.keys(this.errors).forEach(function(key) {
                self.errors[key] = false
            });
			
			// Ajax Request
			httpAxios({
                url: this.$backendUrl + '/login',
                method: 'POST',
                data: self.loginData
            }).then(response => {
				self.$store.commit('LOGGED_USER', response.data)
				
				self.$router.push({ name: 'adminDashboard' })
			})
			.catch(error => {
				try {
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
			})
        }
	},
}