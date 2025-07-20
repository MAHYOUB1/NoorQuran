import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button-variants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Headphones, Star, Heart } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen gradient-warm">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-arabic-title gradient-primary bg-clip-text text-transparent mb-4">
            نــور
          </h1>
          <p className="text-xl text-muted-foreground mb-8 font-arabic">
            اقرأ القرآن الكريم واستمع إليه بتجربة روحانية هادئة
          </p>
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <Button size="lg" className="shadow-golden" asChild>
              <Link to="/reading">
                <BookOpen className="h-5 w-5 ml-2" />
                ابدأ القراءة
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/listening">
                <Headphones className="h-5 w-5 ml-2" />
                الاستماع
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-soft transition-smooth hover:shadow-golden">
            <CardHeader>
              <CardTitle className="flex items-center text-right font-arabic">
                <BookOpen className="h-6 w-6 ml-3" />
                قراءة تفاعلية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-right font-arabic">
                اقرأ المصحف الشريف صفحة بصفحة مع إمكانية البحث والتنقل السهل
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-soft transition-smooth hover:shadow-golden">
            <CardHeader>
              <CardTitle className="flex items-center text-right font-arabic">
                <Headphones className="h-6 w-6 ml-3" />
                تلاوات مختارة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-right font-arabic">
                استمع للقرآن الكريم بأصوات أشهر القراء مع تشغيل سهل ومريح
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-soft transition-smooth hover:shadow-golden">
            <CardHeader>
              <CardTitle className="flex items-center text-right font-arabic">
                <Star className="h-6 w-6 ml-3" />
                وضع القراءة الهادئ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-right font-arabic">
                وضع خاص للقراءة يحاكي المصحف الحقيقي بتركيز تام وهدوء
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-reading">
            <CardHeader>
              <CardTitle className="text-2xl font-arabic-title">
                ابدأ رحلتك الروحانية الآن
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 font-arabic">
                انطلق في تجربة قراءة واستماع فريدة للقرآن الكريم مع واجهة عصرية وهادئة
              </p>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Button variant="golden" size="lg" asChild>
                  <Link to="/reading">
                    <Heart className="h-5 w-5 ml-2" />
                    ابدأ الآن
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;