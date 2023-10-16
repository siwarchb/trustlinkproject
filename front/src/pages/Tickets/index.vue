<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Receipt</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addticket">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add Receipt</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>

      <v-row>
        <v-text-field
          v-model="search"
          value=""
          color="#2382bf"
          type="text"
          hide-no-data
          placeholder="Search by name client"
          prepend-icon="mdi-database-search"
        ></v-text-field>

        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">List Of Receipts</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-9">
                    <tr>
                      <v-expansion-panels>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <!-- <th class="text-left pa-6">Numero</th> -->
                            <th class="text-left pa-6">Client</th>
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            &nbsp;&nbsp; &nbsp;
                            <th class="text-left pa-4">e-mail</th>

                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            <th class="text-left pa-2">Phone</th>
                            <th class="text-left pa-2">Date réception</th>

                            <th>Reception sheet</th>
                          </v-expansion-panel-header>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(ticket, key) in searchFunction" :key="key">
                      <v-expansion-panels>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <td class="pa-0">
                              {{ ticket["client_id"].name }}
                              {{ ticket["client_id"].prenom }}
                            </td>
                            <td class="pa-0">
                              {{ ticket["client_id"].email }}
                            </td>

                            <td class="pa-0">
                              {{ ticket["client_id"].telephone }}
                            </td>

                            <td class="pa-0">
                              {{ ticket.datereception | formatDate }}
                            </td>

                            <td class="pa-6">
                              <router-link
                                :to="{
                                  name: 'viewticket',
                                  params: { id: ticket._id },
                                }"
                              >
                                <v-icon large color="blue darken-2">
                                  mdi-eye
                                </v-icon>
                              </router-link>
                            </td>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content>
                            <v-container>
                              <v-layout>
                                <v-flex xs12 sm12>
                                  <v-card hover>
                                    <v-card-title>
                                      <h4 class="info--text">
                                        <v-icon class="info--text"
                                          >mdi-ticket-account</v-icon
                                        >
                                        Liste des Tickets
                                      </h4>
                                    </v-card-title>
                                    <v-card-text>
                                      <v-simple-table class="text-left pa-6">
                                        <thead>
                                          <th>NUMBER</th>
                                          <th>date reception</th>
                                          <th>product</th>
                                          <th>assignment status</th>
                                          <th>status</th>
                                          <th>warranty</th>
                                          <th>Report</th>
                                          <th>Actions</th>
                                        </thead>
                                        <tbody>
                                          <tr
                                            v-for="(tickett, key) in ticket[
                                              'tickets'
                                            ]"
                                            :key="key"
                                          >
                                            <td>{{ tickett.numero }}</td>

                                            <td>
                                              {{
                                                tickett.datereception
                                                  | formatDate
                                              }}
                                            </td>

                                            <td>
                                              {{ tickett.modeleappareil }}
                                            </td>

                                            <td v-if="tickett.affectépar == ''">
                                              <!-- <v-chip
                                                link
                                                color="danger"
                                                class="ma-2 ml-0"
                                                @click="dialog2 = true"
                                              >
                                                en attente
                                              </v-chip> -->
                                              <v-dialog width="900">
                                                <template
                                                  v-slot:activator="{
                                                    on,
                                                    attrs,
                                                  }"
                                                >
                                                  <v-chip
                                                    link
                                                    color="danger"
                                                    class="ma-2 ml-0"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                  >
                                                    waiting
                                                  </v-chip>
                                                </template>
                                                <template
                                                  v-slot:default="dialog2"
                                                >
                                                  <v-card>
                                                    <v-card-title
                                                      class="text-h5 grey lighten-2"
                                                    >
                                                      Assign Ticket
                                                      {{ tickett.numero }} au
                                                      Technicien
                                                    </v-card-title>

                                                    <v-card-text>
                                                      <v-form v-model="valid">
                                                        <br />

                                                        choice the technicien :
                                                        <br />
                                                        <br />
                                                        <v-container>
                                                          <v-card-text>
                                                            <v-select
                                                              outlined
                                                              label="Techniciens"
                                                              v-model="
                                                                affectépar
                                                              "
                                                              :items="
                                                                techniciens
                                                              "
                                                              item-text="name"
                                                              item-value="_id"
                                                              return-object
                                                            ></v-select>
                                                          </v-card-text>
                                                        </v-container>
                                                      </v-form>
                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions>
                                                      <v-spacer></v-spacer>
                                                      <v-btn
                                                        @click="
                                                          (dialog2.value = false),
                                                            addtechnicien(
                                                              tickett._id
                                                            )
                                                        "
                                                        style="float: right"
                                                        color="info"
                                                        :disabled="
                                                          valid == false
                                                        "
                                                      >
                                                        assign
                                                      </v-btn>
                                                      <v-btn
                                                        color="error"
                                                        @click="
                                                          dialog2.value = false
                                                        "
                                                      >
                                                        Cancel
                                                      </v-btn>
                                                    </v-card-actions>
                                                  </v-card>
                                                </template>
                                              </v-dialog>
                                            </td>
                                            <td v-else>
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                assign by
                                                {{ tickett.affectépar }}
                                              </v-chip>
                                            </td>

                                            <!-- réparation en cours et terminé  -->

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'réparation en cours'
                                              "
                                            >
                                              <v-dialog width="900">
                                                <template
                                                  v-slot:activator="{
                                                    on,
                                                    attrs,
                                                  }"
                                                >
                                                  <v-chip
                                                    link
                                                    color="danger"
                                                    class="ma-2 ml-0"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                  >
                                                    reparation in progress
                                                  </v-chip>
                                                </template>
                                                <template
                                                  v-slot:default="dialog4"
                                                >
                                                  <v-card>
                                                    <v-card-title
                                                      class="text-h5 grey lighten-2"
                                                    >
                                                      Do you want to complete
                                                      the repair?
                                                    </v-card-title>

                                                    <v-card-text>
                                                      <v-form v-model="valid">
                                                        <br />

                                                        end reparation

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
                                                            updatereparationticket(
                                                              tickett._id
                                                            )
                                                        "
                                                        style="float: right"
                                                        color="info"
                                                        :disabled="
                                                          valid == false
                                                        "
                                                      >
                                                        Edit
                                                      </v-btn>
                                                      <v-btn
                                                        color="error"
                                                        @click="
                                                          dialog4.value = false
                                                        "
                                                      >
                                                        Cancel
                                                      </v-btn>
                                                    </v-card-actions>
                                                  </v-card>
                                                </template>
                                              </v-dialog>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'clôturé et décharge recu'
                                              "
                                            >
                                              <v-dialog width="500">
                                                <template
                                                  v-slot:activator="{
                                                    on,
                                                    attrs,
                                                  }"
                                                >
                                                  <v-chip
                                                    link
                                                    color="success"
                                                    class="ma-2 ml-0"
                                                    v-bind="attrs"
                                                    v-on="on"
                                                  >
                                                    closed and discharge
                                                    received
                                                  </v-chip>
                                                </template>
                                                <template
                                                  v-slot:default="dialog6"
                                                >
                                                  <v-card>
                                                    <v-card-title
                                                      class="text-h5 grey lighten-2"
                                                    >
                                                      do you want to Delivered
                                                      without discharge?
                                                    </v-card-title>

                                                    <v-card-text>
                                                      <v-form v-model="valid">
                                                        <br />

                                                        Delivered without
                                                        discharge ?

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
                                                            updatelivrerticket(
                                                              tickett._id
                                                            )
                                                        "
                                                        style="float: right"
                                                        color="info"
                                                        :disabled="
                                                          valid == false
                                                        "
                                                      >
                                                        Livrer
                                                      </v-btn>
                                                      <v-btn
                                                        color="error"
                                                        @click="
                                                          dialog6.value = false
                                                        "
                                                      >
                                                        Cancel
                                                      </v-btn>
                                                    </v-card-actions>
                                                  </v-card>
                                                </template>
                                              </v-dialog>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'réparation terminé'
                                              "
                                            >
                                              <v-dialog width="500">
                                                <template
                                                  v-slot:activator="{
                                                    on,
                                                    attrs,
                                                  }"
                                                >
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
                                                <template
                                                  v-slot:default="dialog5"
                                                >
                                                  <v-card>
                                                    <v-card-title
                                                      class="text-h5 grey lighten-2"
                                                    >
                                                      Do you want to be fenced?
                                                      ?
                                                    </v-card-title>

                                                    <v-card-text>
                                                      <v-form v-model="valid">
                                                        <br />

                                                        Do you want to be
                                                        fenced? ?

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
                                                            updateclotureticket(
                                                              tickett._id
                                                            )
                                                        "
                                                        style="float: right"
                                                        color="info"
                                                        :disabled="
                                                          valid == false
                                                        "
                                                      >
                                                        edit
                                                      </v-btn>
                                                      <v-btn
                                                        color="error"
                                                        @click="
                                                          dialog5.value = false
                                                        "
                                                      >
                                                        Cancel
                                                      </v-btn>
                                                    </v-card-actions>
                                                  </v-card>
                                                </template>
                                              </v-dialog>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'livré sans décharge'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="success"
                                                class="ma-2 ml-0"
                                              >
                                                Delivered without discharge
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat === 'en_attente_pr'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                waiting PR
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'devis_en_attente_accord_reception_client'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                quote pending final customer
                                                agreement
                                              </v-chip>
                                            </td>
                                            <td
                                              v-if="tickett.etat === 'en cours'"
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                diagnosis in progress
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'devis_attente_accord_client_final'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                quote pending final customer
                                                agreement
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'en attente de facturation'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                waiting facturation
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ==
                                                'cloturesansreponse'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                close without response
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ==
                                                'refusparréception'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                close without response
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat ===
                                                'clotureetdechargerecu'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="success"
                                                class="ma-2 ml-0"
                                              >
                                                closed and discharge received
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="tickett.etat === 'ouverte'"
                                              class="ma-3 ml-10"
                                            >
                                              &nbsp;
                                              <v-chip link color="secondary">
                                                Ouverte
                                              </v-chip>
                                            </td>

                                            <td
                                              v-if="
                                                tickett.etat_garantie ===
                                                'garantie'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="success"
                                                class="ma-2 ml-0"
                                              >
                                                garantie
                                              </v-chip>
                                            </td>
                                            <td
                                              v-else-if="
                                                tickett.etat_garantie ===
                                                'nn garantie'
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="secondary"
                                                class="ma-2 ml-0"
                                              >
                                                nn garantie
                                              </v-chip>
                                            </td>
                                            <td
                                              v-else-if="
                                                tickett.etat_garantie === ''
                                              "
                                            >
                                              <v-chip
                                                link
                                                color="warning"
                                                class="ma-2 ml-0"
                                              >
                                                pas encore
                                              </v-chip>
                                            </td>

                                            <td>
                                              <router-link
                                                :to="{
                                                  name: 'rapportticket',
                                                  params: { id: tickett._id },
                                                }"
                                              >
                                                <v-icon large color="green ">
                                                  mdi-book
                                                </v-icon>
                                              </router-link>
                                            </td>

                                            <td>
                                              <v-menu>
                                                <template
                                                  v-slot:activator="{
                                                    on,
                                                    attrs,
                                                  }"
                                                >
                                                  <v-btn
                                                    icon
                                                    v-bind="attrs"
                                                    v-on="on"
                                                  >
                                                    <v-icon color="textColor"
                                                      >mdi-dots-vertical</v-icon
                                                    >
                                                  </v-btn>
                                                </template>

                                                <v-list>
                                                  <v-list-item
                                                    v-if="
                                                      tickett.affectépar == ''
                                                    "
                                                  >
                                                    <v-list-item-title
                                                      ><router-link
                                                        :to="{
                                                          name: 'editticket',
                                                          params: {
                                                            id: tickett._id,
                                                          },
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
                                                    <template
                                                      v-slot:activator="{
                                                        on,
                                                        attrs,
                                                      }"
                                                    >
                                                      <v-list-item
                                                        v-if="
                                                          tickett.affectépar ==
                                                          ''
                                                        "
                                                      >
                                                        <v-list-item-title
                                                          v-bind="attrs"
                                                          v-on="on"
                                                        >
                                                          delete
                                                        </v-list-item-title>
                                                      </v-list-item>
                                                    </template>
                                                    <v-card>
                                                      <v-card-title
                                                        class="text-h5"
                                                      >
                                                        delete Ticket?
                                                      </v-card-title>
                                                      <v-card-text
                                                        >are you sure you want
                                                        to delete thid ticket
                                                        ?</v-card-text
                                                      >
                                                      <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn
                                                          color="blue"
                                                          text
                                                          @click="
                                                            dialog = false
                                                          "
                                                        >
                                                          Cancel
                                                        </v-btn>
                                                        <v-btn
                                                          color="red"
                                                          text
                                                          @click="
                                                            deleteticket(
                                                              tickett._id
                                                            )
                                                          "
                                                        >
                                                          ok
                                                        </v-btn>
                                                      </v-card-actions>
                                                    </v-card>
                                                  </v-dialog>
                                                </v-list>
                                              </v-menu>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </v-simple-table>
                                    </v-card-text>
                                  </v-card>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
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

