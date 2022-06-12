import { pubSub } from '../shared/pubSub.js'
import AnuncioService from './AnuncioService.js'
import {
  buildNftView,
  buildNftListSpinnerView,
  buildNotFoundNftsView,
} from './AnuncioView.js'

export class AnuncioListController {
  nftListElement = null

  constructor(nftListElement, notificationController) {
    this.nftListElement = nftListElement
    this.notificationController = notificationController
  }

  loginAuth() {
    const jwt = localStorage.getItem('jwt')

    if (jwt) {
      const element = document.querySelector('.login')

      const button = document.createElement('a')
      button.classList.add('btn', 'btn-secundary')
      button.href = './create.html'
      button.textContent = 'Crear Anuncio'
      element.appendChild(button)

      const buttonLogout = document.createElement('a')
      buttonLogout.classList.add('btn', 'btn-danger')
      buttonLogout.href = '#'
      buttonLogout.textContent = 'Logout'
      buttonLogout.id = 'logout'
      element.appendChild(buttonLogout)
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

  async showNfts() {
    let nfts
    const spinnerTemplate = buildNftListSpinnerView()

    this.nftListElement.innerHTML = spinnerTemplate

    try {
      nfts = await AnuncioService.getAnuncios()

      if (nfts.length === 0) {
        this.nftListElement.innerHTML = buildNotFoundNftsView()
      }

      for (const nft of nfts) {
        const nftArticleElement = document.createElement('article')
        const nftTemplate = buildNftView(nft)

        nftArticleElement.innerHTML = nftTemplate

        this.nftListElement.appendChild(nftArticleElement)
      }
    } catch (error) {
      pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        'Error getting Nfts',
      )
    } finally {
      const loader = this.nftListElement.querySelector('.loader')
      loader.remove()
    }
  }

  logOut() {
    const logoutNodo = document.querySelector('#logout')
    logoutNodo.addEventListener('click', function (e) {
      e.preventDefault()
      localStorage.removeItem('jwt')
      window.location.href = '../login.html'
    })
  }
}

async function oldNftListController(nftListElement) {
  let nfts
  const spinnerTemplate = buildNftListSpinnerView()

  nftListElement.innerHTML = spinnerTemplate

  try {
    nfts = await AnuncioService.getAnuncios()

    for (const nft of nfts) {
      const nftArticleElement = document.createElement('article')
      const nftTemplate = buildNftView(nft)

      nftArticleElement.innerHTML = nftTemplate

      nftListElement.appendChild(nftArticleElement)
    }
  } catch (error) {
    alert('Error getting Nfts')
  } finally {
    const loader = nftListElement.querySelector('.loader')
    loader.remove()
  }
}
