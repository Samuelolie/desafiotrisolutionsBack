import { test } from '@playwright/test';

const { Api } = require('../pages/Api')

let api

test.beforeEach(async ({ request }) => {
  api = new Api(request)
})

test('Buscar informações por método GET', async ({ request }) => {
  await api.toHaveTitle('https://jsonplaceholder.typicode.com/posts')
});

test('Buscar informações por método GET de forma incorreta', async ({ request }) => {

  await api.getInformationInvalid('https://jsonplaceholder.typicode.com/posts/sos')
});

test('Registar informações por método POST', async ({ request }) => {
  await api.postNewInformation('https://jsonplaceholder.typicode.com/posts')
})

test('Registrar informação com body inválido por método POST', async ({ }) => {
  await api.invalidPost('https://jsonplaceholder.typicode.com/posts')
})

test('Atualizar informações por método PUT', async ({}) => {
  await api.updateInformation('https://jsonplaceholder.typicode.com/posts/1')
})

test('Atualizar informações inválidas por método PUT', async({})=>{
  await api.invalidPut('https://jsonplaceholder.typicode.com/posts/')
})

test('Atualizar informações por método PATCH', async ({}) => {
  await api.updateInformationPatch('https://jsonplaceholder.typicode.com/posts/1')
})

test('Atualizar informações inválidas por método PATCH', async({})=>{
  await api.invalidPatch('https://jsonplaceholder.typicode.com/posts/')
})

test('Deletar informações', async({})=>{
  await api.deleteInformation('https://jsonplaceholder.typicode.com/posts/1')
})

test('Deletar informações inválidas', async({})=>{
  await api.deleteInformationInvalid('https://jsonplaceholder.typicode.com/posts/sos')
})

