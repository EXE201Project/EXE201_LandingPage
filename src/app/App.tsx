import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { LandingPage } from "../features/landing/components/LandingPage";

export function App() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}
