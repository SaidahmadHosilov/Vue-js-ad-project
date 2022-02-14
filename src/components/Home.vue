<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                            v-for="ad in promoAds"
                            :key="ad.id"
                            :src="ad.imageSrc"
                        >
                            <div class="car-link">
                                <v-btn 
                                    color="error"
                                    :to="'/ad/' + ad.id"
                                >
                                    {{ ad.title }}
                                </v-btn>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex
                    xs12 
                    sm6
                    md4
                    v-for="ad of ads"
                    :key="ad.id"
                >
                    <v-card
                        class="mx-auto"
                    >
                        <v-img
                            :src="ad.imageSrc"
                            height="200px"
                        ></v-img>

                        <v-card-title>
                            {{ ad.title }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ ad.description }}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                :to="'/ad/' + ad.id"
                            >
                                Open
                            </v-btn>

                            <app-buy-modal :ad="ad"></app-buy-modal>

                            <v-btn
                                icon
                                @click="show = !show"
                            >
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text>
                                {{ ad.description }}
                            </v-card-text>
                        </div>
                        </v-expand-transition>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div v-else>
        <v-container grid-list-lg>
            <v-layout row wrap class="pt-16 flex justify-center align-center">
                <v-flex xs12 class="text-xs-center d-flex justify-center">
                    <v-progress-circular
                        :size="100"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    computed: {
        promoAds() {
            return this.$store.getters.promoAds       
        },
        ads() {
            return this.$store.getters.ads
        },
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, .5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
</style>