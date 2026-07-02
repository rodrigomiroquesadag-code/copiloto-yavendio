import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Triage } from "./components/Triage";
import { GuidedSteps } from "./components/GuidedSteps";
import { SosDiagnostic } from "./components/SosDiagnostic";
import { FallbackOffer } from "./components/FallbackOffer";
import { GrowthDashboard } from "./components/GrowthDashboard";
import { loadState, saveState } from "./lib/storage";
import type {
  GuideProgress,
  LoggedCase,
  Screen,
  TriageResult,
} from "./types/app";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [triageResult, setTriageResult] = useState<TriageResult | null>(() =>
    loadState<TriageResult | null>("triageResult", null),
  );
  const [guideProgress, setGuideProgress] = useState<GuideProgress>(() =>
    loadState<GuideProgress>("guideProgress", {}),
  );
  const [loggedCases, setLoggedCases] = useState<LoggedCase[]>(() =>
    loadState<LoggedCase[]>("loggedCases", []),
  );
  const [sosInitialText, setSosInitialText] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    saveState("triageResult", triageResult);
  }, [triageResult]);

  useEffect(() => {
    saveState("guideProgress", guideProgress);
  }, [guideProgress]);

  useEffect(() => {
    saveState("loggedCases", loggedCases);
  }, [loggedCases]);

  function navigate(next: Screen) {
    if (next !== "sos") setSosInitialText(undefined);
    setScreen(next);
  }

  function handleToggleStep(index: number) {
    if (!triageResult) return;
    const ruta = triageResult.ruta;
    setGuideProgress((prev) => {
      const current = prev[ruta] ?? [];
      const updated = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      return { ...prev, [ruta]: updated };
    });
  }

  function handleStuck(stepTitle: string) {
    setSosInitialText(`Estoy atascado en: ${stepTitle}`);
    setScreen("sos");
  }

  function handleLogCase(entry: LoggedCase) {
    setLoggedCases((prev) => [...prev, entry]);
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header
        screen={screen}
        onNavigate={navigate}
        guideUnlocked={!!triageResult}
      />
      <main>
        {screen === "home" && (
          <Home
            onStartTriage={() => navigate("triage")}
            onGoToSos={() => navigate("sos")}
          />
        )}
        {screen === "triage" && (
          <Triage
            onComplete={(result) => {
              setTriageResult(result);
              navigate("guide");
            }}
          />
        )}
        {screen === "guide" && triageResult && (
          <GuidedSteps
            ruta={triageResult.ruta}
            completed={guideProgress[triageResult.ruta] ?? []}
            onToggleStep={handleToggleStep}
            onStuck={handleStuck}
          />
        )}
        {screen === "sos" && (
          <SosDiagnostic
            initialText={sosInitialText}
            onFallback={() => navigate("fallback")}
            onLogCase={handleLogCase}
          />
        )}
        {screen === "fallback" && (
          <FallbackOffer onBack={() => navigate("sos")} />
        )}
        {screen === "growth" && (
          <GrowthDashboard loggedCases={loggedCases} />
        )}
      </main>
    </div>
  );
}

export default App;
