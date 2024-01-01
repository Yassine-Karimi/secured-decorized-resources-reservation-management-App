import { Component } from '@angular/core';
import {Client} from "../../../models/client.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  client! : Client
  clientFormGroup! : FormGroup;

  constructor(private fb : FormBuilder,
              private router : Router,
              public clientService : PersonService,
             ) {
  }

  ngOnInit(): void {

        this.clientFormGroup = this.fb.group({
          nom : this.fb.control(null,[Validators.required, Validators.maxLength(100)]),
          prenom : this.fb.control( null,[Validators.maxLength(100)]),
          email : this.fb.control( null,[Validators.required]),
          phone : this.fb.control( null,[Validators.required]),
          role : this.fb.control(null,[Validators.required]),
          username : this.fb.control(null, [Validators.required]),
          password : this.fb.control( null,[Validators.required]),
          etat : this.fb.control( null)



        });


  }

  handleAddClient() {
    let r = this.clientFormGroup.value;
    r.etat=true;
    r.id=null;
    Swal.fire({
      title: 'Do you want to add this new user?',
      //showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Added!', '', 'success')

        this.clientService.addClient(r).subscribe({
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

