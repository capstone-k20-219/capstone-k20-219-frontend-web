// Assets
import Logo from "../../img/logo-white.png";

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
        <div className="Header w-[1160px] px-16 py-5 left-[280px] top-0  bg-white border-b border-gray-200 justify-center items-center inline-flex">
          <div className="Container grow shrink basis-0 self-stretch justify-between items-center inline-flex">
            <div className="Frame100 justify-start items-center flex">
              <div className="Thu12102023122432 text-zinc-500 text-sm font-medium ">
                Thu 12/10/2023 12:24:32
              </div>
            </div>
            <div className="RightContent flex-col justify-start items-center gap-4 inline-flex">
              <div className="Profile justify-start items-center gap-3 inline-flex">
                <img
                  className="Ellipse2 w-12 h-12 rounded-full"
                  src="https://via.placeholder.com/48x48"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
