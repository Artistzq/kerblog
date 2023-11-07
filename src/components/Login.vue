<template>
  <v-card max-width="1080" location="top">
      <v-dialog 
      v-model="dialog" 
      persistent max-width="600px" min-width="360px" min-height="600px" 
      @keydown.esc="closeLogin"
      >
          <div>
              <v-tabs v-model="tab" 
                direction="vertical"
                show-arrows 
                background-color="deep-purple accent-4" 
                icons-and-text dark grow
              >
                  <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                  <v-tab v-for="i in tabs" :key="i">
                      <v-icon large>{{ i.icon }}</v-icon>
                      <div class="caption py-1">{{ i.name }}</div>
                  </v-tab>
                  <v-window v-model="tab">
                    <v-window-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                    <v-window-item>
                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="lastName" :rules="[rules.required]" label="Last Name" maxlength="20" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validate">Register</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-window-item>
                  </v-window>
              </v-tabs>
          </div>
      </v-dialog>
  </v-card>

</template>

<script>

import bus from 'vue3-eventbus';
import {ref} from 'vue';

  export default {

    setup() {
      const dialog = ref(false);
      function show() {
        dialog.value = true;
      }
      function close() {
        dialog.value = false;
      }
      bus.on('showLogin', show);
      bus.on('closeLogin', close);
      return {
        dialog,
        show,
        close
      };
    },
    
    data() {
      return {
        tab: 0,
        tabs: [
          { name: "Login", icon: "mdi-account" },
          { name: "Register", icon: "mdi-account-outline" },
        ],
        valid: true,

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verify: "",
        loginPassword: "",
        loginEmail: "",
        loginEmailRules: [
          (v) => !!v || "Required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        emailRules: [
          (v) => !!v || "Required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],

        show1: false,
        rules: {
          required: (value) => !!value || "Required.",
          min: (v) => (v && v.length >= 8) || "Min 8 characters",
        },
      };
    },

    methods: {
      passwordMatch() {
        return this.password === this.verify || "Password must match";
      },
      validate() {
        if (this.$refs.loginForm.validate()) {
          // submit form to server/API here...
        }
      },
      closeLogin() {
        bus.emit('closeLogin');
      }
    }
  };
</script>
