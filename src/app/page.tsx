import Link from 'next/link';
// Reuse the existing dashboard header to provide login/avatar and navigation.
import DashboardHeader from '@/components/Header';

/**
 * The homepage for HZZH Forms. This page is designed to be inviting and informative,
 * guiding new users toward creating their first form while showcasing the core
 * capabilities of the platform. It features a hero section with a call to
 * action, a feature overview grid, and a final call‑to‑action section. The layout
 * relies on utility classes (such as Tailwind CSS) and existing button styles
 * (e.g. `btn btn-primary`) provided by the project’s global styles.
 */
export default function Home() {
  // A list of feature descriptions to display on the homepage. Keeping these in
  // an array makes it trivial to add or remove items without touching the
  // surrounding layout code.
  const features = [
    {
      title: 'Drag & Drop Builder',
      description:
        'Build forms effortlessly with our intuitive drag & drop interface.',
    },
    {
      title: 'Customizable Templates',
      description:
        'Start quickly with a variety of templates you can tweak to your needs.',
    },
    {
      title: 'Advanced Field Types',
      description:
        'Collect the exact data you need with text inputs, selects, checkboxes, and more.',
    },
    {
      title: 'Real‑Time Analytics',
      description:
        'Monitor submissions and see trends with built‑in analytics tools.',
    },
    {
      title: 'API & Webhooks',
      description:
        'Integrate forms with your apps using our API and webhook support.',
    },
    {
      title: 'Secure & Private',
      description:
        'Your data is encrypted in transit and at rest with industry‑standard security.',
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header with login/avatar and navigation. This pulls from the existing
         dashboard components to ensure a consistent user experience across
         internal pages. */}
      <DashboardHeader />

      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to HZZH Forms</h1>
          <p className="text-xl text-gray-700 mb-8">
            Design, share, and analyze forms with ease. Collect the information
            you need, when you need it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary call to action: create a new form */}
            <Link href="/forms/new" className="btn btn-primary px-6 py-3 rounded-md">
              Create Your First Form
            </Link>
            {/* Secondary call to action: view the documentation */}
            <Link href="/docs" className="btn btn-primary px-6 py-3 rounded-md">
              Read Documentation
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Everything you need to build better forms
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Documentation & Resources</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a
              href="www.hzzhsoftware/form/engineering"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-6 py-3 rounded-md"
            >
              Engineering Docs
            </a>
            <a
              href="www.hzzhsoftware/form/product"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary px-6 py-3 rounded-md"
            >
              Product Usage Docs
            </a>
          </div>
        </section>

        {/* Final Call‑to‑Action */}
        <section className="text-center text-gray-700">
          <p className="mb-4">
            Start building your first form today using our simple and powerful tools.
          </p>
          <Link href="/form" className="btn btn-primary px-8 py-4 rounded-md">
            Get Started
          </Link>
          <p className="mt-6 text-sm">
            Need help? Check out our{' '}
            <Link
              href="/docs"
              className="underline text-blue-600 hover:text-blue-800"
            >
              documentation
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}