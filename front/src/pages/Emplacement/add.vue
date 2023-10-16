<template>
  <v-container fluid class="notification-page">
    <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
      <h1 class="page-title">Add Emplacement</h1>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <router-link to="/emplacements">
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
    <v-card width="100%" class="pa-4 pb-6">
      <v-form v-model="valid">
        <v-row class="mb-12">
          <v-col cols="6" md="6">
            <v-text-field
              v-model="nom"
              :rules="nameRules"
              :counter="10"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" md="6">
            <v-text-field
              v-model="code"
              :rules="[(v) => !!v || 'ce champ est obligatoire', existingcode]"
              :messages="codeMessage"
              @keyup="codeExists(code)"
              :counter="10"
              label="Code"
              required
            ></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="6" md="6">
            <v-select
              v-model="type"
              :items="items"
              label="Type"
              :rules="nameRules"
            ></v-select>
          </v-col>

          <v-col cols="6" md="6">
            <v-text-field
              v-model="capacite"
              :rules="nameRules"
              :counter="10"
              label="Capacite"
              type="number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" md="8">
          <v-btn
            color="primary"
            :disabled="valid == false"
            @click="addemplacement"
          >
            A
          </v-btn>
          &nbsp;
          <v-btn> Back </v-btn>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      items: ["Réception", "Préparation", "Stockage"],

      valid: false,
      nom: "",
      code: "",
      type: "",
      capacite: "",
      produit: "",

      nameRules: [(v) => !!v || "ce champ est obligatoire"],
      existingcode: () => true || this.codeMessage,
      codeMessage: "",
      email: "",
      quantiteRules: [(v) => !!v || "E-mail is required"],
    };
  },

  methods: {
    codeExists(code) {
      if (code !== "") {
        HTTP.get("emplacements/getcode/" + code)
          .then((response) => {
            if (response.data == "code existe") {
              console.log(response.data);
              this.codeMessage = response.data;
              this.existingcode = false;
            } else {
              this.codeMessage = "";
              this.existingcode = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    addemplacement() {
      let emplacement = {
        nom: this.nom,
        code: this.code,
        produit: null,
        capacite: this.capacite,
        type: this.type,
      };
      HTTP.post("emplacements/addemplacement", emplacement).then((response) => {
        console.log(response.data);

        this.$toast.success("Emplacement ajouté!", {
          position: "top-right",
        });

        this.$router.push("/emplacements");
      });
    },
  },
};
</script>
