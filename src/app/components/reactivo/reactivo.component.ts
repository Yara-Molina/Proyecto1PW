import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule
import { Dialog1Component } from '../dialog1/dialog1.component'; 

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]  // Asegúrate de importar ReactiveFormsModule
})
export class ReactivoComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog1Component, {
      width: '300px',
      data: { formData: this.form.value }, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El diálogo se cerró con los siguientes datos:', result);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newFrog = {
        id: 1,
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value
      };
      console.log('Frog enviado', newFrog);
    } else {
      console.log('Formulario no es válido');
    }
  }
}
