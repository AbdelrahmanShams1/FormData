import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Upload,
  Plus,
  Trash2,
  Check,
  Store,
  LayoutDashboard,
  Palette,
  Link2,
  FileText,
  Layout,
  Loader2,
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Types
interface NavLink {
  title: string;
  url: string;
}

interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

interface Section {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface ProjectType {
  id: "store" | "store-dashboard";
  name: string;
  icon: LucideIcon;
  description: string;
}

interface FormData {
  projectName: string;
  projectDescription: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  projectType: "store" | "store-dashboard";
  navLinks: NavLink[];
  sections: string[];
  logoUpload: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      projectName: "",
      projectDescription: "",
      primaryColor: "#10b981",
      secondaryColor: "#0d9488",
      accentColor: "#06b6d4",
      projectType: "store",
      navLinks: [{ title: "", url: "" }],
      sections: [],
      logoUpload: "",
    },
  });

  const [navLinks, setNavLinks] = useState<NavLink[]>([{ title: "", url: "" }]);
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const availableSections: Section[] = [
    { id: "hero", name: "قسم البطل (Hero)", icon: Layout },
    { id: "about", name: "من نحن", icon: FileText },
    { id: "services", name: "خدماتنا", icon: Store },
    { id: "products", name: "المنتجات", icon: Store },
    { id: "testimonials", name: "آراء العملاء", icon: FileText },
    { id: "contact", name: "اتصل بنا", icon: Link2 },
    { id: "faq", name: "الأسئلة الشائعة", icon: FileText },
    { id: "team", name: "فريق العمل", icon: Layout },
  ];

  const colorPalettes: ColorPalette[] = [
    {
      name: "أخضر كلاسيكي",
      primary: "#10b981",
      secondary: "#0d9488",
      accent: "#06b6d4",
    },
    {
      name: "أزرق احترافي",
      primary: "#3b82f6",
      secondary: "#2563eb",
      accent: "#1d4ed8",
    },
    {
      name: "بنفسجي عصري",
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      accent: "#6d28d9",
    },
    {
      name: "برتقالي دافئ",
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#c2410c",
    },
    {
      name: "وردي أنيق",
      primary: "#ec4899",
      secondary: "#db2777",
      accent: "#be185d",
    },
    {
      name: "أحمر قوي",
      primary: "#ef4444",
      secondary: "#dc2626",
      accent: "#b91c1c",
    },
  ];

  const projectTypes: ProjectType[] = [
    {
      id: "store",
      name: "متجر فقط",
      icon: Store,
      description: "واجهة متجر إلكتروني للعملاء",
    },
    {
      id: "store-dashboard",
      name: "متجر + لوحة تحكم",
      icon: LayoutDashboard,
      description: "متجر مع لوحة تحكم إدارية كاملة",
    },
  ];

  const addNavLink = (): void => {
    setNavLinks([...navLinks, { title: "", url: "" }]);
  };

  const removeNavLink = (index: number): void => {
    const newLinks = navLinks.filter((_, i) => i !== index);
    setNavLinks(newLinks);
  };

  const updateNavLink = (
    index: number,
    field: keyof NavLink,
    value: string
  ): void => {
    const newLinks = [...navLinks];
    newLinks[index][field] = value;
    setNavLinks(newLinks);
  };

  const toggleSection = (sectionId: string): void => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter((id) => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };

  const applyColorPalette = (palette: ColorPalette): void => {
    setValue("primaryColor", palette.primary);
    setValue("secondaryColor", palette.secondary);
    setValue("accentColor", palette.accent);
  };

  // حفظ البيانات في Firestore
  const onSubmit = async (data: FormData) => {
    setSubmitSuccess(false);

    try {
      // تجهيز البيانات للحفظ
      const projectData = {
        projectName: data.projectName,
        projectDescription: data.projectDescription,
        colors: {
          primary: data.primaryColor,
          secondary: data.secondaryColor,
          accent: data.accentColor,
        },
        projectType: data.projectType,
        navLinks: navLinks.filter((link) => link.title && link.url), // فقط الروابط المملوءة
        sections: selectedSections,
        logoURL: data.logoUpload,
        createdAt: serverTimestamp(),
      };

      // حفظ البيانات في Firestore
      const docRef = await addDoc(collection(db, "projects"), projectData);

      console.log("Project saved with ID:", docRef.id);
      setSubmitSuccess(true);

      // إعادة تعيين النموذج بعد 2 ثانية
      setTimeout(() => {
        reset();

        setNavLinks([{ title: "", url: "" }]);
        setSelectedSections([]);
        setSubmitSuccess(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("حدث خطأ أثناء حفظ المشروع. يرجى المحاولة مرة أخرى.");
      // مش محتاج تعمل حاجة هنا لأن react-hook-form بيتعامل مع isSubmitting تلقائياً
    }
  };

  const watchProjectType = watch("projectType");
  const watchPrimaryColor = watch("primaryColor");
  const watchSecondaryColor = watch("secondaryColor");
  const watchAccentColor = watch("accentColor");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            إنشاء مشروعك الخاص
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            املأ النموذج بالتفاصيل المطلوبة لإنشاء مشروعك المخصص
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-green-700 font-bold text-lg">
              تم حفظ المشروع بنجاح! 🎉
            </p>
          </div>
        )}

        <div className="space-y-6">
          {/* معلومات المشروع الأساسية */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-emerald-600" />
              معلومات المشروع
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {/* اسم المشروع */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم المشروع *
                  </label>
                  <input
                    type="text"
                    {...register("projectName", {
                      required: "اسم المشروع مطلوب",
                    })}
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                    placeholder="مثال: متجر الإلكترونيات"
                  />
                  {errors.projectName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.projectName.message}
                    </p>
                  )}
                </div>

                {/* نبذة عن المشروع */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    نبذة عن المشروع *
                  </label>
                  <textarea
                    {...register("projectDescription", {
                      required: "النبذة مطلوبة",
                    })}
                    rows={4}
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all resize-none"
                    placeholder="اكتب نبذة مختصرة عن مشروعك وأهدافه..."
                  />
                  {errors.projectDescription && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.projectDescription.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Upload className="w-6 h-6 text-emerald-600" />
                  اللوجو
                </h2>

                <div className="flex flex-col items-center">
                  <div className="w-full max-w-sm">
                    <input
                      type="text"
                      {...register("logoUpload", {
                        required: "رابط اللوجو مطلوب",
                      })}
                      className="w-full px-3 py-2.5 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                      placeholder="مثال:  https://example.com/logo.png"
                    />
                  </div>
                </div>
              </div>
              {/* باليت الألوان */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette className="w-6 h-6 text-emerald-600" />
                  اختر لوحة الألوان
                </h2>

                {/* الباليتات الجاهزة */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    الباليتات الجاهزة
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {colorPalettes.map(
                      (palette: ColorPalette, index: number) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => applyColorPalette(palette)}
                          className="p-3 border-2 border-gray-200 rounded-xl hover:border-emerald-500 transition-all group text-xs"
                        >
                          <div className="flex gap-1.5 mb-2">
                            <div
                              className="w-8 h-8 rounded-md shadow-sm"
                              style={{ backgroundColor: palette.primary }}
                            />
                            <div
                              className="w-8 h-8 rounded-md shadow-sm"
                              style={{ backgroundColor: palette.secondary }}
                            />
                            <div
                              className="w-8 h-8 rounded-md shadow-sm"
                              style={{ backgroundColor: palette.accent }}
                            />
                          </div>
                          <p className="font-semibold text-gray-700 group-hover:text-emerald-600 truncate">
                            {palette.name}
                          </p>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* الألوان المخصصة */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      اللون الأساسي
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        {...register("primaryColor")}
                        className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={watchPrimaryColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setValue("primaryColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      اللون الثانوي
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        {...register("secondaryColor")}
                        className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={watchSecondaryColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setValue("secondaryColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      لون التمييز
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        {...register("accentColor")}
                        className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300"
                      />
                      <input
                        type="text"
                        value={watchAccentColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setValue("accentColor", e.target.value)
                        }
                        className="flex-1 px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* روابط الـ Navbar */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Link2 className="w-6 h-6 text-emerald-600" />
                  روابط شريط التنقل
                </h2>

                <div className="space-y-3">
                  {navLinks.map((link: NavLink, index: number) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 grid md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateNavLink(index, "title", e.target.value)
                          }
                          placeholder="عنوان الرابط (مثال: الرئيسية)"
                          className="px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateNavLink(index, "url", e.target.value)
                          }
                          placeholder="الرابط (مثال: /home)"
                          className="px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                      </div>
                      {navLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeNavLink(index)}
                          className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addNavLink}
                    className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة رابط جديد
                  </button>
                </div>
              </div>
              {/* الأقسام المطلوبة */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Layout className="w-6 h-6 text-emerald-600" />
                  الأقسام المطلوبة
                </h2>

                <div className="grid md:grid-cols-2 gap-3">
                  {availableSections.map((section: Section) => {
                    const Icon = section.icon;
                    const isSelected = selectedSections.includes(section.id);
                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className={`p-4 border-2 rounded-xl transition-all text-right flex items-center gap-3 ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-800">
                            {section.name}
                          </p>
                        </div>
                        {isSelected && (
                          <Check
                            className="w-5 h-5 text-emerald-600"
                            strokeWidth={3}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* نوع المشروع */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Store className="w-6 h-6 text-emerald-600" />
                  نوع المشروع
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {projectTypes.map((type: ProjectType) => {
                    const Icon = type.icon;
                    const isSelected = watchProjectType === type.id;
                    return (
                      <label
                        key={type.id}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        <input
                          type="radio"
                          value={type.id}
                          {...register("projectType")}
                          className="hidden"
                        />
                        <div className="text-center">
                          <div
                            className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-3 ${
                              isSelected
                                ? "bg-emerald-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Icon className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {type.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {type.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    "إنشاء المشروع الآن"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
