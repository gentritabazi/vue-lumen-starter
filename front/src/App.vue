<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    metaInfo () {
        return {
            title: this.$appName,
            titleTemplate: `%s - ` + this.$appName
        }
    },
}
</script>