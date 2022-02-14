<template>
    <v-container grid-list-xs>
        <v-layout row wrap v-if="!loading && myAds.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">My ads</h1>
                
                <v-card 
                    class="elevation-10 mb-5"
                    v-for="ad in myAds"
                    :key="ad.id"
                    
                >
                    <v-layout row wrap>
                        <v-flex xs4>
                            <v-img
                                height="100%"
                                :src="ad.imageSrc"
                            ></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <v-card-text>
                                <h2 class="text--primary">{{ ad.title }}</h2>
                                <p>{{ad.description}}</p>    
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="info"
                                    :to="'/ad/' + ad.id"
                                >Open</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else-if="!loading && myAds.length === 0">
            <v-flex xs12 class="d-flex justify-center mt-5">
                <h1 class="primary--text">You have no ads</h1>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12 class="d-flex justify-center mt-5">
                <v-progress-circular
                    :size="100"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        myAds() {
            return this.$store.getters.myAds
        },
        loading() {
            return this.$store.getters.loading
        }
    }
}
</script>