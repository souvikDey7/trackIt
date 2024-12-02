import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { WebSocketService } from './app.socket.service';
import { SeasionStorageService } from './seasion-storage.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private https: HttpClient, private webSocketService: WebSocketService, private session: SeasionStorageService) { }

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

    joinRoom(roomId: string, password: string) {
        let finalUrl = this.url + "/joinRoom";
        let header = new HttpHeaders();
        let token = this.session.getKey("Token-key");
        header = header.set('Content-Type', 'application/json; charset=UTF-8 ')
        header = header.set('Access-Control-Allow-Origin', '*');
        header = header.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
        header = header.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
        header = header.set('Token-key', (token === null) ? '' : token)
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

    sendLocation() {
        this.webSocketService.connect('wss://trackit-lkhm.onrender.com/locationupdates');
    }

    signin(userId: string, password: string) {
        let finalUrl = this.url + "/register";
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'application/json; charset=UTF-8 ')
        header = header.set('Access-Control-Allow-Origin', '*');
        header = header.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
        header = header.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
        let credential = {
            "userId": userId,
            'password': password
        }
        return this.https.post(finalUrl, credential, {
            headers: header,
            responseType: 'text' as 'json',
            observe: 'response'
        }).pipe(
            map((response) => {
                console.log(response);
                this.session.setKey("Token-key", (response === null) ? response : "");
                return response.status;
            }),
            catchError((error) => {
                return of(error.status); // Return the error's status code
            })
        );
    }

    login(userId: string, password: string) {
        let finalUrl = this.url + "/login";
        let header = new HttpHeaders();
        header = header.set('Content-Type', 'application/json; charset=UTF-8 ')
        header = header.set('Access-Control-Allow-Origin', '*');
        header = header.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
        header = header.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
        let credential = {
            "userId": userId,
            'password': password
        }
        return this.https.post(finalUrl, credential, {
            headers: header,
            responseType: 'text' as 'json',
            observe: 'response'
        }).pipe(
            map((response) => {
                console.log(response);
                const token = response.body ? response.body : '';
                this.session.setKey("Token-key",token);
                return response.status;
            }),
            catchError((error) => {
                return of(error.status); // Return the error's status code
            })
        );
    }
}