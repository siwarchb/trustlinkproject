<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Tickets</h1>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste of tickets</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">NUMBER</th>
                      <!-- <th class="text-left">Client</th> -->
                      <th class="text-left">client</th>

                      <th class="text-left">Revendeur</th>
                      <!-- <th class="text-left">Numero facture</th>
                      <th class="text-left">Date facture</th> -->
                      <th class="text-left">warranty</th>
                      <th class="text-left">status</th>
                      <th class="text-left">Affected by</th>

                      <th class="text-left">voir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, key) in tickets" :key="key">
                      <td class="pa-6">{{ ticket.numero }}</td>
                      <td>
                        {{ ticket.client_id["prenom"] }}
                        {{ ticket.client_id["name"] }}
                      </td>
                      <td>{{ ticket.typerevendeur }}</td>

                      <td v-if="ticket.etat_garantie === 'garantie'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          garantie
                        </v-chip>
                      </td>
                      <td v-else-if="ticket.etat_garantie === 'nn garantie'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          nn garantie
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat === 'clôturé et décharge recu'">
                        <v-dialog width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip
                              link
                              color="success"
                              class="ma-2 ml-0"
                              v-bind="attrs"
                              v-on="on"
                            >
                              closed and discharge received
                            </v-chip>
                          </template>
                          <template v-slot:default="dialog6">
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Would you like to be delivered without
                                discharge? ?
                              </v-card-title>

                              <v-card-text>
                                <v-form v-model="valid">
                                  <br />

                                  Delivered without discharge ?

                                  <br />
                                  <br />
                                </v-form>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="
                                    (dialog6.value = false),
                                      updatelivrerticket(ticket._id)
                                  "
                                  style="float: right"
                                  color="info"
                                  :disabled="valid == false"
                                >
                                  Livrer
                                </v-btn>
                                <v-btn
                                  color="error"
                                  @click="dialog6.value = false"
                                >
                                  Cancel
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </td>

                      <td v-if="ticket.etat === 'réparation terminé'">
                        <v-dialog width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip
                              link
                              color="success"
                              class="ma-2 ml-0"
                              v-bind="attrs"
                              v-on="on"
                            >
                              repair completed
                            </v-chip>
                          </template>
                          <template v-slot:default="dialog5">
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Do you want to be fenced? ?
                              </v-card-title>

                              <v-card-text>
                                <v-form v-model="valid">
                                  <br />

                                  Complete the fence?

                                  <br />
                                  <br />
                                </v-form>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="
                                    (dialog5.value = false),
                                      updateclotureticket(ticket._id)
                                  "
                                  style="float: right"
                                  color="info"
                                  :disabled="valid == false"
                                >
                                  Edit
                                </v-btn>
                                <v-btn
                                  color="error"
                                  @click="dialog5.value = false"
                                >
                                  Cancel
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </td>
                      <td v-if="ticket.etat === 'livré sans décharge'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          Delivered without discharge
                        </v-chip>
                      </td>
                      <td v-if="ticket.etat === 'en_attente_pr'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          waiting PR
                        </v-chip>
                      </td>

                      <td
                        v-if="
                          ticket.etat ===
                          'devis_en_attente_accord_reception_client'
                        "
                      >
                        <v-chip link color="warning" class="ma-2 ml-0">
                          quote pending customer reception agreement
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat === 'en cours'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          diagnosis in progress
                        </v-chip>
                      </td>

                      <td
                        v-if="
                          ticket.etat === 'devis_attente_accord_client_final'
                        "
                      >
                        <v-chip link color="warning" class="ma-2 ml-0">
                          quote pending final customer agreement
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat === 'en attente de facturation'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          waiting facturation
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat == 'cloturesansreponse'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          close without response
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat == 'refusparréception'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          close without response
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat === 'clotureetdechargerecu'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          closed and discharge received
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat === 'ouverte'" class="ma-3 ml-10">
                        &nbsp;
                        <v-chip link color="secondary"> opened </v-chip>
                      </td>

                      <td v-if="ticket.affectépar == ''">
                        <v-btn
                          fab
                          small
                          color="cyan accent-1"
                          @click="addticket(ticket._id)"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </td>
                      <td v-else>
                        <v-chip link color="warning" class="ma-2 ml-0">
                          affected
                        </v-chip>
                      </td>

                      <td>
                        <router-link
                          :to="{
                            name: 'rapportticket',
                            params: { id: ticket._id },
                          }"
                        >
                          <v-icon large color="orange darken-2">
                            mdi-arrow-up-bold-box-outline
                          </v-icon>
                        </router-link>
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

export default {
  data() {
    return {
      tickets: [],
      dialog: false,
      user: [],
      dialog2: false,
      techniciens: [],
      affectépar: "",
    };
  },

  computed: {
    searchFunction() {
      return this.tickets.filter((item) => {
        return (
          item.numero.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  mounted() {},
  created() {
    this.getttickets();
    this.getuser();
    this.getechniciens();
  },

  methods: {
    updateclotureticket(ticket) {
      console.log(ticket);
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("tickets/updateclotureticket", oldticket).then(() => {
        this.$toast.success("Ticket cloturé et décharge reçu!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    updatelivrerticket(ticket) {
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("tickets/updatelivrerticket", oldticket).then(() => {
        this.$toast.success("Ticket livré sans décharge!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    updatereparationticket(ticket) {
      console.log(ticket);
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("tickets/updatereparationticket", oldticket).then(() => {
        this.$toast.success("Ticket Répared!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    getechniciens() {
      HTTP.get("users/getechniciens")
        .then((response) => {
          this.techniciens = response.data;
        })

        .then((err) => console.log(err));
    },
    getuser() {
      var token = localStorage.getItem("token");

      HTTP.get("auth/getuser/" + token)
        .then((response) => {
          this.user = response.data;
        })
        .then((err) => console.log(err));
    },

    getttickets() {
      let newObject = JSON.parse(window.localStorage.getItem("userData"));
      let id = newObject[0]["_id"];
      console.log(id);

      HTTP.get("tickets/gettickettechnicien/" + id)
        .then((response) => {
          this.tickets = response.data;
        })

        .then((err) => console.log(err));
    },

    addticket(id) {
      let technicien = {
        id: id,
        technicien_id: this.user._id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",

        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, take it!",
      }).then((result) => {
        if (result.isConfirmed) {
          HTTP.put("tickets/taketicket", technicien).then((response) => {
            console.log(response);

            Swal.fire("Your file has been added.", "success");
          });
        }
        this.$router.go(0);
        this.getttickets();
      });
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
