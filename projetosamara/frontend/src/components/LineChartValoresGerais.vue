<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Valor orçamentado estimado',
          backgroundColor: 'rgba(0, 255, 0, 0.8)',
          data: []
        }
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
      //     {
      //   "_id": "002",
      //   "nomeMunicipio": "ABAIARA",
      //   "totalValorOrcadoEstimado": 5741925.82,
      //   "totalValorLimiteSuperior": 6890236.91
      // },
      if (this.datasets) {
        this.chartdata.labels = []
        this.chartdata.datasets[0].data = []

        this.datasets.forEach(data => {
          this.chartdata.labels.push(data.nomeMunicipio)
          this.chartdata.datasets[0].data.push(data.totalValorOrcadoEstimado)
        })
      }

      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>

<style>
</style>
