import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';  
import { Dialog1Component } from '../dialog1/dialog1.component';
import { Frog } from '../../models/frog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule 
  ]
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  form: FormGroup;
  savedFrogs: Array<Frog> = [];
  frogIdCounter = 1;  // Para asignar IDs incrementales

  constructor(private fb: FormBuilder, public dialog: MatDialog) {  
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      items: this.fb.array([])  // Arreglo de ítems
    });
  }

  // Acceso a los items dentro del formulario
  get items() {
    return this.form.get('items') as FormArray;
  }

  // Agregar un ítem al array de items
  addItem() {
    const itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]  // Aseguramos que hay un campo para la imagen
    });
    this.items.push(itemForm);
  }

  // Remover un ítem
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // Guardar un ítem individual después de abrir el diálogo de confirmación
  saveItem(index: number) {
    const dialogRef = this.dialog.open(Dialog1Component);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const item = this.items.at(index).value;
        this.savedFrogs.push(new Frog(this.frogIdCounter++, item.name, item.description, []));
        this.items.removeAt(index);  // Eliminar ítem después de guardarlo
      }
    });
  }

  // Guardar la rana completa con todos los ítems
  saveFrog() {
    const dialogRef = this.dialog.open(Dialog1Component);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const frog = new Frog(
          this.frogIdCounter++,
          this.form.get('name')?.value,
          this.form.get('description')?.value,
          this.items.value  // Pasar los items al objeto Frog
        );
        this.savedFrogs.push(frog);
        this.form.reset();  // Reiniciar el formulario
        this.items.clear();  // Limpiar el array de items
      }
    });
  }

  // Manejar la selección de imagen en el formulario
  onImageSelected(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.items.at(index).patchValue({
          image: reader.result  // Actualiza el campo de imagen en el ítem
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Control de disposición de tarjetas según el tamaño de la pantalla
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Formulario', cols: 1, rows: 1 },
          { title: 'Lista de Ranas', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Formulario', cols: 2, rows: 1 },
        { title: 'Lista de Ranas', cols: 1, rows: 1 },
      ];
    })
  );

  // Add this method
  onSubmit() {
    this.saveFrog();  // Or any other logic you want to execute on form submission
  }

  // Add this method if missing
  removeFrog(index: number) {
    this.savedFrogs.splice(index, 1);
  }
}
