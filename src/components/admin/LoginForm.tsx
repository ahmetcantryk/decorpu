"use client";

import { useState, useTransition, type FormEvent, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { fieldCls } from "./form";

export function LoginForm(): ReactElement {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  function submit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setError(null);
    start(async () => {
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setError("E-posta veya şifre hatalı.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-line bg-surface p-7 shadow-soft">
      <div className="mb-6 text-center">
        <span className="font-display text-2xl font-semibold">
          <span className="text-ink">Decor</span>
          <span className="text-accent">PU</span>
        </span>
        <p className="mt-2 text-sm text-muted">Yönetim paneline giriş</p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">E-posta</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus className={fieldCls} placeholder="ornek@firma.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-soft">Şifre</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={fieldCls} placeholder="••••••••" />
        </div>
        {error ? <p className="text-sm text-accent">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Giriş yapılıyor…" : "Giriş yap"}
        </Button>
      </form>
    </div>
  );
}
