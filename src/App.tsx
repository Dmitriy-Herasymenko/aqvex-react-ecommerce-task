import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogPage } from './pages/CatalogPage';

function App() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1">

        <Header />

        <main className="w-full">
          <CatalogPage />
        </main>

        <Footer />

      </div>
    </div>
  );
}

export default App;