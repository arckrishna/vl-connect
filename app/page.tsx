"use client";

const experiments = [
  {
    number: "01",
    category: "IR Foundations",
    title: "Text Preprocessing & Normalization",
    description:
      "Prepare text data through cleaning, tokenization, and normalization.",
    color: "blue",
  },
  {
    number: "02",
    category: "IR Foundations",
    title: "Inverted Index Construction",
    description:
      "Build an index that helps retrieve relevant documents efficiently.",
    color: "purple",
  },
  {
    number: "03",
    category: "Semantic Search",
    title: "Dense Semantic Search",
    description:
      "Explore semantic similarity and embedding-based retrieval.",
    color: "green",
  },
  {
    number: "04",
    category: "Hybrid Retrieval",
    title: "Hybrid Keyword & Semantic Search",
    description:
      "Combine keyword matching and semantic retrieval techniques.",
    color: "orange",
  },
];

const students = [
  {
    id: "STU001",
    name: "Aarav Sharma",
    experiment: "Text Preprocessing",
    status: "Submitted",
  },
  {
    id: "STU002",
    name: "Student Example 2",
    experiment: "Inverted Index",
    status: "Under Review",
  },
  {
    id: "STU003",
    name: "Student Example 3",
    experiment: "Dense Semantic Search",
    status: "Pending",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7ff] text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-20 border-b border-violet-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 font-black text-white shadow-lg shadow-violet-200">
              VL
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                VL Connect
              </h1>
              <p className="hidden text-xs text-slate-500 sm:block">
                Virtual Laboratory Integration Portal
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#experiments" className="transition hover:text-violet-600">
              Experiments
            </a>
            <a href="#roadmap" className="transition hover:text-violet-600">
              Roadmap
            </a>
            <a href="#students" className="transition hover:text-violet-600">
              Student Work
            </a>
          </nav>

          <a
            href="#students"
            className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700"
          >
            Explore Portal →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pb-20 pt-20 sm:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-300/30 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-20 -z-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
            <span>✦</span>
            Student Laboratory Integration Portal
          </div>

          <h2 className="text-5xl font-black tracking-tight sm:text-7xl">
            Every Experiment.
            <span className="mt-2 block bg-gradient-to-r from-violet-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              One Connected Lab.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            A centralized platform to organize virtual laboratory experiments,
            bring student work together, and make academic review simpler.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#experiments"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5"
            >
              Explore Experiments →
            </a>

            <a
              href="#students"
              className="rounded-xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:border-violet-300"
            >
              View Student Work
            </a>
          </div>

          {/* Statistics */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "04", label: "Sample Experiments" },
              { value: "01", label: "Centralized Portal" },
              { value: "24/7", label: "Access to the Portal" },
              { value: "∞", label: "Learning Possibilities" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-3xl font-black text-violet-600">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-slate-400">
            Preview interface · Sample content, not real student records
          </p>
        </div>
      </section>

      {/* Experiment Catalogue */}
      <section id="experiments" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                Experiment Catalogue
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Explore the Laboratory
              </h2>

              <p className="mt-3 max-w-xl text-slate-600">
                A sample collection of information retrieval and semantic
                search experiments. We can replace these with your actual VLs.
              </p>
            </div>

            <span className="w-fit rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
              4 Sample Experiments
            </span>
          </div>

          {/* Updated clickable experiment cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {experiments.map((experiment) => {
              const experimentUrl =
                experiment.number === "04"
                  ? "/experiments/hybrid-search"
                  : "#students";

              const isAvailable = experiment.number === "04";

              return (
                <a
                  key={experiment.number}
                  href={experimentUrl}
                  aria-label={`${experiment.title}: ${
                    isAvailable ? "Launch simulation" : "Coming soon"
                  }`}
                  className="group block rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-violet-50 px-3 py-2 text-sm font-black text-violet-700">
                      {experiment.number}
                    </span>

                    <span className="text-xl text-violet-500 transition group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-wider text-violet-600">
                    {experiment.category}
                  </p>

                  <h3 className="mt-3 text-xl font-extrabold leading-snug">
                    {experiment.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {experiment.description}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <span className="text-sm font-bold text-violet-600 transition group-hover:text-indigo-600">
                      {isAvailable
                        ? "Launch Simulation →"
                        : "Coming Soon →"}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section
        id="roadmap"
        className="border-y border-violet-100 bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
              LEARNING ROADMAP
            </span>

            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              A Connected Learning Journey
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Experiments can be organized into a learning sequence so students
              and teachers can understand their relationships and prerequisites.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {experiments.map((experiment, index) => (
              <div key={experiment.number} className="relative">
                <div className="h-full rounded-2xl border border-slate-200 bg-[#faf9ff] p-5">
                  <span className="text-sm font-black text-violet-600">
                    STAGE {index + 1}
                  </span>

                  <h3 className="mt-3 font-extrabold">
                    {experiment.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {experiment.category}
                  </p>
                </div>

                {index < experiments.length - 1 && (
                  <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-xl font-bold text-violet-400 md:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Illustrative sequence only. Actual experiment dependencies will be
            configured when your VL list is available.
          </p>
        </div>
      </section>

      {/* Student Work */}
      <section id="students" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
              Student Work Integration
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              All Student Work, One Place
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              A preview of how completed experiments can be organized for
              teacher review. Real submissions will be connected later.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 bg-white p-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-lg font-extrabold">
                  Recent Submissions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Illustrative student records
                </p>
              </div>

              <span className="w-fit rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
                Demo Data
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-bold">Student</th>
                    <th className="px-6 py-4 font-bold">Experiment</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Review</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="transition hover:bg-violet-50/50"
                    >
                      <td className="px-6 py-5">
                        <div className="font-bold text-slate-800">
                          {student.name}
                        </div>

                        <div className="mt-1 text-xs text-slate-400">
                          {student.id}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {student.experiment}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            student.status === "Submitted"
                              ? "bg-emerald-50 text-emerald-700"
                              : student.status === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          type="button"
                          className="font-bold text-violet-600 hover:text-violet-800"
                          onClick={() =>
                            alert(
                              "This is sample data. Student submission details will be connected in a later development step."
                            )
                          }
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Centralized Records",
                description:
                  "Keep student experiment records organized in one place.",
                icon: "▤",
              },
              {
                title: "Simplified Review",
                description:
                  "Help teachers locate and inspect individual submissions.",
                icon: "◎",
              },
              {
                title: "Progress Tracking",
                description:
                  "Track experiment completion when real records are connected.",
                icon: "↗",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl font-bold text-violet-600">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-extrabold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-violet-100 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
          <p>
            <span className="font-extrabold text-slate-800">
              VL Connect
            </span>{" "}
            · Student Virtual Laboratory Integration Portal
          </p>

          <p>Academic Project · Initial Prototype</p>
        </div>
      </footer>
    </main>
  );
}