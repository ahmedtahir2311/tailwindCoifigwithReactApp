import React, { useEffect, useState } from "react";
import NamiWalletApi, { Cardano } from "./nami-js";
import blockfrostApiKey from "../config.js";
export default function App() {
  const [connected, setConnected] = useState();
  const [address, setAddress] = useState();
  const [nami, setNami] = useState({});
  const [nfts, setNfts] = useState([]);
  const [balance, setBalance] = useState();
  const [transaction, setTransaction] = useState();
  const [amount, setAmount] = useState("10");
  const [txHash, setTxHash] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const [witnesses, setWitnesses] = useState();
  useEffect(async () => {
    const S = await Cardano();
    let temp = new NamiWalletApi(S, window.cardano, blockfrostApiKey);
    setNami(temp);
  }, []);

  useEffect(async () => {
    if (nami) {
      if (await nami.isInstalled()) {
        await nami.isEnabled().then((result) => {
          console.log("hey -====", result);
          setConnected(result);
        });
      }
    }
  }, [nami]);

  const connect = async () => {
    await nami
      .enable()
      .then((result) => {
        console.log("hey2=====", result);
        setConnected(result);
      })
      .catch((e) => console.log(e));
    // console.log("hey 2=====", nami);
  };
  return (
    <div>
      <h1 class="text-3xl font-bold underline text-red-900">Hello world!</h1>
      <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          src="https://tailwindcss.com/img/erin-lindford.jpg"
          alt="Woman's Face"
        />
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">Erin Lindford</p>
            <p class="text-slate-500 font-medium">Product Engineer</p>
          </div>
          <button
            onClick={connect}
            class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
}
