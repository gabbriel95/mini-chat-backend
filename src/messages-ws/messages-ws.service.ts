import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ClientData {
  socket: Socket;
  userId: string;
  fullName: string;
}

@Injectable()
export class MessagesWsService {
  private connectedClients: { [id: string]: ClientData } = {};

  registerClient(client: Socket, userId: string, fullName: string) {
    this.connectedClients[client.id] = {
      socket: client,
      userId,
      fullName,
    };
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): { id: string; userId: string; fullName: string }[] {
    return Object.entries(this.connectedClients).map(([id, data]) => ({
      id,
      userId: data.userId,
      fullName: data.fullName,
    }));
  }
}
