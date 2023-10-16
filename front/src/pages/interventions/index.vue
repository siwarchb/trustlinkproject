<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">interventions</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addintervention">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add Intervention
              </v-btn>
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-2 pb-0 white--text info">
              <p class="white--text">List of interventions</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-0">
                    <tr>
                      <th class="text-left pa-6">Reference</th>
                      <th class="text-left">Client</th>
                      <th class="text-left">Date</th>
                      <th class="text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(intervention, key) in interventions" :key="key">
                      <td class="pa-6">{{ intervention["Reference"] }}</td>
                      <td class="pa-6">
                        {{ intervention["client_id"]["name"] }}
                      </td>
                      <td class="pa-6">
                        {{ intervention["date"] | formatDate }}
                      </td>
                      <td class="pa-6">
                        <v-icon color="blue">mdi-eye</v-icon>
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
      interventions: [],
    };
  },

  computed: {
    searchFunction() {
      return this.interventions.filter((item) => {
        return (
          item.reference.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  created() {
    this.getinterventions();
  },

  methods: {
    getinterventions() {
      HTTP.get("interventions/getinterventions")
        .then((response) => {
          this.interventions = response.data;
        })

        .then((err) => console.log(err));
    },
  },
};
</script>

<!-- <style src="./Dashboard.scss" lang="scss" /> -->
