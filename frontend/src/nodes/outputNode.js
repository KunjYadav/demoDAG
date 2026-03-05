import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode 
      id={id} 
      label="Output" 
      handles={[{ type: 'target', position: Position.Left, id: 'value' }]}
    >
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={(e) => setCurrName(e.target.value)}
          style={{ borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
        />
      </label>
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Type:
        <select 
          value={outputType} 
          onChange={(e) => setOutputType(e.target.value)}
          style={{ borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
}

