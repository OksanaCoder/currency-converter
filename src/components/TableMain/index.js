import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { BsPencil, BsCheck, BsX } from "react-icons/bs"; // Import icons as needed

import styles from "./style.css";

const TableMain = ({ data }) => {
  const [editableData, setEditableData] = useState(data);

  const [originalData, setOriginalData] = useState(data); // Added originalData state

  const handleChange = (e, index, key) => {
    const updatedData = [...editableData];
    updatedData[index][key] = e.target.value;
    setEditableData(updatedData);
  };

  const [editingCell, setEditingCell] = useState(null);

  const handleEditStart = (index) => {
    setEditingCell(index);
  };

  const handleEditCancel = () => {
    setEditableData(originalData);
    setEditingCell(null);
  };

  const handleEditSave = (index) => {
    const initialValue = data[index].initialValue;
    const inputValue = editableData[index].buy;
    const isValidValue =
      inputValue >= initialValue * 0.9 && inputValue <= initialValue * 1.1;

    if (isValidValue) {
      setEditableData((prevData) => {
        const updatedData = [...prevData];
        updatedData[index].buy = inputValue;
        return updatedData;
      });

      setEditingCell(null);
    } else {
      alert(
        "Invalid input. Value must be within ±10% of the initial currency value."
      );
    }
  };

  return (
    <div className="wrapper container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency/Current Date</th>
            <th>Buy</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {editableData.map((item, index) => {
            const isEditing = index === editingCell;

            return (
              <tr key={index}>
                <td>{item.ccy}</td>
                <td>
                  {isEditing ? (
                    <>
                      <input
                        className="inputNoBorder"
                        value={editableData[index].buy}
                        onChange={(e) => handleChange(e, index, "buy")}
                      />
                      <BsCheck
                        onClick={() => handleEditSave(index)}
                        className="absoluteIcons"
                      />
                      <BsX
                        onClick={handleEditCancel}
                        className="absoluteIcons"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        className="inputNoBorder"
                        onFocus={() => handleEditStart(index)}
                        value={item.buy}
                        onChange={() => handleEditStart(index)}
                      />
                    </>
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <>
                      <input
                        className="inputNoBorder"
                        value={editableData[index].sale}
                        onChange={(e) => handleChange(e, index, "sale")}
                      />
                      <BsCheck
                        onClick={() => handleEditSave(index)}
                        className="absoluteIcons"
                      />
                      <BsX
                        onClick={handleEditCancel}
                        className="absoluteIcons"
                      />
                    </>
                  ) : (
                    <>
                      <input
                        onFocus={() => handleEditStart(index)}
                        value={item.sale}
                        className="inputNoBorder"
                        onChange={() => handleEditStart(index)}
                      />
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableMain;
