    <template>
    <v-container fluid>
      <div class="dashboard-page">
        <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
          <h1 class="page-title">Users</h1>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }" >
              <router-link to="/adduser">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="secondary"
                  class="text-capitalize button-shadow mr-1"
                  >Add User</v-btn
                >
              </router-link>
            </template>
          </v-menu>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="support-requests mx-1 mb-1">
              <v-card-title class="pa-6 pb-0 white--text info">
                <p class="white--text">Liste des Users</p>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text class="pa-0">
                <v-simple-table>
                  <template v-slot:default>
                    <thead class="pl-2">
                      <tr>
                        <th class="text-left pa-6">Nom</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Telephone</th>
                        <th class="text-left">Roles</th>
                        <th class="text-left">Actions</th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user, key) in users" :key="key">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{  user.telephone }}</td>
                        <td>{{ user.role }}</td>
                       
                      
  
                        <td>
                          <v-menu>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon color="textColor"
                                  >mdi-dots-vertical</v-icon
                                >
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item>
                                <v-list-item-title
                                  ><router-link
                                   :to="{ name: 'edituser', params: { id: user._id } }"
                                   
                                  >
                                    edit
                                  </router-link></v-list-item-title
                                >
                              </v-list-item>
                              <v-dialog
                                v-model="dialog"
                                persistent
                                max-width="390"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-list-item>
                                    <v-list-item-title v-bind="attrs" v-on="on">
                                      delete
                                    </v-list-item-title>
                                  </v-list-item>
                                </template>
                                <v-card>
                                  <v-card-title class="text-h5">
                                    delete user?
                                  </v-card-title>
                                  <v-card-text
                                    >are you sure you want to delete this user
                                    ?</v-card-text
                                  >
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue"
                                      text
                                      @click="dialog = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      color="red"
                                      text
                                      @click="deleteuser(user._id)"
                                    >
                                      Confirmer
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-list>
                          </v-menu>
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
      users: [],
      dialog: false,
     
    };
  },


  computed: {
    searchFunction() {
      return this.users.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
  },
    created() {
     this.getusers();
    },
    
    methods: {
      getusers() {
      HTTP.get("users/getusers")
        .then((response) => {
          this.users = response.data;


        })

        .then((err) => console.log(err));
    },
    deleteuser(id) {
        HTTP.delete("users/deleteuser/" + id).then((response) => {
          console.log(response);
          this.$toast.success("user supprimé!", {
            position: "top-right",
          });
          this.getusers();
            this.dialog=false,
          this.$router.push("/users");
        });
      },

    },
  }
</script>

<style src="./Dashboard.scss" lang="scss"/>