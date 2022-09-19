import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Item, List } from '../interfaces/interfaces';
import TdItem from './TdItem'
import { FilterAll, FilterActive, FilterFinished } from '../interfaces/FilterStrategies'

interface ListProps{
  list: List,
  UpdateList: (list: List) => void,
  show: [number, React.Dispatch<React.SetStateAction<number>>],
  formHook: UseFormReturn<FieldValues, any>,
}

export default function TdList (props: ListProps) {

  const filters = [FilterAll, FilterActive, FilterFinished];

  const list = props.list;
  const [showId, SetShow] = props.show;
  const { register, handleSubmit } = props.formHook;


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


  const CreateItem = (e: FieldValues) => {
    
    list.items = [...list.items, {
      listId: list.id, 
      title: e.itemName,
      titEdit: false,
      content: e.itemDesc,
      conEdit: false,
      deadline: new Date(),
      done: false
    }];
    console.log("new date", new Date());
    props.UpdateList(list);
  }

  const ShowForm = () => {
    if(showId === list.id){
      SetShow(-1);
      console.log("equals", showId)
    }
    SetShow(list.id);
    //null form entries
  }

  const SetFilter = (val: number) => {
    list.filter = val;
    props.UpdateList(list);
  }

  const UpdateSearched = (e: React.ChangeEvent<HTMLInputElement>) => {
    list.searched = e.target.value;
    props.UpdateList(list);
  }

  const ContainsSearched = (itemName: string) => {
    if(list.searched.length === 0 || 
      itemName.includes(list.searched)) return true
    return false
  }

  const RenderItem = (item: Item, index: number) => {
    if( filters[list.filter].Filter(item.done) &&
        ContainsSearched(item.title) )
    return (
      TdItem({
        list:       list,
        item:       item,
        Dispatch:   () => {
          props.UpdateList(list);
        },
        index:      index
      })
      )
  }

  

  return (
    <>
    <hr />

    <section className="tdlist" key={list.id}>

        <div className="list-head">

          {/* TITLE OF THE LIST */}
          {
            list.nameEdit ? (
            <form>
              <input type="text" value={list.name} onChange={EditName} onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === 'Escape') {
                      SetNameEdit(false)
                      event.preventDefault()
                      event.stopPropagation()
                  }
              }}/>
            </form>
            ) : ( 
            <h3 onDoubleClick={() => SetNameEdit(true)}>{list.name}</h3>
          )}

          {/* LIST FILTER */}
          <form className='filter'>
            <p>Show:</p>
            <label>
              <input type="radio" name='filter' value="0"
              onChange={(e) => {
                SetFilter(Number(e.target.value));
              }}
              defaultChecked />
              All
            </label>
            <label>
              <input type="radio" name='filter' value="1"
              onChange={(e) => {
                SetFilter(Number(e.target.value));
              }} />
              Active
            </label>
            <label>
              <input type="radio" name='filter' value="2"
              onChange={(e) => {
                SetFilter(Number(e.target.value));
              }} />
              Finished
            </label>
          </form>

          {/* LIST SEARCH */}
          <form>
              <label>
                  Search: 
                  <input type="text" value={list.searched} onChange={UpdateSearched} />
              </label>
          </form>
        </div> 

        {/* THIS LISTS ITEMS */}
        <div className="items">


          {list.items.map((item, index) => (
            RenderItem(item, index)
            )
          )}

        </div>


        {/* CREATE NEW TASK IN THIS LIST */}
        {
          (showId === list.id) ? (
            <>
              <form onSubmit={handleSubmit(CreateItem)} className="itemForm">
                <input type={"text"} placeholder={'name of the task'} {...register("itemName", {required: true})}/>

                <br/>

                <textarea placeholder='description of the task' {...register("itemDesc", {})}/>

                <button type='submit'>Confirm new Task</button>
              </form>
              <button onClick={ShowForm}>Cancel</button>
            </>
          ) : (
            <button className='cre-btn' onClick={ShowForm}>Create Task</button>
        )}


    </section>
    </>
  );
}
