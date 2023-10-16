<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Edit Client</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/clients">
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
                  v-model="name"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="prenom"
                  :rules="prenomRules"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field
                  v-model="telephone"
                  :counter="8"
                  :rules="telephoneRules"
                  label="Phone"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="adresse"
                  :rules="adresseRules"
                  label="adresse"
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
    name: "",
    nameRules: [(v) => !!v || "Name est obligatoire"],

    prenom: "",
    prenomRules: [(v) => !!v || "prenom est obligatoire"],

    role: "",
    roleRules: [(v) => !!v || "Role est obligatoire"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail est obligatoire",
      (v) => /.+@.+/.test(v) || "E-mail doit etre valide",
    ],

    telephone: "",
    telephoneRules: [
      (v) => !!v || "telephone est obligatoire",
      (v) => (v && v.length <= 20) || "Name must be less than 8 characters",
    ],
    adresse: "",
    adresseRules: [(v) => !!v || "adresse est obligatoire"],

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  created: function () {
    this.getclientById();
  },

  methods: {
    getclientById() {
      HTTP.get("clients/getclientbyid/" + this.$route.params.id).then(
        (res) => {
          this.email = res.data.email;
          this.name = res.data.name;
          this.prenom = res.data.prenom;
          this.adresse = res.data.adresse;
          this.telephone = res.data.telephone;
        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },
    update() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let client = {
          email: this.email,
          name: this.name,
          prenom: this.prenom,
          telephone: this.telephone,
          adresse: this.adresse,
          id: this.$route.params.id,
        };
        HTTP.put("clients/editclient", client).then(() => {
          this.$toast.success("Client ajouté!", {
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

          this.$router.push("/clients");
        });
      }
    },
  },
};
</script>
