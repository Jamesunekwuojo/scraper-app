

function Footer() {
  return (
    <footer className=" bg-purple-950 text-purple-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 BookScraper. All rights reserved.</p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <a href="#" className="hover:text-purple-100">
            Terms of Service
          </a>
          <a href="#" className="hover:text-purple-100">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-100">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer