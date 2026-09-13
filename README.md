# A-to-z — DSA Practice Platform

A focused DSA learning platform inspired by roadmap-based learning. It combines an A-to-Z style topic roadmap, problem tracking, external practice links, and an online compiler workspace for C++, Java, and Python.

## Project structure

- `frontend/` — Next.js + TypeScript web app
- `backend/` — FastAPI service
- `data/` — roadmap/problem metadata

## Product goals

- Basic → Advanced DSA roadmap
- Topic and problem progress tracking
- LeetCode and HackerRank references when an exact/appropriate match exists
- C++, Java, and Python editor/compiler workspace
- Original UI and concise problem metadata; external platforms remain the source for their full problem statements

## Development

The first commit establishes the application architecture. Compiler execution will be implemented behind a sandboxed service boundary; arbitrary submitted code must never execute directly inside the API process.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
# activate the environment, then:
pip install -r requirements.txt
uvicorn app.main:app --reload
```
