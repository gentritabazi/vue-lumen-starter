<template>
    <div class="bg-gray-100 font-family-karla flex">
        <sidebar-component v-bind:activeMenu="activeMenu"/>

        <div class="w-full flex flex-col h-screen overflow-y-hidden">
            <navbar-component/>
            <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">
                <main class="w-full flex-grow p-6">
                    <slot></slot>
                </main>
                <footer class="w-full bg-white text-right p-4">{{ $t('general.copyright') }}  © {{ new Date().getFullYear() }}.</footer>
            </div>
        </div>
    </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.min.css'
import sidebarComponent from '@/components/SidebarComponent'
import navbarComponent from '@/components/NavbarComponent'

export default {
    name: 'Admin-Layout',
    props: ['activeMenu'],
    components: {
        sidebarComponent,
        navbarComponent,
    }
}
</script>