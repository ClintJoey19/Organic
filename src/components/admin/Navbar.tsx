import Image from "next/image";
import AdminAuth from "./AdminAuth";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <section className="fixed bg-white top-0 right-0 w-full h-[8vh] border-b shadow-sm px-4 z-50">
      <nav className="w-full h-full flex justify-between items-center">
        <div className="flex gap-x-1 items-center">
          <MobileNavbar />
          <Image src="/logo.svg" alt="logo" width={35} height={35} />
          <p className="text-xl font-semibold">Organic</p>
        </div>
        <div className="h-full flex items-center">
          <AdminAuth />
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
