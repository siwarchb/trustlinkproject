<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h3 class="page-title">Client</h3>

        <br /><br />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addrevendeur">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add Client</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text>
            <v-text-field
              v-model="search"
              value=""
              color="#2382bf"
              type="text"
              hide-no-data
              placeholder="Recherche Revendeur"
              prepend-icon="mdi-database-search"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des Clients</p>
              <br />
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Nom</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Adresse</th>
                      <th class="text-left">telephone</th>
                      <th class="text-left">email</th>

                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                    v-for="(revendeur, key) in searchFunction"
                    :key="key"
                    >
                      <td class="pa-6">{{ revendeur.nom }} {{ revendeur.prenom }}</td>
                      <td>{{ revendeur.type }}</td>
                      <td>
                        {{ revendeur.adresse }}
                      </td>
                      <td>{{ revendeur.telephone }}</td>
                      <td>{{ revendeur.email }}</td>

                      
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
                                    name: 'editrevendeur',
                                    params: { id: revendeur._id },
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
                                  delete Revendeur?
                                </v-card-title>
                                <v-card-text
                                  >are you sure you want to delete this Revendeur
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
                                    @click="deletrevendeur(revendeur._id)"
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
      revendeurs: [],
      search: "",
      dialog: false,
    };
  },

  computed: {
    searchFunction() {
      return this.revendeurs.filter((item) => {
        return item.nom.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  created() {
    this.getrevendeurs();
  },

  methods: {
    getrevendeurs() {
      HTTP.get("revendeurs/getrevendeurs")
        .then((response) => {
          this.revendeurs = response.data;
        })

        .then((err) => console.log(err));
    },

    
      deletrevendeur(id) {
      HTTP.delete("revendeurs/deletrevendeur/" + id).then((response) => {
        console.log(response);
        this.$toast.success("Revendeur supprimé!", {
          position: "top-right",
        });

        this.$router.push("/Revendeurs");
      });
    },
  },
};
</script>
