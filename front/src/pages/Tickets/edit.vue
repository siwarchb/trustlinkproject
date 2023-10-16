<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Edit Ticket</h1>
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
        <v-form @submit.prevent="updateticket()" v-model="valid" lazy-validation>

          <div>
            <v-stepper v-model="e1">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                  Fiche Client
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="e1 > 2" step="2">
                  Piéce de rechange
                </v-stepper-step>

                <!-- <v-stepper-step step="3"> Garantie </v-stepper-step> -->
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-12" height="200px">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="ticket.name"
                            :rules="nameRules"
                            :counter="10"
                            label="Name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="ticket.prenom"
                            :rules="prenomRules"
                            :counter="10"
                            label="Last Name"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="ticket.email"
                            :rules="emailRules"
                            label="E-mail"
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
                  </v-card>
                  <br />

                  <v-btn color="primary" @click="e1 = 2; updateclient(ticket.client_id);"> Continue </v-btn>

                  <router-link to="/tickets">
 <v-btn text> Back </v-btn> </router-link>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-12" height="1050px">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="4">
                          <v-subheader>Number ticket</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="numero"
                            v-model="ticket.numero"
                            :rules="champRules"

                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-subheader>Type client</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                                outlined
                                label="Type Revendeur"
                                v-model="ticket.typerevendeur"
                                :rules="champRules"
                                :items="ticket.typerevendeurs"
                              ></v-select>
                        </v-col>

                        <v-row v-if="ticket.typerevendeur == 'Revendeur'">
                          <v-col cols="4">
                            <v-subheader>Revendeur</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              label="revendeur"
                              v-model="ticket.revendeur"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>

                          <v-col cols="4">
                            <v-subheader>Date Facture</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.datefacture"
                              type="date"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-subheader>Numero facture</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.numerofacture"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row v-else>
                          <v-col cols="4">
                            <v-subheader>Client Final</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              
                              v-model="ticket.revendeur"
                              :items="revendeurs"
                              label="client final"
                              :item-text="item => `${item.name} - ${item.prenom}`"
                              item-value="name"
                              :rules="champRules"
                              id="clientfinale"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="4">
                            <v-subheader>Num serie /Num lot</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.numlotounumserie"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>
                          <v-col cols="4">
                            <v-subheader>Product Type</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-select
                              v-model="ticket.typeproduit"
                              :items="ticket.typeproduits"
                              :rules="champRules"

                              label="Product Type"
                              item-text="produit"
                              item-value="produit"
                            ></v-select>
                          </v-col>
                          <v-col cols="4">
                            <v-subheader>Device brand</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.marqueappareil"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>

                          <v-col cols="4">
                            <v-subheader>Device model Appareil</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.modeleappareil"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>

                          <v-col cols="4">
                            <v-subheader>Delivery</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.livreur"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>

                          <v-col cols="4">
                            <v-subheader>Représentant</v-subheader>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="ticket.representant"
                              :rules="champRules"

                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-row>
                    </v-container>
                  </v-card>
                  <br />

                  <v-btn color="primary"  :disabled="!valid" @click="updateticket()">
                    Add
                  </v-btn>

                  <v-btn @click="e1 = 1" text> Cancel </v-btn>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </div>
        </v-form>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import moment from "moment";

