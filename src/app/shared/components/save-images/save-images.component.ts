import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-save-images',
  standalone: true,
  imports: [CommonModule,FileUploadModule],
  templateUrl: './save-images.component.html',
  styleUrl: './save-images.component.css',
})
export class SaveImagesComponent {
  uploadedFiles: any[] = [];

  @Output() createdImage = new EventEmitter<string[]>();


  constructor(private messageService: MessageService) {}

  onUpload(event: any) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    let image: any = this.uploadedFiles[0];
    let fr = new FileReader();
    fr.onload = () => {
      // when file has loaded
      const img:any = new Image();

      img.src = fr.result; 
      this.createdImage.emit(img.src);
    };
    fr.readAsDataURL(image);
  
    //Dipslay Success message if image created
    this.messageService.add({
      severity: 'success',
      summary: 'Image Uploaded',
      detail: '',
    });

  }


}
