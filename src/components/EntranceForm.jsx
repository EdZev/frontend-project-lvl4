import React from 'react';
import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  userName: yup.string().required('Назовите Ваше имя, пожалуйста!'),
  password: yup.string().required('Требуется пароль!'),
});

const EntranceForm = () => (
  <div>
    <h1>Вход</h1>
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        userName: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                onBlur={handleBlur}
                value={values.userName}
                onChange={handleChange}
                isValid={touched.userName && !errors.userName}
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">{errors.userName}</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Войти</Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default EntranceForm;
