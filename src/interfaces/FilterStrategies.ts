import { Filter } from "./interfaces";

export const FilterAll: Filter = {
    Filter : (itemDone: boolean) => {
        return true;
    }
}

export const FilterActive: Filter = {
    Filter : (itemDone: boolean) => {
        if(itemDone) return false;
        return true;
    }
}

export const FilterFinished: Filter = {
    Filter : (itemDone: boolean) => {
        if(itemDone) return true;
        return false;
    }
}