# Pipeline Builder

A powerful, interactive node-based pipeline builder built with **React**, **React Flow**, and **FastAPI**. This tool allows users to design complex workflows, manage data flows, and validate pipeline structures (DAG check) in real-time.

---

## Home Page

<img width="1280" height="587" alt="Image" src="https://github.com/user-attachments/assets/1ac2d27e-8da3-4aae-ad7c-4b36278c1a20" />

## Flow Diagram Example

<img width="1280" height="590" alt="Image" src="https://github.com/user-attachments/assets/6aa2c080-637b-437f-9905-442407cea354" />
Drag and drop the nodes to create new edges.

## Submit Pipeline

<img width="1280" height="583" alt="Image" src="https://github.com/user-attachments/assets/1080cb75-6211-4f9c-92ee-3049beba6762" />

On pressing the submit button you get a modal presenting the information of total number of nodes, edges and whether the nodes form a DAG or not.

## Clear Pipeline

<img width="1280" height="583" alt="Image" src="https://github.com/user-attachments/assets/02e3f97d-b0ad-4a6f-a856-4a73c848420f" />
The project uses  [Zustand](https://github.com/pmndrs/zustand)  for state management.
The nodes don't get cleared when refreshed due to persistent storing (local storing) and can only be cleared by clicking the "Clear Nodes" button.

## 🚀 Features

* **Interactive Canvas**: Drag-and-drop interface for creating and connecting nodes.
* **9 Specialized Node Types**:
  * **Core**: Input, Output, LLM, Text.
  * **Logic & Utilities**: Note, Delay (Timer), Google Search, JS Script, and Image Generation.
* **Dynamic Handles**: The **Text Node** automatically generates input handles when you use the `{{variable}}` syntax.
* **Auto-Layout**: Integrated hierarchical layout engine to organize messy pipelines with a single click.
* **Real-time Save Status**: Visual feedback indicating when changes are synced to local storage.
* **DAG Validation**: Backend validation to check if the pipeline is a **Directed Acyclic Graph** (detects cycles).
* **Smart Connections**: Built-in validation to prevent incompatible data types (e.g., preventing non-image nodes from connecting to image-specific handles).

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* React Flow (Graph library)
* Zustand (State management)
* Lucide React (Icons)
* Tailwind-inspired CSS for modern UI

**Backend:**

* FastAPI (Python)
* Pydantic (Data validation)
* CORS Middleware

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/pipeline-builder.git](https://github.com/your-username/pipeline-builder.git)
cd pipeline-builder

```

### 2. Backend Setup (FastAPI)

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install fastapi uvicorn pydantic

```

Run the server:

```bash
uvicorn main:app --reload

```

The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install

```

Run the application:

```bash
npm start

```

The app will open at `http://localhost:3000`.

---

## 💡 How to Use

1. **Add Nodes**: Drag nodes from the top toolbar onto the canvas.
2. **Connect**: Click and drag from a source handle (right side) to a target handle (left side).
3. **Dynamic Variables**: In a **Text Node**, type `{{prompt_input}}` to automatically create a new input handle named `prompt_input`.
4. **Auto Layout**: Click the **Auto Layout** button in the header to clean up your node positions.
5. **Submit**: Click **Submit Pipeline** to send the graph data to the backend. An alert will display the node/edge count and whether the graph contains any illegal loops (cycles).

---

## 🔍 API Endpoints

### `POST /pipelines/parse`

Validates the graph structure.

* **Payload**: `{ nodes: [], edges: [] }`
* **Returns**:
* `num_nodes`: Total count.
* `num_edges`: Total count.
* `is_dag`: Boolean (True if no cycles exist).

---

## 📄 License

This project is licensed under the MIT License.
