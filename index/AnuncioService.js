import { signupService } from '../signup/SignupService.js'

export default {
  async getAnuncios() {
    const url = 'http://localhost:8000/api/products'
    const badUrl =
      'https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png'

    let response
    let anuncios

    try {
      response = await fetch(url)
    } catch (error) {
      throw new Error("I couldn't go for the Nfts")
    }

    if (!response.ok) {
      throw new Error('Nfts not found')
    }

    try {
      anuncios = await response.json()
    } catch (error) {
      throw new Error('Error transforming response to json')
    }

    return anuncios
  },
  async getAnuncio(id) {
    const url = `http://localhost:8000/api/products/${id}`

    let response
    let anuncio

    try {
      response = await fetch(url)
    } catch (error) {
      throw new Error("I couldn't go for the Nft")
    }

    if (!response.ok) {
      throw new Error('Nft not found')
    }

    try {
      anuncio = await response.json()
    } catch (error) {
      throw new Error('Error transforming response to json')
    }

    return anuncio
  },
  async deleteAnuncio(id) {
    const url = `http://localhost:8000/api/products/${id}`

    let response

    try {
      response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + signupService.getLoggedUser(),
        },
      })
    } catch (error) {
      throw new Error('I have not been able to delete the Anuncio')
    }

    if (!response.ok) {
      throw new Error('Anuncio not found')
    }
  },

  oldGetNfts() {
    const url = '../db.json'
    const badUrl =
      'https://hds.hel.fi/static/assets/placeholders/image/image-m@3x.png'

    return new Promise(function (resolve, reject) {
      fetch(url)
        .catch((error) => {
          console.log(error)
          reject("I couldn't go for the Nfts")
        })
        .then((responseHttp) => {
          console.log(responseHttp)
          return responseHttp.json()
        })
        .catch((error) => {
          console.log(error)
          reject('Error transforming response to json')
        })
        .then((data) => {
          resolve(data)
        })
    })
  },
}
