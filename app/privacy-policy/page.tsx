import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-[120px] pb-24 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-[#1a2744] mb-8 border-b pb-6">Privacy Policy</h1>
        
        <div className="prose prose-gray max-w-none text-gray-600 mb-12">
          <p className="mb-4">
            This Privacy Policy document is currently being updated. Please check back later for the complete policy details regarding how MOHAN Foundation handles your data.
          </p>
          <p>
            If you have any urgent inquiries regarding data protection, please contact us at{' '}
            <a href="mailto:elearning@mohanfoundation.org" className="text-[#d3222a] hover:underline">
              elearning@mohanfoundation.org
            </a>.
          </p>
        </div>
        
        <Link 
          href="/"
          className="inline-block bg-[#203c7c] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-full transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
