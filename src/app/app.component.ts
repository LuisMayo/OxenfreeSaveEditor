import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OxenfreeSaveEditor';
  textFile: string;
  saveFile: Object;


  onLoad(event: Event) {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
        this.textFile = <string>fr.result;
        this.processTextFile();
    });
    fr.readAsText((<HTMLInputElement>event.target).files[0]);
  }

  processTextFile() {
      this.textFile = this.textFile.substring(0, this.textFile.indexOf(',"GlobalVariables"')) + '}' // We don't know how to process Global variables yet
      this.saveFile = JSON.parse(this.textFile);
  }
}
