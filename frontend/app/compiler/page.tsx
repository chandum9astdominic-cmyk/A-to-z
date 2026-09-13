"use client";

import Link from "next/link";
import { useState } from "react";

const starterCode: Record<string, string> = {
  "C++": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, A2Z!\";\n    return 0;\n}",
  Java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, A2Z!\");\n    }\n}",
  Python: "def main():\n    print(\"Hello, A2Z!\")\n\nif __name__ == \"__main__\":\n    main()"
};

export default function CompilerPage() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState(starterCode["C++"]);
  const [output, setOutput] = useState("Ready. The secure execution service will be connected here.");
  const [running, setRunning] = useState(false);

  const changeLanguage = (value: string) => { setLanguage(value); setCode(starterCode[value]); setOutput("Ready."); };
  const runCode = () => {
    setRunning(true);
    setOutput("Submitting to the sandbox…\n\nCompiler service is not connected yet. This UI is ready for the backend execution API.");
    window.setTimeout(() => setRunning(false), 500);
  };

  return <main className="compilerPage">
    <nav className="nav"><Link className="logo" href="/">A<span>2</span>Z</Link><div className="navLinks"><Link href="/#roadmap">Roadmap</Link><Link href="/compiler">Compiler</Link></div><Link className="btn" href="/">Home</Link></nav>
    <div className="compilerWrap">
      <Link className="backLink" href="/#roadmap">← Back to roadmap</Link>
      <div className="compilerHeader"><div><span className="eyebrow">CODE WORKSPACE</span><h1>Write. Run. Learn.</h1><p>Practice DSA in C++, Java or Python without leaving A2Z.</p></div><span className="secureBadge">● Sandboxed execution</span></div>
      <div className="editorShell">
        <div className="editorToolbar"><label>Language <select value={language} onChange={(e) => changeLanguage(e.target.value)}><option>C++</option><option>Java</option><option>Python</option></select></label><button className="runButton" onClick={runCode} disabled={running}>{running ? "Running…" : "▶ Run Code"}</button></div>
        <textarea className="codeEditor" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Code editor" />
        <div className="outputPanel"><div className="outputTitle">Output</div><pre>{output}</pre></div>
      </div>
      <div className="compilerNote"><strong>Next:</strong> connect the FastAPI execution endpoint to an isolated container runner. User code will never execute inside the API process.</div>
    </div>
  </main>;
}
