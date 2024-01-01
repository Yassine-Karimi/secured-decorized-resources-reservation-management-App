import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {SessionService} from "../../services/session.service";
import {Session} from "../../models/session.model";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
session!:Session;
  error!:string;
  public profile? : KeycloakProfile;

  errMessage: string = 'Data Not Found!';

  constructor(private router:Router,
              private userService:UserService,
              private sessionService:SessionService,
              public kc:KeycloakService
  ) { }

  ngOnInit() {
    if(this.kc.isLoggedIn()){
      this.kc.loadUserProfile().then(profile=>{
        this.profile=profile;
      });
    }
  }
  activeLink: string = '';

  // handleEditClient(id:number) {
  //   this.router.navigateByUrl("admin/editProfile/"+this.authenticatUser.getId(this.authenticatUser.authenticatUser!.username))
  // }
  isLinkActive(link: string): boolean {
    return this.activeLink === link;
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  logout(){
    this.kc.logout(window.location.origin);
    // this.sessionService.getSession(this.userService.getSessionId()).subscribe({
    //   next: (data) => {
    //
    //     this.session= data;
    //     this.session.date_logout=Date.now();
    //     this.sessionService.editSession(this.userService.getSessionId(),this.session).subscribe({
    //       next : data => {
    //
    //         //alert("Radar Updated Successfully")
    //         this.router.navigateByUrl("/login")
    //
    //         window.location.reload();
    //         // this.authenticatUser.logout();
    //       },
    //       error : err => {
    //         console.log(err);
    //       }
    //     })
    //   },
    //   error: (err) => {
    //     this.errMessage = "Data Not Found !";
    //   }
    // });

  }

    protected readonly KeycloakService = KeycloakService;
}
