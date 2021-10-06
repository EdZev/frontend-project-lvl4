import ModalChannel from './ModalChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';

const getModals = {
  adding: ModalChannel,
  renaming: ModalChannel,
  removing: ModalRemoveChannel,
};

export default (type) => getModals[type];
