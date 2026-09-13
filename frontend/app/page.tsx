const topics = [
  ["01", "Learn the Basics", "7 topics · Arrays, complexity, STL & fundamentals", 18],
  ["02", "Sorting Techniques", "4 topics · Selection, insertion, merge & quick sort", 0],
  ["03", "Arrays", "8 topics · Easy to advanced patterns", 0],
  ["04", "Binary Search", "7 topics · Search on arrays and answer space", 0],
  ["05", "Strings", "4 topics · Manipulation and pattern problems", 0],
  ["06", "Linked List", "8 topics · Single, double and advanced patterns", 0],
  ["07", "Recursion", "6 topics · Backtracking foundations", 0],
  ["08", "Bit Manipulation", "7 topics · Bits, XOR and tricks", 0],
  ["09", "Stack & Queue", "8 topics · Monotonic structures and design", 0],
  ["10", "Sliding Window & Two Pointer", "6 topics · Linear-time patterns", 0],
  ["11", "Heaps", "5 topics · Priority queues and heap patterns", 0],
  ["12", "Greedy", "5 topics · Local choices and proofs", 0],
  ["13", "Binary Trees", "12 topics · Traversals, views and construction", 0],
  ["14", "Binary Search Trees", "7 topics · BST operations and patterns", 0],
  ["15", "Graphs", "15 topics · BFS, DFS, shortest paths and DSU", 0],
  ["16", "Dynamic Programming", "20 topics · 1D, 2D, subsequences and grids", 0],
  ["17", "Tries", "4 topics · Prefix trees and advanced strings", 0],
  ["18", "Advanced DSA", "10 topics · Segment trees, Fenwick trees & more", 0]
] as const;

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="logo" href="#top">A<span>2</span>Z</a>
        <div className="navLinks"><a href="#roadmap">Roadmap</a><a href="#compiler">Compiler</a><a href="#progress">Progress</a></div>
        <a className="btn" href="#roadmap">Start learning</a>
      </nav>

      <section className="hero" id="top">
        <span className="eyebrow">DSA • BASIC → ADVANCED</span>
        <h1>Build your DSA skills, one problem at a time.</h1>
        <p>A structured roadmap for learning data structures and algorithms with practice links, progress tracking, and an integrated coding workspace.</p>
        <div className="actions"><a className="btn primary" href="#roadmap">Explore roadmap →</a><a className="btn" href="#compiler">Open compiler</a></div>
      </section>

      <section className="stats" id="progress">
        <div className="stat"><strong>0 / 250+</strong><span>Problems solved</span></div>
        <div className="stat"><strong>0%</strong><span>Roadmap completed</span></div>
        <div className="stat"><strong>3</strong><span>Languages supported</span></div>
      </section>

      <section className="section" id="roadmap">
        <div className="sectionHead"><div><h2>The roadmap</h2><p>Follow the topics in order or jump to what you need.</p></div></div>
        <div className="roadmap">
          {topics.map(([num, title, meta, progress]) => <a className="topic" href={`/roadmap/${num}`} key={num}>
            <div className="num">{num}</div><div className="topicMain"><div className="topicTitle">{title}</div><div className="topicMeta">{meta}</div></div>
            <div className="progress"><div className="bar"><div className="fill" style={{width:`${progress}%`}} /></div><div className="percent">{progress}%</div></div>
          </a>)}
        </div>
      </section>

      <section className="compiler" id="compiler">
        <div className="compilerCard"><div><strong>Practice without leaving the roadmap.</strong><p>Write and run C++, Java, or Python against test cases in the integrated compiler workspace.</p></div><span className="codeBadge">C++ · Java · Python</span></div>
      </section>
    </main>
  );
}
