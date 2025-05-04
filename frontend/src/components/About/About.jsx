import { Users, BookOpen, LineChart, Code, Palette } from "lucide-react"

function About() {
  return (
    <section id="about" className="py-16 bg-black text-purple-100">
    <div className="container mx-auto px-4">
      <h2 style={{fontSize: "40px", fontWeight: 600}}  className="text-4xl font-bold text-center text-purple-300 mb-8">About BookScraper</h2>
      <p className="text-xl text-purple-200 text-center mb-12 max-w-3xl mx-auto">
        BookScraper is revolutionizing academic research by providing students with easy access to a vast library of
        educational resources. Our mission is to empower learners worldwide by breaking down barriers to knowledge
        acquisition.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="text-center">
          <div className="bg-purple-900 rounded-full p-6 inline-block mb-4">
            <Users className="h-12 w-12 text-purple-300" />
          </div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">For Students</h3>
          <p className="text-purple-200">Easily find and download the books you need for your studies.</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-900 rounded-full p-6 inline-block mb-4">
            <BookOpen className="h-12 w-12 text-purple-300" />
          </div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">Extensive Library</h3>
          <p className="text-purple-200">Access a wide range of academic books across various disciplines.</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-900 rounded-full p-6 inline-block mb-4">
            <LineChart className="h-12 w-12 text-purple-300" />
          </div>
          <h3 className="text-2xl font-semibold text-purple-300 mb-2">Smart Recommendations</h3>
          <p className="text-purple-200">
            Get personalized book suggestions based on your interests and search history.
          </p>
        </div>
      </div>

      <h3 style={{fontSize: "40px", fontWeight: 600}} className="text-3xl font-bold text-center text-purple mb-8">Meet Our Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-purple-900 rounded-lg p-6 text-center">
          <img
            src="/un.png?height=150&width=150"
            alt="Team Member 1"
            className="rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-purple-300 mb-2">Abah James</h4>
          <p className="text-purple-200 mb-4">Full-stack Developer</p>
          <div className="flex justify-center items-center">
            <Code className="h-5 w-5 text-purple-300 mr-2" />
            <span className="text-purple-200">Python, JavaScript, SQL, Bash</span>
          </div>
        </div>
        <div className="bg-purple-900 rounded-lg p-6 text-center">
          <img
            src="/ade.png?height=150&width=150"
            alt="Team Member 2"
            className="rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-purple-300 mb-2">Adeleye Erioluwa</h4>
          <p className="text-purple-200 mb-4">Full-stack Developer</p>
          <div className="flex justify-center items-center">
          <Code className="h-5 w-5 text-purple-300 mr-2" />
            <span className="text-purple-200">python, Javascript, SQL</span>
          </div>
        </div>
        <div className="bg-purple-900 rounded-lg p-6 text-center">
          <img
            src="/es.png?height=150&width=150"
            alt="Team Member 3"
            className="rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-purple-300 mb-2">Esther Mathew</h4>
          <p className="text-purple-200 mb-4">Data Scientist</p>
          <div className="flex justify-center items-center">
            <LineChart className="h-5 w-5 text-purple-300 mr-2" />
            <span className="text-purple-200">Machine Learning, NLP, Python</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default About;
