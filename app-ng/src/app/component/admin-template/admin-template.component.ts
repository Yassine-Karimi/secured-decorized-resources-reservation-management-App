import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Client} from "../../models/client.model";
import {Session} from "../../models/session.model";
import {UserService} from "../../services/user.service";
import {SessionService} from "../../services/session.service";
import Swal from "sweetalert2";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent {
  currentPage: number = 0;
  size: number = 3;
  totalPages: number = 0;
  public profile? : KeycloakProfile;


  idUser!:number;
  session!:Session;
  notification!:Session[];
  error!:string;
  errMessage: string = 'Data Not Found!';

  constructor(private router:Router,
              private userService:UserService,
              private sessionService:SessionService,
              private kc:KeycloakService
  ) {

  }
  ngOnInit() {
    if(this.kc.isLoggedIn()){
      this.kc.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
  }
  // showNotification() {
  //   this.sessionService
  //     .getAllSessionsPages(this.currentPage, this.size)
  //     .subscribe({
  //       next: (data) => {
  //         console.log(data);
  //         this.notification = data.content;
  //         this.totalPages = data.totalPages;
  //       },
  //       error: (err) => {
  //         this.errMessage = "Data Not Found !";
  //       }
  //     });
  //   let notificationHtml = '';
  //   for (const c of this.notification) {
  //     notificationHtml += `
  //         <tr>
  //           <td class="mobile">${c.username}</td>
  //           <td>
  //             <ng-container ngIf="c.date_logout">
  //               <img width="12px" src="assets/img/offline.png" />
  //             </ng-container>
  //             <span *ngIf="!c.date_logout">
  //               <img width="15px" src="assets/img/enligne.png" /> En Ligne
  //             </span>
  //           </td>
  //         </tr>
  //       `;
  //   }
  //   Swal.fire({
  //     title: "historique",
  //     html: `
  // <table class="table" $*ngIf="notification && notification.length > 0; else noData">
  //           <thead class="thead-light">
  //             <tr>
  //               <th class="border-bottom mobile" scope="col">USER</th>
  //               <th class="border-bottom" scope="col">Etat</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //                 ${notificationHtml}
  //
  //           </tbody>
  //         </table>
  //
  //
  //
  //
  //
  //   `,
  //
  //     confirmButtonText: 'OK',
  //   });
  // }
// <div class="  ">
//   <div>
//     <textarea
//       rows="7"
//   class="form-control"
//   formControlName="contenu"
//   placeholder="Contenu"
//     [ngClass]="clientFormGroup.controls['contenu'].errors && clientFormGroup.controls['contenu'].touched ? 'form-control is-invalid' : 'form-control is-valid'"
//   required
// >${this.note.contenu}</textarea>
//
// </div>
//
// </div>
  logout(){
    this.kc.logout(window.location.origin);

    this.sessionService.getSession(this.userService.getSessionId()).subscribe({
      next: (data) => {

        this.session= data;
        this.session.date_logout=Date.now();
        this.sessionService.editSession(this.userService.getSessionId(),this.session).subscribe({
          next : data => {

            //alert("Radar Updated Successfully")
            this.router.navigateByUrl("/login")

            window.location.reload();
           // this.authenticatUser.logout();
          },
          error : err => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        this.errMessage = "Data Not Found !";
      }
    });

  }
  // handleEditClient(id:number) {
  //   this.router.navigateByUrl("admin/editProfile/"+this.authenticatUser.getId(this.authenticatUser.authenticatUser!.username))
  // }
}
