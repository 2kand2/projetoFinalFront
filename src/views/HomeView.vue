<script setup>
import { useAuthStore } from '@/stores';
import { onMounted } from 'vue';

const auth = useAuthStore();
onMounted(()=>{
    auth.updateRefreshToken();

})
</script>

<template>
</template>
<style>
</style>