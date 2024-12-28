const Footer = () => {
  return (
    <footer className="flex h-[10vh] w-screen max-w-screen-xl items-center justify-center  ">
      <div className="flex gap-x-2">
        <h3 className="text-zinc-400">Libraries:</h3>
        <div>
          <a
            href="https://es.react.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400"
          >
            React
          </a>
          <span className="mx-2 text-zinc-500">|</span>
          <a
            href="https://vite.dev/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400"
          >
            Vite
          </a>
          <span className="mx-2 text-zinc-500 ">|</span>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400"
          >
            Tailwind CSS
          </a>
          <span className="mx-2 text-zinc-500">|</span>
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400"
          >
            Shadcn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
