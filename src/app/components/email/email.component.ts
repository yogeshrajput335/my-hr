import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { clientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { ColumnFilterFormElement } from 'primeng/table';
import { emailService } from 'src/app/services/email.service';
declare var dataTableInit: any;
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit{
    userDetails:any ;
    emails:any
    candidate:any={recipientEmail:'',subject:'',name:'',title:'',experience:'',availability:'',relocation:'',visaType:'',city:''}
    candidates:any[]=[]
    finalTemplate='';
    template=`<table border="1" cellpadding="3" cellspacing="0" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746TemplateBorder2" style="border-color:#a0b4d7;color:#000000;font:12px Verdana;border-collapse:collapse" width="100%">
    <tbody>
      <tr id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableHeader" style="font-family:Verdana,Geneva,sans-serif;font-size:11px;color:#ffffff;font-weight:bold;text-align:center;padding:5px 10px;border-bottom:2px solid #000000;border-top:2px solid #000000;background:#bdaddb">
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65546" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">&nbsp;</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65547" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">Name</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65561" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">Title</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65575" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">Experience</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65589" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">Availability</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65603" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">Relocation</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65617" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">Visa Type</td>
        <td align="left" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableColumnTdN65631" nowrap="" style="border-color:#a0b4d7;color:#000000;font:bold 12px Verdana" valign="top" width="10%">City</td>
      </tr>
      {ROWS}
    </tbody>
  </table>`
    oddRowTemplate=`<tr bgcolor="#e6e1ef">
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746requestResumeButtontdN65657" nowrap="" style="display:block" valign="top">
    <div id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746requestResumeButtonDiv" style="display:block">
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tbody>
        <tr>
          <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746applyhrefdivInkBGN65657" nowrap="" style="text-decoration:none;font-family:Verdana,Geneva,sans-serif;font-size:11px;color:#000000;font-weight:bold;background:#bdaddb;text-align:center;padding:5px 15px 6px 15px"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746applyhrefdiv" name="applyhrefdiv" style="text-decoration:none;font-weight:bold;white-space:nowrap;color:#000000;font-size:11px"><a href="mailto:{RECIPIENT}?subject={SUBJECT}" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746applyhref" style="color:#000000;text-decoration:none" target="_blank"><font color="#000000">Request Resume</font></a></span></td>
        </tr>
      </tbody>
    </table>
    </div>
    </td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65658" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65658"><u></u> &nbsp;{NAME}&nbsp;<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65672" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65672"><u></u> &nbsp;{TITLE}<u></u> </span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65686" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65686"><u></u> &nbsp;{EXP}<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65700" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65700"><u></u> &nbsp;{AVAIL}<u></u> </span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65714" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65714"><u></u> &nbsp;{RELOCATE}&nbsp;<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65728" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65728"><u></u> &nbsp;{VISATYPE}<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65742" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65742"><u></u> &nbsp;{CITY}<u></u></span></span></td>
  </tr>`;
    evenRowTemplate=`<tr bgcolor="#ffffff">
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746requestResumeButtontdN65546" nowrap="" style="display:block" valign="top">
    <div id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746requestResumeButtonDiv" style="display:block">
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tbody>
        <tr>
          <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746applyhrefdivInkBGN65546" nowrap="" style="text-decoration:none;font-family:Verdana,Geneva,sans-serif;font-size:11px;color:#000000;font-weight:bold;background:#bdaddb;text-align:center;padding:5px 15px 6px 15px"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746applyhrefdiv" name="applyhrefdiv" style="text-decoration:none;font-weight:bold;white-space:nowrap;color:#000000;font-size:11px"><a href="mailto:{RECIPIENT}?subject={SUBJECT}" id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746applyhref" style="color:#000000;text-decoration:none" target="_blank"><font color="#000000">Request Resume</font></a></span></td>
        </tr>
      </tbody>
    </table>
    </div>
    </td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65547" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65547"><u></u> &nbsp;{NAME}&nbsp;<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65561" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65561"><u></u> &nbsp;{TITLE}<u></u> </span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65575" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65575"><u></u> &nbsp;{EXP}<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65589" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65589"><u></u> &nbsp;{AVAIL}<u></u> </span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65603" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65603"><u></u> &nbsp;{RELOCATE}&nbsp;<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65617" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65617"><u></u> &nbsp;{VISATYPE}<u></u></span></span></td>
    <td id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746templateTableDataTdN65631" nowrap="" style="border-color:#a0b4d7;color:#000000;font:12px Verdana" valign="top"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746code"><span id="m_4008311415812014809m_-5121554939364801918m_9095447352672925746gardenheaderCodevalN65631"><u></u> &nbsp;{CITY}<u></u></span></span></td>
  </tr>`;
    constructor(
        private emailservice:emailService
        ) {}
        ngOnInit():void {
          this.userDetails = JSON.parse(localStorage.getItem('user')!)
          this.emailservice.getAll().snapshotChanges().pipe(
            map(changes =>
              changes.map(c =>
                ({ key: c.payload.key, ...c.payload.val() })
              )
            )
          ).subscribe(data => {
            this.emails = data;
          });
        }
    AddCandidate(){
      this.finalTemplate = '';
      this.candidates.push(this.candidate)
      this.candidate={recipientEmail:this.candidate.recipientEmail,subject:this.candidate.subject,name:'',title:'',experience:'',availability:'',relocation:'',visaType:'',city:''}
    }
    GenerateTemplate(){
      let rows=[]
      if(this.candidates && this.candidates.length>0){
        for (let index = 0; index < this.candidates.length; index++) {
          const element = this.candidates[index];
          if(index%2 == 0){
            let row = this.evenRowTemplate
              .replace('{RECIPIENT}',element.recipientEmail)
              .replace('{SUBJECT}',element.subject)
              .replace('{NAME}',element.name)
              .replace('{TITLE}',element.title)
              .replace('{EXP}',element.experience)
              .replace('{AVAIL}',element.availability)
              .replace('{RELOCATE}',element.relocation)
              .replace('{VISATYPE}',element.visaType)
              .replace('{CITY}',element.city);
            rows.push(row);
          } else {
            let row = this.oddRowTemplate
              .replace('{RECIPIENT}',element.recipientEmail)
              .replace('{SUBJECT}',element.subject)
              .replace('{NAME}',element.name)
              .replace('{TITLE}',element.title)
              .replace('{EXP}',element.experience)
              .replace('{AVAIL}',element.availability)
              .replace('{RELOCATE}',element.relocation)
              .replace('{VISATYPE}',element.visaType)
              .replace('{CITY}',element.city);
            rows.push(row);
          }
          
        }
        let t = rows.join("")
        this.finalTemplate = this.template.replace('{ROWS}',t)
        
      }
    }
    DeleteCandidate(i:number)
    {
      this.finalTemplate = '';
      this.candidates.splice(i,1);
    }
    EditCandidate(c:any){
      this.candidate  = c;
    }
    Clear(){
      this.candidate={recipientEmail:this.candidate.recipientEmail,subject:this.candidate.subject,name:'',title:'',experience:'',availability:'',relocation:'',visaType:'',city:''}
    }
    Save(){
      if(this.finalTemplate != ''){
        let d = new Date().toLocaleString()
        let email = {date: d,createdBy:this.userDetails.name,template:this.finalTemplate}
        this.emailservice.create(email).then(() => {
          alert('Templated Saved');
        });
      }
    }
    View(t:any){
      this.finalTemplate = t;
    }
    DeleteSaved(key:any){
      this.emailservice.delete(key);
    }
}
