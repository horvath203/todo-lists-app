//import React from 'react';

export interface List{
    id: number,
    name: string,
    nameEdit: boolean,
    items: Item[],
}

export interface Item{
    listId: number,
    title: string,
    titEdit: boolean,
    content: string,
    conEdit: boolean,
    //deadline: Date
    done: boolean,
}