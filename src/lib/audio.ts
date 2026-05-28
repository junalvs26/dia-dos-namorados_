/* ==========================================================================
   NOSSO MUSEU VIRTUAL 3D - GERENCIADOR DE ÁUDIO E SINTETIZADOR (AUDIO.TS)
   ========================================================================== */

import type { Music, Vibe } from '../types';

export const MUSIC_URLS: Record<Music, string> = {
  theme: "", // Mapeado dinamicamente com base na Vibe
  piano: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Nocturne_op.9_no.2.ogg",
  acoustic: "https://upload.wikimedia.org/wikipedia/commons/3/30/Pachelbel%27s_Canon.ogg",
  synth: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg",
  retro: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Erik_Satie_-_Gymnop%C3%A9die_No._1.ogg",
  lofi: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Moonlight_Sonata.ogg",
  custom: "", // Carregado localmente via File Reader pelo usuário
};

// Mapeia cada vibe para sua trilha padrão caso a opção "theme" seja selecionada
export const VIBE_MUSIC_MAP: Record<Vibe, Music> = {
  classic: 'piano',
  cozy: 'acoustic',
  retro: 'retro',
  anime: 'piano', // Pode usar piano ou lofi
  disney: 'piano', // Pode usar piano clássico romântico
  studios: 'lofi',
};

export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentUrl = "";
  private synthContext: AudioContext | null = null;
  private fadeInterval: number | null = null;
  private _isMuted = false;

  constructor() {
    // Inicialização tardia para respeitar políticas de interação do navegador
  }

  // Inicializa a Web Audio API para efeitos sonoros dinâmicos
  public initSynth() {
    if (!this.synthContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.synthContext = new AudioCtx();
      }
    }
    // Retoma o contexto caso esteja suspenso
    if (this.synthContext && this.synthContext.state === 'suspended') {
      this.synthContext.resume();
    }
  }

  // Retorna se o som está tocando
  public getIsPlaying(): boolean {
    return this.isPlaying && !this._isMuted;
  }

  // Retorna se está silenciado
  public getIsMuted(): boolean {
    return this._isMuted;
  }

  // Toca música baseada na seleção do usuário e na Vibe atual do museu
  public playSelection(music: Music, vibe: Vibe, customSrc?: string) {
    let url = "";
    if (music === 'custom') {
      url = customSrc || "";
    } else if (music === 'theme') {
      const defaultMusic = VIBE_MUSIC_MAP[vibe];
      url = MUSIC_URLS[defaultMusic];
    } else {
      url = MUSIC_URLS[music];
    }

    this.playMusic(url);
  }

  // Toca música de fundo baseada em URL com transição de fade-in suave
  public playMusic(url: string) {
    if (!url) return;

    // Se for a mesma música e já estiver tocando, ignora
    if (this.currentUrl === url && this.isPlaying) {
      if (this._isMuted) {
        this.setMute(false);
      }
      return;
    }

    // Para música anterior se houver
    this.stopMusic(500);

    this.currentUrl = url;
    this._isMuted = false;
    this.isPlaying = true;

    try {
      this.audio = new Audio(url);
      this.audio.loop = true;
      this.audio.volume = 0; // Começa silencioso para o fade-in

      // Tenta tocar (navegadores exigem interação do usuário)
      this.audio.play()
        .then(() => {
          this.fadeIn(this.audio!, 0.4, 2000); // Sobe para 40% de volume em 2 segundos
        })
        .catch(err => {
          console.warn("Reprodução automática de áudio bloqueada ou erro de carregamento: ", err);
          this.isPlaying = false;
        });
    } catch (e) {
      console.error("Falha ao inicializar objeto de áudio: ", e);
      this.isPlaying = false;
    }
  }

  // Interrompe a música atual com fade-out suave
  public stopMusic(duration = 1000) {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (this.audio) {
      const currentAudio = this.audio;
      this.fadeOut(currentAudio, duration, () => {
        currentAudio.pause();
        if (this.audio === currentAudio) {
          this.audio = null;
          this.isPlaying = false;
        }
      });
    } else {
      this.isPlaying = false;
    }
  }

  // Alterna entre mudo e ativo de forma suave
  public setMute(mute: boolean) {
    this._isMuted = mute;
    if (!this.audio) {
      if (!mute && this.currentUrl) {
        this.playMusic(this.currentUrl);
      }
      return;
    }

    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    if (mute) {
      // Faz fade-out do volume até 0, mas mantém tocando em silêncio
      this.fadeOut(this.audio, 800, () => {
        if (this.audio) this.audio.volume = 0;
      });
    } else {
      // Faz fade-in do volume até o normal
      this.fadeIn(this.audio, 0.4, 800);
    }
  }

  // Fade-in de Volume
  private fadeIn(audioElement: HTMLAudioElement, maxVolume = 0.4, duration = 1500) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const interval = 50; // ms
    const step = maxVolume / (duration / interval);
    let vol = audioElement.volume;

    this.fadeInterval = window.setInterval(() => {
      if (!this.isPlaying || !this.audio || this._isMuted) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        return;
      }

      vol += step;
      if (vol >= maxVolume) {
        audioElement.volume = maxVolume;
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
      } else {
        audioElement.volume = vol;
      }
    }, interval);
  }

  // Fade-out de Volume
  private fadeOut(audioElement: HTMLAudioElement, duration = 1000, callback?: () => void) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const interval = 50; // ms
    const startVolume = audioElement.volume;
    const step = startVolume / (duration / interval);
    let vol = startVolume;

    if (vol <= 0) {
      if (callback) callback();
      return;
    }

    this.fadeInterval = window.setInterval(() => {
      vol -= step;
      if (vol <= 0.01) {
        audioElement.volume = 0;
        if (this.fadeInterval) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
        if (callback) callback();
      } else {
        audioElement.volume = vol;
      }
    }, interval);
  }

  // Toca um efeito sonoro de sino mágico sintetizado por proximidade (Web Audio API)
  // Isso evita baixar arquivos de som externos e funciona de forma 100% autônoma
  public playProximityChime() {
    if (this._isMuted) return;

    try {
      this.initSynth();
      if (!this.synthContext) return;

      const now = this.synthContext.currentTime;

      // Frequências para uma harmonia mágica (Pentatônica Maior de Fá# / A)
      const notes = [369.99, 440.00, 554.37, 659.25, 739.99]; // F#4, A4, C#5, E5, F#5

      // Toca 3 notas rápidas em cascata (harpa mágica)
      for (let i = 0; i < 3; i++) {
        const noteTime = now + (i * 0.08);
        const freq = notes[Math.floor(Math.random() * notes.length)];

        const osc = this.synthContext.createOscillator();
        const gain = this.synthContext.createGain();

        // Tipo de onda senoidal suave com toque triangular
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        // Configura envelope de volume (Ataque rápido, Decaimento longo e romântico)
        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.06, noteTime + 0.02); // Pico de volume baixo e confortável
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.8); // Desaparece em 800ms

        osc.connect(gain);
        gain.connect(this.synthContext.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.85);
      }
    } catch (e) {
      console.error("Falha ao tocar sino sintético: ", e);
    }
  }
}

// Instância única global exportada
export const audioManager = new AudioManager();
