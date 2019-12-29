<template>
	<adminLayout v-bind:activeMenu="''">
		<div class="section-header">
			<h1>Dashboard</h1>
			<div class="section-header-breadcrumb">			
				<div class="breadcrumb-item" v-for="lang in languages" v-bind:key="lang">
					<div class="text-uppercase" v-if="lang == currentLang">{{ lang }}</div>
					<a v-else href="#" class="text-uppercase" v-on:click="changeLang(lang)">{{ lang }}</a>
				</div>
            </div>
		</div>
	</adminLayout>
</template>

<script>
export default {
	data() {
		return {
			languages: ['en', 'sq'],
			currentLang: this.$i18n.locale,
		}
	},
	methods: {
		changeLang: function(lang) {
			this.$i18n.locale = lang
			this.currentLang = lang
		}
	}
}
</script>