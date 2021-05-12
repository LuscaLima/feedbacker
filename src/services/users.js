export default httpClient => ({
  async getMe() {
    const response = await httpClient.get('/users/me')

    return {
      data: response.data
    }
  },

  async generateApiKey() {
    const response = await httpClient.post('/users/me/apiKey')

    return {
      data: response.data
    }
  }
})
