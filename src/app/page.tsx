"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalBody } from "@/components/ui/modal";
import { motion } from "framer-motion";
import {
  Ticket,
  Zap,
  Users,
  BarChart3,
  MessageSquare,
  Shield,
  CheckCircle2,
  ArrowRight,
  Star,
  ChevronRight,
  Play,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { AIChatWidget } from "@/components/chat/AIChatWidget";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const features = [
  {
    icon: Ticket,
    title: "Smart Ticket Management",
    description: "Automatically categorize, prioritize, and route tickets to the right agents.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Respond to customers in seconds with keyboard shortcuts and quick actions.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Internal notes, mentions, and shared views keep everyone in sync.",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Track SLAs, response times, and customer satisfaction in real-time.",
  },
  {
    icon: MessageSquare,
    title: "Omnichannel Support",
    description: "Email, chat, phone, and social - all in one unified inbox.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with role-based access and audit logging.",
  },
];

const stats = [
  { value: "100K+", label: "Tickets Resolved" },
  { value: "500+", label: "Happy Teams" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.8/5", label: "Customer Rating" },
];

const testimonials = [
  {
    quote: "SimplyTicket transformed how we handle support. Our response times dropped by 60%.",
    author: "Sarah Chen",
    role: "VP of Customer Success",
    company: "TechCorp",
  },
  {
    quote: "The best help desk solution we've used. Clean UI, powerful features, amazing support.",
    author: "Michael Park",
    role: "Head of Support",
    company: "StartupX",
  },
  {
    quote: "Finally, a ticketing system that our team actually enjoys using. Highly recommended.",
    author: "Emily Rodriguez",
    role: "Customer Experience Lead",
    company: "Enterprise Co",
  },
];

export default function LandingPage() {
  const [showPrivacyModal, setShowPrivacyModal] = React.useState(false);
  const [showContactModal, setShowContactModal] = React.useState(false);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-zinc-400 transition-colors hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-sm text-zinc-400 transition-colors hover:text-white">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm text-zinc-400 transition-colors hover:text-white">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/client/login">
              <Button variant="outline" className="hidden sm:inline-flex border-teal-500/50 text-teal-400 hover:bg-teal-500/10">
                Client Login
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/pricing">
              <Button>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm">
              <span className="animate-pulse-glow h-2 w-2 rounded-full bg-teal-500" />
              <span className="text-teal-400">New: AI-Powered Auto-Responses</span>
              <ChevronRight className="h-4 w-4 text-teal-400" />
            </div>

            {/* Headline */}
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Support that
              <span className="gradient-text"> delights </span>
              customers
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
              The modern help desk platform for teams who care about customer experience.
              Fast, intuitive, and built to scale.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/pricing">
                <Button size="xl">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center justify-center gap-8 text-zinc-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                14-day free trial
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
                Cancel anytime
              </span>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-16"
          >
            <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/80 p-2 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-rose-500" />
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-4 text-sm text-zinc-500">SimplyTicket Dashboard</span>
              </div>
              <div className="aspect-[16/9] overflow-hidden rounded-b-lg bg-zinc-950">
                {/* Simplified Dashboard Preview */}
                <div className="grid h-full grid-cols-4 gap-4 p-6">
                  {/* Stats */}
                  <div className="col-span-4 grid grid-cols-4 gap-4">
                    {[
                      { label: "Total Tickets", value: "1,234", color: "teal" },
                      { label: "Open", value: "42", color: "emerald" },
                      { label: "Pending", value: "18", color: "amber" },
                      { label: "Avg Response", value: "18m", color: "cyan" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
                      >
                        <p className="text-xs text-zinc-500">{stat.label}</p>
                        <p className={`mt-1 text-2xl font-bold text-${stat.color}-400`}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Chart placeholder */}
                  <div className="col-span-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="mb-4 h-4 w-32 rounded bg-zinc-800" />
                    <div className="flex h-32 items-end gap-2">
                      {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-teal-600 to-cyan-500"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Side panel */}
                  <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                    <div className="mb-3 h-4 w-24 rounded bg-zinc-800" />
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-zinc-800" />
                          <div className="flex-1">
                            <div className="h-3 w-full rounded bg-zinc-800" />
                            <div className="mt-1 h-2 w-2/3 rounded bg-zinc-800/50" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-px -z-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 blur-xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section border-y border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl font-bold text-white md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-zinc-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Everything you need to deliver
              <span className="gradient-text"> exceptional support</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Powerful features designed to help your team work smarter, not harder.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="mb-4 inline-flex rounded-lg bg-teal-500/10 p-3">
                  <feature.icon className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Simple, transparent
              <span className="gradient-text"> pricing</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Choose the plan that fits your team. No hidden fees. No surprise charges.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Starter</h3>
                <p className="mt-2 text-sm text-zinc-400">For small teams getting started</p>
                
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-zinc-400">/user/mo</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "Unlimited tickets & conversations",
                  "Email & chat support channels",
                  "Basic SLA management",
                  "Team collaboration & notes",
                  "Role-based access control",
                  "Real-time analytics",
                  "API access",
                  "99.9% uptime SLA",
                  "Email support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-500" />
                    <span className="text-sm text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-teal-500/50 bg-gradient-to-b from-teal-500/10 to-transparent p-8"
            >
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-1 text-sm font-semibold text-white shadow-lg shadow-teal-500/30">
                  Most Popular
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Pro</h3>
                <p className="mt-2 text-sm text-zinc-400">Advanced features for growing teams</p>
                
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">$39</span>
                  <span className="text-zinc-400">/user/mo</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "Everything in Starter, plus:",
                  "Ticket/Email/Messaging templates",
                  "Multilingual support",
                  "Inventory tracking",
                  "Asset tracking with barcode labels",
                  "Credit card processing",
                  "Mobile app access",
                  "AI-powered auto-responses",
                  "Advanced automations & workflows",
                  "Webhooks & integrations",
                  "Priority support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/pricing">
                  <Button size="lg" className="w-full">
                    Start Free Trial
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
            >
              <div className="text-center">
                <h3 className="text-xl font-bold text-white">Enterprise</h3>
                <p className="mt-2 text-sm text-zinc-400">For large organizations</p>
                
                <div className="mt-6 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">Custom</span>
                </div>
                <p className="mt-1 text-sm text-zinc-500">Contact us for pricing</p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "Everything in Pro, plus:",
                  "Unlimited users",
                  "SSO / SAML authentication",
                  "Dedicated account manager",
                  "Custom SLA terms",
                  "On-premise deployment option",
                  "Advanced security & compliance",
                  "Custom integrations",
                  "White-label options",
                  "24/7 phone support",
                  "Uptime guarantee (99.99%)",
                  "Training & onboarding",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-500" />
                    <span className="text-sm text-zinc-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button variant="outline" size="lg" className="w-full" onClick={() => setShowContactModal(true)}>
                  Contact Sales
                </Button>
              </div>
            </motion.div>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500">
            All plans include a 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Loved by support teams
              <span className="gradient-text"> worldwide</span>
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/80"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500" />
                  <div>
                    <p className="font-medium text-white">{testimonial.author}</p>
                    <p className="text-sm text-zinc-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Ready to transform your
            <span className="gradient-text"> customer support?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Join growing teams delivering exceptional support with SimplyTicket.
            Start your free trial today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/pricing">
              <Button size="xl">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="xl">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Logo />
            <div className="flex items-center gap-8 text-sm text-zinc-400">
              <button onClick={() => setShowPrivacyModal(true)} className="transition-colors hover:text-white">Privacy</button>
              <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
              <button onClick={() => setShowContactModal(true)} className="transition-colors hover:text-white">Contact</button>
            </div>
            <p className="text-sm text-zinc-500">
              © 2026 SimplyTicket. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      <Modal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} size="lg">
        <ModalHeader onClose={() => setShowPrivacyModal(false)}>
          Privacy & Security
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6 text-zinc-300">
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Data Protection</h3>
              <p className="text-sm">
                SimplyTicket is committed to protecting your data. All information is encrypted in transit using TLS 1.3 
                and at rest using AES-256 encryption. We maintain SOC 2 Type II compliance and undergo regular third-party security audits.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Information We Collect</h3>
              <p className="text-sm">
                We collect only the information necessary to provide our services: account information (name, email), 
                usage data for improving our platform, and support ticket content. We never sell your data to third parties.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Your Rights</h3>
              <p className="text-sm">
                You have the right to access, modify, or delete your personal data at any time. Contact our support team 
                to exercise these rights. We comply with GDPR, CCPA, and other applicable privacy regulations.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Data Retention Policy</h3>
              <div className="text-sm space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong className="text-amber-400">3-Day Grace Period:</strong> If your subscription expires, you have 3 days to renew before your account is locked.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong className="text-red-400">30-Day Data Purge:</strong> Accounts that remain expired for 30 days will have all data permanently deleted.</span>
                </p>
                <p className="text-zinc-400 italic text-xs mt-2">
                  Pro plan members can export their data at any time. We recommend exporting before your subscription ends.
                </p>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Cookies</h3>
              <p className="text-sm">
                We use essential cookies to maintain your session and preferences. Analytics cookies are optional and 
                can be disabled in your browser settings. We do not use advertising or tracking cookies.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
              <p className="text-sm">
                For privacy-related inquiries, contact us at privacy@simplyticket.net
              </p>
            </section>
          </div>
        </ModalBody>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={showContactModal} onClose={() => setShowContactModal(false)} size="md">
        <ModalHeader onClose={() => setShowContactModal(false)}>
          Contact Us
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-teal-500/10 p-3">
                <MapPin className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Office Address</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  SimplyTicket Inc.<br />
                  350 Fifth Avenue, Suite 4820<br />
                  New York, NY 10118<br />
                  United States
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-teal-500/10 p-3">
                <Mail className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  General Inquiries: hello@simplyticket.net<br />
                  Support: support@simplyticket.net<br />
                  Sales: sales@simplyticket.net
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-teal-500/10 p-3">
                <Phone className="h-5 w-5 text-teal-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Phone</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  +1 (212) 555-0147<br />
                  Mon-Fri: 9:00 AM - 6:00 PM EST
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}
