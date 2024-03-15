import { Dispatch, SetStateAction } from "react";
import { FiMenu } from "react-icons/fi";
import HeaderMenu from "./HeaderMenu";
import HeaderTimer from "./HeaderTimer";

export default function Header({
  setOpenSidebar,
  setWidthSidebar,
}: {
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  setWidthSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const handleMenuButton = () => {
    if (window.innerWidth < 768) {
      setOpenSidebar(true);
      setWidthSidebar(true);
    } else {
      setWidthSidebar((prev) => !prev);
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full px-4 py-2 bg-white shadow-md">
      <div className="w-full items-center flex">
        <FiMenu
          style={{ width: 24, height: 24 }}
          className="mr-4 cursor-pointer"
          onClick={handleMenuButton}
        />
        <HeaderTimer />
        <HeaderMenu />
      </div>
    </div>
  );
}
