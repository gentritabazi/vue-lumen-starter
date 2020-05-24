<template>
	<authLayout>
		<div class="w-full flex flex-wrap">
            <div class="w-full md:w-1/2 flex flex-col">
				<div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
					<a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
				</div>

                <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p class="text-center text-3xl">{{ $t('login.title') }}.</p>
                    <form class="flex flex-col pt-3 md:pt-8" action="#" method="POST">

                        <div class="flex flex-col pt-4">
                            <label for="email" class="text-lg">{{ $t('fields.email') }}</label>
                            <input type="text" v-model="loginData.email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" :class="{ 'border-pink-400': errors.email }">
                        </div>

                        <div class="flex flex-col pt-4">
                            <label for="password" class="text-lg">{{ $t('fields.password') }}</label>
                            <input type="password" v-model="loginData.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" :class="{ 'border-pink-400': errors.password }">
                        </div>
        
                        <input v-on:click.prevent="login()" type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 cursor-pointer">
                    </form>

					<div class="text-center pt-12 pb-12">
						<p>{{ $t('login.create_acc_info') }} <router-link :to="{ name: 'register' }" class="underline font-semibold">{{ $t('create_one') }}</router-link>.</p>
					</div>
                </div>
            </div>

            <div class="w-1/2 shadow-2xl">
                <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0">
            </div>
        </div>
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
					title: self.$t('error'),
					description: String(errors)
				})
			})
        }
	},
}
</script>