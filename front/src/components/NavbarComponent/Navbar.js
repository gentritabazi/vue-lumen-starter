export default {
  name: 'NavbarComponent',

  props: ['activeMenu'],

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    logout() {
      this.$store.dispatch('logOut');
      this.$router.push({ name: 'login' });
    },
  },
};
