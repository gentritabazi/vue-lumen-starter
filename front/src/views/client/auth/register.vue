<template>
	<authLayout>
		<div class="w-full flex flex-wrap">
			<div class="w-full md:w-1/2 flex flex-col">
				<div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
					<a href="#" class="bg-black text-white font-bold text-xl p-4">Logo</a>
				</div>

				<div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
					<p class="text-center text-3xl">{{ $t('register.title') }}.</p>
					<form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
						<div class="flex flex-col pt-4">
							<label for="name" class="text-lg">{{ $t('fields.first_name') }}</label>
							<input type="text" id="name" v-model="registerData.first_name"
							:class="{ 'border-pink-400': errors.first_name }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
						</div>

						<div class="flex flex-col pt-4">
							<label for="name" class="text-lg">{{ $t('fields.last_name') }}</label>
							<input type="text" id="name" v-model="registerData.last_name"
							:class="{ 'border-pink-400': errors.last_name }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
						</div>

						<div class="flex flex-col pt-4">
							<label for="email" class="text-lg">{{ $t('fields.email') }}</label>
							<input type="email" id="email" v-model="registerData.email"
							:class="{ 'border-pink-400': errors.email }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
						</div>

						<div class="flex flex-col pt-4">
							<label for="password" class="text-lg">{{ $t('fields.password') }}</label>
							<input type="password" id="password" v-model="registerData.password"
							:class="{ 'border-pink-400': errors.password }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
						</div>

						<input type="submit" value="Register" v-on:click.prevent="register()" class="cursor-pointer bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
					</form>

					<div class="text-center pt-12 pb-12">
						<p>{{ $t('register.login_info') }} <router-link class="underline font-semibold" :to="{ name: 'login' }">{{ $t('login.title') }}</router-link>.</p>
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
</script>