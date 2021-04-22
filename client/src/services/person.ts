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
  isBeingFired?: boolean;
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

export const firePerson = async (id: string): Promise<PersonInterface> => {
  try {
    const fired = await axios.delete<PersonInterface>(
      `${process.env.REACT_APP_API}/person/${id}`
    );
    return fired.data;
  } catch (e) {
    throw e;
  }
};

export default {
  getPersons,
  firePerson
};
