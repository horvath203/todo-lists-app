import * as React from 'react';
import { Item, List } from './interfaces';
import DatePicker from 'react-date-picker'

export interface ItemProps{
  item: Item,
  list: List,
  Dispatch: () => void,
}

export default function TdItem (props: ItemProps) {

  const item = props.item;

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

  // const DateChange = (deadline: Date) => {
  //   item.deadline = deadline;
  //   props.Dispatch();
  // }

  // const IsLate = () => {
  //   if(item.deadline.getTime() < Date.now()) return true;
  //   return false;
  // }

  const RemoveItem = () => {
    const arr = props.list.items;
    const index = arr.indexOf(item);
    arr.splice(index, 1);
    props.Dispatch();
  }

  return (
    // <article className={ `tditem ${item.done ? "done" : ""} ${(!item.done && IsLate()) ? "late" : ""}` }>
    <article className={ `tditem ${item.done ? "done" : ""}` }>

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

      <hr />

      <input type="checkbox" checked={item.done} onChange={MarkDone} />

      {/* <DatePicker onChange={DateChange} value={item.deadline} /> */}

      <button className="removebtn" onClick={RemoveItem}>Remove Item</button>

    </article>
  );
}
