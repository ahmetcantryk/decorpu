"use client";

import { useEffect, useState, type ReactElement } from "react";
import { Cookie, X, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { getConsent, setConsent, CONSENT_OPEN_EVENT } from "@/lib/consent";
import { cn } from "@/lib/utils";

type View = "banner" | "settings";

interface ToggleProps {
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  label: string;
}

function Toggle({ checked, onChange, disabled, label }: ToggleProps): ReactElement {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-accent" : "bg-line-strong",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

/**
 * KVKK/çerez onay banner'ı + tercih paneli. Modal değil, ekranın bir köşesini kaplar.
 * Banner: Reddet (sol) · Kabul Et (sağ) · Çerez Ayarları. Panel: kategori bazlı aç/kapa.
 * Footer'daki "Çerez Ayarları" linki CONSENT_OPEN_EVENT ile paneli yeniden açar.
 */
export function CookieConsent(): ReactElement | null {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<View>("banner");
  const [analytics, setAnalytics] = useState(false);
  const [hasPrior, setHasPrior] = useState(false);

  useEffect(() => {
    const prior = getConsent();
    setHasPrior(prior !== null);
    setAnalytics(prior === "accepted");
    if (!prior) setVisible(true); // ilk ziyaret → banner göster

    function onOpen(): void {
      const current = getConsent();
      setHasPrior(current !== null);
      setAnalytics(current === "accepted");
      setView("settings");
      setVisible(true);
    }
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  function commit(value: "accepted" | "rejected"): void {
    setConsent(value);
    setHasPrior(true);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t(view === "settings" ? "settingsTitle" : "title")}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-sm sm:p-0"
    >
      <div className="max-h-[85vh] overflow-y-auto rounded-xl border border-line bg-surface p-4 shadow-pop sm:p-5">
        {view === "banner" ? (
          <div className="flex items-start gap-3">
            <span className="hidden size-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent sm:flex">
              <Cookie className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{t("title")}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t("body")}{" "}
                <Link href="/cerez-politikasi" className="text-accent underline-offset-2 hover:underline">
                  {t("learnMore")}
                </Link>
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => commit("rejected")} className="flex-1">
                  {t("reject")}
                </Button>
                <Button size="sm" onClick={() => commit("accepted")} className="flex-1">
                  {t("accept")}
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setView("settings")}
                className="mt-2.5 block w-full text-center text-xs text-muted underline-offset-2 transition-colors hover:text-accent hover:underline"
              >
                {t("customize")}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2">
              {hasPrior ? (
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  aria-label={t("close")}
                  className="ml-auto order-2 flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg-subtle hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setView("banner")}
                  aria-label={t("back")}
                  className="flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-bg-subtle hover:text-ink"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}
              <p className="order-1 text-sm font-semibold text-ink">{t("settingsTitle")}</p>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-muted">{t("settingsIntro")}</p>

            <ul className="mt-3 space-y-2.5">
              <li className="flex items-start justify-between gap-3 rounded-lg border border-line bg-bg-subtle/50 p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{t("necessary")}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{t("necessaryDesc")}</p>
                </div>
                <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-line px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                  {t("alwaysOn")}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3 rounded-lg border border-line p-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{t("analytics")}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{t("analyticsDesc")}</p>
                </div>
                <div className="mt-0.5">
                  <Toggle checked={analytics} onChange={setAnalytics} label={t("analytics")} />
                </div>
              </li>
            </ul>

            <div className="mt-4 flex flex-col gap-2">
              <Button size="sm" onClick={() => commit(analytics ? "accepted" : "rejected")}>
                {t("save")}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAnalytics(true);
                  commit("accepted");
                }}
              >
                {t("acceptAll")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
