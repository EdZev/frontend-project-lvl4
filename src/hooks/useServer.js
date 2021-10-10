import { useContext } from 'react';

import serverContext from '../contexts/serverContext.js';

const useServer = () => useContext(serverContext);

export default useServer;
