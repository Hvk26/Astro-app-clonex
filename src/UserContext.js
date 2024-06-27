import React, {createContext, useState} from 'react';

const UserType = createContext();

const UserContext = ({children}) => {
  const [userId, setUserId] = useState();
  const [walletBalance, setWalletBalance] = useState(0);

  const addToWallet = amount => {
    console.log('balance i get', amount);
    setWalletBalance(prevBalance => prevBalance + amount);
  };

  const deductFromWallet = amount => {
    if (walletBalance >= amount) {
      setWalletBalance(prevBalance => prevBalance - amount);
      return true;
    }
    return false;
  };

  return (
    <UserType.Provider
      value={{
        userId,
        setUserId,
        walletBalance,
        addToWallet,
        deductFromWallet,
        setWalletBalance,
      }}>
      {children}
    </UserType.Provider>
  );
};

export {UserContext, UserType};
