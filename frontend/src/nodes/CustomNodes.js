// CustomNodes.js
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const NoteNode = ({ id }) => (
  <BaseNode id={id} label="Note" handles={[]}>
    <textarea placeholder="Write a note..." style={{ border: 'none', background: '#fef9c3', minHeight: '60px' }} />
  </BaseNode>
);

export const TimerNode = ({ id }) => (
  <BaseNode id={id} label="Delay" handles={[{ type: 'target', position: Position.Left, id: 'in' }, { type: 'source', position: Position.Right, id: 'out' }]}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <input type="number" defaultValue={1000} style={{ width: '60px' }} /> <span>ms</span>
    </div>
  </BaseNode>
);

export const SearchNode = ({ id }) => (
  <BaseNode id={id} label="Google Search" handles={[{ type: 'target', position: Position.Left, id: 'query' }, { type: 'source', position: Position.Right, id: 'results' }]}>
    <div style={{ fontStyle: 'italic', color: '#94a3b8' }}>Web search integration</div>
  </BaseNode>
);

export const CodeNode = ({ id }) => (
  <BaseNode id={id} label="JS Script" handles={[{ type: 'target', position: Position.Left, id: 'args' }, { type: 'source', position: Position.Right, id: 'return' }]}>
    <code style={{ background: '#1e293b', color: '#38bdf8', padding: '4px', borderRadius: '4px' }}>function() {'{...}'}</code>
  </BaseNode>
);

export const ImageNode = ({ id }) => (
  <BaseNode id={id} label="Image Gen" handles={[{ type: 'target', position: Position.Left, id: 'prompt' }, { type: 'source', position: Position.Right, id: 'image' }]}>
    <div style={{ height: '40px', background: '#e2e8f0', borderRadius: '4px', border: '1px dashed #94a3b8' }}></div>
  </BaseNode>
);
