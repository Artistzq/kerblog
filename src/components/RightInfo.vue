<template>
    <v-navigation-drawer 
        location="right" 
        expand-on-hover
        rail
        >
        <WeatherCard></WeatherCard>

        <template v-slot:append>
            <div class="pa-2"  align="center">
                <!-- <v-btn block></v-btn> -->
                <v-btn icon="mdi-github" size="x-large"></v-btn>
            </div>
            <div></div>
        </template>
    </v-navigation-drawer>
</template>

<script>
import WeatherCard from './WeatherCard.vue';

export default {

    components: {
        WeatherCard
    }
}
</script>