<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h6 class="page-title">Detail Emplacement</h6>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/emplacements">
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

      <v-row class="mb-2">
        <v-card width="100%" class="d-flex flex-row mx-3">
          <v-row no-gutters>
            <v-col lg="3" cols="12">
              <v-card-title class="pa-2 pb-4">
                <v-icon> mdi-server</v-icon> &nbsp;
                <b class="info--text">{{ emplacement.nom }}</b> &nbsp;
                <p>{{ emplacement.code }}</p>
                <br />
                <br />
              </v-card-title>
              <v-card-text class="pa-10 pt-10">
                <h3>&nbsp;&nbsp; TYPE</h3>
                <div class="location-selector">
                  <div class="text-position">
                    <h3 class="info--text">
                      &nbsp;&nbsp;{{ emplacement.type }}
                    </h3>
                  </div>
                </div>
              </v-card-text>
            </v-col>
            <v-col lg="3" cols="12">
              <v-card-title class="pa-2 pb-14"> </v-card-title>
              <v-card-text class="pa-6 pt-16">
                <h3>&nbsp; &nbsp; &nbsp; &nbsp;Capacité</h3>
                <v-row no-gutters class="action-buttons pb-4">
                  <v-col cols="12">
                    <h3 class="secondary--text">
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{{
                        emplacement.capacite
                      }}
                    </h3>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>

            <v-col lg="3" cols="12">
              <v-card-title class="pa-2 pb-14"> </v-card-title>
              <v-card-text class="pa-4 pt-16">
                <h3>&nbsp; Nombre de produit</h3>
                <v-row no-gutters class="action-buttons pb-4">
                  <v-col cols="12">
                    <h3 class="primary--text">
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      {{ emplacement.produits.length }}
                    </h3>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>

            <v-col lg="3" cols="12">
              <v-card-title class="pa-2 pb-14"> </v-card-title>
              <v-card-text class="pa-6 pt-16">
                <h3>&nbsp; &nbsp; &nbsp; Capacité Restante</h3>
                <v-row no-gutters class="action-buttons pb-4">
                  <v-col cols="12">
                    <h3 class="primary--text">
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {{ emplacement.capaciterestante }}
                    </h3>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
            <v-row>
              <v-col cols="12">
                <v-card class="mb-1">
                  <v-card-title class="pa-8 pb-8">
                    <h3 class="secondary--text">Liste des produits</h3>
                    <v-spacer></v-spacer>
                    <v-menu>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on"> </v-btn>
                      </template>
                    </v-menu>
                  </v-card-title>
                  <v-simple-table class="pa-12 pb-1">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Reference</th>
                          <th class="text-left">Marque</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in emplacement.produits" :key="item">
                          <td class="text-left">{{ item.modele }}</td>
                          <td class="text-left">{{ item.marque }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
            </v-row>
          </v-row>
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      emplacement: {},
    };
  },

  created: function () {
    this.getemplacementbyid();
  },

  methods: {
    getemplacementbyid() {
      HTTP.get("emplacements/getemplacementbyid/" + this.$route.params.id)
        .then((res) => {
          this.emplacement = res.data;
          console.log(this.emplacement);
        })
        .then((err) => console.log(err));
    },
  },
};
</script>
<style src="../Tables/Basic.vue" lang="scss"></style>
