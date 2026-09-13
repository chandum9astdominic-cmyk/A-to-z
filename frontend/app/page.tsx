"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { roadmap, totalProblems } from "../data/roadmap";

export default function Home() {
  const [solved, setSolved] = useState<string[]>([]);
  useEffect(() => { try { setSolved(JSON.parse(localStorage.getItem("a2z-solved") || "[]")); } catch { setSolved([]); } }, []);
  const solvedCount = solved.length;
  const completion = totalProblems ? Math.round((solvedCount / totalProblems) * 100) : 0;
  const solvedSet = useMemo(() => new Set(solved), [solved]);

  return <main>
    <nav className="nav"><Link className="logo" href="#top">A<span>2</span>Z</Link><div className="navLinks"><a href="#roadmap">Roadmap</a><Link href="/compiler">Compiler</Link><a href="#progress">Progress</a></div><a className="btn" href="#roadmap">Start learning</a></nav>
    <section className="hero" id="top"><span className="eyebrow">DSA • BASIC → ADVANCED</span><h1>Build your DSA skills, one problem at a time.</h1><p>A structured roadmap for learning data structures and algorithms with practice links, progress tracking, and an integrated coding workspace.</p><div className="actions"><a className="btn primary" href="#roadmap">Explore roadmap →</a><Link className="btn" href="/compiler">Open compiler</Link></div></section>
    <section className="stats" id="progress"><div className="stat"><strong>{solvedCount} / {totalProblems}</strong><span>Problems solved in the current catalog</span></div><div className="stat"><strong>{completion}%</strong><span>Roadmap progress</span></div><div className="stat"><strong>3</strong><span>Languages supported</span></div></section>
    <section className="section" id="roadmap"><div className="sectionHead"><div><h2>The roadmap</h2><p>Follow the topics in order or jump to what you need.</p></div><span className="catalogBadge">18 sections</span></div><div className="roadmap">{roadmap.map((section) => { const done = section.problems.filter((p) => solvedSet.has(p.id)).length; const progress = section.problems.length ? Math.round(done / section.problems.length * 100) : 0; return <Link className="topic" href={`/roadmap/${section.id}`} key={section.id}><div className="num">{section.id}</div><div className="topicMain"><div className="topicTitle">{section.title}</div><div className="topicMeta">{section.topics.slice(0, 3).join(" · ")} · {section.problems.length} loaded problems</div></div><div className="progress"><div className="bar"><div className="fill" style={{ width: `${progress}%` }} /></div><div className="percent">{progress}%</div></div><span className="arrow">→</span></Link>; })}</div></section>
    <section className="compiler"><Link className="compilerCard" href="/compiler"><div><strong>Practice without leaving the roadmap.</strong><p>Write and run C++, Java, or Python in the integrated coding workspace.</p></div><span className="codeBadge">Open compiler →</span></Link></section>
  </main>;
}
