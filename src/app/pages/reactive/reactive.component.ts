import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

    // variable que almacena el formulario
    form: FormGroup;

  // getter de los controles
  get validNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get validApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  } 

  get validCorreo(){
    return this.form.get('correo').invalid && this.form.get('correo').touched;
  }

  get validEstado(){
    return this.form.get('direccion.estado').invalid && this.form.get('direccion.estado').touched
  }
  get validMu(){
    return this.form.get('direccion.municipio').invalid && this.form.get('direccion.municipio').touched
  }
  // getter para un FormArray
  get arrayPasa(){
    return this.form.get('pasatiempo') as FormArray;
  }

  // para passwords (validacion personalizada)
  get Pass1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }

  get Pass2(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    // if ternario
    return (pass1 === pass2)?false:true;
  }

  constructor(private fb: FormBuilder, private customVal: ValidationService) { 
    this.crearForm();
   }

  ngOnInit(): void {
  }

  crearForm(){
    this.form = this.fb.group(
      // primer valor ('') representa el valor por defecto de cada control
      // como segundo campo agregamos validaciones
      {nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.customVal.noFelipe]],
      correo: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
          estado: ['',[Validators.required, Validators.minLength(4)]],
          municipio: ['',[Validators.required, Validators.minLength(4)]]
        }),
      pasatiempo: this.fb.array([])
      
    },{
      validators: this.customVal.matchPassword('pass1','pass2')
    });
  }

  enviar(){
    console.log(this.form);
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => { 
        //control.markAsTouched();
        if(control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAsTouched());
        }
        else{
          control.markAsTouched();
        }
      });
    }
    
  }
  // Para agregar elemento al formArray
  newControl(){
    this.arrayPasa.push(this.fb.control('',Validators.required));
  }
  // para Borrar el control seleccionado
  removeControl(id: number){
    this.arrayPasa.removeAt(id);
  }

}
