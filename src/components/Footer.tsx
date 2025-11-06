import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              MASI Predictor
            </h3>
            <p className="text-sm text-muted-foreground">
              Advanced algorithms analyzing trading patterns to deliver accurate MASI Index Value predictions.
            </p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold mb-4 text-foreground">Contact Information</h4>
            <div className="space-y-3">
              <a
                href="mailto:ayoubdaoudi2001@gmail.com"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>ayoubdaoudi2001@gmail.com</span>
              </a>
              <a
                href="tel:+212717270056"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+212 717 270 056</span>
              </a>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-sm font-semibold mb-4 text-foreground">Follow Me</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://github.com/ayoubdaoudixx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/ayoubdaoudi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/ayoubdaoudixx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MASI Predictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
