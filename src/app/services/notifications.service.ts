import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Notifications } from '../models/notifications';
@Injectable({
  providedIn: 'root',
})
export class notificationsService {
  private dbPath = '/notifications';
  notificationsRef: AngularFireList<Notifications>;
  constructor(private db: AngularFireDatabase) {
    this.notificationsRef = db.list(this.dbPath);
  }
  getAll(): AngularFireList<Notifications> {
    return this.notificationsRef;
  }
  create(tutorial: Notifications): any {
    return this.notificationsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.notificationsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.notificationsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.notificationsRef.remove();
  }
}