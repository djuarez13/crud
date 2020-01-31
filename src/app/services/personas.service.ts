import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PersonaModel} from '../models/persona.model';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private url = 'https://jugadores-76e79.firebaseio.com';

  constructor( private http: HttpClient ) { }

  // Función utilizada para enviar la información capturada en el formulario a la base de datos

  crearPersona(persona: PersonaModel){
    return this.http.post(`${this.url}/persona.json`, persona).pipe(
      map( (resp: any) => {
        persona.id = resp.name;
        return persona;
      })
    );
  }

  // Función para obtener todos los registros de la base de datos de personas

  getPersonas(){
    return this.http.get( `${this.url}/persona.json`).pipe(
      map(this.crearArreglo)
    );
  }

  // Como la base de datos regresa la información contenida en un objeto, se creó una función para transformar esta información en un Arreglo

  crearArreglo(personasObj: object){
    const personas: PersonaModel [] = [];
    Object.keys(personasObj).forEach( key => {
      const persona: PersonaModel = personasObj[key];
      persona.id = key;
      personas.push(persona);
    });
    return personas;
  }

  // Función utilizada para obtener un nodo de la base de datos mediante el id

  getPersona( id: string ){

    return this.http.get(`${this.url}/persona/${id}.json`);
  }

  // Función utilizada para actualizar el registro de una persona

  actualizarPersona(persona: PersonaModel){
    const personaTemp = {
      ...persona
    };
    delete personaTemp.id;

    return this.http.put(`${this.url}/persona/${persona.id}.json`, personaTemp);
  }

  eliminarPersona(id: string){
    return this.http.delete(`${this.url}/persona/${id}.json`);
  }

}
