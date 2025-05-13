import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}
  handleConnection(client: Socket) {
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('set-user')
  handleSetUser(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: { userId: string; fullName: string },
  ) {
    this.messagesWsService.registerClient(
      client,
      payload.userId,
      payload.fullName,
    );
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
  }

  @SubscribeMessage('mensaje_global')
  handleMensajeGlobal(
    @MessageBody()
    payload: {
      userId: string;
      mensaje: string;
      fullName: string;
    },
  ) {
    this.wss.emit('mensaje_global', payload);
  }
}
