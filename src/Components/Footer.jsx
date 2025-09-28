
import { Mail, Phone, Github, Linkedin, ShoppingBag } from "lucide-react";

const Footer = () => {
    return (
        <footer
            className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white shadow-2xl "
        >
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <section className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingBag className="h-8 w-8 text-blue-300" />
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                True Buy
                            </h2>
                        </div>
                        <p className="text-blue-100 leading-relaxed text-sm">
                            We believe shopping should be simple, affordable, and reliable.
                            Quality products at fair prices with fast delivery and secure checkout—making every purchase truly worth it.
                        </p>
                    </section>

                    {/* Quick Links */}
                    <section aria-labelledby="quick-links-heading">
                        <h3
                            id="quick-links-heading"
                            className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide"
                        >
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {['Home', 'Products', 'Categories', 'About'].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-blue-100 hover:text-white transition-colors duration-200 text-sm hover:underline underline-offset-2"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Contact Info */}
                    <section aria-labelledby="contact-info-heading">
                        <h3
                            id="contact-info-heading"
                            className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide"
                        >
                            Contact Info
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-blue-700 rounded-lg group-hover:bg-blue-600 transition-colors">
                                    <Mail size={16} className="text-blue-200" />
                                </div>
                                <a
                                    href="mailto:chauhanrajat515@gmail.com"
                                    className="text-blue-100 hover:text-white transition-colors text-sm"
                                >
                                    chauhanrajat515@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="p-2 bg-blue-700 rounded-lg group-hover:bg-blue-600 transition-colors">
                                    <Phone size={16} className="text-blue-200" />
                                </div>
                                <a
                                    href="tel:+919719534452"
                                    className="text-blue-100 hover:text-white transition-colors text-sm"
                                >
                                    +91 9719534452
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* Social Links */}
                    <section aria-labelledby="social-links-heading">
                        <h3
                            id="social-links-heading"
                            className="text-lg font-semibold mb-4 text-blue-200 uppercase tracking-wide"
                        >
                            My Socials
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://linkedin.com/in/rajat-pratap-494736220"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 group p-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <div className="p-2 bg-blue-700 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        <Linkedin size={16} className="text-blue-200" />
                                    </div>
                                    <span className="text-blue-100 group-hover:text-white transition-colors text-sm">
                                        LinkedIn
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/007babayaga"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 group p-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <div className="p-2 bg-blue-700 rounded-lg group-hover:bg-blue-600 transition-colors">
                                        <Github size={16} className="text-blue-200" />
                                    </div>
                                    <span className="text-blue-100 group-hover:text-white transition-colors text-sm">
                                        GitHub
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </div>

                {/* Divider */}
                <div className="border-t border-blue-600 mb-6"></div>

                {/* Copyright */}
                <div className="text-center">
                    <p className="text-blue-200 text-xs tracking-wider">
                        © {new Date().getFullYear()} <span className="font-semibold">True Buy</span>. All rights reserved.
                        <span className="mx-2">•</span>
                        Made with ❤️ for better shopping experiences
                    </p>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
