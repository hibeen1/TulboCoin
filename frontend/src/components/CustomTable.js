import { useState, useEffect } from "react"
import CustomTableDetail from "./CustomTableDetail"

function CustomTable({ data, columns, rowFunction }) {
  const [ customData, setCustomData ] = useState()
  const [ customColumns, setCustomColumns ] = useState()

  useEffect(() => {
    setCustomColumns(columns)
    setCustomData(data)
  }, [data])

  const propRowFunction = (row) => {
    if (rowFunction) {
      rowFunction(row)
    } else {
      return
    }
  }

  return <>
  {customData &&
    <CustomTableDetail data={customData} columns={customColumns} propRowFunction={propRowFunction} />
  }
  </>
}

export default CustomTable