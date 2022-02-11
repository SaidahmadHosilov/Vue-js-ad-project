<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-img
                        :src="ad.imageSrc"
                        height="300px"
                    ></v-img>
                    <v-card-text>
                        <h1 class="text--primary mb-3">{{ ad.title }}</h1> 
                        <p>{{ad.description}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                            color="warning"
                        >Edit</v-btn>
                        <v-btn 
                            color="success"
                        >Buy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            required: true,
            default: 'default_id'
        }
    },
    computed: {
        ad() {
            const id = this.id
            return this.$store.getters.adById(id)
        }
    }
}
</script>