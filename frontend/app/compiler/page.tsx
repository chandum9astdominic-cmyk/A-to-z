"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { roadmap, type Problem } from "../../data/roadmap";

const starterCode: Record<string, string> = {
  "C++": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // Write your solution here\n    return 0;\n}",
  Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}",
  Python: "def main():\n    # Write your solution here\n    pass\n\nif __name__ == \"__main__\":\n    main()"
};

const problemStarterCode: Record<string, Partial<Record<string, string>>> = {
  "Two Sum": {
    "C++": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, target;\n    cin >> n >> target;\n    vector<int> nums(n);\n    for (int &x : nums) cin >> x;\n\n    // Find the two indices whose values add up to target.\n    return 0;\n}",
    Java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int target = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n\n        // Find the two indices whose values add up to target.\n    }\n}",
    Python: "def main():\n    data = list(map(int, input().split()))\n    n, target = data[0], data[1]\n    nums = data[2:2+n]\n\n    # Find the two indices whose values add up to target.\n\nif __name__ == \"__main__\":\n    main()"
  }
};

type TestCase = { input: string; expected: string };

const testCasesByTitle: Record<string, TestCase[]> = {
  "Two Sum": [
    { input: "4 9\n2 7 11 15", expected: "[0, 1]" },
    { input: "3 6\n3 2 4", expected: "[1, 2]" },
    { input: "2 6\n3 3", expected: "[0, 1]" }
  ],
  "Binary Search to find X": [
    { input: "6 7\n1 2 3 4 7 9", expected: "4" },
    { input: "5 5\n1 2 3 4 6", expected: "-1" },
    { input: "1 1\n1", expected: "0" }
  ],
  "Maximum Consecutive Ones": [
    { input: "6\n1 1 0 1 1 1", expected: "3" },
    { input: "4\n1 1 1 1", expected: "4" },
    { input: "3\n0 0 0", expected: "0" }
  ],
  "Check Balanced Parentheses": [
    { input: "()[]{}", expected: "true" },
    { input: "([)]", expected: "false" },
    { input: "{[]}", expected: "true" }
  ],
  "Climbing Stairs": [
    { input: "2", expected: "2" },
    { input: "3", expected: "3" },
    { input: "5", expected: "8" }
  ]
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
  const [problemId, setProblemId] = useState("");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState(starterCode["C++"]);
  const [testCases, setTestCases] = useState<TestCase[]>([{ input: "", expected: "" }]);
  const [activeCase, setActiveCase] = useState(0);
  const [output, setOutput] = useState("Ready. Write code and press Run Code.");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("problem") || "";
    setProblemId(id);
    const found = roadmap.flatMap((section) => section.problems).find((item) => item.id === id) || null;
    setProblem(found);
    if (found) {
      const cases = testCasesByTitle[found.title] || [{ input: "", expected: "" }];
      setTestCases(cases);
      setCode(problemStarterCode[found.title]?.["C++"] || starterCode["C++"]);
    }
  }, []);

  const currentCase = testCases[activeCase] || { input: "", expected: "" };
  const hasProblem = Boolean(problem);
  const practiceLabel = useMemo(() => problem ? `Problem ${problem.links[0]?.label || ""}` : "Practice workspace", [problem]);

  const changeLanguage = (value: string) => {
    setLanguage(value);
    setCode(problem ? problemStarterCode[problem.title]?.[value] || starterCode[value] : starterCode[value]);
    setResult(null);
    setOutput("Ready.");
  };

  const updateCase = (field: keyof TestCase, value: string) => {
    setTestCases((items) => items.map((item, index) => index === activeCase ? { ...item, [field]: value } : item));
  };

  const runCode = async () => {
    setRunning(true);
    setResult(null);
    setOutput("Compiling and running in the sandbox…");

    try {
      const response = await fetch(`${API_URL}/api/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, source_code: code, stdin: currentCase.input })
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
      <Link className="backLink" href={problem ? "/roadmap/" + problemId.slice(0, 2) : "/#roadmap"}>← Back to problem list</Link>

      {hasProblem ? <div className="solveWorkspace">
        <section className="problemPanel">
          <div className="problemPanelTop"><span className="eyebrow">{practiceLabel}</span><span className={`difficulty ${problem!.difficulty.toLowerCase()}`}>{problem!.difficulty}</span></div>
          <h1>{problem!.title}</h1>
          <p className="problemDescription">{problem!.description}</p>
          <div className="detailsBlock"><h2>Problem details</h2><p>Read the requirement carefully, identify the pattern, and write a solution that handles the full range of valid inputs.</p></div>
          {problem!.links.length > 0 && <div className="detailsBlock"><h2>Practice link</h2><div className="problemLinks">{problem!.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.platform}: <strong>{link.label}</strong> ↗</a>)}</div></div>}
          <div className="examplesBlock"><h2>Test cases</h2><div className="caseTabs">{testCases.map((_, index) => <button key={index} className={activeCase === index ? "active" : ""} onClick={() => setActiveCase(index)}>Case {index + 1}</button>)}</div><label>Input<textarea value={currentCase.input} onChange={(e) => updateCase("input", e.target.value)} placeholder="Enter test input" spellCheck={false} /></label><label>Expected output<textarea value={currentCase.expected} onChange={(e) => updateCase("expected", e.target.value)} placeholder="Expected output" spellCheck={false} /></label></div>
        </section>

        <section className="codePanel">
          <div className="codePanelHeader"><div><span className="codePanelTitle">Code</span><span className="codePanelSub">Write your solution</span></div><label className="languagePicker">Language <select value={language} onChange={(e) => changeLanguage(e.target.value)}><option>C++</option><option>Java</option><option>Python</option></select></label><button className="runButton" onClick={runCode} disabled={running}>{running ? "Running…" : "▶ Run Code"}</button></div>
          <textarea className="codeEditor" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Code editor" />
          <div className="testResultPanel"><div className="testResultHeader"><span>Test Result</span>{result && <span className={statusClass}>{result.status}</span>}</div><div className="selectedCase"><span>Case {activeCase + 1}</span><button onClick={runCode} disabled={running}>Run this case</button></div><div className="resultGrid"><div><span>Input</span><pre>{currentCase.input || "No input"}</pre></div><div><span>Expected</span><pre>{currentCase.expected || "Not specified"}</pre></div><div><span>Your output</span><pre>{output}</pre></div></div>{result?.time && <small>Time: {result.time}s{result.memory ? ` · Memory: ${result.memory} KB` : ""}</small>}</div>
        </section>
      </div> : <div className="emptyState"><strong>{problemId ? "Problem not found" : "Practice workspace"}</strong><p>Select a problem from the roadmap and press Solve to open its code, details and test cases here.</p></div>}

      <div className="compilerNote"><strong>Execution:</strong> code is sent to the FastAPI service, which forwards it to Judge0's sandboxed execution environment. The API process itself never executes submitted code.</div>
    </div>
  </main>;
}
