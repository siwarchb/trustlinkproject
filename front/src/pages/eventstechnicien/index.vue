<template>
  <v-app>
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
    //   selecteduser:'',
    //   selectedmachine:'',
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
    //   users: [],
    //   machines: [],
    eventsbase: [],
    eventsbaseall: [],
  }),
  created() {
    this.getevents();
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    getevents() {
      let newObject = JSON.parse(window.localStorage.getItem("userData"));
      let id = newObject[0]["_id"];
      HTTP.get("events/geteventsbytechnicien/" + id)
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
    filter() {
      if (this.selecteduser == "") {
        this.eventsbase = this.eventsbaseall;
      } else if (this.selecteduser == "all") {
        this.eventsbase = this.eventsbaseall;
      } else {
        this.eventsbase = this.eventsbaseall;
        let filter = this.eventsbase.filter(
          (d) => d.color == this.selecteduser
        );

        this.eventsbase = filter;
      }
    },
    ////filtrer zone
    filterzone() {
      if (this.selectedzone == "") {
        this.eventsbase = this.eventsbaseall;
      } else if (this.selectedzone == "all") {
        this.eventsbase = this.eventsbaseall;
      } else {
        this.eventsbase = this.eventsbaseall;
        let filter = this.eventsbase.filter((d) => d.zone == this.selectedzone);

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
