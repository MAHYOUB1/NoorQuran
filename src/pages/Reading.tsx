import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { getSurahs, getQuranPage } from '@/lib/api';
import { Surah, Page } from '@/types/quran';
import { ChevronLeft, ChevronRight, Search, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedBackground from '@/components/ui/animated-background';

const Reading: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReadingMode, setIsReadingMode] = useState(false);
  const { toast } = useToast();
  
  const pageNumber = parseInt(searchParams.get('page') || '1');
  const selectedSurah = searchParams.get('surah');

  useEffect(() => {
    loadSurahs();
  }, []);

  useEffect(() => {
    if (pageNumber) {
      loadPage(pageNumber);
    }
  }, [pageNumber]);

  const loadSurahs = async () => {
    try {
      const surahsData = await getSurahs();
      setSurahs(surahsData);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل قائمة السور",
        variant: "destructive"
      });
    }
  };

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const pageData = await getQuranPage(page);
      setCurrentPage(pageData);
      
      // Save last read page
      localStorage.setItem('noor-last-page', page.toString());
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل الصفحة",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

  if (isReadingMode && currentPage) {
    return (
      <div className=" reading-mode-bg flex items-center justify-center p-4 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReadingMode(false)}
          className="fixed top-4 right-4 z-50 shadow-soft"
        >
          خروج من وضع القراءة
        </Button>

        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => handlePageChange(pageNumber - 1)}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 opacity-20 hover:opacity-100 transition-smooth"
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => handlePageChange(pageNumber + 1)}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 opacity-20 hover:opacity-100 transition-smooth"
          disabled={pageNumber >= 604}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Quran page */}
        <Card className="reading-mode-paper max-w-2xl w-full aspect-[3/4] shadow-reading min-h-full">
          <CardContent className="p-8 h-full flex flex-col justify-center items-center">
            <div className="arabic-content font-arabic">
              <div className="text-3xl mb-3 leading-relaxed text-center">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              {currentPage.ayahs.map((ayah, index) => (
                <div key={ayah.number} className="ayah text-xl inline-block ">
                  {ayah.text}
                  <span className="text-sm opacity-70 mx-2">({ayah.numberInSurah})</span>
                </div>
              ))}
              <div className="text-sm opacity-70 mt-6 text-center">
                الصفحة {pageNumber} • الجزء {currentPage.ayahs[0]?.juz}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
          // Page reading view
          <div>
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                onClick={() => setSearchParams({})}
              >
                العودة للسور
              </Button>
              
              <Button
                onClick={() => setIsReadingMode(true)}
                variant="golden"
              >
                <BookOpen className="h-4 w-4 ml-2" />
                وضع القراءة
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : currentPage ? (
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  {/* Navigation */}
                

                  {/* Quran content */}
                  <div className="bg-accent/30 rounded-lg p-8 min-h-[600px]">
                    <div className="arabic-content font-arabic min-h-[600px]">
                      {currentPage.ayahs.map((ayah, index) => (
                        <div key={ayah.number} className="ayah text-xl leading-loose mb-6">
                          {ayah.text}
                          <span className="text-sm opacity-70 mx-2">({ayah.numberInSurah})</span>
                        </div>
                      ))}
                    </div>
                  </div>
  <div className="flex items-center justify-between mb-6">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(pageNumber - 1)}
                      disabled={pageNumber <= 1}
                    >
                      <ChevronRight className="h-4 w-4 ml-2" />
                      السابق
                    </Button>

                    <div className="text-center">
                      <div className="text-lg font-semibold">الصفحة {pageNumber}</div>
                      <div className="text-sm text-muted-foreground">
                        الجزء {currentPage.ayahs[0]?.juz} • من 604
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(pageNumber + 1)}
                      disabled={pageNumber >= 604}
                    >
                      التالي
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                  {/* Quick navigation */}
                  <div className="mt-6 flex items-center justify-center space-x-4 space-x-reverse">
                    <Input
                      type="number"
                      placeholder="رقم الصفحة"
                      min="1"
                      max="604"
                      className="w-32 text-center"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const page = parseInt((e.target as HTMLInputElement).value);
                          if (page) handlePageChange(page);
                        }
                      }}
                    />
                    <Button variant="secondary" size="sm">
                      انتقال سريع
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        )}
      </div>
    </div>
  </AnimatedBackground>
  );
};

export default Reading;