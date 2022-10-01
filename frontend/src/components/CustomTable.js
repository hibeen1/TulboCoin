import { useState, useEffect } from "react"

function CustomTable({ data }) {
  const [ coinData, setCoinData ] = useState()
  useEffect(() => {
    setCoinData(data)
  }, [])
  return <>
    {data.map((coin) => {
      return <td>{coin.code}</td>
    })}
  </>
}

export default CustomTable