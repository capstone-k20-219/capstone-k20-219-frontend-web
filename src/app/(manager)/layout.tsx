// Assets
import Logo from "../../img/logo-white.png";

// Libraries
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-dvh relative bg-stone-50">
      {/* sidebar */}
      <div className="w-64 h-full bg-neutral-900 flex flex-col">
        <div className="flex justify-center items-center w-full h-20 border border-b-zinc-800">
          <Image
            src={Logo}
            alt="Logo"
            id="logo"
            className="h-9 aspect-[116.49/36]"
          />
        </div>
        <div className="w-full">
          <div className="MenuItem1 h-[59px] pr-[124px] pt-3.5 pb-[13px] left-0 top-0 justify-start items-center gap-8 inline-flex">
            <div className="Indicator w-1 h-8 bg-white" />
            <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
              <div className="DashboardIcon w-6 h-6 relative">
                <div className="Group w-[20.29px] h-[21.29px] left-[2px] top-[1px] "></div>
              </div>
              <div className="Dashboard text-white text-base font-medium ">
                Dashboard
              </div>
            </div>
          </div>
          <div className="MenuItem2 pl-9 pr-[133px] pt-[18px] pb-[17px] left-0 top-[59px]  justify-start items-center inline-flex">
            <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
              <div className="Employees1 w-6 h-6 relative" />
              <div className="Employee text-neutral-500 text-base font-medium ">
                Employee
              </div>
            </div>
          </div>
          <div className="MenuItem3 w-[280px] pl-9 pr-[174px] pt-[18px] pb-[17px] left-0 top-[118px]  justify-start items-center inline-flex">
            <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
              <div className="Map1 w-6 h-6 relative">
                <div className="Group w-6 h-[18.46px] left-[-0px] top-[21.23px] "></div>
              </div>
              <div className="Map text-neutral-500 text-base font-medium ">
                Map
              </div>
            </div>
          </div>
          <div className="MenuItem4 pl-9 pr-[113px] pt-[18px] pb-[17px] left-0 top-[177px]  justify-start items-center inline-flex">
            <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
              <div className="Cars1 w-6 h-6 relative">
                <div className="Group w-6 h-[15.37px] left-[0.01px] top-[19.69px] "></div>
              </div>
              <div className="VehicleType text-neutral-500 text-base font-medium ">
                Vehicle type
              </div>
            </div>
          </div>
          <div className="MenuItem5 w-[280px] pl-9 pr-[150px] pt-[18px] pb-[17px] left-0 top-[236px]  justify-start items-center inline-flex">
            <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
              <div className="CustomerSupport1 w-6 h-6 relative">
                <div className="Group w-6 h-6 left-[0.05px] top-[24px] "></div>
              </div>
              <div className="Service text-neutral-500 text-base font-medium ">
                Service
              </div>
            </div>
          </div>
          <div className="Group116 w-[280px] h-[136px] left-0 top-[311px] ">
            <div className="MenuItem7 w-[280px] h-[60px] pl-9 pr-[172px] py-[18px] left-0 top-[16px]  justify-start items-center inline-flex">
              <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
                <div className="MaterialSymbolsHelpOutline w-6 h-6 relative" />
                <div className="Help text-neutral-500 text-base font-medium ">
                  Help
                </div>
              </div>
            </div>
            <div className="MenuItem8 w-[280px] h-[60px] pl-9 pr-36 py-[18px] left-0 top-[76px]  justify-start items-center inline-flex">
              <div className="MenuItem self-stretch justify-center items-center gap-3 inline-flex">
                <div className="IconsaxLinearSetting2 w-6 h-6 relative" />
                <div className="Settings text-neutral-500 text-base font-medium ">
                  Settings
                </div>
              </div>
            </div>
            <div className="Line1 w-[232px] h-[0px] left-[24px] top-0  border border-zinc-800"></div>
          </div>
        </div>
      </div>
      {/* header */}
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
  );
}
