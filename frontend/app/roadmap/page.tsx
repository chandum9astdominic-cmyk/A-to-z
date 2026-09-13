import Link from "next/link";
import { roadmap, totalProblems } from "../../data/roadmap";

export default function RoadmapPage() {
  return (
    <main>
      <nav className="nav">
        <Link className="logo" href="/">A<span>2</span>Z</Link>
        <div className="navLinks">
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/compiler">Compiler</Link>
        </div>
        <Link className="btn" href="/">Home</Link>
      </nav>

      <section className="hero">
        <span className="eyebrow">DSA • BASIC → ADVANCED</span>
        <h1>Striver-style DSA roadmap.</h1>
        <p>Work through all 18 sections in order, from programming basics to advanced strings, with your progress tracked as you solve problems.</p>
        <div className="stats" style={{ padding: 0, marginTop: 28 }}>
          <div className="stat"><strong>{totalProblems}</strong><span>Total problems in this catalog</span></div>
          <div className="stat"><strong>{roadmap.length}</strong><span>Learning sections</span></div>
          <div className="stat"><strong>3</strong><span>Compiler languages</span></div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <div><h2>All sections</h2><p>Start from Section 01 or jump directly to a topic.</p></div>
          <span className="catalogBadge">{totalProblems} problems</span>
        </div>
        <div className="roadmap">
          {roadmap.map((section) => (
            <Link className="topic" href={`/roadmap/${section.id}`} key={section.id}>
              <div className="num">{section.id}</div>
              <div className="topicMain">
                <div className="topicTitle">{section.title}</div>
                <div className="topicMeta">{section.topics.slice(0, 4).join(" · ")} · {section.problems.length} problems</div>
              </div>
              <span className="arrow">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
