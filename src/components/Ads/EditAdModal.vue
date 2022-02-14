        <template>
            <v-row justify="end" class="mr-4">
                <v-btn
                    color="warning"
                    dark
                    @click.stop="modal = true"
                >
                    Edit
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
                                        <h1>Edit ad</h1>
                                    </v-card-title>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card-text primary-title>
                                        <v-text-field
                                            prepend-icon="mdi-account"
                                            name="title"
                                            label="Title"
                                            type="text"
                                            v-model="editedTitle"
                                        ></v-text-field>
                                        <v-textarea
                                            prepend-icon="mdi-text"
                                            name="description"
                                            label="Description"
                                            type="text"
                                            multi-line
                                            v-model="editedDescription"
                                        ></v-textarea>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-card-actions primary-title>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="onCancel">Cancel</v-btn>
                                        <v-btn color="success" @click="onSave">Save</v-btn>
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
            editedDescription: this.ad.description,
            editedTitle: this.ad.title
        }
    },
    methods: {
        onCancel() {
            this.editedDescription = this.ad.description
            this.editedTitle = this.ad.title
            this.modal = false
        },
        onSave() {
            if( this.editedDescription !== '' && this.editedTitle !== '' ) {

                this.$store.dispatch('updateAd', {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.ad.id
                })

                this.modal = false
            }
        }
    }
}
</script>
