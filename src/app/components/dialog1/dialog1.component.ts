import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  // Importa MatDialogRef
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog1',
  template: `
    <h2 mat-dialog-title>Confirmación</h2>
    <mat-dialog-content>¿Estás seguro de que quieres guardar este ítem?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button (click)="onConfirm()">Confirmar</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule]  // Asegúrate de importar MatDialogModule
})
export class Dialog1Component {
  constructor(public dialogRef: MatDialogRef<Dialog1Component>) {}

  onCancel(): void {
    this.dialogRef.close(false);  // Cierra el diálogo y retorna 'false'
  }

  onConfirm(): void {
    this.dialogRef.close(true);  // Cierra el diálogo y retorna 'true'
  }
}
