import React from 'react'

export default function Goodness() {
  return (
    <section className="container mx-auto px-10 bg-white dark:bg-gray-900">
  <div className="container px-6 py-10 mx-auto">
    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
      What are <br />
      our <span className="underline decoration-teal-500 text-teal-500">intentions</span>
    </h1>

    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
      <div className="p-8 space-y-3 border-2 border-teal-400 dark:border-teal-300 rounded-xl">
        <span className="inline-block text-teal-500 dark:text-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        </span>

        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Justification</h1>

        <p className="text-gray-500 dark:text-gray-300">
          Efficient management of school material loans improves internal processes and teaching quality. The quick availability of resources benefits teachers and students, and the adoption of advanced technologies demonstrates a commitment to innovation, highlighting the significance of the project.
        </p>
      </div>

      <div className="p-8 space-y-3 border-2 border-teal-400 dark:border-teal-300 rounded-xl">
        <span className="inline-block text-teal-500 dark:text-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        </span>

        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">What it will solve</h1>

        <p className="text-gray-500 dark:text-gray-300">
          Optimizing Educational Management: We solve the inefficiency in school material loans. We guarantee quick access, improve the learning experience, and commit to innovation with advanced technologies.
        </p>
      </div>

      <div className="p-8 space-y-3 border-2 border-teal-400 dark:border-teal-300 rounded-xl">
        <span className="inline-block text-teal-500 dark:text-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </span>

        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Background</h1>

        <p className="text-gray-500 dark:text-gray-300">
          In ancient times, these types of loans used to be obsolete and outdated. We aspire to completely change that perception and modernize this process.
        </p>

      </div>
    </div>
  </div>
</section>

  )
}
