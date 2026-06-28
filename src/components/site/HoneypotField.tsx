import type { ReactElement } from "react";

/**
 * Spam koruması — ekran dışı gizli alan. Gerçek kullanıcı görmez/doldurmaz;
 * botlar doldurursa sunucu tarafında talep sessizce yok sayılır.
 * FormData'da `name="website"` olarak okunur.
 */
export function HoneypotField(): ReactElement {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" tabIndex={-1}>
      <label>
        Web siteniz
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
