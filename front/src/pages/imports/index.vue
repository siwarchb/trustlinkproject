<template>
  <v-container fluid>
    <section class="py-8 bg-light-primary">
      <div class="container">
        <div class="row justify-content-center text-center mb-5">
          <div class="col-xl-11 col-lg-4 col-sm-10">
            <h1 style="color: #0f78cc; font-size: 45px">Liste des imports</h1>
          </div>
        </div>

        <div
          class="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center justify-content-center px-xl-6 aos-init aos-animate"
          data-aos="fade-up"
        >
          <div class="col my-3">
            <div class="card border-hover-primary hover-scale">
              <div class="card-body">
                <div class="text-primary mb-5">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M8,3 L8,3.5 C8,4.32842712 8.67157288,5 9.5,5 L14.5,5 C15.3284271,5 16,4.32842712 16,3.5 L16,3 L18,3 C19.1045695,3 20,3.8954305 20,5 L20,21 C20,22.1045695 19.1045695,23 18,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,5 C4,3.8954305 4.8954305,3 6,3 L8,3 Z"
                        fill="currentColor"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M11,2 C11,1.44771525 11.4477153,1 12,1 C12.5522847,1 13,1.44771525 13,2 L14.5,2 C14.7761424,2 15,2.22385763 15,2.5 L15,3.5 C15,3.77614237 14.7761424,4 14.5,4 L9.5,4 C9.22385763,4 9,3.77614237 9,3.5 L9,2.5 C9,2.22385763 9.22385763,2 9.5,2 L11,2 Z"
                        fill="currentColor"
                      ></path>
                      <rect
                        fill="currentColor"
                        opacity="0.3"
                        x="10"
                        y="9"
                        width="7"
                        height="2"
                        rx="1"
                      ></rect>
                      <rect
                        fill="currentColor"
                        opacity="0.3"
                        x="7"
                        y="9"
                        width="2"
                        height="2"
                        rx="1"
                      ></rect>
                      <rect
                        fill="currentColor"
                        opacity="0.3"
                        x="7"
                        y="13"
                        width="2"
                        height="2"
                        rx="1"
                      ></rect>
                      <rect
                        fill="currentColor"
                        opacity="0.3"
                        x="10"
                        y="13"
                        width="7"
                        height="2"
                        rx="1"
                      ></rect>
                      <rect
                        fill="currentColor"
                        opacity="0.3"
                        x="7"
                        y="17"
                        width="2"
                        height="2"
                        rx="1"
                      ></rect>
                      <rect
                        fill="currentColor"
                        opacity="0.3"
                        x="10"
                        y="17"
                        width="7"
                        height="2"
                        rx="1"
                      ></rect>
                    </g>
                  </svg>
                </div>
                <h6 class="font-weight-bold mb-3">Clients</h6>
                <p class="text-muted mb-0">
                  <v-btn
                    color="secondary"
                    class="ma-2 white--text"
                    v-on:click="downloadCSVData"
                  >
                    Exporter Structure
                    <v-icon right dark> mdi-tray-arrow-up </v-icon>
                  </v-btn>

                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="info"
                        class="ma-2 white--text"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        Importer
                        <v-icon right dark> mdi-cloud-upload </v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h6 grey lighten-2">
                        Import Client
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

                        <!-- <v-file-input
          accept='application/vnd.openxmlformats- 
                      officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          ref="file"
    show-size
    label="File input"
     @change="uploadFile"
  ></v-file-input> -->
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="importclient">
                          Valider
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </p>
              </div>
            </div>
          </div>
          <div class="col my-3">
            <div class="card border-hover-primary hover-scale">
              <div class="card-body">
                <div class="text-primary mb-5">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M22,17 L22,21 C22,22.1045695 21.1045695,23 20,23 L4,23 C2.8954305,23 2,22.1045695 2,21 L2,17 L6.27924078,17 L6.82339262,18.6324555 C7.09562072,19.4491398 7.8598984,20 8.72075922,20 L15.381966,20 C16.1395101,20 16.8320364,19.5719952 17.1708204,18.8944272 L18.118034,17 L22,17 Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M2.5625,15 L5.92654389,9.01947752 C6.2807805,8.38972356 6.94714834,8 7.66969497,8 L16.330305,8 C17.0528517,8 17.7192195,8.38972356 18.0734561,9.01947752 L21.4375,15 L18.118034,15 C17.3604899,15 16.6679636,15.4280048 16.3291796,16.1055728 L15.381966,18 L8.72075922,18 L8.17660738,16.3675445 C7.90437928,15.5508602 7.1401016,15 6.27924078,15 L2.5625,15 Z"
                        fill="currentColor"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M11.1288761,0.733697713 L11.1288761,2.69017121 L9.12120481,2.69017121 C8.84506244,2.69017121 8.62120481,2.91402884 8.62120481,3.19017121 L8.62120481,4.21346991 C8.62120481,4.48961229 8.84506244,4.71346991 9.12120481,4.71346991 L11.1288761,4.71346991 L11.1288761,6.66994341 C11.1288761,6.94608579 11.3527337,7.16994341 11.6288761,7.16994341 C11.7471877,7.16994341 11.8616664,7.12798964 11.951961,7.05154023 L15.4576222,4.08341738 C15.6683723,3.90498251 15.6945689,3.58948575 15.5161341,3.37873564 C15.4982803,3.35764848 15.4787093,3.33807751 15.4576222,3.32022374 L11.951961,0.352100892 C11.7412109,0.173666017 11.4257142,0.199862688 11.2472793,0.410612793 C11.1708299,0.500907473 11.1288761,0.615386087 11.1288761,0.733697713 Z"
                        fill="currentColor"
                        fill-rule="nonzero"
                        transform="translate(11.959697, 3.661508) rotate(-270.000000) translate(-11.959697, -3.661508) "
                      ></path>
                    </g>
                  </svg>
                </div>
                <h6 class="font-weight-bold mb-3">Piéces de rechanges</h6>
                <p class="text-muted mb-0">
                  <v-btn
                    color="secondary"
                    class="ma-2 white--text"
                    v-on:click="downloadCSVst"
                  >
                    Exporter Structure

                    <v-icon right dark> mdi-tray-arrow-up </v-icon>
                  </v-btn>
                  <v-dialog v-model="dialog1" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="info"
                        class="ma-2 white--text"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Importer
                        <v-icon right dark> mdi-cloud-upload </v-icon>
                      </v-btn>
                    </template>

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

                        <!-- <v-file-input
          accept='application/vnd.openxmlformats- 
                      officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          ref="file"
    show-size
    label="File input"
     @change="uploadFile"
  ></v-file-input> -->
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="importpiece">
                          Valider
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </p>
              </div>
            </div>
          </div>
          <div class="col my-3">
            <div class="card border-hover-primary hover-scale">
              <div class="card-body">
                <div class="text-primary mb-5">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z"
                        fill="currentColor"
                        opacity="0.3"
                      ></path>
                      <path
                        d="M12.6706167,18.7881514 L15.9697449,13.8394592 C16.1995092,13.4948127 16.1063788,13.0291607 15.7617323,12.7993963 C15.6385316,12.7172626 15.4937759,12.673434 15.3457071,12.673434 L12.659208,12.673434 L12.659208,9.69999981 C12.659208,9.28578625 12.3234215,8.94999981 11.909208,8.94999981 C11.6584431,8.94999981 11.4242696,9.07532566 11.2851703,9.28397466 L7.98604212,14.2326669 C7.75627777,14.5773134 7.84940818,15.0429654 8.19405469,15.2727297 C8.31725533,15.3548635 8.4620111,15.398692 8.61007984,15.398692 L11.296579,15.398692 L11.296579,18.3721263 C11.296579,18.7863398 11.6323654,19.1221263 12.046579,19.1221263 C12.2973439,19.1221263 12.5315174,18.9968004 12.6706167,18.7881514 Z"
                        fill="currentColor"
                        opacity="0.3"
                      ></path>
                    </g>
                  </svg>
                </div>
                <h6 class="font-weight-bold mb-3">Accessoires</h6>
                <p class="text-muted mb-0">
                  <v-btn
                    color="secondary"
                    class="ma-2 white--text"
                    v-on:click="downloadCSVacc"
                  >
                    Exporter Structure

                    <v-icon right dark> mdi-tray-arrow-up </v-icon>
                  </v-btn>

                  <v-btn color="info" class="ma-2 white--text">
                    Importer
                    <v-icon right dark> mdi-cloud-upload </v-icon>
                  </v-btn>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
          // if (res.status === 200) {
          //   Toast.fire({
          //     icon: "success",
          //     title: "file ajouté",
          //   });
          //   this.getclients();
          // }
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

    downloadCSVst() {
      let csv = "reference,marque,emplacement_id,type,quantite\n";

      const anchor = document.createElement("a");
      anchor.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
      anchor.target = "_blank";
      anchor.download = "structurestocks.csv";
      anchor.click();
    },

    downloadCSVacc() {
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

<style src="./imports.css" lang="css" />
