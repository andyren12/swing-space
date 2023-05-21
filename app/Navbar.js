import { useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  return <div>Navbar</div>;
}