export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      e1: "1",

      ticket: {
        revendeurs: [],
        typeproduits: ["machine", "autre"],
        typerevendeurs: ["Client final", "Revendeur"],

        valid: false,
        name: "",
        nameRules: [
          (v) => !!v || "nom est obligatoire",
          (v) =>
            (v && v.length <= 20) || "nom doit etre moin de 20 characters",
        ],
        champRules: [
          (v) => !!v || "champ est obligatoire",
         
        ],
        prenom: "",
        prenomRules: [
          (v) => !!v || "prenom est obligatoire",
          (v) =>
            (v && v.length <= 20) || "prenom must be less than 10 characters",
        ],
        email: "",
        emailRules: [
          (v) => !!v || "E-mail est obligatoire",
          (v) => /.+@.+/.test(v) || "E-mail doit etre valid",
        ],

        telephone: "",
        telephoneRules: [
          (v) => !!v || "telephone est obligatoire",
          (v) => (v && v.length <= 8) || "Name must be less than 8 characters",
        ],

        adresse: "",
        adresseRules: [(v) => !!v || "adresse est obligatoire"],
        numero: "",
        revendeur: "",
        client_id: "",
        datefacture: "",
        numerofacture: "",
        marqueappareil: "",
        modeleappareil: "",
        etat_garantie: "",
        typeproduit: "",
        typerevendeur: "",
        etat: "ouverte",
        datereception: new Date(),
        statutaffectation: "non affecté",
        numlotounumserie: "",
        representant: "",
        livreur: "",
      },
    };
  },
  created: function () {
  this.getTicketById();
  this.getclientfinal();
  this.gettypepr();
  },
  methods: {


    gettypepr() {
      HTTP.get("stocks/gettypepr")
        .then((response) => {
          this.typeproduits = response.data;
        })

        .then((err) => console.log(err));
    },
    getclientfinal() {
      HTTP.get("clients/getclients")
        .then((response) => {
          // response.data.forEach((client) => {
   this.revendeurs = response.data;
              this.revendeursold = response.data;
            // if (client.email != this.ticket.email) {

            //   client.name = this.ticket.name,
            //   client.prenom = this.ticket.prenom,
            //   client.adresse = this.ticket.adresse,
            //   client.telephone = this.ticket.telephone,
            //   client.email = this.ticket.email,

            
            //   response.data.push(client);
            //   this.revendeurs = response.data;

            //   this.revendeursold = response.data;
            // } else {

            //   console.log("hi");
            //   this.revendeurs = response.data;
            //   this.revendeursold = response.data;
            // }


          // });
          // this.revendeurs = response.data;
          // this.revendeursold = response.data;
        })
    },
    getTicketById() {
      HTTP.get("tickets/getrapportbyticket/" + this.$route.params.id).then(
        (res) => {
          this.ticket.name = res.data.client_id["name"];
          this.ticket.prenom = res.data.client_id["prenom"];
          this.ticket.email = res.data.client_id["email"];
          this.ticket.telephone = res.data.client_id["telephone"];
          this.ticket.adresse = res.data.client_id["adresse"];
          this.ticket.numero = res.data.numero;
          this.ticket.typeproduit = res.data.typeproduit;
          this.ticket.revendeur = res.data.revendeur;
          this.ticket.datefacture = moment(res.data.datefacture).format(
            "YYYY-MM-DD"
          );

          this.ticket.numerofacture = res.data.numerofacture;
          this.ticket.marqueappareil = res.data.marqueappareil;
          this.ticket.modeleappareil = res.data.modeleappareil;
          this.ticket.etat_garantie = res.data.etat_garantie;
          this.ticket.etat = res.data.etat;
          this.ticket.numlotounumserie = res.data.numlotounumserie;
          this.ticket.livreur = res.data.livreur;
          this.ticket.representant = res.data.representant;
          this.ticket.typerevendeur = res.data.typerevendeur;
          this.ticket.client_id = res.data.client_id["_id"];

        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },


    updateclient(id) {

      let client = {
        name: this.ticket.name,
        prenom: this.ticket.prenom,
        email: this.ticket.email,
        telephone: this.ticket.telephone,
        adresse: this.ticket.adresse,
        _id:id
      };
      HTTP.put("clients/editclient", client).then(
        (res) => {
          if (res.status === 200) {
          console.log("client modifiéé");

          }
        },
        (err) => {
          this.error = err.response.data.error;
          console.log(this.error);
        }
      );
    },

    updateticket() {
      let datefacture ="";
      if(this.ticket.typerevendeur == 'Revendeur'){
       datefacture = this.ticket.datefacture
      }else{
      datefacture = ""
      }
      let ticket = {
        name: this.ticket.name,
        prenom: this.ticket.prenom,
        email: this.ticket.email,
        telephone: this.ticket.telephone,
        adresse: this.ticket.adresse,
        numero: this.ticket.numero,
        revendeur: this.ticket.revendeur,
        datefacture: datefacture,
        numerofacture: this.ticket.numerofacture,
        typeproduit: this.ticket.typeproduit,
        marqueappareil: this.ticket.marqueappareil,
        modeleappareil: this.ticket.modeleappareil,
        etat_garantie: this.ticket.etat_garantie,
        etat: this.ticket.etat,
        numlotounumserie: this.ticket.numlotounumserie,
        representant: this.ticket.representant,
        livreur: this.ticket.livreur,
        datereception: this.ticket.datereception,
        typerevendeur:this.ticket.typerevendeur,
        _id: this.$route.params.id,
      };

      HTTP.put("tickets/updateticket", ticket).then(
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
  },
};
</script>

<style src="./Ticket.scss" lang="scss" />
