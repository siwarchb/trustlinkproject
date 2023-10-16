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

          <v-card v-if="offres.length !== 0" class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des Offreshh</p>
              <br />
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

                      <th class="text-left">Voir</th>
                      <th class="text-left">Status</th>
                      <th class="text-left">Facture</th>
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
                        <router-link
                          :to="{
                            name: 'voir_devi',
                            params: { id: offre._id },
                          }"
                        >
                          <v-icon large color="blue darken-2">
                            mdi-message-text
                          </v-icon>
                        </router-link>
                      </td>

                      <td>
                        <div v-show="offre.etat_reception == 'en attente'">
                          <v-btn
                            class="ma-2"
                            color="red"
                            dark
                            @click="refusoffre(offre)"
                          >
                            Decline
                            <v-icon dark right> mdi-cancel </v-icon>
                          </v-btn>
                          <v-btn
                            class="ma-2"
                            color="primary"
                            dark
                            @click="acceptoffre(offre)"
                          >
                            Accept
                            <v-icon dark right>
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </v-btn>
                        </div>
                        <span
                          style="
                            color: green;
                            font-weight: bold;
                            font-size: 15px;
                          "
                          v-show="offre.etat_confirmation == 'confirmé'"
                          >Confirmé
                        </span>
                        <span
                          style="
                            color: blue;
                            font-weight: bold;
                            font-size: 15px;
                          "
                          v-show="offre.etat_confirmation == 'en attente'"
                        >
                          En attente</span
                        >
                        <span
                          style="color: red; font-weight: bold; font-size: 15px"
                          v-show="offre.etat_confirmation == 'refusé'"
                        >
                          Refusé</span
                        >
                      </td>
                      <td>
                        <router-link
                          v-show="offre.etat_confirmation == 'confirmé'"
                          :to="{
                            name: 'voir_facture',
                            params: { id: offre._id },
                          }"
                        >
                          <v-icon large color="green"> mdi-cash </v-icon>
                        </router-link>
                        <span
                          style="
                            color: gray;
                            font-weight: bold;
                            font-size: 15px;
                          "
                          v-show="offre.etat_confirmation !== 'confirmé'"
                        >
                          Non Facturé
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <p v-if="offres.length == 0">Pas des Offres....</p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import Swal from "sweetalert2";
import Toast from "sweetalert2";

export default {
  data() {
    return {
      offres: [],
      search: "",
      dialog: false,
    };
  },

  created() {
    this.getoffresclient();
  },

  methods: {
    getoffresclient() {
      let newObject = JSON.parse(window.localStorage.getItem("userData"));
      let id = newObject[0]["_id"];

      console.log(id);

      HTTP.get("offres/getoffres_client/" + id)
        .then((response) => {
          this.offres = response.data;
        })

        .then((err) => console.log(err));
    },

    acceptoffre(offre) {
      let oldoffre = {
        _id: offre._id,
        client_id: offre.ticket_id.client_id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",

        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept!",
      }).then((result) => {
        if (result.isConfirmed) {
          HTTP.put("offres/acceptoffre", oldoffre).then((response) => {
            console.log(response);
            this.$toast.success("offre accepté!", {
              position: "top-right",
            });
          });
        }
        this.$router.go(0);
        this.getoffres();
      });
    },

    refusoffre(offre) {
      let oldoffre = {
        _id: offre._id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",

        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept!",
      }).then((result) => {
        if (result.isConfirmed) {
          HTTP.put("offres/refusoffre", oldoffre).then((response) => {
            console.log(response);
            this.$toast.success("offre refusé!", {
              position: "top-right",
            });
          });
        }
        this.$router.go(0);
        this.getoffres();
      });
    },
  },
};
</script>
