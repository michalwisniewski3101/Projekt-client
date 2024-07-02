<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="filteredApps"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('app.appList') }}</v-toolbar-title>
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
            item-text="name"
            item-value="server_id"
            :label="$t('app.serverName')"
            clearable
            flat
            hide-details
            single-line
          ></v-select>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>{{ $t('app.addApp') }}
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
                        :label="$t('app.appName')"
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
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{$t('app.cancel')}}
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  :disabled="!validate()"
                >
                  {{$t('app.save')}}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <DeleteDialog
            :visible.sync="dialogDelete"
            :deleteWarning="deleteWarning"
            @close="closeDelete"
            @confirm="deleteItemConfirm"
          />
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
        
      },
      defaultItem: {
        serverId: null,
        
      },

      
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
        { text: this.$t('app.serverName'), value: 'serverName' },
        { text: this.$t('app.ID'), value: 'id' },
        { text: this.$t('app.actions'), value: 'actions', sortable: false },
      ];
    },
    filteredApps() {
      const search1 = this.search1 ? this.search1.toLowerCase() : '';
      const search2 = this.search2 ? this.search2 : '';

      return this.apps.filter((app) => {
        const serverName = this.servers.find((server) => server.id === app.server_id)?.name || '';
        const values = [
          app.name,
          app.creationDate,
          app.modificationDate,
          app.serverName,
          app.id,
        ];

        const search1Match = search1 === '' || values.some((value) => value.includes(search1));
        const search2Match = search2 === '' || app.server_id === search2;

        return search1Match && search2Match;
      });
    },
    serverNames() {
      return this.servers.map((server) => ({
        serverId: server.id,
        name: server.name,
      }));
    },
  },
  created() {
    if (!this.apps.length) {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions('data', ['fetchData', 'addApp', 'updateApp', 'deleteApp']),
    editItem(item) {
      this.editedItem = { ...item }; 
      this.dialog = true;
    },
    deleteItem(id) {
      const associatedTasks = this.tasks.filter((task) => task.app_id === id).length;

      if (associatedTasks > 0) {
        this.deleteWarning = this.$t('app.deleteWarning1', { tasks: associatedTasks });
      } else {
        this.deleteWarning = '';
      }
      this.editedItemId=id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteApp(this.editedItemId);
      this.closeDelete();
    },
    validate() {
      return this.editedItem.name.trim() !== '' && this.editedItem.serverId !== null;
    },
    save() {
      if (this.editedItem.id) {
        this.updateApp({ ...this.editedItem });
      } else {
        this.addApp({ ...this.editedItem });
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.editedItem = { ...this.defaultItem };
    },
    closeDelete() {
      this.dialogDelete = false;
      this.deleteWarning = '';
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
}
</style>
