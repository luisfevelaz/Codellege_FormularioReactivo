import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
// para importar rutas
import { RouterModule } from '@angular/router';
// importar la clase creada en el archivo app.routes.ts
import { routes } from './app.routes';
// trabajar con formularios
import { FormsModule } from '@angular/forms';
// para trabajar con formularios reactivos
import { ReactiveFormsModule } from '@angular/forms';
//para hacer peticiones http es necesario importar HttpClientModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
