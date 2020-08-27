/* eslint-disable max-len */
const parametrize = require('js-parametrize')

const { DEFAULT_HEADERS, ERROR_CONFIG_INVALID, ERROR_CONFIG_NOT_FOUND, ERROR_CONFIG_UNKNOWN } = require('./constants')
const SUT = require('.')

describe('common/http-response', () => {
  describe('success responses', () => {
    parametrize(
      [
        ['ok', 200],
        ['created', 201],
        ['updated', 200],
        ['accepted', 202],
      ],
      (f, expectedStatusCode) => {
        it(`should return expected statusCode, headers and JSON stringified body for ${f} success response`, async () => {
          // when ... we generate the provided content response with the following data
          const data = { a: 123 }
          const result = SUT[f](data)

          // then ... should return the expected status code, headers and JSON stringified body
          expect(result.statusCode).toEqual(expectedStatusCode)
          expect(result.headers).toEqual(DEFAULT_HEADERS)
          expect(result.body).toEqual('{"data":{"a":123}}')
        })
      },
    )
  })

  describe('success (no content) responses', () => {
    parametrize(
      [
        ['deleted', 204],
        ['noContent', 204],
      ],
      (f, expectedStatusCode) => {
        it(`should return expected statusCode, headers and no content for ${f} success response`, async () => {
          // when ... we generate the provided content response with the following data
          const data = { a: 123 }
          const result = SUT[f](data)

          // then ... should return the expected status code, headers and JSON stringified body
          expect(result.statusCode).toEqual(expectedStatusCode)
          expect(result.headers).toEqual(DEFAULT_HEADERS)
          expect(result).not.toHaveProperty('body')
        })
      },
    )
  })

  describe('error responses', () => {
    parametrize(
      [
        ['invalid', 400, ERROR_CONFIG_INVALID.key, ERROR_CONFIG_INVALID.message],
        ['notFound', 404, ERROR_CONFIG_NOT_FOUND.key, ERROR_CONFIG_NOT_FOUND.message],
        ['unknownError', 500, ERROR_CONFIG_UNKNOWN.key, ERROR_CONFIG_UNKNOWN.message],
      ],
      (f, expectedStatusCode, expectedErrorKey, expectedErrorMessage) => {
        it(`should return expected statusCode, headers, and JSON stringified default error data for ${f}`, async () => {
          // when ... we generate the provided error response
          const result = SUT[f]()

          // then ... should return the expected status code, headers and JSON stringified body
          expect(result.statusCode).toEqual(expectedStatusCode)
          expect(result.headers).toEqual(DEFAULT_HEADERS)
          expect(typeof result.body === 'string').toBe(true)
          const bodyData = JSON.parse(result.body)
          expect(bodyData).toEqual({
            error: { key: expectedErrorKey, message: expectedErrorMessage },
          })
        })
      },
    )

    parametrize(
      [
        ['invalid', 400],
        ['notFound', 404],
        ['unknownError', 500],
      ],
      (f, expectedStatusCode) => {
        it(`should return expected statusCode, headers, and JSON stringified custom error data for ${f}`, async () => {
          // when ... we generate the provided error response with the following custom error data
          const result = SUT[f]({ key: 'ERROR_KEY', message: 'ERROR_MESSAGE' })

          // then ... should return the expected status code, headers and JSON stringified body
          expect(result.statusCode).toEqual(expectedStatusCode)
          expect(result.headers).toEqual(DEFAULT_HEADERS)
          expect(result.body).toEqual('{"error":{"key":"ERROR_KEY","message":"ERROR_MESSAGE"}}')
        })
      },
    )
  })
})
