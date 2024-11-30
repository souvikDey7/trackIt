import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socket: WebSocket | undefined;

    sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not connected.');
        }
    }

    connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.socket.onmessage = (event) => {
            console.log('Message received:', event.data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    close(): void {
        if (this.socket) {
            this.socket.close();
        }
    }
}