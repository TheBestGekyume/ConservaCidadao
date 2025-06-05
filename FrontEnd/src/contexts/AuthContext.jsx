import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [usuarioNome, setUsuarioNome] = useState(null);
  const [usuarioRole, setUsuarioRole] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('usuarioId');
    const nome = localStorage.getItem('usuarioNome');
    const role = localStorage.getItem('usuarioRole');

    if (id && nome && role) {
      setUsuarioId(id);
      setUsuarioNome(nome);
      setUsuarioRole(role);
    }

    setIsLoaded(true);
  }, []);

  const login = ({ id, nome, role }) => {
    setUsuarioId(id);
    setUsuarioNome(nome);
    setUsuarioRole(role);
    localStorage.setItem('usuarioId', id);
    localStorage.setItem('usuarioNome', nome);
    localStorage.setItem('usuarioRole', role);
  };

  const logout = () => {
    setUsuarioId(null);
    setUsuarioNome(null);
    setUsuarioRole(null);
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNome');
    localStorage.removeItem('usuarioRole');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ usuarioId, usuarioNome, usuarioRole, login, logout, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
