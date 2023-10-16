<template>
  <v-app>
    <div class="row">
      <div style="margin-left: 10px" class="col-md-6">
        <div class="form-group">
          <label for="last"><strong> Filtrer par : </strong> </label>
          <select
            id="inputState"
            class="form-control"
            v-model="selected"
            required
          >
            <option value="client">Clients</option>
            <option value="machine">Machines</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-show="selected == 'client'">
        <div
          v-show="selectedclient !== 'all'"
          :style="{ 'background-color': selectedclient }"
          class="cercle"
        ></div>
      </div>

      <div v-show="selected == 'client'" class="col-md-4">
        <div class="form-group">
          <label for="last">Clients </label>
          <select
            id="inputState"
            class="form-control"
            v-model="selectedclient"
            required
          >
            <option value="all">all</option>
            <option v-for="client in clients" :key="client._id" value="007bff">
              <i class="mdi mdi-delete icone text-danger" style="color: red" />
              <a>{{ client.name }}</a>
            </option>
          </select>
        </div>
      </div>

      <v-btn
        v-show="selected == 'client'"
        style="margin-top: 37px"
        depressed
        color="primary"
        @click="filter()"
        >filtrer
      </v-btn>

      <div v-show="selected == 'machine'" class="marker">
        <i
          class="mdi mdi-map-marker-radius"
          style="font-size: 22px; margin-bottom: 10px"
        >
        </i>
      </div>

      <div v-show="selected == 'machine'" class="col-md-4">
        <div class="form-group">
          <label for="last">Machines </label>
          <select
            id="inputState"
            class="form-control"
            v-model="selectedmachine"
            required
          >
            <option value="all">all</option>
            <option
              v-for="machine in machines"
              :key="machine._id"
              v-bind:value="machine.reference"
            >
              <i class="mdi mdi-delete icone text-danger" style="color: red" />
              <a>{{ machine.reference }}</a>
            </option>
          </select>
        </div>
      </div>

      <v-btn
        v-show="selected == 'machine'"
        style="margin-top: 37px"
        depressed
        color="primary"
        @click="filtrermachine()"
        >filtrer</v-btn
      >
    </div>

    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="eventsbase"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="800px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <!-- <span v-html="selectedEvent.details"></span>
                   <span v-html="selectedEvent.nom_client"></span> -->
                <v-card
                  :loading="loading"
                  class="mx-auto my-12"
                  max-width="800"
                >
                  <template slot="progress">
                    <v-progress-linear
                      color="deep-purple"
                      height="50"
                      indeterminate
                    ></v-progress-linear>
                  </template>

                  <v-card-title
                    >Affected customer :
                    <span v-html="selectedEvent.nom_client"></span
                  ></v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text>
                    <div class="my-4 text-subtitle-1">
                      <h5>
                        <i
                          class="mdi mdi-account-group"
                          style="font-size: 22px; margin-bottom: 10px"
                        >
                        </i>
                        &nbsp; List of assigned Technicians :
                      </h5>
                      <h6
                        v-for="(
                          technicien, key
                        ) in selectedEvent.listetechniciens"
                        :key="key"
                      >
                        <i
                          class="mdi mdi-account"
                          style="font-size: 22px; margin-bottom: 10px"
                        >
                        </i
                        >&nbsp;{{ technicien.name }}
                      </h6>
                    </div>
                    <div class="my-4 text-subtitle-1">
                      <i
                        class="mdi mdi-calendar-check"
                        style="font-size: 22px; margin-bottom: 10px"
                      >
                      </i>
                      <v-chip
                        ><span v-html="selectedEvent.start"></span
                      ></v-chip>
                    </div>

                    <div class="my-4 text-subtitle-1">
                      <h5>
                        <i
                          class="mdi mdi-format-list-group"
                          style="font-size: 22px; margin-bottom: 10px"
                        >
                        </i>
                        &nbsp; machine list :
                      </h5>
                      <div class="my-8 text-subtitle-8">
                        <h6
                          v-for="(machine, key) in selectedEvent.listemachines"
                          :key="key"
                        >
                          <i
                            class="mdi mdi-slot-machine"
                            style="font-size: 22px; margin-bottom: 10px"
                          >
                          </i
                          >&nbsp;{{ machine.reference }} {{ machine.marque }}
                        </h6>
                      </div>
                    </div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-actions> </v-card-actions>
                </v-card>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { HTTP } from "@/axios";
export default {
  data: () => ({
    selected: "",
    selectedclient: "",
    selectedmachine: "",
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    clients: [],
    machines: [],
    eventsbase: [],
    eventsbaseall: [],
  }),
  created() {
    this.getevents();
    this.getclients();
    this.getmachines();
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    getmachines() {
      HTTP.get("stocks/getstocksproduits")
        .then((response) => {
          this.machines = response.data;
        })
        .then((err) => console.log(err));
    },
    getclients() {
      HTTP.get("clients/getclients")
        .then((response) => {
          this.clients = response.data;
        })
        .then((err) => console.log(err));
    },

    // get all events
    getevents() {
      HTTP.get("events/getevents")
        .then((response) => {
          response.data.forEach((element, index, array) => {
            var date_debut = new Date(element.date_debut);
            var date_fin = new Date(element.date_fin);

            this.eventsbase.push({
              end: date_fin,
              start: date_debut,
              name: element.subject,
              color: element.color,
              nom_client: element.client_id["name"],
              listemachines: element.listemachines,
              listetechniciens: element.listetechniciens,
            });
          });
          this.eventsbaseall = this.eventsbase;
        })
        .then((err) => console.log(err));
    },

    // filter from selected value
    filter() {
      if (this.selectedclient == "") {
        this.eventsbase = this.eventsbaseall;
      } else if (this.selectedclient == "all") {
        this.eventsbase = this.eventsbaseall;
      } else {
        this.eventsbase = this.eventsbaseall;

        let filter = this.eventsbase.filter(
          (d) => d.color == this.selectedclient
        );
        this.eventsbase = filter;
      }
    },
    ////filtrer machine
    filtrermachine() {
      if (this.selectedmachine == "") {
        this.eventsbase = this.eventsbaseall;
      } else if (this.selectedmachine == "all") {
        this.eventsbase = this.eventsbaseall;
      } else {
        this.eventsbase = this.eventsbaseall;
        let filter = this.eventsbase.filter(
          (d) => d.machine == this.selectedmachine
        );
        this.eventsbase = filter;
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>
<style>
.marker {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  /* background: green; */
  margin-top: 44px;
  margin-left: 20px;
}
.cercle {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  /* background: green; */
  margin-top: 44px;
  margin-left: 20px;
}
label {
  font-size: 15px;
}
</style>
