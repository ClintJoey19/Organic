import Image from "next/image";
import UserAuth from "./UserAuth";
import Navlinks from "./Navlinks";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <section className="h-[8vh] w-full p-4 border-b bg-white shadow-sm flex items-center justify-between fixed top-0 right-0 z-50">
      <div className="flex gap-x-2 items-center">
        <div>
          <MobileNavbar />
        </div>
        <div className="flex gap-x-1 items-center">
          <Image src="/logo.svg" alt="logo" width={35} height={35} />
          <p className="text-xl font-semibold">Organic</p>
        </div>
      </div>
      <nav className="max-md:hidden">
        <Navlinks direction="horizontal" />
      </nav>
      <div>
        <UserAuth />
      </div>
    </section>
  );
};

export default Navbar;
