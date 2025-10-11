import Link from 'next/link';
import Header from '@/components/Header';
import { listForms } from '@/services/form';

/**
 * The homepage for HZZH Forms. This page is designed to be inviting and informative,
 * guiding new users toward creating their first form while showcasing the core
 * capabilities of the platform. It features a hero section with a call to
 * action, a feature overview grid, and a final call‑to‑action section. The layout
 * relies on utility classes (such as Tailwind CSS) and existing button styles
 * (e.g. `btn btn-primary`) provided by the project’s global styles.
 */
export default async function Home() {
  // Fetch the current forms to display in the first section. The API may return
  // different shapes, so extract an array of forms in a resilient way.
  let forms: any[] = [];
  try {
    const formsData: any = await listForms({ page: 1, limit: 10 });
    if (Array.isArray(formsData)) {
      forms = formsData;
    } else if (formsData && Array.isArray(formsData.forms)) {
      forms = formsData.forms;
    } else if (formsData && Array.isArray(formsData.data)) {
      forms = formsData.data;
    }
  } catch (err) {
    console.error('Failed to list forms:', err);
  }

  // Filter forms to only show published ones
  forms = forms.filter((form: any) => form.status === 'published');

  // Sort forms by updatedAt date (most recent first)
  forms.sort((a, b) => {
    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return dateB - dateA; // Descending order (newest first)
  });

  // A list of feature descriptions to display on the sales/marketing section.
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
      <Header/>
      <main className="max-w-6xl mx-auto">
        {/* Current Forms Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Forms</h2>
          {forms && forms.length > 0 ? (
            <ul className="space-y-4">
              {forms.map((form: any) => (
                <li
                  key={form.id}
                  className="bg-white px-4 py-3 rounded shadow-sm flex justify-between items-center"
                >
                  <Link
                    href={`/to/${form.id}`}
                    className="text-lg font-medium text-neutral-900 hover:text-purple-600"
                  >
                    {form.name || form.title || 'Untitled Form'}
                  </Link>
                  {form.updatedAt ? (
                    <span className="text-sm text-neutral-500">
                      {new Date(form.updatedAt).toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-neutral-600">No forms found.</p>
          )}
          
          {/* Create Form Call-to-Action */}
          <div className="text-center mt-8">
            <Link href="/form" className="btn btn-primary px-6 py-3 rounded-md">
              Create Form
            </Link>
          </div>
        </section>

        {/* Sales & Marketing Section */}
        <section className="mb-16">
          <div className="text-center mb-8 text-2xl font-bold">
            HZZH Forms
          </div>
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
            <div className="text-center mt-8">
              <a
                href="https://www.hzzhsoftware.com/form/product"        
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-6 py-3 rounded-md"
              >
                Product Usage Docs
              </a>
            </div>
        </section>

        {/* Engineering Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">For Engineers</h2>
          <p className="text-center text-gray-700 mb-6">
            Explore our engineering documentation for deeper technical insights, API references,
            and best practices when building with HZZH Forms.
          </p>
            <div className="text-center">
              <a
                href="https://www.hzzhsoftware.com/form/engineering"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-6 py-3 rounded-md"
              >
                Engineering Docs
              </a>
            </div>
        </section>

        {/* Final Call‑to‑Action */}
        <section className="text-center text-gray-700">
          <p className="mb-4">
            Ready to build? Start using HZZH Forms today with our simple and powerful tools.
          </p>
          <a
            href="https://hzzhsoftware.com/hzzh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-8 py-4 rounded-md"
          >
            Get HZZH Forms
          </a>
        </section>
      </main>
    </div>
  );
}