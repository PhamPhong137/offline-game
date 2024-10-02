import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, Gamepad2, Wifi, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { RainbowButton } from "../components/ui/rainbow-button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link className="flex items-center space-x-2" to="#">
          <Gamepad2 className="h-6 w-6" />
          <span className="font-bold text-xl">Offline Adventure</span>
        </Link>
        <nav className="flex space-x-4 sm:space-x-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#download"
          >
            Download
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#about"
          >
            About
          </Link>
        </nav>
      </header>

      <main className="container m-auto w-full">
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Offline Adventure Awaits
            </h1>
            <p className="text-xl text-muted-foreground">
              Embark on an epic journey that doesn't require an internet
              connection. Play anytime, anywhere.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="#download">
                {" "}
                <RainbowButton>Download Now</RainbowButton>
              </Link>
              <Button size="lg" variant="outline" asChild>
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="bg-muted py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
              Game Features
            </h2>
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center space-y-2">
                    <Wifi className="h-6 w-6" />
                    <span>Offline Play</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No internet? No problem. Play anytime, anywhere.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center space-y-2">
                    <Zap className="h-6 w-6" />
                    <span>Fast-paced Action</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experience thrilling gameplay that keeps you on your toes.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center space-y-2">
                    <ArrowDownToLine className="h-6 w-6" />
                    <span>Regular Updates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    New content and challenges added regularly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="download"
          className="container mx-auto px-4 py-16 md:py-24 lg:py-32 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Ready to Play?
            </h2>
            <p className="text-xl text-muted-foreground">
              Download now and start your offline adventure. No wifi, no
              worries!
            </p>
            <Button size="lg" asChild>
              <Link to="/animation">Download for Free</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © 2024 Offline Adventure. All rights reserved.
          </p>
          <nav className="flex justify-center space-x-4 sm:space-x-6">
            <Link className="text-sm hover:underline underline-offset-4" to="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" to="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
