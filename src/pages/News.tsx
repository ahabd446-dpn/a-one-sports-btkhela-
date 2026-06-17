import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, User, Clock, Search, BookOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

const articles: Article[] = [
  {
    id: "n1",
    title: "CA Sports Launches New 15000 Series Bats for 2026 Season",
    excerpt: "The legendary Pakistan brand CA Sports has unveiled its flagship English Willow series. Here is a breakdown of their profiles, weight range, and sweet spot configurations.",
    content: "CA Sports has officially released its new premium 15000 cricket bat series for the 2026 season. Handcrafted from grade-1 English Willow, these bats feature deep grains (typically 8 to 12) and a massive mid-to-low sweet spot profile. Designed for heavy hitters who dominate off the front foot, the weight distributes beautifully with a light pick-up. We are pleased to announce that a limited stock of these premium bats is now available directly at A One Sports Batkhela. Stop by our store to select your personal piece.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    date: "Jun 16, 2026",
    author: "Zaid Ahmad",
    readTime: "4 min read",
    category: "Gear Review"
  },
  {
    id: "n2",
    title: "Batkhela Premier League Finals Set for Next Sunday",
    excerpt: "The local cricket tournament reaches its climax. The two top teams will face off at the Malakand Cricket Stadium. Read about key players and pitch reports.",
    content: "The annual Batkhela Premier League (BPL) T20 tournament has arrived at its final stage. After an intense round-robin phase, the Batkhela Gladiators will take on the Malakand Strykers this Sunday at the Malakand Cricket Ground. Over 10,000 spectators are expected to attend. The pitch is reported to be a batsman's paradise, promising a high-scoring thriller. A One Sports is proud to be the official equipment partner for the tournament, supplying premium CA leather match balls and player-grade awards.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
    date: "Jun 15, 2026",
    author: "Adnan Khan",
    readTime: "3 min read",
    category: "Local Events"
  },
  {
    id: "n3",
    title: "How to Oil and Knock a New Willow Bat: A Complete Guide",
    excerpt: "Proper preparation is essential to prevent cracking and maximize your bat's performance. Learn the step-by-step procedure from our instore experts.",
    content: "Buying a premium cricket bat is an investment, and proper knocking is critical to make it last. First, apply a light coat of raw linseed oil to the face, edges, and back of the bat (avoiding the splice and labels). Let it dry horizontally for 24 hours. Next, use a hardwood bat mallet to knock the edges, toe, and face of the bat, gradually increasing force over 4-6 hours. Avoid hitting the edges at a 90-degree angle; instead, round them off at 45 degrees. At A One Sports, we offer automatic machine knocking and oiling services. Visit our Batkhela center to learn more.",
    image: "https://images.unsplash.com/photo-1629031673322-81c81ef4f48b?auto=format&fit=crop&q=80&w=800",
    date: "Jun 10, 2026",
    author: "Abdullah (Owner)",
    readTime: "6 min read",
    category: "Pro Tips"
  },
  {
    id: "n4",
    title: "Sialkot Football Manufacturers Elevate International Standards",
    excerpt: "A deep dive into how Pakistani footballs remain the gold standard for global matches and how to choose the right football for turf or cement.",
    content: "Sialkot, Pakistan remains the undisputed world capital of sports ball manufacturing, producing over 70% of match-grade footballs globally. Modern thermal-bonding technology has improved shape retention and water resistance significantly compared to traditional hand-stitched balls. When purchasing, choose thermo-bonded PU balls for turf fields and rubberized hand-stitched balls for rough cement or street play. Check our 'Armory' category for high-quality Sialkot footballs at reasonable prices.",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800",
    date: "Jun 04, 2026",
    author: "Zaid Ahmad",
    readTime: "5 min read",
    category: "Industry News"
  }
];

export function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sports News & Articles | A One Sports Batkhela</title>
      </Helmet>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-black uppercase text-white tracking-tighter">
            SPORTS NEWS & <span className="text-primary italic">UPDATES</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 text-sm">
            Stay updated with local events, gear releases, and professional advice.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl py-3 pl-10 pr-4 text-sm focus:border-primary outline-none transition-colors text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((art) => (
          <div 
            key={art.id}
            className="bg-[#111] border border-[#1f1f1f] rounded-3xl overflow-hidden hover:border-[#a3e635]/40 transition-colors flex flex-col group"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={art.image} 
                alt={art.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-primary text-black text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg">
                {art.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex gap-4 text-gray-500 text-[10px] uppercase font-bold tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-white line-clamp-2">
                  {art.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <button 
                onClick={() => setSelectedArticle(art)}
                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] group-hover:text-white transition-colors"
              >
                Read Full Article <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-20 bg-[#111] border border-[#1f1f1f] rounded-3xl">
          <BookOpen className="w-16 h-16 text-white/5 mx-auto mb-4" />
          <h3 className="text-xl font-display font-black uppercase text-white mb-1">No articles found</h3>
          <p className="text-gray-500 text-xs font-medium">Try checking with a different search keyword.</p>
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111] border border-[#1f1f1f] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative p-6 sm:p-10 shadow-2xl custom-scrollbar"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <span className="bg-primary/10 text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg inline-block">
                  {selectedArticle.category}
                </span>

                <h2 className="text-2xl sm:text-3xl font-display font-black uppercase text-white leading-tight">
                  {selectedArticle.title}
                </h2>

                <div className="flex flex-wrap gap-4 text-gray-500 text-[10px] uppercase font-bold tracking-wider border-b border-[#1f1f1f] pb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedArticle.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> By {selectedArticle.author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}</span>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden border border-[#1f1f1f]">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
