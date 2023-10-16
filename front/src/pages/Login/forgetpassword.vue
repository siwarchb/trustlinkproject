<template>
    <v-app>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="9" class="main-part d-none d-md-none d-lg-flex">
      
          </v-col>
          <v-col cols="3" class="login-part d-flex align-center justify-center">
            <v-row no-gutters class="align-start">
              <v-col
                cols="12"
                class="login-part d-flex align-center justify-center flex-column"
              >
              <img src="../../assets/Trustlink.png"/>
              <br>  <br>  <br>  <br> 
  
                <div class="login-wrapper pt-md-4 pt-0">
                  <v-form>
                           

                            <v-col>
                              <v-text-field
                                v-model="password"
                                :rules="passRules"
                                label="mot de passe "
                                type="password"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="confirmpassword"
                                :rules="confirmpassRules"
                                type="password"
                                label="confirmer mot de passe "
                                required
                              ></v-text-field>
                            
                            </v-col>
                            <v-col class="d-flex justify-space-between">
                              <v-btn
                                class="text-capitalize"
                                large
                                :disabled="
                                   password.length === 0 ||  confirmpassword.length === 0
                                "
                                color="primary"
                                @click="reset()"
                              >
                              Changer</v-btn
                              >
                              

                              <router-link to="/login">
                                <v-btn
                                large
                                text
                                class="text-capitalize primary--text"
                                >Back </v-btn
                              >
            </router-link>
                            </v-col>
                          </v-form>
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
        
        confirmpassword: "",
        password: "",
        passRules: [
          (v) => !!v || "mot de passe est obligatoire",
          (v) => v.length >= 6 || "Min 8 characters",
        ],

        confirmpassRules: [
          (v) => !!v || "confirmation mot de passe est obligatoire",
          (v) => v == this.password || "La confirmation du mot de passe ne correspond pas",
          (v) => v.length >= 6 || "Min 8 characters",

        ],
        
      };
    },
    methods: {
      reset() {
        let user = {
          token: this.$route.params.token,
          password: this.password,
        };
        HTTP.post("auth/changerpassword", user).then(() => {
          this.$toast.success("votre mot de passe à été changé!", {
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
  
          this.$router.push("/login");
        });
      },
  
      register() {
        let user = {
          email: this.createEmail,
          name: this.createFullName,
          password: this.createPassword,
        };
        HTTP.post("auth/register", user).then(() => {
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
        });
      },
    },
   
  };
  </script>
  
  <style src="./Login.scss" lang="scss" />
  