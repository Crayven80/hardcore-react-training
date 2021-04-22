import axios from "axios";

export interface PersonInterface {
  id: string;
  firstName: string;
  lastName: string;
  birthDay?: Date;
  age: number;
  gender?: number;
  email?: string;
  salary?: number;
  relatedToCEO?: boolean;
}

export const getPersons = async (): Promise<PersonInterface[]> => {
  try {
    const persons = await axios.get<PersonInterface[]>(
      `${process.env.REACT_APP_API}/person`
    );
    return persons.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
