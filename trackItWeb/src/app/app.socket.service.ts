import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socket: WebSocket | undefined;
    private watchId: any;
    private keepAliveInterval: any;
    private reconnectInterval: any;
    private reconnectAttempts = 5;
    private reconnectDelay = 2000; // 2 seconds
    private currentReconnectAttempts = 0;
    private intentionalClose = false;

    // Send message via WebSocket
    sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not connected.');
        }
    }

    // Connect to the WebSocket server
    connect(url: string, userId: any): void {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connection established');
            this.currentReconnectAttempts = 0; // Reset reconnect attempts
            this.startLocationTracking(userId);
            this.keepAlive(userId); // Start keep-alive mechanism
        };

        this.socket.onmessage = (event) => {
            console.log('Message received:', event.data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed');
            if (!this.intentionalClose && event.code !== 1000) {
                this.stopKeepAlive(); // Stop keep-alive
                this.reconnect(url, userId); // Try to reconnect 
            } else {
                console.log('No reconnection attempt as the closure was intentional or normal.');
            }
        };
    }

    private startLocationTracking(userId: String): void {
        if (navigator.geolocation) {
            this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const locationData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        userId: userId,
                    };
                    this.sendMessage(JSON.stringify(locationData));
                },
                (error) => {
                    console.error('Error fetching location:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout:5000,
                    maximumAge: 0,
                }
            );
        }
    }

    private keepAlive(userId: String): void {
        this.keepAliveInterval = setInterval(() => {
            // Check if WebSocket is open
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                // Send current location if available
                if (navigator.geolocation) {
                    this.watchId = navigator.geolocation.watchPosition(
                        (position) => {
                            // Prepare the location data
                            const locationData = {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                userId: userId
                            };
                            this.sendMessage(JSON.stringify(locationData));
                        },
                        (error) => {
                            console.error('Error fetching location:', error);
                        },
                        {
                            enableHighAccuracy: false,
                            timeout: 500000,
                            maximumAge: 0
                        }
                    );
                }
            }
        }, 20000); // Send location data every 3 seconds
    }

    // Stop keep-alive mechanism
    private stopKeepAlive(): void {
        if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);
        }
    }

    // Reconnect to the WebSocket server
    private reconnect(url: string, userId: String): void {
        if (this.currentReconnectAttempts < this.reconnectAttempts) {
            const delay = Math.min(
                this.reconnectDelay * Math.pow(2, this.currentReconnectAttempts), // Exponential backoff
                2000 // Cap the delay at n seconds
            );
            console.log(
                `Reconnecting in ${this.reconnectDelay / 1000} seconds... (Attempt ${this.currentReconnectAttempts + 1
                } of ${this.reconnectAttempts})`
            );

            this.reconnectInterval = setTimeout(() => {
                this.currentReconnectAttempts++;
                this.connect(url, userId);
            }, this.reconnectDelay);
        } else {
            console.error('Maximum reconnect attempts reached. Unable to reconnect.');
            this.close();
        }
    }

    close(): void {
        this.intentionalClose = true;
        if (this.socket) {
            this.socket.close();
        }
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
        this.stopKeepAlive();
        if (this.reconnectInterval) {
            clearTimeout(this.reconnectInterval);
        }
    }
}
