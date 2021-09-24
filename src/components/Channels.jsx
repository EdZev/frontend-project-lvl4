import {
  Button,
  Col,
  ListGroup,
  SplitButton,
  Dropdown,
} from 'react-bootstrap';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { setCurrentChannelId } from '../redux/index.js';

const buildChannels = (channels, currentChannelId) => {
  const dispatch = useDispatch();
  const changeCurrentChannel = (id) => () => {
    if (id !== currentChannelId) {
      dispatch(setCurrentChannelId(id));
    }
  };

  const getChannel = ({ id, name, removable }) => {
    const channelActive = id === currentChannelId;
    const buttonStyle = channelActive ? 'dark' : 'light';
    const channelClassNames = cn('border-0', {
      'bg-dark': channelActive,
      'bg-light': channelActive,
    });
    return (
      <ListGroup.Item key={id} className={channelClassNames}>
        {!removable && (
          <Button
            variant={buttonStyle}
            onClick={changeCurrentChannel(id)}
          >
            {`#${name}`}
          </Button>
        )}
        {removable && (
        <SplitButton
          key="down"
          drop="down"
          variant={buttonStyle}
          title={`#${name}`}
          onClick={changeCurrentChannel(id)}
        >
          <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
        </SplitButton>
        )}
      </ListGroup.Item>
    );
  };
  return (
    <ListGroup className="bg-light">
      {channels.map((channel) => getChannel(channel))}
    </ListGroup>
  );
};

const Channels = () => {
  const { channels, currentChannelId } = useSelector((state) => state.chat);
  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
        <span className="fs-3">Каналы</span>
        <Button className="border" variant="light">+</Button>
      </div>
      {buildChannels(channels, currentChannelId)}
    </Col>
  );
};

export default Channels;
