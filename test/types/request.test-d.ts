import { expectType } from 'tsd'
import fastify, { RouteHandlerMethod, RawRequestDefaultExpression, RequestBodyDefault, RequestGenericInterface } from '../../fastify'
import { RawServerDefault, RequestParamsDefault, RequestHeadersDefault, RequestQuerystringDefault, RawReplyDefaultExpression } from '../../types/utils'
import { FastifyLoggerInstance } from '../../types/logger'

interface RequestBody {
  content: string;
}

interface RequestQuerystring {
  from: string;
}

interface RequestParams {
  id: number;
}

interface RequestHeaders {
  'x-foobar': string;
}

interface RequestData extends RequestGenericInterface {
  Body: RequestBody;
  Querystring: RequestQuerystring;
  Params: RequestParams;
  Headers: RequestHeaders;
}

type Handler = RouteHandlerMethod<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, RequestData>

const getHandler: RouteHandlerMethod = function (request, _reply) {
  expectType<string>(request.url)
  expectType<string>(request.method)
  expectType<string>(request.hostname)
  expectType<string>(request.ip)
  expectType<string[] | undefined>(request.ips)
  expectType<RawRequestDefaultExpression>(request.raw)
  expectType<RequestBodyDefault>(request.body)
  expectType<RequestParamsDefault>(request.params)
  expectType<RequestHeadersDefault & RawRequestDefaultExpression['headers']>(request.headers)
  expectType<RequestQuerystringDefault>(request.query)
  expectType<any>(request.id)
  expectType<FastifyLoggerInstance>(request.log)
  expectType<RawRequestDefaultExpression['socket']>(request.connection)
}

const postHandler: Handler = function (request) {
  expectType<RequestBody>(request.body)
  expectType<RequestParams>(request.params)
  expectType<RequestHeaders & RawRequestDefaultExpression['headers']>(request.headers)
  expectType<RequestQuerystring>(request.query)
  expectType<string>(request.body.content)
  expectType<string>(request.query.from)
  expectType<number>(request.params.id)
  expectType<string>(request.headers['x-foobar'])
}

const server = fastify()
server.get('/get', getHandler)
server.post('/post', postHandler)
