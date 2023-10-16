<template>
    <v-container fluid>

  <div class="container">
    <v-row no-gutters class="d-flex justify-space-between mt-30 mb-6">
        <h1 class="page-title">Reception sheet</h1>
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

    <div class="card" id="invoiceholder">
      <div class="card-body">
        <div id="invoice">
          <div class="toolbar hidden-print">
            <hr />
          </div>
         
          <div  class="invoice overflow-auto">
            <div  style="min-width: 600px">
              <header>
                <div class="row">
                  <div class="col">
                    <a href="javascript:;">
                      <img src="../../assets/client.png" width="80" alt="" />
                    </a>
                  </div>
                  <div class="col company-details">
                    <h2 class="name">
                      <a target="_blank" href="javascript:;"> Client </a>
                    </h2>
                    <div>
                      Tunisie, 54 rue du mercure Z.I ben arous 201 Ben Arous,<br />
                      Ben Arous Est, Ben Arous<br />
                    </div>
                    <div>+216 70 029 400</div>
                    <div>client@support.tn</div>
                  </div>
                </div>
              </header>
              <main>
                <div class="row contacts">
                  <div class="col invoice-to">
                    <h2 class="text-gray-light">Client détails</h2>
                    <h2 class="to">{{ ticket.name }} {{ ticket.prenom }}</h2>
                    <div class="address">{{ ticket.adresse }}</div>
                    <div class="address">+216 {{ ticket.telephone }}</div>
                    <div class="email">
                      <a >{{ ticket.email }}</a>
                    </div>
                  </div>
                  <div class="col invoice-details">
                    <h1 class="invoice-id">Ticket {{ ticket.numero }}</h1>
                    <div class="date">
                      Date Réception: {{ ticket.datereception | formatDate }}
                    </div>
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th class="text-left">DESCRIPTION</th>

                      <th class="text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="no">01</td>
                       
                        <td class="text-left">
                        <h3>Type client : </h3>
                      
                      </td>
                      
                      
                      <td class="total"> {{ ticket.typerevendeur }} </td>
                    </tr>


                    <tr v-if="ticket.typerevendeur == 'Client final' ">
                      <td class="no">02</td>
                      <td class="text-left">
                        <h3>Name client final</h3>
                        
                      </td>

                      <td class="total">{{ ticket.revendeur }}</td>
                    </tr>


                    <tr v-if="ticket.typerevendeur == 'Revendeur' ">
                      <td class="no">02</td>
                      <td class="text-left">
                        <h3>Nom Revendeur</h3>
                       
                      </td>

                      <td class="total">{{ ticket.revendeur }}</td>
                      </tr>
                        <tr v-if="ticket.typerevendeur == 'Revendeur' ">
                      <td class="no">03</td>
                      <td class="text-left">
                        <h3>Numero facture</h3>
                       
                      </td>

                      <td class="total">{{ ticket.numerofacture }}</td>
                    </tr>
                      <tr v-if="ticket.typerevendeur == 'Revendeur' ">
                      <td class="no">04</td>
                      <td class="text-left">
                        <h3>Date facture</h3>
                       
                      </td>

                      <td class="total">{{ ticket.datefacture | formatDate }}</td>
                    </tr>




                    <tr>
                      <td class="no">05</td>
                      <td class="text-left">
                        <h3>Product Type</h3>
                      </td>

                      <td class="total">{{ ticket.typeproduit }}</td>
                    </tr>

                    <tr>
                      <td class="no">06</td>
                      <td class="text-left">
                        <h3>Device brand</h3>
                      </td>

                      <td class="total">{{ ticket.marqueappareil }}</td>
                    </tr>


                    <tr>
                      <td class="no">06</td>
                      <td class="text-left">
                        <h3>Device model appareil</h3>
                      </td>

                      <td class="total">{{ ticket.modeleappareil }}</td>
                    </tr>



                    <tr>
                      <td class="no">07</td>
                      <td class="text-left">
                        <h3>Num lot/ Num serie</h3>
                      </td>

                      <td class="total">{{ ticket.numlotounumserie }}</td>
                    </tr>

                    <tr>
                      <td class="no">08</td>
                      <td class="text-left">
                        <h3>Représentant</h3>
                      </td>

                      <td class="total">{{ ticket.representant }}</td>
                    </tr>


                    <tr>
                      <td class="no">09</td>
                      <td class="text-left">
                        <h3>Delivery</h3>
                      </td>

                      <td class="total">{{ ticket.livreur }}</td>
                    </tr>



                    <tr>
                      <td class="no">10</td>
                      <td class="text-left">
                        <h3>Etat Ticket</h3>
                      </td>

                      <td class="total">{{ ticket.etat }}</td>
                    </tr>
                    <tr>
                      <td class="no">11</td>
                      <td class="text-left">
                        <h3>Pannes Réclamés</h3>
                      </td>

                      <td class="total">{{ ticket.pannesreclames }}</td>
                    </tr>

                    <tr>
                      <td class="no">11</td>
                      <td class="text-left">
                        <h3>Pannes Diagnosticés</h3>
                      </td>

                      <td class="total">{{ ticket.diagnostics }}</td>
                    </tr>

                  </tbody>
                  <tfoot>
                    
                  </tfoot>
                </table>

              
              </main>
            
              <v-btn
       @click="printContent('invoiceholder')"
        class="ma-2"
         color="primary"
      >
           <v-icon
        left
        dark
        center
      >
        mdi-cloud-upload
      </v-icon>Print
      </v-btn>
        
            </div>

          
            <!--DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom-->
            <div></div>
            
          </div>
          
        </div>
      </div>
    </div>
  </div>
  </v-container>
