<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Valor estimado superior',
          backgroundColor: 'rgba(255, 0, 0, 0.3)',
          data: []
        },
        {
          label: 'Valor orçamentado',
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
      if (this.datasets) {
        this.chartdata.labels = []
        this.chartdata.datasets[0].data = []
        this.chartdata.datasets[1].data = []

        this.datasets.forEach(data => {
          this.chartdata.labels.push(data._id)
          this.chartdata.datasets[0].data.push(data.totalValorOrcadoEstimado)
          this.chartdata.datasets[1].data.push(data.totalValorLimiteSuperior)
        })
      }

      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>

<style>
</style>
