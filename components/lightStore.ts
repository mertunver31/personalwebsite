import { useSyncExternalStore } from "react";

// İp (LightPull) ile Skills bölümü arasında paylaşılan ışık durumu.
// Kaynak doğruluk ipte; buraya yayınlanır, Skills dinler.
type State = { on: boolean; skillsInView: boolean };

// Varsayılan: ışıklar AÇIK
let state: State = { on: true, skillsInView: false };
const subs = new Set<() => void>();

function emit() {
  subs.forEach((f) => f());
}

export function setLightsOn(on: boolean) {
  if (state.on !== on) {
    state = { ...state, on };
    emit();
  }
}

export function setSkillsInView(v: boolean) {
  if (state.skillsInView !== v) {
    state = { ...state, skillsInView: v };
    emit();
  }
}

function subscribe(cb: () => void) {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}

function getSnapshot() {
  return state;
}

// SSR / hidrasyon: ışıklar açık + skills görünmüyor varsay (kararlı)
const serverState: State = { on: true, skillsInView: false };
function getServerSnapshot() {
  return serverState;
}

export function useLights() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
