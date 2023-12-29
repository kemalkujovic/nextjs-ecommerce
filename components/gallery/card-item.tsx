"use client";
import { Card, CardContent } from "../ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Billboard } from "@/types";
import LoadingSkeleton from "../loading-skeleton";

const CardItem = ({ billboard }: any) => {
  const [billboards, setBillboards] = useState<Billboard>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/api/billboards/edit/${billboard}`);
      setBillboards(data.data);
    };

    return () => {
      fetchData();
    };
  }, [billboard]);

  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  return (
    <Card>
      <CardContent className="flex aspect-square justify-center">
        {billboards?.imageURL ? (
          <Image
            src={`${baseUrl}/${billboards?.imageURL}`}
            width={300}
            height={300}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              objectFit: "cover",
            }}
            alt="Image"
          />
        ) : (
          <LoadingSkeleton />
        )}
      </CardContent>
    </Card>
  );
};

export default CardItem;
