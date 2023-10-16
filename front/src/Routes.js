import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
// diagnostics//////
import Diagnostics from '@/pages/Diagnostics/index.vue';
// import AddEmplacement from '@/pages/Emplacement/add.vue';
 import ViewTicketDiagnostic from '@/pages/Diagnostics/view.vue';
 import ViewDiagnosticPr from '@/pages/Diagnostics/ticketdiagnostic.vue';

 // diagnostics technicien//////
import Diagnostics_technicien from '@/pages/Diagnostics_technicien/index.vue';
 import Diagnostics_technicienview from '@/pages/Diagnostics_technicien/view.vue';
//////tickets/////
import Tikets from '@/pages/Tickets/index.vue';
import tickets_technicien from '@/pages/tickets_technicien/index.vue';
import AddTicket from '@/pages/Tickets/add.vue';
import ViewTicket from '@/pages/Tickets/view.vue';
import EditTicket from '@/pages/Tickets/edit.vue';
import RapportTicket from '@/pages/Tickets/rapport.vue';

// stocks
import Stocks from '@/pages/Stock/index.vue';
import AddStock from '@/pages/Stock/add.vue';
import Addpr from '@/pages/Stock/addpr.vue';

import Editpr from '@/pages/Stock/editpr.vue';

import voirdemande from '@/pages/Stock/demande.vue';

// emplacement//////
import Emplacements from '@/pages/Emplacement/index.vue';
import AddEmplacement from '@/pages/Emplacement/add.vue';
import DetailEmplacement from '@/pages/Emplacement/details.vue';
import EditEmplacement from '@/pages/Emplacement/edit.vue';

/////clients///////
import Clients from '@/pages/Clients/index.vue';
import AddClient from '@/pages/Clients/add.vue';
import UpdateClient from '@/pages/Clients/update.vue';

//////pannes/////
import Pannes from '@/pages/pannes/index.vue';
import AddPanne from '@/pages/pannes/add.vue';
 ///acheteur 
 import Acheteur from '@/pages/acheteurs/index.vue';
import AddAcheteur from '@/pages/acheteurs/add.vue';
////////
 ///users
 import Users from '@/pages/users/index.vue';
 import AddUsers from '@/pages/users/add.vue';
 import editUsers from '@/pages/users/edit.vue';
 ///
 import Client_ticket from "@/pages/client_ticket/index.vue";
 import Client_factures from "@/pages/client_ticket/voir_facture.vue";
 import Client_devis from "@/pages/client_ticket/voir_devi.vue";
 
////////
/////factures///
import factures from '@/pages/factures/index.vue';

/////accessoires
import accessoires from '@/pages/accessoires/index.vue';

import addaccessoires from '@/pages/accessoires/add.vue';
import editaccessoires from '@/pages/accessoires/edit.vue';
//interventions 

import interventions from '@/pages/interventions/index.vue';
import addintervention from '@/pages/interventions/add.vue';

//contrats 

import contrats from '@/pages/contrats/index.vue';
import addcontrat from '@/pages/contrats/add.vue';
import detailscontrat from '@/pages/contrats/details.vue';

import eventscontrats from '@/pages/events/contratcalendar.vue';
//events contrats techniciens 
import eventstechnicien from '@/pages/eventstechnicien/index.vue';


//machines 
import machines from '@/pages/machines/index.vue';
import addmachines from '@/pages/machines/add.vue';
///// appels_doffres ///
import appels_doffres from "@/pages/offres/index.vue";
import devis_interne from "@/pages/devisinterne/index.vue";

import offres from '@/pages/offres/index.vue';
import voir_devis from "@/pages/offres/voir_devi.vue";
import voir_factures from "@/pages/offres/voir_facture.vue";
/////
import Typography from '@/pages/Typography/Typography'
import Tables from '@/pages/Tables/Basic'
import Notifications from '@/pages/Notifications/Notifications'
import Icons from '@/pages/Icons/Icons'
import Charts from '@/pages/Charts/Charts'
import Maps from '@/pages/Maps/Google'
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";
import Resetpassword from "@/pages/Login/resetpassword";
import Forgetpassword from "@/pages/Login/forgetpassword";
//import
import imports from '@/pages/imports/index.vue';


