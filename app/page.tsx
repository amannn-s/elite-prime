"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Award, Clock, Gavel, Search, Shield } from "lucide-react";
import React, { useEffect } from "react";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
    </main>
  );
};

export default HomePage;

function HeroSection() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <section>
      <div className="min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-display font-bold text-primary">
                  ElitePrime
                </h1>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  Properties
                </a>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  Auctions
                </a>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  How It Works
                </a>
                <a
                  href="#"
                  className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
                >
                  About
                </a>
              </nav>
              <div className="flex items-center space-x-4">
                <Button variant="outline">Sign In</Button>
                <Button>Get Started</Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative luxury-gradient text-white">
          <div className="absolute inset-0 bg-black/90"></div>
          <div
            className="absolute inset-0 opacity-20 bg-fixed"
            style={{
              backgroundImage: `url(/images/sean-pollock-unsplash.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
            <div className="md:text-center ">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Your Premier Commercial
                <span className="block bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                  Real Estate Partner
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover ultra-luxury properties through our exclusive auction
                platform. From hospitals to premium developments, find
                extraordinary investment opportunities.
              </p>

              {/* Search Bar */}
              <Card className="max-w-4xl bg-neutral-100 mx-auto border-neutral-700 shadow-2xl">
                <CardContent className="p-2">
                  <div className="flex flex-col md:flex-row gap-2">
                    <Select>
                      <SelectTrigger className="flex-1 border-0 focus:ring-0">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="office">Office Building</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="apartment">
                          Apartment Complex
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Location"
                      className="flex-1 border-0 ring-0 focus:ring-0 focus:border-0"
                    />
                    <Select>
                      <SelectTrigger className="flex-1 border-0 focus:ring-0">
                        <SelectValue
                          placeholder="Price Range"
                          className="text-white"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">$1M - $5M</SelectItem>
                        <SelectItem value="5-10">$5M - $10M</SelectItem>
                        <SelectItem value="10+">$10M+</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="px-8">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="-translate-y-1/2 px-4">
          <div className="shadow-md border-2 border-neutral-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-lg rounded-2xl py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-primary mb-2">
                  $2.4B+
                </div>
                <div className="text-neutral-700 font-medium">
                  Total Value Transacted
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-primary mb-2">
                  850+
                </div>
                <div className="text-neutral-700 font-medium">
                  Properties Sold
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-primary mb-2">
                  95%
                </div>
                <div className="text-neutral-700 font-medium">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-display font-bold text-primary mb-2">
                  24/7
                </div>
                <div className="text-neutral-700 font-medium">
                  Expert Support
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Auctions */}
        <section id="auctions" className="bg-white pt-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-primary mb-4">
                Featured Auctions
              </h2>
              <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
                Exclusive opportunities to acquire premium properties through
                our verified auction platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-0 shadow-none transition-all duration-300 transform hover:-translate-y-1 rounded-none">
                <div
                  className="h-60 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')`,
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium auction-live">
                      <Clock className="w-3 h-3 inline mr-1" />
                      LIVE AUCTION
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      Office Building
                    </span>
                  </div>
                </div>

                <CardContent className="py-2 px-0">
                  <h3 className="text-xl font-display font-semibold text-primary mb-0">
                    Premium Corporate Tower
                  </h3>
                  <p className="text-neutral-700 mb-2">
                    Downtown Financial District
                  </p>

                  <div className="flex justify-between border-t items-center mb-4 mt-2">
                    <div>
                      <div className="text-neutral-700">Current Bid</div>
                      <div className="text-2xl font-bold text-neutral-500">
                        $12.5M
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-neutral-700">Starting Price</div>
                      <div className="text-lg text-neutral-700">$10M</div>
                    </div>
                  </div>

                  <Card className="bg-neutral-100 rounded-none border-0 border-t shadow-none">
                    <CardContent className="p-2 text-center">
                      <div className="text-red-600 font-medium mb-1">
                        Auction Ends In
                      </div>
                      <div className="text-2xl font-bold text-black font-mono">
                        02:15:30
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full rounded-none">
                    <Gavel className="w-4 h-4 mr-2" />
                    Join Auction
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-none transition-all duration-300 transform hover:-translate-y-1 rounded-none">
                <div
                  className="h-60 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')`,
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium auction-live">
                      <Clock className="w-3 h-3 inline mr-1" />
                      LIVE AUCTION
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      Hospital
                    </span>
                  </div>
                </div>

                <CardContent className="py-2 px-0">
                  <h3 className="text-xl font-display font-semibold text-primary mb-0">
                    Metropolitan Medical Center
                  </h3>
                  <p className="text-neutral-700 mb-2">Healthcare District</p>

                  <div className="flex justify-between border-t items-center mb-4 mt-2">
                    <div>
                      <div className="text-neutral-700 ">Current Bid</div>
                      <div className="text-2xl font-bold text-neutral-500">
                        $25.8M
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-neutral-700 ">Starting Price</div>
                      <div className="text-lg text-neutral-700">$20M</div>
                    </div>
                  </div>

                  <Card className="bg-neutral-100 rounded-none border-0 border-t shadow-none">
                    <CardContent className="p-2 text-center">
                      <div className="text-red-600 font-medium mb-1">
                        Auction Ends In
                      </div>
                      <div className="text-2xl font-bold text-black font-mono">
                        05:42:15
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full rounded-none">
                    <Gavel className="w-4 h-4 mr-2" />
                    Join Auction
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-none transition-all duration-300 transform hover:-translate-y-1 rounded-none">
                <div
                  className="h-60 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600')`,
                  }}
                >
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      STARTING SOON
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      Educational
                    </span>
                  </div>
                </div>

                <CardContent className="py-2 px-0">
                  <h3 className="text-xl font-display font-semibold text-primary mb-0">
                    Elite Academic Campus
                  </h3>
                  <p className="text-neutral-700 mb-2">University District</p>

                  <div className="flex justify-between border-t items-center mb-4 mt-2">
                    <div>
                      <div className="text-neutral-700 ">Starting Price</div>
                      <div className="text-2xl font-bold text-neutral-500">
                        $18M
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-neutral-700">Est. Value</div>
                      <div className="text-lg text-neutral-700">$25M</div>
                    </div>
                  </div>

                  <Card className="bg-neutral-100 rounded-none border-0 border-t shadow-none">
                    <CardContent className="p-2 text-center">
                      <div className="text-orange-600 font-medium mb-1">
                        Auction Starts In
                      </div>
                      <div className="text-2xl font-bold text-black font-mono">
                        26 Days 14:30:25
                      </div>
                    </CardContent>
                  </Card>

                  <Button variant="destructive" className="w-full rounded-none">
                    <Clock className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-neutral-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                A seamless process designed for luxury real estate transactions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 shadow-md">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-purple-50" />
                </div>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  Verification
                </h3>
                <p className="text-neutral-700">
                  Complete KYC verification and document submission for secure,
                  trusted transactions.
                </p>
              </Card>

              <Card className="text-center p-8 shadow-md">
                <div className="w-16 h-16 bg-primary/10 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gavel className="w-8 h-8 text-yellow-50" />
                </div>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  Participate
                </h3>
                <p className="text-neutral-700 ">
                  Pay participation fee and join live auctions for premium
                  properties with real-time bidding.
                </p>
              </Card>

              <Card className="text-center p-8 shadow-md">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-50" />
                </div>
                <h3 className="text-xl font-display font-semibold text-primary mb-4">
                  Acquire
                </h3>
                <p className="text-neutral-700 ">
                  Win premium properties through competitive bidding with direct
                  seller transactions.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-display font-bold mb-4">
                  ElitePrime
                </h3>
                <p className="text-neutral-700 mb-4">
                  Premium real estate auction platform for ultra-luxury
                  properties.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Properties</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Hospitals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Office Buildings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Schools
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Apartments
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Seller Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Buyer Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      KYC Verification
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Legal Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-secondary transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t  mt-12 pt-8 text-center ">
              <p>
                &copy; 2024 LuxuryAuctions. All rights reserved. Licensed real
                estate auction platform.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
