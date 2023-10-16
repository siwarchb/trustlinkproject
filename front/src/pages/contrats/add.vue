<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Contrats</h1>
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
              <p class="white--text">Add Contrat</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-5">
              <v-form ref="form" v-model="contrat" lazy-validation>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="12">
                      <v-text-field
                        v-model="reference"
                        :counter="20"
                        label="Reference"
                        :rules="referenceRules"
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
                        :rules="listetechniciensRules"
                        item-value="_id"
                        v-model="listetechniciens"
                        :items="techniciens"
                        multiple
                        required
                        persistent-hint
                      ></v-select>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-select
                        :items="itemsclient"
                        v-model="client"
                        :rules="clientRules"
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
                        :rules="listemachinesRules"
                        item-text="reference"
                        item-value="_id"
                        v-model="listemachines"
                        :items="machines"
                        multiple
                        persistent-hint
                      ></v-select>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-text-field
                        label="Start Day "
                        type="date"
                        v-model="date_debut"
                        :rules="date_debutRules"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="6">
                      <v-text-field
                        label="End Date"
                        type="date"
                        v-model="date_fin"
                        :rules="date_finRules"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="6" sm="12">
                      <v-text-field
                        v-model="nb_intervention"
                        :counter="20"
                        label="Number Interventions"
                        :rules="nb_interventionRules"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <router-link to="/contrats">
                    <v-btn text> Cancel </v-btn></router-link
                  >

                  <v-btn
                    type="submit"
                    :disabled="!contrat"
                    @click="addcontrat()"
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
      nb_intervention: "",
      date_fin: "",
      date_debut: "",
      itemsclient: [],
      client: "",
      reference: "",

      referenceRules: [(v) => !!v || "Reference is required"],
      listetechniciensRules: [(v) => !!v || "choose a technician"],

      clientRules: [(v) => !!v || "choose a client"],

      listemachinesRules: [(v) => !!v || "choose a machine"],
      date_debutRules: [(v) => !!v || "Date is required"],

      date_finRules: [(v) => !!v || "Date is required"],

      nb_interventionRules: [(v) => !!v || "Number is required"],
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
          console.log(this.machines);
        })

        .then((err) => console.log(err));
    },

    addcontrat() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;

        let contrat = {
          Reference: this.reference,
          client_id: this.client,
          date_debut: this.date_debut,
          date_fin: this.date_fin,
          nb_intervention: this.nb_intervention,
          listemachines: this.listemachines,
          listetechniciens: this.listetechniciens,
        };
        HTTP.post("contrats/addcontrat", contrat).then((response) => {
          console.log(response);

          this.$toast.success("contrat ajouté!", {
            position: "top-right",
          });

          this.$router.push("/contrats");
        });
      }
    },
  },
};
</script>
