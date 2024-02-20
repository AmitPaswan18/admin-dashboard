"use client";
import { useFormState, useFormStatus } from "react-dom";
import React from "react";
import { createUser } from "@/app/_lib/actions";

import { Input } from "../../components/ui/input";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="border-2 py-1 rounded-md bg-blue-500 text-white outline-none px-3"
      type="submit"
      aria-disabled={pending}>
      Add
    </button>
  );
}
const initialValues = {
  message: "",
};

export default function UserRegister() {
  const [state, formAction] = useFormState(createUser, initialValues);
  return (
    <div>
      <nav className="flex flex-col md:flex-row w-full justify-center min-h-fit">
        <div className="border-2 border-gray-300 p-10 rounded-md shadow-md shadow-gray-400">
          <form action={formAction} className="flex flex-col">
            <div className="text-3xl my-2">User Registration</div>
            <div className="flex py-2 space-between gap-2">
              <div className="w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <Input
                  type="text"
                  name="username"
                  placeholder="e.g. John"
                  className=" w-full max-w-xs"
                />
              </div>
              <div className=" w-full max-w-xs">
                <label className="label">
                  <span>Your email</span>
                </label>
                <Input
                  type="text"
                  name="email"
                  placeholder="e.g johndoe@gmail.com"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className=" w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Father Name</span>
                </label>
                <Input
                  type="text"
                  name="fathername"
                  className=" w-full max-w-xs"
                  placeholder="e.g John Smith"
                />
              </div>
            </div>
            <div className="w-full max-w-xs">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <Input
                type="text"
                name="jobtitle"
                placeholder="e.g Software engineer"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="py-2">
              <SubmitButton />
              <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
              </p>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
}
