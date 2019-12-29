<template>
	<authLayout>
		<h4 class="card-title">{{ $t('forgot_password') }}</h4>
		<form class="my-login-validation">
			<div class="form-group">
				<label for="email">{{ $t('email') }}</label>
				<input id="email" type="email" class="form-control" name="email" autofocus>
				<div class="form-text text-muted">{{ $t('reset_password_info') }}</div>
			</div>

			<div class="form-group m-0">
				<button type="submit" class="btn btn-primary btn-block">{{ $t('reset_password') }}</button>
			</div>
		</form>
	</authLayout>
</template>

<script>
export default {
	metaInfo: function() {
		return {
			title: this.$t('forgot_password'),
		}
	},
}
</script>