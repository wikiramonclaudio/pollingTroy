import { UserService } from 'src/app/services/user.service';
import { finalize, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
    private userService: UserService
  ) { }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  uploadFile(event, filename) {
    const file = event.target.files[0];
    const filePath = 'users/' + filename;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
        finalize(() => {
          return fileRef.getDownloadURL();
        })
     );
  }
  // public uploadFile(filename: string, fileData: any){
  //   const file = fileData;
  //   const filePath = filename;
  //   return this.storage.ref('users/' + filePath).put(fileData).snapshotChanges().pipe(
  //     finalize( () => {
  //       this.storage.ref('users/' + filePath).getDownloadURL().subscribe((data) => {
  //         console.log('DATA HERE', data);
  //       });
  //     })
  //   );
  // }
}
