<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="servers"
      :items-per-page="5"
      class="elevation-1"
      :search="search1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('app.serverList') }}</v-toolbar-title>
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
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>{{ $t('app.addServer') }}
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
                        :label="$t('app.serverName')"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.ip_address"
                        :label="$t('app.ipAddress')"
                        v-mask="'###.###.#.#'"
                        placeholder="xxx.xxx.x.x"
                      ></v-text-field>
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
  data() {
    return {
      editedItem: {
        ip_address: null,
      },
      defaultItem: {
        ip_address: null,
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
        { text: this.$t('app.creationDate'), value: 'creation_date' },
        { text: this.$t('app.editionDate'), value: 'modification_date' },
        { text: this.$t('app.ipAddress'), value: 'ip_address' },
        { text: this.$t('app.ID'), value: 'id' },
        { text: this.$t('app.actions'), value: 'actions', sortable: false },
      ];
    },

  },

  created() {
    if (!this.servers.length) {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions('data', ['fetchData', 'deleteServer', 'updateServer', 'addServer']),
    editItem(item) {
      this.editedIndex = this.servers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    validate() {
      return this.editedItem.name && this.editedItem.ip_address;
    },
    deleteItem(item) {
      this.editedIndex = this.servers.indexOf(item);
      this.editedItem = Object.assign({}, item);

      const associatedTasks = this.tasks.filter(task => task.server_id === item.id).length;
      const associatedApps = this.apps.filter(app => app.server_id === item.id).length;

      if (associatedTasks > 0 || associatedApps > 0) {
        this.deleteWarning = this.$t('app.deleteWarning', {
          tasks: associatedTasks,
          apps: associatedApps,
        });
      } else {
        this.deleteWarning = '';
      }

      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteServer(this.editedItem.id);
      this.closeDelete();
    },

    save() {
      if (this.editedIndex > -1) {
        this.currentDate = new Date();
        this.editedItem.modification_date = this.formattedDate;
        this.updateServer(this.editedItem);
      } else {
        this.currentDate = new Date();
        this.editedItem.creation_date = this.formattedDate;
        this.editedItem.id = this.generateId();
        this.addServer(this.editedItem);
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
