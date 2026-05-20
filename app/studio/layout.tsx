// Bare layout for the embedded studio — bypasses the landing page's
// dark theme and Inter font, lets Sanity Studio render with its own UI.
export const dynamic = "force-static";

export const metadata = {
  title: "Archer LP — Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
