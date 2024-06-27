<script setup></script>
<template>
    <v-app>
        <slot name="header"></slot>
        <slot name="drawer"></slot>
        <v-main>
            <slot></slot>
        </v-main>
    </v-app>
</template>
