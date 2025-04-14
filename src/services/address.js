import axios from 'axios';

// Criação de uma instância do Axios
const api = axios.create({
  baseURL: 'viacep.com.br/ws/01001000/json/',
});

// src/services/cepService.js

export async function buscarCep(cep) {
  const cepLimpo = cep.replace(/\D/g, '')

  if (cepLimpo.length !== 8) {
    throw new Error('CEP inválido. Deve conter 8 dígitos.')
  }

  const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
  const data = await response.json()

  if (data.erro) {
    throw new Error('CEP não encontrado.')
  }

  return data
}



