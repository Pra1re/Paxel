export default function NewsletterSubscription() {
    return (
      <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <p className="mb-4">Stay updated with our latest news and offers.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="p-2 rounded border dark:border-gray-600 dark:bg-gray-900 dark:text-white w-full sm:w-auto" 
          />
          <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Subscribe</button>
        </div>
      </div>
    );
  }
  