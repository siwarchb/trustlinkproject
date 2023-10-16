<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h6 class="page-title">Diagnosis the ticket:</h6>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/diagnostics">
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
        <div
          style="
            display: flex;
            justify-content: center;
            width: 200vw;
            height: 50%;
          "
          class="passenger"
        >
          <div class="passenger-ticket">
            <div class="passenger-ticket__line">
              <div class="passenger-ticket__data">
                <b>NUMERO</b><br />
                {{ ticket.numero }}
              </div>
              <div class="passenger-ticket__data">
                <b>CLIENT</b><br />
                {{ ticket.prenom }}
              </div>
            </div>
            <div class="passenger-ticket__bottom"></div>
          </div>
          <div class="passenger-ticket">
            <div class="passenger-ticket__line">
              <div class="passenger-ticket__data">
                <b>REVENDEUR</b><br />
                {{ ticket.revendeur }}
              </div>
              <div class="passenger-ticket__data">
                <b>NUMERO FACTURE</b><br />
                {{ ticket.numerofacture }}
              </div>
            </div>

            <div class="passenger-ticket__bottom"></div>
          </div>
          <div class="passenger-ticket">
            <div class="passenger-ticket__line">
              <div class="passenger-ticket__data">
                <b>DATE FACTURE</b><br />
                {{ ticket.datefacture | formatDate }}
              </div>
              <!-- <div class="passenger-ticket__data">
                <b>GARANTIE</b><br />
                {{ ticket.etat_garantie }}
              </div> -->
            </div>

            <div class="passenger-ticket__bottom"></div>
          </div>
          <div class="passenger-ticket__bottom"></div>
        </div>
      </v-row>
      <stepper :options="stepperOptions">
        <div slot="step-1">
          <h4>Select Tip:</h4>

          <v-container>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="10">
                    <v-combobox
                      v-model="categorie"
                      :items="categories"
                      label="Categorie"
                      item-text="name"
                      outlined
                      dense
                    ></v-combobox>
                  </v-col>
                  <v-col cols="2">
                    <v-dialog
                      style="float: right"
                      v-model="dialog1"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="info"
                          dark
                          small
                          fab
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add Categorie</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="categorieadd"
                                  label="Categorie"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog1 = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="addcategorie()"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-btn
                      style="margin-left: 10px"
                      color="red"
                      dark
                      small
                      fab
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-row>
                  <v-col cols="10">
                    <v-combobox
                      v-model="article"
                      :items="articles"
                      item-text="name"
                      label="Article"
                      outlined
                      dense
                    ></v-combobox>
                  </v-col>
                  <v-col cols="2">
                    <v-dialog
                      style="float: right"
                      v-model="dialog2"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="info"
                          dark
                          small
                          fab
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">Add article</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-combobox
                                  v-model="articleaddgroupe"
                                  :items="categories"
                                  label="Categorie"
                                  item-text="name"
                                  outlined
                                  dense
                                ></v-combobox>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="articleaddname"
                                  label="Article"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog2 = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="addarticle()"
                          >
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-btn
                      style="margin-left: 10px"
                      color="red"
                      dark
                      small
                      fab
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="commentaire"
                  label="Commentaire"
                ></v-text-field>
              </v-col>
              <v-layout justify-center>
                <v-card-actions>
                  <v-dialog
                    style="float: right"
                    v-model="dialog3"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="info" dark v-bind="attrs" v-on="on">
                        Add Panne
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Add Panne</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-combobox
                                v-model="panneaddgroupe"
                                :items="categories"
                                label="Categorie"
                                item-text="name"
                                outlined
                                dense
                              ></v-combobox>
                            </v-col>
                            <v-col cols="12">
                              <v-combobox
                                v-model="panneaddarticle"
                                :items="articles"
                                label="Article"
                                item-text="name"
                                outlined
                                dense
                              ></v-combobox>
                            </v-col>

                            <v-col cols="12">
                              <v-text-field
                                v-model="panneaddname"
                                label="Panne"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog3 = false"
                        >
                          Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="addpanne()">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-actions>
              </v-layout>
              <v-col cols="12">
                <v-card v-show="categorie || article" flat>
                  <v-card-text>
                    <v-container fluid>
                      <v-row>
                        <v-col
                          v-for="(panne, key) in pannes"
                          :key="key"
                          cols="12"
                          sm="4"
                          md="4"
                        >
                          <v-checkbox
                            class="animate__animated animate__bounce"
                            v-model="selected"
                            :label="panne.name"
                            color="green"
                            :value="panne.name"
                            hide-details
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <br />
        </div>

        <div slot="step-2">
          <v-col cols="12">
            <v-card style="width: 95%" class="ml-10">
              <v-card-text>
                <v-container>
                  <v-icon></v-icon>

                  <h4 class="info--text">
                    <v-icon>mdi-hand-pointing-right</v-icon>

                    Sélectionner les piéces de rechanges
                  </h4>
                  <br />
                  <br />
                  <v-expansion-panels
                    v-for="(piece, key) in piecesderechanges"
                    :key="key"
                  >
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        <template v-slot:default="{ open }">
                          <v-row no-gutters>
                            <v-col cols="4">
                              <b>Reference :{{ piece.reference }}</b>
                            </v-col>
                            <v-col cols="8" class="text--secondary">
                              <v-fade-transition>
                                <v-row no-gutters style="width: 100%">
                                  <v-col cols="6">
                                    <span v-if="open" key="0">
                                      Please complete the form
                                    </span>
                                    <span v-else key="1">
                                      <b>Marque : {{ piece.marque }}</b>
                                    </span>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-chip
                                      v-if="piece.quantite > 0"
                                      class="ma-2"
                                      color="success"
                                      text-color="white"
                                    >
                                      Disponible ({{ piece.quantite }})
                                    </v-chip>
                                    <v-chip
                                      v-else
                                      class="ma-2"
                                      color="red"
                                      text-color="white"
                                    >
                                      Non Disponible
                                    </v-chip>
                                  </v-col>
                                </v-row>
                              </v-fade-transition>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-header>

                      <v-expansion-panel-content>
                        <v-row class="mb-12">
                          <v-col cols="12" md="12" v-if="piece.quantite > 0">
                            <v-form>
                              <v-row>
                                <v-col cols="12" sm="4" md="4">
                                  <v-text-field
                                    outlined
                                    placeholder="Quantité"
                                    v-model="quantite"
                                  ></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="4" md="4">
                                  <v-text-field
                                    outlined
                                    label="Prix unitaire"
                                    placeholder="Prix unit"
                                    v-model="piece.prixunit"
                                    ref="prixpdt"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                  <v-text-field
                                    outlined
                                    label="Produit"
                                    v-model="piece.reference"
                                    ref="referencepdt"
                                  ></v-text-field>
                                </v-col>
                                <br />
                                <v-col cols="12" sm="12" md="12">
                                  <v-btn
                                    style="float: right"
                                    color="info"
                                    @click="adddiagnostic()"
                                  >
                                    Enregister
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-form>
                          </v-col>

                          <v-col cols="12" md="12" v-else>
                            <v-form>
                              Veuillez contactez l'acheteur :
                              <br />
                              <br />

                              <v-container>
                                <v-row>
                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="3"
                                    v-model="piecederech"
                                  >
                                    <v-text-field
                                      outlined
                                      label="Produit"
                                      v-model="piece.reference"
                                      ref="inputField"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col
                                    cols="12"
                                    sm="6"
                                    md="3"
                                    v-model="marquepiece"
                                  >
                                    <v-text-field
                                      outlined
                                      label="Produit"
                                      v-model="piece.marque"
                                      ref="marque"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="3">
                                    <v-text-field
                                      label="Quantité"
                                      v-model="quantitee"
                                      placeholder="Quantité"
                                      outlined
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="6" md="3">
                                    <!-- <v-text-field
                                      label="Acheteur"
                                      v-model="email"
                                      type="email"
                                      placeholder="Acheteur"
                                      outlined
                                    ></v-text-field> -->
                                    <v-combobox
                                      v-model="email"
                                      :items="acheteursemails"
                                      label="email"
                                      item-text="email"
                                      outlined
                                    ></v-combobox>
                                  </v-col>
                                </v-row>
                              </v-container>

                              <v-btn
                                @click="sendemaill()"
                                style="float: right"
                                color="info"
                              >
                                Envoyer Mail
                              </v-btn>
                            </v-form>
                          </v-col>
                        </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <br />
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </div>

        <div slot="step-3">
          <v-col cols="12">
            <v-card style="width: 95%" class="ml-10">
              <v-card-text>
                <v-container>
                  <v-icon></v-icon>

                  <h4 class="info--text">
                    Etat Garantie

                    <v-container fluid p0>
                      <v-radio-group v-model="etat_garantie">
                        <v-radio
                          label="garantie"
                          color="blue"
                          value="garantie"
                          id="garantie"
                        ></v-radio>
                        <v-radio
                          label="non garantie"
                          color="blue"
                          id="nn garantie"
                          value="non garantie"
                        ></v-radio>
                      </v-radio-group>
                      <v-col
                        cols="12"
                        id="garantiebutton"
                        style="display: none"
                      >
                        <v-btn
                          @click="addgarantiediag()"
                          style="float: right"
                          color="info"
                        >
                          Envoyer Mail
                        </v-btn>
                      </v-col>
                    </v-container>
                  </h4>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </div>

        <div slot="step-4">
          <v-col cols="12">
            <v-card style="width: 95%" class="ml-10">
              <v-card-text>
                <v-container>
                  <v-icon></v-icon>

                  <h4 class="info--text">Offre de prix</h4>
                  <br />
                  <v-container fluid p0>
                    <form>
                      <v-card style="width: 95%" class="ml-12">
                        <div class="col col-12">
                          <h4 class="ma-0">Client :</h4>
                          <h5 class="mt-5">
                            {{ ticket.name }} {{ ticket.prenom }}
                          </h5>
                          <address>
                            <br />
                            {{ ticket.adresse }}
                            <br /><abbr title="Work email">e-mail: </abbr
                            ><a href="mailto:#">{{ ticket.email }}</a
                            ><br /><abbr title="Work Phone">telephone:</abbr>
                            {{ ticket.telephone }}<br />
                          </address>
                        </div>
                        <br />
                        <br />
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            &nbsp;Maintenance price:
                            <v-text-field
                              outlined
                              placeholder="Prix Maintenace"
                              v-model="prixmain"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            &nbsp; Labor price: :
                            <v-text-field
                              outlined
                              placeholder="Labor price:"
                              v-model="prix_oeuvre"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            Duration Preparation per day(s):
                            <v-text-field
                              outlined
                              placeholder="Durée"
                              v-model="duree"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            last confirmation date:
                            <v-text-field
                              outlined
                              type="date"
                              placeholder="Date confirmation"
                              v-model="date_confirmation"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <br />

                        <strong> Spare parts list :</strong>
                        <div class="ml-10">
                          <v-simple-table style="width: 95%" class="ml-10">
                            <thead>
                              <tr>
                                <th class="text-left">#</th>
                                <th class="text-left">Piece de rechange</th>
                                <th class="text-left">Quantity</th>
                                <th class="text-left">Price per Unit</th>
                                <th class="text-left">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(
                                  diagnosticsel, key
                                ) in diagnosticselected"
                                :key="key"
                              >
                                <td class="pa-6">{{ key + 1 }}</td>
                                <td class="pa-6">
                                  {{ diagnosticsel.produit }}
                                </td>

                                <td>{{ diagnosticsel.quantite }}</td>

                                <td>{{ diagnosticsel.prixunit }}</td>

                                <td>1550 DT</td>
                              </tr>
                            </tbody>
                          </v-simple-table>
                          <v-col cols="12" sm="12" md="12">
                            <v-btn
                              style="float: right"
                              color="info"
                              @click="addoffre()"
                            >
                              Enregister
                            </v-btn>
                          </v-col>
                          <br />
                          <br />
                        </div>
                      </v-card>
                    </form>
                  </v-container>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </div>
      </stepper>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import Stepper from "vuejs-stepper";
