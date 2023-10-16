<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row no-gutters class="d-flex justify-space-between mt-10 mb-6">
        <h6 class="page-title">Diagnosis the ticket:</h6>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click.prevent="$router.go(-1)"
              v-bind="attrs"
              v-on="on"
              color="primary"
              class="text-capitalize button-shadow mr-1"
              >Back</v-btn
            >
          </template>
        </v-menu>
      </v-row>
      <v-row>
        <div
          style="
            display: flex;
            justify-content: center;
            width: 200vw;
            height: 50%;
          "
          class="passenger"
        >
          <div class="passenger-ticket">
            <div class="passenger-ticket__line">
              <div class="passenger-ticket__data">
                <b>NUMERO</b><br />
                {{ ticket.numero }}
              </div>
              <div class="passenger-ticket__data">
                <b>CLIENT</b><br />
                {{ ticket.client_id["name"] }}
              </div>
            </div>
            <div class="passenger-ticket__bottom"></div>
          </div>
          <div class="passenger-ticket">
            <div class="passenger-ticket__line">
              <div class="passenger-ticket__data">
                <b>REVENDEUR</b><br />
                {{ ticket.revendeur }}
              </div>
              <div class="passenger-ticket__data">
                <b>NUMERO FACTURE</b><br />
                {{ ticket.numerofacture }}
              </div>
            </div>

            <div class="passenger-ticket__bottom"></div>
          </div>
          <div class="passenger-ticket">
            <div class="passenger-ticket__line">
              <div class="passenger-ticket__data">
                <b>DATE FACTURE</b><br />
                {{ ticket.datefacture | formatDate }}
              </div>
              <!-- <div class="passenger-ticket__data">
                <b>GARANTIE</b><br />
                {{ ticket.etat_garantie }}
              </div> -->
            </div>

            <div class="passenger-ticket__bottom"></div>
          </div>
          <div class="passenger-ticket__bottom"></div>
        </div>
      </v-row>

      <v-window v-model="step">
        <v-spacer></v-spacer>
        <br />
        <br />

        <!-- choisir les pannes  -->
        <v-window-item :value="1">
          <v-card style="width: 95%" class="ml-10">
            <v-container>
              <div>
                <v-card-text>
                  <v-spacer></v-spacer>
                  <br />
                  <h4>Select Tip:</h4>

                  <v-container>
                    <v-form v-model="ispanneValid">
                      <v-row>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="10">
                              <v-combobox
                                v-model="categorie"
                                :items="categories"
                                label="Categorie"
                                item-text="name"
                                :rules="categoryRules"
                                outlined
                                dense
                              ></v-combobox>
                            </v-col>
                            <v-col cols="2">
                              <v-dialog
                                style="float: right"
                                v-model="dialog1"
                                persistent
                                max-width="600px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="info"
                                    dark
                                    small
                                    fab
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    <v-icon>mdi-plus</v-icon>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">Add Categorie</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-text-field
                                            v-model="categorieadd"
                                            label="Categorie"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="dialog1 = false"
                                    >
                                      Close
                                    </v-btn>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="addcategorie()"
                                    >
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-btn
                                style="margin-left: 10px"
                                color="red"
                                dark
                                small
                                fab
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon>mdi-cancel</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="12">
                          <v-row>
                            <v-col cols="10">
                              <v-combobox
                                v-model="article"
                                :items="articles"
                                item-text="name"
                                label="Article"
                                :rules="articleRules"
                                outlined
                                dense
                              ></v-combobox>
                            </v-col>
                            <v-col cols="2">
                              <v-dialog
                                style="float: right"
                                v-model="dialog2"
                                persistent
                                max-width="600px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="info"
                                    dark
                                    small
                                    fab
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    <v-icon>mdi-plus</v-icon>
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-card-title>
                                    <span class="text-h5">Add article</span>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12">
                                          <v-combobox
                                            v-model="articleaddgroupe"
                                            :items="categories"
                                            label="Categorie"
                                            item-text="name"
                                            outlined
                                            dense
                                          ></v-combobox>
                                        </v-col>
                                        <v-col cols="12">
                                          <v-text-field
                                            v-model="articleaddname"
                                            label="Article"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                  </v-card-text>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="dialog2 = false"
                                    >
                                      Close
                                    </v-btn>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="addarticle()"
                                    >
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-btn
                                style="margin-left: 10px"
                                color="red"
                                dark
                                small
                                fab
                                v-bind="attrs"
                                v-on="on"
                              >
                                <v-icon>mdi-cancel</v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="commentaire"
                            label="Commentaire"
                          ></v-text-field>
                        </v-col>
                        <v-layout justify-center>
                          <v-card-actions>
                            <v-dialog
                              style="float: right"
                              v-model="dialog3"
                              persistent
                              max-width="600px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="info"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  Add Panne
                                  <v-icon>mdi-plus</v-icon>
                                </v-btn>
                              </template>

                              <v-card>
                                <v-card-title>
                                  <span class="text-h5">Add Panne</span>
                                </v-card-title>
                                <v-card-text>
                                  <v-container>
                                    <v-row>
                                      <v-col cols="12">
                                        <v-combobox
                                          v-model="panneaddgroupe"
                                          :items="categories"
                                          label="Categorie"
                                          item-text="name"
                                          outlined
                                          dense
                                        ></v-combobox>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-combobox
                                          v-model="panneaddarticle"
                                          :items="articles"
                                          label="Article"
                                          item-text="name"
                                          outlined
                                          dense
                                        ></v-combobox>
                                      </v-col>

                                      <v-col cols="12">
                                        <v-text-field
                                          v-model="panneaddname"
                                          label="Panne"
                                        ></v-text-field>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                  <small>*indicates required field</small>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog3 = false"
                                  >
                                    Close
                                  </v-btn>
                                  <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="addpanne()"
                                  >
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-card-actions>
                        </v-layout>
                        <v-col cols="12">
                          <v-card v-show="categorie || article" flat>
                            <v-card-text>
                              <v-container fluid>
                                <v-row>
                                  <v-col
                                    v-for="(panne, key) in pannes"
                                    :key="key"
                                    cols="12"
                                    sm="4"
                                    md="4"
                                  >
                                    <v-checkbox
                                      class="animate__animated animate__bounce"
                                      v-model="selected"
                                      :label="panne.name"
                                      color="green"
                                      :value="panne.name"
                                      :required="true"
                                      hide-details
                                    ></v-checkbox>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                  <br />
                </v-card-text>
              </div>
            </v-container>
          </v-card>
          <v-card-actions>
            <v-btn text @click="step--" :disabled="step === 1"> Back </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              depressed
              @click="step++"
              :disabled="!ispanneValid"
            >
              Next
            </v-btn>
          </v-card-actions>
        </v-window-item>

        <v-spacer></v-spacer>
        <br />
        <br />

        <!-- selection les pieces de rechanges -->
        <v-window-item :value="2">
          <div>
            <v-col cols="12">
              <v-card style="width: 95%" class="ml-10">
                <v-card-text>
                  <v-container v-show="ticket.typeproduit != 'autre'">
                    <v-icon></v-icon>

                    <h4 class="info--text">
                      <v-icon>mdi-hand-pointing-right</v-icon>

                      Sélectionner les piéces de rechanges
                    </h4>
                    <br />
                    <br />
                    <v-expansion-panels
                      v-for="data in form.piecequan"
                      :key="data"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                <b>Reference :{{ data.reference }}</b>
                              </v-col>
                              <v-col cols="8" class="text--secondary">
                                <v-fade-transition>
                                  <v-row no-gutters style="width: 100%">
                                    <v-col cols="4">
                                      <span v-if="open" key="0">
                                        Please complete the form
                                      </span>
                                      <span v-else key="1">
                                        <b>Marque : {{ data.marque }}</b>
                                      </span>
                                    </v-col>
                                    <v-col cols="4">
                                      <v-chip
                                        v-if="data.quantite > 0"
                                        class="ma-2"
                                        color="success"
                                        text-color="white"
                                      >
                                        Disponible ({{ data.quantite }})
                                      </v-chip>
                                      <v-chip
                                        v-else
                                        class="ma-2"
                                        color="red"
                                        text-color="white"
                                      >
                                        Non Disponible
                                      </v-chip>
                                    </v-col>

                                    <!-- demande stock dialog -->
                                    <v-col cols="4">
                                      <div class="text-center">
                                        <v-dialog width="900">
                                          <template
                                            v-slot:activator="{ on, attrs }"
                                          >
                                            <v-btn
                                              color="blue lighten-2"
                                              dark
                                              v-bind="attrs"
                                              v-on="on"
                                            >
                                              REQUEST STOCKS
                                            </v-btn>
                                          </template>
                                          <template v-slot:default="dialog">
                                            <v-card>
                                              <v-card-title
                                                class="text-h5 grey lighten-2"
                                              >
                                                Demande Stocks
                                              </v-card-title>

                                              <v-card-text>
                                                <v-form v-model="valid">
                                                  <br />

                                                  Veuillez contactez l'acheteur
                                                  :
                                                  <br />
                                                  <br />
                                                  <v-container>
                                                    <v-row>
                                                      <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="3"
                                                        v-model="form"
                                                      >
                                                        <v-text-field
                                                          outlined
                                                          label="Produit"
                                                          v-model="
                                                            data.reference
                                                          "
                                                          disabled
                                                          ref="inputField"
                                                        ></v-text-field>
                                                      </v-col>

                                                      <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="3"
                                                        v-model="marquepiece"
                                                      >
                                                        <v-text-field
                                                          outlined
                                                          disabled
                                                          label="Produit"
                                                          v-bind:value="
                                                            data.marque
                                                          "
                                                          v-model="data.marque"
                                                          ref="marque"
                                                        ></v-text-field>
                                                      </v-col>

                                                      <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="3"
                                                      >
                                                        <v-text-field
                                                          label="Quantité"
                                                          v-model="quantitee"
                                                          placeholder="Quantité"
                                                          :rules="quantiteRules"
                                                          outlined
                                                        ></v-text-field>
                                                      </v-col>

                                                      <v-col
                                                        cols="12"
                                                        sm="6"
                                                        md="3"
                                                      >
                                                        <v-combobox
                                                          v-model="email"
                                                          :items="
                                                            acheteursemails
                                                          "
                                                          label="email"
                                                          item-text="email"
                                                          :rules="emailRules"
                                                          outlined
                                                        ></v-combobox>
                                                      </v-col>
                                                    </v-row>
                                                  </v-container>
                                                </v-form>
                                              </v-card-text>

                                              <v-divider></v-divider>

                                              <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                  @click="
                                                    (dialog.value = false),
                                                      sendemaill()
                                                  "
                                                  style="float: right"
                                                  color="info"
                                                  :disabled="valid == false"
                                                >
                                                  Envoyer Mail
                                                </v-btn>
                                                <v-btn
                                                  color="error"
                                                  @click="dialog.value = false"
                                                >
                                                  Back
                                                </v-btn>
                                              </v-card-actions>
                                            </v-card>
                                          </template>
                                        </v-dialog>
                                      </div>
                                    </v-col>
                                  </v-row>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                          <v-row class="mb-12">
                            <v-col cols="12" md="12" v-if="data.quantite > 0">
                              <v-form v-model="valid1">
                                <v-row>
                                  <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                      outlined
                                      placeholder="Quantité"
                                      v-model="data.quantitedemandes"
                                      :rules="[
                                        (v) =>
                                          v <= data.quantite ||
                                          'quantite doit etre inferieur à la quantité disponible',
                                      ]"
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                      outlined
                                      label="Prix unitaire"
                                      placeholder="Prix unit"
                                      v-model="data.prixunitaire"
                                      disabled
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="4" md="4">
                                    <v-text-field
                                      outlined
                                      label="Produit"
                                      v-model="data.reference"
                                      disabled
                                    ></v-text-field>
                                  </v-col>
                                  <br />
                                </v-row>
                              </v-form>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <br />
                  </v-container>
                  <v-container v-show="ticket.typeproduit == 'autre'">
                    <v-icon></v-icon>

                    <h4 class="info--text">
                      Ajouter des piéces de rechanges
                      <v-dialog
                        style="float: right"
                        v-model="dialog4"
                        persistent
                        max-width="600px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="info"
                            dark
                            small
                            fab
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </template>
                        <v-form v-model="valid2">
                          <v-card>
                            <v-card-title>
                              <span class="text-h5">Add piéce de rechange</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="libelle"
                                      label="Libellé"
                                      :rules="champRules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="reference"
                                      label="Référence"
                                      :rules="champRules"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-select
                                      label="Emplacement"
                                      v-model="emplacement_id"
                                      :items="emplacements"
                                      item-text="nom"
                                      item-value="_id"
                                      :rules="champRules"
                                      return-object
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="prixunit"
                                      label="Prix unitaire"
                                      :rules="champRules"
                                      type="number"
                                      required
                                    ></v-text-field>
                                  </v-col>

                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="quantitepr"
                                      :rules="preRules"
                                      label="Quantite"
                                      type="number"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="6">
                                    <v-text-field
                                      v-model="produit"
                                      :rules="champRules"
                                      :counter="15"
                                      label="produit"
                                      required
                                    ></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                              <small>*champs obligatoires</small>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="red darken-1"
                                text
                                @click="dialog4 = false"
                              >
                                Back
                              </v-btn>
                              <v-btn
                                color="blue darken-1"
                                text
                                @click="addpr()"
                                :disabled="valid2 == false"
                              >
                                Add
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-form>
                      </v-dialog>
                    </h4>

                    <div id="table">
                      <table class="table-main">
                        <thead>
                          <tr class="tabletitle">
                            <th>reference</th>
                            <th>Quantité</th>
                            <th>Prixunit</th>
                          </tr>
                        </thead>
                        <tr
                          class="list-item"
                          v-for="(piece, key) in form1.piecequan"
                          :key="key"
                        >
                          <td data-label="Type" class="tableitem">
                            {{ piece.newpr.produit }}
                          </td>
                          <td data-label="Description" class="tableitem">
                            {{ piece.newpr.prixunit }}
                          </td>
                          <td data-label="Quantity" class="tableitem">
                            {{ piece.newpr.quantite }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </div>
          <v-card-actions
            v-show="ticket.typeproduit != 'autre'"
            v-if="ticket.etat == 'en_attente_pr'"
          >
            <v-btn color="primary" @click="step--" :disable_d="step === 1">
              Back
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              depressed
              @click="step++"
              id="next"
              style="display: none"
              :disabled="valid1 == false"
            >
              Next
            </v-btn>

            <v-btn
              color="primary"
              depressed
              @click="adddiagnosticpr()"
              id="enregistrerr"
              style="display: block"
            >
              Add
            </v-btn>
          </v-card-actions>

          <v-card-actions v-show="ticket.typeproduit != 'autre'" v-else>
            <v-btn color="primary" @click="step--" :disabled="step === 1">
              Back
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              depressed
              @click="step++, showonlyprselected()"
              id="next"
              style="display: block"
              :disabled="valid1 == false"
            >
              Next
            </v-btn>

            <v-btn
              color="primary"
              depressed
              @click="adddiagnosticpr()"
              id="enregistrer"
              style="display: none"
            >
              Add
            </v-btn>
          </v-card-actions>

          <v-card-actions v-show="ticket.typeproduit == 'autre'">
            <v-btn color="primary" @click="step--" :disabled="step === 1">
              Back
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              depressed
              @click="step++"
              id="next"
              style="display: block"
              :disabled="form1.piecequan.length > 0 == false"
            >
              Next
            </v-btn>

            <v-btn
              color="primary"
              depressed
              @click="adddiagnosticpr()"
              id="enregistrer"
              style="display: none"
            >
              Add
            </v-btn>
          </v-card-actions>
        </v-window-item>

        <!-- etat garantie  -->
        <v-window-item :value="3">
          <div v-show="ticket.typeproduit != 'autre'">
            <v-col cols="12">
              <v-card style="width: 95%" class="ml-10">
                <v-card-text>
                  <v-container>
                    <v-icon></v-icon>

                    <h4 class="info--text">
                      Etat Garantie

                      <v-container fluid p0>
                        <v-radio-group v-model="etat_garantie">
                          <v-radio
                            label="garantie"
                            color="blue"
                            value="garantie"
                            id="garantie"
                          ></v-radio>
                          <v-radio
                            label="non garantie"
                            color="blue"
                            id="nn garantie"
                            value="non garantie"
                          ></v-radio>
                        </v-radio-group>
                        <!-- <v-col
                          cols="12"
                          id="garantiebutton"
                          style="display: none"
                        >
                          <v-btn
                            @click="adddiagnostic()"
                            style="float: right"
                            color="info"
                          >
                            Enregistrer
                          </v-btn>
                        </v-col> -->
                      </v-container>
                    </h4>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </div>

          <div v-show="ticket.typeproduit == 'autre'">
            <v-col cols="12">
              <v-card style="width: 95%" class="ml-10">
                <v-card-text>
                  <v-container>
                    <v-icon></v-icon>

                    <h4 class="info--text">
                      Etat Garantie

                      <v-container fluid p0>
                        <v-radio-group v-model="etat_garantiee">
                          <v-radio
                            label="garantie"
                            color="blue"
                            value="garantie"
                            id="garantiee"
                          ></v-radio>
                          <v-radio
                            label="non garantie"
                            color="blue"
                            id="nn garantiee"
                            value="non garantie"
                          ></v-radio>
                        </v-radio-group>
                        <!-- <v-col
                          cols="12"
                          id="garantiebuttonn"
                          style="display: none"
                        >
                          <v-btn
                            @click="adddiagnostictypeautre()"
                            style="float: right"
                            color="info"
                          >
                            Enregistrerrrrrrrrautregarantie
                          </v-btn>
                        </v-col> -->
                      </v-container>
                    </h4>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </div>

          <v-card-actions>
            <v-btn text @click="step--" :disabled="step === 1"> Back </v-btn>
            <v-spacer></v-spacer>
            <div style="display: none" id="nextstep">
              <v-btn color="primary" @click="step++"> Next </v-btn>
            </div>
            <div style="display: none" id="nextstepp">
              <v-btn color="primary" @click="step += 2"> Next </v-btn>
            </div>
            <div style="display: none" id="nextstepp3">
              <v-btn color="primary" @click="step += 3"> Nextt3 </v-btn>
            </div>
          </v-card-actions>
        </v-window-item>

        <!-- devis des pr  -->
        <v-window-item :value="4">
          <div>
            <v-col cols="12">
              <v-card style="width: 95%" class="ml-10">
                <v-card-text>
                  <v-container>
                    <div class="v-card__text invoiceBody">
                      <v-container v-show="ticket.typeproduit != 'autre'">
                        <form>
                          <div class="row justify-space-between">
                            <div class="col-md-6 col-12">
                              <img
                                src="../../assets/client.png"
                                alt="Logo"
                                style="width: 65px"
                                class="invoiceLogo rounded"
                              />
                            </div>
                            <div class="col-md-4 col-12">
                              <h4 class="text-left">
                                <span
                                  class="greyBold--text font-weight-bold fs-base"
                                  >#{{ ticket.numero }}
                                </span>
                                <span class="greyBold--text fs-base"
                                  >/
                                  {{ ticket.datereception | formatDate }}</span
                                >
                              </h4>
                              <div
                                class="text-left fs-base greyBold--text"
                              ></div>
                            </div>
                          </div>
                          <div class="row mb-5 greyBold--text">
                            <div class="col col-6">
                              <h4 class="ma-0">Entreprise</h4>
                              <h5 class="mt-5">client</h5>
                              <address>
                                <br />
                                Tunisie, 54 rue du mercure Z.I ben arous 201 Ben
                                Arous,<br />
                                Ben Arous Est, Bin 'Arus<br />
                                <abbr title="Work email">e-mail: </abbr>
                                <a href="mailto:#">email@example.com</a>
                                <br />
                                <abbr title="Work Phone">phone:</abbr>
                                +216 70 029 400<br />
                                <abbr title="Work Fax">fax:</abbr>
                                +216 70 029 400
                              </address>
                            </div>
                            <div class="text-right col col-6">
                              <h4 class="ma-0">Client Information</h4>
                              <h6 class="client-name mt-5">
                                {{ ticket.name }} {{ ticket.prenom }}
                              </h6>
                              <address>
                                <strong>Consultant</strong>
                                at <a href="#">Allspana</a> <br /><abbr
                                  title="Work email"
                                  >e-mail:
                                </abbr>
                                <a href="mailto:#">{{ ticket.email }}</a>
                                <br /><abbr title="Work Phone">phone:</abbr>
                                {{ ticket.telephone }}<br />
                                <abbr title="Work Fax">fax:</abbr>
                                (012) 678-132-901
                              </address>
                            </div>
                          </div>
                          <v-row>
                            <v-col cols="12" sm="3" md="3">
                              &nbsp;Maintenance price:
                              <v-text-field
                                outlined
                                placeholder="Prix Maintenace"
                                v-model="prixmain"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                              &nbsp; Labor price: :
                              <v-text-field
                                outlined
                                placeholder="Labor price:"
                                v-model="prix_oeuvre"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3" md="3">
                              Duration Preparation per day(s):
                              <v-text-field
                                outlined
                                placeholder="Durée"
                                v-model="duree"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                              last confirmation date:
                              <v-text-field
                                outlined
                                type="date"
                                placeholder="Date confirmation"
                                v-model="date_confirmation"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <h5 class="info--text">Spare parts list</h5>
                          <div class="v-data-table theme--light">
                            <div class="v-data-table__wrapper">
                              <table id="table1">
                                <thead>
                                  <tr>
                                    <th class="text-left">Piece de rechange</th>

                                    <th class="text-left">Quantité</th>
                                    <th class="text-left">Prix unitaire</th>
                                    <th class="text-left">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="data in prselected.piecequan"
                                    :key="data"
                                  >
                                    <td>{{ data.marque }}</td>
                                    <td>
                                      {{ data.quantitedemandes }}
                                    </td>
                                    <td>{{ data.prixunitaire }} dt</td>

                                    <td>
                                      {{
                                        parseInt(data.prixunitaire) *
                                        parseInt(data.quantitedemandes)
                                      }}
                                      dt
                                    </td>
                                  </tr>
                                  <tr
                                    v-for="data1 in oldiagnostic"
                                    :key="data1"
                                  >
                                    <td>{{ data1.produit }}</td>
                                    <td>
                                      {{ data1.quantite }}
                                    </td>
                                    <td>{{ data1.prixunit }} dt</td>
                                    <td>
                                      {{
                                        parseInt(data1.prixunit) *
                                        parseInt(data1.quantite)
                                      }}
                                      dt
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-8 col-12"></div>
                            <div class="col-md-4 col-12">
                              <div class="row text-right justify-end">
                                <div class="col col-6"></div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <strong>Total</strong>
                                  </p>
                                </div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <span id="val"> {{ totalPrice }} dt</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="v-card__actions mt-5">
                            <div class="row no-gutters justify-end">
                              <button
                                @click="addoffre()"
                                type="button"
                                class="button-shadow v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default success"
                              >
                                <span class="v-btn__content"
                                  ><i
                                    aria-hidden="true"
                                    class="v-icon notranslate mr-2 mdi mdi-arrow-right theme--light"
                                  ></i>
                                  Confirmer &nbsp;
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </v-container>

                      <v-container v-show="ticket.typeproduit == 'autre'">
                        <form>
                          <div class="row justify-space-between">
                            <div class="col-md-6 col-12">
                              <img
                                src="../../assets/client.png"
                                alt="Logo"
                                style="width: 65px"
                                class="invoiceLogo rounded"
                              />
                            </div>
                            <div class="col-md-4 col-12">
                              <h4 class="text-left">
                                <span
                                  class="greyBold--text font-weight-bold fs-base"
                                  >#{{ ticket.numero }}
                                </span>
                                <span class="greyBold--text fs-base"
                                  >/
                                  {{ ticket.datereception | formatDate }}</span
                                >
                              </h4>
                              <div
                                class="text-left fs-base greyBold--text"
                              ></div>
                            </div>
                          </div>
                          <div class="row mb-5 greyBold--text">
                            <div class="col col-6">
                              <h4 class="ma-0">Entreprise</h4>
                              <h5 class="mt-5">client</h5>
                              <address>
                                <br />
                                Tunisie, 54 rue du mercure Z.I ben arous 201 Ben
                                Arous,<br />
                                Ben Arous Est, Bin 'Arus<br />
                                <abbr title="Work email">e-mail: </abbr>
                                <a href="mailto:#">email@example.com</a>
                                <br />
                                <abbr title="Work Phone">phone:</abbr>
                                +216 70 029 400<br />
                                <abbr title="Work Fax">fax:</abbr>
                                +216 70 029 400
                              </address>
                            </div>
                            <div class="text-right col col-6">
                              <h4 class="ma-0">Client Information</h4>
                              <h6 class="client-name mt-5">
                                {{ ticket.name }} {{ ticket.prenom }}
                              </h6>
                              <address>
                                <strong>Consultant</strong>
                                at <a href="#">Allspana</a> <br /><abbr
                                  title="Work email"
                                  >e-mail:
                                </abbr>
                                <a href="mailto:#">{{ ticket.email }}</a>
                                <br /><abbr title="Work Phone">phone:</abbr>
                                {{ ticket.telephone }}<br />
                                <abbr title="Work Fax">fax:</abbr>
                                (012) 678-132-901
                              </address>
                            </div>
                          </div>
                          <v-row>
                            <v-col cols="12" sm="3" md="3">
                              &nbsp;Maintenance price:
                              <v-text-field
                                outlined
                                placeholder="Prix Maintenace"
                                v-model="prixmain"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                              &nbsp; Labor price: :
                              <v-text-field
                                outlined
                                placeholder="Labor price:"
                                v-model="prix_oeuvre"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3" md="3">
                              Duration Preparation per day(s):
                              <v-text-field
                                outlined
                                placeholder="Durée"
                                v-model="duree"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3" md="3">
                              last confirmation date:
                              <v-text-field
                                outlined
                                type="date"
                                placeholder="Date confirmation"
                                v-model="date_confirmation"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <h5 class="info--text">Spare parts list</h5>
                          <div class="v-data-table theme--light">
                            <div class="v-data-table__wrapper">
                              <table id="table1">
                                <thead>
                                  <tr>
                                    <th class="text-left">Piece de rechange</th>

                                    <th class="text-left">Quantité</th>
                                    <th class="text-left">Prix unitaire</th>
                                    <th class="text-left">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="piece in form1.piecequan"
                                    :key="piece"
                                  >
                                    <td>{{ piece.newpr.produit }}</td>
                                    <td>
                                      {{ piece.newpr.quantite }}
                                    </td>
                                    <td>{{ piece.newpr.prixunit }} dt</td>

                                    <td>
                                      {{
                                        parseInt(piece.newpr.prixunit) *
                                        parseInt(piece.newpr.quantite)
                                      }}
                                      dt
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-8 col-12"></div>
                            <div class="col-md-4 col-12">
                              <div class="row text-right justify-end">
                                <div class="col col-6"></div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <strong>Total</strong>
                                  </p>
                                </div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <span id="val"> {{ totalPrice1 }} dt</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="v-card__actions mt-5">
                            <div class="row no-gutters justify-end">
                              <button
                                @click="addoffretypeautre()"
                                type="button"
                                class="button-shadow v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default success"
                              >
                                <span class="v-btn__content"
                                  ><i
                                    aria-hidden="true"
                                    class="v-icon notranslate mr-2 mdi mdi-arrow-right theme--light"
                                  ></i>
                                  Confirmer &nbsp;
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </v-container>
                    </div>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </div>
          <v-card-actions>
            <v-btn text @click="step--" :disabled="step === 1"> Back </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-window-item>

        <v-window-item :value="5">
          <div>
            <v-col cols="12">
              <v-card style="width: 95%" class="ml-10">
                <v-card-text>
                  <v-container>
                    <div class="v-card__text invoiceBody">
                      <v-container v-show="ticket.typeproduit != 'autre'">
                        <form>
                          <div class="row justify-space-between">
                            <div class="col-md-6 col-12">
                              <img
                                src="../../assets/client.png"
                                alt="Logo"
                                style="width: 65px"
                                class="invoiceLogo rounded"
                              />
                            </div>
                            <div class="col-md-4 col-12">
                              <h4 class="text-left">
                                <span
                                  class="greyBold--text font-weight-bold fs-base"
                                  >#{{ ticket.numero }}
                                </span>
                                <span class="greyBold--text fs-base"
                                  >/
                                  {{ ticket.datereception | formatDate }}</span
                                >
                              </h4>
                              <div
                                class="text-left fs-base greyBold--text"
                              ></div>
                            </div>
                          </div>
                          <div class="row mb-5 greyBold--text">
                            <div class="col col-6">
                              <h4 class="ma-0">Entreprise</h4>
                              <h5 class="mt-5">client</h5>
                              <address>
                                <br />
                                Tunisie, 54 rue du mercure Z.I ben arous 201 Ben
                                Arous,<br />
                                Ben Arous Est, Bin 'Arus<br />
                                <abbr title="Work email">e-mail: </abbr>
                                <a href="mailto:#">email@example.com</a>
                                <br />
                                <abbr title="Work Phone">phone:</abbr>
                                +216 70 029 400<br />
                                <abbr title="Work Fax">fax:</abbr>
                                +216 70 029 400
                              </address>
                            </div>
                            <div class="text-right col col-6">
                              <h4 class="ma-0">Client Information</h4>
                              <h6 class="client-name mt-5">
                                {{ ticket.name }} {{ ticket.prenom }}
                              </h6>
                              <address>
                                <strong>Consultant</strong>
                                at <a href="#">Allspana</a> <br /><abbr
                                  title="Work email"
                                  >e-mail:
                                </abbr>
                                <a href="mailto:#">{{ ticket.email }}</a>
                                <br /><abbr title="Work Phone">phone:</abbr>
                                {{ ticket.telephone }}<br />
                                <abbr title="Work Fax">fax:</abbr>
                                (012) 678-132-901
                              </address>
                            </div>
                          </div>

                          <h5 class="info--text">Spare parts list</h5>
                          <div class="v-data-table theme--light">
                            <div class="v-data-table__wrapper">
                              <table id="table1">
                                <thead>
                                  <tr>
                                    <th class="text-left">Piece de rechange</th>

                                    <th class="text-left">Quantité</th>
                                    <th class="text-left">Prix unitaire</th>
                                    <th class="text-left">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="data in prselected.piecequan"
                                    :key="data"
                                  >
                                    <td>{{ data.marque }}</td>
                                    <td>
                                      {{ data.quantitedemandes }}
                                    </td>
                                    <td>{{ data.prixunitaire }} dt</td>

                                    <td>
                                      {{
                                        parseInt(data.prixunitaire) *
                                        parseInt(data.quantitedemandes)
                                      }}
                                      dt
                                    </td>
                                  </tr>
                                  <tr
                                    v-for="data1 in oldiagnostic"
                                    :key="data1"
                                  >
                                    <td>{{ data1.produit }}</td>
                                    <td>
                                      {{ data1.quantite }}
                                    </td>
                                    <td>{{ data1.prixunit }} dt</td>
                                    <td>
                                      {{
                                        parseInt(data1.prixunit) *
                                        parseInt(data1.quantite)
                                      }}
                                      dt
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-8 col-12"></div>
                            <div class="col-md-4 col-12">
                              <div class="row text-right justify-end">
                                <div class="col col-6"></div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <strong>Total</strong>
                                  </p>
                                </div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <span id="val"> {{ totalPrice }} dt</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="v-card__actions mt-5">
                            <div class="row no-gutters justify-end">
                              <button
                                @click="adddiagnostic()"
                                type="button"
                                class="button-shadow v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default success"
                              >
                                <span class="v-btn__content"
                                  ><i
                                    aria-hidden="true"
                                    class="v-icon notranslate mr-2 mdi mdi-arrow-right theme--light"
                                  ></i>
                                  Confirmer &nbsp;
                                </span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </v-container>

                      <v-container
                        v-show="ticket.typeproduit == 'autre'"
                        id="invoiceholder"
                      >
                        <form>
                          <div class="row justify-space-between">
                            <div class="col-md-6 col-12">
                              <img
                                src="../../assets/client.png"
                                alt="Logo"
                                style="width: 65px"
                                class="invoiceLogo rounded"
                              />
                            </div>
                            <div class="col-md-4 col-12">
                              <h4 class="text-left">
                                <span
                                  class="greyBold--text font-weight-bold fs-base"
                                  >#{{ ticket.numero }}
                                </span>
                                <span class="greyBold--text fs-base"
                                  >/
                                  {{ ticket.datereception | formatDate }}</span
                                >
                              </h4>
                              <div
                                class="text-left fs-base greyBold--text"
                              ></div>
                            </div>
                          </div>
                          <div class="row mb-5 greyBold--text">
                            <div class="col col-6">
                              <h4 class="ma-0">Entreprise</h4>
                              <h5 class="mt-5">client</h5>
                              <address>
                                <br />
                                Tunisie, 54 rue du mercure Z.I ben arous 201 Ben
                                Arous,<br />
                                Ben Arous Est, Bin 'Arus<br />
                                <abbr title="Work email">e-mail: </abbr>
                                <a href="mailto:#">email@example.com</a>
                                <br />
                                <abbr title="Work Phone">phone:</abbr>
                                +216 70 029 400<br />
                                <abbr title="Work Fax">fax:</abbr>
                                +216 70 029 400
                              </address>
                            </div>
                            <div class="text-right col col-6">
                              <h4 class="ma-0">Client Information</h4>
                              <h6 class="client-name mt-5">
                                {{ ticket.name }} {{ ticket.prenom }}
                              </h6>
                              <address>
                                <strong>Consultant</strong>
                                at <a href="#">Allspana</a> <br /><abbr
                                  title="Work email"
                                  >e-mail:
                                </abbr>
                                <a href="mailto:#">{{ ticket.email }}</a>
                                <br /><abbr title="Work Phone">phone:</abbr>
                                {{ ticket.telephone }}<br />
                                <abbr title="Work Fax">fax:</abbr>
                                (012) 678-132-901
                              </address>
                            </div>
                          </div>

                          <h5 class="info--text">Spare parts list</h5>
                          <div class="v-data-table theme--light">
                            <div class="v-data-table__wrapper">
                              <table id="table1">
                                <thead>
                                  <tr>
                                    <th class="text-left">Piece de rechange</th>

                                    <th class="text-left">Quantité</th>
                                    <th class="text-left">Prix unitaire</th>
                                    <th class="text-left">Total</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="piece in form1.piecequan"
                                    :key="piece"
                                  >
                                    <td>{{ piece.newpr.produit }}</td>
                                    <td>
                                      {{ piece.newpr.quantite }}
                                    </td>
                                    <td>{{ piece.newpr.prixunit }} dt</td>

                                    <td>
                                      {{
                                        parseInt(piece.newpr.prixunit) *
                                        parseInt(piece.newpr.quantite)
                                      }}
                                      dt
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-8 col-12"></div>
                            <div class="col-md-4 col-12">
                              <div class="row text-right justify-end">
                                <div class="col col-6"></div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <strong>Total</strong>
                                  </p>
                                </div>
                                <div class="col col-3">
                                  <p class="ma-0">
                                    <span id="val"> {{ totalPrice1 }} dt</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="v-card__actions mt-5">
                            <div class="row no-gutters justify-end">
                              <button
                                @click="adddiagnostictypeautre()"
                                type="button"
                                class="button-shadow v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default success"
                              >
                                <span class="v-btn__content"
                                  ><i
                                    aria-hidden="true"
                                    class="v-icon notranslate mr-2 mdi mdi-arrow-right theme--light"
                                  ></i>
                                  Confirmer &nbsp;
                                </span>
                              </button>
                              &nbsp;
                              <button
                                type="button"
                                @click="printContent('invoiceholder')"
                                class="button-shadow v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
                              >
                                <v-icon left dark> mdi-cloud-upload </v-icon
                                >Print
                              </button>
                            </div>
                          </div>
                        </form>
                      </v-container>
                    </div>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-col>
          </div>
          <v-card-actions>
            <v-btn text @click="step -= 2" :disabled="step === 1"> Back </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>
    </div>
  </v-container>
</template>

<script>
import { HTTP } from "@/axios";
import Stepper from "vuejs-stepper";
import $ from "jquery";

export default {
  data() {
    return {
      ispanneValid: false,
      valid: false,
      valid1: false,
      step: 1,
      isFormValid: false,
      emplacements: [],
      valid2: false,

      libelle: "",
      reference: "",
      quantitepr: "",
      emplacement_id: "",
      produit: "",

      emailRules: [(v) => !!v || "champ est obligatoire"],
      quantityRules: [
        (v) => !!v || "pr is required",
        // (v) => v.length <= 20 || "pr must be less than 20 characters",
        (v) =>
          v <= this.form.piecequan.pr || "pr must be less than emplacement",
      ],
      preRules: [
        (v) => !!v || "quantité est obligatoire",
        // (v) => v.length <= 20 || "pr must be less than 20 characters",
        (v) =>
          v <= this.emplacement_id.capaciterestante ||
          "quantité doit etre inferieur au emplacement ",
      ],
      prRules: [(v) => !!v || "champ est obligatoire"],
      categoryRules: [(v) => !!v || "champ est obligatoire"],
      articleRules: [(v) => !!v || "champ est obligatoire"],
      commentaireRules: [(v) => !!v || "champ est obligatoire"],
      champRules: [(v) => !!v || "champ est obligatoire"],

      dialog: false,
      prixmain: "",
      prix_oeuvre: "",
      duree: "",
      date_confirmation: "",

      diagnosticselected: [],
      prixpdt: "",
      referencepdtselect: "",
      etat_garantie: "",
      etat_garantiee: "",

      commentaire: "",
      garantie: "garantie",
      hors_garantie: "non garantie",
      acheteursemails: [],
      sendemail: {},
      piecederech: "",
      marquepiece: "",
      piecesderechanges: {},
      categorieadd: "",
      articleaddname: "",
      articleaddgroupe: "",
      panneaddname: "",
      panneaddgroupe: "",
      panneaddarticle: "",
      pr: "",
      quantitedemandes: "",
      quantitee: "",
      email: "",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,

      selected: [],
      selectedd: "",
      ticket: {},
      oldiagnostic: {},

      stepperOptions: {
        headers: [
          { title: "etape 1" },
          { title: "etape 2" },
          { title: "etape 3" },
          // {title: 'etape 4'}
        ],
        prevText: "Previous",
        nextText: "Next",
      },
      categorie: "",
      name: "",
      article: "",
      categories: [],
      articles: [],
      articlesold: [],
      pannes: [],
      form: {
        piecequan: [],
      },

      form1: {
        piecequan: [],
      },
      listepr: {
        pr: [],
      },

      prselected: {
        piecequan: [],
      },
      diagnostic: {
        pr: [],
        ticket: "",
        panne: [],
        commentaire: "",
      },
      pannesold: [],
      token: localStorage.getItem("token"),
    };
  },

  computed: {
    totalPrice() {
      let total = 0;
      for (let p of this.prselected.piecequan) {
        total += parseInt(p.prixunitaire) * parseInt(p.quantitedemandes);
      }
      return total;
    },
    totalPrice1() {
      let total = 0;
      for (let p of this.form1.piecequan) {
        total += parseInt(p.newpr.prixunit) * parseInt(p.newpr.quantite);
      }
      return total;
    },
  },
  mounted: function () {
    $("#js-licensing").hide();
  },

  watch: {
    etat_garantie: function (val) {
      let element = { title: "etape 4" };

      if (val == "non garantie") {
        let check = this.stepperOptions.headers.includes(element, 0);

        document.getElementById("nextstepp").style.display = "none";
        document.getElementById("nextstep").style.display = "block";
      } else {
        document.getElementById("nextstepp").style.display = "block";
        document.getElementById("nextstep").style.display = "none";
      }
    },

    etat_garantiee: function (val) {
      let element = { title: "etape 4" };

      if (val == "non garantie") {
        let check = this.stepperOptions.headers.includes(element, 0);

        document.getElementById("nextstepp").style.display = "none";
        document.getElementById("nextstep").style.display = "block";
        this.stepperOptions.headers.push(element);
      } else {
        document.getElementById("nextstepp").style.display = "block";
        document.getElementById("nextstep").style.display = "none";
        console.log("no");
      }
    },

    categorie: function (val) {
      if (val) {
        this.selected = [];
        this.articles = this.articlesold;
        let filter = this.articles.filter((d) => d.groupe == val.name);

        this.articles = filter;
        ////
        this.selected = [];
        this.pannes = this.pannesold;
        let filter2 = this.pannes.filter((d) => d.groupe == val.name);

        this.pannes = filter2;
      }
    },
    article: function (val) {
      if (val) {
        this.selected = [];
        this.pannes = this.pannesold;
        let filter = this.pannes.filter((d) => d.article == val.name);

        this.pannes = filter;
      }
    },
  },
  created: function () {
    this.getticketById();
    this.getcategories();
    this.getarticles();
    this.getpannes();
    this.getpiecesderechanges();
    this.getacheteurs();
    this.getemplacements();
  },

  methods: {
    getemplacements() {
      HTTP.get("stocks/getemplacementsstockage")
        .then((response) => {
          console.log(response.data);
          this.emplacements = response.data;
        })
        .then((err) => console.log(err));
    },

    addpr() {
      let pr = {
        prixunit: this.prixunit,
        libelle: this.libelle,
        reference: this.reference,
        produit: this.produit,
        quantite: this.quantitepr,
        type: "piece de rechange",
        emplacement_id: this.emplacement_id,
      };
      let newpr = {
        produit: this.reference,
        quantite: this.quantitepr,
        prixunit: this.prixunit,
      };
      this.form1.piecequan.push({ newpr });
      this.listepr.pr.push({ pr });

      console.log(this.form1.piecequan);
      console.log(this.listepr.pr);
      this.dialog4 = false;
      this.$toast.success("Piece de rechange ajouté!", {
        position: "top-right",
      });
      this.prixunit = "";
      this.libelle = "";
      this.reference = "";
      this.produit = "";
      this.quantitepr = "";
      this.emplacement_id = "";
    },

    printContent(el) {
      var restorepage = $("body").html();
      var printcontent = $("#" + el).clone();
      var enteredtext = $("#text").val();
      $("body").empty().html(printcontent);
      window.print();
      $("body").html(restorepage);
    },

    getdiagnostic() {
      HTTP.get("diagnostics/getdiagnosticsbyid/" + this.$route.params.id)
        .then((res) => {
          this.oldiagnostic = res.data;

          console.log(this.oldiagnostic);
        })
        .then((err) => console.log(err));
    },
    addgarantiediag() {
      let ticket = {
        _id: this.ticket._id,
        garantie: this.etat_garantie,
      };
      HTTP.put("tickets/updategarantieticket", ticket).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("Ticket modifié!", {
              position: "top-right",
            });

            this.$router.push("/tickets");
          }
        },
        (err) => {
          this.error = err.response.data.error;
          console.log(this.error);
        }
      );
    },
    sendemaill() {
      this.piecederech = this.$refs.inputField[0].value;
      this.marquepiece = this.$refs.marque[0].value;

      console.log(this.ticket._id);
      let sendemail = {
        email: this.email.email,
        quantite: this.quantitee,
        pr: this.piecederech,
        marque: this.marquepiece,
        token: this.token,
        ticket: this.ticket._id,
      };

      HTTP.post("diagnostics/sendmail", sendemail).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("Mail envoyé!", {
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
          }
          this.dialog = false;
          document.getElementById("enregistrer").style.display = "block";
          document.getElementById("next").style.display = "none";
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getpannes() {
      HTTP.get("pannes/getpannes")
        .then((response) => {
          this.pannes = response.data;
          this.pannesold = response.data;
        })

        .then((err) => console.log(err));
    },
    getacheteurs() {
      HTTP.get("acheteurs/getacheteursemails")
        .then((response) => {
          this.acheteursemails = response.data;
        })

        .then((err) => console.log(err));
    },

    getpiecesderechanges() {
      HTTP.get("stocks/getpiecesderechanges/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data);

          let array = [];
          response.data.forEach((value) => {
            this.form.piecequan.push({
              reference: value.reference,
              marque: value.marque,
              quantite: value.quantite,
              prixunitaire: value.prixunit,
              quantitedemandes: "",
            });
          });
        })

        .then((err) => console.log(err));
    },
    getarticles() {
      HTTP.get("pannes/getarticles")
        .then((response) => {
          this.articles = response.data;
          this.articlesold = response.data;
        })

        .then((err) => console.log(err));
    },
    getcategories() {
      HTTP.get("pannes/getcategories")
        .then((response) => {
          this.categories = response.data;
        })

        .then((err) => console.log(err));
    },

    getticketById() {
      HTTP.get("tickets/getticketsbyid/" + this.$route.params.id)
        .then((res) => {
          this.ticket = res.data;
        })
        .then((err) => console.log(err));
    },

    getdiagnosticByticketId() {
      HTTP.get("diagnostics/getdiagnosticsbyid/" + this.$route.params.id)
        .then((res) => {
          this.oldiagnostic = res.data;
        })
        .then((err) => console.log(err));
    },

    addcategorie() {
      let categorie = {
        name: this.categorieadd,
      };
      HTTP.post("pannes/addcategorie", categorie).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("categorie ajouté!", {
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
            this.dialog1 = false;

            this.categorieadd = "";
            this.getcategories();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addarticle() {
      let article = {
        name: this.articleaddname,
        groupe: this.articleaddgroupe.name,
      };
      HTTP.post("pannes/addarticle", article).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("article ajouté!", {
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
            this.dialog2 = false;

            this.articleaddname = "";
            this.articleaddgroupe = "";
            this.getarticles();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addpanne() {
      let panne = {
        name: this.panneaddname,
        groupe: this.panneaddgroupe.name,
        article: this.panneaddarticle.name,
      };
      HTTP.post("pannes/addapanne", panne).then(
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
            this.dialog3 = false;

            this.panneaddname = "";
            this.panneaddgroupe = "";
            this.panneaddarticle = "";
            this.getarticles();
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },

    addoffre() {
      const proffres = [];
      this.prselected.piecequan.forEach((piece) => {
        let newpr = {
          produit: piece.reference,
          quantite: piece.quantitedemandes,
          prixunit: piece.prixunitaire,
        };
        proffres.push({ newpr });
      });

      let offre = {
        ticket: this.ticket._id,
        prixmain: this.prixmain,
        prix_oeuvre: this.prix_oeuvre,
        duree: this.duree,
        date_confirmation: this.date_confirmation,
        pr: proffres,
        client_id: this.ticket.client_id["_id"],
        panne: this.selected,
        commentaire: this.commentaire,
        article: this.article,
        categorie: this.categorie,
      };
      console.log(offre);
      HTTP.post("offres/addoffre", offre).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("offre ajouté!", {
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
            this.$router.push("/diagnostics");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    addoffretypeautre() {
      const proffres = [];
      this.form1.piecequan.forEach((piece) => {
        let newpr = {
          produit: piece.newpr.produit,
          quantite: piece.newpr.quantite,
          prixunit: piece.newpr.prixunit,
        };
        proffres.push({ newpr });
      });

      let piecderech = {
        prixunit: this.prixunit,
        libelle: this.libelle,
        reference: this.reference,
        produit: this.produit,
        quantite: this.quantitepr,
        type: "piece de rechange",
        emplacement_id: this.emplacement_id,
      };

      let offre = {
        ticket: this.ticket._id,
        prixmain: this.prixmain,
        prix_oeuvre: this.prix_oeuvre,
        duree: this.duree,
        date_confirmation: this.date_confirmation,
        pr: proffres,
        client_id: this.ticket.client_id["_id"],
        listeprs: this.listepr,
      };
      HTTP.post("offres/addoffretypeautre", offre).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("offre ajouté!", {
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
            this.$router.push("/diagnostics");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    adddiagnostic() {
      this.form.piecequan.forEach((piece) => {
        let newpr = {
          produit: piece.reference,
          quantite: piece.quantitedemandes,
          prixunit: piece.prixunitaire,
        };
        this.diagnostic.pr.push({ newpr });
      });

      this.diagnostic = {
        ticket: this.ticket._id,
        panne: this.selected,
        commentaire: this.commentaire,
        article: this.article,
        categorie: this.categorie,
        piecesderechanges: this.diagnostic.pr,
        client_id: this.ticket.client_id["_id"],
      };

      HTTP.post("diagnostics/adddiagnostic", this.diagnostic).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("diagnostic ajouté!", {
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
            this.$router.push("/diagnostics");
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.$router.push("/diagnostics");

      // location.reload();
    },
    adddiagnostictypeautre() {
      this.form1.piecequan.forEach((piece) => {
        let newpr = piece.newpr;
        this.diagnostic.pr.push({ newpr });
      });
      console.log(this.diagnostic.pr);

      this.diagnostic = {
        ticket: this.ticket._id,
        panne: this.selected,
        commentaire: this.commentaire,
        article: this.article,
        categorie: this.categorie,
        piecesderechanges: this.diagnostic.pr,
      };

      HTTP.post("diagnostics/adddiagnostictypeautre", this.diagnostic).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("diagnostic ajouté!", {
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
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.$router.push("/diagnostics");
      location.reload();
    },

    adddiagnosticpr() {
      const listediagnostic = [];

      this.form.piecequan.forEach((piece) => {
        if (piece.quantitedemandes != "") {
          let newpr = {
            produit: piece.reference,
            quantite: piece.quantitedemandes,
            prixunit: piece.prixunitaire,
          };
          this.diagnostic.pr.push({ newpr });
        } else {
          this.diagnostic.pr == [];
        }
      });
      this.diagnostic = {
        ticket: this.ticket._id,
        panne: this.selected,
        commentaire: this.commentaire,
        article: this.article,
        categorie: this.categorie,

        piecesderechanges: this.diagnostic.pr,
      };
      HTTP.post("diagnostics/adddiagnosticpr", this.diagnostic).then(
        (res) => {
          if (res.status === 200) {
            this.$toast.success("diagnostic ajouté!", {
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
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this.$router.push("/diagnostics");
      location.reload();
    },

    showonlyprselected() {
      const prselected = [];
      this.form.piecequan.forEach((value) => {
        if (value.quantitedemandes != "") {
          prselected.push({
            reference: value.reference,
            marque: value.marque,
            quantite: value.quantite,
            prixunitaire: value.prixunitaire,
            quantitedemandes: value.quantitedemandes,
          });
          this.prselected.piecequan = prselected;
          console.log(this.prselected);
        } else {
          console.log("quantite demande is not found");
        }
      });
    },
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
