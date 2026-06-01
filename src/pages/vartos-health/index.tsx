import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: "✓",
    title: "Habit Tracking",
    description:
      "Build lasting habits with daily check-ins, streaks, and visual progress. Organize habits into custom sections and watch your consistency improve over time.",
  },
  {
    icon: "🏋",
    title: "Exercise & Training Plans",
    description:
      "Log workouts and create structured weekly training plans. Track sets, reps, and load — with full history so you can see your strength evolve.",
  },
  {
    icon: "🥗",
    title: "Diet & Nutrition",
    description:
      "Log meals and get instant macro breakdowns. Create diet plans with daily meal suggestions, and every meal gets an automatic nutrition score.",
  },
];

const screenshots = [
  { label: "Today — Habits & Score" },
  { label: "Exercise — Training Plan" },
  { label: "Diet — Daily Meals" },
  { label: "Meal Library" },
];

export default function VartosHealthPage() {
  return (
    <>
      <Head>
        <title>Vartos Health — Habit, Exercise & Diet Tracker</title>
        <meta
          name="description"
          content="Vartos Health is a personal health companion that helps you track habits, log workouts, and manage your nutrition — all stored privately on your device."
        />
      </Head>

      <div className="w-full">
        {/* Hero */}
        <section className="bg-blue-500 text-white py-20 px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl font-light mb-4">Vartos Health</h1>
            <p className="text-xl font-light mb-8 opacity-90">
              Your personal health companion. Track habits, log workouts, and
              manage nutrition — all stored privately on your device.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Replace href with your Play Store URL once published */}
              <a
                href="#"
                className="bg-white text-blue-500 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Get it on Google Play
              </a>
              <Link
                href="/vartos-health/privacy-policy"
                className="text-white opacity-75 hover:opacity-100 underline text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-light text-blue-500 mb-2">
              Everything in one place
            </h2>
            <p className="text-center text-gray-500 mb-12">
              Three modules, one goal: help you build a healthier life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white border border-gray-200 p-8 rounded-lg"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-base mb-0">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="bg-gray-50 py-16 px-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-3xl font-light text-blue-500 mb-2">
              See it in action
            </h2>
            <p className="text-center text-gray-500 mb-12">
              Clean, focused design built for daily use.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {screenshots.map((shot, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  {/* Replace this div with:
                      <Image
                        src="/images/vartos-health/screenshot-{i+1}.png"
                        alt={shot.label}
                        width={200}
                        height={400}
                        className="rounded-xl border border-gray-200 shadow-sm"
                      />
                  */}
                  <div className="w-full aspect-[9/16] bg-gray-200 rounded-xl border border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs text-center px-2">
                      Screenshot {i + 1}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs text-center">
                    {shot.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy callout */}
        <section className="py-16 px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-blue-500 mb-4">
              Your data stays on your device
            </h2>
            <p className="text-gray-500 mb-6">
              Vartos Health stores everything locally using SQLite. No accounts,
              no cloud sync, no ads. Your health data is yours alone.
            </p>
            <Link
              href="/vartos-health/privacy-policy"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Read the full Privacy Policy →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-8 px-10 text-center text-gray-400 text-sm">
          <p className="mb-0">
            Vartos Health · Built by{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Rodrigo Vargas
            </Link>{" "}
            · <Link href="/vartos-health/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
