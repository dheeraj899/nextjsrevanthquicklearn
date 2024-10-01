// components/Heading.jsx
//import { orbitron } from '../fonts';
export default function Heading({ children }) {
  return (
    <h1 className="font-bold font-orbitron pb-3 text-2xl">
      {children}
    </h1>
  );
}