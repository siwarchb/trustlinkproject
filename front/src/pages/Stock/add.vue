<template>
  <v-form v-model="valid">
    <v-container fluid class="notification-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-2">
        <h1 class="page-title">Add Piece de rechange</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/stocks">
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
              :rules="libelleRules"
              v-model="demande.marque"
              :counter="20"
              label="Libelle"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="demande.produit"
              :rules="referenceRules"
              :counter="20"
              label="reference"
              required
            ></v-text-field>
          </v-col>

          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              label="Emplacement"
              v-model="emplacement_id"
              :items="emplacements"
              item-text="nom"
              item-value="_id"
              return-object
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="quantite"
              :rules="quantiteRules"
              label="Quantite"
              type="number"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="produit"
              :rules="produitRules"
              :counter="15"
              label="produit"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" hidden>
            <v-text-field
              v-model="demande.ticket_id"
              label="reference"
              hidden
            ></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" md="8">
          <v-btn color="primary" @click="addpr" :disabled="valid == false">
            Add
          </v-btn>
          &nbsp;
          <router-link to="/demandes">
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
      demande: {},

      emplacements: [],
      valid: false,
      libelle: "",
      reference: "",
      quantite: "",
      emplacement_id: "",
      ticket_id: "",
      produit: "",
      type: "piece de rechange",
      libelleRules: [
        (v) => !!v || "Libelle is required",
        (v) => v.length <= 20 || "Libelle must be less than 20 characters",
      ],
      referenceRules: [
        (v) => !!v || "reference is required",
        (v) => v.length <= 20 || "reference must be less than 20 characters",
      ],
      quantiteRules: [
        (v) => !!v || "quantite is required",
        // (v) => v.length <= 20 || "quantite must be less than 20 characters",
        (v) =>
          v <= this.emplacement_id.capaciterestante ||
          "quantite doit etre inferieur à l'emplacement",
      ],
      typeRules: [(v) => !!v || "type is required"],
      produitRules: [(v) => !!v || "produit is required"],
    };
  },

  //   mounted() {

  //     this.emplacements = ["a","b"];

  // },
  created() {
    this.getemplacements();
    this.getdemandeById();
  },
  methods: {
    getdemandeById() {
      HTTP.get("demandestock/getdemandebyid/" + this.$route.params.id)
        .then((res) => {
          this.demande = res.data;
          console.log(this.demande);
        })
        .then((err) => console.log(err));
    },

    getemplacements() {
      HTTP.get("stocks/getemplacementsstockage")
        .then((response) => {
          console.log(response.data);
          this.emplacements = response.data;
        })
        .then((err) => console.log(err));
    },
    addpr() {
      let pr = {
        libelle: this.demande.marque,
        reference: this.demande.produit,
        produit: this.produit,
        quantite: this.quantite,
        type: "piece de rechange",
        emplacement_id: this.emplacement_id,
        demande: this.demande._id,
        ticket_id: this.demande.ticket_id,
      };
      console.log(pr);
      HTTP.post("stocks/addprdemande", pr).then((response) => {
        console.log(response.data);

        this.$toast.success("Piece de rechange ajouté!", {
          position: "top-right",
        });

        this.$router.push("/demandes");
      });
    },
  },
};
</script>
<style src="./Stock.scss" lang="scss" />
