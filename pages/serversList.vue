<template>
  <v-app >
  
      <v-data-table
        :headers="headers"
        :items="servers"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
      >
    
      <template v-slot:top>
    <v-toolbar
      flat
    >
      <v-toolbar-title>{{ $t('app.serverList') }}</v-toolbar-title>
      <v-divider
        class="mx-4"
        inset
        vertical
      ></v-divider>
      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
      <v-divider
        class="mx-4"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
          <v-icon>
            mdi-plus
    </v-icon>{{$t('app.addServer')}}
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    :label="$t('app.serverName')"
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="4"
                >
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
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
            {{$t('app.cancel')}}
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save"
            >
            {{$t('app.save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5">{{$t('app.sureDelete')}}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">{{$t('app.cancel')}}</v-btn>
            <v-btn color="red" text @click="deleteItemConfirm">{{$t('app.delete')}}</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </template>
  <template v-slot:[`item.actions`]="{ item }">
    <v-icon
      small
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-pencil
    </v-icon>
    <v-icon
      small
      @click="deleteItem(item)"
    >
      mdi-delete
    </v-icon>
  </template>
    
    
    
    
    </v-data-table>
  </v-app>
  </template>
    
  <script>
  
    
    
    
    export default {
      name: 'App',
    
      data: () => ({
        dialog: false,
        dialogDelete: false,
        search: '',

      editedIndex: -1,
    editedItem: {
      name: '',
      creation_date:null,
      modification_date:'-',
      ip_address:null,
      id:null,
    },
    defaultItem: {
      name: '',
      creation_date:null,
      modification_date:'-',
      ip_address:null,
      id:null,
    },
    currentDate: null

        
      }),
    computed: {
    formTitle () {
      return this.editedIndex === -1 ? this.$t('app.addNew') : this.$t('app.edit')
    },
    formattedDate() {
    const padZero = num => (num < 10 ? '0' + num : num);
    const year = this.currentDate.getFullYear();
    const month = padZero(this.currentDate.getMonth() + 1);
    const day = padZero(this.currentDate.getDate());
    const hours = padZero(this.currentDate.getHours());
    const minutes = padZero(this.currentDate.getMinutes());
    const seconds = padZero(this.currentDate.getSeconds());
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },

    headers() {
      return[
    
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
        
      ]
      
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  async asyncData({ $axios }) {
    try {
      const servers = await $axios.$get('/servers.json')
      return { servers }
    } catch (error) {
      console.error(error)
      return { servers: [] }
    }
  },


  methods: {
  editItem (item) {
      this.editedIndex = this.servers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.servers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.servers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        this.currentDate= new Date();
        this.editedItem.modification_date=this.formattedDate;
        Object.assign(this.servers[this.editedIndex], this.editedItem)
      } else {
        this.currentDate= new Date();
        this.editedItem.creation_date=this.formattedDate;
        this.editedItem.id=this.generateId();
        this.servers.push(this.editedItem)
      }
      this.close()
    },
    generateId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const id = `s${timestamp}-${random}`;
    return id;
  }
  }
      
    
     
    };
    </script>
  <style>
  h1{
      text-align: center;
  }
  
  
  
  </style>