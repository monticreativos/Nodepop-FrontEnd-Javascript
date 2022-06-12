import { NotificationController } from '../shared/notification/NotificationController.js'
import { AnuncioListController } from './AnuncioListController.js'

document.addEventListener('DOMContentLoaded', async () => {
  const nftListElement = document.querySelector('#anunciosList')

  const notificationElement = document.querySelector('.notification')

  const notificationController = new NotificationController(notificationElement)

  const anuncioListController = new AnuncioListController(nftListElement)
  anuncioListController.loginAuth()
  await anuncioListController.showNfts()
  anuncioListController.logOut()
})