export default {
  data() {
    return {
      tickets: [],
      search: "",

      dialog: false,
      user: {},
      dialog2: true,
      dialog4: true,

      techniciens: [],
      affectépar: "",
      listetickets: {},
      champRules: [(v) => !!v || "Ce champ is required"],
    };
  },

  computed: {
    searchFunction() {
      return this.tickets.filter((item) => {
        console.log(item.tickets);
        return (
          item.client_id["name"]
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  created() {
    this.gettickets();
    this.getuser();
    this.getechniciens();
  },

  methods: {
    getechniciens() {
      HTTP.get("users/getechniciens")
        .then((response) => {
          this.techniciens = response.data;
          console.log(this.techniciens);
        })

        .then((err) => console.log(err));
    },

    getuser() {
      var token = localStorage.getItem("token");
      HTTP.get("auth/getcurrentuser/" + token)
        .then((response) => {
          this.user = response.data;
        })
        .then((err) => console.log(err));
    },

    gettickets() {
      HTTP.get("tickets/getticket")
        .then((response) => {
          this.tickets = response.data;
        })

        .then((err) => console.log(err));
    },

    deleteticket(id) {
      HTTP.delete("tickets/deleteticket/" + id).then((response) => {
        console.log(response);
        this.$toast.success("Ticket deleted!", {
          position: "top-right",
        });

        location.reload();
      });
    },

    addtechnicien(ticket) {
      console.log(ticket);
      let oldticket = {
        affectépar: this.affectépar._id,
        _id: ticket,
      };

      HTTP.put("tickets/updateticketechnicien", oldticket).then(() => {
        this.$toast.success("Ticket affected!", {
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

      HTTP.put("tickets/updateclotureticket", oldticket).then(() => {
        this.$toast.success("Ticket closed and discharge received!", {
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
        this.$toast.success("Ticket delivered without discharge!", {
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
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
