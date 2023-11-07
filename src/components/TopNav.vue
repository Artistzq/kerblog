<template>
  <v-app-bar
  color="teal-darken-4"
  >
        <template v-slot:image>
          <v-img
            gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title font-size="10px">Kerbal-Talks</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
  </v-app-bar>
</template>

<script>
export default {
    data: () => {
        return {
            search: "搜索内容",
        }
    }
}
</script>