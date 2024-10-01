// components/Heading.jsx
import { orbitron } from '../fonts';
export default function Heading({ children }) {
  return (
    <h1 className={`font-bold text-2xl pb-3 ${orbitron.className}`}>
      {children}
    </h1>
  );
}
