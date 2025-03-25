export default function Header() {
  return (
    <header className="bg-primary-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-medium flex items-center">
          <span className="material-icons mr-2">code</span>
          Algorithm Execution Platform
        </h1>
        <div>
          <a href="#" className="text-white hover:text-neutral-light transition-colors px-3 py-2">
            <span className="material-icons">help_outline</span>
          </a>
        </div>
      </div>
    </header>
  );
}
