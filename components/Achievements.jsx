export default function Achievements() {

  const trades = [
    "/achievements/trade1.jpg",
    "/achievements/trade2.jpg",
    "/achievements/trade3.jpg",
    "/achievements/trade4.jpg",
  ]

  return (
    <section className="bg-black py-20 text-white">

      <h2 className="text-4xl text-center font-bold mb-12">
        Trading Achievements
      </h2>

      <div className="grid md:grid-cols-4 gap-6 px-10">

        {trades.map((trade, index) => (
          <div key={index} className="rounded-xl overflow-hidden border border-yellow-400">
            <img src={trade} className="w-full" />
          </div>
        ))}

      </div>

    </section>
  )
}
