import { Link } from 'react-router'
import {
  ArrowRight,
  Cloud,
  Code2,
  Compass,
  GraduationCap,
  Layers3,
  Network,
  Rocket,
  Target,
  Workflow,
} from 'lucide-react'

import Navbar from './Navbar'
import Footer from './Footer'
import ArchitecturePreview from './Architecture_preview'


const capabilities = [
  {
    icon: Layers3,
    title: 'Design your architecture',
    description:
      'Add the building blocks of an application to a visual canvas and arrange them around your system.',
  },
  {
    icon: Network,
    title: 'Show how things connect',
    description:
      'Connect services, databases, and storage to make the relationships in your design easier to understand.',
  },
  {
    icon: Workflow,
    title: 'Keep and share your work',
    description:
      'Save architecture projects in your browser and export a diagram as a PNG when you need to share it.',
  },
]

const audiences = [
  {
    icon: Code2,
    title: 'Software developers',
    description: 'Map application components before writing the code.',
  },
  {
    icon: Cloud,
    title: 'Cloud engineers',
    description: 'Think through services and infrastructure connections.',
  },
  {
    icon: Network,
    title: 'System architects',
    description: 'Communicate system structure with a visual plan.',
  },
  {
    icon: GraduationCap,
    title: 'Students and learners',
    description: 'Explore how application components work together.',
  },
  {
    icon: Rocket,
    title: 'Startup teams',
    description: 'Give early product ideas a more organized structure.',
  },
]


function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
      {children}
    </p>
  )
}

const About = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="border-b border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10">
            <div className="max-w-2xl">
              <SectionLabel>Why CloudSketch?</SectionLabel>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.65rem]">
                Good Architecture Starts With a Clear Vision.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                Cloud Sketch helps developers turn complex system architecture ideas into clear, structured visual designs. We believe planning a system should be as intuitive as building one.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/architecture"
                  className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Create CloudSketch <ArrowRight size={16} />
                </Link>
                <a
                  href="#our-story"
                  className="rounded-md px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-white hover:text-slate-950"
                >
                  Get to know us
                </a>
              </div>
              <p className="mt-7 text-xs font-medium tracking-wide text-slate-500">
                A visual workspace for thinking through system design.
              </p>
            </div>

            <div className="min-w-0">
              <ArchitecturePreview />
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="our-story" className="scroll-mt-8 px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <SectionLabel>Our story</SectionLabel>
              <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                An idea is only the beginning. A clear plan brings it together.
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                Every great application starts with an idea, but turning that idea into a scalable system takes thoughtful planning. When components, services, and connections are difficult to keep track of, even a good idea can become hard to communicate.
              </p>
              <p className="mt-4 leading-8 text-slate-600">
                We created CloudSketch to make architecture design easier to understand, organize, and communicate. Our goal is to help developers focus on building better systems rather than struggling with complicated planning processes.
              </p>
            </div>

            <div className="border-l-2 border-blue-600 bg-slate-50 px-7 py-8 sm:px-9 sm:py-10">
              <p className="text-sm font-semibold text-slate-500">THE IDEA BEHIND CLOUDSKETCH</p>
              <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-slate-900 sm:text-3xl">
                Make the structure visible before the work gets complicated.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-slate-200 pt-6">
                <div>
                  <p className="text-sm font-semibold text-slate-900">See the parts</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Bring services and resources into one view.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Understand the links</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Show how the pieces of a system interact.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="border-y border-slate-200 bg-slate-50 px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <SectionLabel>What we do</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                From individual components to a system you can see.
              </h2>
              <p className="mt-5 leading-7 text-slate-600">
                CloudSketch gives you a visual canvas to put application building blocks together, connect them, and keep a record of your designs.
              </p>
            </div>

            <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
              {capabilities.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="grid gap-4 py-7 sm:grid-cols-[72px_1fr_1.15fr] sm:items-start sm:gap-8">
                    <div className="flex items-center gap-3 sm:block">
                      <span className="text-xs font-semibold tabular-nums text-slate-400">0{index + 1}</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-blue-700 ring-1 ring-slate-200 sm:mt-3">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="max-w-xl text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

       

        {/* MISSION & VISION */}
        <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-20">
            <div>
              <div className="flex items-center gap-3 text-blue-300">
                <Target size={20} />
                <SectionLabel>Our mission</SectionLabel>
              </div>
              <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                Make system architecture planning easier and more accessible.
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-slate-300">
                We want developers to have a straightforward way to design, organize, and understand the systems they are building.
              </p>
            </div>
            <div className="border-t border-slate-700 pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <div className="flex items-center gap-3 text-blue-300">
                <Compass size={20} />
                <SectionLabel>Our vision</SectionLabel>
              </div>
              <h2 className="mt-5 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                Help developers build better-designed and more reliable systems.
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-slate-300">
                We believe clearer architecture plans can make it easier for people to discuss ideas and make thoughtful technical decisions.
              </p>
            </div>
          </div>
        </section>

        {/* WHO WE BUILD FOR */}
        <section className="px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <SectionLabel>Who we build for</SectionLabel>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  For people who think in systems.
                </h2>
              </div>
              <p className="max-w-md leading-7 text-slate-600">
                Whether you are learning the fundamentals or planning an application, a visual design can help make the structure easier to discuss.
              </p>
            </div>

            <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((person) => {
                const Icon = person.icon
                return (
                  <div key={person.title} className="flex gap-4 border-t border-slate-200 py-6">
                    <Icon size={21} className="mt-1 shrink-0 text-blue-700" strokeWidth={1.8} />
                    <div>
                      <h3 className="font-semibold text-slate-900">{person.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{person.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        

        {/* CTA */}
        <section className="px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border-b border-slate-200 pb-12 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Start with an idea</SectionLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Your Next Great System Starts With a Sketch.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Bring your ideas together, organize your architecture, and start building with clarity.
              </p>
            </div>
            <Link
                to="/"
                className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-black transition  "
              >
                Back to Home
              </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
