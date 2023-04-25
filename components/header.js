import { HowMuchLink } from './how-much-link.js';

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-center">
      <h1 className="text-center text-4xl font-cursive mx-3 md:mx-6">
        <span className="m-1">Wen claim</span>
        <span className="text-amber-500">?</span>
        <span className="text-sky-500 rotate-[11deg] inline-block m-0.5">?</span>
        <span className="text-pink-500 rotate-[22deg] inline-block m-0.5">!</span>
      </h1>
      <HowMuchLink/>
    </header>
  );
}
