import _ from 'lodash';
import { Col } from 'react-bootstrap';
import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

const Messages = () => {
  const { channels, currentChannelId, messages } = useSelector((state) => state.chat);
  const indexCurrentChannel = _.findIndex(channels, ({ id }) => id === currentChannelId);
  const nameCurrentChannel = (indexCurrentChannel >= 0) ? channels[indexCurrentChannel].name : '';
  const channelMessages = _.filter(messages, ({ channelId }) => channelId === currentChannelId);
  const numberMessages = channelMessages.length;

  const buildMessage = ({ id, author, message }) => (
    <div key={id}>
      <b>{`${author}: `}</b>
      {message}
    </div>
  );
  const FormNewMessage = () => {
    const formik = useFormik({
      initialValues: {
        message: '',
      },
      onSubmit: () => {},
    });
    return (
      <form onSubmit={formik.handleSubmit}>
        <input
          id="message"
          name="message"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.message}
        />

        <button type="submit"><b>&#8594;</b></button>
      </form>
    );
  };

  return (
    <Col className="d-flex flex-column h-100 p-0">
      <div className="bg-light mx-0 mb-4 p-3 shadow-sm small">
        <p className="m-0"><b>{`#${nameCurrentChannel}`}</b></p>
        <span className="text-mutted">{`${numberMessages} messages`}</span>
      </div>
      <div className="chat-messages h-100 overflow-auto px-5" id="messages-box">
        {numberMessages > 0 && channelMessages.map((message) => buildMessage(message))}
      </div>
      <div className="mt-auto px-5 py-3">
        <FormNewMessage />
      </div>
    </Col>
  );
};

export default Messages;
