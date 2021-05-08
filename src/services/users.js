export default httpClient => ({
  async getMe() {
    const response = await httpClient.get('/users/me')

    return {
      data: response.data
    }
  }
})
