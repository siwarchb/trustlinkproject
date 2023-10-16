<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Add Client</h1>
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
          <v-form ref="form" v-model="valid">
            <v-row>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="name"
                  :counter="20"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="4">
                <v-text-field
                  v-model="prenom"
                  :counter="20"
                  :rules="prenomRules"
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4" md="4">
                <v-text-field
                  v-model="email"
                  required
                  :rules="[
                    (v) => /.+@.+/.test(v) || 'E-mail doit etre valid',
                    existingMail,
                  ]"
                  :messages="mailMessage"
                  v-on:keyup="emailExists(email)"
                  label="E-mail"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="telephone"
                  :counter="8"
                  :rules="telephoneRules"
                  label="Phone"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="adresse"
                  :counter="20"
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
              @click="validate"
            >
              Add
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
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name est obligatoire"],

    prenom: "",
    prenomRules: [(v) => !!v || "prenom est obligatoire"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail est obligatoire",
      (v) => /.+@.+/.test(v) || "E-mail doit etre valid",
    ],
    existingMail: () => true || this.mailMessage,
    mailMessage: "",
    telephone: "",
    telephoneRules: [
      (v) => !!v || "telephone est obligatoire",
      (v) => (v && v.length <= 8) || "telephone doit avoir 8 characters",
    ],

    adresse: "",
    adresseRules: [(v) => !!v || "adresse est obligatoire"],
  }),

  methods: {
    emailExists(mail) {
      if (mail !== "") {
        HTTP.get("clients/getemail/" + mail)
          .then((response) => {
            console.log(response.data);
            if (response.data == "adresse mail existe") {
              console.log(response.data);
              this.mailMessage = response.data;
              this.existingMail = false;
            } else {
              this.mailMessage = "";
              this.existingMail = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let client = {
          email: this.email,
          name: this.name,
          telephone: this.telephone,
          adresse: this.adresse,
          prenom: this.prenom,
        };
        HTTP.post("clients/addclient", client).then(() => {
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
