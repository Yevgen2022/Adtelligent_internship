import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/80 backdrop-blur mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-slate-100 text-xl font-semibold mb-4">
              Your Company
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A brief description of your company or project. Share your values
              and mission with the world.
            </p>

            {/* Social media */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>

              <a
                href="https://twitter.com/your-org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <span className="sr-only">Twitter/X</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/your-org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text-slate-100 text-sm font-semibold mb-4 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-slate-100 text-sm font-semibold mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-slate-400">
                <span className="text-slate-300">Email:</span>
                <br />
                info@example.com
              </p>
              <p className="text-slate-400">
                <span className="text-slate-300">Phone:</span>
                <br />
                +1 (555) 123-4567
              </p>
              <p className="text-slate-400">
                <span className="text-slate-300">Address:</span>
                <br />
                123 Main Street, City, State 12345
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Your Company. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
