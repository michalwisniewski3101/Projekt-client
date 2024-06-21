export const state = () => ({
    servers: [],
    apps: [],
    tasks: []
  });
  
  export const mutations = {
    setServers(state, servers) {
      state.servers = servers;
    },
    setApps(state, apps) {
      state.apps = apps;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },




    deleteServer(state, serverId) {
      state.servers = state.servers.filter(server => server.id !== serverId);
      state.apps = state.apps.filter(app => app.server_id !== serverId);
      state.tasks = state.tasks.filter(task => task.server_id !== serverId);
      
    },
    deleteTask(state, taskId) {
        state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    deleteApp(state, appId) {

        state.tasks.forEach(task => {
            if (task.app_id === appId) {
              task.app_name = '';
              task.app_id = null;

            }
          });


        state.apps = state.apps.filter(app => app.id !== appId);
    },




    updateServer(state, updatedServer) {
        const index = state.servers.findIndex(server => server.id === updatedServer.id);
        if (index !== -1) {
          state.servers.splice(index, 1, updatedServer);


          state.tasks.forEach(task => {
            if (task.server_id === updatedServer.id) {
              task.server_name = updatedServer.name;
            }
          });
      
          state.apps.forEach(app => {
            if (app.server_id === updatedServer.id) {
              app.server_name = updatedServer.name;
            }
          });
      
          
        }
      },
      
      
    updateTask(state, UpdatedTask) {
        const index = state.tasks.findIndex((task) => task.id === UpdatedTask.id);
        if (index !== -1) {
          state.tasks.splice(index, 1, UpdatedTask);
        }
      },
    updateApp(state, UpdatedApp) {
        const index = state.apps.findIndex((app) => app.id === UpdatedApp.id);
        if (index !== -1) {

          state.apps.splice(index, 1, UpdatedApp);

            state.tasks.forEach(task => {
                if (task.app_id === UpdatedApp.id) {
                  task.app_name = UpdatedApp.name;
                }
              });




          
        }
      },

    addServer(state, NewServer) {
        state.servers.push(NewServer);
      },


    addTask(state, NewTask) {
        state.tasks.push(NewTask);
      },


    addApp(state, NewApp) {
        state.apps.push(NewApp);
      },
    


  };
  
  export const actions = {
    async fetchData({ commit }) {
      try {
        const servers = await this.$axios.$get('/servers.json');
        const apps = await this.$axios.$get('/apps.json');
        const tasks = await this.$axios.$get('/tasks.json');
        commit('setServers', servers);
        commit('setApps', apps);
        commit('setTasks', tasks);
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    },
    deleteServer({ commit }, serverId, server_name) {
      commit('deleteServer', serverId, server_name);
    },    
    deleteTask({ commit }, taskId) {
        commit('deleteTask', taskId);
      },
    deleteApp({ commit }, appId) {
        commit('deleteApp', appId);
      }, 


      



    updateServer({ commit }, UpdatedServer) {
      commit('updateServer', UpdatedServer);
    },
    updateTask({ commit }, UpdatedTask) {
        commit('updateTask', UpdatedTask);
      },
    updateApp({ commit }, UpdatedApp) {
        commit('updateApp', UpdatedApp);
      },

      addServer({ commit }, NewServer) {
        commit('addServer', NewServer);
      },
      addApp({ commit }, NewApp) {
        commit('addApp', NewApp);
      },
    addTask({ commit }, NewTask) {
        commit('addTask', NewTask);
      },

 
  };
  