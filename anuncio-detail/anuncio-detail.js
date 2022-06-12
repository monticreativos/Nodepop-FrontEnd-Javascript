import { AnuncioDetailController } from './AnuncioDetailController.js'
import { NotificationController } from '../shared/notification/NotificationController.js'

document.addEventListener('DOMContentLoaded', () => {
  const anuncioDetailElement = document.querySelector('.product-detail')

  const notificationElement = document.querySelector('.notification')

  const notificationController = new NotificationController(notificationElement)

  const searchParams = new URLSearchParams(window.location.search)

  const id = searchParams.get('id')

  const anuncioDetailController = new AnuncioDetailController(
    anuncioDetailElement,
  )
  anuncioDetailController.loginAuth()
  anuncioDetailController.showAnuncio(id)
})
