import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const placeholderContent = [
  {
    type: "Motivation",
    title: "Your Past Doesn't Define Your Future",
    caption: "Every successful person you admire once stood exactly where you are today — confused, scared, and unsure. The difference? They took one small step forward anyway.\n\nHere's what I want you to remember today:\n\n🔥 Your failures are not your identity\n📈 Growth happens outside your comfort zone\n💡 The best time to start was yesterday. The second best time is NOW.\n\nStop waiting for the perfect moment. Start with what you have, where you are. Progress beats perfection every single time.\n\nTag someone who needs this today. 👇",
    hashtags: "#CareerGrowth #Motivation #FreshersLife #ITCareers #PersonalGrowth",
    date: "Today",
  },
  {
    type: "IT Career Tips",
    title: "5 Skills Every Fresher Should Learn in 2025",
    caption: "The IT industry is evolving faster than ever. If you're a fresher, here are 5 skills that will make you stand out:\n\n1️⃣ Cloud Computing (AWS/Azure basics)\n2️⃣ Data Analytics & SQL\n3️⃣ AI/ML fundamentals\n4️⃣ Communication & presentation\n5️⃣ Problem-solving mindset\n\nNotice something? It's not just about coding anymore. Companies want T-shaped professionals who can code AND communicate.\n\nWhich skill are you focusing on? Drop it in the comments! 💬",
    hashtags: "#ITJobs #FresherJobs #TechCareers #SkillDevelopment #2025Goals",
    date: "Yesterday",
  },
  {
    type: "Study Strategies",
    title: "The 80/20 Rule for Exam Preparation",
    caption: "Stop studying everything. Start studying the RIGHT things.\n\nThe Pareto Principle says 80% of your results come from 20% of your efforts. Apply this to your studies:\n\n📚 Identify high-weightage topics first\n🎯 Focus on understanding, not memorizing\n⏰ Use active recall instead of re-reading\n🧠 Teach what you learn to someone else\n\nStudying smart > studying hard. Period.\n\nSave this for your next exam prep session! 📌",
    hashtags: "#StudyTips #ExamPrep #StudentLife #SmartStudy #AcademicSuccess",
    date: "2 days ago",
  },
];

const DailyMotivation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Daily Content</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Daily <span className="gradient-text">Motivation</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Fresh AI-generated career tips, motivation, and study strategies — every single day.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {["All", "Motivation", "IT Career Tips", "Study Strategies", "Job Search"].map((cat) => (
            <Badge
              key={cat}
              variant={cat === "All" ? "default" : "secondary"}
              className="cursor-pointer px-4 py-1.5 text-sm"
            >
              {cat}
            </Badge>
          ))}
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {placeholderContent.map((item, i) => (
            <Card key={i} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{item.type}</Badge>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed mb-4">
                  {item.caption}
                </p>
                <p className="text-xs text-primary font-medium">{item.hashtags}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DailyMotivation;
