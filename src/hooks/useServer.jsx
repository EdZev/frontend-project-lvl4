import { useContext } from 'react';

import serverContext from '../contexts/serverContext.jsx';

const useServer = () => useContext(serverContext);

export default useServer;
