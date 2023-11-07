<template>
    
    <v-navigation-drawer
            expand-on-hover
            rail
        >        

            <v-list>
            <v-list-item
                :prepend-avatar="avatar"
                :title="user === null ? '登录': user.name"
                :subtitle="user === null ? '' : user.words"
                
                @click="user===null ? showLogin() : null"
                @keydown.esc="closeLogin"
            ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list v-if="user != null" density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="我的帖子" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="我的好友" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="我的收藏" value="starred"></v-list-item>
            </v-list>

            <template v-slot:append v-if="user != null">
                <div class="pa-2" align="center">
                    <v-btn icon="" color="red">
                        <v-icon>mdi-logout-variant</v-icon></v-btn>
                </div>
                <div></div>
            </template>
        </v-navigation-drawer>

</template>

<script>

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiLogoutVariant } from '@mdi/js';
import bus from 'vue3-eventbus';

export default {
    components: {
        SvgIcon,
    },
    
    data() {
        return {
            path: mdiLogoutVariant,
            // user: {
            //     name: "Yao",
            //     words: "Hi",
            //     avatar: null,
            // },
            user: null
        }
    },

    methods: {
        showLogin() {
            bus.emit('showLogin');
        },
        closeLogin() {
            bus.emit('closeLogin');
        }
    },


}
</script>
