<template>
	<authLayout>
		<h4 class="card-title">{{ $t('register.title') }}</h4>
		<form class="my-login-validation">
			<div class="form-group">
				<label>{{ $t('first_name') }}</label>
				<input type="text" class="form-control" v-model="registerData.first_name" v-bind:class="{ 'border border-danger': errors.first_name }">
			</div>

			<div class="form-group">
				<label>{{ $t('last_name') }}</label>
				<input type="text" class="form-control" v-model="registerData.last_name" v-bind:class="{ 'border border-danger': errors.last_name }">
			</div>

			<div class="form-group">
				<label>{{ $t('email') }}</label>
				<input type="email" class="form-control" v-model="registerData.email" v-bind:class="{ 'border border-danger': errors.email }">
			</div>

			<div class="form-group">
				<label>{{ $t('password') }}</label>
				<input type="password" class="form-control" v-model="registerData.password" v-bind:class="{ 'border border-danger': errors.password }">
			</div>

			<div class="form-group m-0">
				<button type="submit" class="btn btn-primary btn-block" v-on:click.prevent="register()">{{ $t('register.title') }}</button>
			</div>

            <div class="mt-4 text-center">{{ $t('register.login_info') }} <router-link :to="{ name: 'login' }">{{ $t('login.title') }}</router-link></div>
		</form>
	</authLayout>
</template>

<script>
export default {
	metaInfo: function() {
		return {
			title: this.$t('register.title'),
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
            });
        }
	},
}
</script>