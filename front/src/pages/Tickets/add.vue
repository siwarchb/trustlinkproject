<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-30 mb-6">
        <h1 class="page-title">Add Receipt</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/tickets">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="text-capitalize button-shadow mr-1"
                >Back</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-form v-model="valid1">
          <v-card class="pa-8" width="300%">
            <!-- slot step 1  -->

            <div id="clientdata" v-show="!clientisHidden">
              <v-container fluid>
                <br />

                <v-row>
                  <v-col class="d-flex" cols="12" sm="12">
                    <v-select
                      :items="itemsclient"
                      v-model="client"
                      label="choose a client"
                      :item-text="
                        (item) => `${item.name}  ${item.prenom} (${item.code})`
                      "
                      item-value="name"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="ticket.name"
                      :rules="nameRules"
                      :counter="30"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="ticket.prenom"
                      :rules="prenomRules"
                      :counter="30"
                      label="Last Name"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="ticket.email"
                      :rules="[
                        (v) => !!v || 'E-mail is required',
                        (v) => /.+@.+/.test(v) || 'E-mail doit etre valide',
                        existingMail,
                      ]"
                      :messages="mailMessage"
                      label="E-mail"
                      @keyup="emailExists(ticket.email)"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="ticket.telephone"
                      :rules="telephoneRules"
                      label="Phone"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="ticket.adresse"
                      :rules="adresseRules"
                      label="Adresse"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-btn
                style="float: right"
                color="primary"
                :disabled="!valid1"
                @click="hideandshow()"
              >
                <v-icon>mdi-account-arrow-down </v-icon>
                &nbsp;Add
              </v-btn>
              <br />
            </div>
            <div class="text-center" v-show="!ticketisHidden">
              <v-dialog width="900" v-model="dialog2" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <!-- <v-btn
                      style="float: right"
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                      :disabled="!valid1"
                      @click="dialog2 == true"
                    >
                      <v-icon>mdi-plus-circle-multiple-outline</v-icon>
                      &nbsp;ajouter ticket
                    </v-btn> -->
                  <div class="dashboard-page">
                    <v-row>
                      <div
                        style="
                          display: flex;
                          justify-content: center;
                          width: 80vw;
                          height: 50%;
                        "
                        class="passenger"
                      >
                        <div class="passenger-ticket">
                          <div class="passenger-ticket__line">
                            <div class="passenger-ticket__data">
                              <b>Name</b><br />
                              {{ ticket.name }}
                            </div>
                            <div class="passenger-ticket__data">
                              <b>Last Name</b><br />
                              {{ ticket.prenom }}
                            </div>
                          </div>
                          <div class="passenger-ticket__bottom"></div>
                        </div>
                        <div class="passenger-ticket">
                          <div class="passenger-ticket__line">
                            <div class="passenger-ticket__data">
                              <b>Email</b><br />
                              {{ ticket.email }}
                            </div>
                            <div class="passenger-ticket__data">
                              <b>Phone</b><br />
                              {{ ticket.telephone }}
                            </div>
                          </div>

                          <div class="passenger-ticket__bottom"></div>
                        </div>
                        <div class="passenger-ticket">
                          <div class="passenger-ticket__line">
                            <div class="passenger-ticket__data">
                              <b>Adress</b><br />
                              {{ ticket.adresse }}
                            </div>
                          </div>

                          <div class="passenger-ticket__bottom"></div>
                        </div>
                        <div class="passenger-ticket__bottom"></div>
                      </div>
                    </v-row>
                    <br /><br />
                    <v-btn
                      large
                      block
                      elevation="2"
                      v-bind="attrs"
                      v-on="on"
                      type="button"
                      color="info"
                      ><span class="v-btn__content">
                        Add Ticket <i class="mdi mdi-arrow-right"></i></span
                    ></v-btn>
                  </div>
                </template>

                <!-- modal add ticket -->

                <template v-slot:default="dialog">
                  <v-card>
                    <v-card-title class="text-h5 info">
                      Add Receipt {{ calculatenumero }}
                    </v-card-title>

                    <v-card-text>
                      <v-form ref="form" v-model="valid" lazy-validation>
                        <br />
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                outlined
                                label="Numéro ticket"
                                v-bind:value="calculatenumero"
                                disabled
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                outlined
                                label="Type dealer"
                                v-model="ticket.typerevendeur"
                                :rules="champRules"
                                :items="items"
                              ></v-select>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                              id="clientfinal"
                              style="display: none"
                            >
                              <v-select
                                outlined
                                v-model="ticket.revendeur"
                                :items="revendeurs"
                                label="final client"
                                item-text="name"
                                item-value="name"
                                :rules="champRules"
                                id="clientfinale"
                              ></v-select>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                              id="revendeur"
                              style="display: block"
                            >
                              <v-text-field
                                outlined
                                label="dealer"
                                v-model="ticket.revendeur"
                                id="revendeure"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                              id="datefacture"
                              style="display: block"
                            >
                              <v-text-field
                                outlined
                                label="invoice date"
                                type="date"
                                v-model="ticket.datefacture"
                                id="datefacturee"
                              ></v-text-field>
                            </v-col>

                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                              id="numerofacture"
                              style="display: block"
                            >
                              <v-text-field
                                label="invoice number"
                                outlined
                                id="numerofacturee"
                                v-model="ticket.numerofacture"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                label="lot number/serial number"
                                outlined
                                :rules="champRules"
                                v-model="ticket.numlotounumserie"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                outlined
                                v-model="ticket.typeproduit"
                                :items="typeproduits"
                                label="Product type"
                                :rules="champRules"
                              ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                outlined
                                label="Device brand"
                                v-model="ticket.marqueappareil"
                                :rules="champRules"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                outlined
                                :rules="champRules"
                                label="Device model"
                                v-model="ticket.modeleappareil"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                outlined
                                :rules="champRules"
                                label="Delivery person"
                                v-model="ticket.livreur"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                outlined
                                :rules="champRules"
                                label="Representing"
                                v-model="ticket.representant"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                              <v-select
                                outlined
                                v-model="ticket.accessoires"
                                :items="accessoirees"
                                :menu-props="{ maxHeight: '400' }"
                                label="Select accessoires"
                                item-text="libelle"
                                item-value="libelle"
                                multiple
                                persistent-hint
                              ></v-select>
                            </v-col>

                            <v-col cols="12" sm="12" md="12">
                              <v-textarea
                                v-model="ticket.pannesreclames"
                                outlined
                                name="input-7-4"
                                label="Reclammed breakdowns"
                              ></v-textarea>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="addnewticket()"
                        style="float: right"
                        text
                        class="info"
                        :disabled="!valid"
                      >
                        <v-icon> mdi-plus-circle-multiple-outline</v-icon>
                        &nbsp; Ticket
                      </v-btn>

                      <v-btn
                        style="float: right"
                        text
                        class="success"
                        :disabled="!valid"
                        @click="(dialog.value = false), addnewticket()"
                      >
                        <v-icon> mdi-check-all</v-icon>
                        Add
                      </v-btn>
                      <v-btn text class="error" @click="dialog.value = false">
                        Back
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
            <br />

            <br />
            <br />
            <div id="table" style="display: none">
              <table class="table-main">
                <thead>
                  <tr class="tabletitle">
                    <th>Number</th>
                    <th>Client type</th>
                    <th>Device brand</th>
                    <th>Device model</th>
                    <th>Delivery</th>
                    <th>Representing</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tr
                  class="list-item"
                  v-for="(ticket, key) in arrayticket.tickets"
                  :key="key"
                >
                  <td data-label="Type" class="tableitem">
                    {{ ticket.ticket.numeroticket }}
                  </td>
                  <td data-label="Description" class="tableitem">
                    {{ ticket.ticket.typerevendeur }}
                  </td>
                  <td data-label="Quantity" class="tableitem">
                    {{ ticket.ticket.marqueappareil }}
                  </td>
                  <td data-label="Unit Price" class="tableitem">
                    {{ ticket.ticket.modeleappareil }}
                  </td>
                  <td data-label="Taxable Amount" class="tableitem">
                    {{ ticket.ticket.livreur }}
                  </td>
                  <td data-label="Tax Code" class="tableitem">
                    {{ ticket.ticket.representant }}
                  </td>

                  <!-- modifier ticket -->
                  <td>
                    <v-dialog width="900">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="ma-3"
                          text
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="green lighten-2"
                        >
                          <v-icon>mdi-tooltip-edit</v-icon>
                        </v-btn>
                      </template>

                      <!-- modal add ticket -->

                      <template v-slot:default="dialog1">
                        <v-card>
                          <v-card-title class="text-h5 info">
                            Edit bon de reception
                            {{ ticket.ticket.numeroticket }}
                          </v-card-title>

                          <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                              <br />
                              <v-container>
                                <v-row>
                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      outlined
                                      label="Number ticket"
                                      v-bind:value="ticket.ticket.numeroticket"
                                      disabled
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      outlined
                                      label="Type Revendeur"
                                      v-model="ticket.ticket.typerevendeur"
                                      :rules="champRules"
                                      :items="items"
                                    ></v-select>
                                  </v-col>

                                  <v-col
                                    v-if="
                                      ticket.ticket.typerevendeur ==
                                      'Client final'
                                    "
                                    cols="12"
                                    sm="6"
                                    md="6"
                                    id="clientfinal"
                                    style="display: block"
                                  >
                                    <v-select
                                      outlined
                                      v-model="ticket.ticket.revendeur"
                                      :items="revendeurs"
                                      label="client final"
                                      item-text="name"
                                      item-value="name"
                                      :rules="champRules"
                                      id="clientfinale"
                                    ></v-select>
                                  </v-col>

                                  <v-col
                                    v-else
                                    cols="12"
                                    sm="6"
                                    md="6"
                                    id="revendeur"
                                    style="display: block"
                                  >
                                    <v-text-field
                                      outlined
                                      label="revendeur"
                                      v-model="ticket.ticket.revendeur"
                                      id="revendeure"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="6"
                                    id="datefacture"
                                    style="display: block"
                                  >
                                    <v-text-field
                                      outlined
                                      label="date facture"
                                      type="date"
                                      v-model="ticket.ticket.datefacture"
                                      id="datefacturee"
                                      style="display: block"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="6"
                                    id="numerofacture"
                                    style="display: block"
                                  >
                                    <v-text-field
                                      label="numero facture"
                                      outlined
                                      id="numerofacturee"
                                      v-model="ticket.ticket.numerofacture"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      label="num lot/numserie"
                                      outlined
                                      :rules="champRules"
                                      v-model="ticket.ticket.numlotounumserie"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      outlined
                                      v-model="ticket.ticket.typeproduit"
                                      :items="typeproduits"
                                      label="Product Type"
                                      :rules="champRules"
                                      item-text="produit"
                                      item-value="produit"
                                    ></v-select>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      outlined
                                      label="Marque appareil"
                                      v-model="ticket.ticket.marqueappareil"
                                      :rules="champRules"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      outlined
                                      :rules="champRules"
                                      label="Device model"
                                      v-model="ticket.ticket.modeleappareil"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      outlined
                                      :rules="champRules"
                                      label="Delivery"
                                      v-model="ticket.ticket.livreur"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-text-field
                                      outlined
                                      :rules="champRules"
                                      label="Representing"
                                      v-model="ticket.ticket.representant"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="6">
                                    <v-select
                                      outlined
                                      v-model="ticket.ticket.accessoires"
                                      :items="accessoireess"
                                      :menu-props="{ maxHeight: '600' }"
                                      label="list of accessories"
                                      item-text="libelle"
                                      item-value="libelle"
                                      multiple
                                      persistent-hint
                                    ></v-select>
                                  </v-col>

                                  <v-col cols="12" sm="12" md="12">
                                    <v-textarea
                                      v-model="ticket.ticket.pannesreclames"
                                      outlined
                                      name="input-7-4"
                                      label="Reclammed breakdowns"
                                    ></v-textarea>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-form>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              @click="editnewticket()"
                              style="float: right"
                              text
                              color="info"
                              :disabled="!valid"
                            >
                              Edit
                            </v-btn>
                            <v-btn
                              text
                              color="red"
                              @click="dialog1.value = false"
                            >
                              Back
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </td>
                  <td>
                    <v-dialog width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          class="ma-3"
                          text
                          icon
                          v-bind="attrs"
                          v-on="on"
                          color="red lighten-2"
                        >
                          <v-icon>mdi-tooltip-remove</v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-card-title class="text-h5">
                            delete Ticket?
                          </v-card-title>
                          <v-card-text
                            >are you sure you want to delete this ticket
                            ?</v-card-text
                          >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue"
                              text
                              @click="dialog.value = false"
                            >
                              Back
                            </v-btn>
                            <v-btn
                              color="red"
                              text
                              @click="
                                deleteticket(ticket.ticket.numeroticket),
                                  (dialog.value = false)
                              "
                            >
                              Confirmer
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </td>
                </tr>
              </table>
              <br />
              <br />

              <v-btn
                style="float: right"
                color="success"
                @click="delay()"
                :disabled="disabled"
              >
                <v-icon>mdi mdi-arrow-right</v-icon>
                &nbsp;Save all
              </v-btn>

              <br />
              <br />
            </div>

            <!--End Table-->
          </v-card>
        </v-form>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import VueBarcode from "vue-barcode";

