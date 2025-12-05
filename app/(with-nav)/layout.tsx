import { Navbar } from "@/components/navbar";
import Background from "@/components/background";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* 导航栏 */}
      <Navbar />
      <Background />
      {/* Spline 3D 背景 - 固定全屏 */}
      {/* <div className="fixed inset-0 w-full h-full -z-10">
        
      </div> */}
      
      {/* 主内容区域 */}
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow relative z-10">
        {children}
      </main>
      
      {/* 页脚 */}
      <footer className="w-full flex items-center justify-center py-3 relative z-10">
        {/* Footer content can be added here */}
      </footer>
    </div>
  );
}
