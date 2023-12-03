"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type initialState = {
  email: string;
  isAdmin: string;
  password: string;
  userName: string;
};

const NewUser = () => {
  const router = useRouter();
  const paramas = useParams();
  const categoryId = paramas.userId as string;

  const initialState: initialState = {
    email: "",
    isAdmin: "",
    password: "",
    userName: "",
  };

  const [formData, setFormData] = useState<initialState>(initialState);
  const [errors, setErrors] = useState<initialState>({
    email: "",
    isAdmin: "",
    password: "",
    userName: "",
  });

  //todo: query api call

  useEffect(() => {
    if (categoryId) {
      axios
        .get(`/api/clerk/users/${categoryId}`)
        .then((response) => {
          const categoryData = response.data;

          setFormData(categoryData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [categoryId]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    setErrors({
      email: "",
      isAdmin: "",
      password: "",
      userName: "",
    });

    try {
      if (
        !emailRegex.test(formData.email) ||
        !passwordRegex.test(formData.password)
      ) {
        if (!emailRegex.test(formData.email)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Invalid email address.",
          }));
        }

        if (!passwordRegex.test(formData.password)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password:
              "Password must have, one uppercase letter, one number, and special character.",
          }));
        }
        return;
      }

      const res = await axios.post(`/api/clerk/users/`, formData);
      toast.success("Created user.");
      router.push("/admin/users");
    } catch (error) {
      toast.success("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="flex gap-10 max-md:flex-col">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <Input
              // className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="email"
              size={40}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <label htmlFor="username" className="font-semibold">
              User Name
            </label>
            <Input
              minLength={3}
              type="text"
              // className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="username"
              id="username"
              size={40}
              required
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <Input
              // className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              name="password"
              size={40}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <label htmlFor="role" className="font-semibold">
              Role
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-md:w-full"
              name="role"
              id="role"
              onChange={(e) =>
                setFormData({ ...formData, isAdmin: e.target.value })
              }
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
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
