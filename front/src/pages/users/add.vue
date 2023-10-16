<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Add User</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/users">
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
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
             
             <v-col cols="4" md="4">
                <v-select
                  v-model="select"
                  :items="roles"
                  :rules="[(v) => !!v || 'Item est obligatoire']"
                  label="Role"
                  required
                ></v-select>
              </v-col> 
          
            </v-row>

            <v-row>
                 <v-col
          cols="4"
          sm="4"
        >
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="Au moins 8 characters"
            counter
            @click:append="show1 = !show1"
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

            <!-- <v-checkbox
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox> -->
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
    roles:["admin",'client','technicien','réception'],
    select:"",
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name est obligatoire", 
    ],

    role: "",
    roleRules: [
      (v) => !!v || "Role est obligatoire",
     
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail est obligatoire",
      (v) => /.+@.+/.test(v) || "E-mail doit etre valide",
    ],

    telephone: "",
    telephoneRules: [
      (v) => !!v || "telephone est obligatoire",
    ],
    adresse:"",
    adresseRules:[
      (v) => !!v || "adresse est obligatoire",
      
    ],
     show1: false,
       
        password: '',
        rules: {
          required: value => !!value || 'Champ obligatoire.',
          min: v => v.length >= 8 || 'Min 8 characters',
          
        },

    
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let user = {
          email: this.email,
          name: this.name,
          telephone: this.telephone,
          role: this.select,
          adresse:this.adresse,
          password:this.password
          
        };
        HTTP.post("users/adduser", user).then(() => {
          this.$toast.success("User ajouté!", {
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

          this.$router.push("/users");
        });
      }
    },
  },
};
</script>
