<template>
    <div>
        <!-- Desktop Nav -->
        <header class="w-full flex items-center bg-white py-2 px-6 hidden sm:flex">
            <div class="w-1/2"></div>
            <div class="relative w-1/2 flex justify-end">
                <button @click="isOpen = !isOpen" class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png">
                </button>
                <button @click="isOpen = false" class="h-full w-full fixed inset-0 cursor-default" style="display: none;"></button>
                <div v-show="isOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16" style="display: none;">
                    <a href="#" class="block px-4 py-2 account-link hover:text-white">{{ $t('navbar.other_menu') }}</a>
                    <a href="#" class="block px-4 py-2 account-link hover:text-white">{{ $t('navbar.other_menu') }}</a>
                    <a href="#" class="block px-4 py-2 account-link hover:text-white" @click="logout">{{ $t('logout.title') }}</a>
                </div>
            </div>
        </header>

        <!-- Mobile Header & Nav -->
        <header class="w-full bg-sidebar py-5 px-6 sm:hidden">
            <div class="flex items-center justify-between">
                <a href="index.html" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
                <button @click="isOpen = !isOpen" class="text-white text-3xl focus:outline-none">
                    <i v-if="!isOpen" class="fas fa-bars"></i>
                    <i v-if="isOpen" class="fas fa-times"></i>
                </button>
            </div>

            <!-- Dropdown Nav -->
            <nav :class="isOpen ? 'flex': 'hidden'" class="flex flex-col pt-4">
                <a href="index.html" class="flex items-center text-white py-2 pl-4 nav-item">
                    <i class="fas fa-tachometer-alt mr-3"></i>
                    {{ $t('navbar.dashboard') }}
                </a>
                <a href="blank.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-sticky-note mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <a href="tables.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-table mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <a href="forms.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-align-left mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <a href="tabs.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-tablet-alt mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <a href="calendar.html" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-calendar mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <a href="#" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-cogs mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <a href="#" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                    <i class="fas fa-user mr-3"></i>
                    {{ $t('navbar.other_menu') }}
                </a>
                <button class="w-full bg-white cta-btn font-semibold py-2 mt-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                    <i class="fas fa-sign-out-alt mr-3"></i> {{ $t('logout.title') }}
                </button>
            </nav>
        </header>
</div>
</template>

<script>
export default {
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
</script>