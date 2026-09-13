from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import urllib.error
import urllib.request
import json

app = FastAPI(title="A-to-z DSA API", version="0.2.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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


class ExecuteRequest(BaseModel):
    language: Literal["C++", "Java", "Python"]
    source_code: str = Field(min_length=1, max_length=50000)
    stdin: str = Field(default="", max_length=10000)


LANGUAGE_IDS = {"C++": 105, "Java": 91, "Python": 109}


@app.get("/health")
def health():
    return {"status": "ok", "service": "a-to-z-api"}


@app.get("/api/roadmap")
def roadmap():
    return ROADMAP


@app.post("/api/execute")
def execute_code(request: ExecuteRequest):
    payload = json.dumps({
        "language_id": LANGUAGE_IDS[request.language],
        "source_code": request.source_code,
        "stdin": request.stdin,
        "cpu_time_limit": 2,
        "wall_time_limit": 5,
        "memory_limit": 128000,
        "enable_network": False,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://ce.judge0.com/submissions?wait=true",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "A-to-z-DSA-Compiler/0.2",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            result = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise HTTPException(
            status_code=502,
            detail=f"Execution service rejected the request: {detail}",
        )
    except (urllib.error.URLError, TimeoutError) as exc:
        raise HTTPException(
            status_code=503,
            detail=f"Execution service unavailable: {exc}",
        )

    status = result.get("status") or {}
    return {
        "status": status.get("description", "Unknown"),
        "status_id": status.get("id"),
        "stdout": result.get("stdout") or "",
        "stderr": result.get("stderr") or "",
        "compile_output": result.get("compile_output") or "",
        "message": result.get("message") or "",
        "time": result.get("time"),
        "memory": result.get("memory"),
    }
