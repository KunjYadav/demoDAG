import { useState } from "react";
import { Position } from "reactflow";
import { useStore } from "../store";
import BaseNode from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, "inputName", e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, "inputType", e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label='Input'
      handles={[{ type: "source", position: Position.Right, id: "value" }]}
    >
      <div className='node-input-container'>
        <div className='node-label'>Variable Name</div>
        <input
          className='node-input'
          type='text'
          value={currName}
          onChange={handleNameChange}
        />
      </div>
      <div className='node-input-container'>
        <div className='node-label'>Type</div>
        <select
          className='node-select'
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value='Text'>Text</option>
          <option value='File'>File</option>
        </select>
      </div>
    </BaseNode>
  );
};
