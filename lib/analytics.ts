type EventName =
  | "cta_click"
  | "secondary_cta_click"
  | "form_submit"
  | "form_error"
  | "scroll_depth"
  | "exit_intent_shown"
  | "exit_intent_dismissed";

type Props = Record<string, string | number | boolean | undefined>;

export function track(event: EventName, props: Props = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: Array<Record<string, unknown>>;
    plausible?: (e: string, opts?: { props?: Props }) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...props });
  w.plausible?.(event, { props });

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props);
  }
}
