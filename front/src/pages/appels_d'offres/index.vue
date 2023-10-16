<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h3 class="page-title">Offres</h3>

        <br /><br />
        <v-menu offset-y> </v-menu>
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
              placeholder="Recherche Offre"
              prepend-icon="mdi-database-search"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des Offres</p>
              <br />
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Ticket</th>
                      <th class="text-left">Prix Maintenance</th>
                      <th class="text-left">Labor price:</th>
                      <th class="text-left">Dureé</th>
                      <th class="text-left">Date confirmation</th>

                      <th class="text-left">Accepter</th>
                      <th class="text-left">Refuser</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(offre, key) in offres" :key="key">
                      <td class="pa-6">{{ offre.ticket_id["numero"] }}</td>
                      <td>{{ offre.prixmain }}</td>
                      <td>
                        {{ offre.prix_oeuvre }}
                      </td>
                      <td>{{ offre.duree }}</td>
                      <td>{{ offre.date_confirmation }}</td>

                      <td>
                        <v-dialog v-model="dialog" persistent max-width="390">
                          <template v-slot:activator="{ on, attrs }">
                            <v-list-item>
                              <v-list-item-title v-bind="attrs" v-on="on">
                                <v-btn class="ma-9" color="green" dark>
                                  <v-icon dark>
                                    mdi-wrench-check-outline
                                  </v-icon>
                                </v-btn>
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                          <v-card>
                            <v-card-title class="text-h5">
                              Accepter Offre?
                            </v-card-title>
                            <v-card-text
                              >are you sure you want to Accepter ce Offre
                              ?</v-card-text
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue" text @click="dialog = false">
                                Back
                              </v-btn>
                              <v-btn
                                color="red"
                                text
                                @click="acceptoffre(offre._id)"
                              >
                                Confirmer
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </td>

                      <td>
                        <!-- <v-btn 
        class="ma-9"
        color="red"
        dark
    >
        <v-icon dark>
        mdi-wrench-check-outline
  
        </v-icon>
    </v-btn> -->
                        <v-dialog v-model="dialog" persistent max-width="390">
                          <template v-slot:activator="{ on, attrs }">
                            <v-list-item>
                              <v-list-item-title v-bind="attrs" v-on="on">
                                <v-btn class="ma-9" color="red" dark>
                                  <v-icon dark>
                                    mdi-wrench-check-outline
                                  </v-icon>
                                </v-btn>
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                          <v-card>
                            <v-card-title class="text-h5">
                              Refuser Offre?
                            </v-card-title>
                            <v-card-text
                              >are you sure you want to Refuser ce Offre
                              ?</v-card-text
                            >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue" text @click="dialog = false">
                                Back
                              </v-btn>
                              <v-btn
                                color="red"
                                text
                                @click="refusoffre(offre._id)"
                              >
                                Confirmer
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
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
      offres: {},
      search: "",
      dialog: false,
    };
  },

  created() {
    this.getoffres();
  },

  methods: {
    getoffres() {
      HTTP.get("offres/getoffres")
        .then((response) => {
          this.offres = response.data;
          console.log(response.data);
        })

        .then((err) => console.log(err));
    },

    acceptoffre(offre) {
      let oldoffre = {
        _id: offre,
      };
      HTTP.put("offres/acceptoffre", oldoffre).then((response) => {
        console.log(response);
        this.$toast.success("offre accepté!", {
          position: "top-right",
        });

        this.$router.push("/offres");
      });
    },

    refusoffre(offre) {
      let oldoffre = {
        _id: offre,
      };
      HTTP.put("offres/refusoffre", oldoffre).then((response) => {
        console.log(response);
        this.$toast.success("offre refusé!", {
          position: "top-right",
        });

        this.$router.push("/dashboard");
      });
    },
  },
};
</script>
