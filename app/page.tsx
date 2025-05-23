"use client"
import Link from "next/link";
import { useState, useTransition, useId, SetStateAction } from "react";
import { useAdd, useMultiply } from "@/hooks/arithmeticHooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Button from "@/components/button";
import { redirect } from "next/navigation";


const fruits: string[] = ["banana", "apple", "orange", "pepper", "plantain", "blueberry", "grape", "mango", "strawberry"]

const gamesList = [
  {
    name: "GTA V",
    description: "open world",
    price: "30000",
    rating: 5
  },
  {
    name: "Infamous 2",
    description: "open world",
    price: "23000",
    rating: 3
  },
  {
    name: "Star Wars",
    description: "action",
    price: "25000",
    rating: 4
  },
  {
    name: "Harry Potter",
    description: "Spell casting",
    price: "20000",
    rating: 2
  },
  {
    name: "Endoparasitic",
    description: "Top-down",
    price: "10000",
    rating: 5
  },
  {
    name: "Balatro",
    description: "rouge like",
    price: "100",
    rating: 5
  },
]


export default function Home() {
  const [inputValue, setInputValue] = useLocalStorage("input", "");
  const [filteredValue, setFilteredValue] = useState(fruits);
  const [isPending, startTransition] = useTransition()
  const id = useId()
  const id2 = useId()
  const id3 = useId()

  const value = useMultiply(10, 5)
  const value2 = useAdd(10, 5)

  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value)
    startTransition(() => setFilteredValue(fruits.filter(fruit => fruit.includes((e.target as HTMLInputElement).value))))
  }

  // In order to add a specific key from an array of objects
  const addition = gamesList.reduce((acc, curr) =>  acc + curr.rating, 0);

  return (
    <main className=""> 
      <aside className="flex gap-5">
        <Button bgColor="#3704e2" bgHover="#7750fc" onClick={() => redirect("/authentication")}>Authentication</Button>
        <Button bgColor="#37040f" bgHover="#d6103a" onClick={() => redirect("/protected")}>Protected (Auth Locked)</Button>
      </aside>

      <input type="text" value={inputValue} className="p-2 min-w-[300px] rounded-[8px] my-[10px] border-[2px] border-slate-800" 
        onChange={handleChange} 
      />

      <div>
        { isPending ?
          <p>Loading...</p>:
          filteredValue.map((filter, index) => <p key={index} className="font-bold font-poppins">{filter}</p> )
        }
      </div>

      <p>{id.replaceAll(":", "").toLowerCase()}</p>
      <p>{id2.replaceAll(":", "")}</p>
      <p>{id3.replaceAll(":", "")}</p>

      <section className="my-4 flex flex-wrap gap-5">
        {gamesList.map((game, index) =>
          <Link key={index} href={{pathname: "/:game-details", query: { gameName: game.name, gameDescription: game.description, gameRating: game.rating, gamePrice: game.price }}} className="bg-slate-400 min-w-[120px] min-h-[100px] py-3 px-5 rounded-lg hover:bg-slate-800 text-slate-800 hover:text-slate-400 hover:scale-110 transition-all duration-200 ease-in-out">
            <h1>{game.name}</h1>
            <p>{game.description}</p>
            <p>${game.price}</p>
            <p>{Array.from({length: game.rating}, () => "* ")}</p>
          </Link>
        )}
      </section>


      <p>{value}</p>
      <p>{value2}</p>
      <p>{addition}</p>



    </main>
  );
}
