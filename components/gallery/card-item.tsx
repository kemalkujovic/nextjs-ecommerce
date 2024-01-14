"use client";
import { Card, CardContent } from "../ui/card";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Billboard } from "@/types";
import LoadingSkeleton from "../loading-skeleton";
import { Button } from "../ui/button";

type CardProps = {
  billboard: string;
  category: string;
};

const CardItem = ({ billboard, category }: CardProps) => {
  const [billboards, setBillboards] = useState<Billboard>();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`/api/billboards/edit/${billboard}`);
      setBillboards(data.data);
    };
      fetchData();
  }, [billboard]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(billboards)
  const baseUrl = "https://kemal-web-storage.s3.eu-north-1.amazonaws.com";

  return (
    <Card>
      <CardContent className="flex aspect-square justify-center relative ">
        {billboards?.imageURL ? (
          <>
          <Image
            src={`${baseUrl}/${billboards?.imageURL}`}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
            }}
            fill
            alt="Image"
            sizes="any"
          />
          <div className="absolute left-8 bottom-8 flex gap-2 flex-col w-24">
          <p className="text-black font-bold text-2xl">
            {category[0].toUpperCase() + category.slice(1)}
          </p>
          <Button>Shop</Button>
        </div>
        </>
        ) : (
          <LoadingSkeleton />
          )}
          </CardContent>
        
        
    </Card>
  );
};

export default CardItem;
