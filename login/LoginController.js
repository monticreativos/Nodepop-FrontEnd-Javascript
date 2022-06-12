import { signupService } from '../signup/SignupService.js'
import { pubSub } from '../shared/pubSub.js'

export class LoginController {
  constructor(loginFormElement) {
    this.loginFormElement = loginFormElement

    this.attachEvents()
  }

  attachEvents() {
    this.onAnyInputChange()
    this.onSubmitLoginForm()
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.loginFormElement.querySelectorAll('input'),
    )
    console.log(inputElements)

    inputElements.forEach((inputElement) => {
      console.log(inputElement)
      inputElement.addEventListener('input', () => {
        const areInputsFilled = inputElements.every(
          (inputElement) => inputElement.value,
        )
        console.log(areInputsFilled)
        if (areInputsFilled) {
          this.loginFormElement
            .querySelector('button')
            .removeAttribute('disabled')
        } else {
          this.loginFormElement
            .querySelector('button')
            .setAttribute('disabled', '')
        }
      })
    })
  }

  onSubmitLoginForm() {
    this.loginFormElement.addEventListener('submit', (event) => {
      event.preventDefault()

      const formData = new FormData(this.loginFormElement)

      const username = formData.get('user')
      const password = formData.get('password')

      this.loginUser(username, password)
    })
  }

  async loginUser(username, password) {
    try {
      await signupService.loginUser(username, password)
      window.location.href = '../index.html'
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error)
    }
  }
}
