const { handler } = require('./dist/index.js')

describe('Lambda function', () => {
    it('should return with a decoded string', async () => {
        const result = await handler({ cipherText: "53616c7465645f5f69c531f03b46e74f7e40299498892e8cd2369ea704c9a5f4" })
        expect(result.statusCode).toBe(200)
        expect(result.body).toBe("Hello World !")
    })
    it('should return with a cipher string', async () => {
        const result = await handler({ plainText: "Hello World !" })
        expect(result.statusCode).toBe(200)
        expect(result.body).not.toBe("")
        expect(typeof result.body).toBe("string")
    })
    it('should return with an error 500 for an empty event', async () => {
        const result = await handler({})
        expect(result.statusCode).toBe(500)
    })
    it('should return with an error 500 for an empty plainText string', async () => {
        const result = await handler({ plainText: "" })
        expect(result.statusCode).toBe(500)
    })
    it('should return with an error 500 for an empty cipherText string', async () => {
        const result = await handler({ cipherText: "" })
        expect(result.statusCode).toBe(500)
    })
})