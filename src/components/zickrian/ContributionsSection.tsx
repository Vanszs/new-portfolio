import React from "react";
import { GithubIcon } from "./icons";

export default function ContributionsSection() {
  // 52 weeks * 7 days = 364 days with varied contribution density
  const weeks = Array.from({ length: 52 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      // Deterministic realistic contribution pattern
      const pseudo = (Math.sin(w * 12.9898 + d * 78.233) * 43758.5453) % 1;
      const val = Math.abs(pseudo);
      if (val > 0.82) return 4;
      if (val > 0.65) return 3;
      if (val > 0.45) return 2;
      if (val > 0.25) return 1;
      return 0;
    });
  });

  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  return (
    <section
      id="github"
      className="zickrian-section zickrian-contributions"
      aria-labelledby="contributions-title"
    >
      <h2 id="contributions-title" className="sr-only">
        GitHub Contributions
      </h2>
      <div className="zickrian-gh-wrap">
        <div className="zickrian-gh-chart-scroll">
          <div className="zickrian-gh-chart">
            <div className="zickrian-gh-months" aria-hidden="true">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div className="zickrian-gh-grid" role="img" aria-label="GitHub contribution heatmap">
              {weeks.map((week, wi) => (
                <div key={wi} className="zickrian-gh-col">
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="zickrian-gh-cell"
                      data-level={level}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="zickrian-gh-footer">
          <div className="zickrian-gh-summary">
            <span>1,842 contributions on </span>
            <a
              href="https://github.com/Vanszs"
              target="_blank"
              rel="noopener noreferrer"
              className="zickrian-gh-link"
            >
              GitHub
            </a>
            .
          </div>
          <div className="zickrian-gh-legend" aria-hidden="true">
            <span>Less</span>
            <div className="zickrian-gh-cell" data-level="0" />
            <div className="zickrian-gh-cell" data-level="1" />
            <div className="zickrian-gh-cell" data-level="2" />
            <div className="zickrian-gh-cell" data-level="3" />
            <div className="zickrian-gh-cell" data-level="4" />
            <span>More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
