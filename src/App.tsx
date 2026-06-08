/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Square, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Check, 
  Lock, 
  Unlock, 
  Info, 
  Search, 
  BookOpen, 
  ArrowRight, 
  User, 
  Layers, 
  Volume2, 
  VolumeX,
  History,
  CornerDownRight,
  Send
} from "lucide-react";
import { CHARACTERS, CLASS_TIERS, TIMELINE_EVENTS, LOCATIONS } from "./data";
import { Character, ClassTier, TimelineEvent, LocationIndex } from "./types";

// Ambient procedural synth using Web Audio API to set a pristine melancholy British mood
class MelancholySoundscape {
  private ctx: any = null;
  private intervalId: any = null;
  private isPlaying = false;

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    
    // Support standard/older web audio
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    try {
      // 1. Soft rain noise buffer
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const rainSource = this.ctx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      // Filter rain for a heavy muffled indoor roar
      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = "lowpass";
      rainFilter.frequency.value = 350;

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      rainSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(this.ctx.destination);
      rainSource.start();

      // 2. Slow, melancholic sparse piano arpeggio (A Minor / C Major)
      const pianoNotes = [
        110.00, // A2
        130.81, // C3
        146.83, // D3
        164.81, // E3
        196.00, // G3
        220.00, // A3
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00  // A4
      ];

      const playPianoNode = () => {
        if (!this.ctx || this.ctx.state === "closed") return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = "sine";
        // Slightly detuned randomly for that old-tape room piano flavor
        const baseFreq = pianoNotes[Math.floor(Math.random() * pianoNotes.length)];
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        // Slow attack
        gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.1);
        // Long decay simulating a wet pedal inside an empty hall
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 4.0);
      };

      // Play initially
      playPianoNode();

      this.intervalId = setInterval(() => {
        // Sparse distribution (60% chance) to evoke silence and loneliness
        if (Math.random() < 0.6) {
          playPianoNode();
        }
      }, 1800);

    } catch (e) {
      console.error("Audio Context initialization failed: ", e);
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.ctx) {
      this.ctx.close();
    }
  }
}

