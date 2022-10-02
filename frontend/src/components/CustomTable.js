import { useState, useEffect } from "react"
import CustomTableDetail from "./CustomTableDetail"

function CustomTable({ data, columns }) {
  const [ customData, setCustomData ] = useState()
  const [ customColumns, setCustomColumns ] = useState()
  const [ sortBy, setSortBy ] = useState()

  useEffect(() => {
    setCustomColumns(data)
    setCustomData(columns)
  }, [])

  useEffect(() => {
    setCustomData()
  }, [sortBy])

  return <>
    <CustomTableDetail data={customData} columns={customColumns} />
  </>
}

export default CustomTable