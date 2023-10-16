<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Contrats</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addcontrat">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add Contract</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-2 pb-0 white--text info">
              <p class="white--text">List of contracts</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-0">
                    <tr>
                      <th class="text-left pa-6">Reference</th>
                      <th class="text-left">Client</th>
                      <th class="text-left">Start Day</th>
                      <th class="text-left">End Day</th>
                      <th class="text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(contrat, key) in contrats" :key="key">
                      <td class="pa-6">{{ contrat["Reference"] }}</td>
                      <td class="pa-6">{{ contrat["client_id"]["name"] }}</td>
                      <td class="pa-6">
                        {{ contrat["date_debut"] | formatDate }}
                      </td>
                      <td class="pa-6">
                        {{ contrat["date_fin"] | formatDate }}
                      </td>
                      <td class="pa-6">
                        <router-link
                          :to="{
                            name: 'detailscontrat',
                            params: { id: contrat._id },
                          }"
                        >
                          <v-icon color="blue">mdi-eye</v-icon>
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
      contrats: [],
    };
  },

  computed: {
    searchFunction() {
      return this.contrats.filter((item) => {
        return (
          item.reference.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  created() {
    this.getcontrats();
  },

  methods: {
    getcontrats() {
      HTTP.get("contrats/getcontrats")
        .then((response) => {
          this.contrats = response.data;
          console.log(this.contrats);
        })

        .then((err) => console.log(err));
    },
  },
};
</script>

<!-- <style src="./Dashboard.scss" lang="scss" /> -->
