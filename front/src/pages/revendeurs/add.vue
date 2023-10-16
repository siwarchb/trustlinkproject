<template>
  <v-form v-model="valid">
    <v-container fluid class="notification-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Add Client</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/revendeurs">
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
        <v-form >
          <v-row class="mb-12">
            <v-col cols="4" md="4">
              <v-text-field
                v-model="nom"
                :rules="nameRules"
                :counter="10"
                label="Name"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="4" md="4">
              <v-text-field
                v-model="prenom"
                :rules="nameRules"
                :counter="10"
                label="Last Name"
                required
                outlined
              ></v-text-field>
            </v-col>


            <v-col class="d-flex" cols="4" md="4">
              <v-select v-model="type" :items="items" label="Type" outlined></v-select>
            </v-col>

            <v-col cols="4" md="4">
              <v-text-field
                v-model="adresse"
                :rules="adresseRules"
                :counter="10"
                label="Adresse"
                type="string"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="4" md="4">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                :counter="10"
                label="Email"
                type="string"
                required
                outlined
              ></v-text-field>
            </v-col>


            <v-col cols="4" md="4">
              <v-text-field
                v-model="telephone"
                :rules="telephoneRules"
                :counter="10"
                label="Phone"
                type="number"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-col cols="12" md="8">
            <v-btn color="primary" @click="addrevendeur"> A </v-btn>
            &nbsp;
            <v-btn> Back </v-btn>
          </v-col>
        </v-form>
      </v-card>
    </v-container>
  </v-form>
</template>
<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      items: ["Client final"],

      valid: false,
      nom: "",
      prenom: "",
      type: "",
      adresse: "",
      telephone: "",

      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      email: "",
    };
  },

  methods: {
      addrevendeur() {
      let revendeur = {
        nom: this.nom,
        prenom: this.prenom,
        telephone: this.adresse,
        email: this.email,
        adresse: this.adresse,
        type: this.type,
      };
      HTTP.post("revendeurs/addrevendeur", revendeur).then((response) => {
        console.log(response.data);

        this.$toast.success("revendeur ajouté!", {
          position: "top-right",
        });

        this.$router.push("/revendeurs");
      });
    },
  },
};
</script>
