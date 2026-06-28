import type { ReactElement } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default function GirisPage(): ReactElement {
  return <LoginForm />;
}
