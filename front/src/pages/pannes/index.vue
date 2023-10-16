<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Pannes</h1>
        <v-menu offset-y> </v-menu>
      </v-row>

      <v-row>
        <br />
        <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0 white--text info">
              <p class="white--text">Liste des pannes</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">Categorie</th>
                      <th class="text-left">Article</th>
                      <th class="text-left">Description</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(panne, key) in pannes" :key="key">
                      <td>{{ panne.groupee }}</td>
                      <td>{{ panne.article }}</td>
                      <td>{{ panne.name }}</td>

                      <td>
                        <v-btn
                          @click="deletepanne(panne._id)"
                          class="ma-2"
                          color="red"
                          dark
                        >
                          delete
                          <v-icon dark right> mdi-cancel </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";

export default {
  data() {
    return {
      pannes: [],
      dialog: false,

      categorie: "",
      name: "",
      article: "",
      categories: [
        "Large appliances",
        "Small appliances",
        "Household maintenance",
        "DIY",
        "Garden",
      ],
      articles: [
        { name: "Washing machine", groupe: "Large appliances" },
        { name: "Dishwasher", groupe: "Large appliances" },
        { name: "Cooker", groupe: "Large appliances" },
        { name: "Freezer", groupe: "Large appliances" },
        { name: "Refrigerator", groupe: "Large appliances" },
        { name: "Oven", groupe: "Large appliances" },

        { name: "Coffee maker", groupe: "Small appliances" },
        { name: "Electric mixer", groupe: "Small appliances" },
        { name: "Toaster", groupe: "Small appliances" },
        { name: "Food processor", groupe: "Small appliances" },
        { name: "Waffle maker", groupe: "Small appliances" },
        { name: "Coffee maker", groupe: "Small appliances" },

        { name: "Vacuum cleaner with bag", groupe: "Household maintenance" },
        { name: "Bagless vacuum cleaner", groupe: "Household maintenance" },
        { name: "Dracula", groupe: "Household maintenance" },
        { name: "Inertia radiator", groupe: "Household maintenance" },
        { name: "Radiator", groupe: "Household maintenance" },

        { name: "Drill driver", groupe: "DIY" },
        { name: "Drill", groupe: "DIY" },
        { name: "Circular saw", groupe: "DIY" },
        { name: "Electric screwdriver", groupe: "DIY" },
        { name: "Angle grinder", groupe: "DIY" },

        { name: "High pressure cleaner", groupe: "Garden" },
        { name: "Electric lawn mower", groupe: "Garden" },
        { name: "Cultivator", groupe: "Garden" },
        { name: "Chainsaw", groupe: "Garden" },

        //////
      ],
      articlesold: [
        { name: "Washing machine", groupee: "Large appliances" },
        { name: "Dishwasher", groupee: "Large appliances" },
        { name: "Cooker", groupee: "Large appliances" },
        { name: "Freezer", groupee: "Large appliances" },
        { name: "Refrigerator", groupee: "Large appliances" },
        { name: "Oven", groupee: "Large appliances" },

        { name: "Coffee maker", groupee: "Small appliances" },
        { name: "Electric mixer", groupee: "Small appliances" },
        { name: "Toaster", groupee: "Small appliances" },
        { name: "Food processor", groupee: "Small appliances" },
        { name: "Waffle maker", groupee: "Small appliances" },
        { name: "Coffee maker", groupee: "Small appliances" },

        { name: "Vacuum cleaner with bag", groupee: "Household maintenance" },
        { name: "Bagless vacuum cleaner", groupee: "Household maintenance" },
        { name: "Dracula", groupee: "Household maintenance" },
        { name: "Inertia radiator", groupee: "Household maintenance" },
        { name: "Radiator", groupee: "Household maintenance" },

        { name: "Drill driver", groupee: "DIY" },
        { name: "Drill", groupee: "DIY" },
        { name: "Circular saw", groupee: "DIY" },
        { name: "Electric screwdriver", groupee: "DIY" },
        { name: "Angle grinder", groupee: "DIY" },

        { name: "High pressure cleaner", groupee: "Garden" },
        { name: "Electric lawn mower", groupee: "Garden" },
        { name: "Cultivator", groupee: "Garden" },
        { name: "Chainsaw", groupee: "Garden" },
      ],
      names: [
        { name: "Allumage Démarrage", groupee: "Lave linge" },
        { name: "Fuite d’eau", groupee: "Lave linge" },
        { name: "Bruit anormal", groupee: "Lave linge" },
        { name: "Problème d’essorage", groupee: "Lave linge" },
        { name: "Pas de vidange", groupee: "Lave linge" },

        {
          name: "lave-vaisselle ne prend pas l’eau",
          groupee: "Lave-vaisselle",
        },
        { name: "lave-vaisselle fuit", groupee: "Lave-vaisselle" },
        { name: "lave-vaisselle ne sèche plus", groupee: "Lave-vaisselle" },
        { name: "lave-vaisselle ne vidange plus", groupee: "Lave-vaisselle" },
        {
          name: "lave-vaisselle laisse des traces blanches",
          groupee: "Lave-vaisselle",
        },

        { name: "congélateur fuit", groupee: "Congélateur" },
        { name: "congélateur fait beaucoup de glace", groupee: "Congélateur" },
        { name: "congélateur ne fonctionne plus", groupee: "Congélateur" },
        { name: "congélateur fait du bruit ", groupee: "Congélateur" },
        { name: "congélateur givre", groupee: "Congélateur" },

        {
          name: "ni les feux ni le four de la cuisinière ne s’allument",
          groupee: "Cuisinière",
        },
        {
          name: "le four de cuisinière ne fonctionne plus",
          groupee: "Cuisinière",
        },
        {
          name: "les flammes de cuisinière sont trop fortes",
          groupee: "Cuisinière",
        },
        {
          name: "les flammes de  cuisinière sont trop petites",
          groupee: "Cuisinière",
        },
        { name: "cuisinière noircit les casseroles", groupee: "Cuisinière" },

        { name: "réfrigérateur givre", groupee: "Réfrigérateur" },
        { name: "réfrigérateur coule", groupee: "Réfrigérateur" },
        { name: "réfrigérateur fait du bruit", groupee: "Réfrigérateur" },
        { name: "réfrigérateur ne refroidit plus", groupee: "Réfrigérateur" },
        { name: "réfrigérateur fait de l’eau", groupee: "Réfrigérateur" },

        { name: "four rouillee", groupee: "four" },
        { name: "four fume", groupee: "four" },
        { name: "four ne chauffe plus", groupee: "four" },
        { name: "four s’éteint tout seul", groupee: "four" },
        { name: "four fait du bruit", groupee: "four" },
      ],
      namesold: [
        { name: "Ignition Start", groupee: "Washing machine" },
        { name: "Water Leak", groupee: "Washing machine" },
        { name: "Abnormal Noise", groupee: "Washing machine" },
        { name: "Spin Problem", groupee: "Washing machine" },
        { name: "No Drainage", groupee: "Washing machine" },

        { name: "Dishwasher Doesn't Take Water", groupee: "Dishwasher" },
        { name: "Dishwasher Leaks", groupee: "Dishwasher" },
        { name: "Dishwasher Doesn't Dry Anymore", groupee: "Dishwasher" },
        { name: "Dishwasher Doesn't Drain Anymore", groupee: "Dishwasher" },
        { name: "Dishwasher Leaves White Marks", groupee: "Dishwasher" },

        { name: "Freezer Leaks", groupee: "Freezer" },
        { name: "Freezer Produces a Lot of Ice", groupee: "Freezer" },
        { name: "Freezer Doesn't Work Anymore", groupee: "Freezer" },
        { name: "Freezer Makes Noise", groupee: "Freezer" },
        { name: "Freezer Frosts Up", groupee: "Freezer" },

        {
          name: "Neither the Stove Burners Nor the Oven Light Up",
          groupee: "Cooker",
        },
        { name: "The Cooker Oven Doesn't Work Anymore", groupee: "Cooker" },
        { name: "The Flames on the Cooker Are Too Strong", groupee: "Cooker" },
        { name: "The Flames on the Cooker Are Too Small", groupee: "Cooker" },
        { name: "The Cooker Blackens the Pots", groupee: "Cooker" },

        { name: "Refrigerator Frosts Up", groupee: "Refrigerator" },
        { name: "Refrigerator Leaks", groupee: "Refrigerator" },
        { name: "Refrigerator Makes Noise", groupee: "Refrigerator" },
        { name: "Refrigerator Doesn't Cool Anymore", groupee: "Refrigerator" },
        { name: "Refrigerator Produces Water", groupee: "Refrigerator" },

        { name: "Oven Rusts", groupee: "Oven" },
        { name: "Oven Smokes", groupee: "Oven" },
        { name: "Oven Doesn't Heat Anymore", groupee: "Oven" },
        { name: "Oven Turns Off by Itself", groupee: "Oven" },
        { name: "Oven Makes Noise", groupee: "Oven" },
      ],
    };
  },

  computed: {
    searchFunction() {
      return this.pannes.filter((item) => {
        return (
          item.numero.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  watch: {
    categorie: function (val) {
      if (val) {
        this.articles = this.articlesold;
        let filter = this.articles.filter((d) => d.groupee == val);

        this.articles = filter;
      }
    },
    article: function (val) {
      if (val) {
        this.names = this.namesold;
        let filter = this.names.filter((d) => d.groupee == val.name);

        this.names = filter;
      }
    },
  },
  created() {
    this.getpannes();
  },

  methods: {
    getpannes() {
      HTTP.get("pannes/getpannes")
        .then((response) => {
          this.pannes = response.data;
        })

        .then((err) => console.log(err));
    },

    deletepanne(id) {
      HTTP.delete("pannes/deletepanne/" + id).then((response) => {
        //this.$htmlToPaper("printNow");
        console.log(response);

        this.$toast.success("Panne supprimé!", {
          position: "top-right",
          timeout: 1000,
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

        this.getpannes();
      });
    },
    addpanne() {
      let panne = {
        name: this.name.name,
        categorie: this.categorie,
        article: this.article.name,
      };
      HTTP.post("pannes/addpanne", panne).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("Panne ajouté!", {
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
            this.dialog = false;

            this.getpannes();
            (this.categorie = ""), (this.name = ""), (this.article = "");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
