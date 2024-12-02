import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasionStorageService {

  constructor() { }
  setKey(key: string, value: any) {
    sessionStorage.setItem(key, value)
  }

  getKey(data: string) {
    return sessionStorage.getItem(data)
  }

  logout() {
    sessionStorage.clear();
  }
}
