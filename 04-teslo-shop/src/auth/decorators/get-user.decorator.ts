import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
  ( data: string, ctx: ExecutionContext ) => {
    console.log({ data })
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    if( !user ) throw new InternalServerErrorException('User not found')

    // if( !data ) return user
    // if( data === 'email' ) return user.email
    return data
      ? user[data] 
      : user
  }
)