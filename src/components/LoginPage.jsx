import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

const schema = yup.object().shape({
  username: yup.string().min(5).required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();
  const auth = useAuth();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await schema.validate(values);
        setAuthFailed(false);
        const { data } = await axios.post('/api/v1/login', values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        history.replace({ pathname: '/' });
      } catch (err) {
        setAuthFailed(true);
      }
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="m-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            id="username"
            autoComplete="username"
            isInvalid={authFailed}
            required
            ref={inputRef}
          />
        </Form.Group>

        <Form.Group className="m-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={authFailed}
            required
          />
          <Form.Control.Feedback type="invalid">
            the username or password is incorrect
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="m-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
