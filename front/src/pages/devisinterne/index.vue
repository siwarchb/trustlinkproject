<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h3 class="page-title">Devis Interne</h3>

        <br /><br />

        <v-menu offset-y> </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div id="fb-editor"></div>

          <v-divider></v-divider>
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des Offres</p>
              <br />
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Ticket</th>
                      <th class="text-left">Voir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(offre, key) in offres" :key="key">
                      <td class="pa-6">{{ offre.ticket_id["numero"] }}</td>

                      <td>
                        <router-link
                          :to="{
                            name: 'voir_devis',
                            params: { id: offre._id },
                          }"
                        >
                          <v-icon large color="blue darken-2">
                            mdi-file
                          </v-icon>
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
import Swal from "sweetalert2";
import Toast from "sweetalert2";
import jQuery from "jquery";

export default {
  data() {
    return {
      form: {
        parent_id: {
          name: "",
          prenom: "",
        },
      },

      offres: [],
      search: "",
      dialog: false,
    };
  },

  // computed: {
  //   searchFunction() {
  //     return this.offres.filter((item) => {
  //       return item.duree.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
  //     });
  //   },
  // },
  mounted() {
    jQuery(($) => {
      $("#fb-editor").formBuilder();
    });
  },
  created() {
    this.getoffres();
  },

  methods: {
    getoffres() {
      HTTP.get("offres/getoffresinterne")
        .then((response) => {
          this.offres = response.data;
          console.log(response.data);
        })

        .then((err) => console.log(err));
    },

    acceptoffre(offre) {
      let oldoffre = {
        _id: offre._id,
        client_id: offre.ticket_id.client_id,
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
          HTTP.put("offres/acceptoffre", oldoffre).then((response) => {
            console.log(response);
            this.$toast.success("offre accepté!", {
              position: "top-right",
            });
          });
        }
        this.$router.go(0);
        this.getoffres();
      });
    },

    refusoffre(offre) {
      let oldoffre = {
        _id: offre._id,
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
          HTTP.put("offres/refusoffre", oldoffre).then((response) => {
            console.log(response);
            this.$toast.success("offre refusé!", {
              position: "top-right",
            });
          });
        }
        this.$router.go(0);
        this.getoffres();
      });
    },
  },
};
</script>
