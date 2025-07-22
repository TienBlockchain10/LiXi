import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  variant?: 'header' | 'hero';
}

export function LanguageToggle({ variant = 'header' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = () => {
    const newLanguage: Language = language === 'en' ? 'vi' : 'en';
    setLanguage(newLanguage);
  };

  const headerClasses = "flex items-center space-x-1 sm:space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-all duration-200";
  const heroClasses = "flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white hover:bg-opacity-30 transition-all duration-200";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLanguageChange}
      className={variant === 'header' ? headerClasses : heroClasses}
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium text-xs sm:text-sm">
        {language === 'en' ? 'VI' : 'EN'}
      </span>
    </Button>
  );
}