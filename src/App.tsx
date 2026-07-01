import { StatusBar } from "./components/StatusBar";
import { Hero } from "./components/Hero";
import { ApiConsole } from "./components/ApiConsole";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { About } from "./components/sections/About";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <StatusBar />
      <main>
        <Hero />
        <ApiConsole />
        <Experience />
        <Projects />
        <Skills />
        <About />
      </main>
      <Footer />
    </>
  );
}
