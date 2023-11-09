<template>
  <v-card max-width="1080" location="top">
    <v-expansion-panels variant="popout" class="pa-4">
      <v-expansion-panel
        v-for="(message, i) in posts"
        :key="i"
        hide-actions
      >
        <v-expansion-panel-title>
          <v-row
            align="center"
            class="spacer"
            no-gutters
          >
            <v-col
              cols="4"
              sm="2"
              md="1"
            >
              <v-avatar
                size="36px"
              >
                <v-img
                  v-if="message.avatar"
                  alt="Avatar"
                  v-model:src="message.avatar"
                ></v-img>
                <v-icon
                  v-else
                  :color="message.color"
                  :icon="message.icon"
                ></v-icon>
              </v-avatar>
            </v-col>
  
            <v-col
              class="hidden-xs-only text-left ms-2"
              sm="5"
              md="3"
            >
              <strong v-html="message.name"></strong>
              <span
                class="text-grey"
              > 
              </span>
              <v-chip
                v-if="message.type"
                :color="`orange-lighten-1`"
                class="ms-0 me-2"
                label
                small
              >
                置顶
              </v-chip>
              <v-chip
                v-if="message.status"
                :color="`green-lighten-1`"
                class="ms-0 me-2"
                label
                small
              >
                精华
              </v-chip>
            </v-col>
            
            <v-col
              class="text-no-wrap text-left"
              cols="5"
              sm="3"
            >

              <strong v-html="message.title"></strong>
            </v-col>
  
            <v-col
              v-if="false"
              class="text-medium-emphasis text-truncate hidden-sm-and-down"
            >
              &mdash;
              {{ message.first_sentence }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
  
        <v-expansion-panel-text>
          <v-card-text v-text="message.first_sentence"></v-card-text>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-divider></v-divider>

      <v-expansion-panel>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="15"
          :total-visible="6"
        ></v-pagination>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>

  import api from "@/api/request";

  export default {

    created() {
      this.get_posts();
    },

    methods: {
      get_posts() {
        return ;
        
        api.get("/home")
        .then((res) => {
          var postViews = new Array(res.data.length);
          for (var i = 0; i<res.data.length; i ++) {
            var post = res.data[i].post;
            var user = res.data[i].user;
            var postView = {
              avatar: user.headerUrl,
              name: user.username,
              title: post.title,
              first_sentence: post.firstSentence,
              status: post.status,
              type: post.type,
              icon: 'mdi-account-multiple',
            }
            console.log(post);
            postViews[i] = postView;
          }
          this.posts = postViews;
        
        })
      }
    },

    data: () => ({
      exmple: [
        {
          color: 'red',
          icon: 'mdi-account-multiple',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter',
        },
        {
          color: 'teal',
          icon: 'mdi-tag',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today',
        },
      ],
      posts: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify!',
          first_sentence: 'Thank you for joining our community...',
        },
      ],
      page: 1
    }),
  }
</script>