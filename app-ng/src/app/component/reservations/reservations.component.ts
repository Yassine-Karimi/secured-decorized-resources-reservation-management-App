import {Component, OnInit, TemplateRef,OnDestroy} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {Client} from "../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PersonService} from "../../services/person.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {ResourcesService} from "../../services/resources.service";
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import {Notebook} from "../../models/notebook.model";
import {DateFormatPipe} from "../../pipes/date-format.pipe";
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";
import {ReservationsService} from "../../services/reservations.service";
@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit  {
  clients!: any;
  admin_id!:Observable<never> | number;
  errMessage: string = 'Data Not Found!';
  closeResult!:string;
  currentPage: number = 0;
  size: number = 5;
  totalPages: number = 0;
  currentAction: string = 'all';
  note!: any;
  searchFormGroup!: FormGroup;
  isVehicleInfoVisible: boolean = false;
  selectedVehicleInfraction: any;
  isRadarInfoVisible: boolean = false;
  selectedRadarInfraction: any;
  isAdmin: boolean = false;
  selectedInfraInfraction: any;
  noteTitle!:string;

  private refreshSubscription!: Subscription;


  constructor(
    private reservationService: ReservationsService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private userService:UserService

  ) {
    this.refreshData();

  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control(null)
    });
    const notesData = localStorage.getItem('notes');
    if (notesData) {
      this.clients = JSON.parse(notesData);
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
    this.refreshSubscription = interval(5000)
      .pipe(switchMap(() =>  this.reservationService.getAllReservationsPages(this.currentPage, this.size)))
      .subscribe(
        (data) => {
          this.clients = data.content;
          this.totalPages = data.totalPages;
          localStorage.setItem('notes', JSON.stringify(this.clients));
        },
        (error) => {
          this.errMessage = error;
        }
      );
  }



  handleGetAllClients() {
    this.reservationService.getAllReservationsPages(
      // this.userService.getUserId(),
      this.currentPage, this.size).subscribe({
      next: data => {
        this.clients = data.content;
        this.totalPages = data.totalPages;
        localStorage.setItem('notes', JSON.stringify(this.clients));

        console.log(data)
      },
      error: err => {
        this.errMessage = err;
      }
    });
  }

  getClients(): void {
    this.reservationService

      .getAllReservationsPages(
        // this.admin_id,
        this.currentPage, this.size)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.clients = data.content;
          this.totalPages = data.totalPages;
          localStorage.setItem('clients', JSON.stringify(this.clients));

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

    this.reservationService.searchReservations(keyword).subscribe({
      next: (data) => {
        this.clients = data.content;
        this.totalPages = data.totalPages;
      }
    });
  }


  handleSetPayed(c: any) {
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

        this.reservationService.editReservation(c,c.id).subscribe({
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
  handleEditClient(r:any) {
    this.router.navigateByUrl("admin/editNote/"+r.id)
  }
  handleAddClient() {
    this.router.navigateByUrl("admin/addNote")
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

  }--------------------------------------------------------------------------------------------*/

  showNoteInfo(n: any) {
    this.reservationService
      .getReservation(n.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.note= data;
          this.noteTitle='&laquo;'+this.note.titre+'&raquo;';
        },
        error: (err) => {
          this.errMessage = "Data Not Found !";
        }
      });
    Swal.fire({
      title: this.noteTitle,
      html: `
     <div class="  ">
            <div>
              <textarea
              rows="7"
                class="form-control"
                formControlName="contenu"
                placeholder="Contenu"
                [ngClass]="clientFormGroup.controls['contenu'].errors && clientFormGroup.controls['contenu'].touched ? 'form-control is-invalid' : 'form-control is-valid'"
                required
              >${this.note.contenu}</textarea>

            </div>

          </div>
    `,

      confirmButtonText: 'OK',
    });
  }
  handledeleteClient(r : any) {

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

        this.reservationService.deleteReservation(r.id).subscribe({
          next : (data) => {
            //this.handleGetAllProducts()
            let index = this.clients.indexOf(r);
            this.clients.splice(index, 1)
            this.router.navigate(['/admin/reservations']);

          }
        });


      }
    })


  }







  /*

handleNewInfraction() {
  this.router.navigateByUrl('/newInfraction');
}

handleEditInfraction(infraction: Infraction) {
  this.router.navigateByUrl('/editInfraction/' + infraction.id);
}

showVehicle(i: any) {
  this.isVehicleInfoVisible = true;
  this.selectedVehicleInfraction = i.vehicle;
}

showInfraction(i:any){
  this.isVehicleInfoVisible = true;
  this.selectedVehicleInfraction = i.vehicle;
  this.isRadarInfoVisible = true;
  this.selectedRadarInfraction = i.radar;
}
showRadar(i: any) {
  this.isRadarInfoVisible = true;
  this.selectedRadarInfraction = i.radar;
}

generatePDF(data : any) {
  // Define the document definition
  // Create the document definition
  let documentDefinition = {
    content: [


      { text: '___________________ Infraction Report  ___________________', style: 'header'},

      { text: `ID: ${data.id}` },
      { text: `Date: ${data.date}` },
      { text: `Vehicle Matricule: ${data.vehicleMatricule}` },
      { text: `Vehicle Speed: ${data.vehicleSpeed}` },
      { text: `Radar Max Speed: ${data.radarMaxSpeed}` },
      { text: `Infraction Amount: ${data.infractionAmount}` },

      { text: ` ________________________________________________________________________  ` ,style: 'bigger'},
      { text: `Owne Info :` ,style: 'bigger'},
      { text: `Name : ${data.vehicle.owner.name}`},
      { text: `email : ${data.vehicle.owner.email}` },

      { text: ` ________________________________________________________________________  ` ,style: 'bigger'},

      { text: ` ________________________________________________________________________  ` ,style: 'bigger'},

      { text: `Radar Infos :`, style: 'bigger' },
      {
        layout: 'lightHorizontalLines', // optional
        table: {

          body: [
            [ 'RADAR ID', 'NAME', 'LONGITUDE', 'LATITUDE' ],
            [ { text: `${data.radarId}` }, { text: `${data.radar.name}` }, { text: `${data.radar.longitude}` }, { text: ` ${data.radar.latitude}` }, ],
          ]
        }
      },
      { text: ` ________________________________________________________________________  ` ,style: 'bigger'},

    ],
    styles: {
      header: {
        fontSize: 20,
        bold: true,

      },
      bigger: {
        fontSize: 14,
        bold: true,
      },

    }

  };

// Generate the PDF
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
  pdfDocGenerator.download('infraction_report.pdf');

}

}*/
}
