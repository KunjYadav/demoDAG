from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    
    # Build adjacency list
    adj = {node['id']: [] for node in data.nodes}
    for edge in data.edges:
        if edge['source'] in adj:
            adj[edge['source']].append(edge['target'])

    # Cycle detection (DFS)
    visited = set()
    rec_stack = set()

    def has_cycle(v):
        visited.add(v)
        rec_stack.add(v)
        for neighbour in adj.get(v, []):
            if neighbour not in visited:
                if has_cycle(neighbour):
                    return True
            elif neighbour in rec_stack:
                return True
        rec_stack.remove(v)
        return False

    is_dag = True
    for node in data.nodes:
        if node['id'] not in visited:
            if has_cycle(node['id']):
                is_dag = False
                break

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

