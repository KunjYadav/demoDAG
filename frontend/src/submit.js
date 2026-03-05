import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const SubmitButton = () => {
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow,
  );

  const backendURL =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/pipelines/parse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();
      setModalData({
        type: "success",
        title: "Pipeline Submitted",
        nodes: data.num_nodes,
        edges: data.num_edges,
        isDag: data.is_dag,
      });
    } catch (error) {
      setModalData({
        type: "error",
        title: "Submission Failed",
        message:
          "Unable to connect to the backend server. Please ensure FastAPI is running.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='submit-container'>
      <button
        className='submit-button'
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Pipeline"}
      </button>

      {modalData && (
        <div className='modal-overlay' onClick={() => setModalData(null)}>
          <div className='alert-box' onClick={(e) => e.stopPropagation()}>
            <div className='alert-header'>
              {modalData.type === "success" ? (
                <CheckCircle2 color='#10b981' size={24} />
              ) : (
                <AlertCircle color='#ef4444' size={24} />
              )}
              <h2>{modalData.title}</h2>
            </div>

            <div className='alert-content'>
              {modalData.type === "success" ? (
                <>
                  <p>
                    Your pipeline has been successfully parsed and validated.
                  </p>
                  <div className='alert-stats'>
                    <div className='alert-stat-item'>
                      <span>Total Nodes:</span>
                      <strong>{modalData.nodes}</strong>
                    </div>
                    <div className='alert-stat-item'>
                      <span>Total Edges:</span>
                      <strong>{modalData.edges}</strong>
                    </div>
                    <div className='alert-stat-item'>
                      <span>Directed Acyclic(isDag):</span>
                      <strong
                        style={{
                          color: modalData.isDag ? "#10b981" : "#ef4444",
                        }}
                      >
                        {modalData.isDag ? "Yes" : "No (Cycles Found)"}
                      </strong>
                    </div>
                  </div>
                </>
              ) : (
                <p>{modalData.message}</p>
              )}
            </div>

            <button
              className='alert-close-btn'
              onClick={() => setModalData(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
