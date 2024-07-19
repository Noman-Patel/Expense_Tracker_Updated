import { Inter, Outfit } from "next/font/google";
import { ClerkProvider,
          SignInButton,
          SignedIn,
          SignedOut,
          UserButton
        } from "@clerk/nextjs";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Noman Expense Tracker",
  description: "Created By Noman",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      
       <html lang="en">
      <body className={outfit.className}>
        <Toaster/>
        {children}
        </body>
      </html>
    </ClerkProvider>
   
  );
}
