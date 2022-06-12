import { NotificationController } from '../shared/notification/NotificationController.js'
import { AnuncioCreateController } from './AnuncioCreateController.js'
import { pubSub } from '../shared/pubSub.js'

document.addEventListener('DOMContentLoaded', () => {
  const jwt = localStorage.getItem('jwt')

  if (!jwt) {
    pubSub.publish(
      pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
      'Debes hacer login para acceder a esta página',
    )
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }

  const createFormElement = document.querySelector('form')
  const notificationElement = document.querySelector('.notification')

  const notificationController = new NotificationController(notificationElement)

  const anuncioCreateController = new AnuncioCreateController(createFormElement)
  anuncioCreateController.loginAuth()
  anuncioCreateController.loginvalidate()
})