</template>
<script>
import { HTTP } from "@/axios";
import $ from 'jquery'

import { jsPDF } from "jspdf";
import moment from "moment";
export default {
  name: "App",
  data() {
    return {
      ticket: {
        name: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        numero: "",
        revendeur: "",
        datefacture: "",
        numerofacture: "",
        marqueappareil: "",
        modeleappareil: "",
        etat_garantie: "",
        typeproduit: "",
        etat: "",
        datereception: "",
        numlotounumserie: "",
        statutaffectation: "",
        livreur: "",
        representant: "",
        typerevendeur: "",
        affectepar: "",
        pannesreclames: "",
        diagnostics: "",

      },
    };
  },

  created() {
    this.getTicketById();
    this.getpanneByticket();
  },

  methods: {
 

    printContent(el){
var restorepage = $('body').html();
var printcontent = $('#' + el).clone();
var enteredtext = $('#text').val();
$('body').empty().html(printcontent);
window.print();
$('body').html(restorepage);

},
    download() {
      this.$htmlToPaper('app');
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
          this.ticket.datefacture = res.data.datefacture;
          // this.ticket.datefacture = moment(res.data.datefacture).format(
          //   "YYYY-MM-DD"
          // );
          this.ticket.numerofacture = res.data.numerofacture;
          this.ticket.marqueappareil = res.data.marqueappareil;
          this.ticket.modeleappareil = res.data.modeleappareil;
          this.ticket.etat_garantie = res.data.etat_garantie;
          this.ticket.etat = res.data.etat;

          this.ticket.datereception = moment(res.data.datereception).format(
            "YYYY-MM-DD"
          );
          this.ticket.statutaffectation = res.data.statutaffectation;
          this.ticket.livreur = res.data.livreur;
          this.ticket.representant = res.data.representant;
          this.ticket.typerevendeur = res.data.typerevendeur;
          this.ticket.etat = res.data.etat;
          this.ticket.affectepar = res.data.affectepar;
          this.ticket.numlotounumserie = res.data.numlotounumserie;
          
          this.ticket.pannesreclames = res.data.pannesreclames;
          // this.ticket.diagnostics = res.data.pannesreclames;

        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },


    getpanneByticket() {
      HTTP.get("tickets/getdiagnosticbyticket/" + this.$route.params.id).then(
        (res) => {
         
          this.ticket.diagnostics = res.data.pannes;

        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },
  },
};
</script>
<style src="./rapport.scss" lang="scss" />
