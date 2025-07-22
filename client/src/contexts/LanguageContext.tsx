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
  'header.title': 'VietCoin Remit',
  'header.getStarted': 'Get Started',
  
  // Hero Section
  'hero.title': 'Send Money to Vietnam',
  'hero.subtitle': 'Fast, Secure, Affordable',
  'hero.description': 'Revolutionary stablecoin remittance service through Facebook Messenger. No apps to download, no complex processes - just instant, secure transfers to your family in Vietnam.',
  'hero.joinWaitlist': 'Join Waitlist',
  'hero.tryMessenger': 'Try on Messenger',
  'hero.bankSecurity': 'Bank-Level Security',
  'hero.fastTransfer': 'Minutes, Not Days',
  'hero.lowFees': '90% Lower Fees',
  
  // Value Propositions
  'values.title': 'Why Choose VietCoin Remit?',
  'values.subtitle': 'Built specifically for the Vietnamese-American community with cutting-edge blockchain technology',
  'values.fast.title': 'Lightning Fast',
  'values.fast.description': 'Transfers complete in minutes using stablecoin technology. No more waiting days for traditional wire transfers.',
  'values.lowCost.title': 'Ultra Low Fees',
  'values.lowCost.description': 'Save up to 90% on transfer fees compared to traditional money transfer services. More money for your family.',
  'values.simple.title': 'Messenger Simple',
  'values.simple.description': 'Send money as easy as sending a text message. No apps to download, just use Facebook Messenger.',
  'values.secure.title': 'Bank-Level Security',
  'values.secure.description': 'Military-grade encryption and blockchain security ensure your money and data are always protected.',
  'values.stable.title': 'Stable Rates',
  'values.stable.description': 'Stablecoins eliminate volatility. Your family receives the exact amount you send, every time.',
  'values.focused.title': 'Vietnamese Focused',
  'values.focused.description': 'Built by and for the Vietnamese-American community. We understand your unique needs and culture.',
  
  // How It Works
  'howItWorks.title': 'How It Works',
  'howItWorks.subtitle': 'Three simple steps to send money to Vietnam',
  'howItWorks.step1.title': 'Message Us',
  'howItWorks.step1.description': 'Start a conversation with our bot on Facebook Messenger. No apps to download or accounts to create.',
  'howItWorks.step2.title': 'Send Details',
  'howItWorks.step2.description': 'Tell us how much to send, who to send it to, and how they should receive it in Vietnam.',
  'howItWorks.step3.title': 'Money Delivered',
  'howItWorks.step3.description': 'Your family receives the money in minutes. Track the entire process through our secure platform.',
  'howItWorks.tryNow': 'Try It Now on Messenger',
  
  // Social Proof
  'social.title': 'Trusted by Vietnamese Americans',
  'social.subtitle': 'Join thousands who are already saving money and time',
  'social.testimonial1': '"Finally, a service that understands our community. Sending money to my parents in Saigon has never been this easy and affordable."',
  'social.testimonial2': '"The speed is incredible. What used to take 3-5 days now happens in just a few minutes. My family loves how convenient it is."',
  'social.testimonial3': '"As someone who sends money regularly, the fee savings really add up. This service has saved me hundreds of dollars already."',
  
  // Waitlist Form
  'waitlist.title': 'Join Our Waitlist',
  'waitlist.subtitle': 'Be the first to experience the future of money transfers to Vietnam',
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
  'footer.description': 'Revolutionizing remittances for the Vietnamese-American community through blockchain technology and messenger convenience.',
  'footer.rights': 'All rights reserved.',
};

