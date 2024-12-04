import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap, shareReplay } from 'rxjs/operators';
import { of, Observable, Subscription, timer } from 'rxjs';
import { WebSocketService } from './app.socket.service';
import { SeasionStorageService } from './seasion-storage.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {

    constructor(private https: HttpClient, private webSocketService: WebSocketService, private session: SeasionStorageService) { }

    url = "https://trackit-lkhm.onrender.com";
    //url="http://localhost:8080"
    
    createRoom(roomId: string, password: string) {
        let finalUrl = this.url + "/createRoom";
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
        let userId = this.session.getKey("Token-key");
        this.webSocketService.connect('wss://trackit-lkhm.onrender.com/locationupdates', userId);
        //this.webSocketService.connect('ws://localhost:8080/locationupdates',userId);
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
                const token = response.body ? response.body : '';
                this.session.setKey("Token-key", token);
                this.session.setKey("userName", userId);
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
               // console.log(response);
                const token = response.body ? response.body : '';
                this.session.setKey("Token-key", token);
                this.session.setKey("userName", userId);
                return response.status;
            }),
            catchError((error) => {
                return of(error.status); // Return the error's status code
            })
        );
    }

    getTable(roomId: String) {
        let finalUrl = this.url + "/getRoom?roomId=" + roomId;
        let header = new HttpHeaders();
        let token = this.session.getKey("Token-key");
        header = header.set('Content-Type', 'application/json; charset=UTF-8 ')
        header = header.set('Access-Control-Allow-Origin', '*');
        header = header.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        header = header.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
        header = header.set('Token-key', (token === null) ? '' : token);

        return this.https.get(finalUrl, {
            headers: header,
            responseType: 'text' as 'json'
        })
    }

    openInMap(latitude:any,longitude:any)
    {
        const mapsUrl = 'https://www.google.com/maps?q='+latitude+','+longitude;
        if (navigator.userAgent.match(/iPhone|Android|iPad/i)) {
            window.location.href = mapsUrl;
          } else {
            window.open(mapsUrl, '_blank');
          }
    }
}