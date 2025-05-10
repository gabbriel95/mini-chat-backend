import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server as SocketIOServer } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:3001' } }) // Configura el CORS según tu frontend
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: SocketIOServer;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);

    client.join('global_chat');
    console.log(`Cliente ${client.id} se unió a la sala global.`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('mensaje_global')
  handleGlobalMessage(
    client: Socket,
    data: { userId: string; mensaje: string; fullName: string },
  ) {
    this.server.to('global_chat').emit('mensaje_global', {
      userId: data.userId,
      mensaje: data.mensaje,
      fullName: data.fullName,
    });
  }
}
