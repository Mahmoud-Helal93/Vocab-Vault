import React, { useState } from "react";
import { Settings, ArrowRight, CheckCircle2, ChevronRight, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CURRENT_WORD = {
  word: "capricious",
  pos: "adjective",
  definition: "Given to sudden, unaccountable changes of mood or behavior.",
  examples: [
    "The capricious nature of the weather ruined our picnic plans.",
    "A capricious and often brutal administration.",
    "She is capricious; one moment she is cheerful, the next she is entirely gloomy."
  ],
  synonyms: ["fickle", "whimsical", "mercurial"],
  root: "capra (Latin: goat)",
  family: ["caprice", "capriciousness"]
};

export function Coach() {
  const [sessionState, setSessionState] = useState<"brief" | "session-front" | "session-back" | "completed">("brief");

  return (
    <div className="min-h-[900px] bg-[#FAFAF8] text-[#2C2E27] font-sans selection:bg-[#E3E7D3] flex flex-col">
      <style dangerouslySetInlineStyle={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          .font-coach { font-family: 'Lora', serif; }
          .font-ui { font-family: 'Plus Jakarta Sans', sans-serif; }
        `
      }} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-3xl mx-auto w-full">
        
        {sessionState === "brief" && (
          <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {/* Coaching Copy */}
            <div className="text-center space-y-4">
              <h1 className="font-coach text-4xl md:text-5xl font-medium tracking-tight text-[#1A1C16]">
                You're on day 12 of your streak — let's keep it going.
              </h1>
            </div>

            {/* Today's Brief Card */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEBE6] flex flex-col items-center text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#8F9B79]" />
              
              <div className="space-y-3">
                <p className="font-coach text-2xl text-[#4A4C42] italic">Good morning.</p>
                <p className="font-ui text-lg text-[#6A6D63]">
                  Today: <strong className="text-[#2C2E27] font-semibold">18 reviews</strong> + <strong className="text-[#2C2E27] font-semibold">6 new words</strong>. ~23 minutes.
                </p>
              </div>

              <Button 
                onClick={() => setSessionState("session-front")}
                className="font-ui text-lg bg-[#8F9B79] hover:bg-[#7A8765] text-white rounded-full px-10 py-7 h-auto shadow-sm transition-all hover:-translate-y-0.5"
              >
                Begin session <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {/* Session Preview */}
              <div className="pt-6 border-t border-[#F2F2F0] w-full space-y-4">
                <p className="font-ui text-sm text-[#8B8E83] uppercase tracking-wider font-semibold">Today's words</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["capricious", "didactic", "disseminate", "austere"].map(word => (
                    <span key={word} className="font-ui text-sm bg-[#F5F6F3] text-[#4A4C42] px-4 py-2 rounded-full">
                      {word}
                    </span>
                  ))}
                  <span className="font-ui text-sm bg-[#F5F6F3] text-[#8B8E83] px-4 py-2 rounded-full italic">
                    + 14 more
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {sessionState === "session-front" && (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center w-full mb-12 px-4">
               <span className="font-ui text-sm font-semibold text-[#8B8E83] uppercase tracking-wider">Word 1 of 24</span>
               <Button variant="ghost" className="font-ui text-[#8B8E83] hover:text-[#4A4C42]" onClick={() => setSessionState("brief")}>Pause</Button>
            </div>
            
            <div className="w-full max-w-2xl bg-white rounded-[2rem] p-12 md:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEBE6] flex flex-col items-center justify-center min-h-[400px] text-center cursor-pointer transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]" onClick={() => setSessionState("session-back")}>
              <h2 className="font-coach text-5xl md:text-7xl font-medium text-[#1A1C16] tracking-tight">
                {CURRENT_WORD.word}
              </h2>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => setSessionState("session-back")}
                variant="outline"
                className="font-ui text-lg border-[#D4D6CC] text-[#4A4C42] hover:bg-[#F5F6F3] rounded-full px-8 py-6 h-auto shadow-sm"
              >
                <Eye className="mr-2 w-5 h-5" /> Reveal Definition
              </Button>
            </div>
          </div>
        )}

        {sessionState === "session-back" && (
          <div className="w-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center w-full mb-8 px-4">
               <span className="font-ui text-sm font-semibold text-[#8B8E83] uppercase tracking-wider">Word 1 of 24</span>
               <Button variant="ghost" className="font-ui text-[#8B8E83] hover:text-[#4A4C42]" onClick={() => setSessionState("brief")}>Pause</Button>
            </div>

            <div className="w-full max-w-2xl bg-white rounded-[2rem] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EBEBE6] flex flex-col items-start text-left">
              <div className="flex items-baseline gap-4 mb-6">
                <h2 className="font-coach text-4xl md:text-5xl font-medium text-[#1A1C16] tracking-tight">
                  {CURRENT_WORD.word}
                </h2>
                <span className="font-ui text-lg text-[#8B8E83] italic">{CURRENT_WORD.pos}</span>
              </div>
              
              <p className="font-coach text-2xl leading-relaxed text-[#2C2E27] mb-10">
                "{CURRENT_WORD.definition}"
              </p>
              
              <div className="space-y-8 w-full border-t border-[#F2F2F0] pt-8">
                <div className="space-y-3">
                  <h4 className="font-ui text-sm font-semibold text-[#8B8E83] uppercase tracking-wider">Examples</h4>
                  <ul className="space-y-2">
                    {CURRENT_WORD.examples.slice(0, 2).map((ex, i) => (
                      <li key={i} className="font-ui text-[#6A6D63] relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#D4D6CC]">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="font-ui text-sm font-semibold text-[#8B8E83] uppercase tracking-wider">Synonyms</h4>
                    <p className="font-ui text-[#4A4C42]">{CURRENT_WORD.synonyms.join(", ")}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-ui text-sm font-semibold text-[#8B8E83] uppercase tracking-wider">Root</h4>
                    <p className="font-ui text-[#4A4C42]">{CURRENT_WORD.root}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 w-full max-w-2xl space-y-4">
              <p className="font-ui text-sm text-center text-[#8B8E83] font-medium">How was your recall?</p>
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  onClick={() => setSessionState("completed")}
                  className="font-ui text-lg bg-white border border-[#EBEBE6] text-[#6A6D63] hover:bg-[#F5F6F3] hover:text-[#4A4C42] rounded-2xl py-8 h-auto shadow-sm transition-all"
                >
                  Hard
                </Button>
                <Button 
                  onClick={() => setSessionState("completed")}
                  className="font-ui text-lg bg-[#EAECE4] text-[#4A4C42] hover:bg-[#DEDCD2] rounded-2xl py-8 h-auto shadow-sm transition-all"
                >
                  Good
                </Button>
                <Button 
                  onClick={() => setSessionState("completed")}
                  className="font-ui text-lg bg-[#8F9B79] hover:bg-[#7A8765] text-white rounded-2xl py-8 h-auto shadow-sm transition-all"
                >
                  Easy
                </Button>
              </div>
            </div>
          </div>
        )}

        {sessionState === "completed" && (
          <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out text-center pt-10">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#EAECE4] mb-4">
              <Sparkles className="w-10 h-10 text-[#8F9B79]" />
            </div>
            
            <div className="space-y-4">
              <h1 className="font-coach text-4xl md:text-5xl font-medium tracking-tight text-[#1A1C16]">
                Session complete.
              </h1>
              <p className="font-ui text-xl text-[#6A6D63] max-w-lg mx-auto leading-relaxed">
                24 words reviewed. 3 marked tough — we'll see them tomorrow. 
                Come back at 6pm for a 5-min refresher.
              </p>
            </div>

            <div className="pt-8">
              <Button 
                onClick={() => setSessionState("brief")}
                variant="outline"
                className="font-ui text-lg border-[#D4D6CC] text-[#4A4C42] hover:bg-[#F5F6F3] rounded-full px-12 py-7 h-auto shadow-sm"
              >
                Done
              </Button>
            </div>
          </div>
        )}

      </main>

      {/* Subtle Bottom Row - Only visible in brief state to keep session clean */}
      {sessionState === "brief" && (
        <footer className="p-6 md:px-12 flex justify-between items-center w-full font-ui text-sm text-[#8B8E83] animate-in fade-in duration-1000">
          <div className="flex items-center gap-3">
            {/* Fake Progress Ring */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#EBEBE6]"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#8F9B79]"
                  strokeWidth="3"
                  strokeDasharray="85, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-[#4A4C42]">12</span>
            </div>
            <span className="font-medium text-[#6A6D63]">Next milestone: 14 days</span>
          </div>

          <button className="p-2 hover:bg-[#EBEBE6] rounded-full transition-colors text-[#8B8E83]">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </button>
        </footer>
      )}
    </div>
  );
}
