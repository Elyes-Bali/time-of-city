import React, { useState, useEffect } from "react";
import {
  Clock,
  Plus,
  Minus,
  X,
  Divide,
  Rocket,
  Brain,
  LayoutGrid,
  User,
  Menu,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Study = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [gameScore, setGameScore] = useState(0);
  const [gameFeedback, setGameFeedback] = useState("");
  const [answer, setAnswer] = useState({ h: "", m: "", s: "" });

  const sections = [
    {
      id: "home",
      title: "جمع الزمن",
      icon: <Plus size={22} />,
      color: "bg-orange-400",
      borderColor: "border-orange-500",
    },
    {
      id: "subtraction",
      title: "طرح الزمن",
      icon: <Minus size={22} />,
      color: "bg-blue-400",
      borderColor: "border-blue-500",
    },
    {
      id: "multiplication",
      title: "ضرب الزمن",
      icon: <X size={22} />,
      color: "bg-purple-400",
      borderColor: "border-purple-500",
    },
    {
      id: "division",
      title: "قسمة الزمن",
      icon: <Divide size={22} />,
      color: "bg-green-400",
      borderColor: "border-green-500",
    },
    {
      id: "game",
      title: "اختبر نفسك",
      icon: <Gamepad2Icon size={22} />,
      color: "bg-yellow-400",
      borderColor: "border-yellow-500",
    },
  ];

  const checkGameAnswer = () => {
    if (answer.h === "4" && answer.m === "6" && answer.s === "20") {
      setGameScore((prev) => prev + 10);
      setGameFeedback("أحسنت يا بطل! إجابة صحيحة 🌟🥇");
    } else {
      setGameFeedback("أوه! حاول مرة أخرى، لا تنسَ تحويل الـ 60! 🧐");
    }
  };

  const InteractiveChallenge = ({
    question,
    correctValue,
    hint,
    fullAnswer,
    sectionType,
  }) => {
    const [userValue, setUserValue] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    const videos = {
      addition:
        "https://res.cloudinary.com/doa21lapa/video/upload/v1774303076/jama3_cqecqj.mp4",
      subtraction:
        "https://res.cloudinary.com/doa21lapa/video/upload/v1774303111/tara7_wkcmhk.mp4",
      multiplication:
        "https://res.cloudinary.com/doa21lapa/video/upload/v1774303050/dharb_l7ptwj.mp4",
      division:
        "https://res.cloudinary.com/doa21lapa/video/upload/v1774303026/9esma_sl8jut.mp4",
    };

    const checkSolution = () => {
      if (userValue.trim() === correctValue.trim()) {
        setIsCorrect(true);
      } else {
        setAttempts((prev) => prev + 1);
      }
    };

    return (
      <div className="mt-8 bg-white p-8 rounded-[3.5rem] border-8 border-dashed border-gray-100 shadow-inner relative overflow-hidden group">
        <h4 className="font-black text-gray-800 text-3xl mb-6 flex items-center gap-3">
          <Brain className="text-pink-500" size={40} /> لغز الأبطال:
        </h4>

        <div className="text-2xl font-bold mb-6 text-blue-800 bg-blue-50 p-6 rounded-2xl inline-block">
          {question}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
            disabled={isCorrect}
            className={`flex-1 p-5 rounded-2xl border-4 text-xl font-bold outline-none transition-all ${
              isCorrect
                ? "border-green-400 bg-green-50"
                : "border-gray-200 focus:border-blue-400"
            }`}
            placeholder="اكتب إجابتك هنا..."
          />
          <button
            onClick={checkSolution}
            disabled={isCorrect}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50"
          >
            تحقق
          </button>
        </div>

        {/* Feedback Area */}
        {isCorrect && (
          <div className="animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3 text-green-600 font-black text-2xl mb-4">
              <CheckCircle2 size={32} /> تهانينا! إجابة صحيحة يا ذكي! 🎉
            </div>
            <div className="bg-green-50 p-6 rounded-2xl border-r-8 border-green-400 text-xl font-bold text-gray-800">
              <div className="mb-2 text-blue-600 flex items-center gap-2">
                <Lightbulb size={20} /> التوضيح:
              </div>
              {fullAnswer}
            </div>
          </div>
        )}

        {!isCorrect && attempts === 1 && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-3 text-orange-500 font-black text-xl mb-4">
              <AlertCircle size={28} /> محاولة قريبة! خذ هذا التلميح:
            </div>
            <div className="bg-orange-50 p-6 rounded-2xl border-r-8 border-orange-400 text-xl font-bold text-gray-700">
              {hint}
            </div>
          </div>
        )}

        {!isCorrect && attempts >= 2 && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center gap-3 text-red-500 font-black text-xl mb-4">
              <AlertCircle size={28} /> لا بأس، تعلم من الحل الصحيح:
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border-r-8 border-blue-400 text-xl font-bold text-gray-800">
              <div className="text-orange-600 mb-2">تلميح: {hint}</div>
              <div className="text-blue-700 border-t pt-2">
                الحل: {fullAnswer}
              </div>
              <div className="mt-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 rounded-[2.5rem] border-4 border-dashed border-blue-200 shadow-inner relative overflow-hidden">
                {/* Floating icon */}
                <div className="absolute -top-4 -right-4 text-5xl animate-bounce opacity-20">
                  🎬
                </div>

                {/* Title */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl animate-pulse">🎥</span>
                  <p className="text-lg md:text-xl font-black text-blue-700">
                    شاهد الشرح بالفيديو لتفهم أكثر
                  </p>
                </div>

                {/* Decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6 rounded-full"></div>

                {/* Video Container */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

                  <video
                    src={videos[sectionType]}
                    controls
                    className="relative w-full rounded-3xl shadow-2xl border-4 border-white transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-white px-4 py-1 rounded-full shadow-md text-sm font-bold text-blue-600 flex items-center gap-2">
                    🎬 شرح مبسط
                  </div>
                </div>

                {/* Footer hint */}
                <p className="text-center text-gray-400 text-sm mt-4">
                  👀 ركّز جيداً ثم حاول مرة أخرى!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Precisely Engineered Animated Clock Component
  const SectionClock = ({ type }) => {
    const renderMarkers = () => {
      let markers = [];
      for (let i = 0; i < 12; i++) {
        const isQuarter = i % 3 === 0;
        markers.push(
          <div
            key={i}
            className={`absolute bg-gray-300 origin-bottom`}
            style={{
              width: isQuarter ? "3px" : "1.5px",
              height: isQuarter ? "10px" : "6px",
              bottom: "50%",
              left: "50%",
              transform: `translateX(-50%) rotate(${i * 30}deg) translateY(-60px)`,
            }}
          />,
        );
      }
      return markers;
    };

    return (
      <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full bg-gray-200 blur-md translate-y-3"></div>
        <div className="absolute inset-0 border-[10px] border-gray-800 rounded-full bg-white shadow-inner z-0"></div>
        <div className="absolute inset-3 rounded-full bg-gradient-to-b from-gray-50 to-white shadow-sm z-0"></div>
        {renderMarkers()}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className={`absolute w-2 h-12 bg-gray-800 rounded-full origin-[center_calc(100%-4px)] shadow-sm transition-all duration-700
              ${type === "addition" ? "animate-clock-spin-slow" : type === "subtraction" ? "animate-clock-reverse-slow" : ""}`}
            style={{
              bottom: "50%",
              marginBottom: "-4px",
              transform: "rotate(45deg)",
            }}
          ></div>
          <div
            className={`absolute w-1.5 h-16 bg-blue-600 rounded-full origin-[center_calc(100%-4px)] shadow-sm transition-all duration-700
              ${type === "addition" ? "animate-clock-spin" : type === "subtraction" ? "animate-clock-reverse" : "animate-pulse"}`}
            style={{
              bottom: "50%",
              marginBottom: "-4px",
              transform: "rotate(180deg)",
            }}
          ></div>
          <div
            className="absolute w-0.5 h-18 bg-red-500 rounded-full origin-[center_calc(100%-4px)] animate-clock-tick"
            style={{
              bottom: "50%",
              marginBottom: "-4px",
            }}
          ></div>
          <div className="w-4 h-4 bg-gray-900 rounded-full border-2 border-white shadow-md z-20"></div>
        </div>
        <div className="absolute -top-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border-2 border-gray-50 z-30 animate-bounce">
          <span className="text-3xl font-black">
            {type === "addition"
              ? "➕"
              : type === "subtraction"
                ? "➖"
                : type === "multiplication"
                  ? "✖️"
                  : "➗"}
          </span>
        </div>
      </div>
    );
  };

  const InstructionCard = ({
    title,
    content,
    question,
    correctValue,
    hint,
    fullAnswer,
    color,
    emoji,
    sectionType,
  }) => (
    <div
      className={`bg-white rounded-[4rem] shadow-2xl p-10 mb-10 border-b-[16px] border-l-4 transition-all hover:-translate-y-2 ${color}`}
    >
      <div className="flex flex-col xl:flex-row items-center gap-12">
        <div className="flex-1">
          <h3 className="text-5xl font-black mb-8 text-gray-800 flex items-center gap-4">
            <span className="text-6xl drop-shadow-md">{emoji}</span> {title}
          </h3>
          <div className="text-2xl text-gray-700 mb-8 leading-loose bg-white bg-opacity-60 p-8 rounded-[3rem] border-4 border-white shadow-inner">
            {content.split("\n").map((line, i) => (
              <p key={i} className="mb-3 flex items-start gap-3">
                <span className="text-yellow-500 mt-1">⭐</span> {line}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-50 rounded-[3rem] border-2 border-white shadow-sm">
          <SectionClock type={sectionType} />
          <p className="font-black text-blue-400 mt-2 uppercase tracking-widest text-sm">
            التطبيق العملي
          </p>
        </div>
      </div>

      <InteractiveChallenge
        question={question}
        correctValue={correctValue}
        hint={hint}
        fullAnswer={fullAnswer}
        sectionType={sectionType}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[#FDFEFF] flex flex-col font-sans overflow-x-hidden relative"
      dir="rtl"
    >
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 text-8xl opacity-5 animate-pulse">
          🕑
        </div>
        <div className="absolute bottom-40 right-20 text-8xl opacity-5 animate-bounce">
          🎨
        </div>
        <div className="absolute top-1/3 right-10 text-8xl opacity-5 animate-spin-slow">
          🌟
        </div>
        <div className="absolute bottom-10 left-1/4 text-9xl opacity-5">🔢</div>
      </div>

      <nav className="bg-white shadow-xl px-10 py-6 flex justify-between items-center sticky top-0 z-50 border-b-[10px] border-yellow-300">
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => setActiveSection("home")}
        >
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-3xl text-white shadow-2xl">
            <Clock size={36} />
          </div>

          <h1 className="text-4xl font-black text-blue-900">
            مدينة <span className="text-yellow-500">الزمن</span>
          </h1>
        </div>

        {/* Desktop Links */}

        <div className="hidden md:flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600"
          >
            <LayoutGrid size={20} />
            الصفحة الرئيسية
          </a>

          <a
            href="/equations-game"
            className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600"
          >
            <Rocket size={20} />
            صفحة التحديات
          </a>

          <a
            href="/family-zone"
            className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600"
          >
            <User size={20} />
            فضاء الولي
          </a>
          {user?.role === "admin" && (
            <a
              href="/admin-equations"
              className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-600"
            >
              <User size={20} />
              فضاء المعلم
            </a>
          )}
        </div>

        {/* Auth */}

        <div className="hidden md:flex bg-white border-4 border-yellow-400 px-8 py-3 rounded-full text-yellow-600 font-black items-center gap-3 shadow-xl">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-indigo-700 font-semibold transition-colors relative group py-1"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="text-gray-600 hover:text-indigo-700 font-semibold transition-colors relative group py-1"
            >
              Login
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={30} />
        </button>
      </nav>

      {/* ================= MOBILE NAV ================= */}

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl p-6 flex flex-col gap-6">
          <a href="/" className="font-bold text-gray-700">
            صفحة الدروس
          </a>

          <a href="/equations-game" className="font-bold text-gray-700">
            صفحة التحديات
          </a>

          <a href="/family-zone" className="font-bold text-gray-700">
            فضاء الولي
          </a>

          {user?.role === "admin" && (
            <a href="/admin-equations" className="font-bold text-gray-700">
              فضاء المعلم
            </a>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-left font-bold text-red-500"
            >
              Logout
            </button>
          ) : (
            <a href="/login" className="font-bold text-blue-600">
              Login
            </a>
          )}
        </div>
      )}

      <div className="flex flex-1">
        <aside
          className={`
          fixed lg:static top-0 right-0 h-full
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
          bg-white border-l-[12px] border-gray-50
          transition-transform duration-500
          w-80 p-6 z-40
          `}
        >
          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setSidebarOpen(false);
                }}
                className={`group flex items-center gap-5 p-5 rounded-[2.5rem] font-black transition-all duration-300 transform hover:scale-105
                ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-2xl translate-x-4`
                    : "bg-white text-gray-500 hover:bg-gray-50 border-4 border-transparent hover:border-gray-200"
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8 md:p-16">
          <button
            className="lg:hidden mb-6 bg-white shadow-lg p-3 rounded-xl"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          {activeSection === "home" && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard
                sectionType="addition"
                title="أبطال الجمع"
                emoji="🚀"
                color="border-orange-400"
                content={`1. ترتيب الوحدات (ساعة فوق ساعة، دقيقة فوق دقيقة).
2. نجمع من الأصغر (ثواني) للأكبر (ساعات).
3. سر القوة: إذا وصل الناتج لـ 60، نحوله فوراً للوحدة المجاورة كـ "هدية"!`}
                question="2 س و 45 دق + 1 س و 20 دق ="
                correctValue="4 ساعات و 5 دقائق"
                hint="الدقائق: 45 + 20 = 65 دق. التحويل: نأخذ 60 دق (ساعة واحدة) ونترك الباقي."
                fullAnswer="النتيجة: 4 ساعات و 5 دقائق."
              />
            </div>
          )}

          {activeSection === "subtraction" && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard
                sectionType="subtraction"
                title="تحدي الطرح"
                emoji="🕵️‍♂️"
                color="border-blue-400"
                content={`1. نبدأ الطرح من الثواني.
2. إذا كان العدد في الأعلى أصغر، نستلف من الجار الأكبر.
3. قاعدة الاستلاف العبقرية: 1 ساعة تعطينا 60 دقيقة كاملة!`}
                question="الساعة 5:10 - الساعة 2:40 ="
                correctValue="2 ساعة و 30 دقيقة"
                hint="الدقائق: 10 - 40 (صغير!). الاستلاف: نأخذ ساعة من الـ 5 لتصبح 4 ساعات."
                fullAnswer="النتيجة: 2 ساعة و 30 دقيقة (الاستلاف يجعل الدقائق 70 - 40 = 30)."
              />
            </div>
          )}

          {activeSection === "multiplication" && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard
                sectionType="multiplication"
                title="مضاعف الزمن"
                emoji="⚡"
                color="border-purple-400"
                content={`نضرب كل وحدة في الرقم بشكل مستقل، ثم نعيد ترتيب الساعات إذا تجاوزت الدقائق 60.`}
                question="3 س و 20 دق × 3 ="
                correctValue="10 ساعات"
                hint="اضرب الدقائق أولاً: 20 دق × 3 = 60 دق. ماذا يحدث للـ 60 دقيقة؟"
                fullAnswer="النتيجة: 10 ساعات بالضبط! (9 ساعات من الضرب + 1 ساعة من تحويل الـ 60 دقيقة)."
              />
            </div>
          )}

          {activeSection === "division" && (
            <div className="max-w-6xl mx-auto animate-in fade-in zoom-in duration-500">
              <InstructionCard
                sectionType="division"
                title="مقسم الوقت"
                emoji="🍕"
                color="border-green-400"
                content={`نقسم الساعات أولاً، وإذا بقي شيء نحوله لدقائق ونضيفه للدقائق الموجودة قبل القسمة.`}
                question="5 س و 20 دق ÷ 4 ="
                correctValue="ساعة و 20 دقيقة"
                hint="5 ساعات ÷ 4 تساوي 1 ساعة والباقي 1 ساعة. حول الباقي (60 دقيقة) وأضفه للـ 20."
                fullAnswer="النتيجة: ساعة و 20 دقيقة."
              />
            </div>
          )}

          {activeSection === "game" && (
            <div className="max-w-4xl mx-auto bg-white p-16 rounded-[5rem] shadow-2xl text-center border-b-[24px] border-yellow-400 relative">
              <h3 className="text-6xl font-black text-blue-900 mb-12 flex items-center justify-center gap-5">
                <span className="animate-bounce text-7xl">🎮</span> مـلـعـب
                الأذكياء
              </h3>
              <div className="bg-yellow-50 p-12 rounded-[4rem] mb-12 border-8 border-dashed border-yellow-200">
                <p className="text-4xl font-black text-gray-700 mb-8">
                  أوجد ناتج الجمع العبقري:
                </p>
                <div className="text-5xl font-black text-blue-700 bg-white inline-block px-12 py-8 rounded-[3rem] shadow-2xl border-4 border-blue-50">
                  2 س 45 دق 30 ث + 1 س 20 دق 50 ث
                </div>
              </div>
              <div className="grid grid-cols-3 gap-10 mb-16">
                {["h", "m", "s"].map((unit, idx) => (
                  <div key={unit} className="space-y-4">
                    <label className="text-2xl font-black text-gray-400">
                      {unit === "h"
                        ? "ساعات"
                        : unit === "m"
                          ? "دقائق"
                          : "ثواني"}
                    </label>
                    <input
                      type="number"
                      value={answer[unit]}
                      onChange={(e) =>
                        setAnswer({ ...answer, [unit]: e.target.value })
                      }
                      className="w-full text-center p-8 border-[6px] border-gray-100 rounded-[3rem] focus:border-blue-400 outline-none text-5xl font-black text-gray-700 bg-gray-50"
                      placeholder="00"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={checkGameAnswer}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-black py-10 rounded-[4rem] shadow-3xl text-4xl border-b-[12px] border-blue-900"
              >
                تحقق يا بطل! 🔥
              </button>
              {gameFeedback && (
                <div
                  className={`mt-12 p-10 rounded-[4rem] text-4xl font-black ${gameFeedback.includes("أحسنت") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {gameFeedback}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className="bg-white border-t-[16px] border-yellow-300 py-24 px-16 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-16">
          <div className="flex items-center gap-8">
            <div className="bg-yellow-400 p-6 rounded-[2.5rem] shadow-3xl rotate-6">
              <Clock size={60} className="text-white" />
            </div>
            <span className="text-5xl font-black text-blue-900 block">
               مغامرة الزمن
            </span>
          </div>
          <p className="text-blue-500 font-black text-3xl">
            صُنع بحب لأجمل الأبطال ❤️
          </p>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes clock-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes clock-tick {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes clock-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-clock-spin { animation: clock-spin 10s linear infinite; }
        .animate-clock-spin-slow { animation: clock-spin 60s linear infinite; }
        .animate-clock-tick { animation: clock-tick 60s steps(60) infinite; }
        .animate-clock-reverse { animation: clock-reverse 10s linear infinite; }
        .animate-clock-reverse-slow { animation: clock-reverse 60s linear infinite; }
        .animate-spin-slow { animation: clock-spin 20s linear infinite; }
      `,
        }}
      />
    </div>
  );
};

const Gamepad2Icon = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="2" />
  </svg>
);

export default Study;
