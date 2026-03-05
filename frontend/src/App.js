import { useState } from "react";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { SaveStatus } from "./saveStatus";
import { useStore } from "./store";
import { Maximize, AlertTriangle } from "lucide-react";

function App() {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const resetBoard = useStore((state) => state.resetBoard);
  const layoutNodes = useStore((state) => state.layoutNodes);

  const handleClear = () => {
    resetBoard();
    setShowClearConfirm(false);
  };

  return (
    <div className='app-container'>
      <header className='main-header'>
        <div className='header-logo'>
          <div className='logo-icon'>VS</div>
          <h1>Pipeline</h1>
          <SaveStatus />
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className='secondary-button'
            onClick={layoutNodes}
            title='Auto-layout nodes'
          >
            <Maximize size={14} />
            Auto Layout
          </button>

          <button className='clear-button' onClick={() => setShowClearConfirm(true)}>
            Clear
          </button>

          <div className='vertical-divider' />

          <SubmitButton />
        </div>
      </header>

      <PipelineToolbar />

      <main className='canvas-container'>
        <PipelineUI />
      </main>

      {/* Custom Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="alert-box" onClick={(e) => e.stopPropagation()}>
            <div className="alert-header">
              <AlertTriangle color="#ef4444" size={24} />
              <h2>Clear Canvas?</h2>
            </div>
            
            <div className="alert-content">
              <p>
                Are you sure you want to clear the entire canvas? This action 
                will remove all nodes and connections. <strong>This cannot be undone.</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="secondary-button" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="alert-close-btn" 
                style={{ flex: 1, backgroundColor: '#e11d48' }}
                onClick={handleClear}
              >
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;