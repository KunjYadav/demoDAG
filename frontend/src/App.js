import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { SaveStatus } from "./saveStatus";
import { useStore } from "./store";
import { Maximize } from "lucide-react";

function App() {
  const resetBoard = useStore((state) => state.resetBoard);
  const layoutNodes = useStore((state) => state.layoutNodes);

  const handleClear = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the entire canvas? This cannot be undone.",
      )
    ) {
      resetBoard();
    }
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

          <button className='clear-button' onClick={handleClear}>
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
    </div>
  );
}

export default App;
