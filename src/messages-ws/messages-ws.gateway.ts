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

  // Manejar la conexión de un cliente
  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);

    // Unir al cliente a la sala global
    client.join('global_chat');
    console.log(`Cliente ${client.id} se unió a la sala global.`);
  }

  // Manejar la desconexión de un cliente
  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  // Manejar los mensajes enviados al chat global
  @SubscribeMessage('mensaje_global')
  handleGlobalMessage(
    client: Socket,
    data: { userId: string; mensaje: string },
  ) {
    console.log(`Mensaje recibido de Usuario ${data.userId}: ${data.mensaje}`);

    // Reenviar el mensaje a todos los usuarios en la sala global
    this.server.to('global_chat').emit('mensaje_global', {
      userId: data.userId,
      mensaje: data.mensaje,
    });
  }
}
