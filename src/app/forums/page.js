import Link from "next/link";
// NOTE: I am using inline SVGs in the component definition below
// instead of lucide-react to prevent potential module errors in environment.

export const metadata = {
  title: "Forums - ChatSphere | Discussion Topics",
  description:
    "Explore discussion forums across sports, entertainment, news, and education on ChatSphere.",
};
// --- Utility Components (Card, Button, etc. omitted for brevity) ---
const Card = ({ children, className }) => (
  <div
    className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 py-2 px-4
                    bg-purple-600 text-white hover:bg-purple-700/90
                    ${className}`}
    {...props}
  >
    {children}
  </button>
);
// --- Inline SVG Icons (omitted for brevity) ---
const DribbbleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path d="M16.8 9.39A7 7 0 0 0 12 5c-2.78 0-4.61 1.03-6 2.52" />
    <path d="M12 12a7 7 0 0 1 5.95 2.57M12 12a7 7 0 0 1-5.95 2.57" />
    <path d="M8.54 18.06A6.97 6.97 0 0 0 12 19c2.78 0 4.61-1.03 6-2.52" />
    <path d="M12 12c-1.39-1.39-4.22-2.52-6-2.52" />
    <path d="M12 12c1.39-1.39 4.22-2.52 6-2.52" />
  </svg>
);
const FilmIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 3v18" />
    <path d="M17 3v18" />
    <path d="M7 12h10" />
    <path d="M7 12h10" />
    <path d="M7 7h10" />
    <path d="M7 17h10" />
  </svg>
);
const NewspaperIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    <path d="M6 14H2" />
    <path d="M10 10H2" />
    <path d="M2 6h4" />
    <path d="M2 18h4" />
  </svg>
);
const BookOpenIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
// --- Slug Generation Utility (MOVED TO TOP) ---
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars
    .replace(/[\s_-]+/g, "-") // Collapse whitespace and dashes to a single dash
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
};

// --- Forum Data ---
const categories = [
  {
    name: "Sports",
    icon: DribbbleIcon,
    color: "bg-indigo-600",
    description: "Discuss global games, scores, teams, and athlete news.",
    topics: [
      { name: "Football (Soccer)", slug: slugify("Football (Soccer)") },
      { name: "Cricket Fan Zone", slug: slugify("Cricket Fan Zone") },
      { name: "NBA & Basketball Talk", slug: slugify("NBA & Basketball Talk") },
      { name: "Formula 1 Racing", slug: slugify("Formula 1 Racing") },
    ],
  },
  {
    name: "Entertainment",
    icon: FilmIcon,
    color: "bg-pink-600",
    description: "Movies, music, TV shows, celebrity gossip, and pop culture.",
    topics: [
      { name: "Latest Blockbusters", slug: slugify("Latest Blockbusters") },
      { name: "Netflix & Streaming", slug: slugify("Netflix & Streaming") },
      {
        name: "Music Releases & Reviews",
        slug: slugify("Music Releases & Reviews"),
      },
      { name: "Video Game Chatter", slug: slugify("Video Game Chatter") },
    ],
  },
  {
    name: "News",
    icon: NewspaperIcon,
    color: "bg-green-600",
    description:
      "Stay updated on world politics, current events, and local happenings.",
    topics: [
      { name: "World Politics", slug: slugify("World Politics") },
      {
        name: "Tech & Science Updates",
        slug: slugify("Tech & Science Updates"),
      },
      { name: "Business & Finance", slug: slugify("Business & Finance") },
      { name: "Local Community", slug: slugify("Local Community") },
    ],
  },
  {
    name: "Education",
    icon: BookOpenIcon,
    color: "bg-yellow-600",
    description: "Share knowledge, homework help, and learning resources.",
    topics: [
      { name: "Programming & Code", slug: slugify("Programming & Code") },
      { name: "Language Learning", slug: slugify("Language Learning") },
      { name: "History & Science", slug: slugify("History & Science") },
      { name: "Career & Study Tips", slug: slugify("Career & Study Tips") },
    ],
  },
];
// --- Component ---

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 pt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          ChatSphere Discussion Forums
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Dive into specific topics. Choose a main category to explore the chat
          options within.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`p-6 rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${category.color} bg-opacity-10 backdrop-blur-md border border-gray-700`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-4">
                <category.icon
                  className={`w-8 h-8 text-white p-1 rounded-full ${category.color}`}
                />
                <h2 className="text-2xl font-bold text-white">
                  {category.name}
                </h2>
              </div>
              <p className="text-gray-400 mb-6 text-sm">
                {category.description}
              </p>

              {/* Sub-Topics List */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Chat Options:
                </h3>
                {category.topics.map((topic) => (
                  // FIX APPLIED HERE: Added 'block' class to make the entire area clickable
                  <Link
                    key={topic.slug}
                    href={`/forums/${topic.slug}`}
                    className=" p-3 bg-gray-800 rounded-lg text-gray-200 hover:bg-purple-700/50 transition duration-200 flex justify-between items-center text-sm"
                  >
                    {topic.name}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 py-10 border-t border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Can&#39;t find your topic?
          </h2>
          <p className="text-gray-400 mb-6">
            Start a new discussion and let the community join in!
          </p>
          {/* Link here should likely go to the creation page */}
          <Link
            href="/forums/new-topic"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition duration-300 transform hover:scale-[1.03]"
          >
            Start New Topic
          </Link>
        </div>
      </div>
    </main>
  );
}

