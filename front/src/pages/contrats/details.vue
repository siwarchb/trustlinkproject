<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Contracts</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/contrats">
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
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-2 pb-0 white--text info">
              <p class="white--text">contract details</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-5">
              <v-card class="mx-auto" width="1500" prepend-icon="mdi-home">
                <template v-slot:title> </template>

                <v-card-text>
                  Reference Contract : {{ contrat.Reference }} <br />
                  Number interventions : {{ contrat.nb_intervention }} <br />
                  List of Technicians :
                  <ul
                    v-for="(element, key) in contrat.listetechniciens"
                    :key="key"
                  >
                    <li>{{ element.name }}</li>
                  </ul>
                  List of Machines :
                  <ul
                    v-for="(element, key) in contrat.listemachines"
                    :key="key"
                  >
                    <li>{{ element.reference }} {{ element.marque }}</li>
                  </ul>
                  Start Day : {{ contrat.date_debut | formatDate }}<br />
                  End Day : {{ contrat.date_fin | formatDate }}
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
      contrat: {},
    };
  },
  components: {
    // barcode: VueBarcode,
  },

  created: function () {
    this.getcontratById();
  },

  methods: {
    getcontratById() {
      HTTP.get("contrats/getcontratById/" + this.$route.params.id)
        .then((res) => {
          this.contrat = res.data;
        })
        .then((err) => console.log(err));
    },
  },
};
</script>
