import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export const GithubIcon = (props: IconProps) => <Icon {...props}><path d="M9 19c-4.2 1.4-4.2-2.1-5.9-2.8M14.9 21v-3.4a3.3 3.3 0 0 0-.9-2.6c3 0 6.1-1.5 6.1-6.5a5 5 0 0 0-1.3-3.5 4.6 4.6 0 0 0-.1-3.5s-1.1-.4-3.6 1.3a12.3 12.3 0 0 0-6.5 0C6.1 1.1 5 1.5 5 1.5a4.6 4.6 0 0 0-.1 3.5 5 5 0 0 0-1.3 3.5c0 5 3.1 6.5 6.1 6.5a3.3 3.3 0 0 0-.9 2.6V21" /></Icon>;
export const LinkedinIcon = (props: IconProps) => <Icon {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Icon>;
export const DiscordIcon = (props: IconProps) => <Icon {...props}><path d="M19.5 5.2A16.7 16.7 0 0 0 15.4 4l-.5 1.1a15.4 15.4 0 0 0-5.8 0L8.6 4a16.7 16.7 0 0 0-4.1 1.2C1.9 9.1 1.2 13 1.5 16.8A16.8 16.8 0 0 0 6.6 19l1.2-1.6a10.3 10.3 0 0 1-1.9-.9l.5-.4a11.8 11.8 0 0 0 11.2 0l.5.4a10.3 10.3 0 0 1-1.9.9l1.2 1.6a16.8 16.8 0 0 0 5.1-2.2c.4-4.4-.7-8.3-3-11.6Z" /><circle cx="8.5" cy="12.5" r="1" /><circle cx="15.5" cy="12.5" r="1" /></Icon>;
export const MediumIcon = (props: IconProps) => <Icon {...props}><path d="M4 7.2h16M4 16.8h16M5.5 6v12M18.5 6v12M9.5 8.5v7M14.5 8.5v7" /></Icon>;
export const MailIcon = (props: IconProps) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></Icon>;
export const HuggingFaceIcon = (props: IconProps) => <Icon {...props}><circle cx="8" cy="10" r="1" /><circle cx="16" cy="10" r="1" /><path d="M6 15c1.6 2 10.4 2 12 0M4 5.5C6.5 3.7 17.5 3.7 20 5.5" /></Icon>;
export const HomeIcon = (props: IconProps) => <Icon {...props}><path d="m3 10 9-7 9 7v10H3z" /><path d="M9 21v-7h6v7" /></Icon>;
export const FolderIcon = (props: IconProps) => <Icon {...props}><path d="M3 6.5h7l2 2h9v10H3z" /></Icon>;
export const BookIcon = (props: IconProps) => <Icon {...props}><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 0z" /><path d="M5 4v16M8 20a3 3 0 0 1 3-3h8" /></Icon>;
export const ImageIcon = (props: IconProps) => <Icon {...props}><rect x="3" y="4" width="18" height="16" rx="1" /><circle cx="8" cy="9" r="1.5" /><path d="m4 17 5-5 4 4 2-2 5 5" /></Icon>;
export const MessageIcon = (props: IconProps) => <Icon {...props}><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.4-.7L4 20l1.4-3.5A7.4 7.4 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></Icon>;
export const SettingsIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V6.4H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V15h-.1a1.7 1.7 0 0 0-1.5 0Z" /></Icon>;
export const ArrowUpRightIcon = (props: IconProps) => <Icon {...props}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Icon>;
export const ExternalIcon = (props: IconProps) => <Icon {...props}><path d="M14 5h5v5M19 5l-8 8" /><path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" /></Icon>;
