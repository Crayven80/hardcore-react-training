import { FC } from "react";
import { PersonInterface } from "../services/person";
import Person from "./Person";

type Props = {
  persons: PersonInterface[];
};

const PersonList: FC<Props> = ({persons}) => {
  return (
    <div>
      {persons.map((person) => {
        return <Person key={person.id} person={person} />;
      })}
    </div>
  );
}

export default PersonList;
