<template>
    <v-container fluid>
      <div class="dashboard-page">
        <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
          <h1 class="page-title">Edit Accessoire</h1>
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
        <v-row>
          <div style="width: 1000px; text-align: center">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="4" md="4">
                  <v-text-field
                    v-model="reference"
                    
                    :rules="referenceRules"
                    label="reference"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4" md="4">
                  <v-text-field
                    v-model="libelle"
                    :rules="libelleRules"
                    label="libelle"
                    required
                  ></v-text-field>
                </v-col>
                  
                <v-col cols="4" md="4">
                  <v-text-field
                    v-model="produit"
                   
                    :rules="produitRules"
                    label="produit"
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
      
      valid: true,
      reference: "",
      libelleRules: [
        (v) => !!v || "ce champ est obligatoire",
        
      ],

      libelle: "",
      referenceRules: [
        (v) => !!v || "ce champ est obligatoire",
        
      ],
  
      produit: "",
      produitRules: [
        (v) => !!v || "ce champ est obligatoire",
       
      ],
    
         
         
          rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            
          },
  
      
    }),
    created: function () {
      this.getaccessoireById();
    },
  
    methods: {
        getaccessoireById() {
        HTTP.get("accessoires/getaccessoirebyid/" + this.$route.params.id).then(
          (res) => {
            this.libelle=res.data.libelle
            this.reference=res.data.reference
            this.produit=res.data.produit
            
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
      },
      update() {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
          let accessoire = {
            libelle: this.libelle,
            reference: this.reference,
            produit:this.produit,
            id:this.$route.params.id
            
          };
          HTTP.put("accessoires/editaccessoire", accessoire).then(() => {
            this.$toast.success("accessoire modifié!", {
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
  
            this.$router.push("/accessoires");
          });
        }
      },
    },
  };
  </script>