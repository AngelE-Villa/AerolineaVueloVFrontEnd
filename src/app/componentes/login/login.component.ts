import { Component, OnInit } from '@angular/core';
import {GlobalConstants} from "../../common/GlobalConstants";
import {UsuarioService} from "../../services/Usuario.service";
import {UsuarioResponse} from "../../models/Response/UsuarioResponse";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterRequest} from "../../models/Request/RegisterRequest";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public objeto:UsuarioResponse=new UsuarioResponse();

  public classReference = GlobalConstants;
  constructor(private service:UsuarioService,
              private router:Router, private _snackBar: MatSnackBar
    ,private activatedRoute: ActivatedRoute){
    this.classReference.apiURL="no_employe";
  }
  public user = GlobalConstants;
  ngOnInit(): void {
  }

  durationInSeconds = 3;
  showSuccessCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['green-snackbar', 'login-snackbar']
    });
  }

  showSuccessInCorrect(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      panelClass: ['red-snackbar', 'login-snackbar']
    });
  }


  login():void{
    if(this.objeto.email!=null && this.objeto.clave!=null){
      this.service.login(this.objeto).subscribe(data => {
          //almacenar token_______________________________________
          sessionStorage.setItem('user', JSON.stringify(data));

          this.showSuccessCorrect("Bienvenido","OK");

          this.router.navigate(['']).then(value => {
            window.location.reload();
          });
          this.classReference.user=data;
        },err=> {
          this.showSuccessInCorrect("Usuario no existente","USER");
          this.objeto.email="";
          this.objeto.clave=""
        }
      );
    }
  }

}
