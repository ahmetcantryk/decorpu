import { routing, type Locale } from "@/i18n/routing";

/**
 * Herkese açık sayfaların ISR süresi (saniye). Katalog verisi panelden
 * değiştiğinde `revalidatePath` ile anında tazelenir; zaman tabanlı yenileme
 * yalnızca güvenlik ağıdır. 1 gün.
 *
 * NOT: Next, `export const revalidate` değerinin dosyada LİTERAL olmasını ister;
 * bu sabit import edilerek kullanılamaz. Sayfalardaki `86400` bu değerle eş tutulmalı.
 */
export const PUBLIC_REVALIDATE_SECONDS = 86_400;

/** Her locale için verilen parametre listesini çoğaltır (generateStaticParams). */
export function withLocales<T extends Record<string, string>>(items: readonly T[]): (T & { locale: Locale })[] {
  return routing.locales.flatMap((locale) => items.map((item) => ({ ...item, locale })));
}
