import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  ShieldCheck,
  TwitterIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-indigo-800 via-blue-900 to-indigo-950 text-white px-6 pt-14 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-7 h-7 text-indigo-400 drop-shadow" />
            <h2 className="text-2xl font-bold tracking-tight">SecureFlow</h2>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            We simplify authentication with secure and seamless experiences.
            Build trust with every login.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/90 text-sm">
            <li><a href="/login" className="hover:text-indigo-400 transition">Login</a></li>
            <li><a href="/register" className="hover:text-indigo-400 transition">Register</a></li>
            <li><a href="/reset-password" className="hover:text-indigo-400 transition">Reset Password</a></li>
            <li><a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">Contact</h3>
          <div className="space-y-3 text-sm text-white/90">
            <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> support@secureflow.app</p>
            <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +91-9876543210</p>
          </div>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white hover:text-indigo-400 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-indigo-400 transition">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-indigo-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider & Bottom */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} SecureFlow. All rights reserved. | Founder: <span className="text-indigo-300">Himanshu</span>
      </div>
    </footer>
  );
}
