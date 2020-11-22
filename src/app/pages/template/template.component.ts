import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    correo: '',
    apellido: '',
    pais: '',
    genero: 'F'
  }

  countries: any[]=[];

  constructor(private cs: CountriesService) { }

  ngOnInit(): void {
    this.cs.getCountries().subscribe(data => {
      //console.log(data);
      this.countries = data;
      console.log(this.countries);
      // Agregar la opción default
      this.countries.unshift({name: 'seleccione un país', code: ''});
    });
  }

  enviar(form: NgForm ){
    console.log(form);
    if(form.invalid) Object.values(form.controls).forEach(control => control.markAsTouched());
  }

}
