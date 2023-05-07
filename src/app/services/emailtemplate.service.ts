import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { EmailTemplate } from '../models/emailtemplate';
import { EmailTemplateComponent } from '../components/emailtemplate/emailtemplate.component';

@Injectable({
  providedIn: 'root',
})

export class emailtemplateService {
  private dbPath = '/emailtemplate';
  emailtemplateRef: AngularFireList<EmailTemplate>;
  emailtemplateservice: any;

  constructor( private db: AngularFireDatabase ) {
     this.emailtemplateRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<EmailTemplate> {
    return this.emailtemplateRef;
  }
  create(tutorial: EmailTemplate): any {
    return this.emailtemplateRef.push(tutorial);
  }
  update(key: string, value: any): Promise<void> {
    return this.emailtemplateRef.update(key, value);
  }
  delete(key: string): Promise<void> {
    return this.emailtemplateRef.remove(key);
  }
  deleteAll(): Promise<void> {
    return this.emailtemplateRef.remove();
  }
}
