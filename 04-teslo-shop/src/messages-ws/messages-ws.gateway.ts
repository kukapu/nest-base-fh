import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({ cors: true, namespace: 'messages'}) // namespace: default el root '/'
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() wss: Server

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers['authentication'] as string
    let payload: JwtPayload
    // console.log({token})
    try {
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient(client, payload.id)
      // console.log({payload})
    } catch (error) {
      client.disconnect();
      return
    }


    // console.log('Cliente conectado:', client.id)

    // console.log('Clientes conectados:', this.messagesWsService.getNumberConnectedClients())
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  handleDisconnect(client: Socket) {
    // console.log('Cliente desconectado:', client.id)
    this.messagesWsService.removeClient(client.id)
    // console.log('Clientes conectados:', this.messagesWsService.getNumberConnectedClients())
    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    // console.log('Mensaje recibido:', payload)
    // this.wss.emit(client.id, payload)

    //! Este emite unicamente al cliente
    // client.emit('message-from-server', { fullname: 'Soy Yo', message: payload.message || 'no message provided'})

    //! Este emite a todos los clientes menos al que envio el mensaje
    // client.broadcast.emit('message-from-server', { fullname: 'Soy Yo', message: payload.message || 'no message provided'})
  
    //! Este emite a todos los clientes
    this.wss.emit('message-from-server', { 
      fullname: this.messagesWsService.getUserFullNameBySocketId(client.id), 
      message: payload.message || 'no message provided'
    })
     
    //! Otras posibles opciones
    // this.wss.join(client.id) // Para meter un user en una sala 
    // this.wss.to(client.id) // Para emitir a un usuario en concreto
  }
}
