"use client";

import UserData from "@/models/register";
import { getNames } from "country-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import connectDb from "@/db";

import { Formik, Form, Field } from "formik";
import React from "react";
import { object, string, TypeOf } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Input } from "@/components/ui/input";

const contactFormSchema = object({
  fullname: string({
    required_error: "Please enter your full name",
  }),
  email: string().email("Please enter a valid email"),

  fathername: string({
    required_error: "Please enter your father name",
  }),
  jobtitle: string({
    required_error: "Please enter your Job title",
  }),
});

type ContactFormInputs = TypeOf<typeof contactFormSchema>;

async function getData() {
  const res = await fetch("http://localhost:3000/api/fetchusers", {
    cache: "no-cache",
    tags: ["posts"],
  });

  if (!res.ok) {
    return notFound;
  }
  return res.json();
}

export default function UserRegister() {
  return (
    <div>
      <nav className="flex flex-col md:flex-row w-full justify-center min-h-fit">
        <Formik<ContactFormInputs>
          initialValues={{
            fullname: "",
            email: "",
            fathername: "",
            jobtitle: "",
          }}
          onSubmit={async (values) => {
            try {
              const res = await fetch("http://localhost:3000/api/adduser", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "content-type": "application/json",
                },
              });
              console.log(res);
              if (res.ok) {
                console.log("Registration successfully");
              } else {
                console.log("Oops! Something is wrong.");
              }
            } catch (error) {
              console.log(error);
            }
            console.log("Form is submitted", values);
          }}
          validationSchema={toFormikValidationSchema(contactFormSchema)}>
          {(formikState) => {
            const errors = formikState.errors;
            return (
              <div className="border-2 border-gray-300 p-10 rounded-md shadow-md shadow-gray-400">
                <Form className="flex flex-col">
                  <div className="text-3xl my-2">User Regestration</div>
                  <div className="flex py-2 space-between gap-2">
                    <div className="w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Fullname</span>
                      </label>
                      <Field
                        as={Input}
                        type="text"
                        name="fullname"
                        placeholder="e.g. John"
                        className=" w-full max-w-xs"
                      />
                      {errors.fullname && (
                        <label className="label">
                          <div className="text-red-500 text-sm">
                            {errors.fullname}
                          </div>
                        </label>
                      )}
                    </div>
                    <div className=" w-full max-w-xs">
                      <label className="label">
                        <span>Your email</span>
                      </label>
                      <Field
                        as={Input}
                        type="text"
                        name="email"
                        placeholder="e.g johndoe@gmail.com"
                        className="input input-bordered w-full max-w-xs"
                      />
                      {errors.email && (
                        <label className="label">
                          <span className="text-red-500 text-sm">
                            {errors.email}
                          </span>
                        </label>
                      )}
                    </div>
                    <div className=" w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Father Name</span>
                      </label>
                      <Field
                        as={Input}
                        type="text"
                        name="fathername"
                        className=" w-full max-w-xs"
                        placeholder="e.g John Smith"
                      />
                      {errors.fathername && (
                        <label className="label">
                          <span className="text-red-500 text-sm">
                            {errors.fathername}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Job Title</span>
                    </label>
                    <Field
                      as={Input}
                      type="text"
                      name="jobtitle"
                      placeholder="e.g Software engineer"
                      className="input input-bordered w-full max-w-xs"
                    />
                    {errors.jobtitle && (
                      <label className="label">
                        <span className="text-red-500 text-sm ">
                          {errors.jobtitle}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="py-2">
                    <button
                      className="border-2 py-1 rounded-md bg-blue-500 text-white outline-none px-3"
                      type="submit">
                      Submit
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </nav>
    </div>
  );
}
