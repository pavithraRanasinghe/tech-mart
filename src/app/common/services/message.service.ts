import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LocalizationService} from './localization.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackbar: MatSnackBar,
              private localization: LocalizationService) {
  }

  success(message: string, description?: string) {
    this.snackbar.open(this.localization.keys[message] ?? '' + '\n' + description ?? '', 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['style-success']
    });
  }

  error(message: string, description?: string){
    this.snackbar.open(this.localization.keys[message] + '\n' + description, 'Dismiss', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['style-error']
    });
  }
}
