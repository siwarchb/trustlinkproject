<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Choisir Catégorie
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"> Enregistrer </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form>
          <v-card
            class="mb-0"
            height="200px"
            style="display: flex; align-items: center; justify-content: center"
          >
            <v-combobox
              v-model="categorie"
              :items="items"
              :search-input.sync="search"
              clearable
              dense
              filled
              hide-selected
              outlined
              persistent-hint
              small-chips
              solo
              label="Select a category"
              size="55"
              :rules="[() => !!categorie || 'Category is required']"
            ></v-combobox>
          </v-card>
          <v-card
            height="200px"
            style="display: flex; align-items: center; justify-content: center"
          >
            <v-combobox
              v-model="subCategorie"
              :items="filteredSubItems"
              :search-input.sync="subSearch"
              item-text="name"
              item-value="name"
              clearable
              dense
              filled
              hide-selected
              outlined
              persistent-hint
              label="Select a subcategory"
              small-chips
              solo
              :size="32"
              :rules="[() => !!subCategorie || 'Subcategory is required']"
            ></v-combobox>
          </v-card>
          <v-btn color="primary" @click="e1 = 2" :disabled="!valid1"
            >Continue</v-btn
          >
          <v-btn text>Cancel</v-btn>
        </v-form>
      </v-stepper-content>

      <!-- show stepper based on subcategorie choiced -->

      <v-stepper-content step="2" v-if="subCategorie">
        <v-card class="mb-12" height="600px">
          <v-card-text>
            <template v-if="subCategorie.name === 'Voiture'">
              <!-- Display special fields for SubItem 1 -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Année Fabrication"
                        v-model="anneefabrication"
                        readonly
                        :rules="anneefabricationRules"
                        required
                        id="anneefabrication"
                        v-bind="attrs"
                        outlined
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="anneefabrication"
                      id="anneefabrication-picker"
                      type="month"
                      :picker-date.sync="anneefabrication"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="typecarburant"
                    label="Type Carburant"
                    type="text"
                    :rules="typecarburantRules"
                    outlined
                    required
                    id="typecarburant"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="puissance"
                    label="puissance"
                    :rules="puissanceRules"
                    type="text"
                    required
                    outlined
                    id="puissance"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="numerochassis"
                    label="numero chassis"
                    type="text"
                    outlined
                    required
                    :rules="numerochassisRules"
                    id="numerochassis"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="datevidange"
                    label="Date vidange"
                    type="date"
                    outlined
                    required
                    :rules="datevidangeRules"
                    id="datevidange"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="dateassurance"
                    label="Date assurance"
                    type="date"
                    outlined
                    required
                    :rules="dateassuranceRules"
                    id="dateassurance"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="datevisitetechnique"
                    label="Date visite technique"
                    type="date"
                    outlined
                    required
                    :rules="datevisitetechniqueRules"
                    id="datevisitetechnique"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-else-if="subCategorie.name === 'Camion'">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="matricule"
                    :rules="matriculeRules"
                    :counter="20"
                    outlined
                    label="matricule"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-menu
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        label="Année Fabrication"
                        v-model="anneefabrication"
                        :rules="anneefabricationRules"
                        readonly
                        required
                        id="anneefabrication"
                        v-bind="attrs"
                        outlined
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="anneefabrication"
                      id="anneefabrication-picker"
                      type="month"
                      :picker-date.sync="anneefabrication"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="typecarburant"
                    label="Type Carburant"
                    :rules="typecarburantRules"
                    type="text"
                    outlined
                    required
                    id="typecarburant"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="puissance"
                    :rules="puissanceRules"
                    label="puissance"
                    type="text"
                    required
                    outlined
                    id="puissance"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="numerochassis"
                    label="numero chassis"
                    type="text"
                    outlined
                    required
                    :rules="numerochassisRules"
                    id="numerochassis"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="datevidange"
                    label="Date vidange"
                    type="date"
                    outlined
                    required
                    :rules="datevidangeRules"
                    id="datevidange"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="datevignette"
                    label="Date vignette"
                    type="date"
                    outlined
                    required
                    :rules="datevignetteRules"
                    id="datevignette"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="dateassurance"
                    label="Date assurance"
                    type="date"
                    outlined
                    required
                    :rules="dateassuranceRules"
                    id="dateassurance"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="datevisitetechnique"
                    label="Date visite technique"
                    type="date"
                    outlined
                    required
                    :rules="datevisitetechniqueRules"
                    id="datevisitetechnique"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="kilometrage"
                    :rules="kilometrageRules"
                    :counter="20"
                    outlined
                    label="kilométrage"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="capacite"
                    :rules="capaciteRules"
                    :counter="20"
                    outlined
                    label="capacite"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-if="subCategorie.name === 'Réfrigirateur'">
              <!-- Display special fields for SubItem 1 -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="capaciterefrigidaire"
                    :rules="capaciterefrigidaireRules"
                    label="Capacite Refrigidaire"
                    type="text"
                    outlined
                    required
                    id="capaciterefrigidaire"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="classerefrigidaire"
                    :rules="classerefrigidaireRules"
                    label="Classe Refrigidaire"
                    type="text"
                    outlined
                    required
                    id="classerefrigidaire"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="typerefrigidaire"
                    label="Type Refrigidaire"
                    :rules="typerefrigidaireRules"
                    type="text"
                    required
                    outlined
                    id="typerefrigidaire"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="poidsrefrigidaire"
                    label="Poids Refrigidaire"
                    :rules="poidsrefrigidaireRules"
                    type="text"
                    outlined
                    required
                    id="poidsrefrigidaire"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-if="subCategorie.name === 'climatiseur'">
              <!-- Display special fields for SubItem 1 -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="capaciterefroidissement"
                    label="Capacité Refroidissement"
                    :rules="capaciterefroidissementRules"
                    type="text"
                    required
                    outlined
                    id="capaciterefroidissement"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="puissanceclimatiseur"
                    label="Puissance Climatiseur"
                    :rules="puissanceclimatiseurRules"
                    type="text"
                    required
                    outlined
                    id="puissanceclimatiseur"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="classeclimatiseur"
                    :rules="classeclimatiseurRules"
                    label="Classe climatiseur"
                    type="text"
                    required
                    outlined
                    id="classeclimatiseur"
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-if="subCategorie.name === 'machine à laver'">
              <!-- Display special fields for SubItem 1 -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="capacitemachine"
                    :rules="capacitemachineRules"
                    label="Capacité Machine"
                    type="text"
                    required
                    id="capacitemachine"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="vitessemachine"
                    :rules="vitessemachineRules"
                    label="Vitesse Machine"
                    type="text"
                    required
                    id="vitessemachine"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="classemachine"
                    :rules="classemachineRules"
                    label="Classe Machine"
                    type="text"
                    required
                    id="classemachine"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-if="subCategorie.name === 'aspirateur'">
              <!-- Display special fields for SubItem 1 -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="typeaspirateur"
                    label="Type Aspirateur"
                    :rules="typeaspirateurRules"
                    type="text"
                    required
                    id="typeaspirateur"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="puissanceaspirateur"
                    :rules="puissanceaspirateurRules"
                    label="Puissance Aspirateur"
                    type="text"
                    required
                    id="puissanceaspirateur"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="capaciteaspirateur"
                    :rules="capaciteaspirateurRules"
                    label="Capacité Aspirateur"
                    type="text"
                    required
                    id="capaciteaspirateur"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>

            <template v-if="subCategorie.name === 'cafitiére'">
              <!-- Display special fields for SubItem 1 -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    :rules="marqueRules"
                    v-model="marque"
                    :counter="20"
                    label="brand"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="modele"
                    :rules="modeleRules"
                    :counter="20"
                    outlined
                    label="model"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-select
                    label="Emplacement"
                    v-model="emplacement_id"
                    :items="emplacements"
                    :rules="emplacementRules"
                    outlined
                    item-text="nom"
                    item-value="_id"
                    return-object
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="typecafitiere"
                    label="Type Cafitiere"
                    :rules="typecafitiereRules"
                    type="text"
                    required
                    id="typecafitiere"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="capacitecafitiere"
                    :rules="capacitecafitiereRules"
                    label="Capacité Cafitiere"
                    type="text"
                    required
                    id="capacitecafitiere"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="puissancecafitiere"
                    :rules="puissancecafitiereRules"
                    label="puissance Cafitiere"
                    type="text"
                    required
                    id="puissancecafitiere"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="filtrationcafitiere"
                    :rules="filtrationcafitiereRules"
                    label="filtration Cafitiere"
                    type="text"
                    required
                    id="filtrationcafitiere"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>

        <v-btn color="primary" @click="save(subCategorie)"> Save </v-btn>

        <v-btn text @click="e1 = 1"> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import { HTTP } from "@/axios";
