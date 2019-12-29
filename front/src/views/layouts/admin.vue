<template>
    <div class="main-wrapper">
        <div class="navbar-bg"></div>
        
        <navbar/>

        <sidebar v-bind:activeMenu="activeMenu"/>

        <div class="main-content" style="min-height: 799px;">
            <section class="section">
                <slot></slot>
            </section>
        </div>


        <footer class="main-footer">
            <div class="text-center">{{ $t('copyright') }}  © {{ new Date().getFullYear() }}</div>
        </footer>
    </div>
</template>

<script>
// Css
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'srcFolder/assets/css/admin/index.css'
import 'srcFolder/assets/css/admin/custom.css'
import 'srcFolder/assets/css/fontawesome-5-9-0/css/index.css'

// Components
import sidebar from 'srcFolder/components/admin/sidebar'
import navbar from 'srcFolder/components/admin/navbar'

export default {
    props: ['activeMenu'],
    components: {
        'sidebar': sidebar,
        'navbar': navbar,
    }
}
</script>