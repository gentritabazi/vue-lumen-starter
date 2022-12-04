<template src="./Navbar.html"></template>
<script>
import { useStore } from '@/store';

export default {
  name: 'NavbarComponent',

  props: ['activeMenu'],

  setup() {
    return {
      store: useStore(),
    };
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    logout() {
      this.store.logOut();
      //this.$router.push({ name: 'login' });
    },
  },
};
</script>
