import { useEffect, useState } from 'react' 
import WalletTable from './WalletTable'
import { useUpbitWebSocket } from "use-upbit-api";

function MyWallet () {
  const [ wallet, setWallet ] = useState([])
  const [ coinInWallet, setCoinInWallet ] = useState([])
  // const { isLoading, marketCodes } = useFetchMarketCode();
  // const [targetMarketCode, setTargetMarketCode] = useState([]);

  // useEffect(() => {
  //   // 변경시 호출
  //   if (!isLoading && marketCodes) {
  //     setTargetMarketCode(marketCodes.filter((ele) => ele.market.includes("KRW")));
  //     // console.log("여기입니다", marketCodes);
  //   }
  //   // 2번째 인자 [isLoading, marketCodes]  -> 상태변경을 감지할 애들
  // }, [isLoading, marketCodes]);

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