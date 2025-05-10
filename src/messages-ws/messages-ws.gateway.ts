import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server as SocketIOServer } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:3001' } })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: SocketIOServer;
  // Manejar la conexión de un cliente
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Manejar la desconexión de un cliente
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // Unirse a una sala privada
  @SubscribeMessage('unirse_sala_privada')
  handleJoinPrivateRoom(
    client: Socket,
    data: { userId: string; targetUserId: string },
  ) {
    const room = this.getPrivateRoom(data.userId, data.targetUserId);
    void client.join(room);
    console.log(`Usuario ${data.userId} se unió a la sala: ${room}`);
  }

  @SubscribeMessage('mensaje_privado')
  handlePrivateMessage(
    client: Socket,
    data: { userId: string; targetUserId: string; mensaje: string },
  ) {
    const room = this.getPrivateRoom(data.userId, data.targetUserId);
    console.log(`Mensaje en sala ${room}: ${data.mensaje}`);
    this.server
      .to(room)
      .emit('mensaje_privado', { userId: data.userId, mensaje: data.mensaje });
  }
  // Generar un identificador único para la sala privada
  private getPrivateRoom(userId: string, targetUserId: string): string {
    return [userId, targetUserId].sort().join('_'); // Ordenar IDs para mantener coherencia
  }
}
