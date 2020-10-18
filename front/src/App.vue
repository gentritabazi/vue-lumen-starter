<template>
    <div id="app">
        <loader-component v-if="displayLoader"/>

        <notifications group="notify" class="notify"/>

        <router-view/>
    </div>
</template>

<script>
import loaderComponent from '@/components/LoaderComponent'
import { mapGetters } from 'vuex'

export default {
    name: 'App',
    components: {
        loaderComponent
    },
    computed: {
        ...mapGetters({
            displayLoader: 'getDisplayLoader'
        })
    },
    metaInfo () {
        return {
            title: this.$appName,
            titleTemplate: `%s - ` + this.$appName
        }
    },
}
</script>