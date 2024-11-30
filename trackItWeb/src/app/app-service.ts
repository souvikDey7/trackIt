import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { WebSocketService } from './app.socket.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private https: HttpClient,private webSocketService: WebSocketService) { }

    url = "https://trackit-lkhm.onrender.com";
    createRoom(roomId: string, password: string) {
        let finalUrl = this.url + "/createRoom";
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'application/json; charset=UTF-8 ')
        header = header.set('Access-Control-Allow-Origin', '*');
        header = header.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
        header = header.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
        let credential = {
            "roomId": roomId,
            'password': password
        }
        return this.https.post(finalUrl, credential, {
            headers: header,
            responseType: 'text' as 'json',
            observe: 'response'
        }).pipe(
            map((response) => response.status),
            catchError((error) => {
                return of(error.status); // Return the error's status code
            })
        );
    }

    joinRoom(roomId: string, password: string, userId: string) {
        let finalUrl = this.url + "/joinRoom?userId=" + userId;
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'application/json; charset=UTF-8 ')
        header = header.set('Access-Control-Allow-Origin', '*');
        header = header.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
        header = header.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
        let credential = {
            "roomId": roomId,
            'password': password
        }
        return this.https.post(finalUrl, credential, {
            headers: header,
            responseType: 'text' as 'json',
            observe: 'response'
        }).pipe(
            map((response) => response.status),
            catchError((error) => {
                return of(error.status); // Return the error's status code
            })
        );
    }

    sendLocation()
    {
        this.webSocketService.connect('wss://trackit-lkhm.onrender.com/locationupdates');
    }

}