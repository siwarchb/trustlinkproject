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
                >Add intervention</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-2 pb-0 white--text info">
              <p class="white--text">Add intervention</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-5">
              <v-form ref="form" v-model="intervention">
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="reference"
                        :counter="20"
                        label="Reference"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12">
                      <v-select
                        outlined
                        :menu-props="{ maxHeight: '400' }"
                        label="List of technicians"
                        item-text="name"
                        item-value="_id"
                        v-model="listetechniciens"
                        :items="techniciens"
                        multiple
                        persistent-hint
                      ></v-select>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        :items="itemsclient"
                        v-model="client"
                        label="choose a client"
                        :item-text="
                          (item) =>
                            `${item.name}  ${item.prenom} (${item.code})`
                        "
                        item-value="_id"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        outlined
                        label="machine list"
                        item-text="reference"
                        item-value="_id"
                        v-model="listemachines"
                        :items="machines"
                        multiple
                        persistent-hint
                      ></v-select>
                    </v-col>

                    <v-col cols="6" sm="12">
                      <v-text-field
                        label="Date "
                        type="date"
                        v-model="date"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text> Cancel </v-btn>
                  <v-btn
                    type="submit"
                    @click="addintervention()"
                    color="primary"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      techniciens: [],
      machines: [],
      listetechniciens: [],
      listemachines: [],

      date: "",

      itemsclient: [],
      client: "",
      reference: "",
    };
  },

  created() {
    this.getmachines();

    this.getechniciens();
    this.getclients();
  },

  methods: {
    getclients() {
      HTTP.get("clients/getclients")
        .then((response) => {
          this.itemsclient = response.data;
        })

        .then((err) => console.log(err));
    },
    getechniciens() {
      HTTP.get("users/getechniciens")
        .then((response) => {
          this.techniciens = response.data;
        })

        .then((err) => console.log(err));
    },

    getmachines() {
      HTTP.get("stocks/getstocksproduits")
        .then((response) => {
          this.machines = response.data;
        })

        .then((err) => console.log(err));
    },

    addintervention() {
      let intervention = {
        Reference: this.reference,
        client_id: this.client,
        date: this.date,
        listemachines: this.listemachines,
        listetechniciens: this.listetechniciens,
      };

      HTTP.post("interventions/addintervention", intervention).then(
        (response) => {
          this.$toast.success("intervention ajouté!", {
            position: "top-right",
          });

          this.$router.push("/interventions");
        }
      );
    },
  },
};
</script>
