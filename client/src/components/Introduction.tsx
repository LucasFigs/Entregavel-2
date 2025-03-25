export default function Introduction() {
  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-4">About This Platform</h2>
        <p className="mb-4">
          This platform allows you to execute various algorithms implemented in both Java and JavaScript. 
          Select an algorithm from the tabs below, provide the required inputs, and click "Execute" to see the results.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center">
            <span className="material-icons text-primary mr-2">check_circle</span>
            <span>6 Different Algorithms</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-primary mr-2">code</span>
            <span>Java & JavaScript Implementations</span>
          </div>
          <div className="flex items-center">
            <span className="material-icons text-primary mr-2">play_arrow</span>
            <span>Instant Execution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
