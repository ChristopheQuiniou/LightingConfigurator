import { makeAutoObservable } from "mobx";

export class DimensionsModel {

    length = 0;
    width = 0;
    height = 0;

    constructor(l : number,w : number,h : number){
        makeAutoObservable(this);
        this.length = l;
        this.width = w;
        this.height = h;
    }

}