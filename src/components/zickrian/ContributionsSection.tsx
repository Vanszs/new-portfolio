import { GithubIcon } from "./icons";

export default function ContributionsSection() {
  const cells = Array.from({ length: 52 }, (_, index) => (index * 7) % 5);
  return <section className="zickrian-contributions" aria-labelledby="contributions-title"><h2 id="contributions-title">GitHub Contributions</h2><div className="zickrian-contribution-box"><div className="zickrian-contribution-grid" aria-label="GitHub contribution activity placeholder">{cells.map((level, index) => <i className={`level-${level}`} key={index} />)}</div><div className="zickrian-contribution-footer"><a href="https://github.com/Vanszs" target="_blank" rel="noreferrer"><GithubIcon width={16} height={16} /> GitHub</a><span>Less <i className="level-0" /> <i className="level-2" /> <i className="level-4" /> More</span></div></div></section>;
}
