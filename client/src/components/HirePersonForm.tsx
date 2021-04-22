import { FC } from "react";
import { PersonInterface } from "../services/person";
import { v4 } from "uuid";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {
  hirePerson: (person: PersonInterface) => void;
};

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  age: Yup.number()
    .min(18, "Must be adult!")
    .max(100, "Too Old!")
    .required("Required")
});

const HirePersonForm: FC<Props> = ({ hirePerson }) => {
  return (
    <div>
      <Formik
        validateOnMount
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          age: 0
        }}
        onSubmit={(values, { resetForm }) => {
          const hired: PersonInterface = {
            ...values,
            id: v4()
          };
          hirePerson(hired);
          resetForm();
          console.log(values, "VALUES");
        }}
      >
        {({ isValid }) => {
          return (
            <Form>
              <div>
                <label>etunimi</label>
                <Field name="firstName" />
                <ErrorMessage name="firstName" />
              </div>
              <div>
                <label>sukunimi</label>
                <Field name="lastName" />
                <ErrorMessage name="lastName" />
              </div>
              <div>
                <label>ikä</label>
                <Field name="age" />
                <ErrorMessage name="age" />
              </div>

              <div>
                <button disabled={!isValid} type="submit">
                  PALKKAA!
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default HirePersonForm;
