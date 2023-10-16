<template>
  <v-form v-model="valid">
    <v-container fluid class="notification-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-2">
        <h1 class="page-title">Add Accessoire</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/accessoires">
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
        <v-row class="mb-12">
          <v-col cols="12" md="4">
            <v-text-field
              :rules="nomRules"
              v-model="libelle"
              :counter="20"
              label="libelle"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="reference"
              :rules="prenomRules"
              :counter="20"
              label="reference"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="produit"
              :rules="prenomRules"
              :counter="15"
              label="produit"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" md="8">
          <v-btn
            color="primary"
            @click="addaccessoire"
            :disabled="valid == false"
          >
            Add
          </v-btn>
          &nbsp;
          <router-link to="/accessoires">
            <v-btn> Back </v-btn>
          </router-link>
        </v-col>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      valid: false,
      libelle: "",
      reference: "",
      produit: "",

      nomRules: [(v) => !!v || " champ est obligatoire"],
      prenomRules: [(v) => !!v || "champ est obligatoire"],

      telephoneRules: [(v) => !!v || "telephone est obligatoire"],
    };
  },

  methods: {
    addaccessoire() {
      let accessoire = {
        libelle: this.libelle,
        reference: this.reference,
        produit: this.produit,
      };
      console.log(accessoire);
      HTTP.post("accessoires/addaccesoire", accessoire).then((response) => {
        console.log(response.data);

        this.$toast.success("Accessoire ajouté!", {
          position: "top-right",
        });

        this.$router.push("/accessoires");
      });
    },
  },
};
</script>
<!-- <style src="./Stock.scss" lang="scss" /> -->
