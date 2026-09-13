from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="A-to-z DSA API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROADMAP = [
    {"id": "01", "title": "Learn the Basics", "problems": 7},
    {"id": "02", "title": "Sorting Techniques", "problems": 4},
    {"id": "03", "title": "Arrays", "problems": 8},
    {"id": "04", "title": "Binary Search", "problems": 7},
    {"id": "05", "title": "Strings", "problems": 4},
    {"id": "06", "title": "Linked List", "problems": 8},
    {"id": "07", "title": "Recursion", "problems": 6},
    {"id": "08", "title": "Bit Manipulation", "problems": 7},
    {"id": "09", "title": "Stack & Queue", "problems": 8},
    {"id": "10", "title": "Sliding Window & Two Pointer", "problems": 6},
    {"id": "11", "title": "Heaps", "problems": 5},
    {"id": "12", "title": "Greedy", "problems": 5},
    {"id": "13", "title": "Binary Trees", "problems": 12},
    {"id": "14", "title": "Binary Search Trees", "problems": 7},
    {"id": "15", "title": "Graphs", "problems": 15},
    {"id": "16", "title": "Dynamic Programming", "problems": 20},
    {"id": "17", "title": "Tries", "problems": 4},
    {"id": "18", "title": "Advanced DSA", "problems": 10},
]

@app.get("/health")
def health():
    return {"status": "ok", "service": "a-to-z-api"}

@app.get("/api/roadmap")
def roadmap():
    return ROADMAP
