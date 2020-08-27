const mapRequestToEvent = request => ({
  headers: {},
  pathParameters: request.params,
  body: JSON.stringify(request.body),
})

module.exports.mapHandlerToExpress = handler => async (request, response) => {
  const event = mapRequestToEvent(request)
  const handlerResponse = await handler(event, {})
  return response.status(handlerResponse.statusCode).json(JSON.parse(handlerResponse.body))
}
