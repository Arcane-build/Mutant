import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import EarlyAccess from '@/components/EarlyAccess';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <EarlyAccess />
      <Footer />
    </main>
  );
}
