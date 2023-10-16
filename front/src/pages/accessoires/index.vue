<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Accesoires</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addaccessoire">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add Accessoire</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">List of accessories</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">libelle</th>
                      <th class="text-left">reference</th>
                      <th class="text-left">product</th>

                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(accessoire, key) in accessoires" :key="key">
                      <td>{{ accessoire.libelle }}</td>
                      <td>{{ accessoire.reference }}</td>
                      <td>{{ accessoire.produit }}</td>

                      <td>
                        <v-menu>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon color="textColor"
                                >mdi-dots-vertical</v-icon
                              >
                            </v-btn>
                          </template>
                          <v-list>
                            <v-list-item>
                              <v-list-item-title
                                ><router-link
                                  :to="{
                                    name: 'editaccessoire',
                                    params: { id: accessoire._id },
                                  }"
                                >
                                  Edit
                                </router-link></v-list-item-title
                              >
                            </v-list-item>
                            <v-dialog
                              v-model="dialog"
                              persistent
                              max-width="390"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-list-item>
                                  <v-list-item-title v-bind="attrs" v-on="on">
                                    delete
                                  </v-list-item-title>
                                </v-list-item>
                              </template>
                              <v-card>
                                <v-card-title class="text-h5">
                                  delete accessoire?
                                </v-card-title>
                                <v-card-text
                                  >are you sure you want to delete cet
                                  accessoire ?</v-card-text
                                >
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue"
                                    text
                                    @click="dialog = false"
                                  >
                                    Back
                                  </v-btn>
                                  <v-btn
                                    color="red"
                                    text
                                    @click="deleteaccessoire(accessoire._id)"
                                  >
                                    Confirmer
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-list>
                        </v-menu>
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
      accessoires: [],
      dialog: false,
    };
  },

  computed: {
    searchFunction() {
      return this.accessoires.filter((item) => {
        return item.nom.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
  created() {
    this.getaccessoires();
  },

  methods: {
    getaccessoires() {
      HTTP.get("accessoires/getaccessoires")
        .then((response) => {
          this.accessoires = response.data;
          console.log(this.accessoires);
        })

        .then((err) => console.log(err));
    },

    deleteaccessoire(id) {
      HTTP.delete("accessoires/deleteaccessoire/" + id).then((response) => {
        console.log(response);
        this.$toast.success("accessoire supprimé!", {
          position: "top-right",
        });

        this.$router.push("/accessoires");
      });
    },
    downloadCSVData() {
      let csv = "libelle,reference,produit\n";

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "structureaccessoire.csv";
      anchor.click();
    },
  },
};
</script>

<!-- <style src="./Dashboard.scss" lang="scss" /> -->
