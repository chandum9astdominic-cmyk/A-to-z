import Link from "next/link";
import { notFound } from "next/navigation";
import { getSection, roadmap } from "../../../data/roadmap";
import ProblemList from "./ProblemList";

export function generateStaticParams() {
  return roadmap.map((section) => ({ section: section.id }));
}

export default async function RoadmapSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: id } = await params;
  const section = getSection(id);
  if (!section) notFound();

  return (
    <main className="detailPage">
      <nav className="nav"><Link className="logo" href="/">A<span>2</span>Z</Link><div className="navLinks"><Link href="/#roadmap">Roadmap</Link><Link href="/compiler">Compiler</Link></div><Link className="btn" href="/">Home</Link></nav>
      <div className="detailWrap">
        <Link className="backLink" href="/#roadmap">← Back to roadmap</Link>
        <div className="detailHero"><div><span className="eyebrow">SECTION {section.id}</span><h1>{section.title}</h1><p>{section.description}</p></div><div className="topicCount"><strong>{section.problems.length}</strong><span>problems loaded</span></div></div>
        <div className="topicChips">{section.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
        <ProblemList problems={section.problems} />
      </div>
    </main>
  );
}
