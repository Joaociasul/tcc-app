const messages = {
  auth: "Usuário ou senha incorretos!"
}
import {
  Notify
} from 'quasar'

export const messagesSuccess = (message) => {
  Notify.create({
    type: "positive",
    progress: true,
    message: messages[message]
  })
}

export const messageError = (message) => {
  Notify.create({
    icon: 'announcement',
    color: 'red accent-4',
    textColor: 'white',
    classes: 'glossy',
    timeout: 1500,
    progress: true,
    message: messages[message]
  })
}
