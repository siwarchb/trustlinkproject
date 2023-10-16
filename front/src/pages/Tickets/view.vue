<template>
  <v-container fluid>
    <div class="container">
      <v-row no-gutters class="d-flex justify-space-between mt-30 mb-6">
        <h1 class="page-title">Reception Sheet</h1>
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


      <div class="row gutters" id="invoiceholder">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="card">
            <div class="card-body p-0">
              <div class="invoice-container">
                <div class="invoice-header">
                  <!-- Row start -->
                  <div class="row gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div class="custom-actions-btns mb-5">
                        <h2>Reception sheet</h2>
                      </div>
                    </div>
                  </div>
                  <!-- Row end -->
                  <!-- Row start -->
                  <div class="row gutters">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div class="col-md-6 col-12">
                        <img
                          src="../../assets/client.png"
                          alt="Logo"
                          style="width: 150px"
                        />
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                      <address class="text-right">
                        <h6>
                          Tunisie, 54 rue du mercure Z.I ben arous 201 Ben Arous
                          <br />
                          e-mail: email@example.com,<br />
                          phone: +216 70 029 400,<br />
                          fax: +216 70 029 400,<br />
                        </h6>
                      </address>
                    </div>
                  </div>
                  <!-- Row end -->
                  <!-- Row start -->
                  <div class="row gutters">
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                      <div class="invoice-details">
                        <v-toolbar-title class="tollbartitle"
                          >Customer details</v-toolbar-title
                        >
                        <br />
                        <address>
                          <h6>
                            <span>Name : {{ ticket["client_id"].name }} </span>
                            <br />

                            <span
                              >Last Name : {{ ticket["client_id"].prenom }}
                            </span>
                            <br />
                            <span
                              >Adress : {{ ticket["client_id"].adresse }}
                            </span>
                            <br />

                            <span
                              >Phone :
                              {{ ticket["client_id"].telephone }} </span
                            ><br />

                            <span
                              >Email : {{ ticket["client_id"].email }}
                            </span>
                          </h6>
                        </address>
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                      <div class="invoice-details">
                        <div class="invoice-num">
                          <div>
                            <h6>
                              Date Réception :
                              {{ ticket.datereception | formatDate }}
                            </h6>
                            <h6>
                              warranty :
                              <v-checkbox
                                label="oui"
                                color="oui"
                                value="oui"
                                hide-details
                              ></v-checkbox>
                              <v-checkbox
                                label="non"
                                color="non"
                                value="non"
                                hide-details
                              ></v-checkbox>
                            </h6>
                          </div>

                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Row end -->
                </div>
                &nbsp;
                <table class="table-main">
          <thead>    
              <tr class="tabletitle">
                <th style="text-align: center;">NUMBER TICKET</th>
                <th style="text-align: center;">Name client </th>
                <th style="text-align: center;">Product Type</th>
                <th style="text-align: center;">   </th>

                <th style="text-align: center;">Brand  </th>
                <th style="text-align: center;">   </th>

                <th style="text-align: center;">Device model </th>
                <th style="text-align: center;">   </th>

                <th style="text-align: center;">Delivery  </th>
                <th style="text-align: center;">   </th>

                <th style="text-align: center;">Representing   </th>
                <th style="text-align: center;">   </th>

                <th style="text-align: center;">Bar code   </th>

              </tr>
          </thead>
          <tr class="list-item"  v-for="(element, key) in listetickets"
                  :key="key"
              >
            <td data-label="Type" style="text-align: center;">{{ element.numero }}</td>
            <td data-label="Description" style="text-align: center;">{{ ticket["client_id"].name }}</td>
            <td data-label="Quantity" style="text-align: center;">{{ element.typeproduit }}</td>
            <td data-label="Taxable Amount" style="text-align: center;">  </td>

            <td data-label="Unit Price" style="text-align: center;" >{{ element.marqueappareil }}</td>
            <td data-label="Taxable Amount" style="text-align: center;">  </td>

            <td data-label="Taxable Amount" style="text-align: center;"> {{ element.modeleappareil }}</td>
            <td data-label="Taxable Amount" style="text-align: center;">  </td>

            <td data-label="Taxable Amount" style="text-align: center;"> {{ element.livreur }}</td>
            <td data-label="Taxable Amount" style="text-align: center;">  </td>

            <td data-label="Taxable Amount" style="text-align: center;">  {{ element.representant }}</td>
            <td data-label="Taxable Amount" style="text-align: center;">  </td>

            <td data-label="Taxable Amount" style="text-align: center;">   <barcode
                          :value="element.numero"
                          :height="40"
                          :width="2"
                        >
                          Show this if the rendering fails.
                        </barcode></td>

          </tr>
         
          </table>
             
                <!-- Row end -->
              </div>

              <br />
              <P><HR></HR></P>

              <v-col cols="12" sm="12" md="12">
                Signature:
                <v-textarea disabled></v-textarea>
              </v-col>
            </div>
          </div>
        </div>
      </div>
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
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import $ from "jquery";

import VueBarcode from "vue-barcode";

export default {
  data() {
    return {
      ticket: {},
      pannes: [],
      listetickets: {},
    };
  },
  components: {
    // barcode: VueBarcode,
  },

  created: function () {
    this.getticketById();
    // this.getpanneByticket();
    // this.getticketbyclient();
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
      const html = this.$refs.content.innerHTML;
      var myWindow = window.open("", "", "width=400,height=300");
      myWindow.document.write(html);

      myWindow.document.close();
      myWindow.focus();
      myWindow.print();
      myWindow.close();
    },

    

    getticketById() {
      console.log(this.$route.params.id);

      HTTP.get("tickets/getticketbyid/" + this.$route.params.id)
        .then((res) => {
          this.ticket = res.data;
          this.listetickets = this.ticket["tickets"];
        })
        .then((err) => console.log(err));
    },

    
  },
};
</script>

<style src="./fiche.scss" lang="scss" />