// This function guards a route and checks if the user is authenticated.
// If authenticated, it allows access to the route, otherwise, it redirects to the home page.
function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  var string = localStorage.getItem("token");

  // Check if 'token' is not null and the first character is not '1'
  if (string != null && string[0] != '1') {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    next(); // Allow access to the route
  } else {
    next("/"); // Redirect to the home page
  }
}

// This function guards the home page route.
// If authenticated, it redirects to '/dashboard', otherwise, it allows access to the home page.
function guardHome(to, from, next) {
  var isAuthenticated = false;
  var string = localStorage.getItem("token");

  if (string != null && string[0] != '1') {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    next('/dashboard'); // Redirect to '/dashboard'
  } else {
    next(); // Allow access to the home page
  }
}

// This function tests if the user has the permission to access a certain route.
// It checks if the user's role is 'admin'. If so, it allows access, otherwise, it redirects to an error page.
function testPermission(to, from, next) {
  if (window.localStorage.getItem("userData")) {
    var valide = false;
    let newObject = JSON.parse(window.localStorage.getItem("userData"));
    if (newObject[0]["role"] === 'admin') {
      valide = true;
    }

    if (valide) {
      next(); // Allow access to the route
    } else {
      next("/Error"); // Redirect to the error page
    }
  }
}

// Similar to the previous function, but it also allows users with the role 'réception'.
function testPermissionreception(to, from, next) {
  if (window.localStorage.getItem("userData")) {
    var valide = false;
    let newObject = JSON.parse(window.localStorage.getItem("userData"));
    if (newObject[0]["role"] === 'admin' || newObject[0]["role"] === 'réception') {
      valide = true;
    }

    if (valide) {
      next(); // Allow access to the route
    } else {
      next("/Error"); // Redirect to the error page
    }
  }
}

// This function checks if the user's role is 'admin' or 'technicien'.
function testPermissionadmin_technicien(to, from, next) {
  if (window.localStorage.getItem("userData")) {
    var valide = false;
    let newObject = JSON.parse(window.localStorage.getItem("userData"));
    if (newObject[0]["role"] === 'admin' || newObject[0]["role"] === 'technicien') {
      valide = true;
    }

    if (valide) {
      next(); // Allow access to the route
    } else {
      next("/Error"); // Redirect to the error page
    }
  }
}

// This function checks if the user's role is 'technicien'.
function testPermissiontechnicien(to, from, next) {
  if (window.localStorage.getItem("userData")) {
    var valide = false;
    let newObject = JSON.parse(window.localStorage.getItem("userData"));
    if (newObject[0]["role"] === 'technicien') {
      valide = true;
    }

    if (valide) {
      next(); // Allow access to the route
    } else {
      next("/Error"); // Redirect to the error page
    }
  }
}

