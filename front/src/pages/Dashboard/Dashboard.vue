<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h1 class="page-title">Dashboard</h1>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="secondary"
              class="text-capitalize button-shadow mr-1"
              >Latest Reports</v-btn
            >
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>number of tickets</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
    
              <div class="v-card__text pa-5 pt-0">
                <div class="row pb-0 no-gutters">
                  <div class="my-auto col col-5">
                    <span
                      class="font-weight-medium greyBold--text"
                      style="font-size: 24px"
                      >{{ this.nbtickets }}</span
                    >
                    <p class="greyBold--text mb-0">Tickets</p>
                  </div>
                  <div class="col col-6">
                    <div style="min-height: 98.7px">
                      <div
                        id="apexchartsqxbq93o2"
                        class="apexcharts-canvas apexchartsqxbq93o2 apexcharts-theme-light"
                        style="width: 122px; height: 98.7px"
                      >
                        <svg
                          id="SvgjsSvg2656"
                          width="122"
                          height="98.7"
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          xmlns:svgjs="http://svgjs.dev"
                          class="apexcharts-svg"
                          xmlns:data="ApexChartsNS"
                          transform="translate(0, 0)"
                          style="background: transparent"
                        >
                          <g
                            id="SvgjsG2658"
                            class="apexcharts-inner apexcharts-graphical"
                            transform="translate(14, 0)"
                          >
                            <defs id="SvgjsDefs2657">
                              <clipPath id="gridRectMaskqxbq93o2">
                                <rect
                                  id="SvgjsRect2660"
                                  width="102"
                                  height="120"
                                  x="-3"
                                  y="-1"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fff"
                                ></rect>
                              </clipPath>
                              <clipPath id="forecastMaskqxbq93o2"></clipPath>
                              <clipPath id="nonForecastMaskqxbq93o2"></clipPath>
                              <clipPath id="gridRectMarkerMaskqxbq93o2">
                                <rect
                                  id="SvgjsRect2661"
                                  width="100"
                                  height="122"
                                  x="-2"
                                  y="-2"
                                  rx="0"
                                  ry="0"
                                  opacity="1"
                                  stroke-width="0"
                                  stroke="none"
                                  stroke-dasharray="0"
                                  fill="#fff"
                                ></rect>
                              </clipPath>
                            </defs>
                            <g id="SvgjsG2662" class="apexcharts-radialbar">
                              <g id="SvgjsG2663">
                                <g id="SvgjsG2664" class="apexcharts-tracks">
                                  <g
                                    id="SvgjsG2665"
                                    class="apexcharts-radialbar-track apexcharts-track"
                                    rel="1"
                                  >
                                    <path
                                      id="apexcharts-radialbarTrack-0"
                                      d="M 47.99999999999999 77.54939024390245 A 29.549390243902444 29.549390243902444 0 1 1 48.0515733889877 77.54934523761881"
                                      fill="none"
                                      fill-opacity="1"
                                      stroke="rgba(242,242,242,0.85)"
                                      stroke-opacity="1"
                                      stroke-linecap="butt"
                                      stroke-width="4.0609878048780494"
                                      stroke-dasharray="0"
                                      class="apexcharts-radialbar-area"
                                      data:pathOrig="M 47.99999999999999 77.54939024390245 A 29.549390243902444 29.549390243902444 0 1 1 48.0515733889877 77.54934523761881"
                                    ></path>
                                  </g>
                                </g>
                                <g id="SvgjsG2667">
                                  <g
                                    id="SvgjsG2671"
                                    class="apexcharts-series apexcharts-radial-series"
                                    seriesName="seriesx1"
                                    rel="1"
                                    data:realIndex="0"
                                  >
                                    <path
                                      id="SvgjsPath2672"
                                      d="M 47.99999999999999 77.54939024390245 A 29.549390243902444 29.549390243902444 0 1 1 70.63614619389561 29.006018077427203"
                                      fill="none"
                                      fill-opacity="0.85"
                                      stroke="rgba(83,109,254,0.85)"
                                      stroke-opacity="1"
                                      stroke-linecap="butt"
                                      stroke-width="4.186585365853659"
                                      stroke-dasharray="4"
                                      class="apexcharts-radialbar-area apexcharts-radialbar-slice-0"
                                      data:angle="230"
                                      data:value="64"
                                      index="0"
                                      j="0"
                                      data:pathOrig="M 47.99999999999999 77.54939024390245 A 29.549390243902444 29.549390243902444 0 1 1 70.63614619389561 29.006018077427203"
                                    ></path>
                                  </g>
                                  <circle
                                    id="SvgjsCircle2668"
                                    r="22.518896341463417"
                                    cx="48"
                                    cy="48"
                                    class="apexcharts-radialbar-hollow"
                                    fill="transparent"
                                  ></circle>
                                  <g
                                    id="SvgjsG2669"
                                    class="apexcharts-datalabels-group"
                                    transform="translate(0, 0) scale(1)"
                                    style="opacity: 1"
                                  >
                                    <text
                                      id="SvgjsText2670"
                                      font-family="Helvetica, Arial, sans-serif"
                                      x="48"
                                      y="56"
                                      text-anchor="middle"
                                      dominant-baseline="auto"
                                      font-size="16px"
                                      font-weight="400"
                                      fill="#b9b9b9"
                                      class="apexcharts-text apexcharts-datalabel-value"
                                      style="
                                        font-family: Helvetica, Arial,
                                          sans-serif;
                                      "
                                    >
                                      22%
                                    </text>
                                  </g>
                                </g>
                              </g>
                            </g>
                            <line
                              id="SvgjsLine2673"
                              x1="0"
                              y1="0"
                              x2="96"
                              y2="0"
                              stroke="#b6b6b6"
                              stroke-dasharray="0"
                              stroke-width="1"
                              stroke-linecap="butt"
                              class="apexcharts-ycrosshairs"
                            ></line>
                            <line
                              id="SvgjsLine2674"
                              x1="0"
                              y1="0"
                              x2="96"
                              y2="0"
                              stroke-dasharray="0"
                              stroke-width="0"
                              stroke-linecap="butt"
                              class="apexcharts-ycrosshairs-hidden"
                            ></line>
                          </g>
                          <g id="SvgjsG2659" class="apexcharts-annotations"></g>
                        </svg>
                        <div class="apexcharts-legend"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row pb-0 no-gutters justify-space-between">
                  <div class="d-flex flex-column align-center col col-auto">
                    <p class="greyTint--text my-0" style="font-size: 12px">
                      En cours

                    </p>
                    <div>
                      <span
                        class="greyBold--text font-weight-regular"
                        style="font-size: 16px"
                        >{{nbticketsencours}}</span
                      ><i
                        aria-hidden="true"
                        class="v-icon notranslate mt-n1 mdi mdi-circle-small theme--light success--text"
                        style="font-size: 30px"
                      ></i>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-center col col-auto">
                    <p class="greyTint--text my-0" style="font-size: 12px">
                      Ouverts
                    </p>
                    <div class="d-flex flex-row justify-start">
                      <span
                        class="greyBold--text font-weight-regular"
                        style="font-size: 16px"
                        >{{nbticketsouverts}}</span
                      ><i
                        aria-hidden="true"
                        class="v-icon notranslate mt-n1 mdi mdi-circle-small theme--light warning--text"
                        style="font-size: 30px"
                      ></i>
                    </div>
                  </div>
                  <div class="d-flex flex-column align-center col col-auto">
                    <p class="greyTint--text my-0" style="font-size: 12px">
                      Cloturé
                    </p>
                    <div>
                      <span
                        class="greyBold--text font-weight-regular"
                        style="font-size: 16px"
                        >{{ nbticketscloture }}</span
                      ><i
                        aria-hidden="true"
                        class="v-icon notranslate pl-0 mt-n1 mdi mdi-circle-small theme--light primary--text"
                        style="font-size: 30px"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-8">
              <p>Tickets en Réparation ({{ nbticketsenreparation }})</p>
              <v-spacer></v-spacer>
             
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="pb-5">
                <div class="mr-4">
                  <v-icon color="success" class="ml-n2">
                    mdi-circle-medium
                  </v-icon>
                  <span class="card-light-grey">Garantie ({{ nbticketsenreparationgarantie }})</span>
                </div>
                <div>
                  <v-icon color="error"> mdi-circle-medium </v-icon>
                  <span class="card-light-grey">Hors Garantie ({{ nbticketsenreparationhorsgarantie }})</span>
                </div>
              </v-row>
              <v-row no-gutters class="pb-3">
                <v-col>
                  <div class="text-h6 card-light-grey font-weight-regular">
                    Garantie
                  </div>
                  <v-progress-linear
                  v-bind:value="nbticketsenreparationgarantie"

                    background-color="#ececec"
                    color="success"
                  ></v-progress-linear>
                </v-col>
              </v-row>
              <v-row no-gutters class="pb-1">
                <v-col>
                  <div class="text-h6 card-light-grey font-weight-regular">
                    Hors Garantie
                  </div>
                  <v-progress-linear
                  v-bind:value="nbticketsenreparationhorsgarantie"
                    background-color="#ececec"
                    color="error"
                  ></v-progress-linear>
                </v-col>
                <br><br>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="7" cols="12">
          <v-card class="mx-1 mb-1" style="min-height: 228px">
            <v-card-title class="pa-6 pb-3">
              <p>Server Overview</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col
                  cols="6"
                  md="5"
                  lg="6"
                  xl="4"
                  class="my-auto text-truncate"
                >
                  <span>60% / 37°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea1.options"
                    :series="mock.apexArea1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="my-3">
                <v-col
                  cols="6"
                  md="5"
                  lg="6"
                  xl="4"
                  class="my-auto text-truncate"
                >
                  <span>54% / 31°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea2.options"
                    :series="mock.apexArea2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col
                  cols="6"
                  md="5"
                  lg="6"
                  xl="4"
                  class="my-auto text-truncate"
                >
                  <span>57% / 21°С / 3.3 Ghz</span>
                </v-col>
                <v-col cols="6" md="7" lg="6" xl="8">
                  <ApexChart
                    v-if="apexLoading"
                    height="35"
                    type="area"
                    :options="mock.apexArea3.options"
                    :series="mock.apexArea3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" md="5" cols="12">
          <v-card class="mx-1 mb-1" style="height: 250px">
            <v-card-title class="flex-nowrap pa-6 pb-3">
              <p class="text-truncate">Number of interventions by customer type</p>
              <v-spacer></v-spacer>
           
            </v-card-title>
            <v-card-text class="pa-6 pt-0 mb-1">
              <v-row no-gutters>
                <v-col cols="12">
                  <apexchart width="330" type="donut" :options="options" :series="series"></apexchart>

                  <!-- <ApexChart
                    height="124"
                    type="donut"
                    class="mt-1"
                    :options="options"
                    :series="generatePieSeries()"
                  ></ApexChart> -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <v-row no-gutters>
                <v-col
                  cols="7"
                  sm="4"
                  md="4"
                  lg="5"
                  class="d-flex align-center"
                >
                  <p>Nb répartition par marque produit</p>
                </v-col>
                <v-col
                  sm="6"
                  md="6"
                  lg="5"
                  class="d-none d-sm-flex align-center"
                >
                  <v-icon size="18" color="warning">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Tablet</span
                  >
                  <v-icon size="18" color="primary">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular mr-3"
                    style="font-size: 18px"
                    >Mobile</span
                  >
                  <v-icon size="18" color="#B1BCFF">mdi-circle-medium</v-icon
                  ><span
                    class="card-dark-grey font-weight-regular"
                    style="font-size: 18px"
                    >Desktop</span
                  >
                </v-col>
                <v-col cols="6" sm="2" md="2" lg="1" offset-lg="1">
                  <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                      <v-select
                        class="main-chart-select"
                        v-model="mainApexAreaSelect"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        flat
                        single-line
                        hide-details
                        :items="mock.select"
                        outlined
                      ></v-select>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text class="pa-6">
              <v-row>
                <v-col>
    <apexcharts width="1500" height="350" type="bar" :options="chartOptions" :series="series1.data"></apexcharts>

                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Light Blue</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="6" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >199 <span class="caption error--text">-3.7%</span>
                  </span>
                </v-col>
                <v-col cols="6">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar1.options"
                    :series="mock.apexBar1.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    33 <v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.25%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    330<v-icon color="error"> mdi-arrow-bottom-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>Sing App</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >121 <span class="error--text caption">-3.2%</span>
                  </span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar2.options"
                    :series="mock.apexBar2.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    15<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.01%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    302<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" sm="6" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>RNS</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters>
                <v-col cols="7" class="my-auto">
                  <span class="" style="font-size: 42px"
                    >175 <span class="error--text caption">-3.1%</span>
                  </span>
                </v-col>
                <v-col cols="5">
                  <ApexChart
                    height="100"
                    type="bar"
                    v-if="apexLoading"
                    :options="mock.apexBar3.options"
                    :series="mock.apexBar3.series"
                  ></ApexChart>
                </v-col>
              </v-row>
              <v-row no-gutters class="justify-space-between">
                <div>
                  <div class="subtext">
                    31 <v-icon color="error"> mdi-arrow-bottom-right</v-icon>
                  </div>
                  <div class="subtext-index">Registrations</div>
                </div>
                <div>
                  <div class="subtext">
                    3.23%<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Bounce Rate</div>
                </div>
                <div>
                  <div class="subtext">
                    301<v-icon color="success"> mdi-arrow-top-right</v-icon>
                  </div>
                  <div class="subtext-index">Views</div>
                </div>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- <v-col cols="12">
          <v-card class="support-requests mx-1 mb-1">
            <v-card-title class="pa-6 pb-0">
              <p>Support Requests</p>
              <v-spacer></v-spacer>
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="textColor">mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in mock.menu"
                    :key="i"
                    @click="() => {}"
                  >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead class="pl-2">
                    <tr>
                      <th class="text-left pa-6">NAME</th>
                      <th class="text-left">EMAIL</th>
                      <th class="text-left">PRODUCT</th>
                      <th class="text-left">PRICE</th>
                      <th class="text-left">DATE</th>
                      <th class="text-left">CITY</th>
                      <th class="text-left">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in mock.table" :key="item.name">
                      <td class="pa-6">{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td>{{ item.product }}</td>
                      <td>{{ item.price }}</td>
                      <td>{{ item.date }}</td>
                      <td>{{ item.city }}</td>
                      <td v-if="item.status === 'Sent'">
                        <v-chip link color="success" class="ma-2 ml-0">
                          Sent
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'Pending'">
                        <v-chip link color="warning" class="ma-2 ml-0">
                          Pending
                        </v-chip>
                      </td>
                      <td v-else-if="item.status === 'Declined'">
                        <v-chip link color="secondary" class="ma-2 ml-0">
                          Declined
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
    </div>
  </v-container>
</template>

<script>
import mock from "./mock";
import Trend from "vuetrend";
import ApexChart from "vue-apexcharts";
import { HTTP } from "@/axios";
import VueApexCharts from 'vue-apexcharts'

export default {
  name: "Dashboard",
  components: {
    apexcharts: VueApexCharts,
  },
  data() {
    return {
      nbtickets: "",
      nbticketsencours: "",
      nbticketsenreparation: "",
      nbticketrepare: "",
      nbticketscloture: "",
      nbticketsouverts: "",
      nbticketsenreparationhorsgarantie: "",
      nbticketsenreparationgarantie: "",
      options: {    labels: ['Client final', 'Revendeur']
},
      mock,
      apexLoading: false,
      value: this.getRandomInt(10, 90),
      value2: this.getRandomInt(10, 90),
      mainApexAreaSelect: "Daily",
      series: [],
      chartOptions: {
        chart: {
          id: 'basic-bar'
        },
        xaxis: {
          categories: []
        }
      },

   

      series1: {
        name: 'series-1',
        data: [],
      },
      // options1: {
      //   chart: {
      //     id: 'vuechart-example'
      //   },
      //   labels: {
      //     categories: []
      //   }
      // },
    

    };
  },

  created() {
    this.counticket();
    this.counticketencours();
    this.counticketenreparation();
    this.counticketcloture();
    this.counticketrepare();
    this.nbticketsouvertss();
    this.counticketenreparationhorsgarantie();
    this.counticketenreparationgarantie();
    this.counticketsbytypeclient();
    this.generatePieSeries();
    this.geticketmarquepdt();

    // this.getpanneByticket();
  },

  methods: {
    counticket() {
      HTTP.get("tickets/counticket")
        .then((response) => {
          this.nbtickets = response.data;
          console.log(this.nbtickets);
        })

        .then((err) => console.log(err));
    },

    counticketenreparation() {
      HTTP.get("tickets/counticketenreparation")
        .then((response) => {
          this.nbticketsenreparation = response.data;
          console.log(this.nbticketsenreparation);
        })

        .then((err) => console.log(err));
    },

    counticketenreparationhorsgarantie() {
      HTTP.get("tickets/counticketenreparationhorsgarantie")
        .then((response) => {
          this.nbticketsenreparationhorsgarantie = response.data;
          console.log(this.nbticketsenreparationhorsgarantie);
        })

        .then((err) => console.log(err));
    },

    counticketenreparationgarantie() {
      HTTP.get("tickets/counticketenreparationgarantie")
        .then((response) => {
          this.nbticketsenreparationgarantie = response.data;
          console.log(this.nbticketsenreparationgarantie);
        })

        .then((err) => console.log(err));
    },



    counticketencours() {
      HTTP.get("tickets/counticketencours")
        .then((response) => {
          this.nbticketsencours = response.data;
        })

        .then((err) => console.log(err));
    },

    counticketcloture() {
      HTTP.get("tickets/counticketcloture")
        .then((response) => {
          this.nbticketscloture = response.data;
        })

        .then((err) => console.log(err));
    },

    counticketrepare() {
      HTTP.get("tickets/counticketrepare")
        .then((response) => {
          this.nbticketrepare = response.data;
          console.log(this.nbticketrepare);
        })

        .then((err) => console.log(err));
    },


    nbticketsouvertss() {
      HTTP.get("tickets/counticketouvert")
        .then((response) => {
          this.nbticketsouverts = response.data;
          console.log(this.nbticketsouverts);
        })

        .then((err) => console.log(err));
    },

    counticketsbytypeclient() {
      HTTP.get("tickets/counticketsbytypeclient")
        .then((response) => {
         
          console.log(this.nbticketsouverts);
        })

        .then((err) => console.log(err));
    },

    getRandomDataForTrends() {
      const arr = [];
      for (let i = 0; i < 12; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }
      return arr;
    },
      generatePieSeries() {

      HTTP.get("tickets/counticketsbytypeclient")
        .then((response) => {

          response.data.forEach((value, index) => { 
            
            let y = value.count;
            this.series.push(y);

        });
        return (this.series);

    });

    },

    geticketmarquepdt(){

      HTTP.get("tickets/counticketsbymarquepdt")
        .then((response) => {

          response.data.forEach((value, index) => { 
            
            let y = value.count;
              this.series1.data.push(y);
              console.log(this.series1);
              this.chartOptions.xaxis.categories.push(value._id);
        });
        return(this.series1.data,this.chartOptions);

    });
    },

    // generatePieSeries() {
    //   let series = [];

    //   for (let i = 0; i < 4; i++) {
    //     let y = Math.floor(Math.random() * (500 - 100 + 100)) + 100;
    //     series.push(y);
    //   }
    //   console.log (series);
    // },
    getRandomInt(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
  },
  mounted() {
    setTimeout(() => {
      this.apexLoading = true;
    });
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
