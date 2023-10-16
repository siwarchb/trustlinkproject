<template>
  <v-navigation-drawer
    app
    clipped
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
  >
    <!-- 
    <div class="v-list">
      <a class="v-list-item v-list-item--link grey--text text-sm-h6" target="_blank" href="https://flatlogic.com/generator">Generate App</a>
    </div> -->

    <v-list>
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6" class="py-5">
            <span
              style="padding-left: 32px"
              class="text-body-1 subheader"
              :class="item.heading && DRAWER_STATE ? 'show ' : 'hide'"
            >
              {{ item.heading }}
            </span>
          </v-col>
        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-4"
        ></v-divider>
        <v-list-group
          color="info"
          v-else-if="item.children && DRAWER_STATE && item.show"
          :key="item.title"
          v-model="item.model"
          append-icon=""
        >
          <template v-slot:prependIcon>
            <v-icon size="28">mdi-image-filter-none</v-icon>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title color="info" class="grey--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon size="">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          color="info"
          v-else-if="item.show"
          :key="item.text"
          :href="item.href ? item.href : null"
          :to="item.link === '#' ? null : item.link"
          link
        >
          <v-list-item-action>
            <v-icon size="28" :color="item.color ? item.color : ''">{{
              item.icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text" link>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { HTTP } from "@/axios";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      items: [
        {
          title: "Dashboard",
          icon: "mdi-home",
          link: "/dashboard",
          show: true,
        },
        {
          title: "Receipt",
          icon: " mdi-animation",
          link: "/tickets",
          show: true,
        },
        {
          title: "Tickets",
          icon: " mdi-ticket-outline",
          link: "/diagnostics",
          show: true,
        },

        {
          title: "Interventions",
          icon: "mdi-folder-file-outline",
          link: "/interventions",
          model: false,
          show: true,
          children: [
            { title: "Contrats", icon: "mdi-book-account-outline", link: "/contrats" },
            { title: "Interventions", icon: "mdi-file-settings", link: "/interventions" },
            
          ],
        },

        {
          title: "Planning Intervention ",
          icon: " mdi-calendar",
          link: "/events",
          show: true,
        },
        {
          title: "Clients",
          icon: "mdi-account-multiple",
          link: "/clients",
          show: true,
        },
        {
          title: "Accessories",
          icon: "mdi mdi-tools ",
          link: "/accessoires",
          show: true,
        },

        {
          title: "Machines",
          icon: "mdi-slot-machine-outline ",
          link: "/machines",
          show: true,
        },

       
        {
          title: "Inventory",
          icon: "mdi-cube-outline",
          link: "/stocks",
          model: false,
          show: true,
          children: [
            { title: "See stock", icon: "mdi-cube-outline", link: "/stocks" },
            { title: "Add Spare part", icon: "mdi-plus", link: "/addpr" },
            {
              title: "demandes",
              icon: "mdi-archive-eye-outline",
              link: "/demandes",
            },
          ],
        },
        {
          title: "Location",
          icon: " mdi-server",
          link: "/emplacements",
          show: true,
        },

        { title: "Breakdowns", icon: "mdi-alert-box", link: "/pannes", show: true },
        {
          title: "buyers",
          icon: "mdi-clipboard-account",
          link: "/acheteurs",
          show: true,
        },
        {
          title: "Users",
          icon: "mdi-account-plus",
          link: "/users",
          show: true,
        },
        {
          title: "Client_Devis",
          icon: "mdi-account",
          link: "/client_area",
          show: true,
        },
        {
          title: "Tickets.",
          icon: "mdi-animation",
          link: "/tickets_technicien",
          show: true,
        },
        //  { title: 'Factures', icon: 'mdi-tooltip-text', link:'/factures', show:true },

        {
          title: "Quote",
          icon: "mdi-animation",
          link: "/appels_doffres",
          show: true,
          children: [
            { title: "devis Interne", icon: "mdi-note-search", link: "/devis_interne" },
            { title: "Offres ", icon: "mdi-file-sign", link: "/appels_doffres" },
            ],
        },

        {
          title: "Import",
          icon: "mdi-database-import-outline",
          link: "/imports",
          show: true,
        },
        //  { title: 'Factures_client', icon: 'mdi-tooltip-text', link:'/Client_factures', show:true },
        {
          title: "Diagnostics.",
          icon: " mdi-wrench",
          link: "/diagnostics_technicien",
          show: true,
        },

        {
          title: "Interventions.",
          icon: " mdi-calendar",
          link: "/eventstechnicien",
          show: true,
        },
        
        //  { title:'offres', icon: 'mdi-tooltip-text', link:'/offres', show:true },
        // { title: 'Typography', icon: 'mdi-format-size', link: '/typography' },

        // { title: 'Tables', icon: 'mdi-grid-large', link: '/tables' },
        // { title: 'Notifications', icon: 'mdi-bell-outline', link: '/notifications' },
        //  {
        //    title: 'UI Elements',
        //    icon: 'mdi-image-filter-none',
        //    link: '/icons',
        //    model: false,
        //    children: [
        //     { title: 'Icons', icon: 'mdi-circle-small', link: '/icons'},
        //     { title: 'Charts', icon: 'mdi-circle-small', link: '/charts'},
        //      { title: 'Maps', icon: 'mdi-circle-small', link: '/maps'},
        //    ],
        // },
        //  { divider: true },
        //  { heading: 'HELP' },
        // { title: 'Library', icon: 'mdi-book-variant-multiple', href: 'https://flatlogic.com/templates'},
        // { title: 'Support', icon: 'mdi-forum', href: 'https://flatlogic.com/forum/'},
        // { title: 'FAQ', icon: 'mdi-help-circle-outline', href:'https://flatlogic.com/templates/vue-material-template'},
        { divider: true },
      ],
      sidebarWidth: 240,
      sidebarMinWidth: 96,
      user: [],
    };
  },
  created() {
    this.getuser();
  },
  mounted() {
    let newObject = JSON.parse(window.localStorage.getItem("userData"));

    if (newObject[0]["role"] == "client") {
      var Machines  = this.items.find((x) => x.title === "Machines");
      Machines.show = false;
      var Interventions = this.items.find((x) => x.title === "Interventions");
      Interventions.show = false;
      var tickets = this.items.find((x) => x.title === "Receipt");
      tickets.show = false;
      var devis = this.items.find((x) => x.title === "Quote");
      devis.show = false;
      var Clients = this.items.find((x) => x.title === "Clients");
      Clients.show = false;
      var Stocks = this.items.find((x) => x.title === "Inventory");
      Stocks.show = false;
      var Emplacement = this.items.find((x) => x.title === "Location");
      Emplacement.show = false;
      var Tickets = this.items.find((x) => x.title === "Tickets");
      Tickets.show = false;
      var Acheteurs = this.items.find((x) => x.title === "Buyers");
      Acheteurs.show = false;
      var Users = this.items.find((x) => x.title === "Users");
      Users.show = false;
      var Pannes = this.items.find((x) => x.title === "Breakdowns");
      Pannes.show = false;
      var Import = this.items.find((x) => x.title === "Import");
      Import.show = false;
      var PlanningIntervention = this.items.find((x) => x.title === "Planning Intervention ");
      PlanningIntervention.show = false;
      // var Interventions1 = this.items.find((x) => x.title === "Interventions. ");
      // Interventions1.show = false;

      var Tickets_technicien = this.items.find((x) => x.title === "Tickets.");
      Tickets_technicien.show = false;
      var Diagnostics = this.items.find((x) => x.title === "Diagnostics.");
      Diagnostics.show = false;
    } else if (newObject[0]["role"] == "admin") {
      var Client_Area = this.items.find((x) => x.title === "Client_Devis");
      Client_Area.show = false;
      var Tickets_technicien = this.items.find((x) => x.title === "Tickets.");
      Tickets_technicien.show = false;
      var Diagnostics = this.items.find((x) => x.title === "Diagnostics.");
      Diagnostics.show = false;
      var Interventions1 = this.items.find((x) => x.title === "Interventions.");
      Interventions1.show = false;

    } else if (newObject[0]["role"] == "technicien") {
     
      var Client_Area = this.items.find((x) => x.title === "Client_Devis");
      Client_Area.show = false;
      var tickets = this.items.find((x) => x.title === "Receipt");
      tickets.show = false;
      var Clients = this.items.find((x) => x.title === "Clients");
      Clients.show = false;
      var Stocks = this.items.find((x) => x.title === "Inventory");
      Stocks.show = false;
      var Emplacement = this.items.find((x) => x.title === "Location");
      Emplacement.show = false;
      var Tickets = this.items.find((x) => x.title === "Tickets");
      Tickets.show = false;
      var Acheteurs = this.items.find((x) => x.title === "Buyers");
      Acheteurs.show = false;
      var Users = this.items.find((x) => x.title === "Users");
      Users.show = false;
      var Pannes = this.items.find((x) => x.title === "Breakdowns");
      Pannes.show = false;
      var appels = this.items.find((x) => x.title === "Quote");
      appels.show = false;
      var Import = this.items.find((x) => x.title === "Import");
      Import.show = false;
      var PlanningIntervention = this.items.find((x) => x.title === "Planning Intervention ");
      PlanningIntervention.show = false;
      // var accessoires = this.items.find((x) => x.title === "Accessoires");
      // accessoires.show = false;
      var Interventions = this.items.find((x) => x.title === "Interventions");
      Interventions.show = false;
  


    } else if (newObject[0]["role"] == "réception") {
      var Client_Area = this.items.find((x) => x.title === "Client_Devis");
      Client_Area.show = false;
      var Tickets_technicien = this.items.find((x) => x.title === "Tickets.");
      Tickets_technicien.show = false;
      var Import = this.items.find((x) => x.title === "Import");
      Import.show = false;
      var Clients = this.items.find((x) => x.title === "Clients");
      Clients.show = false;
      var Stocks = this.items.find((x) => x.title === "Inventory");
      Stocks.show = false;
      var Emplacement = this.items.find((x) => x.title === "Location");
      Emplacement.show = false;
      var Tickets = this.items.find((x) => x.title === "Tickets");
      Tickets.show = false;
      var Acheteurs = this.items.find((x) => x.title === "Buyers");
      Acheteurs.show = false;
      var Users = this.items.find((x) => x.title === "Users");
      Users.show = false;
      var Pannes = this.items.find((x) => x.title === "Breakdowns");
      Pannes.show = false;
      //       var Factures_client =this.items.find(x => x.title === 'Factures_client')
      // Factures_client.show=false;
      var Diagnostics = this.items.find((x) => x.title === "Diagnostics.");
      Diagnostics.show = false;
      var PlanningIntervention = this.items.find((x) => x.title === "Planning Intervention ");
      PlanningIntervention.show = false;

      var accessoires = this.items.find((x) => x.title === "Accessories");
      accessoires.show = false;

      var Interventions1 = this.items.find((x) => x.title === "Interventions.");
      Interventions1.show = false;

      var Machines  = this.items.find((x) => x.title === "Machines");
      Machines.show = false;
    }
  },
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    getuser() {
      var token = localStorage.getItem("token");

      HTTP.get("auth/getuser/" + token)
        .then((response) => {
          this.user = response.data;

          if (this.user.role == "client") {
            console.log("eee");
          }
        })
        .then((err) => console.log(err));
    },
    ...mapActions(["TOGGLE_DRAWER"]),
  },
};
</script>

<style src="./Sidebar.scss" lang="scss" />
