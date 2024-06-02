import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    try {
      const { password, ...userData } = createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)

      delete user.password
      return {
        ...user,
        token: this._getJwtToken({ id: user.id })
      }
    } catch (error) { 
      this._handleDBError(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto

    const user = await this.userRepository.findOne({ 
      where: { email },
      select: ['email', 'password', 'id']
    })

    if (!user) throw new UnauthorizedException('Invalid credentials')

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials')

    return {
      ...user,
      token: this._getJwtToken({ id: user.id })
    }
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this._getJwtToken({ id: user.id })
    }
  }

  private _getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload)
    return token
  }

  private _handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
