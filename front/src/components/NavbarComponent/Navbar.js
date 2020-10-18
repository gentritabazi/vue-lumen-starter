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
            this.$store.dispatch('logOut')
			this.$router.push({ name: 'login' })
        },
    }
}