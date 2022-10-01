import { useEffect, useState } from 'react' 
import WalletTable from './WalletTable'
import { useUpbitWebSocket } from "use-upbit-api";

function MyWallet () {
  const [ wallet, setWallet ] = useState([])
  const [ coinInWallet, setCoinInWallet ] = useState([])

  useEffect(() => {
    setWallet(JSON.parse(localStorage.getItem('wallet')))
  }, [])

  useEffect(() => {
    const tmp = wallet.map(ele => ({market: ele.coinCode}))
    setCoinInWallet(tmp)
  }, [wallet])

  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socketData } = useUpbitWebSocket(coinInWallet, "ticker", webSocketOptions);
  return <>
    {socketData && <WalletTable wallet={wallet} socketData={socketData} />}
  </>
}

export default MyWallet