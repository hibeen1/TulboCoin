import styled from "styled-components";

const CustomTableStyle = styled.div`
  tbody {
    :hover {
      /* cursor: pointer; */
    }
  }
`;

function CustomTableDetail({ tableStyle, data, columns, propRowFunction }) {
  return (
    <>
      <CustomTableStyle>
        <table style={tableStyle}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.name}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((ele) => (
              <tr style={ele.rowStyle} onClick={() => propRowFunction(ele)}>
                {columns.map((column) => (
                  <td style={column.columnStyle}>{ele[column.name]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </CustomTableStyle>
    </>
  );
}

export default CustomTableDetail;
