import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Головна</Link>
        <Link href="/about">Про нас</Link>
        <Link href="/rules">Правила</Link>
      </nav>
    </header>
  );
}
