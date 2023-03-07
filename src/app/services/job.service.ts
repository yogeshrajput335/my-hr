import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Job } from '../models/job';
@Injectable({
  providedIn: 'root',
})
export class jobService {
  private jobCollection = 'job';

  constructor(private angularFireStore: AngularFirestore) {}

  getJob() {
    return this.angularFireStore
      .collection(this.jobCollection)
      .snapshotChanges();
  }

  createJob(job: any) {
    return this.angularFireStore.collection(this.jobCollection).add(job);
  }

//   deleteMaterialDispatch(id: any) {
//     return this.angularFireStore
//       .collection(this.materialdispatchCollection)
//       .doc(id)
//       .delete();
//   }

//   updateMaterialDispatch(material: any) {
//     return this.angularFireStore
//       .collection(this.materialdispatchCollection)
//       .doc(material.id)
//       .update({
//         name: material.name!,
//         quantity: material.quantity!,
//         status: material.status!,
//       });
//   }
}
