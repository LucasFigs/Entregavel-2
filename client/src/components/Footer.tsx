export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Algorithm Execution Platform</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-neutral-light transition-colors">About</a>
            <a href="#" className="text-white hover:text-neutral-light transition-colors">Documentation</a>
            <a href="#" className="text-white hover:text-neutral-light transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
