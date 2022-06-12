import { pubSub } from '../shared/pubSub.js'
import { signupService } from '../signup/SignupService.js'
import AnuncioService from '../index/AnuncioService.js'
import { buildProductDetailView } from '../index/AnuncioView.js'
import { decodeToken } from '../utils/decodeToken.js'

export class AnuncioDetailController {
  constructor(nftDetailElement) {
    this.nftDetailElement = nftDetailElement
    this.nft = null
  }

  async showAnuncio(id) {
    if (!id) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        'Invalid anuncio Id',
      )

      return
    }

    try {
      this.nft = await AnuncioService.getAnuncio(id)
      const anuncioTemplate = buildProductDetailView(this.nft)
      this.nftDetailElement.innerHTML = anuncioTemplate

      this.handleDeleteButton()
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error)
    }
  }

  handleDeleteButton() {
    const loggedUserToken = signupService.getLoggedUser()

    if (loggedUserToken) {
      const userInfo = decodeToken(loggedUserToken)

      const isOwner = this.isNftOwner(userInfo.userId)

      if (isOwner) {
        this.drawDeleteButton()
      }
    }
  }

  isNftOwner(userId) {
    return userId === this.nft.userId
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

      const button = document.createElement('a')
      button.classList.add('btn', 'btn-secundary')
      button.href = './create.html'
      button.textContent = 'Crear Anuncio'
      element.appendChild(button)
    }
    if (!jwt) {
      const element = document.querySelector('.login')
      const buttonlogin = document.createElement('a')
      buttonlogin.classList.add('btn', 'btn-primary')
      buttonlogin.href = './login.html'
      buttonlogin.textContent = 'Login'

      element.appendChild(buttonlogin)

      const button = document.createElement('a')
      button.classList.add('btn', 'btn-info')
      button.href = './signup.html'
      button.textContent = 'Signup'
      element.appendChild(button)
    }
  }
  drawDeleteButton() {
    const buttonElement = document.createElement('button')
    buttonElement.innerHTML = `
      <button class="btn btn-danger" type="submit">Delete anuncio</button>
    `

    this.nftDetailElement.appendChild(buttonElement)

    this.nftDetailElement.addEventListener('click', () => {
      this.deleteNft()
    })
  }

  async deleteNft() {
    const shouldDelete = window.confirm('Are you sure to delete the Nft?')

    if (shouldDelete) {
      try {
        await AnuncioService.deleteAnuncio(this.nft.id)
        window.location.href = '../index.html'
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  }
}
