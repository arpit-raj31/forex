import React from 'react';
import CountUp from 'react-countup';

const StatCard = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-lg bg-[#F5F3FF] p-6 shadow-sm w-[482px] h-[195px]"> {/* Adjust width and height */}
      <div className="mb-3 flex items-center gap-2 text-sm text-black">
        <Icon className="size-6" />
        <span className="text-base font-medium" >{label}</span>
      </div>
      <div className="rounded-md bg-[#2a1266] px-4 py-3 text-white h-[60%] flex items-center justify-center">
        <h3 className="text-xl">
          <CountUp
            start={0}
            end={parseFloat(value.replace(/[^0-9.-]+/g, ""))} // Remove any non-numeric characters
            duration={2} // Adjust the duration as necessary
            prefix="$"
            separator=","
            decimals={2}
          />
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
