import { useEffect, useState } from "react";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  Check,
  PanelLeft,
  Trash2,
  LayoutGrid,
  RotateCcw,
} from "lucide-react";

const STORAGE_KEY = "seller-dashboard-appearance";

const defaultAppearancePreferences = {
  theme: "light",
  accentColor: "rose",
  density: "comfortable",
  rememberSidebarState: true,
  confirmDestructiveActions: true,
};

const accentColors = {
  rose: { label: "Rose", value: "#e11d48", hover: "#be123c" },
  blue: { label: "Blue", value: "#2563eb", hover: "#1d4ed8" },
  violet: { label: "Violet", value: "#7c3aed", hover: "#6d28d9" },
  emerald: { label: "Emerald", value: "#059669", hover: "#047857" },
  orange: { label: "Orange", value: "#ea580c", hover: "#c2410c" },
};

const validThemes = ["light", "dark", "system"];
const validAccents = Object.keys(accentColors);
const validDensities = ["comfortable", "compact"];

function loadPreferences() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { ...defaultAppearancePreferences };

    const parsed = JSON.parse(saved);

    return {
      ...defaultAppearancePreferences,
      ...parsed,
      theme: validThemes.includes(parsed.theme) ? parsed.theme : "light",
      accentColor: validAccents.includes(parsed.accentColor)
        ? parsed.accentColor
        : "rose",
      density: validDensities.includes(parsed.density)
        ? parsed.density
        : "comfortable",
      rememberSidebarState:
        typeof parsed.rememberSidebarState === "boolean"
          ? parsed.rememberSidebarState
          : true,
      confirmDestructiveActions:
        typeof parsed.confirmDestructiveActions === "boolean"
          ? parsed.confirmDestructiveActions
          : true,
    };
  } catch {
    return { ...defaultAppearancePreferences };
  }
}

function applyAppearance(preferences) {
  const root = document.documentElement;

  const resolvedTheme =
    preferences.theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preferences.theme;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.dataset.theme = resolvedTheme;
  root.dataset.density = preferences.density;

  const accent = accentColors[preferences.accentColor];

  root.style.setProperty("--accent-color", accent.value);
  root.style.setProperty("--accent-color-hover", accent.hover);
}

const sectionClass =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

const headingClass = "text-sm font-semibold text-slate-900";
const descriptionClass = "text-sm leading-6 text-slate-500";

const iconBoxClass = "rounded-xl bg-rose-50 p-2.5 text-rose-600";

export default function AppearanceSettings() {
  const [preferences, setPreferences] = useState(loadPreferences);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    applyAppearance(preferences);
  }, [preferences]);

  useEffect(() => {
    if (preferences.theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => applyAppearance(preferences);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [preferences.theme, preferences.accentColor, preferences.density]);

  const updatePreference = (key, value) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences({ ...defaultAppearancePreferences });
  };

  const themes = [
    {
      value: "light",
      label: "Light",
      description: "Always use the light theme.",
      icon: Sun,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Always use the dark theme.",
      icon: Moon,
    },
    {
      value: "system",
      label: "System",
      description: "Follow your device's appearance.",
      icon: Monitor,
    },
  ];

  const densities = [
    {
      value: "comfortable",
      label: "Comfortable",
      description: "More spacing for easier reading.",
    },
    {
      value: "compact",
      label: "Compact",
      description: "Less spacing to fit more content.",
    },
  ];

  return (
    <div className="min-h-full space-y-6 bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Appearance
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Customize how your dashboard looks and feels.
          </p>
        </div>

        <button
          type="button"
          onClick={resetPreferences}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
        >
          <RotateCcw size={16} />
          Reset to default
        </button>
      </div>

      {/* Theme */}
      <section className={sectionClass}>
        <div className="mb-5 flex items-center gap-3">
          <div className={iconBoxClass}>
            <Sun size={20} />
          </div>

          <div>
            <h3 className={headingClass}>Theme</h3>
            <p className={descriptionClass}>
              Choose your preferred dashboard appearance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = preferences.theme === theme.value;

            return (
              <button
                key={theme.value}
                type="button"
                onClick={() => updatePreference("theme", theme.value)}
                aria-pressed={isSelected}
                className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={22}
                    className={isSelected ? "text-rose-600" : "text-slate-400"}
                  />

                  {isSelected && <Check size={18} className="text-rose-600" />}
                </div>

                <h4 className="mt-3 text-sm font-semibold text-slate-900">
                  {theme.label}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {theme.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accent Color */}
      <section className={sectionClass}>
        <div className="mb-5 flex items-center gap-3">
          <div className={iconBoxClass}>
            <Palette size={20} />
          </div>

          <div>
            <h3 className={headingClass}>Accent color</h3>
            <p className={descriptionClass}>
              Choose the primary color for buttons and highlights.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(accentColors).map(([key, color]) => {
            const isSelected = preferences.accentColor === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => updatePreference("accentColor", key)}
                aria-label={`${color.label} accent color`}
                aria-pressed={isSelected}
                title={color.label}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 ${
                  isSelected ? "ring-2 ring-offset-2 ring-offset-white" : ""
                }`}
                style={{
                  backgroundColor: color.value,
                  ...(isSelected ? { outlineColor: color.value } : {}),
                }}
              >
                {isSelected && <Check size={21} className="text-white" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Layout Density */}
      <section className={sectionClass}>
        <div className="mb-5 flex items-center gap-3">
          <div className={iconBoxClass}>
            <LayoutGrid size={20} />
          </div>

          <div>
            <h3 className={headingClass}>Layout density</h3>
            <p className={descriptionClass}>
              Control the spacing between dashboard elements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {densities.map((density) => {
            const isSelected = preferences.density === density.value;

            return (
              <button
                key={density.value}
                type="button"
                onClick={() => updatePreference("density", density.value)}
                aria-pressed={isSelected}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-rose-500 bg-rose-50 ring-1 ring-rose-500"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {density.label}
                  </h4>

                  {isSelected && <Check size={18} className="text-rose-600" />}
                </div>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {density.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Preferences */}
      <section className={sectionClass}>
        <h3 className={headingClass}>Preferences</h3>
        <p className={`mt-1 ${descriptionClass}`}>
          Manage your dashboard behavior.
        </p>

        <div className="mt-4 divide-y divide-slate-100">
          <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
            <div className="flex items-start gap-3">
              <PanelLeft size={19} className="mt-0.5 shrink-0 text-slate-500" />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Remember sidebar state
                </p>
                <p className={descriptionClass}>
                  Remember whether the sidebar was expanded or collapsed.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.rememberSidebarState}
              onChange={(event) =>
                updatePreference("rememberSidebarState", event.target.checked)
              }
              className="h-4 w-4 shrink-0 cursor-pointer accent-rose-600"
            />
          </label>

          <label className="flex cursor-pointer items-center justify-between gap-4 py-4">
            <div className="flex items-start gap-3">
              <Trash2 size={19} className="mt-0.5 shrink-0 text-slate-500" />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Confirm destructive actions
                </p>
                <p className={descriptionClass}>
                  Ask for confirmation before deleting important data.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={preferences.confirmDestructiveActions}
              onChange={(event) =>
                updatePreference(
                  "confirmDestructiveActions",
                  event.target.checked,
                )
              }
              className="h-4 w-4 shrink-0 cursor-pointer accent-rose-600"
            />
          </label>
        </div>
      </section>
    </div>
  );
}
