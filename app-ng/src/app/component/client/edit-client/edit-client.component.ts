import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../../../models/client.model";
import {PersonService} from "../../../services/person.service";
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  clientId! : number;
  client! : Client
  clientFormGroup! : FormGroup;

  constructor(private fb : FormBuilder,
              private router : Router,
              public clientService : PersonService,
              private route : ActivatedRoute) {
    this.clientId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.clientService.getClient(this.clientId).subscribe({
      next : data => {
        this.client = data;

        this.clientFormGroup = this.fb.group({
          nom : this.fb.control(this.client.nom,[Validators.required, Validators.maxLength(100)]),
          prenom : this.fb.control(this.client.prenom, [Validators.maxLength(100)]),
          email : this.fb.control(this.client.email, [Validators.required]),
          phone : this.fb.control(this.client.phone, [Validators.required]),
          role : this.fb.control(this.client.role, [Validators.required]),
          username : this.fb.control(this.client.username, [Validators.required]),
          password : this.fb.control(this.client.password, [Validators.required]),
          etat : this.fb.control(this.client.etat, [Validators.required])


        });

      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleEditClient() {
    let r = this.clientFormGroup.value;
    r.id = this.client.id;
    r.etat = this.client.etat;

    Swal.fire({
      title: 'Do you want to save the changes?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')

        this.clientService.editClient(r).subscribe({
          next : data => {

            //alert("Radar Updated Successfully")
            this.router.navigate(['/admin/admins']);
            this.clientFormGroup.reset()
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
}

