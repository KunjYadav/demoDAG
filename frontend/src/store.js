// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      nodeIDs: {},
      lastChange: Date.now(),

      getNodeID: (type) => {
        const newIDs = { ...get().nodeIDs };
        if (newIDs[type] === undefined) {
          newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({ nodeIDs: newIDs });
        return `${type}-${newIDs[type]}`;
      },

      addNode: (node) => {
        set({
          nodes: [...get().nodes, node],
          lastChange: Date.now(),
        });
      },

      onNodesChange: (changes) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
          lastChange: Date.now(),
        });
      },

      onEdgesChange: (changes) => {
        set({
          edges: applyEdgeChanges(changes, get().edges),
          lastChange: Date.now(),
        });
      },

      onConnect: (connection) => {
        set({
          edges: addEdge(
            {
              ...connection,
              type: "smoothstep",
              animated: true,
              markerEnd: {
                type: MarkerType.Arrow,
                height: "20px",
                width: "20px",
              },
            },
            get().edges,
          ),
          lastChange: Date.now(),
        });
      },

      updateNodeField: (nodeId, fieldName, fieldValue) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              node.data = { ...node.data, [fieldName]: fieldValue };
            }
            return node;
          }),
          lastChange: Date.now(),
        });
      },

      // Advanced Hierarchical Layout
      layoutNodes: () => {
        const { nodes, edges } = get();
        if (nodes.length === 0) return;

        // 1. Initialize Ranks
        const ranks = {};
        nodes.forEach((n) => (ranks[n.id] = 0));

        // 2. Iteratively assign ranks based on edges (Topological-ish)
        // We run it a few times to ensure deep dependencies are pushed right
        for (let i = 0; i < nodes.length; i++) {
          edges.forEach((edge) => {
            if (ranks[edge.target] <= ranks[edge.source]) {
              ranks[edge.target] = ranks[edge.source] + 1;
            }
          });
        }

        // 3. Group nodes by their calculated rank
        const columns = {};
        Object.entries(ranks).forEach(([id, rank]) => {
          if (!columns[rank]) columns[rank] = [];
          columns[rank].push(id);
        });

        const X_OFFSET = 300;
        const Y_OFFSET = 150;

        const laidOutNodes = nodes.map((node) => {
          const column = ranks[node.id];
          const row = columns[column].indexOf(node.id);

          // Center the columns vertically for a cleaner look
          const totalInColumn = columns[column].length;
          const centeringShift = (totalInColumn - 1) * (Y_OFFSET / 2);

          return {
            ...node,
            position: {
              x: column * X_OFFSET + 100,
              y: row * Y_OFFSET - centeringShift + 300,
            },
          };
        });

        set({ nodes: laidOutNodes, lastChange: Date.now() });
      },

      resetBoard: () =>
        set({ nodes: [], edges: [], nodeIDs: {}, lastChange: Date.now() }),
    }),
    {
      name: "pipeline-storage",
    },
  ),
);
