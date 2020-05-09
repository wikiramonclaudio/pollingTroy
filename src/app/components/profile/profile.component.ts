import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import swal from 'Sweetalert';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
import { finalize } from 'rxjs/operators';
declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  archivo;
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;
  constructor(
    private firebaseStorage: FirebaseStorageService,
    public userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {

  }

  editName() {
    // swal()
    const swlCont: any = 'input';
    swal('Change user name:', {
      content: swlCont,
    })
      .then((value) => {
        // console.log(`You typed: ${value}`);
        if (value.length > 3) {
          this.userService.editUser(value).then(() => {
            this.user.displayName = value;
            this.user.name = value;
          })
            .catch(() => { console.log('KO ERROR'); });
        }
      });
  }

  // Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      let reader = new FileReader();
      reader.onload = function(e) {
        $('.user-image').hide();
        $('.user-image').attr('src', e.target.result);
        $('.user-image').fadeIn(1000);
      };
      reader.readAsDataURL(event.target.files[0]);
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = 'users/' + event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], 'users/' + event.target.files[i].name);

        // Call function to upload the new picture
        this.subirArchivo();
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  // Sube el archivo a Cloud Storage
  public subirArchivo() {
    const archivo: any = this.datosFormulario.get('archivo');
    const referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    const tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);

    // Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
        //actualizar photoURL del usuario
        this.firebaseStorage.referenciaCloudStorage(archivo.name).getDownloadURL().subscribe((photourl) => {
          this.userService.editUser(this.user.name, photourl);
          this.userService.user.photoURL = photourl;
          this.userService.user.displayName = this.user.name;
          $('.top-user-picture').hide();
          $('.top-user-picture').attr('src', photourl);
          $('.top-user-picture').fadeIn(900);
        });
      }
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
    });
  }

  imgClickEvent(){
    $('.file-input').click();
  }

}

