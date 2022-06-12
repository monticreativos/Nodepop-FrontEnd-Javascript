import { createAnuncioService } from './CreateAnuncioService.js'
import { pubSub } from '../shared/pubSub.js'
import { signupService } from '../signup/SignupService.js'
import { decodeToken } from '../utils/decodeToken.js'

export class AnuncioCreateController {
  constructor(createFormElement) {
    this.createFormElement = createFormElement
    this.attachEvents()
  }

  attachEvents() {
    this.onAnyInputChange()
    this.onSubmitCreateForm()
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.createFormElement.querySelectorAll('input:required'),
    )

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value,
        )

        if (areInputsFilled) {
          this.createFormElement
            .querySelector('button')
            .removeAttribute('disabled')
        } else {
          this.createFormElement
            .querySelector('button')
            .setAttribute('disabled', '')
        }
      })
    })
  }

  loginAuth() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      const element = document.querySelector('.login')
      const buttonHome = document.createElement('a')
      buttonHome.classList.add('btn', 'btn-primary')
      buttonHome.href = './index.html'
      buttonHome.textContent = 'Home'
      element.appendChild(buttonHome)
    }
  }

  onSubmitCreateForm() {
    this.createFormElement.addEventListener('submit', (event) => {
      event.preventDefault()

      const formData = new FormData(this.createFormElement)

      const title = formData.get('title')
      const description = formData.get('description')
      const price = formData.get('price')
      const image = formData.get('image')
      const type = formData.get('type')
      const category = formData.get('categories')

      this.addNft(title, description, price, image, type, category)
    })
  }

  async addNft(title, description, price, image, type, category) {
    try {
      await createAnuncioService.createAnuncio(
        title,
        description,
        price,
        image,
        type,
        category,
      )
      window.location.href = '../index.html'
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error)
    }
  }

  loginvalidate() {
    const loggedUserToken = signupService.getLoggedUser()

    if (!loggedUserToken) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        'You must login to create Nfts',
      )
      this.drawBackButton()
    } else {
      const inputElements = Array.from(
        this.createFormElement.querySelectorAll('input'),
      )

      this.inputsEnabled(inputElements)
    }
  }
  inputsEnabled(inputElements) {
    inputElements.forEach((inputElement) => {
      inputElement.removeAttribute('disabled')
    })
  }

  drawBackButton() {
    const buttonElement = document.createElement('button')
    buttonElement.innerHTML = `
    <button class="border border-[#282b2f] bg-[#2081e2] hover:bg-[#42a0ff] flex items-center py-2 px-12 text-xl font-semibold rounded-lg cursor-pointer text-white type="submit">Back</button>
    `

    this.createFormElement.appendChild(buttonElement)

    this.createFormElement.addEventListener('click', () => {
      window.location.href = '../index.html'
    })
  }
}