// Vietnamese translations
const vi = {
  // Header
  'header.title': 'VietCoin Remit',
  'header.getStarted': 'Bắt Đầu',
  
  // Hero Section
  'hero.title': 'Gửi Tiền Về Việt Nam',
  'hero.subtitle': 'Nhanh, An Toàn, Tiết Kiệm',
  'hero.description': 'Dịch vụ chuyển tiền stablecoin cách mạng qua Facebook Messenger. Không cần tải ứng dụng, không quy trình phức tạp - chỉ cần chuyển tiền tức thì và an toàn cho gia đình ở Việt Nam.',
  'hero.joinWaitlist': 'Đăng Ký Chờ',
  'hero.tryMessenger': 'Thử Trên Messenger',
  'hero.bankSecurity': 'Bảo Mật Cấp Ngân Hàng',
  'hero.fastTransfer': 'Phút, Không Phải Ngày',
  'hero.lowFees': 'Phí Thấp Hơn 90%',
  
  // Value Propositions
  'values.title': 'Tại Sao Chọn VietCoin Remit?',
  'values.subtitle': 'Được xây dựng đặc biệt cho cộng đồng Việt kiều Mỹ với công nghệ blockchain tiên tiến',
  'values.fast.title': 'Siêu Nhanh',
  'values.fast.description': 'Chuyển tiền hoàn tất trong vài phút bằng công nghệ stablecoin. Không còn chờ đợi hàng ngày như chuyển tiền truyền thống.',
  'values.lowCost.title': 'Phí Cực Thấp',
  'values.lowCost.description': 'Tiết kiệm tới 90% phí chuyển tiền so với các dịch vụ chuyển tiền truyền thống. Nhiều tiền hơn cho gia đình bạn.',
  'values.simple.title': 'Đơn Giản Như Messenger',
  'values.simple.description': 'Gửi tiền dễ dàng như gửi tin nhắn. Không cần tải ứng dụng, chỉ cần dùng Facebook Messenger.',
  'values.secure.title': 'Bảo Mật Cấp Ngân Hàng',
  'values.secure.description': 'Mã hóa quân sự và bảo mật blockchain đảm bảo tiền và dữ liệu của bạn luôn được bảo vệ.',
  'values.stable.title': 'Tỷ Giá Ổn Định',
  'values.stable.description': 'Stablecoin loại bỏ biến động. Gia đình bạn nhận đúng số tiền bạn gửi, mọi lúc.',
  'values.focused.title': 'Chuyên Cho Người Việt',
  'values.focused.description': 'Được xây dựng bởi và cho cộng đồng Việt kiều Mỹ. Chúng tôi hiểu nhu cầu và văn hóa riêng của bạn.',
  
  // How It Works
  'howItWorks.title': 'Cách Thức Hoạt Động',
  'howItWorks.subtitle': 'Ba bước đơn giản để gửi tiền về Việt Nam',
  'howItWorks.step1.title': 'Nhắn Tin Cho Chúng Tôi',
  'howItWorks.step1.description': 'Bắt đầu cuộc trò chuyện với bot của chúng tôi trên Facebook Messenger. Không cần tải ứng dụng hay tạo tài khoản.',
  'howItWorks.step2.title': 'Gửi Thông Tin',
  'howItWorks.step2.description': 'Cho chúng tôi biết số tiền cần gửi, người nhận, và cách thức nhận tiền tại Việt Nam.',
  'howItWorks.step3.title': 'Tiền Được Giao',
  'howItWorks.step3.description': 'Gia đình bạn nhận tiền trong vài phút. Theo dõi toàn bộ quá trình qua nền tảng bảo mật của chúng tôi.',
  'howItWorks.tryNow': 'Thử Ngay Trên Messenger',
  
  // Social Proof
  'social.title': 'Được Tin Tưởng Bởi Người Việt Mỹ',
  'social.subtitle': 'Tham gia cùng hàng nghìn người đã tiết kiệm tiền và thời gian',
  'social.testimonial1': '"Cuối cùng, một dịch vụ hiểu cộng đồng của chúng ta. Gửi tiền cho bố mẹ ở Sài Gòn chưa bao giờ dễ dàng và tiết kiệm như thế này."',
  'social.testimonial2': '"Tốc độ thật không thể tin được. Những gì trước đây mất 3-5 ngày giờ chỉ xảy ra trong vài phút. Gia đình tôi thích sự tiện lợi này."',
  'social.testimonial3': '"Với tư cách là người thường xuyên gửi tiền, việc tiết kiệm phí thực sự tích lũy. Dịch vụ này đã giúp tôi tiết kiệm hàng trăm đô la rồi."',
  
  // Waitlist Form
  'waitlist.title': 'Đăng Ký Danh Sách Chờ',
  'waitlist.subtitle': 'Hãy là người đầu tiên trải nghiệm tương lai của chuyển tiền về Việt Nam',
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
  'footer.description': 'Cách mạng hóa chuyển tiền cho cộng đồng Việt kiều Mỹ thông qua công nghệ blockchain và sự tiện lợi của messenger.',
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