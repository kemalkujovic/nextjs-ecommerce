import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddProduct = () => {
  return (
    <div className="flex justify-center items-center mt-5  ">
      <form className="flex flex-col gap-y-2 min-w-[700px] border p-4 ">
        <label htmlFor="name">Enter Product Name</label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter Product name"
        />
        <label htmlFor="price">Enter Product Price</label>
        <Input
          type="number"
          id="price"
          name="price"
          required
          placeholder="Enter Product price"
        />
        <label htmlFor="description">Enter Product Description</label>
        <Input
          type="text"
          id="description"
          name="description"
          required
          placeholder="Enter Product description"
        />
        <label htmlFor="category">Choose a category</label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          name="category"
          id="category"
        >
          <option>MAN</option>
          <option>WOMEN</option>
        </select>
        <label htmlFor="image">Add Product Image</label>
        <Input
          type="file"
          id="image"
          name="image"
          required
          placeholder="Enter Product image"
        />
        <Button className="mt-2 bg-green-600">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;
