import { Component, OnInit } from '@angular/core';
import {PersonaModel} from '../../models/persona.model';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {PersonasService} from '../../services/personas.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Observable, observable} from 'rxjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  persona: PersonaModel = new PersonaModel();
  forma: FormGroup;


  constructor( private personaService: PersonasService, private activatedRoute: ActivatedRoute ) {
    this.forma = new FormGroup({
      nombre: new FormControl(this.persona.nombre, [Validators.required, Validators.minLength(5)]),
      curp: new FormControl(this.persona.curp, [Validators.required, Validators.minLength(15)]),
      edad: new FormControl(this.persona.edad, [Validators.required]),
      sexo: new FormControl(this.persona.sexo, [])
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      // tslint:disable-next-line:no-unused-expression
      this.personaService.getPersona(id).subscribe((resp: any) =>{this.persona = resp; this.persona.id = id; }  );
}
  }

  guardar(forma: NgForm){

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    // tslint:disable-next-line:prefer-const
    let peticion: Observable<any>

    if(this.persona.id){
      peticion = this.personaService.actualizarPersona(this.persona);
    } else {
       peticion = this.personaService.crearPersona(this.persona);
    }

    peticion.subscribe(resp =>{
      Swal.fire({
        title: `${this.persona.nombre} se actualizó correctamente`,
        icon: 'success'
      });
    });
  }
}
