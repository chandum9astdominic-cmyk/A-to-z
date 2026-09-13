"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Problem } from "../../../data/roadmap";

export default function ProblemList({ problems }: { problems: Problem[] }) {
  const [solved, setSolved] = useState<string[]>([]);

  useEffect(() => {
    try { setSolved(JSON.parse(localStorage.getItem("a2z-solved") || "[]")); } catch { setSolved([]); }
  }, []);

  const solvedSet = useMemo(() => new Set(solved), [solved]);
  const toggle = (id: string) => {
    const next = solvedSet.has(id) ? solved.filter((item) => item !== id) : [...solved, id];
    setSolved(next);
    localStorage.setItem("a2z-solved", JSON.stringify(next));
  };

  if (!problems.length) return <div className="emptyState"><strong>Problems are coming next.</strong><p>The section structure is ready. We are adding and verifying the complete problem catalog without copying proprietary problem statements.</p></div>;

  return <div className="problemList">
    {problems.map((problem, index) => {
      const isSolved = solvedSet.has(problem.id);
      return <article className={`problemCard ${isSolved ? "solved" : ""}`} key={problem.id}>
        <button className="solveButton" onClick={() => toggle(problem.id)} aria-label={isSolved ? "Mark unsolved" : "Mark solved"}>{isSolved ? "✓" : "○"}</button>
        <div className="problemNumber">{String(index + 1).padStart(2, "0")}</div>
        <div className="problemBody"><div className="problemTitleRow"><h2>{problem.title}</h2><span className={`difficulty ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span></div><p>{problem.description}</p><div className="problemLinks">{problem.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={`${link.platform}-${link.label}`}>{link.platform}: <strong>{link.label}</strong> ↗</a>)}</div></div>
        <Link className="practiceButton" href={`/compiler?problem=${encodeURIComponent(problem.id)}`}>Solve</Link>
      </article>;
    })}
  </div>;
}
