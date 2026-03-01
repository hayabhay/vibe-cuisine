export default function Header() {
  return (
    <header className="text-center pt-8 pb-4 px-4">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400 bg-clip-text text-transparent">
        Global Cuisines Map
      </h1>
      <p className="mt-2 text-gray-400 text-lg">
        Explore the world's culinary traditions — click a region to discover its flavors
      </p>
    </header>
  );
}
