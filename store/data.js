import axios from 'axios';

export default {
  namespaced: true,
  state: {
    servers: [],
    totalServers: 0,
    totalTasks: 0,
    totalApps: 0,
    apps: [],
    tasks: [],
    appNames:[],
    serverNames:[],


    
  },
  mutations: {
    // Mutations for Set
    SET_SERVERS(state, data) {
      state.servers = data.items;
      state.totalServers = data.totalItems;
      
    },
    SET_TASKS(state, data) {
      state.tasks = data.items;
      state.totalTasks = data.totalItems;
    },
    SET_APPS(state, data) {
      state.apps = data.items;
      state.totalApps = data.totalItems;
    },
    SET_APP_NAMES(state, appNames) {
      state.appNames = appNames;
    },
    SET_SERVER_NAMES(state, serverNames) {
      state.serverNames = serverNames;
    },




    ADD_SERVER(state, server) {
      state.servers.push(server);
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    ADD_APP(state, app) {
      state.apps.push(app);
    },





    UPDATE_SERVER(state, updatedServer, serverId) {
      const index = state.servers.findIndex(server => server.id === serverId);
      if (index !== -1) {
        state.servers.splice(index, 1, updatedServer);
      }
    },
    UPDATE_TASK(state, updatedTask, taskId) {
      const index = state.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
        
      }
    },
    UPDATE_APP(state, updatedApp, appId) {
      const index = state.apps.findIndex(app => app.id === appId);
      if (index !== -1) {
        state.apps.splice(index, 1, updatedApp);
      }
    },



    DELETE_SERVER(state, serverId) {
      state.servers = state.servers.filter(server => server.id !== serverId);
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    DELETE_APP(state, appId) {
      state.apps = state.apps.filter(app => app.id !== appId);
    },
  },

  actions: {
    // Action to fetch all initial data
    async fetchDataAction({ commit }, {pageNumber, pageSize}) {
      try {
        const serversResponse = await axios.get(`https://localhost:7169/api/Server/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        const appsResponse = await axios.get(`https://localhost:7169/api/App/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        const tasksResponse = await axios.get(`https://localhost:7169/api/Task/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        const appFilterResponse = await axios.get('https://localhost:7169/api/App/GetAppFilterData');
        const serverFilterResponse = await axios.get('https://localhost:7169/api/Server/GetServerFilterData');

        commit('SET_SERVERS', serversResponse.data);
        commit('SET_APPS', appsResponse.data);
        commit('SET_TASKS', tasksResponse.data);
        commit('SET_SERVER_NAMES', serverFilterResponse.data);
        commit('SET_APP_NAMES', appFilterResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to propagate it to the calling code
      }
    },

    // Actions for Servers
    async addServer({ commit }, server) {
      try {
        const response = await axios.post('https://localhost:7169/api/Server', server);
        commit('ADD_SERVER', response.data);
      } catch (error) {
        console.error('Error adding server:', error);
        throw error;
      }
    },
    async addApp({ commit }, app) {
      try {
        const response = await axios.post('https://localhost:7169/api/App', app);
        commit('ADD_APP', response.data);
      } catch (error) {
        console.error('Error adding app:', error);
        throw error;
      }
    },
    async addTask({ commit }, task) {
      try {
        const response = await axios.post('https://localhost:7169/api/Task', task);
        commit('ADD_TASK', response.data);
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },






    async updateServer({ commit }, {server, serverId }) {
      try {
        const response = await axios.put(`https://localhost:7169/api/Server?id=${serverId}`, server);
        commit('UPDATE_SERVER', response.data, serverId);
      } catch (error) {
        console.error('Error updating server:', error);
        throw error;
      }
    },
    async updateApp({ commit }, {app, appId })  {
      try {
        const response = await axios.put(`https://localhost:7169/api/App?id=${appId}`, app);
        commit('UPDATE_APP', response.data, appId);
      } catch (error) {
        console.error('Error updating app:', error);
        throw error;
      }
    },
    async updateTask({ commit }, { task, taskId }) {
      try {
        const response = await axios.put(`https://localhost:7169/api/Task?id=${taskId}`, task);
        commit('UPDATE_TASK', response.data, taskId);
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },




    async deleteServer({ commit }, serverId) {
      try {
        await axios.delete(`https://localhost:7169/api/Server?id=${serverId}`);
       
        commit('DELETE_SERVER', serverId);
      } catch (error) {
        console.error('Error deleting server:', error);
        throw error;
      }
    },
    async deleteApp({ commit }, appId) {
      try {
        await axios.delete(`https://localhost:7169/api/App?id=${appId}`);
        commit('DELETE_APP', appId);
      } catch (error) {
        console.error('Error deleting app:', error);
        throw error;
      }
    },
    async deleteTask({ commit }, taskId) {
      try {
        await axios.delete(`https://localhost:7169/api/Task?id=${taskId}`);
        
        commit('DELETE_TASK', taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    },

  },
};
