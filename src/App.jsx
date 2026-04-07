import Nav from './components/Nav.jsx';
import Hero from './components/hero/Hero.jsx';
import InteractiveDemo from './components/InteractiveDemo.jsx';
import WhyRecourse from './components/WhyRecourse.jsx';
import IdeaBoard from './components/IdeaBoard.jsx';
import BenchRadar from './components/BenchRadar.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <main className="page-shell">
        <InteractiveDemo />
        <WhyRecourse />
        <IdeaBoard />
        <BenchRadar />
      </main>
      <Footer />
    </>
  );
}
