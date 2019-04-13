// const token = localStorage.getItem('token')

export default function({ $axios, redirect }) {
  // if (token) {
  //   $axios.setToken(token, 'Bearer')
  // }

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/')
    }
  })
}
