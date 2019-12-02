import { Component } from '@angular/core';
import { Utils } from './utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'OxenfreeSaveEditor';
    textFile: string;
    newFile: string;
    saveFile: Object;
    ommitedPart: string;


    onLoad(event: Event) {
        const fr = new FileReader();
        fr.addEventListener('load', () => {
            this.textFile = <string>fr.result;
            this.parseSaveGameIntoObject();
            // this.parseObjectIntoSaveGame();
        });
        fr.readAsText((<HTMLInputElement>event.target).files[0]);
    }


    private parseSaveGameIntoObject() {
        this.ommitedPart = this.textFile.substring(this.textFile.indexOf(',"CollectedNotes"'));
        this.textFile = this.textFile.substring(0, this.textFile.indexOf(',"CollectedNotes"')) + '}'; // We don't know how to process Addler's notes yet
        this.saveFile = JSON.parse(this.textFile);
        this.convertStructureIntoObject(this.saveFile);
    }

    private parseObjectIntoSaveGame() {
        this.convertObjectIntoStructure(this.saveFile);
        this.newFile = JSON.stringify(this.saveFile);
        this.newFile = this.newFile.substring(0, this.newFile.length - 1) + this.ommitedPart;
    }

    private convertStructureIntoObject(obj: Object) {
        for (const prop of Object.keys(obj)) {
            if (typeof obj[prop] === 'string' && (obj[prop].charAt(0) === '{' || obj[prop].charAt(0) === '[')) { // It is an object/array
                obj[prop] = JSON.parse(obj[prop]);
                this.convertStructureIntoObject(obj[prop]);
            }
        }
    }

    private convertObjectIntoStructure(obj: Object) {
        for (const prop of Object.keys(obj)) {
            // It is an object (objects made by numerical ID are no real objects for this task)
            if (this.checkIfObject(obj[prop]) || prop === 'GlobalVariables') {
                this.convertObjectIntoStructure(obj[prop]);
                obj[prop] = JSON.stringify(obj[prop]);
            }
        }
    }
    private checkIfObject(obj: unknown) {
        if (Utils.isJSObject(obj)) {
            const keys = Object.keys(obj);
            if (keys && keys.length > 0) {
                return !/^\d+$/g.test(keys[0]);
            }
        }
        return false;
    }

    getObjectKeys(obj: Object) {
        return Object.keys(obj);
    }
}
