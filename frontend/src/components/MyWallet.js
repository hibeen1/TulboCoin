import { useEffect, useState } from 'react' 
import WalletTable from './WalletTable'

function MyWallet () {
  const [ wallet, setWallet ] = useState([])
  useEffect(() => {
    setWallet(JSON.parse(localStorage.getItem('wallet')))
  }, [])
  return <>
    <WalletTable wallet={wallet} />
  </>
}

export default MyWallet