<template>
	<adminLayout v-bind:activeMenu="'adminCredits'">
		<div class="section-header">
			<h1>{{ $t('credits.title') }}</h1>
		</div>
        <h2 class="section-title">{{ $t('credits.thanks_title') }}</h2>
        <p class="section-lead">{{ $t('credits.thanks_info') }}</p>
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h4>{{ $t('credits.title') }}</h4>
                    </div>
                    <div class="card-body">
                        <div class="list-unstyled list-unstyled-border mt-4">
                            <div class="media" v-for="(item, i) in results" v-bind:key="i">
                                <div class="media-icon"><i class="far fa-circle"></i></div>
                                <div class="media-body">
                                    <h6><a :href="item.link" target="_blank">{{ item.name }}</a></h6>
                                    <p>{{ $t(String('by')) }} {{ item.author }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</adminLayout>
</template>

<script>
export default {
    data() {
        return {
            results: [
                {
                    name: "Admin Template",
                    link: "https://github.com/stisla/stisla",
                    author: "Muhamad Nauval Azhar"
                },
                {
                    name: "Login Page",
                    link: "https://github.com/nauvalazhar/bootstrap-4-login-page",
                    author: "Muhamad Nauval Azhar"
                },
                {
                    name: "VueJs Notice",
                    link: "https://github.com/tahq69/vue-notice",
                    author: "Igors Krasjukovs"
                }
            ]
        }
    }
}
</script>