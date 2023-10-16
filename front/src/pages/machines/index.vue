<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">machines</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addmachine">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add machine</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste of machines</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left">Modele</th>
                      <th class="text-left">Marque</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(machine, key) in machines" :key="key">
                      <td>{{ machine.modele }}</td>
                      <td>{{ machine.marque }}</td>
                      <td>{{ machine.type }}</td>

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
                                  delete machine?
                                </v-card-title>
                                <v-card-text
                                  >are you sure you want to delete this machine
                                  ?</v-card-text
                                >
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue"
                                    text
                                    @click="dialog = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="red"
                                    text
                                    @click="deletemachine(machine._id)"
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
      machines: [],
      dialog: false,
    };
  },

  computed: {
    searchFunction() {
      return this.machines.filter((item) => {
        return (
          item.modele.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  created() {
    this.getmachines();
  },

  methods: {
    getmachines() {
      HTTP.get("machines/getmachines")
        .then((response) => {
          this.machines = response.data;
        })

        .then((err) => console.log(err));
    },
    deletemachine(id) {
      HTTP.delete("machines/deletemachine/" + id).then((response) => {
        this.$toast.success("machine supprimé!", {
          position: "top-right",
        });
        this.getmachines();
        (this.dialog = false), this.$router.push("/machines");
      });
    },
  },
};
</script>
