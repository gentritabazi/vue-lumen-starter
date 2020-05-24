<template>
    <aside class="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div class="p-6 text-center">
            <a href="#" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
            <button class="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center">
                <i class="fas fa-plus mr-3"></i> New 
            </button>
        </div>
        <nav class="text-white text-base font-semibold pt-3">
            <router-link :to="{ name: 'adminDashboard' }" :class="{ 'active-nav-link': activeMenu == 'adminDashboard' }" class="flex items-center text-white py-4 pl-6 nav-item">
                <i class="fas fa-tachometer-alt mr-3"></i>
                {{ $t('navbar.dashboard') }}
            </router-link>
            <a href="#" class="flex items-center text-white py-4 pl-6 nav-item">
                <i class="fas fa-sticky-note mr-3"></i>
                {{ $t('navbar.other_menu') }}
            </a>
            <a href="#" class="flex items-center text-white  hover:opacity-100 py-4 pl-6 nav-item">
                <i class="fas fa-table mr-3"></i>
                {{ $t('navbar.other_menu') }}
            </a>
            <a href="#" class="flex items-center text-white py-4 pl-6 nav-item">
                <i class="fas fa-align-left mr-3"></i>
                {{ $t('navbar.other_menu') }}
            </a>
            <a href="#" class="flex items-center text-white py-4 pl-6 nav-item">
                <i class="fas fa-tablet-alt mr-3"></i>
                {{ $t('navbar.other_menu') }}
            </a>
            <a href="#" class="flex items-center text-white py-4 pl-6 nav-item">
                <i class="fas fa-calendar mr-3"></i>
                {{ $t('navbar.other_menu') }}
            </a>
        </nav>
        <a href="#" class="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4">
            <i class="fas fa-sign-out-alt mr-3"></i> {{ $t('logout.title') }}
        </a>
    </aside>
</template>

<script>
export default {
    props: ['activeMenu'],
}
</script>