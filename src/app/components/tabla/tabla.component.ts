import { Component, OnInit } from '@angular/core';
import {PersonaModel} from '../../models/persona.model';
import {PersonasService} from '../../services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  personas: PersonaModel [] = [];

  constructor(  private personaService: PersonasService ) { }

  ngOnInit() {

    this.personaService.getPersonas().subscribe( resp => {
      console.log(resp);
      this.personas = resp;
    });
  }

  borrar(persona: PersonaModel, i: number){
    Swal.fire({
      title: `Estás seguro de borrar a ${persona.nombre}`,
      text: 'No podrás revertir esta situación',
      icon: 'warning',
      confirmButtonText: 'Si, borrar',
      showCancelButton: true,
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }). then( (result) => {
      if (result.value){
        this.personas.splice(i, 1);
        this.personaService.eliminarPersona(persona.id).subscribe();
        Swal.fire(
          `${persona.nombre} borrado`,
          'El registro ha sido borrado con éxito',
          'success'
        );
      }
    }) ;
  }

}
