import { createStore } from "vuex";

export const store = createStore({
    mutations: {
        LOGIN (state, value) { 
            // console.log("mutations中的+被调用了", state, value);
            state.accessToken = value.accessToken
            state.refreshToken = value.refreshToken
            state.userInfo = value.userInfo
        }
    },
    state () {
        return {
            accessToken: "",
            refreshToken: "",
            userInfo: {
                userId: -1,
                username: "Click Here to Login",
                avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            }
        }
    }, 

});