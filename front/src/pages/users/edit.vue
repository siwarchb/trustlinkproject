<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Update User</h1>
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
                  :rules="[(v) => !!v || 'Item is required']"
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
            hint="At least 8 characters"
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
              @click="update"
            >
             Update
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
      (v) => !!v || "Name is required",
      
    ],

    role: "",
    roleRules: [
      (v) => !!v || "Role is required",
     
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],

    telephone: "",
    telephoneRules: [
      (v) => !!v || "telephone is required",
      (v) => (v && v.length <= 8) || "Name must be less than 8 characters",
    ],
    adresse:"",
    adresseRules:[
      (v) => !!v || "adresse is required",
      
    ],
     show1: false,
       
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          
        },

    
  }),
  created: function () {
    this.getuserById();
  },

  methods: {
      getuserById() {
      HTTP.get("users/getuserbyid/" + this.$route.params.id).then(
        (res) => {
         this.email=res.data.email
          this.name=res.data.name
          this.select=res.data.role
          this.adresse=res.data.adresse
          this.telephone=res.data.telephone
          this.password=res.data.passwordtext
          
        },
        (err) => {
          this.error = err.response.data.error;
        }
      );
    },
    update() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        let user = {
          email: this.email,
          name: this.name,
          telephone: this.telephone,
          role: this.select,
          adresse:this.adresse,
          password:this.password,
          id:this.$route.params.id
          
        };
        HTTP.put("users/edituser", user).then(() => {
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