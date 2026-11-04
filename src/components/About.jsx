import React from 'react'
import { Link } from 'react-router'
import {
  Cloud,
  Target,
  Lightbulb,
  Workflow,
  Layers,
  LayoutDashboard,
  ArrowRight,
  GitBranch,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

import Navbar from './Navbar'
import Footer from './Footer'

const About = () => {
  const features = [
    {
      icon: <LayoutDashboard size={26} />,
      title: 'Architecture Design',
      description:
        'Create and organize cloud infrastructure diagrams visually. Build clear representations of your system architecture.',
    },
    {
      icon: <Workflow size={26} />,
      title: 'Visualize Workflows',
      description:
        'Connect services and understand how different components interact within your cloud infrastructure.',
    },
    {
      icon: <Layers size={26} />,
      title: 'Project Management',
      description:
        'Keep your architecture projects organized and access your saved designs whenever you need them.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="px-6 py-24 text-center sm:py-28">
          <div className="mx-auto max-w-4xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <Cloud size={17} />
              ABOUT CLOUDSKETCH
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
              Design Cloud Architecture.
              <span className="block text-blue-600">
                Think Without Limits.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-600">
              CloudSketch makes cloud architecture planning simple.
              Design, connect, and visualize your infrastructure
              in one intuitive workspace.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/architecture"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Explore Architecture Builder
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/pipeline"
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Explore Pipeline
              </Link>
            </div>

          </div>
        </section>

        {/* OUR STORY SECTION */}
        <section className="border-y border-gray-100 bg-gray-50 px-6 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                Our Story
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Turning Complex Ideas Into Clear Architecture.
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                Designing cloud infrastructure can become complicated
                when multiple services, connections, and deployment
                components are involved.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                CloudSketch is designed to make this process more
                intuitive by providing a visual workspace where
                developers can plan, connect, and understand their
                cloud architecture before deployment.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Lightbulb size={30} />
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                From Ideas to Infrastructure
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                A clear visual representation helps developers
                understand system components, identify connections,
                and plan their infrastructure with greater confidence.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  'Plan your architecture',
                  'Connect system components',
                  'Visualize deployment workflows',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* OUR MISSION SECTION */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Target size={30} />
            </div>

            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
              Our Mission
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Making Cloud Architecture Simple for Everyone.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Our mission is to simplify the way developers plan and
              understand cloud systems. We aim to make architecture
              design more visual, accessible, and organized so that
              great ideas can turn into well-structured systems.
            </p>

          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-gray-50 px-6 py-20">
          <div className="mx-auto max-w-6xl">

            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                What We Offer
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything You Need to Plan Better.
              </h2>

              <p className="mt-5 leading-7 text-gray-600">
                Explore the tools that help you turn infrastructure
                ideas into organized visual designs.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-3">

              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-gray-900 px-7 py-16 text-center sm:px-12">

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-400">
              <Sparkles size={30} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Design Your Cloud Architecture?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
              Bring your ideas to life. Start designing,
              connecting, and visualizing your cloud infrastructure
              with CloudSketch.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                to="/architecture"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                Start Building
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/"
                className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Back to Home
              </Link>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default About

