"use client";
import { useState } from "react";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";



const currentDate = new Date();

const randomSchema = z.object({
  name: z.string().nonempty({ message: "Username is required"}).min(4, { message: "Name must be at least 4 characters" }),
  date: z.string({message: "Must fill in a date"}).refine(
    (date) => {
      const parsedDate = new Date(date);
      return parsedDate.getTime() >= currentDate.getTime();
    },
    { message: "Date must not be earlier than the current date" }
  ),
});

function Zod() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name: name,
      date: date,
    };

    const results = randomSchema.safeParse(userData);

    if (!results.success) {
      // Map errors to a key-value object
      const fieldErrors: { [key: string]: string } = {};
      results.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      console.log("Form submitted Unsuccessfully:", results);
    } else {
      setErrors({});
      console.log("Form submitted successfully:", results.data);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default Zod;