export default function App() {
  // Soundscape
  const [ambientActive, setAmbientActive] = useState<boolean>(false);
  const soundscapeRef = useRef<MelancholySoundscape | null>(null);

  // States
  const [selectedChar, setSelectedChar] = useState<Character>(CHARACTERS[0]);
  const [charTab, setCharTab] = useState<"album" | "facade" | "secret" | "relations">("album");
  const [activeCut, setActiveCut] = useState<any | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassTier>(CLASS_TIERS[1]);
  const [timelineFilter, setTimelineFilter] = useState<"all" | "key" | "loss">("all");
  const [selectedLocation, setSelectedLocation] = useState<LocationIndex>(LOCATIONS[4]); // Ashby Flat as default

  useEffect(() => {
    soundscapeRef.current = new MelancholySoundscape();
    return () => {
      soundscapeRef.current?.stop();
    };
  }, []);

  const toggleAmbient = () => {
    if (ambientActive) {
      soundscapeRef.current?.stop();
      setAmbientActive(false);
    } else {
      soundscapeRef.current?.start();
      setAmbientActive(true);
    }
  };

  const filteredTimeline = TIMELINE_EVENTS.filter(evt => {
    if (timelineFilter === "key") return evt.isKey;
    if (timelineFilter === "loss") return evt.isLoss;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07080b] text-[#e2d9c8] font-body selection:bg-[#b8963c] selection:text-[#07080b] relative pb-24">
      {/* Visual background atmospheric noise */}
      <div className="noise-overlay" />

      {/* FIXED AUDIO CONTROLLERS */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          id="toggle-audio-ambient"
          onClick={toggleAmbient}
          className={`flex items-center gap-3 px-5 py-3 rounded-full border text-xs tracking-[0.25em] uppercase transition-all duration-500 backdrop-blur-md shadow-2xl hover:scale-105 ${
            ambientActive 
              ? "bg-[#131520]/90 border-[#b8963c] text-[#d4af6a] animate-pulse" 
              : "bg-[#0d0e13]/80 border-[#3a3830] text-[#5a5650]"
          }`}
        >
          {ambientActive ? (
            <>
              <Volume2 className="h-4.5 w-4.5 text-[#d4af6a]" />
              <span>빗소리 &amp; 피아노 ON</span>
            </>
          ) : (
            <>
              <VolumeX className="h-4.5 w-4.5" />
              <span>사운드스케이프 OFF</span>
            </>
          )}
        </button>
      </div>

      {/* ─── HERO BANNER ─── */}
      <header className="min-h-screen flex flex-col items-center justify-center relative border-b border-[#1e1e26] overflow-hidden px-4 md:px-0">
        {/* Subtle background abstract light lines */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,#1a1608_0%,transparent_70%)] opacity-80" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-[#7a6228]" />
        
        <div className="relative text-center z-10 max-w-4xl px-4 flex flex-col items-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#b8963c] mb-6 font-serif opacity-90">
            London · 2007 – 2026 · Class Romance
          </p>
          
          <h1 id="app-title-display" className="font-serif text-5xl md:text-8xl font-light tracking-wide text-[#e2d9c8] leading-none mb-3">
            Heron <span className="italic text-[#d4af6a] font-light">&amp; Langley</span>
          </h1>

          <div className="flex items-center gap-6 my-6 w-full justify-center">
            <span className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-[#7a6228]" />
            <div className="h-2 w-2 bg-[#b8963c] rotate-45 flex-shrink-0 animate-spin-slow" />
            <span className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-[#7a6228]" />
          </div>

          <p id="app-sub-lore" className="text-xs tracking-[0.25em] uppercase text-[#5a5650] max-w-xl font-normal leading-relaxed mb-8">
            Modern British Upper Class · Fallen House · Heavy Silence subtext
          </p>

          <p className="font-serif italic text-lg md:text-xl text-[#8b8478] max-w-xl leading-relaxed border-t border-[#1e1e26] pt-6 font-light">
            “침묵이 가장 오래 남는다.<br />먼지가 내려앉은 피아노의 얼어붙은 금속 현처럼, 정적이야말로 우리가 마주해온 가장 오랜 상죄였다.”
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-[#7a6228]" />
      </header>

      {/* ─── INTRO CLASSIFICATION ─── */}
      <section id="class-structure-section" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] tracking-[0.35em] text-[#b8963c] uppercase block mb-3">Social Hierarchy</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#e2d9c8] tracking-tight">런던 보이지 않는 선, 계급 구조</h2>
          <div className="w-12 h-px bg-[#7a6228] mt-4" />
        </div>

        {/* Dynamic Class Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 p-0.5 bg-[#1e1e26] border border-[#1e1e26] rounded shadow-2xl mb-10 overflow-hidden">
          {CLASS_TIERS.map((tier) => (
            <button
              key={tier.tier}
              id={`tier-card-${tier.tier.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedClass(tier)}
              className={`text-left p-6 transition-all duration-500 relative cursor-pointer outline-none focus:ring-1 focus:ring-[#b8963c] ${
                selectedClass.tier === tier.tier
                  ? "bg-[#131520]"
                  : "bg-[#0d0e13] hover:bg-[#111218]"
              }`}
            >
              {selectedClass.tier === tier.tier && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#b8963c]" />
              )}
              <span className={`text-[10px] tracking-[0.25em] block mb-2 uppercase ${
                tier.highlight ? "text-[#d4af6a]" : tier.fallen ? "text-red-900" : "text-[#5a5650]"
              }`}>
                {tier.tier}
              </span>
              <h3 className={`font-serif text-xl font-normal ${
                tier.highlight ? "text-[#d4af6a]" : tier.fallen ? "text-[#b08080]" : "text-[#e2d9c8]"
              } ${tier.tier.includes("5") ? "underline decoration-neutral-800" : ""}`}>
                {tier.name}
              </h3>
              <p className="text-xs text-[#5a5650] mt-3 line-clamp-3 leading-relaxed">
                {tier.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Class Context Details Display */}
        <div className="bg-[#0d0e13] border border-[#1e1e26] rounded p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative shadow-lg">
          <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#07080b] px-4 py-1 border border-[#1e1e26] text-[10px] tracking-widest text-[#b8963c] uppercase">
            {selectedClass.tier} 심층 기록
          </div>
          <div className="max-w-2xl">
            <h4 className="font-serif text-2xl text-[#d4af6a] font-normal mb-2 tracking-wide">
              {selectedClass.name}
            </h4>
            <p className="text-sm md:text-base text-[#8b8478] leading-relaxed italic font-serif">
              “{selectedClass.context}”
            </p>
          </div>
          <div className="px-6 py-4 bg-[#131520] border border-[#2a2418] rounded flex items-center gap-3">
            <Layers className="h-5 w-5 text-[#b8963c] flex-shrink-0" />
            <div className="text-xs">
              <span className="text-[#5a5650] block">계급 영향 강도</span>
              <span className="text-[#e2d9c8] font-serif tracking-widest">
                {selectedClass.highlight ? "최상급 영향력 [극심]" : selectedClass.fallen ? "말소 및 고립 [취약]" : "현실적 저항 및 축적"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <p className="text-xs text-[#5a5650] italic font-serif">
            *돈 이야기는 변호사나 오래 머문 메이플 집사를 통합니다. 헤론의 곁에 선 모욕은 언제나 극도로 정중한 미소로 조소합니다.
          </p>
        </div>
      </section>

      <hr className="border-[#1e1e26] max-w-6xl mx-auto" />

      {/* ─── CHARACTERS DOSSIERS (CAST) ─── */}
      <section id="cast-section" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] tracking-[0.35em] text-[#b8963c] uppercase block mb-3">The Dramatis Personae</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#e2d9c8] tracking-tight">비밀 가방, 인물 도첩</h2>
          <p className="text-[#5a5650] text-xs mt-2 tracking-widest uppercase">클릭하여 각 인물의 내면과 숨겨진 관계선을 열어보십시오.</p>
          <div className="w-12 h-px bg-[#7a6228] mt-4" />
        </div>

        {/* Character Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              id={`char-selector-${char.id}`}
              onClick={() => {
                setSelectedChar(char);
                setCharTab("facade"); // Reset sub tab
              }}
              className={`p-4 border transition-all duration-500 rounded text-center relative overflow-hidden group hover:scale-[1.02] ${
                selectedChar.id === char.id
                  ? "bg-[#131520] border-[#b8963c] shadow-xl"
                  : "bg-[#0d0e13]/60 border-[#1e1e26] hover:border-[#3a3830]"
              }`}
            >
              <span className="text-3xl block mb-2">{char.symbol.trim().split(" ")[0]}</span>
              <h3 className={`font-serif text-base tracking-wide ${
                selectedChar.id === char.id ? "text-[#d4af6a]" : "text-[#e2d9c8] group-hover:text-[#d4af6a]"
              }`}>
                {char.name}
              </h3>
              <p className="text-[9px] tracking-wider text-[#5a5650] uppercase mt-1">
                {char.age}세 · {char.id === "richard" ? "가주" : char.id === "kenneth" ? "수석 집사" : "참여자"}
              </p>
            </button>
          ))}
        </div>

        {/* Dynamic Detailed Character Panel (Bento style) */}
        <div className="bg-[#0d0e13] border border-[#1e1e26] rounded-lg overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
          
          {/* Avatar & Identifiers */}
          <div className="md:col-span-4 bg-[#0a0a0f] p-8 border-b md:border-b-0 md:border-r border-[#1e1e26] flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#1a1608] to-transparent opacity-30 pointer-events-none" />
            <div>
              <span className="text-4xl block mb-4">{selectedChar.symbol}</span>
              <h3 className="font-serif text-3xl font-light text-[#e2d9c8] tracking-wide">
                {selectedChar.name}
              </h3>
              <p className="text-xs tracking-widest text-[#b8963c] uppercase mt-1 mb-6">
                {selectedChar.meta}
              </p>

              {/* Profile Image with 1216:832 aspect ratio */}
              <div id={`profile-pic-frame-${selectedChar.id}`} className="relative aspect-[1216/832] w-full overflow-hidden bg-[#07080b] rounded-md border border-[#1e1e26] mb-6">
                <img
                  src={
                    selectedChar.id === "claude" ? "https://i.postimg.cc/cHWFc4pN/6.webp" :
                    selectedChar.id === "julian" ? "https://i.postimg.cc/k5Kj8tpm/7.webp" :
                    selectedChar.id === "richard" ? "https://i.postimg.cc/B63mCQr1/3.webp" :
                    selectedChar.id === "kenneth" ? "https://i.postimg.cc/qRr1GMPz/4.webp" :
                    "https://i.postimg.cc/LXSxV6cp/5.webp" // owen
                  }
                  alt={`${selectedChar.name} 프로필`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none filter brightness-90 grayscale-[10%]"
                />
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              </div>

              {/* Quick Spec List */}
              <div className="space-y-3 pt-6 border-t border-[#1e1e26]">
                <div>
                  <span className="text-[10px] uppercase text-[#5a5650] block tracking-widest">외향 나이 및 체격</span>
                  <p className="text-xs text-[#e2d9c8] font-serif tracking-wider">
                    {selectedChar.age}세 · Height {selectedChar.height}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#5a5650] block tracking-widest">머리칼 및 홍채</span>
                  <p className="text-xs text-[#e2d9c8] font-serif tracking-wider">
                    {selectedChar.appearance.hair} / {selectedChar.appearance.eyes}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-[#5a5650] block tracking-widest">시그니처 의관</span>
                  <p className="text-xs text-[#e2d9c8] font-serif tracking-wider">
                    {selectedChar.appearance.clothes}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags strip */}
            <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t border-[#1e1e26]">
              {selectedChar.tags.map(t => (
                <span key={t} className="text-[9px] px-2.5 py-1 bg-[#131520] border border-[#2a2418] rounded-full text-[#b8963c] tracking-wider uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Dossier Tabs & Content Panel */}
          <div className="md:col-span-8 p-8 flex flex-col">
            {/* Nav tabs inside the card */}
            <div className="flex border-b border-[#1e1e26] mb-8 gap-4 overflow-x-auto pb-px">
              <button
                id="btn-tab-album"
                onClick={() => setCharTab("album")}
                className={`py-3 px-1 text-xs tracking-[0.25em] uppercase border-b-2 transition-all font-serif whitespace-nowrap cursor-pointer ${
                  charTab === "album"
                    ? "border-[#b8963c] text-[#d4af6a]"
                    : "border-transparent text-[#5a5650] hover:text-[#8b8478]"
                }`}
              >
                시네마틱 앨범 (Album)
              </button>
              <button
                id="btn-tab-facade"
                onClick={() => setCharTab("facade")}
                className={`py-3 px-1 text-xs tracking-[0.25em] uppercase border-b-2 transition-all font-serif whitespace-nowrap cursor-pointer ${
                  charTab === "facade"
                    ? "border-[#b8963c] text-[#e2d9c8]"
                    : "border-transparent text-[#5a5650] hover:text-[#8b8478]"
                }`}
              >
                표면 장식 (Facade)
              </button>
              <button
                id="btn-tab-secret"
                onClick={() => setCharTab("secret")}
                className={`py-3 px-1 text-xs tracking-[0.25em] uppercase border-b-2 transition-all font-serif flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  charTab === "secret"
                    ? "border-[#b8963c] text-[#d4af6a]"
                    : "border-transparent text-[#5a5650] hover:text-[#8b8478]"
                }`}
              >
                <Lock className="h-3 w-3 text-[#7a6228]" />
                숨겨진 내면 (Inner Secrets)
              </button>
              <button
                id="btn-tab-relations"
                onClick={() => setCharTab("relations")}
                className={`py-3 px-1 text-xs tracking-[0.25em] uppercase border-b-2 transition-all font-serif whitespace-nowrap cursor-pointer ${
                  charTab === "relations"
                    ? "border-[#b8963c] text-[#e2d9c8]"
                    : "border-transparent text-[#5a5650] hover:text-[#8b8478]"
                }`}
              >
                감시 기록 및 관계선 (Threads)
              </button>
            </div>

            {/* Active Content rendering */}
            <div className="flex-1 flex flex-col justify-between">
              
              {charTab === "album" && (
                <div className="animate-fadeIn space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#1e1e26]/60 pb-3">
                    <div>
                      <span className="text-[10px] text-[#b8963c] tracking-widest uppercase block font-serif">앨범 (Gallery)</span>
                      <span className="text-xs text-[#5a5650] block mt-0.5 font-sans">
                        클릭 시 확대 감상 가능
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#b8963c] border border-[#2a2418] px-2.5 py-1 rounded bg-[#07080b]">
                      5 Cuts Loaded
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {selectedChar.album?.map((cut) => (
                      <div
                        key={cut.id}
                        id={`album-cut-card-${cut.id}`}
                        onClick={() => setActiveCut(cut)}
                        className="group relative bg-[#07080b] border border-[#1e1e26] rounded-md overflow-hidden aspect-[3/2] cursor-pointer hover:border-[#b8963c] transition-all duration-500 shadow-lg hover:shadow-[#b8963c]/10"
                      >
                        {/* Film image frame */}
                        <img
                          src={cut.image}
                          alt="Cinematic Cut"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                          <span className="text-[9px] tracking-widest text-[#d4af6a] uppercase font-serif bg-[#07080b]/90 border border-[#b8963c]/30 px-2 py-0.5 rounded">
                            ZOOM VIEW
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-[#131520]/20 border border-[#1e1e26] rounded text-xs text-[#5a5650] flex gap-3 items-center">
                    <Sparkles className="h-3.5 w-3.5 text-[#b8963c] flex-shrink-0" />
                    <span>클릭시 확대 가능</span>
                  </div>
                </div>
              )}

              {charTab === "facade" && (
                <div className="animate-fadeIn">
                  <span className="text-[10px] text-[#b8963c] tracking-widest uppercase block mb-3 font-serif">상류사회를 장식하는 가면태</span>
                  <p className="text-sm md:text-base text-[#c4bcae] leading-relaxed font-serif">
                    {selectedChar.surface}
                  </p>
                </div>
              )}

              {charTab === "secret" && (
                <div className="animate-fadeIn">
                  <span className="text-[10px] text-[#b8963c] tracking-widest uppercase block mb-3 font-serif">숨겨진 내면 (Inner Secrets)</span>
                  <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed italic border-l-2 border-[#b8963c] pl-4 py-1 font-serif">
                    {selectedChar.hiddenInner}
                  </p>
                </div>
              )}

              {charTab === "relations" && (
                <div className="animate-fadeIn space-y-4">
                  <span className="text-[10px] text-[#b8963c] tracking-widest uppercase block mb-2 font-serif">타인을 향한 계산 및 대사</span>
                  
                  {selectedChar.relationships.length > 0 ? (
                    <div className="space-y-4 max-h-72 overflow-y-auto pr-2 lore-scroll">
                      {selectedChar.relationships.map((rel, index) => (
                        <div key={index} className="p-4 bg-[#131520]/60 border border-[#1e1e26] rounded flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <CornerDownRight className="h-3 w-3 text-[#b8963c]" />
                            <span className="text-[10px] text-[#b8963c] tracking-widest uppercase font-serif">{rel.target}</span>
                          </div>
                          <p className="text-xs text-[#cbd5e1] leading-relaxed font-serif italic pl-5">
                            {rel.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#5a5650] italic">수면 위에 드러난 관계 흔적이 기록되지 않았거나 엄격히 말소되었습니다.</p>
                  )}
                </div>
              )}

              {/* Static Signature Quote display */}
              <div className="mt-8 pt-6 border-t border-[#1e1e26] bg-[#07080b]/30 p-4 rounded">
                <span className="text-[9px] tracking-widest text-[#5a5650] uppercase block mb-1">시그니처 독백 스크롤</span>
                <p className="font-serif italic text-base text-[#d4af6a] leading-relaxed">
                  {selectedChar.quote}
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <hr className="border-[#1e1e26] max-w-6xl mx-auto" />

      {/* ─── SCENIC TIMELINE (연표) ─── */}
      <section id="timeline-section" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] tracking-[0.35em] text-[#b8963c] uppercase block mb-3">Scenic Records</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#e2d9c8] tracking-tight">수장과 대립 가문, 역사 연표</h2>
          <div className="w-12 h-px bg-[#7a6228] mt-4 mb-6" />

          {/* Timeline filter controls */}
          <div className="flex bg-[#0d0e13] border border-[#1e1e26] rounded-full p-1 max-w-md mx-auto">
            <button
              id="timeline-btn-all"
              onClick={() => setTimelineFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all uppercase tracking-widest font-serif whitespace-nowrap cursor-pointer ${
                timelineFilter === "all" ? "bg-[#b8963c] text-[#07080b]" : "text-[#5a5650] hover:text-[#cbd5e1]"
              }`}
            >
              전체 연대표
            </button>
            <button
              id="timeline-btn-key"
              onClick={() => setTimelineFilter("key")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all uppercase tracking-widest font-serif whitespace-nowrap cursor-pointer ${
                timelineFilter === "key" ? "bg-[#b8963c] text-[#07080b]" : "text-[#5a5650] hover:text-[#cbd5e1]"
              }`}
            >
              주요 분기점 (Key)
            </button>
            <button
              id="timeline-btn-loss"
              onClick={() => setTimelineFilter("loss")}
              className={`px-4 py-1.5 rounded-full text-xs transition-all uppercase tracking-widest font-serif whitespace-nowrap cursor-pointer ${
                timelineFilter === "loss" ? "bg-[#b8963c] text-[#07080b]" : "text-[#5a5650] hover:text-[#cbd5e1]"
              }`}
            >
              가문 파멸/손실 (Loss)
            </button>
          </div>
        </div>

        {/* Vertical Connected timeline line */}
        <div className="relative border-l border-neutral-900/60 pl-8 space-y-12 ml-4">
          {filteredTimeline.map((item, index) => (
            <div
              key={index}
              id={`timeline-point-${index}`}
              className="relative group transition-all duration-300 hover:translate-x-1"
            >
              {/* Outer rotated square indicator representing class diamond */}
              <div className={`absolute -left-[38px] top-1 w-4 h-4 rotate-45 border transition-all duration-500 flex items-center justify-center ${
                item.isKey 
                  ? "bg-[#b8963c] border-[#d4af6a] scale-110 shadow-[0_0_10px_rgba(184,150,60,0.4)]"
                  : item.isLoss 
                    ? "bg-[#5a3030] border-[#b08080]" 
                    : "bg-[#07080b] border-[#3a3830]"
              }`} />

              <div className="text-[10px] tracking-[0.25em] font-serif text-[#b8963c] uppercase block mb-1">
                {item.date}
              </div>
              
              <h3 className={`font-serif text-xl font-normal tracking-wide transition-all ${
                item.isKey 
                  ? "text-[#d4af6a]" 
                  : item.isLoss 
                    ? "text-[#b08080]" 
                    : "text-[#e2d9c8]"
              }`}>
                {item.event}
              </h3>

              <p className="text-sm text-[#8b8478] leading-relaxed font-serif italic mt-2 border-l border-neutral-950 pl-3">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-[#5a5650] italic font-serif">
            귀국의 정적과 충성, 그리고 9년의 어둠 끝에 비로소 모든 정적이 한꺼번에 무너지기 시작합니다.
          </p>
        </div>
      </section>

      <hr className="border-[#1e1e26] max-w-6xl mx-auto" />

      {/* ─── KEY LOCATIONS (주요 공간) ─── */}
      <section id="locations-section" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-[10px] tracking-[0.35em] text-[#b8963c] uppercase block mb-3">Spatial Records</span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#e2d9c8] tracking-tight">수치화된 그림자, 런던의 무대</h2>
          <div className="w-12 h-px bg-[#7a6228] mt-4 mb-4" />
          <p className="text-xs text-[#5a5650] tracking-widest uppercase">각 장소를 클릭하여 우측 상세도에 세밀한 묘사를 고정하십시오.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card list of locations */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3 p-1 bg-[#1e1e26]/30 border border-[#1e1e26] rounded">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                id={`location-card-${loc.id}`}
                onClick={() => setSelectedLocation(loc)}
                className={`text-left p-5 transition-all duration-500 rounded relative cursor-pointer outline-none ${
                  selectedLocation.id === loc.id
                    ? "bg-[#131520] border border-[#b8963c] shadow-lg"
                    : "bg-[#0d0e13] border border-transparent hover:border-[#1e1e26]"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-lg">{loc.icon}</span>
                  <h3 className="font-serif text-lg tracking-wide text-[#e2d9c8]">
                    {loc.name}
                  </h3>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-[#b8963c] font-serif mb-3 block">
                  {loc.address}
                </p>
                <p className="text-xs text-[#5a5650] line-clamp-2 leading-relaxed italic">
                  {loc.desc}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {loc.who.map(p => (
                    <span key={p} className="text-[8px] bg-[#07080b] border border-neutral-900 rounded p-1 text-[#8b8478]">
                      {p.replace("Heron", "").trim()}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Focal details of the selected location */}
          <div className="lg:col-span-5 bg-[#0d0e13] border border-[#1e1e26] rounded-lg p-8 shadow-2xl relative">
            <span className="text-[10px] tracking-widest text-[#7a6228] uppercase font-serif block mb-1">SELECTED PLACE</span>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedLocation.icon}</span>
              <h3 className="font-serif text-3xl font-light text-[#e2d9c8] tracking-wide">{selectedLocation.name}</h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#b8963c] mb-6 font-serif border-b border-[#1e1e26] pb-3">
              {selectedLocation.address}
            </p>

            <span className="text-[10px] text-[#5a5650] uppercase tracking-widest block mb-2 font-serif">공간적 고발과 묘사</span>
            <p className="text-sm leading-relaxed text-[#c4bcae] font-serif italic mb-8">
              “{selectedLocation.desc}”
            </p>

            <span className="text-[10px] text-[#5a5650] uppercase tracking-widest block mb-3 font-serif">밀착 목격자들 (Active Presence)</span>
            <div className="space-y-2">
              {selectedLocation.who.map(p => (
                <div key={p} className="flex items-center gap-3 p-3 bg-[#131520]/50 border border-[#1e1e26] rounded">
                  <User className="h-4 w-4 text-[#b8963c]" />
                  <span className="text-xs font-serif tracking-widest text-[#cbd5e1]">{p}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[#1e1e26] mt-24 pt-16 px-6 text-center max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-[#b8963c] mb-2 font-serif font-light">
          Heron × Langley · Dramatic Compendium
        </p>
        <p className="text-[10px] tracking-[0.2em] text-[#3a3830] uppercase mb-4">
          London · Period of 2007 – 2026 · Built with Pristine Refined Layout
        </p>
        <p className="text-[9px] text-[#24231b] italic font-serif">
          모든 고요는 침묵으로 장식되고, 오직 복수의 무음만이 런던 시내의 가을 안개를 메웁니다.
        </p>
      </footer>

      {/* ─── NARRATIVE SCENE LIGHTBOX MODAL ─── */}
      {activeCut && (
        <div 
          id="narrative-album-modal" 
          onClick={() => setActiveCut(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative w-full max-w-4xl bg-black rounded overflow-hidden shadow-2xl border border-[#b8963c]/30"
          >
            {/* Float Close button inside the frame */}
            <button
              id="btn-close-modal"
              onClick={() => setActiveCut(null)}
              className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-[#07080b]/90 backdrop-blur border border-[#1e1e26] hover:border-[#b8963c] text-[10px] font-sans text-[#cbd5e1] hover:text-[#d4af6a] transition rounded uppercase tracking-widest cursor-pointer"
            >
              닫기 ×
            </button>

            {/* Pristine Large Photo Frame with zero descriptive labels */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src={activeCut.image}
                alt="Enlarged Cinematic Motifs"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mx-auto select-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
