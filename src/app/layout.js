import "../styles/globals.css";
import Global3DBackground from "../components/layout/BackgroundSystem/Global3DBackground";
import GlobalLuxuryBg from "@/components/layout/BackgroundSystem/GlobalLuxuryBg";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Global3DBackground /> */}
        <GlobalLuxuryBg/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
