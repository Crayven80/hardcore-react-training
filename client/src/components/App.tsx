import { FunctionComponent, useEffect, useState } from "react";
import { getPersons, PersonInterface } from "../services/person";
import PersonList from "./PersonList";

const App: FunctionComponent = () => {

  const [persons, setPersons] = useState<PersonInterface[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Joka ikinen kerta!");
  });

  useEffect(() => {
    console.log("Joka kerta kun persons muuttuu!");
  }, [persons]);

  useEffect(() => {
    console.log("Vain kerran, kun komponentti on rendattu ekan kerran!");

    getPersons().then(setPersons);

  }, []);

  useEffect(() => {
    const tussi = setInterval( () => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => {
      clearInterval(tussi);
    }
  }, []);

  return (
    <main>
      <h1>Mega ERP</h1>

      <p>Renderiä rendattu {counter} kertaa.</p>

      <PersonList persons={persons} />
    </main>
  );
};

export default App;
