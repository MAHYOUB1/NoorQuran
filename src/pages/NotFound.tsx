import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button-variants";
import { Home, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl font-arabic-title gradient-primary bg-clip-text text-transparent mb-6">
          ٤٠٤
        </div>
        <h1 className="text-2xl font-semibold mb-4">الصفحة غير موجودة</h1>
        <p className="text-muted-foreground mb-8">
          عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="golden">
            <a href="/">
              <Home className="h-4 w-4 ml-2" />
              العودة للرئيسية
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="/">
              <BookOpen className="h-4 w-4 ml-2" />
              فتح المصحف
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
