<template>
    <v-container fluid>
      <div class="dashboard-page">
        <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
          <h1 class="page-title">interventions</h1>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <router-link to="/addintervention">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  class="text-capitalize button-shadow mr-1"
                  >Add intervention</v-btn
                >
              </router-link>
            </template>
          </v-menu>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="support-requests mx-1 mb-1">
              <v-card-title class="pa-2 pb-0 white--text info">
                <p class="white--text">Add intervention</p>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="pa-5">
            </v-card-text>
                            </v-card>
                        </v-col>
                        </v-row>
                    </div>
                    </v-container>
                </template>
