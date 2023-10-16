<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Edit spare part</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/users">
              <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="text-capitalize button-shadow mr-1"
                >Back</v-btn
              >
            </router-link>
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <div style="width: 1000px; text-align: center">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="marque"
                  :rules="champRules"
                  label="Libelle"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="reference"
                  :rules="champRules"
                  label="reference"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-select
                  label="Emplacement"
                  v-model="emplacement_id"
                  :items="emplacements"
                  item-text="nom"
                  item-value="_id"
                  :rules="champRules"
                  return-object
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="prixunit"
                  :counter="8"
                  :rules="champRules"
                  label="Prix unitaire"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field
                  v-model="quantite"
                  :rules="quantiteRules"
                  label="Quantité"
                  type="number"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field
                  v-model="produit"
                  :rules="champRules"
                  label="produit"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
              ></v-checkbox> -->
            <br />

            <v-btn
              style="margin-right: 5px"
              :disabled="!valid"
              color="success"
              @click="update"
            >
              edit
            </v-btn>
          </v-form>
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      select: "",
      valid: true,
      name: "",
      champRules: [(v) => !!v || "this field is required"],
      marque: "",
      reference: "",
      emplacement_id: "",
      prixunit: "",
      quantite: "",
      produit: "",
      quantitedem: "",

      quantiteRules: [
        (v) => !!v || "quantity is required",
        (v) =>
          v <= this.emplacement_id.capaciterestante + this.quantitedem ||
          "quantite doit etre inferieur à l'emplacement",
      ],
    };
  },

  created: function () {
    this.getprById();
    this.getemplacements();
  },

  methods: {
    getemplacements() {
      HTTP.get("stocks/getemplacementsstockage")
        .then((response) => {
          console.log(response.data);
          this.emplacements = response.data;
        })
        .then((err) => console.log(err));
    },

    getprById() {
      HTTP.get("stocks/getprbyid/" + this.$route.params.id).then(
        (res) => {
          this.marque = res.data.marque;
          this.reference = res.data.reference;
          this.emplacement_id = res.data.emplacement_id;
          this.prixunit = res.data.prixunit;
          this.quantite = res.data.quantite;
          this.produit = res.data.produit;
          this.quantitedem = res.data.quantite;
        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },
    update() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let pr = {
          marque: this.marque,
          reference: this.reference,
          emplacement_id: this.emplacement_id,
          prixunit: this.prixunit,
          quantite: this.quantite,
          produit: this.produit,
          id: this.$route.params.id,
        };
        HTTP.put("stocks/editpr", pr).then(() => {
          this.$toast.success("piece de rechange modifié!", {
            position: "top-right",
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false,
          });

          this.$router.push("/stocks");
        });
      }
    },
  },
};
</script>
