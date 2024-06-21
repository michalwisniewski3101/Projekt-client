// store/index.js
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
    }
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
    }
  };
  