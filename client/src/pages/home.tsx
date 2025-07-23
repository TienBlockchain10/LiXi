import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LanguageToggle } from "@/components/LanguageToggle";
import { 
  Facebook, 
  Shield, 
  Clock, 
  Percent, 
  Zap, 
  DollarSign, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  ChartLine,
  Star,
  CheckCircle,
  ExternalLink,
  Coins
} from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      email: "",
      name: "",
      monthlyAmount: "",
    },
  });

  const joinWaitlistMutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: t('waitlist.successTitle'),
        description: t('waitlist.successDescription'),
      });
    },
    onError: (error: any) => {
      const message = error.message || "Failed to join waitlist. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertWaitlistEntry) => {
    joinWaitlistMutation.mutate(data);
  };

  const handleFacebookRedirect = () => {
    // Replace with actual Facebook page URL
    window.open("https://www.facebook.com/messages", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Coins className="text-white w-5 h-5" />
              </div>
              <h1 className="text-lg sm:text-xl font-poppins font-bold text-white">{t('header.title')}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <LanguageToggle variant="header" />
              <Button 
                onClick={handleFacebookRedirect}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">{t('header.getStarted')}</span>
                <span className="sm:hidden">Start</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32" style={{
        background: 'linear-gradient(135deg, #ff4500 0%, #ff6b35 20%, #ff8c42 40%, #ffa726 60%, #ffb74d 80%, #1a1a1a 100%)'
      }}>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {t('hero.title')}
              <span className="block text-orange-100 drop-shadow-lg">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-md">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {t('hero.joinWaitlist')}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-white/90">
              <div className="flex items-center space-x-2 text-sm sm:text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                <span className="font-medium">{t('hero.bankSecurity')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm sm:text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                <span className="font-medium">{t('hero.fastTransfer')}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm sm:text-base bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <Percent className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                <span className="font-medium">{t('hero.lowFees')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
              {t('values.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-700 hover:shadow-lg transition-shadow duration-300 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('values.fast.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('values.fast.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 hover:shadow-lg transition-shadow duration-300 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('values.lowCost.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('values.lowCost.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 hover:shadow-lg transition-shadow duration-300 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('values.simple.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('values.simple.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 hover:shadow-lg transition-shadow duration-300 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('values.secure.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('values.secure.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 hover:shadow-lg transition-shadow duration-300 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('values.stable.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('values.stable.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-700 hover:shadow-lg transition-shadow duration-300 border-gray-600">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('values.focused.title')}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('values.focused.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl font-poppins font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('howItWorks.step1.title')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('howItWorks.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl font-poppins font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('howItWorks.step2.title')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('howItWorks.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl font-poppins font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-white mb-4">{t('howItWorks.step3.title')}</h3>
              <p className="text-gray-300 leading-relaxed">
                {t('howItWorks.step3.description')}
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              onClick={handleFacebookRedirect}
              className="inline-flex items-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('howItWorks.tryNow')}</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Community/Pilot Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
            {t('social.title')}
          </h2>
          
          <div className="bg-gray-700 rounded-2xl p-8 sm:p-12 shadow-lg mb-12 border border-gray-600">
            <h3 className="text-2xl font-poppins font-bold text-white mb-4">
              {t('social.subtitle')}
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              {t('social.pilotDescription')}
            </p>
            <div className="bg-orange-500/20 border border-orange-400 rounded-lg p-4 mb-6">
              <p className="text-orange-300 font-medium">
                🎁 {t('social.bonus')}
              </p>
            </div>
            <p className="text-gray-200 leading-relaxed">
              {t('social.communityMessage')}
            </p>
          </div>

          <Card className="bg-gray-600 border-gray-500">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">TN</span>
                </div>
              </div>
              <blockquote className="text-lg text-gray-200 italic mb-4 leading-relaxed">
                {t('social.founderQuote')}
              </blockquote>
              <p className="text-gray-300 font-medium">
                {t('social.founderName')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
            {t('waitlist.title')}
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('waitlist.subtitle')}
          </p>
          
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 mb-12 max-w-2xl mx-auto">
            <p className="text-yellow-200 text-sm text-center">
              ⚠️ {t('waitlist.disclaimer')}
            </p>
          </div>

          <Card className="max-w-md mx-auto bg-gray-700 border-gray-600">
            <CardContent className="p-8">
              {showSuccess ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">You're on the list!</h3>
                  <p className="text-gray-300">Thank you! We'll be in touch soon with early access details.</p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2 text-left">
                      {t('waitlist.email')}
                    </Label>
                    <Input
                      {...form.register("email")}
                      type="email"
                      placeholder={t('waitlist.emailPlaceholder')}
                      className="w-full"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2 text-left">
                      {t('waitlist.name')}
                    </Label>
                    <Input
                      {...form.register("name")}
                      type="text"
                      placeholder={t('waitlist.namePlaceholder')}
                      className="w-full"
                    />
                    {form.formState.errors.name && (
                      <p className="text-red-600 text-sm mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="monthlyAmount" className="block text-sm font-medium text-gray-200 mb-2 text-left">
                      {t('waitlist.monthlyAmount')}
                    </Label>
                    <Select onValueChange={(value) => form.setValue("monthlyAmount", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('waitlist.monthlyAmountPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500">Under $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="over-2000">Over $2,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={joinWaitlistMutation.isPending}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-poppins font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {joinWaitlistMutation.isPending ? t('waitlist.submitting') : t('waitlist.submitButton')}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  By joining, you agree to our Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>



      {/* Footer */}
      <footer style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)'}} className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Coins className="text-white w-5 h-5" />
                </div>
                <h3 className="text-xl font-poppins font-bold">LiXi</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    Join Waitlist
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleFacebookRedirect}
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    Try on Messenger
                  </button>
                </li>
                <li><span className="text-slate-300">How It Works</span></li>
                <li><span className="text-slate-300">Security</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-poppins font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><span className="text-slate-300">Privacy Policy</span></li>
                <li><span className="text-slate-300">Terms of Service</span></li>
                <li><span className="text-slate-300">Compliance</span></li>
                <li><span className="text-slate-300">Contact Us</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                {t('footer.rights')}
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span>256-bit SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
