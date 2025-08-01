import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <main className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Forms</h1>
          <p className="text-xl text-gray-600 mb-8">
            The simple way to collect information from your users
            <br />
            {process.env.NEXT_PUBLIC_CDN_URL}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/docs"
              className="btn btn-primary "
            >
              Read Documentation
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Easy Form Building',
              description: 'Create and customize forms in minutes with our intuitive builder'
            },
            {
              title: 'Custom Fields',
              description: 'Add different field types to collect exactly what you need'
            },
            {
              title: 'Data Management',
              description: 'Organize and export your form submissions easily'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-gray-600">
          <p>
            Using our mock API at{' '}
            <code className="bg-gray-100 px-2 py-1 rounded">localhost:3001</code>
          </p>
        </div>
      </main>
    </div>
  );
}
