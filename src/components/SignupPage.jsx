import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'errors.nameLength')
    .max(20, 'errors.nameLength')
    .required(),
  password: yup
    .string()
    .min(6, 'errors.passLength')
    .required(),
  confirmPass: yup
    .string()
    .oneOf([yup.ref('password')], 'errors.passMatch'),
});

const LoginPage = () => {
  const { t } = useTranslation();
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
            const [errMessage] = e.errors;
            return t(errMessage);
          }
          if (e.request.status === 409) {
            return t('errors.userExist');
          }
          return t('errors.defaultError');
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
            <Form.Label htmlFor="username">{t('authForm.name')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('authForm.placeholderName')}
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
            <Form.Label htmlFor="password">{t('authForm.pass')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('authForm.placeholderPass')}
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={authFailed.status}
              required
            />
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label htmlFor="confirmPass">{t('authForm.confirmPass')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('authForm.placeholderConfirmPass')}
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
            {t('authForm.signup')}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <a href="/login">{t('authForm.login')}</a>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default LoginPage;