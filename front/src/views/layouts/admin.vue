<template>
    <div class="bg-gray-100 font-family-karla flex">
        <sidebar v-bind:activeMenu="activeMenu"/>


        <div class="w-full flex flex-col h-screen overflow-y-hidden">
            <navbar/>
            <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">
                <main class="w-full flex-grow p-6">
                    <slot></slot>
                </main>
                <footer class="w-full bg-white text-right p-4">{{ $t('copyright') }}  © {{ new Date().getFullYear() }}.</footer>
            </div>
        </div>
    </div>
</template>

<script>
// Css
import '@fortawesome/fontawesome-free/css/all.min.css'

// Components
import sidebar from 'srcFolder/components/admin/sidebar'
import navbar from 'srcFolder/components/admin/navbar'

export default {
    props: ['activeMenu'],
    components: {
        'sidebar': sidebar,
        'navbar': navbar,
    }
}
</script>