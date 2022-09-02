import React from 'react';
import DatePicker from 'react-date-picker';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { List } from './interfaces';
import TdItem from './tditem'

interface ListProps{
  list: List,
  UpdateList: (list: List) => void,
  //UpdateLists: React.Dispatch<React.SetStateAction<List[]>>,
  show: [number, React.Dispatch<React.SetStateAction<number>>],
  formHook: UseFormReturn<FieldValues, any>,
}

export default function TdList (props: ListProps) {

  let deadline = new Date();

  const list = props.list;
  const [showId, SetShow] = props.show;
  const { register, handleSubmit } = props.formHook;
  
  // const UpdateList = () => {
    
  //   props.UpdateLists((prevLists) => {
  //     return[
  //     ...prevLists.slice(0, list.id),
  //     list,
  //     ...prevLists.slice(list.id + 1),
  //     ]
  //   });
  // }

  const SetNameEdit = (val: boolean) => {
    list.nameEdit = val;
    if(list.name === '') list.name = "to-do list n." + list.id;
    props.UpdateList(list);
    //console.log(list)
  }

  const EditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    list.name = e.target.value;
    props.UpdateList(list);
  }

  const DateChange = (newdate: Date) => {
    deadline = newdate;
    props.UpdateList(list)
    console.log(deadline);
  }



  const CreateItem = (e: FieldValues) => {
    
    list.items = [...list.items, {
      listId: list.id, 
      title: e.itemName,
      titEdit: false,
      content: e.itemDesc,
      conEdit: false,
      //deadline: new Date(), 
      done: false
    }];
    props.UpdateList(list)
  }

  const ShowForm = () => {
    SetShow(list.id)
    //null form entries
  }

  //const onSubmit: SubmitHandler<FormValues> = data => console.log(data);

  return (
    <section className="tdlist" key={list.id}>

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


      <div className="items">

        {list.items.map((item) => (
          TdItem({
            list:       list,
            item:       item,
            Dispatch: () => {
              props.UpdateList(list);
              console.log(list);
            }})
          )
        )}

      </div>



        {
          (showId === list.id) ? (
            <form onSubmit={handleSubmit(CreateItem)} className="itemForm">
              <input type={"text"} placeholder={'name of the task'} {...register("itemName", {required: true})}/>

              <br/>

              <textarea placeholder='description of the task' {...register("itemDesc", {})}/>

              <br/>

              {/* < DatePicker onChange={DateChange} value={deadline} /> */}

              <button type='submit'>Create Item</button>
            </form>
          ) : (
            <button onClick={ShowForm}>Open form</button>
        )}


    </section>
  );
}
