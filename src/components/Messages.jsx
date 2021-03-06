import _ from 'lodash';
import {
  Col,
  Form,
  Row,
  Button,
} from 'react-bootstrap';
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import useServer from '../hooks/useServer.js';

const Messages = () => {
  const { t } = useTranslation();
  const { channels, currentChannelId, messages } = useSelector((state) => state.chat);
  const indexCurrentChannel = _.findIndex(channels, ({ id }) => id === currentChannelId);
  const nameCurrentChannel = (indexCurrentChannel >= 0) ? channels[indexCurrentChannel].name : '';
  const channelMessages = _.filter(messages, ({ channelId }) => channelId === currentChannelId);
  const numberMessages = channelMessages.length;
  const userId = JSON.parse(localStorage.getItem('userId'));

  const messagesField = useRef();
  useEffect(() => {
    messagesField.current.scrollTop = messagesField.current.scrollHeight;
  }, [messages]);

  const buildMessage = ({ id, username, message }) => (
    <div key={id}>
      <b>{username}</b>
      {': '}
      {message}
    </div>
  );
  const FormNewMessage = () => {
    const server = useServer();
    const inputText = useRef();
    useEffect(() => {
      inputText.current.focus();
    }, []);
    const formik = useFormik({
      initialValues: { message: '' },
      onSubmit: ({ message }, { resetForm, setSubmitting }) => {
        const newMessage = { channelId: currentChannelId, username: userId.username, message };
        server.newMessage(newMessage, ({ status }) => {
          if (status === 'ok') {
            resetForm();
            setSubmitting(false);
          }
        });
      },
    });
    return (
      <Form onSubmit={formik.handleSubmit} className="form-label">
        <Row className="align-items-center">
          <Col className="p-0">
            <Form.Control
              data-testid="new-message"
              placeholder={t('messages.placeholderMessages')}
              type="text"
              name="message"
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              onBlur={formik.handleBlur}
              value={formik.values.message}
              ref={inputText}
            />
          </Col>
          <Col xs="auto">
            <Button
              role="button"
              variant="outline-dark"
              name={t('messages.send')}
              type="submit"
              disabled={formik.values.message === '' || formik.isSubmitting}
            >
              {t('messages.send')}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  };

  return (
    <Col className="d-flex flex-column h-100 p-0">
      <div className="bg-light mx-0 mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`#${nameCurrentChannel}`}</b></p>
        <span className="text-mutted">{`${numberMessages} messages`}</span>
      </div>
      <div className="chat-messages h-100 overflow-auto text-break px-5" id="messages-box" ref={messagesField}>
        {numberMessages > 0 && channelMessages.map((message) => buildMessage(message))}
      </div>
      <div className="mt-auto px-5 py-3">
        <FormNewMessage />
      </div>
    </Col>
  );
};

export default Messages;
