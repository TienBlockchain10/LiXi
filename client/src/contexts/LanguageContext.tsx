import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'vi';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const en = {
  // Header
  'header.title': 'LiXi',
  'header.getStarted': 'Coming Soon',
  
  // Hero Section
  'hero.title': 'Launching Soon',
  'hero.subtitle': 'A revolutionary stablecoin remittance service through Facebook Messenger.',
  'hero.description': 'No apps to download. No complicated logins. Just simple, secure transfers to family in Vietnam — in minutes.',
  'hero.joinWaitlist': 'Join Waitlist',
  'hero.tryMessenger': 'Coming Soon',
  'hero.comingSoon': 'Coming soon to Houston, Dallas, and select cities.',
  'hero.bankSecurity': 'Bank-Level Security',
  'hero.fastTransfer': 'Minutes, Not Days',
  'hero.lowFees': '90% Lower Fees',
  
  // Value Propositions
  'values.title': 'Why Choose LiXi?',
  'values.subtitle': 'Designed for the Vietnamese-American community, built with secure stablecoin infrastructure.',
  'values.fast.title': 'Lightning Fast',
  'values.fast.description': 'Transfers complete in minutes, not days — powered by stablecoins.',
  'values.lowCost.title': 'Ultra Low Fees',
  'values.lowCost.description': 'Save up to 90% on fees compared to Western Union or Remitly.',
  'values.simple.title': 'Messenger Simple',
  'values.simple.description': 'Send money as easy as sending a Facebook message. No app installs needed.',
  'values.secure.title': 'Bank-Level Security',
  'values.secure.description': 'Military-grade encryption and US-based custodians keep your money protected.',
  'values.stable.title': 'Stable Rates',
  'values.stable.description': 'Stablecoins ensure your family receives exactly what you send — no surprises.',
  'values.focused.title': 'Vietnamese Focused',
  'values.focused.description': 'Built by and for the Vietnamese-American community. Language and UX tailored to your needs.',
  
  // How It Works
  'howItWorks.title': 'How It Works (Beta Preview)',
  'howItWorks.subtitle': 'Three simple steps to send money to Vietnam',
  'howItWorks.step1.title': 'Message Us',
  'howItWorks.step1.description': 'Chat with our Vietnamese-speaking bot via Facebook Messenger. No app needed.',
  'howItWorks.step2.title': 'Send Details',
  'howItWorks.step2.description': 'Tell us who to send money to, and how they\'d like to receive it (bank, Momo, cash pickup, etc.)',
  'howItWorks.step3.title': 'Money Delivered',
  'howItWorks.step3.description': 'Your family receives the funds in minutes — and you get full visibility the whole time.',
  'howItWorks.tryNow': 'Join Beta Waitlist',
  
  // Social Proof
  'social.title': 'Built for the Community',
  'social.subtitle': 'Join Our Pilot Cohort',
  'social.pilotDescription': 'We\'re launching a private beta for the first 500 families.',
  'social.bonus': 'Bonus: First transfer is free once we go live!',
  'social.communityMessage': 'Be part of the future of remittances — and help shape a product built for our community.',
  'social.founderQuote': '"I built LiXi because I saw my own parents struggle to send money to Vietnam. Long drives. High fees. Complicated apps. It shouldn\'t be this hard."',
  'social.founderName': '— Tien Nguyen, Founder',
  
  // Waitlist Form
  'waitlist.title': 'Join the Waitlist',
  'waitlist.subtitle': 'Be among the first 500 families in our private beta',
  'waitlist.disclaimer': 'LiXi is currently in pre-launch and not yet available for public use.',
  'waitlist.name': 'Full Name',
  'waitlist.namePlaceholder': 'Enter your full name',
  'waitlist.email': 'Email Address',
  'waitlist.emailPlaceholder': 'Enter your email address',
  'waitlist.monthlyAmount': 'Monthly Transfer Amount (Optional)',
  'waitlist.monthlyAmountPlaceholder': 'e.g., $500',
  'waitlist.submitButton': 'Join Waitlist',
  'waitlist.submitting': 'Joining...',
  'waitlist.successTitle': 'Welcome to the waitlist!',
  'waitlist.successDescription': "We'll be in touch soon with early access.",
  'waitlist.benefits': 'Early access benefits:',
  'waitlist.benefit1': 'First to try our revolutionary platform',
  'waitlist.benefit2': 'Exclusive launch pricing and bonuses',
  'waitlist.benefit3': 'Priority customer support',
  
  // Footer
  'footer.description': 'Revolutionizing remittances for the Vietnamese-American community through stablecoin technology and messenger convenience.',
  'footer.rights': 'All rights reserved.',
};

