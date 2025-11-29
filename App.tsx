
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Heart, Sparkles, Gem, Plane, HandHeart, Quote, BookOpen } from 'lucide-react';
import { MusicPlayer } from './components/MusicPlayer';
import { JournalState } from './types';

// --- Constants ---

const IMAGES = {
  intro: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/77ff766b-f373-4241-a1ef-de912cbc7362.png",
  growth: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/cfd760cf-bcac-4e43-bdb1-928b799a2489.png",
  core: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/5816784c-ea93-4dd4-b748-2df82c58fb0b.png",
  promise: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/2c06afb5-d221-4bc4-9e26-a928f1f37324.png",
  action: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/97456f33-e0b9-4915-9d62-4cf6b4d28cfe.png",
  bond: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/e71873d7-5aa8-4404-90c2-c870b463bc31.png",
  finale: "https://pub-e08d794ef1ea4b5d9b36233b86975b51.r2.dev/generated-images/741be445-5e62-4a19-b19a-15a0f4a39d00.png"
};

// --- Visual Components ---

const ImageCard: React.FC<{ src: string; caption?: string }> = ({ src, caption }) => (
  <div className="group relative w-full aspect-square max-w-[350px] md:max-w-[450px] lg:max-w-[500px] 2xl:max-w-[850px] mx-auto perspective-1000 transition-all duration-500">
    <div className="relative w-full h-full transform transition-transform duration-700 hover:scale-[1.02] shadow-2xl rounded-sm overflow-hidden border-[6px] md:border-[8px] 2xl:border-[16px] border-white bg-white">
      <img 
        src={src} 
        alt={caption} 
        className="w-full h-full object-cover"
      />
      {/* Light Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>
    </div>
    {/* Soft Shadow Glow */}
    <div className="absolute -inset-4 bg-rose-500/20 blur-2xl -z-10 rounded-full opacity-60"></div>
  </div>
);

const TextPanel: React.FC<{ children: React.ReactNode; title?: string; icon?: React.ReactNode }> = ({ children, title, icon }) => (
  <div className="relative w-full overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 lg:p-10 2xl:p-16 shadow-lg text-[#5c524f] flex flex-col max-h-[50vh] md:max-h-none 2xl:h-auto 2xl:justify-center">
    {/* Decorative lighting inside card */}
    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 2xl:w-64 2xl:h-64 bg-gradient-to-br from-rose-200 to-transparent blur-2xl opacity-50 rounded-full pointer-events-none"></div>
    
    {(title || icon) && (
      <div className="flex items-center gap-3 mb-4 md:mb-6 2xl:mb-10 border-b border-[#a89f91]/20 pb-4 shrink-0">
        {icon && <div className="text-rose-500 2xl:scale-150 origin-left">{icon}</div>}
        {title && <h2 className="font-serif text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-[#4a403a] font-bold tracking-wide">{title}</h2>}
      </div>
    )}
    
    <div className="font-serif text-base md:text-lg 2xl:text-3xl leading-relaxed space-y-4 2xl:space-y-8 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
      {children}
    </div>
  </div>
);

const SunFlare = () => (
  <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20 overflow-hidden">
     <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[800px] 2xl:w-[1200px] h-[500px] md:h-[800px] 2xl:h-[1200px] bg-radial-gradient from-orange-100/30 to-transparent blur-3xl opacity-60 animate-pulse-slow"></div>
     <div className="absolute bottom-[-10%] left-[-10%] w-[400px] md:w-[600px] 2xl:w-[1000px] h-[400px] md:h-[600px] 2xl:h-[1000px] bg-radial-gradient from-rose-100/20 to-transparent blur-3xl opacity-40"></div>
  </div>
);

// --- Cover Screen (Start Page) ---

const CoverScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#f2efe9] overflow-hidden">
    {/* Background Image blurred */}
    <div 
      className="absolute inset-0 bg-cover bg-center blur-md opacity-60 scale-110"
      style={{ backgroundImage: `url(${IMAGES.intro})` }}
    />
    <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
    <div className="texture-overlay opacity-30"></div>
    
    {/* Card */}
    <div className="relative z-10 flex flex-col items-center p-8 md:p-14 2xl:p-24 bg-white/80 backdrop-blur-xl rounded-sm shadow-2xl border-8 border-white max-w-md 2xl:max-w-4xl w-[80%] text-center animate-in fade-in zoom-in duration-1000">
      <div className="mb-6 2xl:mb-12 text-rose-500">
        <Heart size={48} className="fill-rose-500 animate-pulse-slow 2xl:w-24 2xl:h-24" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl 2xl:text-8xl font-bold mb-3 2xl:mb-6 text-[#4a403a] tracking-tight">The Confession</h1>
      <div className="w-16 2xl:w-32 h-1 2xl:h-2 bg-[#a89f91] mb-6 2xl:mb-10 opacity-30"></div>
      <p className="font-serif italic text-lg md:text-xl 2xl:text-4xl mb-10 2xl:mb-20 text-stone-600">To: 小妹宝</p>
      
      <button 
        onClick={onStart} 
        className="group relative px-8 2xl:px-16 py-3 2xl:py-6 bg-[#4a403a] text-white font-serif tracking-widest uppercase text-sm md:text-base 2xl:text-2xl rounded-sm shadow-xl hover:bg-[#2c2622] transition-all hover:scale-105 active:scale-95 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
          <BookOpen size={18} className="2xl:w-8 2xl:h-8" />
          Open Journal
        </span>
        <div className="absolute inset-0 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0"></div>
      </button>
    </div>
    
    <div className="absolute bottom-8 text-stone-500 text-xs 2xl:text-xl font-serif opacity-60 tracking-widest">
      DESIGNED WITH LOVE
    </div>
  </div>
);

// --- Slides ---

const Slide1Intro: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 2xl:gap-32 h-full pt-4 md:pt-0">
    <div className="flex-1 w-full max-w-lg 2xl:max-w-5xl order-2 md:order-1 px-4 md:px-0">
      <div className="relative mb-6 md:mb-8 2xl:mb-16 text-center md:text-left">
         <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl 2xl:text-9xl text-white drop-shadow-md mb-2 2xl:mb-6 font-bold opacity-90">全世界最喜欢的小妹宝</h1>
         <p className="font-serif text-lg md:text-xl 2xl:text-4xl text-white/90 italic tracking-wider">Chapter One: The Confession</p>
      </div>
      
      <TextPanel>
        <p className="first-letter:text-4xl 2xl:first-letter:text-7xl first-letter:font-dancing first-letter:mr-2 first-letter:float-left">
          你好呀！二次表白了，很激动。
        </p>
        <p>
          依然开宗明义，<span className="font-bold text-rose-600 bg-rose-50 px-1 rounded">我最喜欢你了</span>，男女之间的那种喜欢，我要正式向你表白！
        </p>
      </TextPanel>
    </div>
    <div className="flex-1 w-full max-w-[400px] md:max-w-[500px] 2xl:max-w-[850px] order-1 md:order-2 px-6 md:px-0">
      <ImageCard src={IMAGES.intro} caption="Beginnings" />
    </div>
  </div>
);

const Slide2Growth: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 2xl:gap-40 h-full pt-4 md:pt-0">
    <div className="flex-1 w-full max-w-[400px] md:max-w-[480px] 2xl:max-w-[850px] px-6 md:px-0">
      <ImageCard src={IMAGES.growth} caption="Growth" />
    </div>
    <div className="flex-1 w-full max-w-xl 2xl:max-w-5xl px-4 md:px-0">
      <TextPanel title="鸿沟" icon={<Quote size={24} />}>
         <p>一转眼就马上要到两年咯，这两年我们经历了太多身份的转变和环境的变迁，个中辛苦你我皆知。</p>
         <p>
           本来以为凭我的智商和能力，谈起恋爱来岂不是从从容容、游刃有余。没想到实际上谈起来是匆匆忙忙、连滚带爬！
         </p>
         <p>
           只能说认知和细化的行动之间存在着巨大的鸿沟。
         </p>
         <div className="my-4 2xl:my-8 p-4 2xl:p-8 bg-white/50 rounded-lg border-l-4 border-orange-300 italic text-[#7a6a5a]">
           “而如何跨越这个鸿沟，是我这两年在爱你这件事上学到的最关键的一课。”
         </div>
      </TextPanel>
    </div>
  </div>
);

