import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
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
  const [authFailed, setAuthFailed] = useState(null);
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
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      const { username, password } = values;
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        setSubmitting(false);
        history.replace({ pathname: routes.rootPath() });
      } catch (e) {
        setSubmitting(false);
        const errorMessage = () => {
          if (e.request.status === 409) {
            return t('errors.userExist');
          }
          return t('errors.defaultError');
        };
        setAuthFailed(errorMessage());
      }
    },
  });

  return (
    <Modal.Dialog>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="m-3">
            <Form.Label htmlFor="username">{t('authForm.signupName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('authForm.placeholderName')}
              name="username"
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.username}
              id="username"
              autoComplete="username"
              isInvalid={(formik.errors.username && formik.touched.username) || authFailed}
              required
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.username)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="m-3">
            <Form.Label htmlFor="password">{t('authForm.pass')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('authForm.placeholderPass')}
              name="password"
              id="password"
              disabled={formik.isSubmitting}
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={(formik.errors.password && formik.touched.password) || authFailed}
              required
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.password)}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="m-3">
            <Form.Label htmlFor="confirmPass">{t('authForm.confirmPass')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('authForm.placeholderConfirmPass')}
              name="confirmPass"
              id="confirmPass"
              disabled={formik.isSubmitting}
              value={formik.values.confirmPass}
              onChange={formik.handleChange}
              isInvalid={(formik.errors.confirmPass && formik.touched.confirmPass) || authFailed}
              required
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.confirmPass) || authFailed}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit" disabled={formik.isSubmitting}>
            {t('authForm.signup')}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/login">{t('authForm.linkLogin')}</Link>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default LoginPage;
