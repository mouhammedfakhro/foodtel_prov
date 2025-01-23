import Navbar from "./components/Navbar";
import LandingInfo from "./components/LandingInfo";

export default async function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <LandingInfo />
      </div>
    </div>
  );
}
