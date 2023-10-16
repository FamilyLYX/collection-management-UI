import React from "react";
import logo from "../../assets/logo.svg";
import lukso from "../../assets/LUKSO_icon.svg";
import { Link } from "react-router-dom";
import { useAccount } from "../../contexts/AccountProvider";

const Navbar = () => {
  const { account, connect } = useAccount();

  return (
    <div className="flex font-ibm justify-between items-center">
      <div>Forge</div>
      <img src={logo} />
      <div className="flex gap-5 items-center">
        <Link to={"/"}>Collections</Link>
        <button
          onClick={connect}
          className="flex items-center gap-2 border-[1px] border-solid px-3 py-2 rounded-full border-black/30"
        >
          <img src={lukso} />
          {account ? (
            <span>
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
