import { useContext } from 'react';
import { AuthContext } from './App';

const setSetter = (setter) => (e) => {
  setter(e.target.value);
};

const useAuthContext = () => useContext(AuthContext);

export { setSetter, useAuthContext };
