import { Component, OnInit, ViewChild } from '@angular/core';
import {PersonaModel} from '../../models/persona.model';
import {PersonasService} from '../../services/personas.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  personas: PersonaModel [] = [];
  displayedColumns: string[] = ['no', 'nombre', 'curp', 'edad', 'sexo', 'acciones'];
  dataSource: MatTableDataSource<PersonaModel>;

  constructor(  private personaService: PersonasService ) { }

  ngOnInit() {

    this.personaService.getPersonas().subscribe( resp => {
      console.log(resp);
      this.personas = resp;
      this.dataSource = new MatTableDataSource(this.personas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
