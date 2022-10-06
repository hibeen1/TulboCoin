import { memo } from "react";
import CustomTableDetail from "./CustomTableDetail";

function CustomTable({ tableStyle, columnStyle, data, columns, rowFunction }) {

  const propRowFunction = (row) => {
    if (rowFunction) {
      rowFunction(row)
    } else {
      return
    }
  }

  return <>
  {data &&
    <CustomTableDetail tableStyle={tableStyle} columnStyle={columnStyle} data={data} columns={columns} propRowFunction={propRowFunction} />
  }
  </>
}

export default memo(CustomTable);
