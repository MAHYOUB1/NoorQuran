import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button-variants';
import { Input } from '@/components/ui/input';
import LoadingSpinner from '@/components/ui/loading-spinner';
import AudioPlayer from '@/components/ui/audio-player';
import { getReciters, getSurahs, getSurahAudio } from '@/lib/api';
import { Reciter, Surah } from '@/types/quran';
import { Play, Volume2, Search, ArrowRight, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Listening: React.FC = () => {
  const { reciterId } = useParams();
  const [searchParams] = useSearchParams();
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('mahyoub');
  const [showPlayer, setShowPlayer] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (reciterId) {
      loadSurahs();
    } else {
      loadReciters();
    }
  }, [reciterId]);

  const loadReciters = async () => {
    setLoading(true);
    try {
      const recitersData = await getReciters();
      // Filter for Arabic reciters only
      const arabicReciters = recitersData.filter(r => 
        r.language === 'ar' && r.format === 'audio'
      );
      setReciters(arabicReciters);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل قائمة القراء",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };



  const loadSurahs = async () => {
    setLoading(true);
    try {
      const surahsData = await getSurahs();
      setSurahs(surahsData);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل قائمة السور",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async (surahNumber: number) => {
    try {
      if (!reciterId) return;
      
      const surah = surahs.find(s => s.number === surahNumber);
      if (!surah) return;

      setCurrentSurah(surah);
      
      toast({
        title: "جاري التحميل...",
        description: "يتم تحضير التلاوة"
      });

      const url = await getSurahAudio(surahNumber, reciterId);
      console.log(`Audio URL for Surah ${surahNumber}:`, url);
      
      setAudioUrl(url);
      setShowPlayer(true);

      toast({
        title: "جاهز للتشغيل",
        description: `تلاوة سورة ${surah.name}`
      });

    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحضير التلاوة",
        variant: "destructive"
      });
    }
  };

  const handleNextSurah = () => {
    if (!currentSurah || currentSurah.number >= 114) return;
    playAudio(currentSurah.number + 1);
  };

  const handlePreviousSurah = () => {
    if (!currentSurah || currentSurah.number <= 1) return;
    playAudio(currentSurah.number - 1);
  };

  const closePlayer = () => {
    setShowPlayer(false);
    setCurrentSurah(null);
    setAudioUrl('');
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-warm flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Reciter selection view
  if (!reciterId) {
    const filteredReciters = reciters.filter(reciter =>
      reciter.name.includes(searchTerm) || 
      reciter.englishName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="min-h-screen gradient-warm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-arabic-title mb-4">اختر القارئ</h1>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن القارئ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-right"
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReciters.map((reciter) => (
              <Link to={`/listening/${reciter.identifier}`} key={reciter.identifier}>
                <Card className="cursor-pointer transition-smooth hover:shadow-golden">
                  <CardHeader>
                    <CardTitle className="text-right font-arabic flex items-center justify-between">
                      <ArrowRight className="h-5 w-5" />
                      <div>
                        <div className='mb-5'>{reciter.name}</div>
                        <div className="text-sm text-muted-foreground font-normal">
                          {reciter.englishName}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center p-4">
                      <Volume2 className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Surah selection view for specific reciter
  const selectedReciter = reciters.find(r => r.identifier === reciterId);
  const filteredSurahs = surahs.filter(surah =>
    surah.name.includes(searchTerm) || 
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen gradient-warm">
      <div className="container  px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" asChild>
            <Link to="/listening">
              العودة للقراء
            </Link>
          </Button>
          
          <div className="text-center">
            <h1 className="text-2xl font-arabic-title">
              {selectedReciter?.name || 'القارئ المحدد'}
            </h1>
            <p className="text-sm text-muted-foreground">
              اختر السورة للاستماع
            </p>
          </div>
          
          {showPlayer && (
            <Button variant="outline" onClick={closePlayer}>
              <X className="h-4 w-4 ml-2" />
              إغلاق المشغل
            </Button>
          )}
        </div>

        <div className="text-center mb-8">
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
              className={`cursor-pointer transition-smooth hover:shadow-golden ${
                currentSurah?.number === surah.number ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => playAudio(surah.number)}
            >
              <CardHeader>
                <CardTitle className="text-right font-arabic flex items-center justify-between">
                  <Play className={`h-5 w-5 ${
                    currentSurah?.number === surah.number ? 'text-primary animate-pulse' : 'text-muted-foreground'
                  }`} />
                  <div>
                    <span className="text-primary ml-2">{surah.number}.</span>
                    {surah.name}
                  </div>
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

        {/* Audio Player */}
        {showPlayer && currentSurah && audioUrl && (
          <div className=" backdrop-blur-sm border-b  sticky bottom-0   z-50 ">
            <AudioPlayer
              surah={currentSurah}
              reciterName={selectedReciter?.name || 'القارئ المحدد'}
              onNext={currentSurah.number < 114 ? handleNextSurah : undefined}
              onPrevious={currentSurah.number > 1 ? handlePreviousSurah : undefined}
              audioUrl={audioUrl}
              
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Listening;