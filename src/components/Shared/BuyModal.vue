        <template>
            <v-row justify="end" class="mr-4">
                <v-btn
                    color="primary"
                    dark
                    @click.stop="modal = true"
                >
                    Buy
                </v-btn>

                <v-dialog
                    v-model="modal"
                    max-width="500px"
                    transition="dialog-transition"
                >
                    <v-card>
                        <v-container grid-list-xs>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card-title primary-title>
                                        <h1>Do you want to buy it?</h1>
                                    </v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card-text primary-title>
                                        <v-text-field
                                            prepend-icon="mdi-account"
                                            name="name"
                                            label="Your name"
                                            type="text"
                                            v-model="name"
                                        ></v-text-field>
                                        <v-text-field
                                            prepend-icon="mdi-text"
                                            name="phone"
                                            label="Your phone"
                                            type="text"
                                            v-model="phone"
                                        ></v-text-field>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card-actions primary-title>
                                        <v-spacer></v-spacer>
                                        <v-btn  
                                            text 
                                            @click="onCancel"
                                            :disabled="localLoading"
                                        >
                                            Close
                                        </v-btn>
                                        <v-btn 
                                            color="success" 
                                            @click="onSave"
                                            :disabled="localLoading"
                                            :loading="localLoading"
                                        >
                                            Buy it!
                                        </v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                    
                </v-dialog>
            </v-row>
        </template>

<script>
export default {
    props: {
        ad: Object,
        required: true
    },
    data() {
        return {
            modal: false,
            name: '',
            phone: '',
            localLoading: false
        }
    },
    methods: {
        onCancel() {
            this.name = ''
            this.phone = ''
            this.modal = false
        },
        onSave() {
            if( this.name !== '' && this.phone !== '' ) {
                this.localLoading = true
                this.$store.dispatch('createOrder', {
                    name: this.name,
                    phone: this.phone,
                    adId: this.ad.id,
                    ownerId: this.ad.ownerId
                })
                .finally(() => {
                    this.name = ''
                    this.phone = ''
                    this.localLoading = false
                    this.modal = false
                })
            }
        }
    }
}
</script>
