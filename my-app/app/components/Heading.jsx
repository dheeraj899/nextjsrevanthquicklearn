import { orbitron } from '@/fonts'; // Updated import path

export default function Heading({ children }) {
  return (
    <h1 className={`font-bold text-2xl pb-3 ${orbitron.className}`}>
      {children}
    </h1>
  );
}
