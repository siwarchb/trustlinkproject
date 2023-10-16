<template>
  <v-app>
    <v-container fluid class="error-page">
      <v-row class="logo-wrapper">
        <span class="logo-title">TRUSTLINK</span>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="8">
          <div class="card">
            <span class="error-logo">404</span>
            <p class="error-text">Vous n'avez pas l'autorisation d'accéder à thiste page</p>
            <p class="error-subtext">Mais nous sommes là pour vous ramener en sécurité

</p>

            <v-btn
                class="text-capitalize"
                dark
                x-large
                :color="config.light.primary"
                to="dashboard"
            >
            Back à l’accueil
            </v-btn>
          </div>
        </v-col>
      </v-row>
  </v-container>
  </v-app>
</template>

<script>
import config from '@/config';

export default {
  name: 'Error',
  data(){
    return{
      config
    }
  }
};
</script>

<style src="./Error.scss" lang="scss"></style>
