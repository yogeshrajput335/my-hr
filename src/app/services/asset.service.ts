import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root',
})
export class assetService {
  private dbPath = '/asset';
  tutorialsRef: AngularFireList<Asset>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Asset> {
    return this.tutorialsRef;
  }

  create(tutorial: Asset): any {
    return this.tutorialsRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }
}