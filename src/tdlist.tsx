import React from 'react';
import { List } from './interfaces';
import TdItem from './tditem'

interface ListProps{
  list: List,
  lists: List[],
  UpdateLists: React.Dispatch<React.SetStateAction<List[]>>,
  show: [number, React.Dispatch<React.SetStateAction<number>>],
}

//NOTE: the list stored as a prop is a refference, it shouldnt be adjusted directly
//only prop needed is the id of given list, and changed should be done via the dispatch function
export default function TdList (props: ListProps) {

  const list = props.list;
  const [showId, SetShow] = props.show;
  //update lists (from useState in app.tsx) where we replace current list with its updated version
  const UpdateList = () => {
    
    props.UpdateLists((prevLists) => {
      return[
      ...prevLists.slice(0, list.id),
      list,
      ...prevLists.slice(list.id + 1),
      ]
    });
  }

  const SetNameEdit = (val: boolean) => {
    list.nameEdit = val;
    UpdateList();
    //console.log(list)
  }

  const EditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    list.name = e.target.value;
    UpdateList();
  }



  const CreateItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(list);
    const target = e.target as typeof e.target & {
      name: {value: string}
    }
    list.items = [...list.items, {
      list: list, 
      title: target.name.value, 
      titEdit: false,
      content: 'content', 
      conEdit: false,
      deadline: new Date(), 
      marked: false
    }];
    UpdateList();
  }

  const ShowForm = () => {
    SetShow(list.id)
    //null form entries
  }

  return (
    <section className="tdlist">
        {/* invoke tdItem appropriate amount of times */}

        {
          list.nameEdit ? (
          <form>
            <input type="text" value={list.name} onChange={EditName} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === 'Escape') {
                SetNameEdit(false)
                event.preventDefault()
                event.stopPropagation()}
            }}/>
          </form>
          ) : ( 
          <h3 onDoubleClick={() => SetNameEdit(true)}>{list.name}</h3>
        )}

        {list.items.map((item) => (
          TdItem(item, UpdateList)
        ))}

        {
          (showId === list.id) ? (
            <form onSubmit={CreateItem} className="itemForm">
              <input type={"text"} name={"name"} placeholder={'name of the task'} />

              {/*deadline?*/}

              <button type='submit'>Create Item</button>
            </form>
          ) : (
            <button onClick={ShowForm}>Create Item</button>
        )}


    </section>
  );
}
