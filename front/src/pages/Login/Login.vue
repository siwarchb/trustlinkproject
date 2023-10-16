<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="9" class="main-part d-none d-md-none d-lg-flex">
          <!-- Content for main part -->
        </v-col>
        <v-col
          cols="12"
          md="3"
          class="login-part d-flex align-center justify-center"
        >
          <v-row no-gutters class="align-start">
            <v-col
              cols="12"
              class="login-part d-flex align-center justify-center flex-column"
            >
              <img src="../../assets/Trustlink.png" />
              <br />
              <br />
              <br />
              <br />
              <div class="login-wrapper pt-md-4 pt-0">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`"> S'identifier </v-tab>
                  <!-- <v-tab :href="`#tab-newUser`"> S'inscrire </v-tab> -->

                  <v-tab-item :value="'tab-login'">
                    <br />
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col cols="12" class="d-flex align-center my-8">
                            <v-divider></v-divider>
                            <!-- <span class="px-5"> or </span> -->
                            <v-divider></v-divider>
                          </v-col>
                          <v-col cols="12">
                            <div v-if="errors.length">
                              <ul>
                                <li
                                  class="invalid-feedback"
                                  v-for="error in errors"
                                  :key="error"
                                >
                                  - {{ error }}
                                </li>
                              </ul>
                            </div>
                            <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="Email Address"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="password"
                              :rules="passRules"
                              type="password"
                              label="Password"
                              hint="Au moins 8 caractères"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col class="d-flex justify-space-between">
                            <v-btn
                              class="text-capitalize"
                              large
                              :disabled="
                                password.length === 0 || email.length === 0
                              "
                              color="primary"
                              @click="login"
                            >
                              Login
                            </v-btn>
                            <router-link to="/resetpassword">
                              <v-btn
                                large
                                text
                                class="text-capitalize primary--text"
                                >Mot de passe oublié ?</v-btn
                              >
                            </router-link>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>

                  <v-tab-item :value="'tab-newUser'">
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <!-- <p class="login-slogan display-2 text-center font-weight-medium mt-10">Welcome!</p> -->
                            <!-- <p class="login-slogan display-1 text-center font-weight-medium mb-10">Create your account</p> -->
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="createFullName"
                              label="Full Name"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="createEmail"
                              :rules="emailRules"
                              label="Email Address"
                              required
                            ></v-text-field>
                            <v-text-field
                              v-model="createPassword"
                              :rules="passRules"
                              type="password"
                              label="Password"
                              hint="At least 6 characters"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col class="d-flex justify-space-between">
                            <v-btn
                              large
                              block
                              :disabled="
                                createFullName.length === 0 ||
                                createEmail.length === 0 ||
                                createPassword === 0
                              "
                              color="primary"
                              @click="register"
                            >
                              Créer votre compte
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  name: "Login",
  data() {
    return {
      errors: [],
      email: "",
      emailRules: [
        (v) => !!v || "L'e-mail est obligatoire",
        (v) => /.+@.+/.test(v) || "L'e-mail doit être valide",
      ],
      password: "",
      passRules: [
        (v) => !!v || "Le mot de passe est obligatoire",
        (v) => v.length >= 8 || "Au moins 8 caractères",
      ],
      createFullName: "",
      createEmail: "",
      createPassword: "",
    };
  },
  methods: {
    // Login method
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      HTTP.post("auth/login", user)
        .then((res) => {
          if (res.status === 200) {
            var user = [];
            user.push(res.data.user);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userData", JSON.stringify(user));
            this.$router.push("/dashboard");
          }
        })
        .catch((err) => {
          this.error = err.response.data.error;
          this.errors.push(this.error);
          console.log(this.error);
        });
    },

    // Register method
    register() {
      let user = {
        email: this.createEmail,
        name: this.createFullName,
        password: this.createPassword,
      };
      HTTP.post("auth/register", user)
        .then(() => {
          this.$toast.success("Welcome!", {
            position: "top-center",
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

          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style src="./Login.scss" lang="scss" />
