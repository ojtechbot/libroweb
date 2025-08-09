
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookCopy, Lightbulb, Users, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const features = [
  {
    icon: <BookCopy className="h-8 w-8 text-primary" />,
    title: "Vast Collection",
    description: "Access thousands of e-books, articles, and documents across a wide range of categories.",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "AI-Powered Recommendations",
    description: "Our smart recommendation engine helps you discover books tailored to your interests.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Community Focused",
    description: "Join a community of readers, share your thoughts, and connect with fellow book lovers.",
  },
];


const teamMembers = [
  {
    name: "Dr. Evelyn Reed",
    role: "Head Librarian & Founder",
    avatar: "https://placehold.co/100x100/e6eaf0/4681c4",
    'data-ai-hint': "woman face"
  },
  {
    name: "Marcus Chen",
    role: "Lead Software Engineer",
    avatar: "https://placehold.co/100x100/e6eaf0/4681c4",
    'data-ai-hint': "man face"
  },
  {
    name: "Alina Petrova",
    role: "UX/UI Designer",
    avatar: "https://placehold.co/100x100/e6eaf0/4681c4",
    'data-ai-hint': "woman face smiling"
  },
];


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-6 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
          Revolutionizing Access to Knowledge
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          LibroWeb is more than just a library; it's a vibrant community dedicated to learning, sharing, and growing together.
        </p>
      </section>


      {/* Our Mission Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://placehold.co/600x400"
                alt="A modern library with people reading"
                layout="fill"
                objectFit="cover"
                data-ai-hint="modern library"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Our Mission</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our mission is to foster a universal love for reading by making knowledge accessible to everyone, everywhere. We believe in the power of stories and information to transform lives and build better futures.
                </p>
                <p>
                  LibroWeb is committed to breaking down barriers to education and providing a platform that is inclusive, user-friendly, and rich with diverse resources for students, researchers, and lifelong learners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose LibroWeb?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
                We've built a platform with powerful features to enhance your reading experience.
            </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 border-2 border-transparent hover:border-primary hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
               <div className="mb-4 inline-block p-4 rounded-full bg-primary/10">
                  {feature.icon}
               </div>
              <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>


      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Meet Our Team</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            The passionate individuals dedicated to bringing you the best library experience.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <CardHeader className="p-0">
                    <div className="w-full aspect-square relative">
                        <Image
                            src={member.avatar}
                            alt={`Portrait of ${member.name}`}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={member['data-ai-hint']}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-headline font-semibold">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Map Section */}
      <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">Come Visit Us</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>While our digital doors are always open, we also have a physical space for study, collaboration, and community events.</p>
              <div className="flex items-center gap-4 pt-4">
                <MapPin className="h-8 w-8 text-primary" />
                <div>
                    <p className="font-semibold text-foreground">123 Library Lane, Knowledge City, 12345</p>
                    <p className="text-sm">Open Monday - Friday, 9am - 8pm</p>
                </div>
              </div>
            </div>
          </div>
           <div className="relative h-96 rounded-lg overflow-hidden shadow-xl border">
              <Image
                src="https://placehold.co/600x400/e6eaf0/4681c4"
                alt="A map showing the location of LibroWeb"
                layout="fill"
                objectFit="cover"
                data-ai-hint="city map"
              />
            </div>
        </div>
      </section>
    </div>
  );
}

