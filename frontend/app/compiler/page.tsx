"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { roadmap, type Problem } from "../../data/roadmap";

const starterCode: Record<string, string> = {
  "C++": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    // Write your solution here\n};",
  Java: "import java.util.*;\n\nclass Solution {\n    // Write your solution here\n}",
  Python: "from typing import List\n\nclass Solution:\n    # Write your solution here\n    pass"
};

const problemStarterCode: Record<string, Partial<Record<string, string>>> = {
  "Two Sum": {
    "C++": "#include <bits/stdc++.h>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};",
    Java: "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[]{};\n    }\n}",
    Python: "from typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your solution here\n        return []"
  }
};

type TestCase = { input: string; expected: string };
const defaultCases: TestCase[] = [
  { input: "4 9\n2 7 11 15", expected: "[0, 1]" },
  { input: "3 6\n3 2 4", expected: "[1, 2]" },
  { input: "2 6\n3 3", expected: "[0, 1]" }
];
const testCasesByTitle: Record<string, TestCase[]> = {
  "Two Sum": defaultCases,
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

type Result = { status: string; stdout: string; stderr: string; compile_output: string; message: string; time?: string | null; memory?: number | null };

export default function CompilerPage() {
  const [problemId, setProblemId] = useState("");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState(starterCode.Java);
  const [testCases, setTestCases] = useState<TestCase[]>(defaultCases);
  const [activeCase, setActiveCase] = useState(0);
  const [bottomTab, setBottomTab] = useState<"testcase" | "result">("testcase");
  const [output, setOutput] = useState("Run your code to see the result here.");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("problem") || "";
    setProblemId(id);
    const found = roadmap.flatMap((section) => section.problems).find((item) => item.id === id) || null;
    setProblem(found);
    if (found) {
      setTestCases(testCasesByTitle[found.title] || defaultCases);
      setCode(problemStarterCode[found.title]?.Java || starterCode.Java);
    }
  }, []);

  const currentCase = testCases[activeCase] || defaultCases[0];
  const problemNumber = problem ? Number(problem.id.split("-").pop()) : 1;
  const practiceLabel = useMemo(() => problem?.links[0]?.label || "Practice", [problem]);

  const changeLanguage = (value: string) => {
    setLanguage(value);
    setCode(problem ? problemStarterCode[problem.title]?.[value] || starterCode[value] : starterCode[value]);
    setResult(null);
    setOutput("Run your code to see the result here.");
    setBottomTab("testcase");
  };

  const updateCase = (field: keyof TestCase, value: string) => {
    setTestCases((items) => items.map((item, index) => index === activeCase ? { ...item, [field]: value } : item));
  };

  const runCode = async () => {
    setRunning(true);
    setBottomTab("result");
    setResult(null);
    setOutput("Compiling and running…");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, source_code: code, stdin: currentCase.input })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Compiler request failed.");
      setResult(data);
      setOutput(data.compile_output || data.stderr || data.stdout || data.message || "Program finished with no output.");
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Could not connect to the compiler service.");
    } finally {
      setRunning(false);
    }
  };

  return <main className="lcApp">
    <header className="lcTopbar">
      <Link href="/" className="lcLogo"><span>◈</span> A2Z</Link>
      <nav><Link href="/">Explore</Link><Link href="/#roadmap">Problems</Link><Link href="/">Contest</Link><Link href="/">Discuss</Link><Link href="/">Interview⌄</Link><Link href="/" className="lcStore">Store⌄</Link></nav>
      <div className="lcSearch">⌕ <span>Search problems, solutions, and more...</span></div>
      <div className="lcTopActions"><span>🔥 0</span><span>♡</span><span>♧</span><span className="lcAvatar">C</span><button>Premium</button></div>
    </header>

    <div className="lcWorkspace">
      <section className="lcLeftPane">
        <div className="lcDescriptionTabs"><button className="active">▣ Description</button><button>▱ Editorial</button><button>♙ Solutions</button><button>ↄ Submissions</button></div>
        <div className="lcDescriptionScroll">
          <div className="lcTitleRow"><div><h1>{problemNumber}. {problem?.title || "Practice Problem"}</h1><div className="lcBadges"><span className={`lcDifficulty ${problem?.difficulty?.toLowerCase() || "easy"}`}>{problem?.difficulty || "Easy"}</span><span>◇ Topics</span><span>♧ Companies</span><span>♧ Hint</span></div></div><span className="lcSolved">Solved ✓</span></div>
          <div className="lcDescriptionText">
            <p>{problem?.description || "Practice this DSA problem by identifying the pattern and implementing an efficient solution."}</p>
            <p>You are given a programming problem. Read the requirements carefully, handle all valid inputs, and return the required result.</p>
            <p>Focus on correctness first, then improve the time and space complexity.</p>
            <h3>Example 1:</h3><pre><b>Input:</b> {currentCase.input.replace(/\n/g, ", ")}\n<b>Output:</b> {currentCase.expected}</pre>
            <h3>Example 2:</h3><pre><b>Input:</b> {testCases[1]?.input.replace(/\n/g, ", ")}\n<b>Output:</b> {testCases[1]?.expected}</pre>
            <h3>Example 3:</h3><pre><b>Input:</b> {testCases[2]?.input.replace(/\n/g, ", ")}\n<b>Output:</b> {testCases[2]?.expected}</pre>
            <h3>Constraints:</h3><ul><li>Inputs satisfy the stated problem constraints.</li><li>Return the required result for every valid test case.</li><li>Avoid unnecessary time and memory usage.</li></ul>
            {problem?.links.length ? <div className="lcOfficialLink"><a href={problem.links[0].url} target="_blank" rel="noreferrer">Open {practiceLabel} ↗</a></div> : null}
          </div>
        </div>
        <div className="lcEngagement">♡ 70.1K　♧　　◯ 2.1K　　☆　　↗　　•••</div>
      </section>

      <section className="lcRightPane">
        <div className="lcRunbar"><button className="lcRun" onClick={runCode} disabled={running}>▶　{running ? "Running" : "Run"}</button><button className="lcSubmit" onClick={runCode} disabled={running}>☁　Submit</button><button className="lcSquare">□</button></div>
        <div className="lcEditorToolbar"><label><select value={language} onChange={(e) => changeLanguage(e.target.value)}><option>Java</option><option>C++</option><option>Python</option></select></label><span>♙ Auto</span><div className="lcTools">ⓘ　♧　{}　↶　⚙　↗</div></div>
        <textarea className="lcEditor" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Code editor" />
        <div className="lcBottomPanel">
          <div className="lcBottomTabs"><button className={bottomTab === "testcase" ? "active" : ""} onClick={() => setBottomTab("testcase")}>◉ Testcase</button><button className={bottomTab === "result" ? "active" : ""} onClick={() => setBottomTab("result")}>ↄ Test Result</button></div>
          {bottomTab === "testcase" ? <><div className="lcCaseTabs">{testCases.map((_, index) => <button key={index} className={activeCase === index ? "active" : ""} onClick={() => setActiveCase(index)}>Case {index + 1}</button>)}<button>＋</button></div><div className="lcCaseInputs"><label>Input<textarea value={currentCase.input} onChange={(e) => updateCase("input", e.target.value)} spellCheck={false} /></label><label>Expected output<textarea value={currentCase.expected} onChange={(e) => updateCase("expected", e.target.value)} spellCheck={false} /></label></div></> : <div className="lcResult"><div className="lcResultStatus">{result?.status || (running ? "Running…" : "Test Result")}</div><pre>{output}</pre>{result?.time && <small>Runtime {result.time}s · Memory {result.memory || 0} KB</small>}</div>}
          <div className="lcSource">&lt;/&gt; Source</div>
        </div>
      </section>
    </div>
  </main>;
}
