import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';

const getModals = {
  adding: ModalAddChannel,
  renaming: ModalRenameChannel,
  removing: ModalRemoveChannel,
};

export default (type) => getModals[type];
