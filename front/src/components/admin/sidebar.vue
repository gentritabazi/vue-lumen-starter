<template>
    <div class="main-sidebar" tabindex="1" style="overflow: hidden; outline: none;">
        <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
                <router-link :to="{ name: 'adminDashboard' }">{{ $appName }}</router-link>
            </div>
            <div class="sidebar-brand sidebar-brand-sm">
                <router-link :to="{ name: 'adminDashboard' }">{{ $appName }}</router-link>
            </div>
            <ul class="sidebar-menu">
                <li :class="{ 'active' : activeMenu == '' }"><router-link class="nav-link" :to="{ name: 'adminDashboard' }"><i class="far fa-square"></i> <span>Dashboard</span></router-link></li>
                <li :class="{ 'active' : activeMenu == 'adminCredits' }"><router-link class="nav-link" :to="{ name: 'adminCredits' }"><i class="fas fa-pencil-ruler"></i> <span>Credits</span></router-link></li>
            </ul>           
        </aside>
    </div>
</template>

<script>
export default {
    props: ['activeMenu'],
}
</script>