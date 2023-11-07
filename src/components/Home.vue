<template>
    <v-card @keydown.esc="closeLogin">

        <TopNav></TopNav>
        
        <LeftNav></LeftNav>

        <RightInfo></RightInfo>

        <v-parallax src="../assets/cover.png" scale="0.25">
            <v-card :style="{opacity: 0.0 }" min-height="100"></v-card>
            <Login></Login>
            <PrettyPost :style="{opacity: 0.8 }"></PrettyPost>
        </v-parallax>

    </v-card>
</template>
  

<script>
import PrettyPost from './PrettyPost.vue';
import TopNav from './TopNav.vue';
import RightInfo from './RightInfo.vue';
import LeftNav from './LeftNav.vue';
import Login from './Login.vue';
import bus from 'vue3-eventbus';

// import {getAllData} from '@/api/request'

export default {
    components: {
        PrettyPost,
        TopNav,
        RightInfo,
        LeftNav,
        Login
    },

    data: () => ({
        drawer: true,
    }),

    methods: {
      closeLogin() {
        bus.emit('closeLogin');
      }
    },
}
</script>

