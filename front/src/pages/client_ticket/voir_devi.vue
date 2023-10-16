<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h3 class="page-title">show Quote</h3>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/client_area">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Back</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <body>
            <div id="invoiceholder">
              <div id="invoice" class="effect2">
                <div id="invoice-top">
                  <div class="logo">
                    <img src="../../assets/client.png" alt="Logo" />
                  </div>
                  <div class="title">
                    <h1>
                      Quote #<span class="invoiceVal invoice_num">{{
                        devi.ticket_id.numero
                      }}</span>
                    </h1>
                    <p>
                      Release date:
                      <span id="invoice_date">{{
                        devi.created_at | formatDate
                      }}</span
                      ><br />
                    </p>
                    <p>
                      Date confirmation:
                      <span id="invoice_date">{{
                        devi.date_confirmation | formatDate
                      }}</span
                      ><br />
                    </p>
                  </div>
                  <!--End Title-->
                </div>
                <!--End InvoiceTop-->

                <div id="invoice-mid">
                  <!-- <div id="message">
        <h2>Hello {{devi.client_id.name}} {{devi.client_id.prenom}},</h2>
      </div> -->
                  <div class="cta-group mobile-btn-group">
                    <a href="javascript:void(0);" class="btn-primary"
                      >Approve</a
                    >
                    <a href="javascript:void(0);" class="btn-default">Reject</a>
                  </div>
                  <div class="clearfix">
                    <div class="col-left">
                      <div class="clientlogo">
                        <img
                          src="https://cdn3.iconfinder.com/data/icons/daily-sales/512/Sale-card-address-512.png"
                          alt="Sup"
                        />
                      </div>
                      <div class="clientinfo">
                        <h2 id="supplier">{{ devi.ticket_id.numero }}</h2>
                      </div>
                    </div>
                    <div class="col-right">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>
                              <span>Adress</span
                              ><label id="invoice_total"
                                >client adress</label
                              >
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>phone</span
                              ><label id="currency"> phone </label>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Fax </span
                              ><label id="payment_term"> phone</label>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>Email</span
                              ><label id="invoice_type">client@client.tn</label>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <!--End Invoice Mid-->

                <div id="invoice-bot">
                  <div id="table">
                    <table class="table-main">
                      <thead>
                        <tr class="tabletitle">
                          <th>ID</th>
                          <th>piece of rechange</th>
                          <th>quantity</th>
                          <th>unit price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tr
                        class="list-item"
                        v-for="(element, key) in devi.piecesderechanges"
                        :key="key"
                      >
                        <td data-label="Type" class="tableitem">
                          {{ key + 1 }}
                        </td>
                        <td data-label="Description" class="tableitem">
                          {{ element.produit }}
                        </td>
                        <td data-label="Quantity" class="tableitem">
                          {{ element.quantite }}
                        </td>
                        <td data-label="Unit Price" class="tableitem">
                          {{ element.prixunit }}
                        </td>
                        <td data-label="Taxable Amount" class="tableitem">
                          {{ element.prixunit * element.quantite }}
                        </td>
                      </tr>

                      <tr class="tabletitle">
                        <th>Labor price:</th>
                        <th></th>
                        <th></th>
                        <th></th>

                        <th class="tableitem">{{ devi.prix_oeuvre }} dt</th>
                      </tr>
                      <tr class="tabletitle">
                        <th> maintenance price</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th class="tableitem">{{ devi.prixmain }} dt</th>
                      </tr>

                      <tr class="list-item total-row">
                        <th colspan="4" class="tableitem">Amount HT</th>
                        <td data-label="Grand Total" id="val">
                          {{ totalPrice }} dt
                        </td>
                      </tr>

                      <tr class="list-item total-row">
                        <th colspan="4" class="tableitem">Amount TTC</th>
                        <td data-label="Grand Total" id="val">
                          {{ totalttc }} dt
                        </td>
                      </tr>
                    </table>
                  </div>
                  <!--End Table-->
                </div>
                <!--End InvoiceBot-->
                <footer>
                  <div id="legalcopy" class="clearfix">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp;<h7 class="col-center"
                      >This quote is valid for 15 days
                      <span class="email"
                        ><a>,thank you for confirming this quote .</a></span
                      >
                    </h7>
                  </div>
                </footer>
              </div>
              <!--End Invoice-->
            </div>
            <!-- End Invoice Holder-->

            <div class="text-center">
              <div>
                <v-btn
                  v-show="devi.etat_confirmation == 'en attente'"
                  class="ma-2"
                  color="success"
                  @click="acceptoffre()"
                >
                  Accept
                  <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </v-btn>

                <v-btn
                  @click="refuseoffre()"
                  v-show="devi.etat_confirmation == 'en attente'"
                  class="ma-2"
                  color="red"
                  dark
                >
                  Refuse
                  <v-icon dark right> mdi-cancel </v-icon>
                </v-btn>

                <v-btn
                  @click="printContent('invoiceholder')"
                  class="ma-2"
                  color="primary"
                >
                  <v-icon left dark> mdi-cloud-upload </v-icon>Print
                </v-btn>
              </div>
            </div>
          </body>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import $ from "jquery";
import { HTTP } from "@/axios";
import Swal from "sweetalert2";
import Toast from "sweetalert2";

export default {
  data() {
    return {
      devi: [],
      total: 0,
      totalttcc: 0,
    };
  },

  created() {
    this.getdevi();
  },
  computed: {
    totalPrice() {
      for (let p of this.devi.piecesderechanges) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total += parseInt(p.prixunit) * parseInt(p.quantite);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.total += parseInt(this.devi.prix_oeuvre);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.total += parseInt(this.devi.prixmain);

      return this.total;
    },

    // eslint-disable-next-line vue/return-in-computed-property
    totalttc() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalttcc = parseInt(this.total) * 1.19;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.totalttcc += 1;

      return this.totalttcc;
    },
  },

  methods: {
    printContent(el) {
      var restorepage = $("body").html();
      var printcontent = $("#" + el).clone();
      var enteredtext = $("#text").val();
      $("body").empty().html(printcontent);
      window.print();
      $("body").html(restorepage);
    },
    getdevi() {
      HTTP.get("offres/getdevibyid/" + this.$route.params.id)
        .then((res) => {
          this.devi = res.data;
        })
        .then((err) => console.log(err));
    },
    acceptoffre() {
      let oldoffre = {
        _id: this.devi._id,
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
          HTTP.put("offres/acceptoffreclient", oldoffre).then((response) => {
            console.log(response);
            this.$toast.success("offre accepté!", {
              position: "top-right",
            });
          });
        }
        // this.$router.push("/client_area");
        this.getdevi();
        window.location.reload();
      });
    },
    refuseoffre() {
      let oldoffre = {
        _id: this.devi._id,
      };

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",

        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, refuse!",
      }).then((result) => {
        if (result.isConfirmed) {
          HTTP.put("offres/refuseoffreclient", oldoffre).then((response) => {
            console.log(response);
            this.$toast.success("offre refusé!", {
              position: "top-right",
            });
          });
        }
        this.getdevi();
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped src="./devie.scss" lang="scss" />
