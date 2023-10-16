import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Web3, { Web3BaseProvider } from "web3";

interface AccountProvider {
  account?: string;
  connect: () => void;
}

const AccountContext = createContext<AccountProvider>({
  connect: async () => {},
});
const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState();
  //   const [provider, setProvider] = useState<Web3BaseProvider>();
  const connect = useCallback(async () => {
    if (!account) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        //   setProvider(new Web3.providers.HttpProvider(window.ethereum));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  const values = useMemo(() => ({ account, connect }), [account, connect]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any) => {
        // Handle changes in accounts
        setAccount(accounts[0]);
      });

      //   window.ethereum.on("chainChanged", (chainId: any) => {
      //     // Handle changes in the network (chain)
      //     setChainId(chainId);
      //   });
      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      };
    }
  }, []);
  return (
    <AccountContext.Provider value={values}>{children}</AccountContext.Provider>
  );
};

export default AccountProvider;
export const useAccount = () => useContext(AccountContext);
