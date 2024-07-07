import { formatPrice } from "@/lib/utils";
import React from "react";

interface CardAnalyticsProps {
  label: string;
  isMoney?: boolean;
  getValue: () => Promise<number | undefined>;
  iconLabel: React.ReactNode;
}

const CardAnalytics = async ({
  label,
  isMoney,
  getValue,
  iconLabel,
}: CardAnalyticsProps) => {
  const value = (await getValue()) || 0;
  const valueFormat = isMoney ? formatPrice(value) : value?.toLocaleString();
  return (
    <div className="border border-slate-300 rounded-md p-4 shadow-md flex justify-between gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-primary">{label}</p>
        <p className="text-2xl font-semibold">{valueFormat}</p>
      </div>
      {iconLabel}
    </div>
  );
};

export default CardAnalytics;
