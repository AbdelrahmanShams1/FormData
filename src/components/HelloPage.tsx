import {
  Heart,
  Users,
  Target,
  TrendingUp,
  Check,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const HelloPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{
            animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        ></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* البطاقة الرئيسية */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 hover:shadow-emerald-200/50 transition-all duration-500">
          <div className="md:flex">
            {/* الجانب الأيسر - تصميم محسّن */}
            <div className="md:w-2/5 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              {/* نمط زخرفي */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 border-4 border-white rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-white rounded-full"></div>
              </div>

              <div className="text-center text-white relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-36 h-36 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 border-4 border-white/30">
                  <img
                    src="https://res.cloudinary.com/djzyqgwnu/image/upload/v1763282750/logo_zp8y0b.png"
                    alt="logo"
                    className="rounded-[5px]"
                  />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                  العطاء العالمية
                </h3>
                <div className="flex items-center justify-center gap-2 text-emerald-100 mb-4">
                  <Sparkles className="w-5 h-5" />
                  <p className="text-lg">جمعية خيرية رائدة</p>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="h-1 w-20 bg-white/50 mx-auto rounded-full"></div>
              </div>
            </div>

            {/* الجانب الأيمن - محتوى محسّن */}
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="text-center md:text-right">
                {/* العنوان */}
                <div className="mb-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-3 leading-tight">
                    أهلاً وسهلاً بك في
                  </h1>
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent inline-block animate-pulse">
                    منصة العطاء العالمية
                  </span>
                </div>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-medium">
                  نحن سعداء بانضمامك إلى مجتمعنا الخيري. معاً يمكننا صنع فرق
                  حقيقي في حياة المحتاجين حول العالم.
                </p>

                {/* اقتباس محسّن */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-r-4 border-emerald-500 p-6 rounded-2xl mb-8 text-right shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <p className="text-emerald-900 font-bold text-lg leading-relaxed">
                    "إنَّ اللَّهَ طَيِّبٌ لا يَقْبَلُ إِلا طَيِّبًا، وَإِنَّ
                    اللَّهَ أَمَرَ الْمُؤْمِنِينَ بِمَا أَمَرَ بِهِ
                    الْمُرْسَلِينَ"
                  </p>
                  <p className="text-emerald-600 font-semibold mt-3">
                    رواه مسلم
                  </p>
                </div>

                {/* المميزات */}
                <div className="space-y-5 mb-10">
                  {[
                    { text: "تقديم المساعدات للمحتاجين" },
                    { text: "مشاريع تنموية مستدامة" },
                    { text: "شفافية كاملة في التبرعات" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-start space-x-4 space-x-reverse group hover:translate-x-2 transition-transform duration-300"
                    >
                      <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-9 h-9 mr-3 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Check
                          className="text-emerald-600 w-6 h-6 font-bold"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-gray-700 text-lg md:text-xl font-semibold">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* زر CTA محسّن */}
                <Link
                  to="/form"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-700 hover:via-emerald-800 hover:to-teal-800 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl w-full md:w-auto group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    ابدأ رحلتك معنا
                    <ArrowLeft className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <p className="text-gray-500 text-base mt-6 leading-relaxed">
                  بالضغط على الزر، فإنك توافق على
                  <a
                    href="#"
                    className="text-emerald-600 hover:text-emerald-800 mr-1 font-bold mx-1 underline decoration-2 underline-offset-2"
                  >
                    شروط الخدمة
                  </a>
                  و
                  <a
                    href="#"
                    className="text-emerald-600 hover:text-emerald-800 font-bold mx-1 underline decoration-2 underline-offset-2"
                  >
                    سياسة الخصوصية
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* قسم الإحصائيات المحسّن */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            {
              value: "15K+",
              label: "مستفيد",
              icon: Users,
              color: "from-emerald-500 to-teal-600",
            },
            {
              value: "180+",
              label: "مشروع",
              icon: Target,
              color: "from-teal-500 to-cyan-600",
            },
            {
              value: "3.2K+",
              label: "يتيم",
              icon: Heart,
              color: "from-emerald-600 to-green-700",
            },
            {
              value: "94%",
              label: "رضا العملاء",
              icon: TrendingUp,
              color: "from-cyan-500 to-teal-600",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/50 group"
              >
                <div
                  className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-600 text-base font-semibold">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelloPage;
