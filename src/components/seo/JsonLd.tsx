import type { ReactElement } from "react";

/** schema.org JSON-LD enjekte eden sunucu bileşeni. data güvenilir (bizim ürettiğimiz) içeriktir. */
export function JsonLd({ data }: { data: Record<string, unknown> }): ReactElement {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
