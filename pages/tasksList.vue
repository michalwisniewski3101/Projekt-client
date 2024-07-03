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
          <SearchField
            v-model="searchValues"
            :showSelect1="true"
            :showSelect2="true"
          />
         
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
                        v-model="editedItem.serverId"
                        :items="serverNames"
                        item-text="name"
                        item-value="serverId"
                        :label="$t('app.serverName')"
                        clearable
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.appId"
                        :items="appNames"
                        item-text="name"
                        item-value="appId"
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
        serverId: null,
        appId: null,
        
      },
      defaultItem: {
        serverId: null,
        appId: null,
      },
      deleteWarning: '',

    };
  },
  computed: {
    ...mapState('data', ['servers', 'apps', 'tasks']),



    headers() {
      return [
        {
          text: this.$t('app.name'),
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: this.$t('app.creationDate'), value: 'creationDate' },
        { text: this.$t('app.editionDate'), value: 'modificationDate' },
        { text: this.$t('app.server'), value: 'serverName' },
        { text: this.$t('app.ID'), value: 'id' },
        { text: this.$t('app.app_name'), value: 'appName' },
        { text: this.$t('app.actions'), value: 'actions', sortable: false },
      ];
    },

    filteredTasks() {
      const search1 = this.searchValues.search1 ? this.searchValues.search1.toLowerCase() : '';
      const search2 = this.searchValues.search2 ? this.searchValues.search2 : '';
      const search3 = this.searchValues.search3 ? this.searchValues.search3 : '';

  return this.tasks.filter((task) => {
    const search1Match = search1 === '' || task.name.toLowerCase().includes(search1);
    const search2Match = search2 === '' || task.serverName === search2;
    const search3Match = search3 === '' || task.appName === search3;

    return search1Match && search2Match && search3Match;
  });
}

  },

  created() {
    if (!this.tasks.length ) {
      this.fetchData();
    }
  },


  methods: {
    ...mapActions('data', ['fetchData', 'addTask', 'updateTask', 'deleteTask']),
    editItem(item) {
      this.editedIndex=0;
      this.editedItem.name=item.name;
      this.editedItemId=item.id;
      this.dialog = true;
    },

    deleteItem(id) {
      this.editedItemId=id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteTask(this.editedItemId).then(() => {
      this.fetchData();
    });
      this.closeDelete();
    },

    validate() {
      return this.editedItem.name && this.editedItem.serverId !== null;
    },

    save() {
  console.log(`Edited Item:`, this.editedItem);
  console.log(`Edited Item ID:`, this.editedItemId);
  if (this.editedIndex > -1) {
    this.updateTask({ task: this.editedItem, taskId: this.editedItemId }).then(() => {
      this.fetchData();
    });
    this.editedIndex = -1;
  } else {
    this.addTask(this.editedItem).then(() => {
      this.fetchData();
    });
  }
  this.close();
}


  },

};
</script>

<style>
h1 {
  text-align: center;
}
</style>
