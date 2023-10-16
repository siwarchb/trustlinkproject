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
          <div id="fb-editor"></div>

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
                      <th class="text-left">Voir</th>

                      <th class="text-left">Réception</th>
                      <th class="text-left">Client</th>
                      <th class="text-left">Etat Ticket</th>
                      <th class="text-left">Facture</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(offre, key) in offres" :key="key">
                      <td class="pa-6">{{ offre.ticket_id["numero"] }}</td>

                      <td>
                        {{ offre.prixmain }}
                      </td>
                      <td>
                        {{ offre.prix_oeuvre }}
                      </td>
                      <td>{{ offre.duree }}</td>
                      <td>{{ offre.date_confirmation }}</td>
                      <td>
                        <router-link
                          :to="{
                            name: 'voir_devis',
                            params: { id: offre._id },
                          }"
                        >
                          <v-icon large color="blue darken-2">
                            mdi-file
                          </v-icon>
                        </router-link>
                      </td>

                      <td>
                        <span
                          style="
                            color: green;
                            font-weight: bold;
                            font-size: 15px;
                          "
                          v-show="offre.etat_reception == 'confirmé'"
                          >Confirmé
                        </span>
                        <span
                          style="color: red; font-weight: bold; font-size: 15px"
                          v-show="offre.etat_reception == 'refusé'"
                        >
                          Refusé</span
                        >
                        <span
                          style="
                            color: blue;
                            font-weight: bold;
                            font-size: 15px;
                          "
                          v-show="offre.etat_reception == 'en attente'"
                        >
                          En attente</span
                        >
                      </td>
                      <td>
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
                          style="color: red; font-weight: bold; font-size: 15px"
                          v-show="offre.etat_confirmation == 'refusé'"
                        >
                          Refusé</span
                        >
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
                      </td>
                      <td>
                        <v-chip
                          v-if="offre.ticket_id['etat'] === 'en cours'"
                          link
                          color="warning"
                          class="ma-2 ml-0"
                        >
                          En cours
                        </v-chip>
                        <v-chip
                          v-if="offre.ticket_id['etat'] === 'clôturée'"
                          link
                          color="success"
                          class="ma-2 ml-0"
                        >
                          Clôturée
                        </v-chip>

                        <v-chip
                          v-if="
                            offre.ticket_id['etat'] ===
                            'devis_attente_accord_client_final'
                          "
                          link
                          color="success"
                          class="ma-2 ml-0"
                        >
                          devis attente accord client final
                        </v-chip>

                        <v-chip
                          v-if="offre.ticket_id['etat'] === 'refusparréception'"
                          link
                          color="success"
                          class="ma-2 ml-0"
                        >
                          Clôturée
                        </v-chip>

                        <v-chip
                          v-if="
                            offre.ticket_id['etat'] ===
                            'en attente de facturation'
                          "
                          link
                          color="success"
                          class="ma-2 ml-0"
                        >
                          en attente de facturation
                        </v-chip>
                      </td>
                      <td>
                        <router-link
                          v-show="offre.etat_confirmation == 'confirmé'"
                          :to="{
                            name: 'voir_factures',
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
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import Swal from "sweetalert2";
import Toast from "sweetalert2";
import jQuery from "jquery";
import jquery from "jquery";

export default {
  data() {
    return {
      form: {
        parent_id: {
          name: "",
          prenom: "",
        },
      },

      offres: [],
      search: "",
      dialog: false,
    };
  },

  mounted() {
    jquery(($) => {
      $("#fb-editor").formBuilder();
    });
  },
  created() {
    this.getoffres();
  },

  methods: {
    getoffres() {
      HTTP.get("offres/getoffres")
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
