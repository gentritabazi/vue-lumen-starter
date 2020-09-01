export default {
    name: 'Navbar-Component',
    props: ['activeMenu'],
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        logout: function() {
            this.$store.commit('LOGOUT_USER')
            this.$router.push({ name: 'login' })
        },
    }
}