import $ from "jquery";

export default {
  components: { Stepper },
  data() {
    return {
      prixmain: "",
      prix_oeuvre: "",
      duree: "",
      date_confirmation: "",

      diagnosticselected: [],
      prixpdt: "",
      referencepdtselect: "",
      etat_garantie: "",
      commentaire: "",
      garantie: "garantie",
      hors_garantie: "non garantie",
      acheteursemails: [],
      sendemail: {},
      piecederech: "",
      marquepiece: "",
      piecesderechanges: {},
      categorieadd: "",
      articleaddname: "",
      articleaddgroupe: "",
      panneaddname: "",
      panneaddgroupe: "",
      panneaddarticle: "",
      quantite: "",
      quantitee: "",
      email: "",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      selected: [],
      selectedd: "",

      ticket: {},
      stepperOptions: {
        headers: [
          { title: "etape 1" },
          { title: "etape 2" },
          { title: "etape 3" },
          // {title: 'etape 4'}
        ],
        prevText: "Previous",
        nextText: "Next",
      },
      categorie: "",
      name: "",
      article: "",
      categories: [],
      articles: [],
      articlesold: [],
      pannes: [],
      pr: {
        quantite: "",
      },

      diagnostic: {},
      pannesold: [],
      token: localStorage.getItem("token"),
    };
  },
  mounted: function () {
    $("#js-licensing").hide();
  },

  watch: {
    etat_garantie: function (val) {
      let element = { title: "etape 4" };

      if (val == "non garantie") {
        let check = this.stepperOptions.headers.includes(element, 0);

        if (this.stepperOptions.headers.includes(element, 0) == true) {
          this.stepperOptions.headers.pop(element);
        } else {
          document.getElementById("garantiebutton").style.display = "none";

          this.stepperOptions.headers.push(element);
        }
      } else {
        document.getElementById("garantiebutton").style.display = "block";

        console.log("no");
      }
    },

    categorie: function (val) {
      if (val) {
        this.selected = [];
        this.articles = this.articlesold;
        let filter = this.articles.filter((d) => d.groupe == val.name);

        this.articles = filter;
        ////
        this.selected = [];
        this.pannes = this.pannesold;
        let filter2 = this.pannes.filter((d) => d.groupe == val.name);

        this.pannes = filter2;
      }
    },
    article: function (val) {
      if (val) {
        this.selected = [];
        this.pannes = this.pannesold;
        let filter = this.pannes.filter((d) => d.article == val.name);

        this.pannes = filter;
      }
    },
  },
  created: function () {
    this.getticketById();
    this.getcategories();
    this.getarticles();
    this.getpannes();
    this.getpiecesderechanges();
    this.getacheteurs();
    this.getdiagnostic();
  },

  methods: {
    getdiagnostic() {
      HTTP.get("diagnostics/getdiagnosticsbyid/" + this.$route.params.id)
        .then((res) => {
          this.diagnosticselected = res.data;
        })
        .then((err) => console.log(err));
    },
    addgarantiediag() {
      let ticket = {
        _id: this.ticket._id,
        garantie: this.etat_garantie,
      };
      HTTP.put("tickets/updategarantieticket", ticket).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("Ticket modifié!", {
              position: "top-right",
            });

            this.$router.push("/tickets");
          }
        },
        (err) => {
          this.error = err.response.data.error;
          console.log(this.error);
        }
      );
    },
    sendemaill() {
      this.piecederech = this.$refs.inputField[0].value;
      this.marquepiece = this.$refs.marque[0].value;
      let sendemail = {
        email: this.email.email,
        quantite: this.quantitee,
        pr: this.piecederech,
        marque: this.marquepiece,
        token: this.token,
      };

      HTTP.post("diagnostics/sendmail", sendemail).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("Mail envoyé!", {
              position: "top-right",
              timeout: 5000,
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
            this.dialog1 = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getpannes() {
      HTTP.get("pannes/getpannes")
        .then((response) => {
          this.pannes = response.data;
          this.pannesold = response.data;
        })

        .then((err) => console.log(err));
    },
    getacheteurs() {
      HTTP.get("acheteurs/getacheteursemails")
        .then((response) => {
          this.acheteursemails = response.data;
        })

        .then((err) => console.log(err));
    },

    getpiecesderechanges() {
      HTTP.get("stocks/getpiecesderechanges/" + this.$route.params.id)
        .then((response) => {
          this.piecesderechanges = response.data;
        })

        .then((err) => console.log(err));
    },
    getarticles() {
      HTTP.get("pannes/getarticles")
        .then((response) => {
          this.articles = response.data;
          this.articlesold = response.data;
        })

        .then((err) => console.log(err));
    },
    getcategories() {
      HTTP.get("pannes/getcategories")
        .then((response) => {
          this.categories = response.data;
        })

        .then((err) => console.log(err));
    },
    getticketById() {
      HTTP.get("tickets/getticketbyid/" + this.$route.params.id)
        .then((res) => {
          this.ticket = res.data;
        })
        .then((err) => console.log(err));
    },
    addcategorie() {
      // let categories=this.categories;
      let categorie = {
        name: this.categorieadd,
      };
      HTTP.post("pannes/addcategorie", categorie).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("categorie ajouté!", {
              position: "top-right",
              timeout: 5000,
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
            this.dialog1 = false;

            this.categorieadd = "";
            this.getcategories();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addarticle() {
      // let articles=this.articles;
      let article = {
        name: this.articleaddname,
        groupe: this.articleaddgroupe.name,
      };
      HTTP.post("pannes/addarticle", article).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("article ajouté!", {
              position: "top-right",
              timeout: 5000,
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
            this.dialog2 = false;

            this.articleaddname = "";
            this.articleaddgroupe = "";
            this.getarticles();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addpanne() {
      // let pannes=this.pannes;
      let panne = {
        name: this.panneaddname,
        groupe: this.panneaddgroupe.name,
        article: this.panneaddarticle.name,
      };
      HTTP.post("pannes/addapanne", panne).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("Panne ajouté!", {
              position: "top-right",
              timeout: 5000,
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
            this.dialog3 = false;

            this.panneaddname = "";
            this.panneaddgroupe = "";
            this.panneaddarticle = "";
            this.getarticles();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    addoffre() {
      // let pannes=this.pannes;
      let offre = {
        ticket: this.ticket._id,
        prixmain: this.prixmain,
        prix_oeuvre: this.prix_oeuvre,
        duree: this.duree,
        date_confirmation: this.date_confirmation,
      };
      HTTP.post("offres/addoffre", offre).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("offre ajouté!", {
              position: "top-right",
              timeout: 5000,
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
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    adddiagnostic() {
      this.referencepdtselect = this.$refs.referencepdt[0].value;
      this.prixpdt = this.$refs.prixpdt[0].value;

      let diagnostic = {
        ticket: this.ticket._id,
        panne: this.selected,
        commentaire: this.commentaire,
        pr: {
          // marquepiece
          // quantite: this.quantite,
          produit: this.referencepdtselect,
          quantite: this.quantite,
          prixpdt: this.prixpdt,
        },
      };
      HTTP.post("diagnostics/adddiagnostic", diagnostic).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("diagnostic ajouté!", {
              position: "top-right",
              timeout: 5000,
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
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
