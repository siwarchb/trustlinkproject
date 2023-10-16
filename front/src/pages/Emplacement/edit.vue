<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Edit piece de rechange</h1>
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
                  v-model="nom"
                  :rules="champRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="code"
                  :rules="champRules"
                  label="code"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-select
                  label="Type"
                  v-model="type"
                  :items="items"
                  :rules="champRules"
                  return-object
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="capacite"
                  :counter="8"
                  :rules="champRules"
                  label="capacite"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <br />

            <v-btn
              style="margin-right: 5px"
              :disabled="!valid"
              color="success"
              @click="update"
            >
              Edit
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
  data: () => ({
    select: "",
    valid: true,

    champRules: [(v) => !!v || "Ce champ est obligatoire"],
    items: ["Réception", "Préparation", "Stockage"],
    type: "",
    capacite: "",
    code: "",
    nom: "",
  }),
  created: function () {
    this.getemplacementbyid();
    this.getemplacements();
  },

  methods: {
    getemplacementbyid() {
      HTTP.get("emplacements/getemplacementbyid/" + this.$route.params.id).then(
        (res) => {
          this.type = res.data.type;
          this.nom = res.data.nom;
          this.capacite = res.data.capacite;
          this.code = res.data.code;
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
          type: this.type,
          nom: this.nom,
          capacite: this.capacite,
          code: this.code,
          id: this.$route.params.id,
        };
        HTTP.put("emplacements/editemplacement", pr).then(() => {
          this.$toast.success("emplacement modifié!", {
            position: "top-right",
            timeout: 1000,
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

          this.$router.push("/emplacements");
        });
      }
    },
  },
};
</script>
