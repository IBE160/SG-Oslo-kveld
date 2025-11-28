"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [kort, setKort] = useState(4);
  const [mode, setMode] = useState<"numbers" | "letters">("numbers");
  const [players, setPlayers] = useState(2);

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  function startGame() {
    const qs = new URLSearchParams({
      cards: String(kort),
      mode: mode,
      players: String(players),
      names: [name1 || "Spiller 1", name2 || "Spiller 2"]
        .map(encodeURIComponent)
        .join(","),
    });

    router.push(`/game?${qs.toString()}`);
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#FFE6FA] via-[#D6F7FF] to-[#FFE8C8] flex items-center justify-center p-4">

      <div className="w-80 max-w-md bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl p-4 border border-white/70 flex flex-col items-center gap-3">

        {/* Bamser */}
        <div className="flex items-center justify-center gap-6 mb-2">
          <div className="text-[100px] leading-none">🧸</div>
          <div className="text-[100px] leading-none">🧸</div>
        </div>

        {/* Tittel */}
        <h1 className="text-4xl font-extrabold text-center text-[#6A0DAD]">
          TO LIKE 💖
        </h1>

        {/* Spillmodus */}
        <section className="text-center w-full mt-2">
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setMode("numbers")}
              className={`px-10 py-6 text-2xl rounded-[20px] font-bold shadow-lg border-2 transition-transform hover:scale-105
                ${
                  mode === "numbers"
                    ? "bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] border-[#FFB5D8] text-[#4A0035]"
                    : "bg-gray-200 border-gray-300 text-gray-600"
                }`}
            >
              🔢 Tall
            </button>

            <button
              onClick={() => setMode("letters")}
              className={`px-10 py-6 text-2xl rounded-[20px] font-bold shadow-lg border-2 transition-transform hover:scale-105
                ${
                  mode === "letters"
                    ? "bg-gradient-to-r from-[#A1C4FD] to-[#C2E9FB] border-[#A4D4FF] text-[#00345A]"
                    : "bg-gray-200 border-gray-300 text-gray-600"
                }`}
            >
              🔤 Bokstaver
            </button>
          </div>
        </section>

        {/* Antall spillere */}
        <section className="text-center w-full">
          <p className="text-base font-bold tracking-widest text-[#6A0DAD]">
            👥 ANTALL SPILLERE
          </p>

          <div className="flex justify-center gap-3 flex-wrap mt-2">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => setPlayers(num)}
                className={`w-20 h-20 text-3xl rounded-[20px] flex items-center justify-center font-extrabold transition-transform border-2 hover:scale-105
                  ${
                    players === num
                      ? "bg-gradient-to-r from-[#F6D365] to-[#FDA085] text-[#4A2600] border-[#FBD490]"
                      : "bg-gray-200 text-gray-600 border-gray-300"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        {/* Navn på spillere */}
        <section className="w-full">
          <div className="grid gap-3 mt-2">
            <div className="relative">
              <span className="absolute left-4 top-3 text-xl">👦</span>
              <input
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="Spiller 1"
                className="w-full rounded-[20px] border-2 border-[#E8D8F7] px-14 py-4 text-2xl bg-white text-[#4A2600] shadow-inner"
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-3 text-xl">👧</span>
              <input
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="Spiller 2"
                className="w-full rounded-[20px] border-2 border-[#E8D8F7] px-14 py-4 text-2xl bg-white text-[#4A2600] shadow-inner"
              />
            </div>
          </div>
        </section>

        {/* Antall kort */}
        <section className="text-center w-full">
          <p className="text-base font-bold tracking-widest text-[#6A0DAD]">
            🃏 ANTALL KORT (4–200)
          </p>

          <input
            type="range"
            min={4}
            max={200}
            step={2}
            value={kort}
            onChange={(e) => setKort(Number(e.target.value))}
            className="w-full accent-[#6A0DAD] h-4 rounded-lg cursor-pointer mt-2"
          />

          <p className="mt-1 font-extrabold text-[#4A2600] text-lg">
            {kort} kort – {kort / 2} par
          </p>
        </section>

        {/* Start Spill */}
        <button
          onClick={startGame}
          className="w-1/3 rounded-[30px] bg-gradient-to-r from-[#FFC3A0] via-[#FF8B94] to-[#FFAAA5] 
          text-white font-black text-3xl py-6 shadow-xl hover:scale-105 transition-transform border-4 border-[#FFC7C9] mt-1"
        >
          🚀 Start Spill!
        </button>

      </div>
    </div>
  );
}
