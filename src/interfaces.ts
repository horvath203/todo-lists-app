//import React from 'react';

export interface List{
    id: number,
    name: string,
    nameEdit: boolean,
    items: Item[],
    deleted: boolean,
}

export interface Item{
    list: List,
    title: string,
    titEdit: boolean,
    content: string,
    conEdit: boolean,
    deadline: Date
    marked: boolean,
}