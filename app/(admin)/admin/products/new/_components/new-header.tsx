import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const NewHeader = () => {
  return (
    <div className="flex justify-center items-center mt-3">
      <form className="grid grid-cols-3 gap-4 w-full p-4">
        <div className="col-span-3 flex items-center">
          <div className="justify-start flex flex-col gap-4">
            <label htmlFor="image" className="font-semibold">
              Add Product Image
            </label>

            {true && (
              <Image
                src="https://kemal-web-storage.s3.eu-north-1.amazonaws.com/image.jpg"
                alt="Preview"
                width={100}
                height={100}
                className="rounded-sm"
              />
            )}
            <Input type="file" id="image" name="image" required />
          </div>
        </div>

        <div className="col-span-1 ">
          <label htmlFor="name" className="font-semibold mb-5">
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter Product name"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="price" className="font-semibold">
            Price
          </label>
          <Input
            type="number"
            id="price"
            min={1}
            name="price"
            required
            placeholder="Enter Product price"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <Input
            type="text"
            id="description"
            name="description"
            required
            placeholder="Enter Product description"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="category" className="font-semibold">
            Category
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            name="category"
            id="category"
          >
            <option value="MAN">MAN</option>
            <option value="WOMEN">WOMEN</option>
          </select>
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <div>
            <input type="checkbox" id="isFeatured" name="isFeatured" />
          </div>
          <div className="space-y-1 leading-none">
            <p className="font-semibold">Featured</p>
            <div>This product will appear on the home page</div>
          </div>
        </div>

        <div className="col-span-3">
          <Button className="mt-2 bg-green-600">Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default NewHeader;
