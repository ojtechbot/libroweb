

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  summary: string;
  coverUrl: string;
  isNew?: boolean;
  'data-ai-hint'?: string;
};

// This static data is now a fallback or for initial seeding.
// The primary source of truth will be Firestore.
export const staticBooks: Book[] = [
  {
    id: "1",
    title: "The Digital Fortress",
    author: "Dan Brown",
    category: "Literature",
    summary: "A gripping thriller at the intersection of technology and national security.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "book cover",
    isNew: true,
  },
  {
    id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    summary: "From the big bang to black holes, a journey through the universe.",
    coverUrl: "https://covers.openlibrary.org/b/id/8843501-L.jpg",
    'data-ai-hint': "science book",
    isNew: true,
  },
  {
    id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Engineering",
    summary: "A handbook of agile software craftsmanship.",
    coverUrl: "https://covers.openlibrary.org/b/id/8523386-L.jpg",
    'data-ai-hint': "tech book",
    isNew: true,
  },
  {
    id: "4",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History",
    summary: "A fascinating account of human history and its impact on the world.",
    coverUrl: "https://covers.openlibrary.org/b/id/8595113-L.jpg",
    'data-ai-hint': "history book",
    isNew: true,
  },
  {
    id: "5",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    category: "Engineering",
    summary: "Your journey to mastery, from journeyman to master.",
    coverUrl: "https://covers.openlibrary.org/b/id/8505831-L.jpg",
    'data-ai-hint': "programming book",
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Literature",
    summary: "A classic of modern American literature, exploring injustice and morality.",
    coverUrl: "https://covers.openlibrary.org/b/id/8309456-L.jpg",
    'data-ai-hint': "classic novel",
  },
  {
    id: "7",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    summary: "An exploration of the cosmos and our place within it.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "astronomy book",
  },
  {
    id: "8",
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    summary: "The fates of human societies, explaining why some civilizations thrive while others do not.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "anthropology book",
  },
  {
    id: "9",
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi",
    summary: "A landmark science fiction novel about politics, religion, and ecology on a desert planet.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "sci-fi desert"
  },
  {
    id: "10",
    title: "1984",
    author: "George Orwell",
    category: "Literature",
    summary: "A dystopian novel set in a totalitarian society under constant surveillance.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "dystopian novel"
  },
  {
    id: "11",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    summary: "The enchanting prequel to The Lord of the Rings, following Bilbo Baggins on an unexpected journey.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "fantasy adventure"
  },
  {
    id: "12",
    title: "Foundation",
    author: "Isaac Asimov",
    category: "Sci-Fi",
    summary: "A galactic empire falls, and a new civilization rises, guided by a new science: psychohistory.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "galaxy empire"
  },
  {
    id: "13",
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Literature",
    summary: "A dystopian novel exploring a future world of genetic engineering and social conditioning.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "dystopian future"
  },
  {
    id: "14",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Literature",
    summary: "A story about teenage angst and alienation.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "teenage novel"
  },
  {
    id: "15",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    summary: "A groundbreaking work on evolutionary biology.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "evolution biology"
  },
  {
    id: "16",
    title: "The Structure of Scientific Revolutions",
    author: "Thomas S. Kuhn",
    category: "Science",
    summary: "An analysis of the history of science and the concept of paradigm shifts.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "science history"
  },
  {
    id: "17",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    summary: "An exploration of the two systems that drive the way we think.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "psychology thinking"
  },
  {
    id: "18",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Engineering",
    summary: "A book about how design serves as the communication between object and user.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "design engineering"
  },
  {
    id: "19",
    title: "A People's History of the United States",
    author: "Howard Zinn",
    category: "History",
    summary: "A historical account from the perspective of everyday people.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "history people"
  },
  {
    id: "20",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    summary: "An epic high-fantasy novel.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "epic fantasy"
  },
  {
    id: "21",
    title: "Neuromancer",
    author: "William Gibson",
    category: "Sci-Fi",
    summary: "A seminal work of the cyberpunk genre.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "cyberpunk novel"
  },
  {
    id: "22",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    category: "Sci-Fi",
    summary: "A comedic science fiction series.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "sci-fi comedy"
  },
  {
    id: "23",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    category: "Literature",
    summary: "A dystopian novel about a future where books are outlawed.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "dystopian books"
  },
  {
    id: "24",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Literature",
    summary: "A classic romance novel.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "romance classic"
  },
  {
    id: "25",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Literature",
    summary: "A novel about the American dream.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "american dream"
  },
  {
    id: "26",
    title: "Moby Dick",
    author: "Herman Melville",
    category: "Literature",
    summary: "The saga of Captain Ahab and his obsession with the great white whale.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "whale adventure"
  },
  {
    id: "27",
    title: "War and Peace",
    author: "Leo Tolstoy",
    category: "History",
    summary: "An epic novel that intertwines the lives of private and public individuals during the time of the Napoleonic wars.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "historical war"
  },
  {
    id: "28",
    title: "The Art of War",
    author: "Sun Tzu",
    category: "History",
    summary: "An ancient Chinese military treatise.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "military strategy"
  },
  {
    id: "29",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    category: "Engineering",
    summary: "A common sense approach to web usability.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "web usability"
  },
  {
    id: "30",
    title: "Gödel, Escher, Bach: an Eternal Golden Braid",
    author: "Douglas Hofstadter",
    category: "Science",
    summary: "A metaphorical fugue on minds and machines in the spirit of Lewis Carroll.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "minds machines"
  },
  {
    id: "31",
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    category: "Engineering",
    summary: "Essays on software engineering.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "software engineering"
  },
  {
    id: "32",
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    category: "Fantasy",
    summary: "The first book in A Song of Ice and Fire, a series of epic fantasy novels.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "fantasy thrones"
  },
  {
    id: "33",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    category: "Fantasy",
    summary: "The first book in The Kingkiller Chronicle series.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "fantasy magic"
  },
  {
    id: "34",
    title: "Ender's Game",
    author: "Orson Scott Card",
    category: "Sci-Fi",
    summary: "A young boy is trained to become a military leader in a war against an alien race.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "sci-fi war"
  },
  {
    id: "35",
    title: "The Martian",
    author: "Andy Weir",
    category: "Sci-Fi",
    summary: "An astronaut's struggle to survive on Mars.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "mars survival"
  },
  {
    id: "36",
    title: "The Phoenix Project",
    author: "Gene Kim, Kevin Behr, George Spafford",
    category: "Engineering",
    summary: "A novel about IT, DevOps, and helping your business win.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "devops novel"
  },
  {
    id: "37",
    title: "Code: The Hidden Language of Computer Hardware and Software",
    author: "Charles Petzold",
    category: "Engineering",
    summary: "What do flashlights, the British invasion, black cats, and seesaws have to do with computers?",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "computer code"
  },
  {
    id: "38",
    title: "Surely You're Joking, Mr. Feynman!",
    author: "Richard P. Feynman",
    category: "Biography",
    summary: "Adventures of a curious character.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "feynman biography"
  },
  {
    id: "39",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "Biography",
    summary: "The writings from the Dutch-language diary kept by Anne Frank while she was in hiding for two years with her family during the Nazi occupation of the Netherlands.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "anne frank"
  },
  {
    id: "40",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    summary: "A biography of the co-founder of Apple Inc.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "steve jobs"
  },
  {
    id: "41",
    title: "Into the Wild",
    author: "Jon Krakauer",
    category: "Biography",
    summary: "The story of Christopher McCandless, a young man who hiked into the Alaskan wilderness.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "alaska adventure"
  },
  {
    id: "42",
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    category: "Science",
    summary: "A story about medical ethics and the history of the HeLa cell line.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "medical ethics"
  },
  {
    id: "43",
    title: "Freakonomics",
    author: "Steven D. Levitt, Stephen J. Dubner",
    category: "Economics",
    summary: "A rogue economist explores the hidden side of everything.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "economics novel"
  },
  {
    id: "44",
    title: "The Tipping Point",
    author: "Malcolm Gladwell",
    category: "Psychology",
    summary: "How little things can make a big difference.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "psychology ideas"
  },
  {
    id: "45",
    title: "Quiet: The Power of Introverts in a World That Can't Stop Talking",
    author: "Susan Cain",
    category: "Psychology",
    summary: "A book about the power of introverts.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "introvert psychology"
  },
  {
    id: "46",
    title: "The Man Who Mistook His Wife for a Hat and Other Clinical Tales",
    author: "Oliver Sacks",
    category: "Psychology",
    summary: "Case studies of patients with neurological disorders.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "neurology tales"
  },
  {
    id: "47",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Self-Help",
    summary: "A classic self-help book on interpersonal skills.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "self-help classic"
  },
  {
    id: "48",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    category: "Self-Help",
    summary: "Powerful lessons in personal change.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "self-help habits"
  },
  {
    id: "49",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Help",
    summary: "An easy & proven way to build good habits & break bad ones.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "habits productivity"
  },
  {
    id: "50",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    category: "Self-Help",
    summary: "Why we do what we do in life and business.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "habits business"
  },
  {
    id: "51",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self-Help",
    summary: "A counterintuitive approach to living a good life.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "counterintuitive self-help"
  },
  {
    id: "52",
    title: "Educated",
    author: "Tara Westover",
    category: "Biography",
    summary: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "memoir education"
  },
  {
    id: "53",
    title: "Bad Blood: Secrets and Lies in a Silicon Valley Startup",
    author: "John Carreyrou",
    category: "History",
    summary: "The story of the rise and fall of Theranos.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "theranos story"
  },
  {
    id: "54",
    title: "The Wright Brothers",
    author: "David McCullough",
    category: "Biography",
    summary: "The story of the two brothers who taught the world how to fly.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "wright brothers"
  },
  {
    id: "55",
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    summary: "How today's entrepreneurs use continuous innovation to create radically successful businesses.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "startup business"
  },
  {
    id: "56",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    summary: "Notes on startups, or how to build the future.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "build future"
  },
  {
    id: "57",
    title: "Rework",
    author: "Jason Fried & David Heinemeier Hansson",
    category: "Business",
    summary: "A different kind of business book that explores a new reality.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "business rework"
  },
  {
    id: "58",
    title: "Good to Great",
    author: "Jim Collins",
    category: "Business",
    summary: "Why some companies make the leap... and others don't.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "business companies"
  },
  {
    id: "59",
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    category: "Business",
    summary: "When new technologies cause great firms to fail.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "business innovation"
  },
  {
    id: "60",
    title: "The Soul of A New Machine",
    author: "Tracy Kidder",
    category: "Engineering",
    summary: "The story of the creation of a new computer.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "computer creation"
  },
  {
    id: "61",
    title: "The Clean Coder",
    author: "Robert C. Martin",
    category: "Engineering",
    summary: "A code of conduct for professional programmers.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "professional programmer"
  },
  {
    id: "62",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Engineering",
    summary: "The big ideas behind reliable, scalable, and maintainable systems.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "data systems"
  },
  {
    id: "63",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    category: "Engineering",
    summary: "The 'bible' of algorithms.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "algorithms textbook"
  },
  {
    id: "64",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    category: "Engineering",
    summary: "Programming questions and solutions.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "coding interview"
  },
  {
    id: "65",
    title: "The Principles of Quantum Mechanics",
    author: "Paul A.M. Dirac",
    category: "Science",
    summary: "A classic text on quantum mechanics.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "quantum mechanics"
  },
  {
    id: "66",
    title: "On the Origin of Species",
    author: "Charles Darwin",
    category: "Science",
    summary: "The foundation of evolutionary biology.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "evolution darwin"
  },
  {
    id: "67",
    title: "Relativity: The Special and the General Theory",
    author: "Albert Einstein",
    category: "Science",
    summary: "Einstein's own explanation of his groundbreaking theories.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "einstein relativity"
  },
  {
    id: "68",
    title: "The Elegant Universe",
    author: "Brian Greene",
    category: "Science",
    summary: "Superstrings, hidden dimensions, and the quest for the ultimate theory.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "string theory"
  },
  {
    id: "69",
    title: "A Short History of Nearly Everything",
    author: "Bill Bryson",
    category: "Science",
    summary: "A journey through the history of science.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "science history"
  },
  {
    id: "70",
    title: "The Emperor of All Maladies: A Biography of Cancer",
    author: "Siddhartha Mukherjee",
    category: "Science",
    summary: "A 'biography' of cancer.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "cancer biography"
  },
  {
    id: "71",
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    category: "Science",
    summary: "A history of the gene and genetic research.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "gene history"
  },
  {
    id: "72",
    title: "SPQR: A History of Ancient Rome",
    author: "Mary Beard",
    category: "History",
    summary: "A comprehensive history of ancient Rome.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "ancient rome"
  },
  {
    id: "73",
    title: "Rubicon: The Last Years of the Roman Republic",
    author: "Tom Holland",
    category: "History",
    summary: "The story of the fall of the Roman Republic.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "roman republic"
  },
  {
    id: "74",
    title: "The Guns of August",
    author: "Barbara W. Tuchman",
    category: "History",
    summary: "An account of the first month of World War I.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "world war"
  },
  {
    id: "75",
    title: "Endurance: Shackleton's Incredible Voyage",
    author: "Alfred Lansing",
    category: "History",
    summary: "The story of Ernest Shackleton's Antarctic expedition.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "antarctic expedition"
  },
  {
    id: "76",
    title: "The Master and Margarita",
    author: "Mikhail Bulgakov",
    category: "Literature",
    summary: "A satirical novel about a visit by the devil to the officially atheistic Soviet Union.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "satirical novel"
  },
  {
    id: "77",
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    category: "Literature",
    summary: "A multi-generational story of the Buendía family.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "family saga"
  },
  {
    id: "78",
    title: "The Stranger",
    author: "Albert Camus",
    category: "Literature",
    summary: "A novel that explores themes of absurdism and existentialism.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "existential novel"
  },
  {
    id: "79",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    category: "Literature",
    summary: "A psychological novel about the moral dilemmas of a young student.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "psychological novel"
  },
  {
    id: "80",
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    category: "Sci-Fi",
    summary: "A dystopian novel set in a patriarchal, totalitarian society.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "dystopian society"
  },
  {
    id: "81",
    title: "Mistborn: The Final Empire",
    author: "Brandon Sanderson",
    category: "Fantasy",
    summary: "A fantasy novel set in a world where ash falls from the sky and mists rule the night.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "fantasy empire"
  },
  {
    id: "82",
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    category: "Fantasy",
    summary: "The first book in The Stormlight Archive series.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "epic fantasy"
  },
  {
    id: "83",
    title: "The Blade Itself",
    author: "Joe Abercrombie",
    category: "Fantasy",
    summary: "The first book in The First Law trilogy, a dark fantasy series.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "dark fantasy"
  },
  {
    id: "84",
    title: "Hyperion",
    author: "Dan Simmons",
    category: "Sci-Fi",
    summary: "A science fiction novel with a structure inspired by The Canterbury Tales.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "sci-fi pilgrimage"
  },
  {
    id: "85",
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    category: "Sci-Fi",
    summary: "A science fiction novel exploring themes of gender and society.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "gender society"
  },
  {
    id: "86",
    title: "Snow Crash",
    author: "Neal Stephenson",
    category: "Sci-Fi",
    summary: "A cyberpunk novel that explores themes of language, viruses, and virtual reality.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "cyberpunk virtual"
  },
  {
    id: "87",
    title: "Ready Player One",
    author: "Ernest Cline",
    category: "Sci-Fi",
    summary: "A science fiction novel set in a dystopian future where people escape reality by entering a virtual reality world called the OASIS.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "virtual reality"
  },
  {
    id: "88",
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    category: "Sci-Fi",
    summary: "A science fiction novel about humanity's last hope for survival on a terraformed planet.",
    coverUrl: "https://covers.openlibrary.org/b/id/8317231-L.jpg",
    'data-ai-hint': "space evolution"
  }
];


export async function getBooks(): Promise<Book[]> {
  // Directly return the static book data.
  return Promise.resolve(staticBooks);
}

    