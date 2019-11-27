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
        this.convertStructureIntoObject(this.saveFile);
        this.convertObjectIntoStructure(this.saveFile);
    }

    convertStructureIntoObject(obj: Object) {
        for (const prop of Object.keys(obj)) {
            if (typeof obj[prop] === 'string' && obj[prop].charAt(0) === '{') { // It is an object
                obj[prop] = JSON.parse(obj[prop]);
                this.convertStructureIntoObject(obj[prop]);
            }
        }
    }

    convertObjectIntoStructure(obj: Object) {
        for (const prop of Object.keys(obj)) {
            if (typeof obj[prop] === 'object' && !Array.isArray(obj[prop])) { // It is an object
                this.convertObjectIntoStructure(obj[prop]);
                obj[prop] = JSON.stringify(obj[prop]);
            }
        }
    }
}
