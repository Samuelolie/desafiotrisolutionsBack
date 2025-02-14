import { expect } from '@playwright/test';


export class Api {
    constructor(request) {

        this.request = request

    }

    async getInformation(url) {
        const response = await this.request.get(url, {
            params: {
                id: '1'
            }
        })

        const body = JSON.parse(await response.text())

        return { response: response, body: body }
    }

    async toHaveTitle(url) {

        const data = await this.getInformation(url)

        const title = data.body[0].title
        const expectTitle = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'

        await expect(data.response.ok()).toBeTruthy()
        await expect(title).toBe(expectTitle)
    }

    async getInformationInvalid(url) {
        const response = await this.request.get(url, {
        })

        await expect(response.status()).toBe(404)
    }

    async postNewInformation(url) {
        const response = await this.request.post(url, {
            body: {
                title: "foo",
                body: "bar",
                userId: 1
            }
        })

        const responseBody = await response.json()
        const id = responseBody.id

        await expect(id).toBe(101)
        await expect(response.status()).toBe(201)
    }

    async invalidPost(url) {
        const response = await this.request.post(url, {
            body: {
            }
        })

        await expect(response.status()).toBe(201)
    }

    async updateInformation(url) {
        const response = await this.request.put(url, {
            body: {
                title: 'Teste'
            }
        })

        const responseBody = await response.json()
        const idResponse = responseBody.id

        await expect(response.status()).toBe(200)
        await expect(idResponse).toBe(1)
    }

    async invalidPut(url) {
        const response = await this.request.put(url, {
            body: {
                title: 'Teste'
            }
        })

        await expect(response.status()).toBe(404)
    }

    async updateInformationPatch(url) {
        const response = await this.request.patch(url, {
            body: {
                title: 'Teste'
            }
        })

        const responseBody = await response.json()
        const idResponse = responseBody.id

        await expect(response.status()).toBe(200)
        await expect(idResponse).toBe(1)
    }

    async invalidPatch(url) {
        const response = await this.request.patch(url, {
            body: {
                title: 'Teste'
            }
        })

        await expect(response.status()).toBe(404)
    }

    async deleteInformation(url) {
        const response = await this.request.delete(url)

        await expect(response.status()).toBe(200)
    }

    async deleteInformationInvalid(url) {
        const response = await this.request.delete(url)

        await expect(response.status()).toBe(200)
    }
}