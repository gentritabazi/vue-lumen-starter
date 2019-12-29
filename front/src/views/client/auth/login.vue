<template>
	<authLayout>
		<h4 class="card-title">{{ $t('login.title') }}</h4>
		<form class="my-login-validation">
			<div class="form-group">
				<label>{{ $t('email') }}</label>
				<input type="email" class="form-control" v-model="loginData.email" v-bind:class="{ 'border border-danger': errors.email }" autocomplete="on">
			</div>

			<div class="form-group">
				<label>{{ $t('password') }}
					<router-link :to="{ name: 'forgotPassword' }" class="float-right">{{ $t('forgot_password') }} ?</router-link>
				</label>
				<input type="password" class="form-control" v-model="loginData.password" v-bind:class="{ 'border border-danger': errors.password }">
			</div>
			
			<div class="form-group m-0">
				<button type="submit" class="btn btn-primary btn-block" v-on:click.prevent="login()">{{ $t('login.title') }}</button>
			</div>

			<div class="mt-4 text-center">{{ $t('login.create_acc_info') }} <router-link :to="{ name: 'register' }">{{ $t('create_one') }}</router-link></div>
		</form>
	</authLayout>
</template>

<script>
export default {
	metaInfo: function() {
		return {
			title: this.$t('login.title'),
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
				// Save token
				localStorage.setItem('user_id', response.data.user_id)
				localStorage.setItem('user_name', response.data.user_name)
				localStorage.setItem('token', response.data.token)
				self.$store.commit('LOGIN_USER')

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
								errors += self.$t(String(error.response.data.errors[errorKey][i])) + '<br>'
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
			})
        }
	},
}
</script>