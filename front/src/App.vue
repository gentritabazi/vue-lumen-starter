<template>
  <div id="app">
    <loader-component v-if="store.getDisplayLoader" />

    <Notifications group="notify" class="notify" />

    <router-view />
  </div>
</template>

<script>
import loaderComponent from '@/components/LoaderComponent';
import { useStore } from '@/store';

export default {
  name: 'App',

  setup() {
    return {
      store: useStore(),
    };
  },

  metaInfo() {
    return {
      title: this.$appName,
      titleTemplate: `%s - ` + this.$appName,
    };
  },

  components: {
    loaderComponent,
  },
};
</script>
