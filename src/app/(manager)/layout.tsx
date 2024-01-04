// Assets
import Logo from "../../img/logo-white.png";
import Header from "./_ui/Header";

// Libraries
import Sidebar from "./_ui/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-dvh relative bg-stone-50 flex">
      {/* sidebar */}
      <Sidebar />
      {/* header */}
      <div className="flex flex-col w-full h-full">
        <Header />
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
