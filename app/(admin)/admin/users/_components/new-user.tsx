"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const NewUser = () => {
  const setAdminStatus = async (email: string) => {
    try {
      const emails = {
        email: email,
      };
      const response = await axios.post("/api/clerk/users", emails);

      console.log(response);
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <>
      <form>
        <div className="flex gap-4 max-md:flex-col">
          <div>
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <Input
              type="text"
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="name"
              size={30}
              disabled
            />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <Input
              className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="email"
              size={30}
              disabled
            />
          </div>
          <div>
            <label htmlFor="role" className="font-semibold">
              Role
            </label>
            <select
              className="flex h-10 w-72 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-md:w-full"
              name="role"
              id="role"
            >
              <option value="">User</option>
              <option value="">Admin</option>
            </select>
          </div>
        </div>
        <Button type="submit" className="mt-4 bg-green-600" variant="default">
          Create
        </Button>
      </form>
    </>
  );
};

export default NewUser;
