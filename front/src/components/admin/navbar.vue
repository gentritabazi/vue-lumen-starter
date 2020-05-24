<template>
    <nav class="navbar navbar-expand-lg main-navbar">
        <form class="form-inline mr-auto">
            <ul class="navbar-nav mr-3">
                <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg" @click="toggleMiniSidebar"><i class="fas fa-bars"></i></a></li>
                <li><a href="#" data-toggle="search" class="nav-link nav-link-lg d-sm-none"><i class="fas fa-search"></i></a></li>
            </ul>        
        </form>
        <ul class="navbar-nav navbar-right">
            <li class="dropdown"><a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
                <div class="d-sm-none d-lg-inline-block">{{ authUser.first_name + ' ' + authUser.last_name }}</div></a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="#" class="dropdown-item has-icon">
                        <i class="far fa-user"></i> Profile
                    </a>
                    <a href="#" class="dropdown-item has-icon">
                        <i class="fas fa-cog"></i> Settings
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item has-icon text-danger" v-on:click="toggleLogoutModal()">
                        <i class="fas fa-sign-out-alt"></i> {{ $t('logout.title') }}
                    </a>
                </div>
            </li>
        </ul>

        <div class="modal" v-if="showLogoutModal == true">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ $t('logout.title') }}</h5>
                        <button type="button" class="close" v-on:click="toggleLogoutModal()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">{{ $t('logout.info') }}</div>
                    <div class="modal-footer bg-whitesmoke">
                        <button type="button" class="btn btn-secondary text-uppercase" v-on:click="toggleLogoutModal()">{{ $t('cancel') }}</button>
                        <button type="button" class="btn btn-primary text-uppercase" v-on:click="logout()">{{ $t('ok') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['activeMenu'],
    data() {
        return {
            showLogoutModal: false,
            authUser: this.$store.state.user
        }
    },
    methods: {
        toggleLogoutModal: function() {
            this.showLogoutModal = !this.showLogoutModal
        },
        logout: function() {
            this.$store.commit('LOGOUT_USER')
            this.$router.push({ name: 'login' })
        },
        toggleMiniSidebar: function() {
            this.toggleClass('body', 'sidebar-mini')
        }
    }
}
</script>