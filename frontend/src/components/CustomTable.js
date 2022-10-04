import { useState, useEffect } from "react";
import CustomTableDetail from "./CustomTableDetail";

function CustomTable({ tableStyle, columnStyle, data, columns }) {
  const [customData, setCustomData] = useState();
  const [customColumns, setCustomColumns] = useState();

  useEffect(() => {
    setCustomColumns(columns);
    setCustomData(data);
  }, [data]);

  return (
    <>
      {customData && (
        <CustomTableDetail
          tableStyle={tableStyle}
          columnStyle={columnStyle}
          data={customData}
          columns={customColumns}
        />
      )}
    </>
  );
}

export default CustomTable;
