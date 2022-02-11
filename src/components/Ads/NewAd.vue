<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form
                    ref="form"
                    v-model="valid"
                    validation
                    class="mb-3"
                >
                    <v-text-field
                        name="title"
                        label="Ad title"
                        type="text"
                        v-model="title"
                        required
                        :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                        name="description"
                        label="Ad description"
                        type="text"
                        v-model="description"
                        :rules="[v => !!v || 'Description is required']"
                    ></v-textarea>
                </v-form>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-btn color="warning">
                            Upload
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <img 
                            src="" 
                            width="100%" class="mt-4" style="object-fit:cover;">
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-switch
                            label="Add to promo?"
                            v-model="promo"
                            color="primary"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn 
                            :loading="loading"
                            :disabled="!valid || loading"
                            color="success" 
                            @click="createAd"
                        >Create ad</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            description: '',
            promo: false,
            valid: false
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        createAd() {
            if(this.$refs.form.validate()) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    imageSrc: 'data:image/png;base64,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'
                }

                this.$store.dispatch('createAd', ad) 
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch(() => {})
            }
        }
    },
}
</script>