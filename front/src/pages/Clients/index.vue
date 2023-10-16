<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h3 class="page-title">clients</h3>

        <br /><br />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/addclient">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="secondary"
                class="text-capitalize button-shadow mr-1"
                >Add client</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card-text>
            <v-text-field
              v-model="search"
              value=""
              color="#2382bf"
              type="text"
              hide-no-data
              placeholder="Search client"
              prepend-icon="mdi-database-search"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste of clients</p>
              <br />
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Code</th>

                      <th class="text-left pa-6">Name</th>
                      <th class="text-left">Adress</th>
                      <th class="text-left">Phone</th>
                      <th class="text-left">email</th>

                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(client, key) in clients" :key="key">
                      <td class="pa-6">{{ client.code }}</td>
                      <td class="pa-6">
                        {{ client.name }} {{ client.prenom }}
                      </td>
                      <td>
                        {{ client.adresse }}
                      </td>
                      <td>{{ client.telephone }}</td>
                      <td>{{ client.email }}</td>

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
                                    name: 'updateclient',
                                    params: { id: client._id },
                                  }"
                                >
                                  Edit
                                </router-link></v-list-item-title
                              >
                            </v-list-item>
                            <v-dialog
                              v-model="dialog1"
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
                                  delete client?
                                </v-card-title>
                                <v-card-text
                                  >are you sure you want to delete this client
                                  ?</v-card-text
                                >
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue"
                                    text
                                    @click="dialog1 = false"
                                  >
                                    Back
                                  </v-btn>
                                  <v-btn
                                    color="red"
                                    text
                                    @click="deletclient(client._id)"
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
import Swal from "sweetalert2";
import Toast from "sweetalert2";

export default {
  data() {
    return {
      clients: [],
      dialog: false,
      dialog1: false,

      uploadfile: "",
      error: "",
    };
  },

  created() {
    this.getclients();
  },

  methods: {
    getclients() {
      HTTP.get("clients/getclients")
        .then((response) => {
          this.clients = response.data;
          console.log(this.clients);
        })

        .then((err) => console.log(err));
    },
    uploadFile() {
      this.uploadfile = this.$refs.file.files[0];
    },
    importclient() {
      this.dialog = false;
      const formData = new FormData();
      formData.append("file", this.uploadfile);

      HTTP.post("clients/uploadfile", formData).then(
        (res) => {
          if (res.status === 200) {
            if (res.data.title === "error") {
              {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: " Client existe déjà!",
                  footer: "",
                });
              }
            } else {
              Toast.fire({
                icon: "success",
                title: "file ajouté",
              });
              this.getclients();
            }
          }
        },
        (err) => {
          this.error = err.response.data;
        }
      );
    },
    downloadCSVData() {
      let csv = "name,prenom,email,code,telephone,adresse\n";

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "structureclient.csv";
      anchor.click();
    },
    deletclient(id) {
      HTTP.delete("clients/deleteclient/" + id).then((response) => {
        console.log(response);
        this.$toast.success("Client supprimé!", {
          position: "top-right",
        });

        location.reload();
      });
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
