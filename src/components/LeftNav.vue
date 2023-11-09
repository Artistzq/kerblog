<template>
    
    <v-navigation-drawer
            expand-on-hover
            rail
        >        

            <v-list>
            <v-list-item
                :prepend-avatar="avatar"
                :title="loginAlready ? user.username: '登录'"
                :subtitle="loginAlready ? user.words : ''"
                
                @click="! loginAlready ? showLogin() : null"
                @keydown.esc="closeLogin"
            ></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list v-if="loginAlready" density="compact" nav>
            <v-list-item prepend-icon="mdi-folder" title="我的帖子" value="myfiles"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="我的好友" value="shared"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="我的收藏" value="starred"></v-list-item>
            </v-list>

            <template v-slot:append v-if="loginAlready">
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

    set() {
        bus.on('updateUserInfo', this.updateUserInfo);
    },
    
    data() {
        return {
            path: mdiLogoutVariant,
        }
    },

    computed: {
        user () {
            return {
                username: this.$store.state.userInfo.username,
                avatar: this.$store.state.userInfo.avatar,
            }
        },

        loginAlready: {
            get() {
                return this.$store.state.userInfo.userId != -1;
            },
            set (value) {
                this.$store.commit("LOGIN", value)
            }
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
