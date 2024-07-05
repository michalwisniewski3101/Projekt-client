
export default  {
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        search1: '',
        searchValues: {
          search1: '',
          search2: '',
          search3: '',
          
        },
        pageNumber:1,
        pageSize:3,
        editedIndex: -1,
        editedItemId:null,

        editedItem: {
            name: '',
            
          },
          defaultItem: {
            name: '',
            
          },
          
          

      };
    },
    computed: {

      formTitle() {
        return this.editedIndex === -1 ? this.$t('app.addNew') : this.$t('app.edit');
      },


        

    },
    methods: {
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
          fetchData() {
            this.fetchDataAction({
              pageNumber: this.pagination.page,
              pageSize: this.pagination.itemsPerPage,
            });
          },
          handleItemsPerPageChange(newItemsPerPage) {
            this.pagination.itemsPerPage = newItemsPerPage;
            this.pagination.page = 1; // Reset to first page
            this.fetchData();
          },
          handlePageChange(newPage) {
            this.pagination.page = newPage;
            this.fetchData();
          },
          async exportToExcel(getLink, name) {
            const response = await this.$axios.$get(getLink, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
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
  
