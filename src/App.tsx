import './styles/App.sass';
import AppLists from "./components/AppLists";


export default function App() {
  return (
    <>
      <header>
        <h1><strong>To-Do App</strong></h1>
      </header>

      <main>
        <AppLists />
      </main>

    </>
  );
}