const Slide3Core: React.FC = () => (
  <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12 2xl:gap-40 h-full pt-4 md:pt-0">
    <div className="flex-1 w-full max-w-[400px] md:max-w-[480px] 2xl:max-w-[850px] px-6 md:px-0">
       <ImageCard src={IMAGES.core} caption="Crystal Heart" />
    </div>
    <div className="flex-1 w-full max-w-lg 2xl:max-w-5xl px-4 md:px-0">
       <TextPanel title="见心" icon={<Gem size={24} />}>
          <p>分开的这段时间，我时常去读那份《看见琴宝指南》。</p>
          <p>看着看着，我看见了一颗像琉璃一样干净、清澈而敏感的心。这是世界上最宝贵的东西。</p>
          <p>
            小宝的眼泪，小宝的委屈，小宝的爱吃贪玩欲，小宝的希望能够得到更多的关注和爱的需求，是那么清楚地在我眼中一点点展开</p>
          <p>只能说乐晨琴确实是一个很纯粹的人，没有沾染什么市井和事故。
          </p>
          <p className="font-bold">
            你的真诚、善良、热烈、聪明、玩世，确实都是世所罕有的！
          </p>
          <p className="font-dancing text-2xl md:text-3xl 2xl:text-5xl text-center pt-4 2xl:pt-8 text-rose-600">
            你是这个世界的瑰宝！
          </p>
       </TextPanel>
    </div>
  </div>
);

const Slide4Promise: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 2xl:gap-40 h-full pt-4 md:pt-0">
    <div className="flex-1 w-full max-w-[400px] md:max-w-[480px] 2xl:max-w-[850px] px-6 md:px-0">
      <ImageCard src={IMAGES.promise} caption="Promise" />
    </div>
    <div className="flex-1 w-full max-w-lg 2xl:max-w-5xl px-4 md:px-0">
       <TextPanel title="务实" icon={<Heart size={24} />}>
          <p>
            第一次表白，也许更多是出于我想象中的爱情；但这一次，我想务实地去爱那个真实的你。
          </p>
          <p>
            其实在那之前我想好几次找小宝表白了啦，一次是你10000天的时候，一次是满载着哥哥爱的两大箱物品寄送的时候。但我总觉得还不够，总觉得还是让小宝在异国他乡受了太多委屈，这些也只是杯水车薪。
          </p>
          <p>
            所以我也做了不少务实的规划。第一点，肯定是必须跟妹明确，我喜欢的是你这个人，而不是任何其他的因素，<strong className="text-rose-600">我想成为那个能陪你疯、能接得住你的人。</strong>
          </p>
       </TextPanel>
    </div>
  </div>
);

const Slide5Action: React.FC = () => (
  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 2xl:gap-40 h-full pt-4 md:pt-0">
     <div className="flex-1 w-full max-w-[400px] md:max-w-[480px] 2xl:max-w-[850px] order-2 md:order-1 px-6 md:px-0">
        <ImageCard src={IMAGES.action} caption="Action" />
     </div>
     <div className="flex-1 w-full max-w-lg 2xl:max-w-5xl order-1 md:order-2 px-4 md:px-0">
        <TextPanel title="近乡" icon={<Plane size={24} />}>
           <p className="mb-2 text-sm md:text-base 2xl:text-3xl">
             第二点，为了迎接我们的重逢，我不只想说，更想做。所谓近乡情更怯，为了让接下来的两个月成为我们最美好的回忆，我做了一些小小的规划：
           </p>
           <div className="grid grid-cols-1 gap-2 2xl:gap-4 mb-2">
              {[
                "准备了定制的小礼物大礼包！",
                "狠狠打扫收拾家里，换了新的外观，只等妹来！",
                "主动承担更多的旅行规划组织以及行程安排",
                "我会更直白地表达想念，也会在不开心时主动沟通，不再做木头人"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-2 p-2 2xl:p-4 bg-white/40 rounded-lg hover:bg-white/60 transition-colors">
                   <div className="w-1.5 2xl:w-3 h-1.5 2xl:h-3 rounded-full bg-rose-400 shrink-0 mt-1.5 2xl:mt-3" />
                   <span className="text-xs md:text-sm 2xl:text-2xl leading-snug">{text}</span>
                </div>
              ))}
           </div>
           <p className="text-sm 2xl:text-2xl italic opacity-80 leading-relaxed">
             总之，既然小宝是我的瑰宝，那我就希望能尽量给小宝瑰宝级的待遇哈哈哈。我知道生活有时会很累，但为了我们，我会让自己变得更强，不负期待！
           </p>
        </TextPanel>
     </div>
  </div>
);

