import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import { googleAuthService } from '../services/googleService';
import { COLLECTION_USER } from '../constants';
import { getStorageItem, setStorageItem } from '../utils/storage';

type UserType = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
};

type AuthContextProps = {
  isAuthenticated: boolean;
  user: UserType;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

type AuthProvider = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProvider) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType>({} as UserType);
  const [loading, setLoading] = useState(false);

  async function signInWithGoogle() {
    try {
      setLoading(true);

      const { cancelled, user } = await googleAuthService();

      if (!cancelled && user) {
        await setStorageItem({
          key: COLLECTION_USER,
          value: user,
        });

        setUser(user);
        setIsAuthenticated(true);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getSession() {
      const response = await getStorageItem(COLLECTION_USER);

      if (response) {
        setUser(JSON.parse(response));
        setIsAuthenticated(true);
      }
    }

    getSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
