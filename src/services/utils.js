const messages = {
  auth: "Usuário ou senha incorretos!",
  deleteCompanySuccess: "Empresa excluida com sucesso!",
  deleteCompanyError: "Não foi possível excluir esta empresa!",
  updateCompanySuccess: "Empresa editada com sucesso!",
  createCompanySuccess: "Empresa cadastrada com sucesso!"
}
import {
  Dialog,
  Notify
} from 'quasar'
import store from "src/store";


export const messagesSuccess = (message) => {
  Notify.create({
    type: "positive",
    progress: true,
    timeout: 1500,
    position: 'bottom-right',
    message: messages[message]
  })
}

export const messageError = (message) => {
  Notify.create({
    icon: 'announcement',
    color: 'red accent-4',
    textColor: 'white',
    classes: 'glossy',
    position: 'top',
    timeout: 1500,
    progress: true,
    message: messages[message]
  })
}

export const messageErrorValidator = (message) => {
  Notify.create({
    icon: 'announcement',
    color: 'red accent-4',
    textColor: 'white',
    classes: 'glossy',
    timeout: 1500,
    progress: true,
    message
  })
}

export const getHeaders = () => {
  return {
    headers: {
      authorization: `Bearer ${store().getters['auth/getToken']}`
    }
  }
}

export const getError = (error) => {
  if (error.response) {
    if (error.response.data) {
      return error.response.data
    }
  }
  console.log(error)
  return {
    error: {
      message: "Erro não identificado"
    }
  }
}

export const getResponse = (response) => {
  const data = response.data
  if (!data) {
    throw new Error({
      error: "data is null"
    })
  }
  return data
}

export const urlEncode = (arr = []) => {
  let urlEncoded = "?"
  for (const item of arr) {
    if (!item.value) {
      continue
    }
    urlEncoded += `${item.field}=${item.value}&`
  }
  return urlEncoded.substring(0, urlEncoded.length - 1)
}

export const messageConfirm = (message) => {
  return Dialog.create({
    title: "Atenção",
    message,
    cancel: true,
    persistent: true
  })
}
