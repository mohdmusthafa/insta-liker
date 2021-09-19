const StatusBar = new Vue({
  el: "#status-bar",
  data: {
      sleep: "0",
      sleep_edit: false
  },
  mounted() {
    this.getSleepTime()
    setInterval(() => {
      this.getSleepTime()
    }, 10000)
  },
  methods: {
    async getSleepTime() {
      if (!this.sleep_edit) {
        const response = await fetch(`${window.API_URL}/sleep-delay`);
        const data = await response.json()
        this.sleep = data.delay;
      }
    },
    async saveSleep() {
      await fetch(`${window.API_URL}/sleep-delay?delay=${this.sleep}`, {
        method: 'PUT',
      })
      this.sleep_edit = false;
      this.getSleepTime()
    },
    editSleep() {
      this.sleep_edit = true;
    }
  }
})

const App = new Vue({
  el: "#app",
  mounted() {
    this.getConfig()
  },
  methods: {
    async getConfig() {
      const response = await axios.get('/config');
      const API_HOST = window.location.hostname;
      const CONFIG = {
        ...response.data,
        API_HOST
      }
      localStorage.setItem("APP_CONFIG", JSON.stringify(CONFIG))
    }
  }
})