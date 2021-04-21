import { FC } from "react";
import { PersonInterface } from "../services/person";
import styles from "./App.module.pcss";
import cx from "clsx";

type Props = {
  person: PersonInterface;
};

const Person: FC<Props> = ({ person }) => {

  const classes = cx(
    styles.person, {
      [styles.good]: person.age < 30,
      [styles.bad]: person.age >= 30
    }
  );

  return (
    <div className={classes}>
      <strong>{person.lastName}</strong>, {person.firstName}
    </div>
  );
};

export default Person;
