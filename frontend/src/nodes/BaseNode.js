import { Handle } from "reactflow";
import "./styles.css";

const BaseNode = ({ id, label, children, handles = [] }) => {
  return (
    <div className='base-node'>
      <div className='node-header'>
        <span>{label}</span>
      </div>
      <div className='node-content'>{children}</div>
      {handles.map((h, idx) => (
        <Handle
          key={`${id}-handle-${idx}`}
          type={h.type}
          position={h.position}
          id={`${id}-${h.id}`}
          style={h.style}
          className='node-handle'
          // This allows the CSS to target valid/invalid connections
          isValidConnection={h.isValidConnection}
        />
      ))}
    </div>
  );
};

export default BaseNode;
