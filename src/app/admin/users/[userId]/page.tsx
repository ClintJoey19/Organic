import SectionHeader from "@/components/admin/SectionHeader";
import { IUsersAdmin } from "@/components/admin/users/UsersTable";
import { getUserById } from "@/lib/actions/user.action";
import { isAdmin } from "@/lib/utils";
import { UserRound } from "lucide-react";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  await isAdmin();

  const id = params.userId;
  const user: IUsersAdmin = await getUserById(id);

  return (
    <section className="p-4 w-full">
      <h2 className="page-title mb-4">
        User <span className="text-slate-500">#{user.clerkId}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <SectionHeader iconLabel={<UserRound />} label="Bio" />
            <div className="bg-slate-200 p-4 rounded-md"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <SectionHeader iconLabel={<UserRound />} label="Bio" />
            <div className="bg-slate-200 p-4 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
