
<template>
<div style="background-color: white; !important">
  <BaseLayout class="about">
    <BaseContentTitle>
       Licitações de {{ selectedCityName }} do ano de {{ selectedYear }}
    </BaseContentTitle>
    <div>
      <p class="letra"> Valores de Licitações</p>
    </div>

    <b-row>
      <b-col sm="12" md="6" class="mb-2">
          <b-card>
          <p class="letra">Do Estado</p>
          <LineChartValoresPerMunicipio :datasets="dadosGraficoValoresGerais" />
          </b-card>
      </b-col>

      <b-col sm="12" md="6" class="mb-2">
        <b-card>
          <p class="letra">Município de {{selectedCityName}}</p>
          <LineChartValoresPerMunicipio :datasets="dadosGraficoValoresPorMunicipio" />
        </b-card>
      </b-col>
      <b-col sm="12" md="6" class="mb-2">
        <b-card>
          <p class="letra">Por município</p>
          <LineChartValoresGerais :datasets="dadosGraficoDeMunicipios" />
        </b-card>
      </b-col>
      <b-col sm="12" md="6" class="mb-2">
        <b-card>
          <p class="letra">Vencedores para {{selectedCityName}}</p>
          <BarChartNegociacoes :datasets="dadosGraficoTopNegociadoresPorMunicipio" />
        </b-card>
      </b-col>
      <b-col sm="12" md="6" class="mb-2">
        <b-card>
          <p class="letra">Distribuição por dia da semana </p>
          <BarChartSemana :datasets="dadosGraficoTopLicitacoesNaSemanaPorMunicipio" />
        </b-card>
      </b-col>
    </b-row>
  </BaseLayout>
  </div>
</template>

<script>
import {
  graficoValoresGerais,
  graficoValoresPorMunicipio,
  graficoDeMunicipios,
  graficoTopNegociadoresPorMunicipio,
  graficoTopLicitacoesNaSemanaPorMunicipio
} from '../api/licitacoes'
import { mapGetters } from 'vuex'

import BaseLayout from '@/components/BaseLayout.vue'
import BaseContentTitle from '@/components/BaseContentTitle.vue'
import BarChartSemana from '@/components/BarChartSemana.vue'
import BarChartNegociacoes from '@/components/BarChartNegociacoes.vue'
import LineChartValoresPerMunicipio from '@/components/LineChartValoresPerMunicipio.vue'
import LineChartValoresGerais from '@/components/LineChartValoresGerais.vue'

export default {
  name: 'licitacoes',
  components: {
    BaseLayout, BaseContentTitle, BarChartSemana, BarChartNegociacoes, LineChartValoresPerMunicipio, LineChartValoresGerais
  },
  data () {
    return {
      dadosGraficoValoresGerais: null,
      dadosGraficoValoresPorMunicipio: null,
      dadosGraficoDeMunicipios: null,
      dadosGraficoTopNegociadoresPorMunicipio: null,
      dadosGraficoTopLicitacoesNaSemanaPorMunicipio: null
    }
  },
  computed: {
    ...mapGetters([
      'selectedCityCode', 'selectedCityName', 'selectedYear'
    ])
  },
  beforeMount () {
    if (!this.selectedCityCode) {
      this.$router.push({ name: 'selecionar' })
    }
  },
  async created () {
    if (!this.selectedCityCode) {
      return
    }

    graficoValoresGerais(this.selectedYear).then((res) => {
      this.dadosGraficoValoresGerais = res
    }).catch(err => { this.result = err })

    graficoValoresPorMunicipio(this.selectedCityCode, this.selectedYear).then((res) => {
      this.dadosGraficoValoresPorMunicipio = res
    }).catch(err => { this.result = err })

    graficoDeMunicipios(this.selectedYear).then((res) => {
      this.dadosGraficoDeMunicipios = res
    }).catch(err => { this.result = err })

    graficoTopNegociadoresPorMunicipio(this.selectedCityCode, this.selectedYear).then((res) => {
      this.dadosGraficoTopNegociadoresPorMunicipio = res
    }).catch(err => { this.result = err })

    graficoTopLicitacoesNaSemanaPorMunicipio(this.selectedCityCode, this.selectedYear).then((res) => {
      this.dadosGraficoTopLicitacoesNaSemanaPorMunicipio = res
    }).catch(err => { this.result = err })
  }
}
</script>

<style>
.letra{
    font-size: 24px;
  }
</style>
