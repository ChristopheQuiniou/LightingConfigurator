import { makeAutoObservable } from "mobx";

export class StepModel {

    id = 0;
    label = "";

    constructor({id, label} : {id: number, label: string}) {
        makeAutoObservable(this);
        this.id = id;
        this.label = label;
    }

}