const Slide6Bond: React.FC = () => (
  <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12 2xl:gap-40 h-full pt-4 md:pt-0">
     <div className="flex-1 w-full max-w-[400px] md:max-w-[480px] 2xl:max-w-[850px] px-6 md:px-0">
        <ImageCard src={IMAGES.bond} caption="Bond" />
     </div>
     <div className="flex-1 w-full max-w-lg 2xl:max-w-5xl px-4 md:px-0">
        <TextPanel title="信心！" icon={<HandHeart size={24} />}>
           <p>
             你说当初是因为看到我毛茸茸的很心动，虽然我现在也不知道妹到底最喜欢我哪里，但我知道，我们之间有很深的羁绊。
           </p>
           <p>
             我相信我们现在的感情基础，是在一次次坦诚面对矛盾中建立起来的，而且随着对对方认知的不断加深，我们能更快地发现关键问题并处理。
           </p>
           <p className="font-bold text-[#4a403a] my-2 border-l-4 border-rose-400 pl-4 py-1 bg-rose-50/50">
             “因此，我比过去任何时候都有信心，也有决心，去维护好这段关系。”
           </p>
        </TextPanel>
     </div>
  </div>
);

const Slide7Finale: React.FC<{ data: JournalState }> = ({ data }) => (
  <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl 2xl:max-w-7xl mx-auto gap-6 md:gap-10 2xl:gap-20 px-4">
     <div className="w-48 h-48 md:w-80 md:h-80 2xl:w-[600px] 2xl:h-[600px] shadow-2xl rounded-full overflow-hidden border-4 2xl:border-8 border-white mx-auto shrink-0 transition-all duration-500">
        <img src={IMAGES.finale} className="w-full h-full object-cover" alt="Finale" />
     </div>
     
     <div className="bg-white/70 backdrop-blur-xl p-6 md:p-14 2xl:p-24 rounded-3xl shadow-2xl border border-white/60 relative w-full">
        <Sparkles className="absolute top-4 left-4 md:top-6 md:left-6 2xl:top-12 2xl:left-12 text-yellow-500 animate-spin-slow opacity-60 2xl:scale-150" size={24} />
        <Sparkles className="absolute bottom-4 right-4 md:bottom-6 md:right-6 2xl:bottom-12 2xl:right-12 text-yellow-500 animate-spin-slow opacity-60 2xl:scale-150" size={24} />

        <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-serif font-bold text-[#4a403a] mb-4 md:mb-6 2xl:mb-12 tracking-tight">
          欢迎回家，女朋友！
        </h1>
        <div className="text-lg md:text-xl 2xl:text-4xl font-serif text-[#5c524f] mb-6 md:mb-8 2xl:mb-16 leading-relaxed space-y-4 2xl:space-y-8">
           <p>表白礼物和回家后的小惊喜已经就绪咯，算是给“领导”的小贿赂。</p>
           <p>如果小妹宝愿意在回家前答应我的表白……嘿嘿</p>
           <p>那我想到时候就能牵着你的手，底气十足地说一句：</p>
        </div>
        
        <div className="border-t border-[#a89f91]/30 pt-4 md:pt-6 2xl:pt-12 mt-4 md:mt-6 2xl:mt-12 text-right">
           <p className="font-serif italic mb-2 2xl:mb-4 2xl:text-2xl">谨付寸言，聊表寸心</p>
           <p className="font-dancing text-3xl md:text-4xl 2xl:text-7xl text-[#4a403a] mb-2 2xl:mb-4">{data.senderName}</p>
           <p className="text-xs 2xl:text-xl font-serif uppercase tracking-[0.2em] text-stone-500">{data.date}</p>
        </div>
     </div>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [journalData] = useState<JournalState>({
    recipientName: '小妹宝',
    senderName: '凌添翼',
    date: '2025年11月29日'
  });

  const slides = [
    { component: <Slide1Intro />, bg: IMAGES.intro },
    { component: <Slide2Growth />, bg: IMAGES.growth },
    { component: <Slide3Core />, bg: IMAGES.core },
    { component: <Slide4Promise />, bg: IMAGES.promise },
    { component: <Slide5Action />, bg: IMAGES.action },
    { component: <Slide6Bond />, bg: IMAGES.bond },
    { component: <Slide7Finale data={journalData} />, bg: IMAGES.finale },
  ];

  const nextSlide = () => setCurrentSlide(p => Math.min(p + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(p => Math.max(p - 1, 0));

  useEffect(() => {
    if (!started) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-stone-800 bg-[#f2efe9]">
      {/* Cover Screen */}
      {!started && <CoverScreen onStart={() => setStarted(true)} />}

      {/* Dynamic Background */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Blurred Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110 blur-xl brightness-[1.1] saturate-[1.2]"
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
          {/* Tint Overlay for Readability */}
          <div className="absolute inset-0 bg-white/30 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-black/10"></div>
        </div>
      ))}

      <div className="texture-overlay opacity-20"></div>
      <SunFlare />
      
      {/* Music plays automatically after Start is clicked due to user interaction */}
      {started && <MusicPlayer />}

      {/* Content Container */}
      <main className={`relative z-10 w-full h-full flex flex-col justify-center items-center p-4 md:p-8 lg:p-12 2xl:p-20 overflow-hidden transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
        {/* Adjusted Max Width for Ultrawide: 2xl:max-w-[95vw] and relaxed max-w-5xl base */}
        <div className="w-full max-w-5xl 2xl:max-w-[95vw] h-full flex flex-col justify-center">
            <div key={currentSlide} className="animate-slideUp w-full h-full md:h-auto flex items-center justify-center">
              {slides[currentSlide].component}
            </div>
        </div>
      </main>

      {/* Navigation */}
      <div className={`fixed bottom-4 md:bottom-8 2xl:bottom-16 left-0 right-0 z-50 flex justify-center items-center gap-4 md:gap-6 2xl:gap-10 pointer-events-none transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
         <button 
           onClick={prevSlide}
           disabled={currentSlide === 0}
           className="pointer-events-auto p-3 md:p-4 2xl:p-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/40 disabled:opacity-0 transition-all hover:scale-110 shadow-lg active:scale-95"
         >
           <ChevronLeft size={20} className="md:w-6 md:h-6 2xl:w-10 2xl:h-10" />
         </button>
         
         <div className="flex gap-2 2xl:gap-4 pointer-events-auto">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 md:h-2 2xl:h-3 rounded-full transition-all duration-500 shadow-sm ${
                  idx === currentSlide ? 'w-6 md:w-8 2xl:w-16 bg-white' : 'w-1.5 md:w-2 2xl:w-4 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
         </div>

         <button 
           onClick={nextSlide}
           disabled={currentSlide === slides.length - 1}
           className="pointer-events-auto p-3 md:p-4 2xl:p-6 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/40 disabled:opacity-0 transition-all hover:scale-110 shadow-lg active:scale-95"
         >
           <ChevronRight size={20} className="md:w-6 md:h-6 2xl:w-10 2xl:h-10" />
         </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes pulse-slow {
           0%, 100% { opacity: 0.6; transform: scale(1); }
           50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        /* Custom Scrollbar for Text Panels */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 159, 145, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 159, 145, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;
