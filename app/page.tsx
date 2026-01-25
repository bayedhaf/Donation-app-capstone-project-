// app/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, ShieldCheck, LayoutDashboard, Sparkles, ArrowRight, Users, Globe, TrendingUp, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

// Particle positions that are consistent between server and client
const PARTICLE_POSITIONS = [
  { x: 11.24, y: -100 },
  { x: 96.16, y: -100 },
  { x: 14.41, y: -100 },
  { x: 69.05, y: -100 },
  { x: 30.45, y: -100 },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  // Memoize the particle data to prevent re-renders
  const particleData = useMemo(() => {
    return PARTICLE_POSITIONS.map((pos, i) => ({
      ...pos,
      key: i,
      duration: 3 + (i * 0.5),
      delay: i * 0.5,
      yPath: [0, 400, 400],
      xPath: [pos.x, pos.x + Math.random() * 50 - 25, pos.x + Math.random() * 50 - 25]
    }));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Animated Background Elements - Use CSS animations instead of Math.random */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Header with smooth animation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-indigo-100"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <HeartHandshake className="h-8 w-8 text-indigo-600" />
            {isMounted && (
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-ping" />
            )}
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Donate<span className="font-black">Flow</span>
          </h1>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 hover:scale-105"
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Sign Up Free
              </Button>
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative px-6 md:px-20 mt-16 md:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-700">
              Join 10,000+ donors making impact daily
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Give With
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Confidence
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            A next-gen donation platform where transparency meets impact.
            Track every dollar, see real results, and join a community
            that cares.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/signup">
              <Button className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                Start Making Impact
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/campaigns">
              <Button
                variant="outline"
                className="group px-8 py-6 rounded-xl text-lg font-semibold border-2 border-indigo-300 hover:border-indigo-400 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                See Live Campaigns
              </Button>
            </Link>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto"
          >
            {[
              { value: "$2.5M+", label: "Raised", icon: TrendingUp },
              { value: "500+", label: "Campaigns", icon: Globe },
              { value: "50K+", label: "Donors", icon: Users },
              { value: "98%", label: "Satisfaction", icon: HeartHandshake }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center gap-3">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                  <div>
                    <div className="text-2xl font-bold text-indigo-700">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Grid with Stagger Animation */}
      <section className="px-6 md:px-20 mt-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose DonateFlow?
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We've reimagined charitable giving for the digital age with
            cutting-edge features that ensure every donation counts.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: HeartHandshake,
              title: "Smart Matching",
              description: "AI-powered matching connects you with causes that align with your values and giving history.",
              color: "from-pink-500 to-rose-500"
            },
            {
              icon: ShieldCheck,
              title: "Blockchain Transparency",
              description: "Every transaction is recorded on a public ledger, ensuring complete transparency and trust.",
              color: "from-emerald-500 to-teal-500"
            },
            {
              icon: LayoutDashboard,
              title: "Real-Time Impact Dashboard",
              description: "Watch your donations create change in real-time with interactive impact visualizations.",
              color: "from-blue-500 to-cyan-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="group rounded-3xl border-0 shadow-xl bg-gradient-to-b from-white to-gray-50 hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-6 h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Role-Based CTA Section */}
      <section className="px-6 md:px-20 mt-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Built for Everyone
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you're donating $5 or managing $5 million, our
            platform adapts to your needs.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              role: "Donors",
              description: "Discover vetted causes, track your impact, and join exclusive giving circles.",
              gradient: "from-indigo-500 to-blue-500",
              buttonText: "Start Giving"
            },
            {
              role: "Organizations",
              description: "Access powerful fundraising tools, donor insights, and automated compliance.",
              gradient: "from-emerald-500 to-teal-500",
              buttonText: "Register NGO"
            },
            {
              role: "Partners",
              description: "Corporate matching, employee giving programs, and branded campaigns.",
              gradient: "from-purple-500 to-pink-500",
              buttonText: "Become Partner"
            }
          ].map((role, index) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="relative rounded-3xl border-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden group">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                
                <CardContent className="p-8 relative z-10">
                  <div className={`inline-block p-3 rounded-2xl bg-gradient-to-r ${role.gradient} mb-6`}>
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{role.role}</h3>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {role.description}
                  </p>
                  <Link href="/signup">
                    <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-6 rounded-xl transition-all duration-300 group-hover:scale-105">
                      {role.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
                
                {/* Fixed particle animation - only render on client */}
                {isMounted && (
                  <div className="absolute inset-0 overflow-hidden opacity-20">
                    {particleData.map((particle) => (
                      <motion.div
                        key={particle.key}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        initial={{ y: particle.y, x: particle.x }}
                        animate={{
                          y: particle.yPath,
                          x: particle.xPath,
                        }}
                        transition={{
                          duration: particle.duration,
                          repeat: Infinity,
                          delay: particle.delay,
                          ease: "linear"
                        }}
                        style={{
                          left: `${particle.x}%`,
                          transform: `translateX(${particle.x}px) translateY(${particle.y}px)`
                        }}
                      />
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-32 px-6 md:px-20"
      >
        <div className="max-w-5xl mx-auto rounded-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 md:p-16 text-center text-white relative overflow-hidden">
          {/* Animated orbs - use CSS animations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Giving?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of donors and organizations creating
              meaningful change through transparent, impactful giving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="group bg-white text-indigo-600 hover:bg-gray-100 px-10 py-7 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                  Create Free Account
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button className="group bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-7 rounded-2xl text-lg font-bold transition-all duration-300">
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-white/70 text-sm">
              No credit card required • 14-day free trial • GDPR compliant
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-24 w-full py-8 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <HeartHandshake className="h-8 w-8 text-indigo-600" />
              <h3 className="text-xl font-bold text-gray-800">
                Donate<span className="text-indigo-600">Flow</span>
              </h3>
            </div>
            <div className="flex gap-8">
              {['About', 'Campaigns', 'Contact', 'Privacy'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DonateFlow. Making giving transparent, impactful, and joyful.
          </div>
        </div>
      </motion.footer>
    </main>
  );
}