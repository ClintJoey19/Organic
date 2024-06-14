import UserForm from "@/components/onboarding/UserForm";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const page = async () => {
  const user = await currentUser();
  console.log(user);

  return (
    <div className="max-w-[1220px] h-screen grid grid-cols-1 md:grid-cols-2 place-content-center gap-4">
      <div className="relative max-md:hidden">
        <Image src={"/onboarding.svg"} alt="onboarding" fill />
      </div>
      <div className="flex flex-col p-2">
        <h2 className="page-title mb-4">Onboarding</h2>
        <div className="w-full flex flex-col items-center mb-4">
          <p className="text-lg font-semibold">Welcome to Organic</p>
          <p className="text-sm text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit,
            quidem.
          </p>
        </div>
        <div className="">
          <UserForm />
        </div>
      </div>
    </div>
  );
};

export default page;
