<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Acheteurs</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addacheteur">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add Acheteur</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des acheteurs</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Name</th>
                      <th class="text-left">Email</th>
                      <th class="text-left">Phone</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(acheteur, key) in acheteurs" :key="key">
                      <td>{{ acheteur.prenom }} {{ acheteur.nom }}</td>
                      <td>{{ acheteur.email }}</td>
                      <td>{{ acheteur.telephone }}</td>

                      <td>
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon color="textColor"
                                >mdi-dots-vertical</v-icon
                              >
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item>
                              <v-list-item-title
                                ><router-link
                                  :to="{
                                    name: 'editacheteur',
                                    params: { id: acheteur._id },
                                  }"
                                >
                                  edit
                                </router-link></v-list-item-title
                              >
                            </v-list-item>
                            <v-dialog
                              v-model="dialog"
                              persistent
                              max-width="390"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-list-item>
                                  <v-list-item-title v-bind="attrs" v-on="on">
                                    delete
                                  </v-list-item-title>
                                </v-list-item>
                              </template>
                              <v-card>
                                <v-card-title class="text-h5">
                                  delete acheteur?
                                </v-card-title>
                                <v-card-text
                                  >are you sure you want to delete cet acheteur
                                  ?</v-card-text
                                >
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue"
                                    text
                                    @click="dialog = false"
                                  >
                                    Back
                                  </v-btn>
                                  <v-btn
                                    color="red"
                                    text
                                    @click="deleteacheteur(acheteur._id)"
                                  >
                                    Confirmer
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-list>
                        </v-menu>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      acheteurs: [],
      dialog: false,
    };
  },

  computed: {
    searchFunction() {
      return this.acheteurs.filter((item) => {
        return item.nom.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  created() {
    this.getacheteurs();
  },

  methods: {
    getacheteurs() {
      HTTP.get("acheteurs/getacheteurs")
        .then((response) => {
          this.acheteurs = response.data;
          console.log(this.acheteurs);
        })

        .then((err) => console.log(err));
    },

    deleteacheteur(id) {
      HTTP.delete("acheteurs/deleteacheteur/" + id).then((response) => {
        console.log(response);
        this.$toast.success("acheteur supprimé!", {
          position: "top-right",
        });

        this.$router.push("/dashboard");
      });
    },
  },
};
</script>

<!-- <style src="./Dashboard.scss" lang="scss" /> -->