export default {
  components: {},

  name: "Dashboard",

  data() {
    return {
      ticketisHidden: true,
      clientisHidden: false,
      dialog: false,
      disabled: false,
      timeout: null,

      dialog1: false,
      dialog2: false,
      valid: false,
      valid1: false,
      arraynumbertickets: [],
      lastticket: "",

      items: ["Client final", "Revendeur"],
      typerevendeur: ["Client final", "Revendeur"],
      typeproduits: ["machine", "autre"],

      client: "",
      clientsold: [],
      clientfound: {},

      itemsclient: [],
      champRules: [
        (v) => !!v || "Ce champ is required",
        (v) => (v && v.length <= 30) || "Champ must be less than 30 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      prenomRules: [
        (v) => !!v || "prenom is required",
        (v) =>
          (v && v.length <= 30) || "prenom must be less than 30 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail doit etre valide",
      ],

      existingMail: () => true || this.mailMessage,
      mailMessage: "",

      telephoneRules: [
        (v) => !!v || "telephone is required",
        (v) => (v && v.length <= 8) || "telephone doit etre 8 characters",
      ],
      adresseRules: [(v) => !!v || "adresse is required"],

      arrayticket: {
        client: {},

        tickets: [],
      },

      newticket: {
        client: {},
        ticket: [],
      },
      revendeursold: [],
      clients: [],
      revendeurs: [],
      accessoirees: [],
      accessoireess: [],

      i: 1,
      ticket: {
        name: "",
        pannesreclames: "",
        prenom: "",

        email: "",

        telephone: "",

        adresse: "",
        accessoires: [],
        revendeur: "",
        datefacture: "",
        numerofacture: "",
        marqueappareil: "",
        modeleappareil: "",
        etat_garantie: "",
        typeproduit: "",
        etat: "ouverte",
        datereception: new Date(),
        statutaffectation: "non affecté",
        numlotounumserie: "",
        livreur: "",
        representant: "",
        typerevendeur: "",
        affectepar: "",
        numeroticket: "",
      },

      numero: "",
      tickets: {},
      clickeditem: {},

      currentYear: new Date().getFullYear().toString().substr(-2),
    };
  },

  created() {
    this.gettickets();
    this.getclients();
    this.getaccessoires();
  },

  watch: {
    "ticket.typerevendeur"(val) {
      console.log(val);
      if (val == "Client final") {
        document.getElementById("revendeur").style.display = "none";
        document.getElementById("datefacture").style.display = "none";
        document.getElementById("numerofacture").style.display = "none";
        document.getElementById("revendeure").style.display = "none";
        document.getElementById("datefacturee").style.display = "none";
        document.getElementById("numerofacturee").style.display = "none";
        document.getElementById("clientfinal").style.display = "block";
        document.getElementById("clientfinale").style.display = "block";
      } else {
        document.getElementById("revendeur").style.display = "block";
        document.getElementById("datefacture").style.display = "block";
        document.getElementById("numerofacture").style.display = "block";
        document.getElementById("revendeure").style.display = "block";
        document.getElementById("datefacturee").style.display = "block";
        document.getElementById("numerofacturee").style.display = "block";
        document.getElementById("clientfinal").style.display = "none";
        document.getElementById("clientfinale").style.display = "none";
      }
    },

    client: function (val) {
      if (val) {
        this.selected = [];
        this.clients = this.clientsold;
        let filter = this.clients.filter((d) => d.name == val);
        this.clientfound = filter;
        this.ticket.name = this.clientfound[0].name;
        this.ticket.prenom = this.clientfound[0].prenom;
        this.ticket.telephone = this.clientfound[0].telephone;

        this.ticket.adresse = this.clientfound[0].adresse;
        this.ticket.email = this.clientfound[0].email;
      }
    },

    "ticket.typeproduit"(val) {
      HTTP.get("accessoires/getaccessoiresbytype/" + val)
        .then((response) => {
          this.accessoirees = response.data;
        })

        .then((err) => console.log(err));
    },

    "ticket.ticket.typerevendeur"(val) {
      console.log(val);
      if (val == "Client final") {
        document.getElementById("revendeur").style.display = "none";
        document.getElementById("datefacture").style.display = "none";
        document.getElementById("numerofacture").style.display = "none";
        document.getElementById("revendeure").style.display = "none";
        document.getElementById("datefacturee").style.display = "none";
        document.getElementById("numerofacturee").style.display = "none";
        document.getElementById("clientfinal").style.display = "block";
        document.getElementById("clientfinale").style.display = "block";
      } else {
        document.getElementById("revendeur").style.display = "block";
        document.getElementById("datefacture").style.display = "block";
        document.getElementById("numerofacture").style.display = "block";
        document.getElementById("revendeure").style.display = "block";
        document.getElementById("datefacturee").style.display = "block";
        document.getElementById("numerofacturee").style.display = "block";
        document.getElementById("clientfinal").style.display = "none";
        document.getElementById("clientfinale").style.display = "none";
      }
    },
  },

  computed: {
    calculatenumero() {
      // creation nouvelle ticket dans bd
      if (this.arraynumbertickets.length == 0 && this.tickets.length == 0) {
        console.log("créér nv");
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ticket.numeroticket = "SAV" + this.currentYear + "000" + 1;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties

        return this.ticket.numeroticket;
        // si il ya de ticket dans bd
      } else if (
        this.tickets.length > 0 &&
        this.arraynumbertickets.length == 0
      ) {
        const last = this.tickets[0].numero;
        const lastNumber = last.slice(8);

        const newTicketNumber =
          "SAV" + this.currentYear + "000" + (parseInt(lastNumber) + 1);

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ticket.numeroticket = newTicketNumber;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.ticket.numeroticket;
      }
      // ajout d'autre ticket
      else {
        console.log("ajout d'autre ticket ");
        console.log(this.arraynumbertickets);
        const lasticket =
          this.arraynumbertickets[this.arraynumbertickets.length - 1];
        const lastnumber = lasticket.slice(8);

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ticket.numeroticket =
          "SAV" + this.currentYear + "000" + (parseInt(lastnumber) + 1);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.ticket.numeroticket;
      }
    },
  },

  methods: {
    emailExists(mail) {
      if (mail !== "") {
        HTTP.get("tickets/getemail/" + mail)
          .then((response) => {
            console.log(response.data);
            if (response.data == "adresse mail existe") {
              console.log(response.data);
              this.mailMessage = response.data;
              this.existingMail = false;
            } else {
              this.mailMessage = "";
              this.existingMail = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    delay() {
      this.disabled = true;

      // Re-enable after 5 seconds
      this.timeout = setTimeout(() => {
        this.disabled = false;
      }, 1000);

      this.saveallticket();
    },

    deleteticket(id) {
      this.arrayticket.tickets.forEach((ticket) => {
        if (ticket.ticket.numeroticket == id) {
          this.arrayticket.tickets = this.arrayticket.tickets.filter(
            (ticket) => ticket.ticket.numeroticket !== id
          );
          this.$toast.success("Ticket deleted!", {
            position: "top-right",
          });
        }
      });
    },

    // print numero ticket
    download() {
      const html = this.$refs.content.innerHTML;
      var myWindow = window.open("", "", "width=400,height=300");
      myWindow.document.write(html);

      myWindow.document.close();
      myWindow.focus();
      myWindow.print();
      myWindow.close();
    },

    hideandshow() {
      (this.clientisHidden = true), (this.ticketisHidden = false);

      HTTP.get("clients/getclients")
        .then((response) => {
          response.data.forEach((client) => {
            if (client.email != this.ticket.email) {
              const newclient = {
                name: this.ticket.name,
                prenom: this.ticket.prenom,
                adresse: this.ticket.adresse,
                telephone: this.ticket.telephone,
                email: this.ticket.email,
              };
              response.data.push(newclient);
              console.log(response.data);
              this.revendeurs = response.data;

              this.revendeursold = response.data;
            } else {
              this.revendeurs = response.data;
              this.revendeursold = response.data;
            }
          });
          this.revendeurs = response.data;
          this.revendeursold = response.data;
        })

        .then((err) => console.log(err));
    },

    // add new ticket when click modal
    addnewticket() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let client = {
          name: this.ticket.name,
          prenom: this.ticket.prenom,
          adresse: this.ticket.adresse,
          telephone: this.ticket.telephone,
          email: this.ticket.email,
        };

        let ticket = {
          numeroticket: this.ticket.numeroticket,
          typerevendeur: this.ticket.typerevendeur,
          revendeur: this.ticket.revendeur,
          datefacture: this.ticket.datefacture,
          numerofacture: this.ticket.numerofacture,
          numlotounumserie: this.ticket.numlotounumserie,
          typeproduit: this.ticket.typeproduit,
          marqueappareil: this.ticket.marqueappareil,
          modeleappareil: this.ticket.modeleappareil,
          livreur: this.ticket.livreur,
          representant: this.ticket.representant,
          etat_garantie: "",
          affectepar: "",
          etat: "ouverte",
          statutaffectation: this.statutaffectation,
          pannesreclames: this.ticket.pannesreclames,
          accessoires: this.ticket.accessoires,

          datereception: new Date(),
        };

        this.arrayticket.client = client;
        this.arrayticket.tickets.push({ ticket });
        this.arraynumbertickets.push(ticket.numeroticket);

        this.$toast.success("Ticket added!!", {
          position: "top-right",
          timeout: 1000,
          closeOnClick: true,
        });
        (this.ticket.numeroticket = ""),
          (this.ticket.typerevendeur = ""),
          (this.ticket.revendeur = ""),
          (this.ticket.datefacture = ""),
          (this.ticket.numerofacture = ""),
          (this.ticket.numlotounumserie = ""),
          (this.ticket.typeproduit = ""),
          (this.ticket.marqueappareil = ""),
          (this.ticket.modeleappareil = ""),
          (this.snackbar = false);

        document.getElementById("table").style.display = "block";

        this.$router.push("/addticket");
      }
    },

    // edit ticket

    getrevendeurs() {
      HTTP.get("clients/getclients").then((response) => {
        this.revendeurs = response.data;
        this.revendeursold = response.data;
      });
    },

    getclients() {
      HTTP.get("clients/getclients")
        .then((response) => {
          this.itemsclient = response.data;
          this.clientsold = response.data;
        })

        .then((err) => console.log(err));
    },

    getaccessoires() {
      HTTP.get("accessoires/getaccessoires")
        .then((response) => {
          this.accessoireess = response.data;
        })

        .then((err) => console.log(err));
    },

    gettickets() {
      HTTP.get("tickets/getalltickets")
        .then((response) => {
          this.tickets = response.data;
        })

        .then((err) => console.log(err));
    },

    saveallticket() {
      console.log(this.arrayticket);

      if (this.arrayticket.client.email == "") {
        this.arrayticket.client.email = "nextconsult01@gmail.com";

        console.log(this.arrayticket);

        HTTP.post("tickets/addmultiticket", this.arrayticket).then(
          (response) => {
            this.$toast.success("Ticket added!!", {
              position: "top-right",
              timeout: 1000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            });

            this.$router.push("/tickets");
          }
        );
      } else {
        HTTP.post("tickets/addmultiticket", this.arrayticket).then(
          (response) => {
            this.$toast.success("Ticket added!!", {
              position: "top-right",
              timeout: 1000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              icon: true,
              rtl: false,
            });

            this.$router.push("/tickets");
          }
        );
      }
    },
  },
};
</script>
<style src="./Table.scss" lang="scss" />
