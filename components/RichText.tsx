import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { RichText as RichTextValue } from "@/content/types";

const inlineComponents: PortableTextComponents = {
  // For inline use (inside an existing heading / paragraph), unwrap the
  // block-level paragraph that PortableText emits by default. The surrounding
  // element (h1 / h2 / p) supplies the typography.
  block: {
    normal: ({ children }) => <>{children}</>,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => <strong>{children}</strong>,
  },
};

const blockComponents: PortableTextComponents = {
  // For body-copy use where PortableText controls the paragraph wrapping.
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: inlineComponents.marks,
};

type Props = {
  value: RichTextValue | undefined | null;
  mode?: "inline" | "block";
};

// Renders Portable Text. `inline` (default) is right for fields nested inside
// a parent heading/paragraph; `block` wraps in its own <p> for standalone body
// copy.
export default function RichText({ value, mode = "inline" }: Props) {
  if (!value || value.length === 0) return null;
  return (
    <PortableText
      value={value}
      components={mode === "block" ? blockComponents : inlineComponents}
    />
  );
}
