import { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { sellAsync, buyAsync } from "../store/coinSaga";
import { fetchUserAsync, fetchWalletAsync } from "../store/accountSaga";
import styled from "styled-components"

const StyledModal = styled.div`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: gray; */
  border: 1px solid black;
  border-radius: 8px;
`
const StyledModalDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

`

const CoinDeal = memo(function CoinDeal({ socketData, detailCoinData, modalClose, deal }) {

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);
  const user = JSON.parse(useSelector(state => state.account.user))
  const wallet = JSON.parse(useSelector(state => state.account.wallet))

  let targetSocketData = [];
  for (let i = 0; i < socketData.length; i += 1) {
    if (socketData[i].code === detailCoinData.code) {
      targetSocketData = socketData[i];
      break;
    }
  }
  const [dealForm, setDealForm] = useState({
    CoinAmount: 0,
    CoinName: detailCoinData.name,
    CoinCode: detailCoinData.code,
    CoinPrice: targetSocketData.trade_price,
  });

  const handleChange = (e) => {
    setDealForm({
      ...dealForm,
      [e.target.name]: Number(e.target.value),
    });
  };

  useEffect(() => {
    setDealForm({
      ...dealForm,
      CoinName: detailCoinData.name,
      CoinCode: detailCoinData.code,
      CoinPrice: targetSocketData.trade_price,
    });
  }, [socketData, detailCoinData]);

  const dispatch = useDispatch();
  const handleDeal = function (e) {
    e.preventDefault()
    const { CoinAmount, CoinName, CoinCode, CoinPrice } = dealForm;
    let body = {}
    if (deal==='sell') {
      body = { sellCoinAmount: CoinAmount, sellCoinName: CoinName, sellCoinCode: CoinCode, sellCoinPrice: CoinPrice };
      dispatch(sellAsync(body));
    } else {
      body = { buyCoinAmount: CoinAmount, buyCoinName: CoinName, buyCoinCode: CoinCode, buyCoinPrice: CoinPrice };
      dispatch(buyAsync(body));
    }
    setTimeout(() => {
      dispatch(fetchWalletAsync());
      dispatch(fetchUserAsync());
    }, 300);
  };

  return <>
    <StyledModalDiv onClick={modalClose} >
      <StyledModal onClick={(e) => e.stopPropagation()} >
      <button onClick={modalClose}>X</button>
      <form onSubmit={handleDeal}>
        {deal==='sell' ?<>
        <div>
            <label>판매가능수량</label>
          <div>
            {wallet &&
              wallet.map((coin) =>
              coin.coinName === detailCoinData.name ? coin.coinAmount : null
              )
            }
          </div>
        </div>
        <div>
          <label>판매가격(KRW)</label>
          <label>{targetSocketData.trade_price}</label>
        </div>
        <div>
          <label htmlFor="CoinAmount">판매수량</label>
          <input id="CoinAmount" type="number" name="CoinAmount" onChange={handleChange} />
        </div>
        <div>
          <p htmlFor="sellCoinPrice">판매총액</p>
          <p id="CoinPrice" name="CoinPrice" onChange={handleChange}>
            {dealForm.CoinAmount * targetSocketData.trade_price}
          </p>
        </div>
        <button>매도</button>
        </>
        :<>
        <div>
          <label>주문가능</label>
          <label>{user.balance}KRW</label>
        </div>
        <div>
          <label>매수가격(KRW)</label> <br />
          <label>{targetSocketData.trade_price}</label>
        </div>
        <div>
          <label htmlFor="buyCoinAmount">주문수량</label>
          <input id="CoinAmount" type="number" name="CoinAmount" onChange={handleChange} />
        </div>
        <div>
          <p htmlFor="CoinPrice">주문총액</p>
          <p id="CoinPrice" name="CoinPrice" onChange={handleChange}>
            {dealForm.CoinAmount * targetSocketData.trade_price}
          </p>
        <button>매수</button>
        </div>
        </>
        }
      </form>
      </StyledModal>
      </StyledModalDiv>
      </>
    })
    
    export default CoinDeal