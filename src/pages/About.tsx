import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedPage } from "@/components/ui/animated-page";
import { Car, Users, Search, Star, Shield, Zap } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Find your perfect car with our intelligent search and filtering system",
    },
    {
      icon: Car,
      title: "Comprehensive Database",
      description:
        "Access detailed information on thousands of car models and variants",
    },
    {
      icon: Star,
      title: "Expert Reviews",
      description:
        "Read authentic reviews and ratings from automotive experts and users",
    },
    {
      icon: Shield,
      title: "Trusted Information",
      description:
        "All car data is verified and updated regularly for accuracy",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Join a community of car enthusiasts sharing experiences and insights",
    },
    {
      icon: Zap,
      title: "AI-Powered Recommendations",
      description:
        "Get personalized car suggestions based on your preferences and budget",
    },
  ];

  const stats = [
    { label: "Cars Given", value: "500+" },
    { label: "Happy Users", value: "50K+" },
    { label: "Expert Reviews", value: "1000+" },
    { label: "Daily Searches", value: "10K+" },
  ];

  return (
    <AnimatedPage animation="automotive">
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                About AutoAssist
              </Badge>
              <h1 className="text-5xl font-bold mb-6 bg-automotive-gradient bg-clip-text text-transparent">
                Your Ultimate Car Information Hub
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                AutoAssistis your premier destination for comprehensive car
                information, expert reviews, and intelligent recommendations.
                We're passionate about helping you make informed decisions when
                it comes to choosing your perfect vehicle.
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-card/30 rounded-lg border border-border/50"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe that choosing the right car should be an informed and
                enjoyable experience. Our mission is to provide you with the
                most comprehensive, accurate, and up-to-date information about
                cars, helping you make decisions that perfectly match your
                needs, preferences, and budget.
              </p>

              <div className="bg-card/30 rounded-lg p-8 border border-border/50">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  What Makes Us Different
                </h3>
                <p className="text-muted-foreground">
                  Unlike other car platforms, AutoAssistcombines cutting-edge AI
                  technology with expert automotive knowledge to deliver
                  personalized recommendations. Our platform learns from your
                  preferences and provides intelligent suggestions that evolve
                  with your needs.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose AutoAssist?
              </h2>
              <p className="text-muted-foreground text-lg">
                Discover the features that make us the preferred choice for car
                enthusiasts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group hover:border-primary/50 transition-all duration-300 bg-card/30"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Built by Car Enthusiasts
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our team combines decades of automotive industry experience with
                cutting-edge technology expertise to bring you the most
                comprehensive car platform.
              </p>
            </div>

            <div className="bg-card/30 rounded-lg p-8 border border-border/50 text-center">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Our Commitment
              </h3>
              <p className="text-muted-foreground mb-6">
                We're committed to maintaining the highest standards of data
                accuracy, user privacy, and platform security. Your trust is our
                most valuable asset.
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">ISO Certified</Badge>
                <Badge variant="secondary">Privacy Protected</Badge>
                <Badge variant="secondary">Regularly Updated</Badge>
                <Badge variant="secondary">Expert Verified</Badge>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <div className="max-w-2xl mx-auto bg-automotive-gradient p-8 rounded-lg text-primary-foreground">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Find Your Perfect Car?
              </h2>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of satisfied users who have found their dream
                cars with AutoAssist
              </p>
              <div className="space-x-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  Get Started Today
                </Badge>
              </div>
            </div>
          </section>
        </main>
      </div>
    </AnimatedPage>
  );
}
