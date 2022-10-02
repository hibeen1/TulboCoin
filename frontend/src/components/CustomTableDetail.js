import { useState } from "react"

function CustomTableDetail({ data, columns }) {


  return <>
    <table>
        <thead>
          <tr>
            {columns.map((ele) => <th>{ele.name}</th>)}
          </tr>
        </thead>
        <tbody>
          
          {/* {data.map((ele) => columns.map(column => ))} */}
        </tbody>
      </table>
  </>
}

export default CustomTableDetail