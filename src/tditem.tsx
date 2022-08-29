import * as React from 'react';
import { Item } from './interfaces';
import DatePicker from 'react-date-picker'

export interface ItemProps{
  item: Item,
  Dispatch: () => void
}

export default function TdItem (item: Item, Dispatch: () => void) {

  const TitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    item.title = e.target.value;
    Dispatch();
  }
  const EditTitle = () => {
    item.titEdit = !item.titEdit;
    Dispatch();
  }

  const DescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    item.content = e.target.value;
    Dispatch();
  }
  const EditDesc = () => {
    item.conEdit = !item.conEdit;
    Dispatch();
  }

  const MarkDone = () => {
    item.marked = !item.marked;
    Dispatch();
  }

  const DateChange = (deadline: Date) => {
    item.deadline = deadline;
    Dispatch();
  }

  const IsLate = () => {
    if(item.deadline.getTime() < Date.now()) return true;
    return false;
  }

  const RemoveItem = () => {
    const arr = item.list.items;
    const index = arr.indexOf(item);
    arr.splice(index, 1);
    Dispatch();
  }

  return (
    <article className={ `tditem ${item.marked ? "done" : ""} ${(!item.marked && IsLate()) ? "late" : ""}` }>

      {
        item.titEdit ? (
          <form>
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


      {
        item.conEdit ? (
          <form>
            <input type="text" value={item.content} onChange={DescChange} onKeyDown={(event) => {
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

      <hr />

      <input type="checkbox" checked={item.marked} onChange={MarkDone} />

      <DatePicker onChange={DateChange} value={item.deadline} />

      <button className="removebtn" onClick={RemoveItem}>Remove Item</button>

    </article>
  );
}
