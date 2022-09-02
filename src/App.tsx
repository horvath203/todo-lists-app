import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.sass';
import { List } from './interfaces';
import TdList from './tdlist';
import { httpHelper } from "./httpHelper"


export default function App() {

  const [lists, UpdateLists] = useState<List[]>([]);

  const activeItemForm = useState(-1);
  const formHook = useForm();

  const url = "http://localhost:5000/lists"
	const api = httpHelper()

  useEffect(() => {
    GetLists();
  }, [])

  const AddList = (list: List) => {
		api
			.post(`${url}`, { body: list })
			.then(res => GetLists())
			.catch(err => console.log(err))
	}

	const UpdateList = (list: List) => {
		api
			.put(`${url}/${list.id}`, { body: list })
			.then(res => GetLists())
			.catch(err => console.log(err))
	}

  const GetLists = () => {
    api.get(`${url}?_expand=items`)
      .then(res => {
				UpdateLists(res)
			})
      .catch(err => console.log(err))
  }

  const CreateNewList = () => {
    //console.log(lists)
    //UpdateLists([...lists, {id: lists.length, name: 'new list', nameEdit: false, items: []}]);
    AddList({id: lists.length, name: 'new list', nameEdit:false, items: []});
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">Title of the Page</h1>
      </header>

      

      <div className="Lists">
        
        {lists.map((list) => (
          TdList({
            list:       list,
            UpdateList: UpdateList,
            show:       activeItemForm,
            formHook:   formHook})
        ))}

        <button className="Create-list" onClick={CreateNewList}>Create new list.</button>
      </div>

    </div>
  );
}