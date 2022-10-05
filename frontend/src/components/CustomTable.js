import { useState, useEffect } from "react";
import CustomTableDetail from "./CustomTableDetail";

function CustomTable({ tableStyle, columnStyle, data, columns, rowFunction }) {
  const [customData, setCustomData] = useState();
  const [customColumns, setCustomColumns] = useState();

  useEffect(() => {
    setCustomColumns(columns);
    setCustomData(data);
  }, [data]);

  const propRowFunction = (row) => {
    if (rowFunction) {
      rowFunction(row)
    } else {
      return
    }
  }

  return <>
  {customData &&
    <CustomTableDetail tableStyle={tableStyle} columnStyle={columnStyle} data={customData} columns={customColumns} propRowFunction={propRowFunction} />
  }
  </>
}

export default CustomTable;
