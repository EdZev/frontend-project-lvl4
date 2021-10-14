import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const { t } = useTranslation();
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

    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        setSubmitting(false);
        history.replace({ pathname: routes.rootPath() });
      } catch (e) {
        setSubmitting(false);
        const errorMessage = () => {
          if (e.request.status === 401) {
            return t('errors.userNoExist');
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
            <Form.Label htmlFor="username">{t('authForm.loginName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('authForm.placeholderName')}
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              id="username"
              autoComplete="username"
              disabled={formik.isSubmitting}
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
              {t(formik.errors.password) || authFailed}
            </Form.Control.Feedback>
          </Form.Group>
          <Button className="m-3" variant="primary" type="submit" disabled={formik.isSubmitting}>
            {t('authForm.login')}
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Link to="/signup">{t('authForm.linkSignup')}</Link>
      </Modal.Footer>
    </Modal.Dialog>
  );
};

export default LoginPage;
