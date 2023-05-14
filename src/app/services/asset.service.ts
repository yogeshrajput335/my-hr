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
  assetsRef: AngularFireList<Asset>;

  constructor(private db: AngularFireDatabase) {
    this.assetsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Asset> {
    return this.assetsRef;
  }
  create(tutorial: Asset): any {
    return this.assetsRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.assetsRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.assetsRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.assetsRef.remove();
  }
}