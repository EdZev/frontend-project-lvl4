import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const schema = yup.object().shape({
  username: yup.string().min(3).max(20).required(),
  password: yup.string().min(6).required(),
  confirmPass: yup.string().oneOf([yup.ref('password')], 'passwords must match'),
});

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState({ status: false, errors: '' });
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
      confirmPass: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        await schema.validate(values);
        setAuthFailed({ status: false, errors: '' });
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        history.replace({ pathname: routes.rootPath() });
      } catch (e) {
        const errorMessage = () => {
          if (e.errors) {
            return e.errors.join(', ');
          }
          if (e.request.status === 401) {
            return 'Username or password is invalid';
          }
          if (e.request.status === 409) {
            return 'This nickname is already taken';
          }
          return 'Something went wrong, please try again later :(';
        };
        setAuthFailed({ status: true, errors: errorMessage() });
      }
    },
  });

  return (
    <Modal.Dialog>

      <Modal.Body>
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
              isInvalid={authFailed.status}
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
              isInvalid={authFailed.status}
              required
            />
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label htmlFor="confirmPass">Password again</Form.Label>
            <Form.Control
              type="password"
              placeholder="password again"
              name="confirmPass"
              id="confirmPass"
              value={formik.values.passConfirm}
              onChange={formik.handleChange}
              isInvalid={authFailed.status}
              required
            />
            <Form.Control.Feedback type="invalid">
              {authFailed.errors}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <a href="/login">Войти</a>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default LoginPage;