export default {
  data() {
    return {
      valid1: false,
      machine: {},
      emplacements: [],
      categorie: null,
      items: ["Machine mobile", "Grand-electroménager", "petit-électroménager"],
      search: "",
      subCategorie: null,
      subItems: [
        { name: "Voiture", categorie: "Machine mobile" },
        { name: "Camion", categorie: "Machine mobile" },
        { name: "Réfrigirateur", categorie: "Grand-electroménager" },
        { name: "machine à laver", categorie: "Grand-electroménager" },
        { name: "climatiseur", categorie: "Grand-electroménager" },
        { name: "aspirateur", categorie: "petit-électroménager" },
        { name: "cafitiére", categorie: "petit-électroménager" },
      ],
      subSearch: "",
      e1: 1,
      marque: "",
      modele: "",
      numlot: "",
      emplacement_id: "",
      anneefabrication: "",
      typecarburant: "",
      numerochassis: "",
      puissance: "",
      capacitemachine: "",
      vitessemachine: "",
      classemachine: "",
      capaciterefrigidaire: "",
      classerefrigidaire: "",
      typerefrigidaire: "",
      poidsrefrigidaire: "",
      capaciterefroidissement: "",
      puissanceclimatiseur: "",
      classeclimatiseur: "",
      typeaspirateur: "",
      puissanceaspirateur: "",
      capaciteaspirateur: "",
      typecafitiere: "",
      capacitecafitiere: "",
      puissancecafitiere: "",
      filtrationcafitiere: "",
      datevidange: "",
      matricule: "",
      datevignette: "",
      datevisitetechnique: "",
      kilometrage: "",
      capacite: "",
      dateassurance: "",
      matriculeRules: [(v) => !!v || "registration number is required"],

      kilometrageRules: [(v) => !!v || "mileage  is required"],

      capaciteRules: [(v) => !!v || "capacity is required"],
      puissanceRules: [(v) => !!v || "power is required"],
      numerochassisRules: [(v) => !!v || "chassis number is required"],
      datevidangeRules: [(v) => !!v || "emptying date is required"],
      dateassuranceRules: [(v) => !!v || "insurance date is required"],
      typecarburantRules: [(v) => !!v || "fuel type is required"],
      anneefabricationRules: [(v) => !!v || "year of manufacture is required"],
      emplacementRules: [(v) => !!v || "emplacement is required"],
      marqueRules: [(v) => !!v || "brand is required"],
      modeleRules: [(v) => !!v || "modele is required"],
      datevignetteRules: [
        (v) => !!v || "this date is required",
        (v) => new Date(v) <= new Date() || "The date must be after today",
      ],
      datevisitetechniqueRules: [
        (v) => !!v || "La date is required",
        (v) => new Date(v) >= new Date() || "The date must be before today",
      ],

      capaciterefrigidaireRules: [(v) => !!v || "fridge capacity is required"],
      classerefrigidaireRules: [(v) => !!v || "refrigerator class is required"],
      typerefrigidaireRules: [(v) => !!v || "fridge type is required"],
      poidsrefrigidaireRules: [(v) => !!v || "fridge weight is required"],
      capaciterefroidissementRules: [
        (v) => !!v || "cooling capacity is required",
      ],
      puissanceclimatiseurRules: [
        (v) => !!v || "powerair conditioner is required",
      ],
      classeclimatiseurRules: [
        (v) => !!v || "air conditioner class is required",
      ],
      capacitemachineRules: [(v) => !!v || "machine capacity is required"],

      vitessemachineRules: [(v) => !!v || "machine speed is required"],

      classemachineRules: [(v) => !!v || "machine class is required"],

      typeaspirateurRules: [(v) => !!v || "type is required"],
      puissanceaspirateurRules: [
        (v) => !!v || "vacuum cleaner power is required",
      ],

      capaciteaspirateurRules: [
        (v) => !!v || "vacuum cleaner capacity is required",
      ],
      typecafitiereRules: [(v) => !!v || "coffee maker type is required"],

      capacitecafitiereRules: [(v) => !!v || "coffee capacity is required"],

      puissancecafitiereRules: [(v) => !!v || "coffee maker power is required"],

      filtrationcafitiereRules: [(v) => !!v || "coffee filtration is required"],
      subCategorieRules: [(v) => !!v || "subCategorie is required"],
      CategoryRules: [(v) => !!v || "Categorie is required"],
    };
  },
  computed: {
    filteredSubItems() {
      if (this.categorie) {
        return this.subItems.filter(
          (item) => item.categorie === this.categorie
        );
      } else {
        return [];
      }
    },
  },
  created() {
    this.getemplacements();
  },
  watch: {
    categorie(newValue) {
      this.subCategorie = ""; // Reset the subCategorie value when categorie changes
      this.validateForm();
    },

    subCategorie(newVal) {
      this.validateForm();
    },
  },
  methods: {
    validateForm() {
      this.valid1 = !!this.categorie && !!this.subCategorie;
    },
    getemplacements() {
      HTTP.get("stocks/getemplacementsstockage")
        .then((response) => {
          this.emplacements = response.data;
        })
        .then((err) => console.log(err));
    },
    save(subCategory) {
      switch (subCategory.name) {
        case "Voiture": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            type: "Voiture",
            emplacement_id: this.emplacement_id,
            anneefabrication: this.anneefabrication,
            typecarburant: this.typecarburant,
            puissance: this.puissance,
            numerochassis: this.numerochassis,
            datevidange: this.datevidange,
            dateassurance: this.dateassurance,
            datevisitetechnique: this.datevisitetechnique,
            categorie: this.categorie,
          };
          break;
        }
        case "Camion": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            matricule: this.matricule,
            type: "Camion",
            emplacement_id: this.emplacement_id,
            anneefabrication: this.anneefabrication,
            typecarburant: this.typecarburant,
            puissance: this.puissance,
            numerochassis: this.numerochassis,
            datevidange: this.datevidange,
            datevignette: this.datevignette,
            dateassurance: this.dateassurance,
            datevisitetechnique: this.datevisitetechnique,
            kilometrage: this.kilometrage,
            capacite: this.capacite,
            categorie: this.categorie,
          };
          break;
        }
        case "Réfrigirateur": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            type: "Réfrigirateur",
            emplacement_id: this.emplacement_id,
            categorie: this.categorie,
            capaciterefrigidaire: this.capaciterefrigidaire,
            classerefrigidaire: this.classerefrigidaire,
            poidsrefrigidaire: this.poidsrefrigidaire,
            typerefrigidaire: this.typerefrigidaire,
          };
          break;
        }
        case "machine à laver": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            type: "machine à laver",
            emplacement_id: this.emplacement_id,
            categorie: this.categorie,
            capacitemachine: this.capacitemachine,
            vitessemachine: this.vitessemachine,
            classemachine: this.classemachine,
          };
          break;
        }
        case "climatiseur": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            type: "climatiseur",
            emplacement_id: this.emplacement_id,
            categorie: this.categorie,
            capaciterefroidissement: this.capaciterefroidissement,
            puissanceclimatiseur: this.puissanceclimatiseur,
            classeclimatiseur: this.classeclimatiseur,
          };
          break;
        }
        case "cafitiére": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            type: "cafitiére",
            emplacement_id: this.emplacement_id,
            categorie: this.categorie,
            typecafitiere: this.typecafitiere,
            capacitecafitiere: this.capacitecafitiere,
            filtrationcafitiere: this.filtrationcafitiere,
            puissancecafitiere: this.puissancecafitiere,
          };
          break;
        }
        case "aspirateur": {
          this.machine = {
            marque: this.marque,
            modele: this.modele,
            type: "aspirateur",
            emplacement_id: this.emplacement_id,
            categorie: this.categorie,
            typeaspirateur: this.typeaspirateur,
            puissanceaspirateur: this.puissanceaspirateur,
            capaciteaspirateur: this.capaciteaspirateur,
          };
          break;
        }
      }
      HTTP.post("machines/addmachine", this.machine).then((response) => {
        this.$toast.success("Machine Successfully Created!", {
          position: "top-right",
        });
        this.$router.push("/machines");
      });
    },
  },
};
</script>
