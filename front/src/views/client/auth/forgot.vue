<template>
	<authLayout>
		<h4 class="card-title">{{ $t('forgot_password.title') }}</h4>
		<form class="my-login-validation">
			<div class="form-group">
				<label for="email">{{ $t('fields.email') }}</label>
				<input id="email" type="email" class="form-control" name="email" autofocus>
				<div class="form-text text-muted">{{ $t('forgot_password.reset_password_info') }}</div>
			</div>

			<div class="form-group m-0">
				<button type="submit" class="btn btn-primary btn-block">{{ $t('forgot_password.reset_password') }}</button>
			</div>
		</form>
	</authLayout>
</template>

<script>
export default {
	metaInfo: function() {
		return {
			title: this.$t('forgot_password.title'),
		}
	},
}
</script>