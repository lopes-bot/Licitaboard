<template>
  <BaseLayout>
    <b-form-group
      id="input-group-1"
      label="Cidade:"
      label-for="input-city"
    >
      <b-form-select
        id="input-city"
        v-model="city.selected"
        :options="city.options"
        autofocus
      />
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="Ano:"
      label-for="input-year"
    >
      <b-form-select
        id="input-year"
        v-model="year.selected"
        :options="year.options"
        autofocus
      />
    </b-form-group>

    <b-form-group>
      <b-button
        variant="success"
        class="btn btn-lg btn-success btn-block"
        @click="onClickSelect"
      >
        Selecionar
      </b-button>
    </b-form-group>
  </BaseLayout>
</template>

<script>
// @ is an alias to /src
import BaseLayout from '@/components/BaseLayout2.vue'
import { mapGetters } from 'vuex'
import { listOfMunicipios } from '../api/municipios'

export default {
  name: 'Selecionar',
  components: {
    BaseLayout
  },
  data () {
    return {
      city: {
        selected: null,
        options: [
          { value: null, text: 'Carregando...', disabled: true }
        ]
      },
      year: {
        selected: null,
        options: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'selectedCityCode', 'selectedYear'
    ])
  },
  async mounted () {
    for (let year = 2010; year < 2030; year++) {
      this.year.options.push({
        value: year, text: year
      })
    }

    await listOfMunicipios().then((res) => {
      this.city.options = [{ value: null, text: 'Selecione uma cidade' }]
      res.forEach((el) => this.city.options.push({
        value: el.codigo, text: el.nome
      }))
    }).catch(err => { this.result = err })

    this.city.selected = this.selectedCityCode || null
    this.year.selected = this.selectedYear || 2010
  },
  methods: {
    onClickSelect (evt) {
      if (this.city.selected && this.year.selected) {
        this.$store.commit({
          type: 'selectCity',
          code: this.city.selected,
          name: this.city.options.find(e => e.value === this.city.selected).text
        })
        this.$store.commit({
          type: 'selectYear',
          year: this.year.selected
        })

        this.$router.push({ name: 'licitacoes' })
      }
    }
  }
}
</script>
