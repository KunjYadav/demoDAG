import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }), shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            
            alert(
                `🚀 Pipeline Submitted Successfully!\n\n` +
                `• Nodes: ${data.num_nodes}\n` +
                `• Edges: ${data.num_edges}\n` +
                `• Valid DAG: ${data.is_dag ? '✅ Yes' : '❌ No (Cycle Detected)'}`
            );
        } catch (error) {
            alert('Unable to connect to backend. Please ensure the FastAPI server is running.');
        }
    };

    return (
        <div className="submit-container">
            <button className="submit-button" onClick={handleSubmit}>
                Submit Pipeline
            </button>
        </div>
    );
}

