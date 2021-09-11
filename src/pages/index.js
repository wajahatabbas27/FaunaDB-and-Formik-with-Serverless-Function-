import { TextField } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

const Index = () => {
  const [mydata, setData] = useState("");

  return (
    <div>
      <div>Formik Form with faunaDb and Serverless Functions</div>
      <hr />
      <Formik
        initialValues={{ name: "", age: 0 }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await fetch(`/.netlify/functions/formikpost`, {
            method: "post",
            body: JSON.stringify(values),
          });
          const result = await response.json();
          setData(result);
          console.log("Data: " + JSON.stringify(result));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <Field
                type='text'
                as={TextField}
                variant='outlined'
                label='Name::'
                name='name'
                id='name'
              />
              <ErrorMessage
                name='name'
                render={(msg) => <span style={{ color: red }}>{msg}</span>}
              />
            </div>
            <div>
              <Field
                type='number'
                as={TextField}
                variant='filled'
                label='Age::'
                name='age'
                id='age'
              />
              <ErrorMessage
                name='age'
                //render={(msg) => <span style={{ color: red }}>{msg}</span>}
              />
            </div>
            <div>
              <button type='submit'>ADD DATA TO FAUNA-DB</button>
            </div>
          </Form>
        )}
      </Formik>
      <br /> <hr />
      <br />
      <div>{mydata.id}</div>
    </div>
  );
};

export default Index;
