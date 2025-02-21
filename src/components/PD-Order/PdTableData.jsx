import { useState } from "react";
import { FaEllipsisV, FaEye } from "react-icons/fa";

const PdTableData = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <td>
        <FaEye className="text-primary" />
      </td>
      <td>10 Feb 2025</td>
      <td>sk-140</td>
      <td>Dew Diamonds</td>
      <td>10 Feb 2025</td>
      <td>Approved</td>
      <td>sk-142</td>
      <td>5</td>
      <td>1</td>
      <td style={{ position: "relative" }} onClick={() => setToggle(!toggle)}>
        {!toggle && <FaEllipsisV className="text-secondary" style={{ cursor: "pointer" }} />}
        {toggle && (
        <span
          className="pd-edit-btn"
          style={{
            position: "relative",
            top: "0px",
            right: "19px",
            background: "#2a2f5b",
            color: "white",
            padding: "7px 4px",
            cursor: "pointer"
          }}
        >
          Edit
        </span>
      )}
      </td>
      
    </>
  );
};

export default PdTableData;
