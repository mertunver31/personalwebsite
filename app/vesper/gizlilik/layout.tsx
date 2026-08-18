import { PolicyShell } from "../PolicyShell";

export default function GizlilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PolicyShell lang="tr">{children}</PolicyShell>;
}
