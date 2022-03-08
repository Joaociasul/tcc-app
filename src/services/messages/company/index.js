const fields = {
  "_id": 'Id',
  "corporate_name": 'Nome',
  "cnpj": "Cnpj",
  "email": "E-mail",
  "fantasy_name": "Nome fantasia",
  "phone_number": "Telefone",
  'address.postal_code': "Cep",
  'address.number': "Número",
  'address.street': "Logradouro",
  'address.district': "Bairro",
  'address.complement': "Complemento",
  'address.city': "Cidade",
  'address.uf': "Estado"
}

const types = {
  "required": "obrigatório"
}

export const getMessage = (validator) => {
  return `O campo ${fields[validator.field]} é ${types[validator.type]}!`
}
