<template>
  <div class="pa-4">
    
            
        <v-dialog max-width="600px" >
          <template v-slot:activator="{ on, attrs }" >
          
          
          <v-btn v-bind="attrs" v-on="on">
                Add new project
            </v-btn>

            </template>
          <v-card >
            <v-form class="px-3" ref="form">
            <v-text-field  label="Title" v-model="title" ></v-text-field>
              

        <v-menu>
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
            v-model="due"
            v-bind="attrs"
            v-on="on" >     
              </v-text-field>
        </template>
        <v-date-picker v-model="due"></v-date-picker>
      </v-menu>



            </v-form>
            <v-spacer></v-spacer>
            <v-btn text @click="submit" class="success mx-0 mt-3" >Add Project</v-btn>
            
          </v-card>

            



        </v-dialog>



        {{data.due}}
      </div>
    </template>
      
      <script>
  
        export default {
            
          name: 'PopUp',
      
          data: () => ({
            dialog: false,
            title: null,
            due: null,


            
            
          }),
          methods: {

              submit() {
                if(this.$refs.form.validate()){
                console.log(this.title, this.due)}

                }
  }

        }
      </script>