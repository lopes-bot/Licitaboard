const axios = require('axios')
const apiBaseUrl = require('../config').apiBaseUrl()

module.exports = {
  async listOfMunicipios () {
    const resp = await axios({
      url: `${apiBaseUrl}/municipios`
    })

    return resp.data
  }
}
