"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { ScanLine, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Taranan değerden ürün kodunu çıkarır (URL ise /urun/<kod> kısmından, değilse ham). */
function extractCode(raw: string): string {
  const v = raw.trim();
  const m = v.match(/\/urun\/([^/?#]+)/i);
  const code = m ? m[1] : v;
  try {
    return decodeURIComponent(code).toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

export function Scanner(): ReactElement {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const [scanning, setScanning] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState("");

  function stop(): void {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setScanning(false);
  }

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "BarcodeDetector" in window);
    return () => stop();
  }, []);

  async function start(): Promise<void> {
    setError(null);
    if (!window.BarcodeDetector) {
      setSupported(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();
      setScanning(true);

      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      const tick = async (): Promise<void> => {
        if (!streamRef.current || !videoRef.current) return;
        try {
          const codes = await detector.detect(videoRef.current);
          if (codes.length) {
            const code = extractCode(codes[0].rawValue);
            stop();
            router.push(`/admin/stok/urun/${encodeURIComponent(code)}`);
            return;
          }
        } catch {
          // tek kare hatası — devam et
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch {
      setError("Kameraya erişilemedi. Tarayıcıdan kamera iznini verin.");
      stop();
    }
  }

  function goManual(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const code = extractCode(manual);
    if (code) router.push(`/admin/stok/urun/${encodeURIComponent(code)}`);
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-ink">
        <video ref={videoRef} playsInline muted className={scanning ? "h-full w-full object-cover" : "hidden"} />
        {!scanning ? (
          <button type="button" onClick={start} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <ScanLine className="size-14 opacity-85" />
            <span className="text-base font-medium">Kodu Tara</span>
            <span className="text-xs text-white/60">Kamerayı açmak için dokun</span>
          </button>
        ) : (
          <>
            <div className="pointer-events-none absolute inset-10 rounded-2xl border-2 border-white/80" />
            <button
              type="button"
              onClick={stop}
              aria-label="Durdur"
              className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-black/50 text-white"
            >
              <X className="size-5" />
            </button>
          </>
        )}
      </div>

      {error ? <p className="mt-3 text-center text-sm text-accent">{error}</p> : null}
      {!supported ? (
        <p className="mt-3 text-center text-xs text-muted">
          Bu tarayıcı kamera taramayı desteklemiyor. Telefonun kamera uygulamasıyla QR'ı okutabilir ya da kodu aşağıdan elle girebilirsin.
        </p>
      ) : null}

      <form onSubmit={goManual} className="mt-5">
        <label className="mb-1.5 block text-xs font-medium text-ink-soft">Veya kodu elle gir</label>
        <div className="flex gap-2">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="örn. PU-1024"
            inputMode="text"
            autoCapitalize="characters"
            className="h-12 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-base uppercase text-ink outline-none transition-colors focus:border-accent"
          />
          <Button type="submit" size="lg">
            Git
          </Button>
        </div>
      </form>
    </div>
  );
}
