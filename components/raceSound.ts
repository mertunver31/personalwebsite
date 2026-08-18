// Tron yarışı sesleri — WebAudio ile sentezlenir, telifsiz, dosya yok.
// Motor uğultusu sürekli çalar (start/stop); crash anında "derezz" patlar.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

type Engine = {
  oscs: OscillatorNode[];
  gain: GainNode;
  lfo: OscillatorNode;
};
let engine: Engine | null = null;

export function startEngine() {
  const c = getCtx();
  if (!c || engine) return;
  const now = c.currentTime;

  const gain = c.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.6);

  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  gain.connect(lp).connect(c.destination);

  // İki hafif detune sawtooth = elektrikli motor uğultusu
  const o1 = c.createOscillator();
  o1.type = "sawtooth";
  o1.frequency.value = 64;
  const o2 = c.createOscillator();
  o2.type = "sawtooth";
  o2.frequency.value = 67;
  // Tron motorlarına özgü ince whine
  const o3 = c.createOscillator();
  o3.type = "triangle";
  o3.frequency.value = 210;
  const g3 = c.createGain();
  g3.gain.value = 0.35;
  o3.connect(g3).connect(gain);
  o1.connect(gain);
  o2.connect(gain);

  // Hafif titreşim için LFO
  const lfo = c.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 7;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 6;
  lfo.connect(lfoGain);
  lfoGain.connect(o1.frequency);
  lfoGain.connect(o2.frequency);

  o1.start(now);
  o2.start(now);
  o3.start(now);
  lfo.start(now);
  engine = { oscs: [o1, o2, o3], gain, lfo };
}

export function stopEngine() {
  const c = ctx;
  if (!c || !engine) return;
  const now = c.currentTime;
  const e = engine;
  engine = null;
  e.gain.gain.cancelScheduledValues(now);
  e.gain.gain.setValueAtTime(e.gain.gain.value, now);
  e.gain.gain.linearRampToValueAtTime(0, now + 0.25);
  e.oscs.forEach((o) => o.stop(now + 0.3));
  e.lfo.stop(now + 0.3);
}

// Çarpışma "derezz" — alçalan zap + gürültü patlaması
export function playCrash() {
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;

  // Alçalan zap
  const osc = c.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(900, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.5);
  const og = c.createGain();
  og.gain.setValueAtTime(0.5, now);
  og.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
  osc.connect(og).connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.6);

  // Patlama gürültüsü
  const len = Math.floor(c.sampleRate * 0.5);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1200;
  const g = c.createGain();
  g.gain.setValueAtTime(0.5, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
  src.connect(bp).connect(g).connect(c.destination);
  src.start(now);
}
