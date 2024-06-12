export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-8 w-3/4 min-h-screen">{children}</div>
  );
}
