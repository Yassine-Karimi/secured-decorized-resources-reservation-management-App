import {Component, OnInit, TemplateRef,OnDestroy} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PersonService} from "../../services/person.service";
import {Client} from "../../models/client.model";
// import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients!: any;
  errMessage: string = 'Data Not Found!';
  closeResult!:string;
  currentPage: number = 0;
  size: number = 5;
  totalPages: number = 0;
  currentAction: string = 'all';

  searchFormGroup!: FormGroup;
  isVehicleInfoVisible: boolean = false;
  selectedVehicleInfraction: any;
  isRadarInfoVisible: boolean = false;
  selectedRadarInfraction: any;
  isAdmin: boolean = false;
  selectedInfraInfraction: any;

  private refreshSubscription!: Subscription;


  constructor(
    private clientsService: PersonService,
    private fb: FormBuilder,
    private router: Router,
    // private modalService: NgbModal

  ) {
    this.refreshData();

  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    const clientsData = localStorage.getItem('clients');
    if (clientsData) {
      this.clients = JSON.parse(clientsData);
    } else {
      this.handleGetAllClients();
    }
    //this.getInfractions();
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe();
  }


  private refreshData(): void {
    this.handleGetAllClients();

    // Set up polling to refresh data every 5 seconds (adjust the interval as needed)
    this.refreshSubscription = interval(2000)
      .pipe(switchMap(() =>  this.clientsService.getAllClientPages(this.currentPage, this.size)))
      .subscribe(
        (data) => {
          this.clients = data.content;
          this.totalPages = data.totalPages;
          localStorage.setItem('clients', JSON.stringify(this.clients));
        },
        (error) => {
          this.errMessage = error;
        }
      );
  }





  handleGetAllClients() {
    this.clientsService.getAllClientPages(this.currentPage, this.size).subscribe({
      next: data => {
        this.clients = data.content;
        this.totalPages = data.totalPages;
        localStorage.setItem('clients', JSON.stringify(this.clients));

        console.log(data)
      },
      error: err => {
        this.errMessage = err;
      }
    });
  }

  getClients(): void {
    this.clientsService
      .getAllClientPages(this.currentPage, this.size)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.clients = data.content;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          this.errMessage = "Data Not Found !";
        }
      });
  }

  /**/
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.currentPage = this.currentPage++;
      if (this.currentAction === 'all') this.getClients();
      else this.handleSearchClient();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.currentPage = this.currentPage--;
      if (this.currentAction === 'all') this.getClients();
      else this.handleSearchClient();
    }
  }



  /*
    handledeleteInfraction(infraction: Infraction) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

          this.infractionsService.deleteInfraction(infraction.id).subscribe({
            next: (data) => {
              let index = this.infractions.indexOf(infraction);
              this.infractions.splice(index, 1);
            }
          });
        }
      });
    }
  */
  handleSearchClient() {
    this.currentAction = 'search';
    let keyword = this.searchFormGroup.value.keyword;

    this.clientsService.searchAdmin(keyword).subscribe({
      next: (data) => {
        this.clients = data.content;
        this.totalPages = data.totalPages;
      }
    });
  }


  handleSetPayed(c: Client) {
    let p = c.etat;
    c.etat= !p;
    Swal.fire({
      title: 'Do you want to save the changes?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')

        this.clientsService.editClient(c).subscribe({
          next : data => {

            //alert("Radar Updated Successfully")
            this.router.navigate(['/admin/admins']);
          },
          error : err => {
            console.log(err);
          }
        })

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  handleEditClient(r:Client) {
    this.router.navigateByUrl("admin/editClient/"+r.id)
  }
  handleAddClient() {
    this.router.navigateByUrl("admin/addClient/")
  }
  /*handleEditRadar() {
    let r = this.radarFormGroup.value;
    r.id = this.radar.id;

    Swal.fire({
      title: 'Do you want to save the changes?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')

        this.radarService.editRadar(r).subscribe({
          next : data => {

            //alert("Radar Updated Successfully")
            this.router.navigate(['/radars']);
            this.radarFormGroup.reset()
          },
          error : err => {
            console.log(err);
          }
        })

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }*/


  handledeleteClient(r : Client) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )

        this.clientsService.deleteClient(r.id).subscribe({
          next : (data) => {
            //this.handleGetAllProducts()
            let index = this.clients.indexOf(r);
            this.clients.splice(index, 1)
            this.router.navigate(['/admin/admins']);

          }
        });


      }
    })
  }





}
