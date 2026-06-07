// Floresan lamba "gidip gelme" sesini WebAudio ile sentezler — telifsiz,
// dosya gerektirmez. Kullanıcı etkileşimi (tık) sırasında çağrılmalı.

let ctx: AudioContext | null = null;

export function playFluorescentFlicker() {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;

    // Elektriksel uğultu (50/60 Hz şebeke vızıltısı hissi)
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 100;
    const hum = ctx.createGain();
    hum.gain.value = 0;
    osc.connect(hum);
    hum.connect(ctx.destination);
    osc.start(now);

    // Uğultunun yanıp sönen zarfı (görsel flicker ile uyumlu)
    const env: [number, number][] = [
      [0, 0],
      [0.02, 0.07],
      [0.07, 0.0],
      [0.11, 0.09],
      [0.17, 0.0],
      [0.23, 0.05],
      [0.3, 0.1],
      [0.42, 0.0],
      [0.52, 0.07],
      [0.64, 0.11],
      [0.82, 0.04],
      [1.0, 0.09],
      [1.25, 0.06],
      [1.5, 0.1],
      [1.65, 0.0],
    ];
    for (const [tt, v] of env) hum.gain.setValueAtTime(v, now + tt);
    osc.stop(now + 1.75);

    // Tutuşma "tık/çıt" sesleri — kısa filtreli gürültü patlamaları
    const clacks = [0.02, 0.11, 0.23, 0.3, 0.52, 0.64, 1.0, 1.5];
    for (const ct of clacks) {
      const len = Math.floor(ctx.sampleRate * 0.035);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 2200 + Math.random() * 1500;
      bp.Q.value = 1.2;
      const g = ctx.createGain();
      g.gain.value = 0.13;
      src.connect(bp);
      bp.connect(g);
      g.connect(ctx.destination);
      src.start(now + ct);
    }
  } catch {
    // sesi desteklemeyen ortamlarda sessizce geç
  }
}
