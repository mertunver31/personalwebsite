import { PolicyShell } from "../PolicyShell";

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PolicyShell lang="en">{children}</PolicyShell>;
}
