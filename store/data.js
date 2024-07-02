import axios from 'axios';

export default {
  namespaced: true,
  state: {
    servers: [],
    apps: [],
    tasks: [],
  },
  mutations: {
    // Mutations for Servers
    SET_SERVERS(state, servers) {
      state.servers = servers;
    },
    ADD_SERVER(state, server) {
      state.servers.push(server);
    },
    UPDATE_SERVER(state, updatedServer) {
      const index = state.servers.findIndex(server => server.id === updatedServer.id);
      if (index !== -1) {
        state.servers.splice(index, 1, updatedServer);
      }
    },
    DELETE_SERVER(state, serverId) {
      state.servers = state.servers.filter(server => server.id !== serverId);
    },





    // Mutations for Tasks
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },



    
    // Mutations for Apps
    SET_APPS(state, apps) {
      state.apps = apps;
    },
    ADD_APP(state, app) {
      state.apps.push(app);
    },
    UPDATE_APP(state, updatedApp) {
      const index = state.apps.findIndex(app => app.id === updatedApp.id);
      if (index !== -1) {
        state.apps.splice(index, 1, updatedApp);
      }
    },
    DELETE_APP(state, appId) {
      state.apps = state.apps.filter(app => app.id !== appId);
    },
  },

  actions: {
    // Action to fetch all initial data
    async fetchData({ commit }) {
      try {
        const serversResponse = await axios.get('https://localhost:7169/api/Server');
        const appsResponse = await axios.get('https://localhost:7169/api/App');
        const tasksResponse = await axios.get('https://localhost:7169/api/Task');

        commit('SET_SERVERS', serversResponse.data);
        commit('SET_APPS', appsResponse.data);
        commit('SET_TASKS', tasksResponse.data);
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

    async updateServer({ commit }, server) {
      try {
        const response = await axios.put(`https://localhost:7169/api/Server/${server.id}`, server);
        commit('UPDATE_SERVER', response.data);
      } catch (error) {
        console.error('Error updating server:', error);
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

    // Actions for Apps
    async addApp({ commit }, app) {
      try {
        const response = await axios.post('https://localhost:7169/api/App', app);
        commit('ADD_APP', response.data);
      } catch (error) {
        console.error('Error adding app:', error);
        throw error;
      }
    },

    async updateApp({ commit }, app) {
      try {
        const response = await axios.put(`https://localhost:7169/api/App/${app.id}`, app);
        commit('UPDATE_APP', response.data);
      } catch (error) {
        console.error('Error updating app:', error);
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

    // Actions for Tasks
    async addTask({ commit }, task) {
      try {
        const response = await axios.post('https://localhost:7169/api/Task', task);
        commit('ADD_TASK', response.data);
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },

    async updateTask({ commit }, task) {
      try {
        const response = await axios.put(`https://localhost:7169/api/Task/${task.id}`, task);
        commit('UPDATE_TASK', response.data);
      } catch (error) {
        console.error('Error updating task:', error);
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
