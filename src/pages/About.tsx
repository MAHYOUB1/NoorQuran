import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedBackground from '@/components/ui/animated-background';
import IslamicFrame from '@/components/ui/islamic-frame';
import { 
  Sparkles, 
  Code, 
  Palette, 
  Zap, 
  Heart, 
  Star,
  Github,
  Linkedin,
  Mail,
  Globe,
  Award,
  BookOpen,
  Lightbulb,
  Rocket,
  Brain
} from 'lucide-react';
import '../../public/me.jpg';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: 'React & TypeScript', icon: Code, level: 95 },
    { name: 'UI/UX Design', icon: Palette, level: 90 },
    { name: 'Problem solving', icon: Brain, level: 88 },
    { name: 'Performance Optimization', icon: Zap, level: 92 },
    { name: 'Modern Animations', icon: Star, level: 85 }
  ];

  const achievements = [
    { title: 'تطبيقات  متطورة', count: '3+', icon: BookOpen },
    { title: 'سنوات من الخبرة', count: '1+', icon: Award },
    { title: 'مشاريع مفتوحة المصدر', count: '1+', icon: Github },
    { title: 'تقييمات إيجابية', count: '98%', icon: Heart }
  ];

  return (
    <AnimatedBackground variant="royal" withParticles>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative animate-scale-in">
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary via-secondary to-primary animate-rotate-slow" />
              <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                <img src='../../public/me.jpg' alt="صورة شخصية لمهيوب عبد الغني الحمادي" className="w-full  text-primary rounded-full" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6x1 font-arabic-title arabic-calligraphy mb-4">
          مهيوب عبد الغني الحمادي
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto leading-relaxed">
              طالب امن سيبراني شغوف
             في تصميم وتطوير تطبيقات الويب </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="text-lg px-6 py-2">
                <Code className="w-4 h-4 mr-2" />
            مهندس امن سيبراني
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-2">
                <Palette className="w-4 h-4 mr-2" />
                مصمم 
              </Badge>
              <Badge variant="default" className="text-lg px-6 py-2">
                <Heart className="w-4 h-4 mr-2" />
                طالب يعشق التقدم
              </Badge>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-16">
          <IslamicFrame variant="ornate" className="mb-8">
            <h2 className="text-3xl font-arabic-title text-center mb-8 text-primary">
              المهارات والخبرات
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{skill.name}</h3>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                  
                  <span className="text-2xl font-bold text-primary">{skill.level}%</span>
                </div>
              ))}
            </div>
          </IslamicFrame>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-arabic-title text-center mb-8 text-primary">
            الإنجازات والأرقام
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="text-center p-6 hover:shadow-golden transition-all duration-300 group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-primary mb-2 text-shimmer">
                    {achievement.count}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {achievement.title}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-16">
          <IslamicFrame variant="royal">
            <div className="text-center">
              <Lightbulb className="w-16 h-16 mx-auto mb-6 text-primary animate-pulse" />
              
              <h2 className="text-3xl font-arabic-title mb-6 text-primary">
                فلسفة التصميم
              </h2>
              
              <blockquote className="text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto font-arabic italic">
                "أؤمن بأن التكنولوجيا يجب أن تخدم الإنسان وتقربه إلى خالقه، وأن الجمال في التصميم 
                انعكاس لجمال الخلق الإلهي. أسعى لخلق تجارب رقمية تجمع بين الأصالة الإسلامية 
                والحداثة التقنية، لتكون جسراً يربط بين التراث العريق والمستقبل المشرق."
              </blockquote>
              
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              </div>
            </div>
          </IslamicFrame>
        </section>

        {/* Contact Section */}
        <section>
          <IslamicFrame variant="ornate" withGlow>
            <div className="text-center">
              <h2 className="text-3xl font-arabic-title mb-8 text-primary">
                تواصل معي
              </h2>
              
              <p className="text-lg mb-8 text-muted-foreground">
               دعنا نتعاون لإنشاء شيء رائع
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="group">
                  <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" />
                  البريد الإلكتروني
                </Button>
                
                <Button size="lg" variant="outline" className="group">
                  <Github className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" />
                  GitHub
                </Button>
                
                
                <Button size="lg" variant="outline" className="group">
                  <Globe className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" />
                  الموقع الشخصي
                </Button>
              </div>
            </div>
          </IslamicFrame>
        </section>

        {/* Decorative Footer */}
        <div className="text-center mt-16 py-8">
          <div className="text-2xl font-arabic-title text-primary mb-4">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
          </div>
          <p className="text-muted-foreground">
            صُنع بـكل حب <Heart className="w-4 h-4 inline text-red-500 animate-pulse" /> بواسطة المهندس : مهيوب الحمادي
          </p>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default About;