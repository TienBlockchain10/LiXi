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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-green rounded-lg flex items-center justify-center">
                <Coins className="text-white w-5 h-5" />
              </div>
              <h1 className="text-xl font-poppins font-bold text-slate-900">{t('header.title')}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <LanguageToggle variant="header" />
              <Button 
                onClick={handleFacebookRedirect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('header.getStarted')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-blue via-blue-700 to-brand-green py-20 lg:py-32">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
              <span className="block text-viet-yellow">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-viet-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {t('hero.joinWaitlist')}
              </Button>
              <Button 
                onClick={handleFacebookRedirect}
                variant="outline"
                className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg transition-all duration-200 hover:bg-opacity-30 flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t('hero.tryMessenger')}</span>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Shield className="w-6 h-6 text-viet-yellow" />
                <span className="font-medium">{t('hero.bankSecurity')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-viet-yellow" />
                <span className="font-medium">{t('hero.fastTransfer')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Percent className="w-6 h-6 text-viet-yellow" />
                <span className="font-medium">{t('hero.lowFees')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">
              {t('values.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('values.fast.title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('values.fast.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-green to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('values.lowCost.title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('values.lowCost.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-viet-red to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('values.simple.title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('values.simple.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('values.secure.title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('values.secure.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('values.stable.title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('values.stable.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('values.focused.title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('values.focused.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl font-poppins font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('howItWorks.step1.title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('howItWorks.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-green to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl font-poppins font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('howItWorks.step2.title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('howItWorks.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-viet-red to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl font-poppins font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-poppins font-semibold text-slate-900 mb-4">{t('howItWorks.step3.title')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('howItWorks.step3.description')}
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              onClick={handleFacebookRedirect}
              className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t('howItWorks.tryNow')}</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-4">
              {t('social.title')}
            </h2>
            <p className="text-xl text-slate-600">
              {t('social.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-viet-yellow text-xl">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">
                  "Finally, a service that understands our community. Sending money to my parents in Saigon has never been this easy and affordable."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">LN</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Linda Nguyen</p>
                    <p className="text-slate-600 text-sm">San Jose, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-viet-yellow text-xl">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">
                  "The speed is incredible. My family in Hanoi received the money in under 5 minutes. No more expensive Western Union fees!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">DT</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">David Tran</p>
                    <p className="text-slate-600 text-sm">Houston, TX</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex text-viet-yellow text-xl">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">
                  "Using Facebook Messenger makes it so convenient. I can send money while chatting with my family - it's genius!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">ML</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Michelle Le</p>
                    <p className="text-slate-600 text-sm">Orange County, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-poppins font-bold text-brand-blue mb-2">$2M+</div>
              <div className="text-slate-600 font-medium">Transferred</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-poppins font-bold text-brand-green mb-2">15,000+</div>
              <div className="text-slate-600 font-medium">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-poppins font-bold text-viet-red mb-2">90%</div>
              <div className="text-slate-600 font-medium">Lower Fees</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-poppins font-bold text-purple-600 mb-2">3min</div>
              <div className="text-slate-600 font-medium">Average Transfer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-white mb-6">
            {t('waitlist.title')}
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('waitlist.subtitle')}
          </p>

          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              {showSuccess ? (
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">You're on the list!</h3>
                  <p className="text-slate-600">Thank you! We'll be in touch soon with early access details.</p>
                </div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2 text-left">
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
                    <Label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2 text-left">
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
                    <Label htmlFor="monthlyAmount" className="block text-sm font-medium text-slate-700 mb-2 text-left">
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
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-green hover:from-blue-700 hover:to-green-700 text-white py-4 rounded-lg font-poppins font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    {joinWaitlistMutation.isPending ? t('waitlist.submitting') : t('waitlist.submitButton')}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  By joining, you agree to our Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Facebook Redirect Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card>
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-slate-900 mb-6">
                Ready to Try VietCoin Remit?
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Experience our service firsthand through Facebook Messenger. Send your first transfer in minutes.
              </p>

              <Button 
                onClick={handleFacebookRedirect}
                className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-poppins font-semibold text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Open Messenger</span>
                <ExternalLink className="w-5 h-5" />
              </Button>

              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                  Opens in a new tab • No personal information required to start
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-green rounded-lg flex items-center justify-center">
                  <Coins className="text-white w-5 h-5" />
                </div>
                <h3 className="text-xl font-poppins font-bold">VietCoin Remit</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Revolutionizing remittances for the Vietnamese-American community through secure, fast, and affordable stablecoin transfers via Facebook Messenger.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors duration-200">
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

          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 VietCoin Remit. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Shield className="w-4 h-4 text-brand-green" />
                  <span>Licensed Money Transmitter</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <Shield className="w-4 h-4 text-brand-blue" />
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
