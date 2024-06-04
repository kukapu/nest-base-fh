import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket,
    user: User,
    // desktop: boolean, // Para si solo permitimos una que pueda tener diferentes dispositivos
    // mobile: boolean,
  }
}

@Injectable()
export class MessagesWsService {
  private _connectedClients: ConnectedClients = {}

  constructor(
    @InjectRepository(User)
    private readonly userRepositoy: Repository<User>
  ) {}

  async registerClient(client: Socket, userId: string) {

    const user =  await this.userRepositoy.findOneBy({ id: userId })
    if(!user) throw new Error('User not found')
    if(!user.isActive) throw new Error('User is not active')

    this._checkUserConnection(user)
  
    this._connectedClients[client.id] = {
      socket: client,
      user
    }
  }

  removeClient(clientId: string) {
    delete this._connectedClients[clientId]
  }

  getNumberConnectedClients(): number {
    return Object.keys(this._connectedClients).length
  }

  getConnectedClients(): string[] {
    // console.log(this._connectedClients)
    return Object.keys(this._connectedClients)
  }

  getUserFullNameBySocketId(socketId: string): string {
    return this._connectedClients[socketId].user.fullname
  }

  private _checkUserConnection(user: User){
    for (const clientId of Object.keys(this._connectedClients)) {
      const connectedClient = this._connectedClients[clientId]

      if(connectedClient.user.id === user.id){
        connectedClient.socket.disconnect();
        break;
      }
    }
  }
}

