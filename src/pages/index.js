import { TextField } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

const Index = () => {
  const [mydata, setData] = useState("");

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "lightblue",
        maxWidth: "100",
      }}
    >
      <div>
        <h1>Formik Form with faunaDb and Serverless Functions</h1>
      </div>
      <hr />
      <Formik
        initialValues={{ name: "", age: 0 }}
        onSubmit={async (values) => {
          console.log(values);
          //main kaam yh horha hai post ka
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
              <br />
              <br />
              <ErrorMessage
                name='name'
                render={(msg) => <span style={{ color: red }}>{msg}</span>}
              />
            </div>
            <br />
            <div>
              <Field
                type='number'
                as={TextField}
                variant='filled'
                label='Age::'
                name='age'
                id='age'
              />
              <br />
              <br />
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
      <div>FaunaDb Id for the above field is : {mydata.id}.</div>
    </div>
  );
};

export default Index;
