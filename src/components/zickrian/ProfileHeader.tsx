import ImageWithFallback from "../ImageWithFallback";
import { DiscordIcon, GithubIcon, HuggingFaceIcon, LinkedinIcon, MailIcon, MediumIcon } from "./icons";
import type { SocialLink } from "./types";

const socials: Array<SocialLink & { icon: typeof GithubIcon }> = [
  { label: "GitHub", href: "https://github.com/Vanszs", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bevantyo-satria-pinandhita/", icon: LinkedinIcon },
  { label: "Discord", href: "https://discord.com", icon: DiscordIcon },
  { label: "Medium", href: "https://medium.com", icon: MediumIcon },
  { label: "Email", href: "mailto:admin@bevansatria.my.id", icon: MailIcon },
  { label: "Hugging Face", href: "https://huggingface.co", icon: HuggingFaceIcon },
];

export default function ProfileHeader() {
  return (
    <header className="zickrian-profile">
      <div className="zickrian-banner">
        <ImageWithFallback src="/images/zickrian/bannerfield.webp" alt="Profile Banner" width={1440} height={810} />
        <span className="zickrian-scanlines" aria-hidden="true" />
      </div>
      <div className="zickrian-profile-body">
        <div className="zickrian-profile-topline">
          <ImageWithFallback className="zickrian-portrait" src="/images/image.png" alt="Portrait of Bevantyo Satria Pinandhita" width={128} height={192} />
          <a className="zickrian-star" href="https://github.com/Vanszs" target="_blank" rel="noreferrer" aria-label="GitHub profile for Bevantyo Satria Pinandhita"><span>★</span> GitHub</a>
        </div>
        <div className="zickrian-name-row">
          <h1>Bevantyo Satria Pinandhita</h1>
          <div className="inline-flex items-center gap-1 sm:gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width={22} height={22} className="zickrian-badge-svg" aria-label="Verified profile" role="img">
              <defs>
                <linearGradient id="x_gold_paint0" x1="4" y1="1.5" x2="19.5" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F4E72A" />
                  <stop offset="0.539" stopColor="#CD8105" />
                  <stop offset="0.68" stopColor="#CB7B00" />
                  <stop offset="1" stopColor="#F4EC26" />
                </linearGradient>
                <linearGradient id="x_gold_paint1" x1="5" y1="2.5" x2="17.5" y2="19.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F9E87F" />
                  <stop offset="0.406" stopColor="#E2B719" />
                  <stop offset="0.989" stopColor="#E2B719" />
                </linearGradient>
              </defs>
              <g>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.596 3.011L11 .5 8.404 3.011l-3.576-.506-.624 3.558-3.19 1.692L2.6 11l-1.586 3.245 3.19 1.692.624 3.558 3.576-.506L11 21.5l2.596-2.511 3.576.506.624-3.558 3.19-1.692L19.4 11l1.586-3.245-3.19-1.692-.624-3.558-3.576.506z" fill="url(#x_gold_paint0)" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.348 3.772L11 1.5 8.651 3.772l-3.235-.458-.565 3.219-2.886 1.531L3.4 11l-1.435 2.936 2.886 1.531.565 3.219 3.235-.458L11 20.5l2.348-2.272 3.236.458.564-3.219 2.887-1.531L18.6 11l1.435-2.936-2.887-1.531-.564-3.219-3.236.458z" fill="url(#x_gold_paint1)" />
                <path d="M9.662 15.65 6.233 12.22l1.414-1.414 2.015 2.015 4.336-4.73 1.47 1.348-5.806 6.21z" fill="#D18800" />
                <path d="M9.662 14.85 6.233 11.42l1.414-1.414 2.015 2.015 4.336-4.73 1.47 1.348-5.806 6.21z" fill="#000000" />
              </g>
            </svg>
          </div>
        </div>
        <p className="zickrian-handle">@bevan</p>
        <p className="zickrian-bio">I'm Bevan, an AI/ML Engineer, Full-Stack Developer, and Autonomous Systems Specialist based in Surabaya, Indonesia. I build practical systems across machine learning, robotics, blockchain, web, and mobile.</p>
        <div className="zickrian-meta"><span>AI/ML Engineer</span><span>Surabaya, Indonesia</span><a href="https://bevansatria.my.id">bevansatria.my.id</a></div>
        <div className="zickrian-socials" aria-labelledby="social-links-heading">
          <h2 id="social-links-heading" className="sr-only">Social links</h2>
          {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="zickrian-social" aria-label={label}><Icon width={18} height={18} /></a>)}
        </div>
      </div>
    </header>
  );
}