// This function checks if the user's role is 'client'.
function testPermissionclient(to, from, next) {
  if (window.localStorage.getItem("userData")) {
    var valide = false;
    let newObject = JSON.parse(window.localStorage.getItem("userData"));
    if (newObject[0]["role"] === 'client') {
      valide = true;
    }

    if (valide) {
      next(); // Allow access to the route
    } else {
      next("/Error"); // Redirect to the error page
    }
  }
}


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      beforeEnter: guardHome,
      component: Login
    },

    {
      path: '/resetpassword',
      name: 'Resetpassword',
      beforeEnter: guardHome,
      component: Resetpassword
    },

    {
      path: '/forgetpassword/:token',
      name: 'Forgetpassword',
      beforeEnter: guardHome,
      component: Forgetpassword
    },

    {
    path: '/',
    redirect: 'login',
    beforeEnter: guardMyroute,
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        
        
        component: Dashboard,
      },
      ///////ticket////
      {
        beforeEnter: testPermissionreception,
        path: 'tickets',
        name: 'tickets',
        component: Tikets,
      },
      {
        beforeEnter:testPermissiontechnicien,
        path: 'tickets_technicien',
        name: 'tickets_technicien',
        component:tickets_technicien,
      },
      {
        beforeEnter: testPermissionreception,
        path: 'addticket',
        
        name: 'addticket',
        component: AddTicket,
      },
      {
         beforeEnter: testPermissionadmin_technicien,
        path: '/viewticket/:id',
        name: 'viewticket',
        component: ViewTicket,
      },

      {
        beforeEnter: testPermissionreception,
        path: '/editticket/:id',
        name: 'editticket',
        component: EditTicket,
      },
      {
        beforeEnter: testPermissionadmin_technicien,
        path: '/rapportticket/:id',
        name: 'rapportticket',
        component: RapportTicket,
      },
      ///////////clients////
      {
        beforeEnter: testPermission,
        path: 'clients',
        name: 'clients',
        component: Clients,
      },
      {
        beforeEnter: testPermission,
        path: 'addclient',
        name: 'addclient',
        component:AddClient,
      },
      {
        beforeEnter: testPermission,
        path: 'updateclient/:id',
        name: 'updateclient',
        component:UpdateClient,
      },
      {
        beforeEnter: testPermissionclient,
        path: 'client_area',
        name: 'client_area',
        component:Client_ticket,
      },
      {
        beforeEnter: testPermissionclient,
        path: 'voir_facture/:id',
        name: 'voir_facture',
        component:Client_factures,
      },
      {
        beforeEnter: testPermissionclient,
        path: 'voir_devi/:id',
        name: 'voir_devi',
        component:Client_devis,
      },
        ///////////stocks////
        {
          beforeEnter: testPermission,
          path: 'stocks',
          name: 'stocks',
          component: Stocks,
        },
        {
          beforeEnter: testPermission,
          path: 'demandes',
          name: 'demandes',
          component:voirdemande,
        },
        {
          beforeEnter: testPermission,
          path: 'addstock/:id',
          name: 'addstock',
          component:AddStock,
        },
        {
          beforeEnter: testPermission,
          path: 'addpr',
          name: 'addpr',
          component:Addpr,
        },
        {
          beforeEnter: testPermission,
          path: '/editstock/:id',
          name: 'editstock',
          component:Editpr,
        },
// acheteurs 

{
  beforeEnter: testPermission,
  path: 'acheteurs',
  name: 'acheteurs',
  component:Acheteur,
},
{
  beforeEnter: testPermission,
  path: 'addacheteur',
  name: 'addacheteur',
  component:AddAcheteur,
},




// interventions 

{
  beforeEnter: testPermission,
  path: 'interventions',
  name: 'interventions',
  component:interventions,
},
{
  beforeEnter: testPermission,
  path: 'addintervention',
  name: 'addintervention',
  component:addintervention,
},



// contrats 

{
  beforeEnter: testPermission,
  path: 'contrats',
  name: 'contrats',
  component:contrats,
},
{
  beforeEnter: testPermission,
  path: 'addcontrat',
  name: 'addcontrat',
  component:addcontrat,
},
{
  beforeEnter: testPermission,
  path: 'detailscontrat/:id',
  name: 'detailscontrat',
  component:detailscontrat,
},

//calendar contrat 

{
  beforeEnter: testPermission,
  path: 'events',
  name: 'events',
  component:eventscontrats,
},

//calendar contrat technicien

{
  beforeEnter: testPermissiontechnicien,
  path: 'eventstechnicien',
  name: 'eventstechnicien',
  component:eventstechnicien,
},

//machines

{
  beforeEnter: testPermission,
  path: 'machines',
  name: 'machines',
  component:machines,
},

