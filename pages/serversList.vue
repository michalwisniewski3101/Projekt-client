<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="servers"
      :items-per-page="pagination.itemsPerPage"
      :page.sync="pagination.page"
      :server-items-length="totalServers"
      @update:page="handlePageChange"
      @update:items-per-page="handleItemsPerPageChange"
      class="elevation-1"
      :search="searchValues.search1"
      :footer-props="footerProps">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t('app.serverList') }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <SearchField v-model="searchValues" />
          <v-spacer></v-spacer>
          <v-btn class="green" @click="exportToExcel(getLink, name)">{{ $t('app.export') }}</v-btn>
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
                        v-model="editedItem.ipAddress"  
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
        ipAddress: null,
      },
      defaultItem: {
        ipAddress: null,
      },
      deleteWarning: '',
      pagination: {
        page: 1,
        itemsPerPage: 5,
      },
      getLink:'https://localhost:7169/api/Server/ExportToExcel',
      name:'ExportedServers.xlsx',
      footerProps: {
        "items-per-page-options": [5, 10, 15, 20, 50, -1],
        "items-per-page-text": this.$t("itemsPerPage"),
        "items-per-page-all-text": this.$t("all"),
        "pagination-text": "",
      },
    };
  },
  computed: {
    ...mapState('data', ['servers','totalServers', 'apps', 'tasks']),
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
        { text: this.$t('app.ipAddress'), value: 'ipAddress' }, 
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
    ...mapActions('data', ['fetchDataAction', 'deleteServer', 'updateServer', 'addServer']),
    editItem(item) {
      this.editedIndex=0;
      this.editedItem.ipAddress=item.ipAddress;
      this.editedItem.name=item.name;

      this.editedItemId=item.id;
      this.dialog = true;
    },
    validate() {
      return this.editedItem.name && this.editedItem.ipAddress;
    },
    deleteItem(item) {
      const associatedTasks = this.tasks.filter(task => task.serverName === item.name).length;
      const associatedApps = this.apps.filter(app => app.serverName === item.name).length;
      if (associatedTasks > 0 || associatedApps > 0) {
        this.deleteWarning = this.$t('app.deleteWarning', {
          tasks: associatedTasks,
          apps: associatedApps,
        });
      } else {
        this.deleteWarning = '';
      }
      this.editedItemId=item.id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.deleteServer(this.editedItemId).then(() => {
      this.fetchData();
    });
      this.closeDelete();
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateServer({ server: this.editedItem, serverId: this.editedItemId }).then(() => {
          this.fetchData();
        });
      } else {
        this.addServer(this.editedItem).then(() => {
          this.fetchData();
        });
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
