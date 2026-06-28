import type { ReactNode, ReactElement } from "react";

export default function AuthLayout({ children }: { children: ReactNode }): ReactElement {
  return <div className="flex min-h-screen items-center justify-center bg-bg-subtle px-4 font-sans">{children}</div>;
}
