<template>
    <div class="my-login-page">
        <section class="h-100">
            <div class="container h-100">
                <div class="row justify-content-md-center h-100">
                    <div class="card-wrapper">
                        <div class="brand">
                            <img v-bind:src="getImg('logo.png')" alt="COMPANY LOGO">
                        </div>

                        <div class="card fat">
                            <div class="card-body">
                                <slot></slot>
                            </div>
                        </div>

                        <div class="footer">{{ $t('copyright') }} &copy; {{ currentYear }} &mdash; {{ $appName }}</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'srcFolder/assets/css/auth/index.css'

var d = new Date();
export default {
    props: { currentYear: { default: d.getFullYear() } },
    
}
</script>