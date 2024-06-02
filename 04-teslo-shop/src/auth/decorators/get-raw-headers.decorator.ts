import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator(
  ( data, ctx: ExecutionContext ) => {
    const request = ctx.switchToHttp().getRequest()
    return request.rawHeaders
  }
)