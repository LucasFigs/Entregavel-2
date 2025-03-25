export default function ImplementationDetails() {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-4">Implementation Details</h2>
        <p className="mb-4">This platform uses two backend implementations for each algorithm:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-neutral-light rounded-md p-4">
            <h3 className="flex items-center font-medium mb-3">
              <span className="material-icons text-primary mr-2">code</span>
              JavaScript Implementation
            </h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-dark">
              <li>Client-side execution</li>
              <li>Immediate results</li>
              <li>No server dependency</li>
              <li>Limited by browser capabilities</li>
            </ul>
          </div>
          
          <div className="border border-neutral-light rounded-md p-4">
            <h3 className="flex items-center font-medium mb-3">
              <span className="material-icons text-primary mr-2">memory</span>
              Java Implementation
            </h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-dark">
              <li>Server-side execution</li>
              <li>Better performance for complex operations</li>
              <li>Requires server connection</li>
              <li>API-based communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
