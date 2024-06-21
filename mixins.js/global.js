
export default  {
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        search1: '',
        search2: '',
        search3: '',
        editedIndex: -1,

        editedItem: {
            name: '',
            creation_date: null,
            modification_date: '-',
            id: null,
          },
          defaultItem: {
            name: '',
            creation_date: null,
            modification_date: '-',
            id: null,
          },
          currentDate: null,  

      };
    },
    computed: {
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
          formTitle() {
            return this.editedIndex === -1 ? this.$t('app.addNew') : this.$t('app.edit');
          },
          serverNames() {
            return this.servers.map(server => server.name); 
          },


        

    },
    methods: {
        generateId() {
            const timestamp = new Date().getTime();
            const random = Math.floor(Math.random() * 10000);
            const id = `${timestamp}-${random}`;
            return id;
          },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
              this.editedItem = Object.assign({}, this.defaultItem);
              this.editedIndex = -1;
            });
          },

          closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
              this.editedItem = Object.assign({}, this.defaultItem);
              this.editedIndex = -1;
            });
          },

          

    },
    watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
      },
    mounted() {
      
    },
  };
  
