export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-[80%] overflow-scroll">{children}</div>;
}
