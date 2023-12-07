"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner";
import Image from "next/image";

const Billboard = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["billboard"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/billboards/`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{
          backgroundImage: `url('${baseUrl}/${data[1].imageURL}')`,
        }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data[0].billboard}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
