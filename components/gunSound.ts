// Vahşi batı silah sesleri — kullanıcının eklediği MP3'ler.
// gun.mp3   -> ateş (silah oyunu + fotoğraf reveal ateş animasyonu)
// reload.mp3 -> şarjör doldurma (silah oyunu)
// Her çağrıda yeni Audio: hızlı/üst üste ateşe izin verir. Tarayıcı dosyayı cache'ler.

const GUN = "/sounds/gun.mp3";
const RELOAD = "/sounds/reload.mp3";

// İlk kullanıcı etkileşiminden sonra dosyaları önceden ısıt
let warmed = false;
function warm() {
  if (warmed) return;
  warmed = true;
  try {
    new Audio(GUN).load();
    new Audio(RELOAD).load();
  } catch {
    /* yoksay */
  }
}

function playSrc(src: string, volume: number) {
  try {
    warm();
    const a = new Audio(src);
    a.volume = volume;
    a.play().catch(() => {});
  } catch {
    /* ses desteklenmiyorsa sessizce geç */
  }
}

export function playGunshot() {
  playSrc(GUN, 0.55);
}

export function playReload() {
  playSrc(RELOAD, 0.6);
}
