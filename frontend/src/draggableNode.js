// draggableNode.js
export const DraggableNode = ({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className='draggable-node-item'
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {Icon && <Icon size={16} strokeWidth={2.5} />}
      <span>{label}</span>
    </div>
  );
};
