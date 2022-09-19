import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { List } from '../interfaces/interfaces';
import TdList from './TdList';
import { httpHelper } from "../db/httpHelper";
import { FilterAll as defaultFilter } from '../interfaces/FilterStrategies';


export default function App () {
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
        AddList({id: lists.length + 1, name: 'new list', nameEdit:false, items: [], filter: 0, searched: "" });
    }

    return (
      <>
        {/* CREATE LIST BUTTON */}
        <button className="Create-list" onClick={CreateNewList}>Create new list.</button>

        {/* LISTS FROM THE DB */}
        <div className="Lists">
            <h3>Existing Lists:</h3>
        
            {lists.map((list) => (
            TdList({
                list:       list,
                UpdateList: UpdateList,
                show:       activeItemForm,
                formHook:   formHook})
            ))}

        </div>
      </>
    );
}
