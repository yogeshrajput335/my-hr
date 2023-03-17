import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Asset } from 'src/app/models/asset';
import { assetService } from 'src/app/services/asset.service';

declare var dataTableInit:any;

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})

export class AssetComponent implements OnInit {
  Assets: Asset[];
  asset:Asset = {name:'',details:''};
  selectedProducts: Asset[];
  cols: any[];
  display = false;
  sibebarHeader = "Add Asset";
  selectedKey=''

  constructor(
    public assetservice: assetService
  ){ }

    ngOnInit():void {
      this.cols = [
        { field: 'name', header: 'name', customExportHeader: 'NAME' },
        { field: 'details', header: 'details' }
      ];

    this.assetservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.Assets = data;
    });
  }
  create() {   
    if(this.sibebarHeader == 'Edit Asset'){
      this.assetservice.update(this.selectedKey,this.asset).then(() => {
        console.log('Updated job successfully!');
        this.display = false;
        this.asset = {name:'', details:''}
      });
    }
    else{
    this.assetservice.create(this.asset).then(() => {
      console.log('Created new item successfully!');
      this.display = false;
      this.asset = {name:'', details:''}
    });
  }
  }
  AddAsset(){
    this.display = true;
    this.sibebarHeader = 'Add Asset'
  }
  edit(key:string,asset:Asset){
    this.display = true;
    this.sibebarHeader = 'Edit Asset'
    this.asset = asset;
    this.selectedKey = key;

  }
  delete(key:any){
    this.assetservice.delete(key);
  }
}