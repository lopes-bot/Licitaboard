<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Posição'],
      datasets: [

      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  props: ['datasets'],
  watch: {
    datasets: function (val) {
      this.updateChart()
    }
  },
  mounted () {
    this.updateChart()
  },
  methods: {
    updateChart () {
      if (this.datasets) {
        this.chartdata.datasets = []

        this.datasets.forEach((data) => {
          this.chartdata.datasets.push({
            label: data.negocianteNome + ' (' + data.negocianteCidade + ')',
            backgroundColor: '#00FF00',
            data: [data.totalValorOrcadoEstimado]
          })
        })
      }
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>

<style>
</style>
