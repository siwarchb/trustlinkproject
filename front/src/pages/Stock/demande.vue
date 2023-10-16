<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">demandes stocks</h1>
        <v-menu offset-y> </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des demandes</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">user</th>
                      <th class="text-left">quantity</th>
                      <th class="text-left">reference piece</th>
                      <th class="text-left">marque piece</th>

                      <th class="text-left">Date</th>
                      <th class="text-left">status</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(demande, key) in demandes" :key="key">
                      <td class="pa-6">{{ demande.user_id["name"] }}</td>
                      <td>{{ demande.quantite }}</td>
                      <td>{{ demande.produit }}</td>
                      <td>{{ demande.marque }}</td>

                      <td>{{ demande.created_at | formatDate }}</td>
                      <td v-if="demande.etat === 'en cours'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          En cours
                        </v-chip>
                      </td>
                      <td v-else-if="demande.etat === 'traité'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          Traité
                        </v-chip>
                      </td>

                      <td>
                        <router-link
                          :disabled="demande.etat === 'traité'"
                          :to="{
                            name: 'addstock',
                            params: { id: demande._id },
                          }"
                        >
                          <v-btn
                            :disabled="demande.etat === 'traité'"
                            class="ma-9"
                            color="red"
                            dark
                          >
                            <v-icon dark> mdi-wrench-check-outline </v-icon>
                          </v-btn>
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
      demandes: [],
    };
  },

  computed: {
    searchFunction() {
      return this.demandes.filter((item) => {
        return item.etat.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  created() {
    this.getdemandes();
  },

  methods: {
    getdemandes() {
      HTTP.get("demandestock/getdemandes")
        .then((response) => {
          this.demandes = response.data;
          console.log(this.demandes);
        })

        .then((err) => console.log(err));
    },
  },
};
</script>

<!-- <style src="./Dashboard.scss" lang="scss" /> -->
