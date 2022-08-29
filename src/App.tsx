import React, { useState } from 'react';
import './App.sass';
import { List } from './interfaces';
import TdList from './tdlist';


function App() {

  const [lists, UpdateLists] = useState<List[]>([]);

  const show = useState(-1);

  const CreateNewList = () => {
    //console.log(lists)
    UpdateLists([...lists, {id: lists.length, name: 'new list', nameEdit: false, items: [], deleted: false}]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">Title of the Page</h1>
      </header>

      <div className="Lists">
        
        {lists.map((list) => (
          TdList({list, lists, UpdateLists, show})
        ))}

        <button className="Create-list" onClick={CreateNewList}>Create new list.</button>
      </div>

    </div>
  );
}

export default App;
