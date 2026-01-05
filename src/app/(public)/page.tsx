import { HeroSection } from "@/client/components/common/HeroSection";
import { Button } from "@/client/primatives/button";
import { Card } from "@/client/primatives/card";
import { Input } from "@/client/primatives/input";
import { Label } from "@/client/primatives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/client/primatives/select";
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  Heart,
  MapPin,
  Users,
} from "lucide-react";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Supported Professions Section */}
      <section className="border-y bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-8">
              Supported Professions
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50 p-4">
                <span className="font-medium text-foreground">
                  Occupational Therapy
                </span>
                <span className="inline-flex items-center rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                  In Beta
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-60">
                <span className="font-medium text-muted-foreground">
                  Social Work
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-60">
                <span className="font-medium text-muted-foreground">
                  Physical Therapy
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-60">
                <span className="font-medium text-muted-foreground">
                  Speech Pathology
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-60">
                <span className="font-medium text-muted-foreground">
                  Counseling / MFT
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
                  Coming Soon
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4 opacity-60">
                <span className="font-medium text-muted-foreground">
                  Psychology
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-700">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Meeting your professional supervision requirements shouldn't be
              this difficult
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Mandatory supervision for licensing compliance — but finding
              quality supervisors is nearly impossible
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "No central marketplace",
                desc: "Word-of-mouth and Facebook groups are your only options — there's no reliable way to find supervisors",
              },
              {
                icon: Calendar,
                title: "Rural and private practice isolation",
                desc: "Outside hospitals and large organizations, finding consistent, quality supervision is a constant struggle",
              },
              {
                icon: CheckCircle2,
                title: "Compliance risk without records",
                desc: "Manual tracking puts your licensing at risk — one audit and you're scrambling for proof",
              },
              {
                icon: FileCheck,
                title: "No central marketplace",
                desc: "Word-of-mouth and Facebook groups are your only options — there's no reliable way to find supervisors",
              },
            ].map((feature, i) => (
              <Card key={i} className="bg-white p-6 text-center">
                <div className="mx-auto mb-4 inline-flex rounded-lg bg-teal-100 p-3">
                  <feature.icon className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-teal-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your complete professional supervision and compliance solution
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to meet licensing requirements and develop
              your clinical skills
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Match with verified supervisors",
                desc: "Find experienced supervisors who understand your practice area and context",
              },
              {
                icon: Calendar,
                title: "Book recurring sessions",
                desc: "Schedule weekly or monthly supervision that fits your workflow",
              },
              {
                icon: CheckCircle2,
                title: "Track hours automatically",
                desc: "Never lose track of your mandatory supervision hours again",
              },
              {
                icon: FileCheck,
                title: "Export compliance reports",
                desc: "Generate audit-ready records for licensing boards instantly",
              },
            ].map((feature, i) => (
              <Card key={i} className="bg-white p-6 text-center">
                <div className="mx-auto mb-4 inline-flex rounded-lg bg-teal-100 p-3">
                  <feature.icon className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Getting started is simple
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-8 top-12 hidden h-[calc(100%-6rem)] w-0.5 bg-teal-200 lg:block" />

              <div className="space-y-12">
                {[
                  {
                    step: "1",
                    title: "Create your profile",
                    desc: "Tell us about your practice area, location, and supervision requirements",
                  },
                  {
                    step: "2",
                    title: "Match with a supervisor",
                    desc: "Browse verified supervisors and find one that fits your needs, goals, and schedule",
                  },
                  {
                    step: "3",
                    title: "Meet, log, and stay compliant",
                    desc: "Attend sessions, automatically track your hours, and export licensing-ready records anytime",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits - Supervisees */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Grow your clinical confidence while meeting requirements
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The outcomes that matter most to your career
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Confidence in clinical decisions",
                desc: "Feel supported and assured in your day-to-day practice with expert guidance",
              },
              {
                icon: FileCheck,
                title: "Always audit-ready",
                desc: "Meet licensing requirements with automatic tracking and compliance-ready documentation",
              },
              {
                icon: MapPin,
                title: "Accessible supervision anywhere",
                desc: "Get the support you need, wherever you practice — no location barriers",
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-teal-100 p-4">
                  <benefit.icon className="h-8 w-8 text-teal-700" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Supervisors */}
      <section id="supervisors" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              For experienced supervisors
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Share your expertise and support the next generation of clinicians
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Share your expertise",
                desc: "Guide early-career clinicians and give back to your profession",
              },
              {
                icon: DollarSign,
                title: "Earn income on your schedule",
                desc: "Set your own rates and availability — full control, no contracts",
              },
              {
                icon: Clock,
                title: "No admin burden",
                desc: "No marketing, no invoicing, no chasing payments — we handle it all",
              },
            ].map((benefit, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="mx-auto mb-4 inline-flex rounded-full bg-teal-100 p-4">
                  <benefit.icon className="h-8 w-8 text-teal-700" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-teal-600" />
                <p className="text-sm font-medium text-foreground">
                  Designed in collaboration with experienced clinicians
                </p>
              </div>
              <div>
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-teal-600" />
                <p className="text-sm font-medium text-foreground">
                  Built around licensing board requirements and standards
                </p>
              </div>
              <div>
                <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-teal-600" />
                <p className="text-sm font-medium text-foreground">
                  Compliance-first platform design
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 py-16 text-white lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Meeting your supervision requirements shouldn't be this hard.
            </h2>
            <p className="mt-4 text-lg text-teal-50">
              Join the waitlist and be the first to know when we launch
            </p>
            <Button
              size="lg"
              className="mt-8 bg-white text-teal-700 hover:bg-teal-50"
            >
              Join the waitlist
            </Button>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl">
            <Card className="p-8">
              <h2 className="text-center text-2xl font-bold text-foreground">
                Join the waitlist
              </h2>
              <p className="mt-2 text-center text-muted-foreground">
                Be the first to know when we launch.
              </p>
              <form className="mt-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supervisee">
                        Supervisee (seeking supervision)
                      </SelectItem>
                      <SelectItem value="supervisor">
                        Supervisor (providing supervision)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession (optional)</Label>
                  <Select defaultValue="ot">
                    <SelectTrigger id="profession">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ot">Occupational Therapy</SelectItem>
                      <SelectItem value="social-work">Social Work</SelectItem>
                      <SelectItem value="counseling">
                        Counseling / MFT
                      </SelectItem>
                      <SelectItem value="pt">Physical Therapy</SelectItem>
                      <SelectItem value="slp">
                        Speech-Language Pathology
                      </SelectItem>
                      <SelectItem value="other">
                        Other (tell us in comments)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  Join waitlist
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Our mission is to make mandatory professional supervision
                accessible, compliant, and supportive for all clinicians.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </div>
              <p className="mt-8 text-xs text-muted-foreground">
                <strong>Important:</strong> This platform facilitates
                professional supervision for licensing compliance and does not
                provide therapy or clinical services to clients.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                © {new Date().getFullYear()} Professional Supervision Platform.
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
