"use client";

import Link from "next/link";
import { useState } from "react";

const starterCode: Record<string, string> = {
  "C++": "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, A2Z!\" << endl;\n    return 0;\n}",
  Java: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, A2Z!\");\n    }\n}",
  Python: "def main():\n    print(\"Hello, A2Z!\")\n\nif __name__ == \"__main__\":\n    main()"
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Result = {
  status: string;
  status_id?: number;
  stdout: string;
  stderr: string;
  compile_output: string;
  message: string;
  time?: string | null;
  memory?: number | null;
};

export default function CompilerPage() {
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState(starterCode["C++"]);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("Ready. Write code and press Run Code.");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const changeLanguage = (value: string) => {
    setLanguage(value);
    setCode(starterCode[value]);
    setResult(null);
    setOutput("Ready.");
  };

  const runCode = async () => {
    setRunning(true);
    setResult(null);
    setOutput("Compiling and running in the sandbox…");

    try {
      const response = await fetch(`${API_URL}/api/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, source_code: code, stdin })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Compiler request failed.");

      setResult(data);
      const text = data.compile_output || data.stderr || data.stdout || data.message || "Program finished with no output.";
      setOutput(text);
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Could not connect to the compiler service.");
    } finally {
      setRunning(false);
    }
  };

  const statusClass = result?.status === "Accepted" ? "runStatus accepted" : result ? "runStatus failed" : "runStatus";

  return <main className="compilerPage">
    <nav className="nav"><Link className="logo" href="/">A<span>2</span>Z</Link><div className="navLinks"><Link href="/#roadmap">Roadmap</Link><Link href="/compiler">Compiler</Link></div><Link className="btn" href="/">Home</Link></nav>
    <div className="compilerWrap">
      <Link className="backLink" href="/#roadmap">← Back to roadmap</Link>
      <div className="compilerHeader"><div><span className="eyebrow">CODE WORKSPACE</span><h1>Write. Run. Learn.</h1><p>Practice DSA in C++, Java or Python without leaving A2Z.</p></div><span className="secureBadge">● Sandboxed execution</span></div>
      <div className="editorShell">
        <div className="editorToolbar">
          <label>Language <select value={language} onChange={(e) => changeLanguage(e.target.value)}><option>C++</option><option>Java</option><option>Python</option></select></label>
          <button className="runButton" onClick={runCode} disabled={running}>{running ? "Running…" : "▶ Run Code"}</button>
        </div>
        <textarea className="codeEditor" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Code editor" />
        <div className="inputPanel"><div className="outputTitle">Input / stdin</div><textarea value={stdin} onChange={(e) => setStdin(e.target.value)} placeholder="Optional input for your program" spellCheck={false} /></div>
        <div className="outputPanel">
          <div className="outputTitle">Output {result && <span className={statusClass}>{result.status}</span>}</div>
          <pre>{output}</pre>
          {result?.time && <small>Time: {result.time}s{result.memory ? ` · Memory: ${result.memory} KB` : ""}</small>}
        </div>
      </div>
      <div className="compilerNote"><strong>Execution:</strong> code is sent to the FastAPI service, which forwards it to Judge0's sandboxed execution environment. The API process itself never executes submitted code.</div>
    </div>
  </main>;
}
