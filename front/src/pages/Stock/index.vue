<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Stocks</h1>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h6 grey lighten-2">
              Import Pieces de Rechanges
            </v-card-title>

            <v-card-text>
              <br />
              <br />
              <input
                class="input-file"
                accept="application/vnd.openxmlformats- 
                      officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                @change="uploadFile"
                type="file"
                ref="file"
              />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="importpiece">
                Validate
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-menu offset-y> </v-menu>
        <v-spacer></v-spacer>
        <v-divider></v-divider>

        <!-- <v-btn style="margin-left: 1400px"
 type="button" class="btn btn-info action_btn" v-on:click="downloadCSVData">
      Exporter Structure
</v-btn> -->
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card class="support-requests mx-1 mb-1">
              <v-tabs class="pa-6 pb-0 light">
                <v-tab :href="'#tab-rechange'"> Piece de Rechange </v-tab>

                <v-tab :href="`#tab-piece`"> Piéce </v-tab>

                <v-tab-item :value="'tab-rechange'">
                  <v-card-text>
                    <v-text-field
                      v-model="search"
                      value=""
                      color="#2382bf"
                      type="text"
                      hide-no-data
                      placeholder="Recherche par produit"
                      prepend-icon="mdi-table-search"
                    ></v-text-field>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-simple-table>
                    <template>
                      <thead class="pl-2">
                        <tr>
                          <th class="text-left pa-6">Référence</th>
                          <th class="text-left">Libellé</th>
                          <th class="text-left">Product</th>
                          <th class="text-left">Quantity</th>
                          <th class="text-left">Emplacement</th>
                          <th class="text-left">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr v-for="(piece, key) in searchFunction" :key="key">
                          <td class="pa-6">{{ piece.reference }}</td>
                          <td>{{ piece.marque }}</td>
                          <td>{{ piece.produit }}</td>
                          <td>{{ piece.quantite }}</td>
                          <td class="secondary--text">
                            {{ piece.emplacement_id["type"] }}
                          </td>

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
                                        name: 'editstock',
                                        params: { id: piece._id },
                                      }"
                                    >
                                      edit
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
                                      <v-list-item-title
                                        v-bind="attrs"
                                        v-on="on"
                                        >delete</v-list-item-title
                                      >
                                    </v-list-item>
                                  </template>
                                  <v-card>
                                    <v-card-title class="text-h5">
                                      delete Piece de rechange?
                                    </v-card-title>
                                    <v-card-text
                                      >are you sure you want to delete thiste
                                      Piece {{ piece.reference }} ?</v-card-text
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
                                        @click="
                                          (dialog1 = false),
                                            deletepiece(piece._id)
                                        "
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
                  <!-- <v-card flat >
            <v-card-text>bbbb</v-card-text>

          </v-card> -->
                </v-tab-item>

                <v-tab-item :value="'tab-piece'">
                  <v-card-text>
                    <v-text-field
                      v-model="search1"
                      value=""
                      color="#2382bf"
                      type="text"
                      hide-no-data
                      placeholder="Recherche par emplacement "
                      prepend-icon="mdi-table-search"
                    ></v-text-field>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-simple-table>
                    <template>
                      <thead class="pl-2">
                        <tr>
                          <th class="text-left pa-6">Référence</th>
                          <th class="text-left">Marque</th>
                          <!-- <th class="text-left">Quantité</th> -->
                          <th class="text-left">Emplacement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(produit, key) in searchFunction1"
                          :key="key"
                        >
                          <td class="pa-6">{{ produit.reference }}</td>
                          <td>{{ produit.marque }}</td>
                          <td class="secondary--text">
                            {{ produit.emplacement_id["type"] }}
                          </td>
                          <td>
                            <v-menu> </v-menu>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-tab-item>
              </v-tabs>
            </v-card>
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
  name: "basicTables",
  data() {
    return {
      produits: [],
      piecesderechanges: [],
      search: "",
      search1: "",
      type: "",
      dialog: false,
      dialog1: false,
      typerevendeur: ["Client final", "Revendeur"],

      uploadfile: "",
    };
  },
  mounted() {
    this.type == "rechange";
  },

  created() {
    this.getproduits();
    this.getpiecesderechanges();
  },
  computed: {
    searchFunction() {
      return this.piecesderechanges.filter((item) => {
        return (
          item.produit.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },

    searchFunction1() {
      return this.produits.filter((item) => {
        return (
          item.emplacement_id.type
            .toLowerCase()
            .indexOf(this.search1.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    uploadFile() {
      this.uploadfile = this.$refs.file.files[0];
    },
    importpiece() {
      this.dialog = false;
      const formData = new FormData();
      formData.append("file", this.uploadfile);

      HTTP.post("stocks/uploadfilepiece", formData).then(
        (res) => {
          if (res.status === 200) {
            if (res.data.title === "error") {
              {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: " Piece exist!",
                  footer: "",
                });
              }
            } else {
              Toast.fire({
                icon: "success",
                title: "file added",
              });
              this.getpiecesderechanges();
            }
          }
        },
        (err) => {
          this.error = err.response.data;
        }
      );
    },
    //echantillons
    showrechanges() {
      document.body.getElementById("rechange").removeClass("active");
      document.body.getElementById("pieces").removeClass("active");

      this.type = "rechange";
    },
    getproduits() {
      HTTP.get("stocks/getstocksproduits")
        .then((response) => {
          this.produits = response.data;
        })

        .then((err) => console.log(err));
    },
    getpiecesderechanges() {
      HTTP.get("stocks/getstockspr")
        .then((response) => {
          this.piecesderechanges = response.data;
          console.log(this.piecesderechanges);
        })

        .then((err) => console.log(err));
    },

    deletepiece(id) {
      HTTP.delete("stocks/deletepiece/" + id).then((response) => {
        console.log(response);
        this.$toast.success("Piece deleted!", {
          position: "top-right",
        });

        this.$router.push("/stocks");
        location.reload();
      });
    },
    downloadCSVData() {
      let csv = "reference,marque,emplacement_id,type,quantite\n";

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "structurestocks.csv";
      anchor.click();
    },
  },
};
</script>
