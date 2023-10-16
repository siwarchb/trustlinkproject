<template>
  <v-form v-model="valid">
    <v-container fluid class="notification-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-2">
        <h1 class="page-title">Add Acheteur</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/acheteurs">
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
          <v-col cols="12" md="3">
            <v-text-field
              :rules="nomRules"
              v-model="nom"
              :counter="20"
              label="Name"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="prenom"
              :rules="prenomRules"
              :counter="20"
              label="Last Name"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              type="email"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="telephone"
              :rules="telephoneRules"
              :counter="15"
              label="Phone"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" md="8">
          <v-btn
            color="primary"
            @click="addacheteur"
            :disabled="valid == false"
          >
            Add
          </v-btn>
          &nbsp;
          <router-link to="/acheteurs">
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
      nom: "",
      prenom: "",
      telephone: "",
      email: "",

      nomRules: [
        (v) => !!v || " nom is required",
        (v) => v.length <= 20 || " nom must be less than 20 characters",
      ],
      prenomRules: [
        (v) => !!v || "prenom is required",
        (v) => v.length <= 20 || "prenom must be less than 20 characters",
      ],
      emailRules: [
        (v) => !!v || "email is required",
        // (v) => v.length <= 20 || "telephone must be less than 20 characters",
        // (v) => v <= this.emplacement_id.capacite || "telephone must be less than emplacement",
      ],
      telephoneRules: [(v) => !!v || "telephone is required"],
    };
  },

  methods: {
    addacheteur() {
      let acheteur = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        telephone: this.telephone,
      };
      console.log(acheteur);
      HTTP.post("acheteurs/addacheteur", acheteur).then((response) => {
        console.log(response.data);

        this.$toast.success("Acheteur ajouté!", {
          position: "top-right",
        });

        this.$router.push("/acheteurs");
      });
    },
  },
};
</script>
<!-- <style src="./Stock.scss" lang="scss" /> -->
