import * as React from 'react';
import { Item, List } from '../interfaces/interfaces';
import DatePicker from 'react-date-picker'

export interface ItemProps{
  item: Item,
  list: List,
  Dispatch: () => void,
  index: number,
}

export default function TdItem (props: ItemProps) {
    const item = props.item;
    const deadline = new Date(item.deadline);

    const TitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        item.title = e.target.value;
        props.Dispatch();
    }
    const EditTitle = () => {
        item.titEdit = !item.titEdit;
        props.Dispatch();
    }

    const DescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        item.content = e.target.value;
        props.Dispatch();
    }
    const EditDesc = () => {
        item.conEdit = !item.conEdit;
        props.Dispatch();
    }

    const MarkDone = () => {
        item.done = !item.done;
        props.Dispatch();
    }

    const DateChange = (dl: Date) => {
        item.deadline = dl;
        props.Dispatch();
    }
    const IsLate = () => {
        if(deadline.getTime() < Date.now()) return true;
        return false;
    }

    const RemoveItem = () => {
        const arr = props.list.items;
        const index = arr.indexOf(item);
        arr.splice(index, 1);
        props.Dispatch();
    }

    return (
    <article className={ `tditem ${item.done ? "done" : ""} ${(!item.done && IsLate()) ? "late" : ""}` } key={props.index}>

        {/* TITLE OF THE TASK */}
        {
            item.titEdit ? (
            <form className="tditemtitle">
                <input type="text" value={item.title} onChange={TitleChanged} onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Escape') {
                    EditTitle();
                    event.preventDefault()
                    event.stopPropagation()}
                }}/>
            </form>
            ) : (
            <h4 className="tditemtitle" onDoubleClick={EditTitle}>{item.title}</h4>
            )
        }


        {/* DESCRIPTION/CONTENT OF THE TASK */}
        {
            item.conEdit ? (
            <form className="tditembody">
                <textarea value={item.content} onChange={DescChange} onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === 'Escape') {
                    EditDesc();
                    event.preventDefault()
                    event.stopPropagation()}
                }}/>
            </form>
            ) : (
            <p className="tditembody" onDoubleClick={EditDesc}>{item.content}</p>
            )
        }

        {/* CHECKMARK THE TASK AS DONE */}
        <input className='checkmark' type="checkbox" checked={item.done} onChange={MarkDone} />

        {/* DEADLINE OF THE TASK, WITH DATE-PICKER */}
        <DatePicker className="deadline" onChange={DateChange} value={deadline} />

        {/* BUTTON TO REMOVE THIS TASK */}
        <button className="rmv-btn" onClick={RemoveItem}>Remove Item</button>

    </article>
  );
}
