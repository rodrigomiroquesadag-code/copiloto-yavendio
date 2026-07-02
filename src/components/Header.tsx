import type { Screen } from "../types/app";

interface HeaderProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
  guideUnlocked: boolean;
}

const NAV_ITEMS: { screen: Screen; label: string }[] = [
  { screen: "home", label: "Inicio" },
  { screen: "guide", label: "Guía" },
  { screen: "sos", label: "SOS" },
  { screen: "growth", label: "Growth" },
];

export function Header({ screen, onNavigate, guideUnlocked }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-left"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm">
            y!
          </span>
          <span className="font-semibold text-neutral-900">
            Copiloto de Conexión
          </span>
        </button>
        <nav className="flex items-center gap-1 text-sm">
          {NAV_ITEMS.map((item) => {
            const disabled = item.screen === "guide" && !guideUnlocked;
            const active = screen === item.screen;
            return (
              <button
                key={item.screen}
                disabled={disabled}
                onClick={() => onNavigate(item.screen)}
                className={
                  "rounded-md px-3 py-1.5 font-medium transition " +
                  (active
                    ? "bg-emerald-50 text-emerald-700"
                    : disabled
                      ? "cursor-not-allowed text-neutral-300"
                      : "text-neutral-600 hover:bg-neutral-100")
                }
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
