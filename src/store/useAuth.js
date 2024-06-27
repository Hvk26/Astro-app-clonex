import {create} from 'zustand';

const useAuth = create(set => {
  return {
    user: null,
    setUser: user => set({user}),
  };
});

export default useAuth;
