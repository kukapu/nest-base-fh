import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ){
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate( payload: JwtPayload ): Promise<User> {

    const { id } = payload

    const user = await this.userRepository.findOne({ where: { id } })

    if(!user) throw new UnauthorizedException('Invalid token')
    if(!user.isActive) throw new UnauthorizedException('Inactive user')

    // console.log({ user }) // Todas las rutas pasan por aqui middleware

    return user
  }

}