{
  beforeEnter: testPermission,
  path: 'addmachine',
  name: 'addmachine',
  component:addmachines,
},
// factures
{
  beforeEnter: testPermissionreception,
  path: 'factures',
  name: 'atelier_production',
  component:factures,
},
//  appels_doffres
{
  beforeEnter: testPermissionreception,
  path: 'appels_doffres',
  name: 'appels_doffres',
  component: appels_doffres,
},

{
  beforeEnter: testPermissionreception,
  path: 'devis_interne',
  name: 'devis_interne',
  component: devis_interne,
},
{
  beforeEnter: testPermissionreception,
  path: 'voir_devis/:id',
  name: 'voir_devis',
  component: voir_devis,
},
{
  beforeEnter: testPermissionreception,
  path: 'voir_factures/:id',
  name: 'voir_factures',
  component: voir_factures,
},


// users
{
  beforeEnter: testPermission,
  path: 'users',
  name: 'users',
  component:Users,
},
{
  beforeEnter: testPermission,
  path: 'adduser',
  name: 'adduser',
  component:AddUsers,
},
{
  beforeEnter: testPermission,
  path: 'edituser/:id',
  name: 'edituser',
  component:editUsers,
},


        ///////////emplacements////
        {
          beforeEnter: testPermission,
          path: 'emplacements',
          name: 'emplacements',
          component: Emplacements,
        },
        {
          beforeEnter: testPermission,
          path: 'addemplacement',
          name: 'addemplacement',
          component:AddEmplacement,
        },
        {
          beforeEnter: testPermission,
          path: 'detailsproduits/:id',
          name: 'detailsproduits',
          component:DetailEmplacement,
        },

        {
          beforeEnter: testPermission,
          path: 'editemplacement/:id',
          name: 'editemplacement',
          component:EditEmplacement,
        },


      //////////accessoires 

      {
        beforeEnter: testPermission,
        path: 'accessoires',
        name: 'accessoires',
        component:accessoires,
      },
      {
        beforeEnter: testPermission,
        path: 'addaccessoire',
        name: 'addaccessoire',
        component:addaccessoires,
      },
      {
        beforeEnter: testPermission,
        path: 'editaccessoire',
        name: 'editaccessoire',
        component:editaccessoires,
      },

      //////////diagnostics////
      {
        beforeEnter: testPermission,
        path: 'diagnostics',
        name: 'diagnostics',
        component: Diagnostics,
      },
      // {
      //   path: 'addemplacement',
      //   name: 'addemplacement',
      //   component:AddEmplacement,
      // },
       {
        beforeEnter: testPermissionadmin_technicien,
        path: '/viewticketdiagnostic/:id',
        name: 'viewticketdiagnostic',
         component:ViewTicketDiagnostic,
       },

       {
        beforeEnter: testPermissionadmin_technicien,
        path: '/viewdiagnosticenattentepr/:id',
        name: 'viewdiagnosticenattentepr',
         component:ViewDiagnosticPr,
       },

    //////////
       //////////diagnostics_technicien////

       {
        beforeEnter: testPermissiontechnicien,
        path: 'diagnostics_technicien',
        name: 'diagnostics_technicien',
        component:Diagnostics_technicien,
      },
       {
        beforeEnter: testPermissiontechnicien,
        path: '/Diagnostics_technicienview/:id',
        name: 'Diagnostics_technicienview',
         component:Diagnostics_technicienview,
       },

     ///////pannes////
     {
      beforeEnter: testPermission,
      path: 'pannes',
      name: 'pannes',
      component: Pannes,
    },
    {
      beforeEnter: testPermission,
      path: 'addpanne',
      name: 'addpanne',
      component: AddPanne,
    },
    
    ////////
       /// offres 
       {
        path: 'offres',
        name: 'offres',
        component: offres,
      },
      //import
      {
        path: 'imports',
        name: 'import',
        component: imports,
      },
      {
        
        path: 'typography',
        name: 'Typography',
        component: Typography,
      },
      {
        path: 'tables',
        name: 'Tables',
        component: Tables
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
    ],
  },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ],
});
