import { signupService } from '../signup/SignupService.js'

class CreateAnuncioService {
  async createAnuncio(title, description, price, image, type, category) {
    const url = 'http://localhost:8000/api/products'
    const urlImage = 'http://localhost:8000/upload'
    let response
    let reponseImage

    try {
      const bodyFormData = new FormData()
      bodyFormData.append('file', image)

      console.log(image)
      console.log(bodyFormData)

      const httpResponse = await fetch(urlImage, {
        method: 'POST',
        body: bodyFormData,
        headers: {
          Authorization: 'Bearer ' + signupService.getLoggedUser(),
        },
      })
      const data = await httpResponse.json();
      console.log(image)
      if (httpResponse.ok || image.name == '') {
        console.log(data)

        const Uploadimage = data

        const nft = this.getAnuncioObj(
          title,
          description,
          price,
          image = Uploadimage.path,
          type,
          category,
        )

        response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(nft),
          headers: {
            Authorization: 'Bearer ' + signupService.getLoggedUser(),
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Error while saving Nft')
        }
      }
    } catch (e) {
      throw new Error('Could not save image del anuncio')
    }
  }

  getAnuncioObj(title, description, price, image, type, category) {
    const anuncioObj = {
      title,
      description,
      price,
      image,
      type,
      category,
    }
    return anuncioObj
  }
}

export const createAnuncioService = new CreateAnuncioService()
