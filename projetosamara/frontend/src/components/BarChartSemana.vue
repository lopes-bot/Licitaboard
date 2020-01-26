<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
      datasets: [
        {
          label: 'Total de licitações',
          backgroundColor: '#00FF00',
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
        this.datasets.forEach(data => {
          this.chartdata.datasets[0].data.push(data.totalLicitacoes)
        })
      }
      this.renderChart(this.chartdata, this.options)
    }
  }
}
</script>

<style>
</style>
