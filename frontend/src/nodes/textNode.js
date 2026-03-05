import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // Parse variables from {{variable_name}}
  useEffect(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...currText.matchAll(regex)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    setVariables(uniqueVars);
  }, [currText]);

  // Handle auto-resize
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const dynamicHandles = [
    { type: 'source', position: Position.Right, id: 'output' },
    ...variables.map((v, index) => ({
      type: 'target',
      position: Position.Left,
      id: `var-${v}`,
      style: { top: `${(index + 1) * (100 / (variables.length + 1))}%` }
    }))
  ];

  return (
    <BaseNode id={id} label="Text" handles={dynamicHandles}>
      <label style={{ display: 'flex', flexDirection: 'column' }}>
        Content:
        <textarea
          ref={textAreaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          style={{ 
            borderRadius: '4px', 
            border: '1px solid #cbd5e1', 
            marginTop: '4px',
            resize: 'none',
            overflow: 'hidden',
            fontFamily: 'inherit',
            padding: '4px'
          }}
        />
      </label>
    </BaseNode>
  );
}

