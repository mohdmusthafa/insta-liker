const StatusBar = new Vue({
  el: "#status-bar",
  data: {
      sleep: "10",
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
        const response = await axios.get('/api/sleep-delay');
        this.sleep = response.data.delay
      }
    },
    async saveSleep() {
      await axios.put(`/api/sleep-delay?delay=${this.sleep}`)
      this.sleep_edit = false;
      this.getSleepTime()
    },
    editSleep() {
      this.sleep_edit = true;
    }
  }
})