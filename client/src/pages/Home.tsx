import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import AlgorithmTabs from "@/components/AlgorithmTabs";
import ImplementationDetails from "@/components/ImplementationDetails";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Introduction />
        <AlgorithmTabs />
        <ImplementationDetails />
      </main>
      <Footer />
    </div>
  );
}