// Vietnamese translations
const vi = {
  // Header
  'header.title': 'LiXi',
  'header.getStarted': 'Sắp Ra Mắt',
  
  // Hero Section
  'hero.title': 'Sắp Ra Mắt',
  'hero.subtitle': 'Dịch vụ chuyển tiền stablecoin cách mạng qua Facebook Messenger.',
  'hero.description': 'Không cần tải ứng dụng. Không cần đăng nhập phức tạp. Chỉ cần chuyển tiền đơn giản, an toàn cho gia đình ở Việt Nam — trong vài phút.',
  'hero.joinWaitlist': 'Đăng Ký Chờ',
  'hero.tryMessenger': 'Sắp Ra Mắt',
  'hero.comingSoon': 'Sắp ra mắt tại Houston, Dallas và các thành phố được chọn.',
  'hero.bankSecurity': 'Bảo Mật Cấp Ngân Hàng',
  'hero.fastTransfer': 'Phút, Không Phải Ngày',
  'hero.lowFees': 'Phí Thấp Hơn 90%',
  
  // Value Propositions
  'values.title': 'Tại Sao Chọn LiXi?',
  'values.subtitle': 'Được xây dựng đặc biệt cho cộng đồng Việt kiều Mỹ với công nghệ stablecoin bảo mật',
  'values.fast.title': 'Siêu Nhanh',
  'values.fast.description': 'Chuyển tiền hoàn tất trong vài phút bằng công nghệ stablecoin. Không còn chờ đợi hàng ngày như chuyển tiền truyền thống.',
  'values.lowCost.title': 'Phí Cực Thấp',
  'values.lowCost.description': 'Tiết kiệm tới 90% phí chuyển tiền so với các dịch vụ chuyển tiền truyền thống. Nhiều tiền hơn cho gia đình bạn.',
  'values.simple.title': 'Đơn Giản Như Messenger',
  'values.simple.description': 'Gửi tiền dễ dàng như gửi tin nhắn. Không cần tải ứng dụng, chỉ cần dùng Facebook Messenger.',
  'values.secure.title': 'Bảo Mật Cấp Ngân Hàng',
  'values.secure.description': 'Mã hóa quân sự và bảo mật stablecoin đảm bảo tiền và dữ liệu của bạn luôn được bảo vệ.',
  'values.stable.title': 'Tỷ Giá Ổn Định',
  'values.stable.description': 'Stablecoin loại bỏ biến động. Gia đình bạn nhận đúng số tiền bạn gửi, mọi lúc.',
  'values.focused.title': 'Chuyên Cho Người Việt',
  'values.focused.description': 'Được xây dựng bởi và cho cộng đồng Việt kiều Mỹ. Chúng tôi hiểu nhu cầu và văn hóa riêng của bạn.',
  
  // How It Works
  'howItWorks.title': 'Cách Thức Hoạt Động (Xem Trước Beta)',
  'howItWorks.subtitle': 'Ba bước đơn giản để gửi tiền về Việt Nam',
  'howItWorks.step1.title': 'Nhắn Tin Cho Chúng Tôi',
  'howItWorks.step1.description': 'Trò chuyện với bot nói tiếng Việt của chúng tôi qua Facebook Messenger. Không cần ứng dụng.',
  'howItWorks.step2.title': 'Gửi Thông Tin',
  'howItWorks.step2.description': 'Cho chúng tôi biết gửi tiền cho ai và họ muốn nhận như thế nào (ngân hàng, Momo, nhận tiền mặt, v.v.)',
  'howItWorks.step3.title': 'Tiền Được Giao',
  'howItWorks.step3.description': 'Gia đình bạn nhận tiền trong vài phút — và bạn có thể theo dõi toàn bộ quá trình.',
  'howItWorks.tryNow': 'Tham Gia Danh Sách Chờ Beta',
  
  // Social Proof
  'social.title': 'Xây Dựng Cho Cộng Đồng',
  'social.subtitle': 'Tham Gia Nhóm Thí Điểm Của Chúng Tôi',
  'social.pilotDescription': 'Chúng tôi đang ra mắt bản beta riêng cho 500 gia đình đầu tiên.',
  'social.bonus': 'Ưu đãi: Chuyển tiền đầu tiên miễn phí khi chúng tôi hoạt động!',
  'social.communityMessage': 'Hãy là một phần của tương lai chuyển tiền — và giúp định hình sản phẩm được xây dựng cho cộng đồng của chúng ta.',
  'social.founderQuote': '"Tôi xây dựng LiXi vì thấy chính bố mẹ mình vất vả để gửi tiền về Việt Nam. Phải đi xa. Phí cao. Ứng dụng phức tạp. Không nên khó khăn như vậy."',
  'social.founderName': '— Tiến Nguyễn, Người Sáng Lập',
  
  // Waitlist Form
  'waitlist.title': 'Tham Gia Danh Sách Chờ',
  'waitlist.subtitle': 'Hãy là một trong 500 gia đình đầu tiên trong bản beta riêng của chúng tôi',
  'waitlist.disclaimer': 'LiXi hiện đang trong giai đoạn tiền ra mắt và chưa có sẵn cho công chúng sử dụng.',
  'waitlist.name': 'Họ Tên',
  'waitlist.namePlaceholder': 'Nhập họ tên của bạn',
  'waitlist.email': 'Địa Chỉ Email',
  'waitlist.emailPlaceholder': 'Nhập địa chỉ email của bạn',
  'waitlist.monthlyAmount': 'Số Tiền Gửi Hàng Tháng (Tùy Chọn)',
  'waitlist.monthlyAmountPlaceholder': 'ví dụ: $500',
  'waitlist.submitButton': 'Đăng Ký Chờ',
  'waitlist.submitting': 'Đang Đăng Ký...',
  'waitlist.successTitle': 'Chào mừng bạn vào danh sách chờ!',
  'waitlist.successDescription': 'Chúng tôi sẽ liên hệ sớm với quyền truy cập sớm.',
  'waitlist.benefits': 'Lợi ích truy cập sớm:',
  'waitlist.benefit1': 'Đầu tiên thử nền tảng cách mạng của chúng tôi',
  'waitlist.benefit2': 'Giá ra mắt độc quyền và ưu đãi',
  'waitlist.benefit3': 'Hỗ trợ khách hàng ưu tiên',
  
  // Footer
  'footer.description': 'Cách mạng hóa chuyển tiền cho cộng đồng Việt kiều Mỹ thông qua công nghệ stablecoin và sự tiện lợi của messenger.',
  'footer.rights': 'Mọi quyền được bảo lưu.',
};

const translations = { en, vi };

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}