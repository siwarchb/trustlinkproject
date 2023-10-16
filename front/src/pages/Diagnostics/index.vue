<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Tickets Diagnostics</h1>
        <v-menu offset-y> </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-2 pb-0 white--text info">
              <p class="white--text">Liste of tickets</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-0">
                    <tr>
                      <th class="text-left pa-6">Number</th>
                      <!-- <th class="text-left">Client</th> -->
                      <th class="text-left">client</th>
                      <!-- <th class="text-left">Numero facture</th>
                      <th class="text-left">Date facture</th> -->
                      <th class="text-left">warranty</th>
                      <th class="text-left">status</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(ticket, key) in tickets" :key="key">
                      <td class="pa-6">{{ ticket.numero }}</td>

                      <td>{{ ticket.revendeur }}</td>

                      <td v-if="ticket.etat_garantie === 'garantie'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          garantie
                        </v-chip>
                      </td>
                      <td v-else-if="ticket.etat_garantie === 'nn garantie'">
                        <v-chip link color="error" class="ma-2 ml-0">
                          non garantie
                        </v-chip>
                      </td>

                      <td v-else>
                        <v-chip link color="warning" class="ma-2 ml-0">
                          en attente
                        </v-chip>
                      </td>

                      <td v-if="ticket.etat === 'réparation en cours'">
                        <v-dialog width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip
                              link
                              color="warning"
                              class="ma-2 ml-0"
                              v-bind="attrs"
                              v-on="on"
                            >
                              réparation en cours
                            </v-chip>
                          </template>
                          <template v-slot:default="dialog4">
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Voulez vous terminé la réparation ?
                              </v-card-title>

                              <v-card-text>
                                <v-form v-model="valid">
                                  <br />

                                  Terminer la réparation

                                  <br />
                                  <br />
                                </v-form>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="
                                    (dialog4.value = false),
                                      updatereparationticket(ticket._id)
                                  "
                                  style="float: right"
                                  color="info"
                                  :disabled="valid == false"
                                >
                                  Edit
                                </v-btn>
                                <v-btn
                                  color="error"
                                  @click="dialog4.value = false"
                                >
                                  Back
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </td>

                      <td v-if="ticket.etat === 'en attente de facturation'">
                        <v-dialog width="500">
                          <template v-slot:activator="{ on, attrs }">
                            <v-chip
                              link
                              color="warning"
                              class="ma-2 ml-0"
                              v-bind="attrs"
                              v-on="on"
                            >
                              en attente de facturation
                            </v-chip>
                          </template>
                          <template v-slot:default="dialog8">
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Voulez vous facturé le devis ?
                              </v-card-title>

                              <v-card-text>
                                <v-form v-model="valid">
                                  <br />

                                  êtes vous sure ?

                                  <br />
                                  <br />
                                </v-form>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="
                                    (dialog8.value = false),
                                      updatedevisfactur(ticket._id)
                                  "
                                  style="float: right"
                                  color="info"
                                  :disabled="valid == false"
                                >
                                  Oui
                                </v-btn>
                                <v-btn
                                  color="error"
                                  @click="dialog8.value = false"
                                >
                                  Back
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </td>

                      <!-- <td v-if="ticket.etat === 'réparation en cours'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          réparation en cours
                        </v-chip>
                      </td> -->
                      <td v-else-if="ticket.etat === 'en cours'">
                        <v-chip link color="secondary" class="ma-2 ml-0">
                          En cours de diagnostic
                        </v-chip>
                      </td>
                      <!-- <td v-if="ticket.etat === 'en_attente_pr'">
                        <v-chip color="error" class="ma-2 ml-0">
                          En attente PR
                        </v-chip>
                      </td> -->
                      <td v-if="ticket.etat === 'PRreçu'">
                        <v-chip color="success" class="ma-2 ml-0">
                          PR Reçu
                        </v-chip>
                      </td>
                      <td v-else-if="ticket.etat === 'ouverte'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          Ouverte
                        </v-chip>
                      </td>

                      <td
                        v-else-if="
                          ticket.etat ===
                          'devis_en_attente_accord_reception_client'
                        "
                      >
                        <v-chip link color="warning" class="ma-2 ml-0">
                          devis en attente accord réception client
                        </v-chip>
                      </td>
                      <td v-else-if="ticket.etat === 'diagnostic_en_cours'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          diagnostic en cours
                        </v-chip>
                      </td>

                      <td
                        v-else-if="
                          ticket.etat === 'devis_attente_accord_client_final'
                        "
                      >
                        <v-chip link color="warning" class="ma-2 ml-0">
                          devis en attente accord client final
                        </v-chip>
                      </td>

                      <td v-else-if="ticket.etat === 'cloturesansreponse'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          clôturer sans réponse
                        </v-chip>
                      </td>

                      <td v-else-if="ticket.etat === 'refusparréception'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          clôturer sans réponse
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
                              clôturé et décharge recu
                            </v-chip>
                          </template>
                          <template v-slot:default="dialog6">
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Voulez vous livré sans décharge ?
                              </v-card-title>

                              <v-card-text>
                                <v-form v-model="valid">
                                  <br />

                                  Livré sans décharge ?

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
                                  Back
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
                              réparation terminé
                            </v-chip>
                          </template>
                          <template v-slot:default="dialog5">
                            <v-card>
                              <v-card-title class="text-h5 grey lighten-2">
                                Voulez vous cloturé ?
                              </v-card-title>

                              <v-card-text>
                                <v-form v-model="valid">
                                  <br />

                                  Terminer la cloture ?

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
                                  Back
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </template>
                        </v-dialog>
                      </td>

                      <td v-if="ticket.etat === 'livré sans décharge'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          Livré sans décharge
                        </v-chip>
                      </td>

                      <td v-else-if="ticket.etat === 'en_attente_pr'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          en attente PR
                        </v-chip>
                      </td>

                      <td>
                        <router-link
                          v-if="
                            ticket.etat == 'clôturé et décharge recu' ||
                            ticket.etat == 'cloturesansreponse' ||
                            ticket.etat == 'refusparréception' ||
                            ticket.etat == 'livré sans décharge' ||
                            ticket.etat == 'en attente de facturation' ||
                            ticket.etat ==
                              'devis_attente_accord_client_final' ||
                            ticket.etat ==
                              'devis_en_attente_accord_reception_client' ||
                            ticket.etat == 'réparation en cours' ||
                            ticket.etat == 'réparation terminé' ||
                            ticket.etat == 'en cours' ||
                            ticket.etat == 'facturé'
                          "
                          :to="{}"
                        >
                          <v-btn class="ma-9" color="green" dark>
                            <v-icon dark> mdi-wrench </v-icon>
                          </v-btn>
                        </router-link>

                        <router-link
                          v-else-if="
                            ticket.etat == 'en_attente_pr' ||
                            ticket.etat == 'PRreçu'
                          "
                          :to="{
                            name: 'viewdiagnosticenattentepr',
                            params: { id: ticket._id },
                          }"
                        >
                          <v-btn class="ma-9" color="red" dark>
                            <v-icon dark> mdi-wrench </v-icon>
                          </v-btn>
                        </router-link>

                        <router-link
                          v-else
                          :to="{
                            name: 'viewticketdiagnostic',
                            params: { id: ticket._id },
                          }"
                        >
                          <v-btn class="ma-9" color="blue" dark>
                            <v-icon dark> mdi-wrench </v-icon>
                          </v-btn>
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

export default {
  data() {
    return {
      tickets: [],
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
  created() {
    this.gettickets();
  },

  methods: {
    gettickets() {
      HTTP.get("tickets/getalltickets")
        .then((response) => {
          this.tickets = response.data;
          console.log(this.tickets);
        })

        .then((err) => console.log(err));
    },

    updatereparationticket(ticket) {
      console.log(ticket);
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("diagnostics/updatereparationticket", oldticket).then(() => {
        this.$toast.success("Ticket Réparé!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    updateclotureticket(ticket) {
      console.log(ticket);
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("diagnostics/updateclotureticket", oldticket).then(() => {
        this.$toast.success("Ticket cloturé et décharge reçu!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    updatedevisfactur(ticket) {
      console.log(ticket);
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("tickets/updatedevisfactur", oldticket).then(() => {
        this.$toast.success("Devis Facturé!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    updatelivrerticket(ticket) {
      let oldticket = {
        _id: ticket,
      };

      HTTP.put("diagnostics/updatelivrerticket", oldticket).then(() => {
        this.$toast.success("Ticket livré sans décharge!", {
          position: "top-right",
        });

        location.reload();
      });
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
