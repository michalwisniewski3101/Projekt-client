<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="filteredTasks"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('app.taskList') }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search1"
            density="compact"
            :label="$t('app.search')"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            v-model="search2"
            :items="serverNames"
            :label="$t('app.serverName')"
            flat
            hide-details
            single-line
            clearable
          ></v-select>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-select
            v-model="search3"
            :items="appNames"
            :label="$t('app.appName')"
            flat
            hide-details
            single-line
            clearable
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>{{ $t('app.addTask') }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        :label="$t('app.taskName')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.server_name"
                        :items="serverNames"
                        :label="$t('app.serverName')"
                        clearable
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.app_name"
                        :items="appNames"
                        :label="$t('app.appName')"
                        clearable
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t('app.cancel') }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="save" :disabled="!validate()">
                  {{ $t('app.save') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <DeleteDialog
              :visible.sync="dialogDelete"
              :deleteWarning="deleteWarning"
              @close="closeDelete"
              @confirm="deleteItemConfirm"/>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <ActionButtons :item="item" @edit-item="editItem" @delete-item="deleteItem" />
      </template>
    </v-data-table>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      editedItem: {
        server_name: null,
        server_id: null,
        app_name:null,
        app_id: null,
        
      },
      defaultItem: {
        server_name: null,
        server_id: null,
        app_name:null,
        app_id: null,
      },
    };
  },
  computed: {
    ...mapState('data', ['servers', 'apps', 'tasks']),

    appNames() {
      return this.apps.map(app => app.name); 
    },

    headers() {
      return [
        {
          text: this.$t('app.name'),
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: this.$t('app.creationDate'), value: 'creation_date' },
        { text: this.$t('app.editionDate'), value: 'modification_date' },
        { text: this.$t('app.server'), value: 'server_name' },
        { text: this.$t('app.ID'), value: 'id' },
        { text: this.$t('app.app_name'), value: 'app_name' },
        { text: this.$t('app.actions'), value: 'actions', sortable: false },
      ];
    },

    filteredTasks() {
  const search1 = this.search1 ? this.search1 : '';
  const search2 = this.search2 ? this.search2 : '';
  const search3 = this.search3 ? this.search3 : '';

  return this.tasks.filter((task) => {
    const values = Object.values(task).map((value) =>
      value !== null && value !== undefined ? value.toString().toLowerCase() : ''
    );

    const search1Match =
      search1 === '' || values.some((value) => value.includes(search1.toLowerCase()));

    const search2Match =
      search2 === '' || task.server_name === search2;

    const search3Match =
      search3 === '' || task.app_name === search3;
      

    return search1Match && search2Match && search3Match;
  });
},

  },

  created() {
    if (!this.tasks.length ) {
      this.fetchData();
    }
  },


  methods: {
    ...mapActions('data', ['fetchData', 'addTask', 'updateTask', 'deleteTask']),
    editItem(item) {
      this.editedIndex = this.tasks.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.tasks.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteTask(this.editedItem.id);
      this.closeDelete();
    },

    validate() {
      return this.editedItem.name && this.editedItem.server_name;
    },

    save() {
      if (this.editedIndex > -1) {
        this.currentDate = new Date();
        this.editedItem.modification_date = this.formattedDate;
        this.updateTask(this.editedItem);
      } else {
        this.currentDate = new Date();
        this.editedItem.creation_date = this.formattedDate;
        this.editedItem.id = this.generateId();
        this.addTask(this.editedItem);
      }
      this.close();
    },

  },

};
</script>

<style>
h1 {
  text-align: center;
}
</style>
