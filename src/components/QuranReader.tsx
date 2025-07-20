import AnimatedBackground from '@/components/ui/animated-background';
import { Button } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import QuranPage from '@/components/ui/quran-page';
import { useToast } from '@/hooks/use-toast';
import { getQuranPage, getSurahs } from '@/lib/api';
import { Page, Surah } from '@/types/quran';
import { BookOpen, ChevronLeft, ChevronRight, Moon, Search, Sun, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface QuranReaderProps {
  className?: string;
}

const QuranReader: React.FC<QuranReaderProps> = ({ className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNavButtons, setShowNavButtons] = useState(false);
  const { toast } = useToast();
const pageNumber = parseInt(searchParams.get('page') || '1')
  const selectedSurah = searchParams.get('surah');
  // حفظ آخر صفحة في localStorage
  useEffect(() => {
    const savedPage = localStorage.getItem('noor-last-page');
    const savedReadingMode = localStorage.getItem('noor-reading-mode');
    const savedDarkMode = localStorage.getItem('noor-dark-mode');
    if (savedReadingMode === 'true') setIsReadingMode(true);
    if (savedDarkMode === 'true') setIsDarkMode(true);
    // جلب السور عند التحميل
    if (surahs.length === 0) {
      getSurahs().then(setSurahs).catch(() => {});
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('noor-last-page', pageNumber.toString());
    localStorage.setItem('noor-reading-mode', isReadingMode.toString());
    localStorage.setItem('noor-dark-mode', isDarkMode.toString());
    // تطبيق الوضع المظلم
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [pageNumber, isReadingMode, isDarkMode]);

  // جلب الصفحة عند تغيير رقم الصفحة
  useEffect(() => {
    getQuranPage(pageNumber)
      .then(setCurrentPage)
      .catch(() => setCurrentPage(null));
  }, [pageNumber]);


  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);
    toast({
      title: isReadingMode ? "تم إلغاء وضع القراءة" : "تم تفعيل وضع القراءة",
      description: isReadingMode ? "العودة للواجهة العادية" : "وضع قراءة هادئ ومركز",
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      toast({
        title: "البحث",
        description: `البحث عن: ${searchTerm}`,
      });
    }
  };

  // معلومات الصفحة (مؤقتة - ستحتاج API حقيقي)
  const getPageInfo = (page: number) => {
    if (page === 1) return { surah: "الفاتحة", juz: 1, hizb: 1 };
    if (page <= 21) return { surah: "البقرة", juz: 1, hizb: Math.ceil(page / 4) };
    return { surah: "آل عمران", juz: Math.ceil(page / 20), hizb: Math.ceil(page / 4) };
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= 604) {
      setSearchParams({ page: newPage.toString() });
      toast({
        title: `الصفحة ${newPage}`,
        description: `تم الانتقال إلى الصفحة ${newPage}`,
      });
    }
  };

  const handleSurahClick = (surah: Surah) => {
    // Calculate the actual starting page for the surah
    const startPage = calculateSurahStartPage(surah.number);
    setSearchParams({ surah: surah.number.toString(), page: startPage.toString() });
  };

  // Simple mapping of surah numbers to their starting pages
  const calculateSurahStartPage = (surahNumber: number): number => {
    const surahPages: { [key: number]: number } = {
      1: 1, 2: 2, 3: 50, 4: 77, 5: 106, 6: 128, 7: 151, 8: 177, 9: 187,
      10: 208, 11: 221, 12: 235, 13: 249, 14: 255, 15: 262, 16: 267, 17: 282,
      18: 293, 19: 305, 20: 312, 21: 322, 22: 332, 23: 342, 24: 350, 25: 359,
      26: 367, 27: 377, 28: 385, 29: 396, 30: 404, 31: 411, 32: 415, 33: 418,
      34: 428, 35: 434, 36: 440, 37: 446, 38: 453, 39: 458, 40: 467, 41: 477,
      42: 483, 43: 489, 44: 496, 45: 499, 46: 502, 47: 507, 48: 511, 49: 515,
      50: 518, 51: 520, 52: 523, 53: 526, 54: 528, 55: 531, 56: 534, 57: 537,
      58: 542, 59: 545, 60: 549, 61: 551, 62: 553, 63: 554, 64: 556, 65: 558,
      66: 560, 67: 562, 68: 564, 69: 566, 70: 568, 71: 570, 72: 572, 73: 574,
      74: 575, 75: 577, 76: 578, 77: 580, 78: 582, 79: 583, 80: 585, 81: 586,
      82: 587, 83: 587, 84: 589, 85: 590, 86: 591, 87: 591, 88: 592, 89: 593,
      90: 594, 91: 595, 92: 595, 93: 596, 94: 596, 95: 597, 96: 597, 97: 598,
      98: 598, 99: 599, 100: 599, 101: 600, 102: 600, 103: 601, 104: 601,
      105: 601, 106: 602, 107: 602, 108: 602, 109: 603, 110: 603, 111: 603,
      112: 604, 113: 604, 114: 604
    };
    return surahPages[surahNumber] || 1;
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.name.includes(searchTerm) || 
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageInfo = getPageInfo(pageNumber);

  // محتوى القرآن المحدث
  const getPageContent = () => {
    if (!currentPage || !currentPage.ayahs) return '';
    // دمج نصوص الآيات مع رقم الآية
    return currentPage.ayahs.map(
      (ayah) => `${ayah.text} ﴿${ayah.numberInSurah}﴾`
    ).join(' ');
  };

  if (isReadingMode) {
    return (
      <AnimatedBackground variant="royal" withParticles={false} className="reading-mode-bg">
        <div 
          className={`min-h-screen flex items-center justify-center p-4 ${className}`}
          onMouseMove={(e) => {
            const { clientX } = e;
            const { innerWidth } = window;
            setShowNavButtons(clientX < 100 || clientX > innerWidth - 100);
          }}
          onMouseLeave={() => setShowNavButtons(false)}
        >
          {/* زر الخروج من وضع القراءة */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleReadingMode}
            className="fixed top-4 right-4 z-50 shadow-soft backdrop-blur-sm"
          >
            <X className="h-4 w-4 ml-2" />
            خروج
          </Button>

          {/* أزرار التنقل المخفية */}
          <Button
            variant="outline"
            size="lg"
              onClick={() => handlePageChange(pageNumber - 1)}
            className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 backdrop-blur-sm ${
              showNavButtons ? 'nav-button-visible' : 'nav-button-hidden'
            }`}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="lg"
              onClick={() => handlePageChange(pageNumber + 1)}
            className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 backdrop-blur-sm ${
              showNavButtons ? 'nav-button-visible' : 'nav-button-hidden'
            }`}
            disabled={pageNumber >= 604}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* صفحة المصحف المحدثة */}
          <QuranPage
            pageNumber={pageNumber}
            surahName={pageInfo.surah}
            juzNumber={pageInfo.juz}
            hizbNumber={pageInfo.hizb}
            content={getPageContent()}
            isReadingMode={true}
            onPageClick={() => {}}
            className="max-w-4xl w-full"
          />
        </div>
      </AnimatedBackground>
    );
  }
 return (
  <AnimatedBackground variant="royal" withParticles>
    <div className="min-h-screen gradient-warm">
      <div className="container mx-auto px-4 py-8">
        {!selectedSurah ? (
          // Surah selection view
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-arabic-title mb-4">اختر السورة</h1>
              <div className="max-w-md mx-auto relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن السورة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSurahs.map((surah) => (
                <Card 
                  key={surah.number}
                  className="cursor-pointer transition-smooth hover:shadow-golden"
                  onClick={() => handleSurahClick(surah)}
                >
                  <CardHeader>
                    <CardTitle className="text-right font-arabic">
                      <span className="text-primary ml-2">{surah.number}.</span>
                      {surah.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-right">
                      {surah.englishNameTranslation} • {surah.numberOfAyahs} آية
                    </p>
                    <p className="text-xs text-muted-foreground text-right mt-1">
                      {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <AnimatedBackground variant="royal" withParticles className={className}>
            {/* الهيدر المحدث */}
            <header className="bg-card/95 backdrop-blur-md border-b border-border/50 shadow-soft sticky top-0 z-30">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <h1 className="text-3xl font-arabic-title text-shimmer">
                      نــور
                    </h1>
                    <div className="text-sm text-muted-foreground">
                      {pageInfo.surah} • الصفحة {pageNumber} • الجزء {pageInfo.juz}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {/* مربع البحث المحدث */}
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Input
                        placeholder="البحث في الصفحة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-48 text-right backdrop-blur-sm bg-background/80"
                        dir="rtl"
                      />
                      <Button variant="outline" size="sm" onClick={handleSearch} className="backdrop-blur-sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* تبديل الوضع المظلم */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    >
                      {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>

                    {/* وضع القراءة المحدث */}
                    <Button
                      onClick={toggleReadingMode}
                      variant="golden"
                      size="lg"
                      className="shadow-golden hover:shadow-royal transition-all duration-300 hover:scale-105"
                    >
                      <BookOpen className="h-4 w-4 ml-2" />
                      وضع القراءة
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* المحتوى الرئيسي المحدث */}
            <main className="container mx-auto px-4 py-8">
              <div className="flex justify-center">
                {/* أزرار التنقل العلوية */}
                <div className="max-w-4xl w-full">
                  <div className="flex items-center justify-between mb-8">
                    {/* Fix navigation button handlers and disables */}
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(pageNumber - 1)}
                      disabled={pageNumber <= 1}
                      className="transition-smooth hover:scale-105 shadow-soft backdrop-blur-sm"
                      size="lg"
                    >
                      <ChevronRight className="h-5 w-5 ml-2" />
                      الصفحة السابقة
                    </Button>

                    <div className="text-center bg-card/80 backdrop-blur-sm rounded-lg px-6 py-3 shadow-soft">
                      <div className="text-xl font-arabic-title text-primary">{pageInfo.surah}</div>
                      <div className="text-sm text-muted-foreground">
                        الصفحة {pageNumber} من 604
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(pageNumber + 1)}
                      disabled={pageNumber >= 604}
                      className="transition-smooth hover:scale-105 shadow-soft backdrop-blur-sm"
                      size="lg"
                    >
                      الصفحة التالية
                      <ChevronLeft className="h-5 w-5 mr-2" />
                    </Button>
                  </div>

                  {/* صفحة القرآن المحدثة */}
                  <QuranPage
                    pageNumber={pageNumber}
                    surahName={pageInfo.surah}
                    juzNumber={pageInfo.juz}
                    hizbNumber={pageInfo.hizb}
                    content={getPageContent()} // Make sure this returns the correct type
                    isReadingMode={false}
                    onPageClick={() => {
                      toast({
                        title: "صفحة تفاعلية",
                        description: "يمكنك النقر على الآيات للتفاعل معها",
                      });
                    }}
                    className="mb-8"
                  />
                  

                  {/* شريط التنقل السريع المحدث */}
                  <div className="mt-8 flex items-center justify-center space-x-4 space-x-reverse">
                    <Input
                      type="number"
                      placeholder="رقم الصفحة"
                      min="1"
                      max="604"
                      className="w-40 text-center backdrop-blur-sm bg-background/80"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const page = parseInt((e.target as HTMLInputElement).value);
                          if (page) handlePageChange(page);
                        }
                      }}
                    />
                    <Button 
                      variant="secondary" 
                      size="lg"
                      className="shadow-soft transition-all duration-300 hover:scale-105"
                    >
                      انتقال سريع
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </AnimatedBackground>
        )}
      </div>
    </div>
  </AnimatedBackground>
 );
};

export default QuranReader;