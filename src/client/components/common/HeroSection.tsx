"use client";

import { Button } from "@/client/primatives/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Meet your supervision requirements. Stay compliant. Grow with
            confidence.
          </h1>
          <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
            A dedicated platform connecting clinicians with trusted,
            experienced supervisors.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => {
                const el = document.getElementById("signup");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Join the waitlist
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-teal-600 text-teal-700 hover:bg-teal-50 bg-transparent"
              onClick={() => {
                const el = document.getElementById("supervisors");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              I'm a supervisor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
