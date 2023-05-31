import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return <div>Navbar</div>;
}
