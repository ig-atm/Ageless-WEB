import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Brand Tokens
───────────────────────────────────────────────────────────── */
const T = {
  warmPorcelain:  "#EEE9DF",
  charcoalOlive:  "#383B35",
  deepSage:       "#657363",
  sageDark:       "#4A7050",
  pearlIvory:     "#F8F4EC",
  champagneGold:  "#C4A66A",
  antiqueGold:    "#A98B52",
  textMuted:      "#5A5E54",
  divider:        "#D9CDB8",
};

const ease = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════════════════
   EXPORT: both sections as one default
═══════════════════════════════════════════════════════════════ */
export default function CtaAndFooter() {
  return (
    <>
      <CtaSection />
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA SECTION
═══════════════════════════════════════════════════════════════ */
function CtaSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-28 lg:py-36 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: T.warmPorcelain }}
    >
      <CtaBackground />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-10 text-center">

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-px" style={{ backgroundColor: T.champagneGold }} />
          <span
            className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase"
            style={{ color: T.deepSage }}
          >
            Begin Your Journey
          </span>
          <div className="w-8 h-px" style={{ backgroundColor: T.champagneGold }} />
        </motion.div>

        {/* ── Main heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="flex flex-col items-center gap-5"
        >
          <h2
            className="font-serif font-light leading-[1.08] tracking-[0.07em] uppercase"
            style={{
              color: T.deepSage,
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
            }}
          >
            Invest in{" "}
            <em style={{ fontStyle: "italic", color: T.antiqueGold }}>
              yourself
            </em>
          </h2>

          {/* Gold diamond ornament */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-px" style={{ backgroundColor: T.champagneGold, opacity: 0.6 }} />
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 flex-shrink-0" fill={T.champagneGold} opacity="0.8">
              <path d="M8 0L10 6H16L11 9.5L13 16L8 12.5L3 16L5 9.5L0 6H6L8 0Z" />
            </svg>
            <div className="w-14 h-px" style={{ backgroundColor: T.champagneGold, opacity: 0.6 }} />
          </div>
        </motion.div>

        {/* ── Primary body ── */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease, delay: 0.2 }}
          className="text-base lg:text-[1.08rem] font-light leading-[1.95]"
          style={{ color: T.charcoalOlive, opacity: 0.82 }}
        >
          Whether you are exploring biohacking, refining your routine, or beginning your
          longevity journey, Ageless Longevity is here to support you. For the curious.
          The committed. Those who want to understand their bodies, feel and look younger,
          build strength, support recovery, and age with confidence.
        </motion.p>

        {/* ── Sub-text card ── */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.72, ease, delay: 0.3 }}
          className="w-full rounded-2xl px-8 py-7 text-left flex flex-col gap-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.55)",
            border: `1px solid ${T.champagneGold}35`,
            backdropFilter: "blur(10px)",
          }}
        >
          <p
            className="text-[0.72rem] font-bold tracking-[0.22em] uppercase"
            style={{ color: T.deepSage }}
          >
            Your health deserves thoughtful care.
          </p>
          <p
            className="text-sm lg:text-[0.95rem] font-light leading-[1.85]"
            style={{ color: T.charcoalOlive, opacity: 0.78 }}
          >
            Understand what you take, why you take it, and how it fits into your life.
            Make informed choices about how you feel, look, and age with support from
            Ageless Longevity.
          </p>
        </motion.div>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.68, ease, delay: 0.42 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <FindSupportButton />
          <a
            href="#our-story"
            className="text-[0.75rem] font-medium tracking-[0.14em] uppercase underline underline-offset-4 transition-colors duration-300"
            style={{ color: T.textMuted, textDecorationColor: `${T.textMuted}50` }}
            onMouseEnter={e => e.currentTarget.style.color = T.antiqueGold}
            onMouseLeave={e => e.currentTarget.style.color = T.textMuted}
          >
            Learn about us first
          </a>
        </motion.div>

        {/* ── Trust micro-line ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="flex items-center gap-6 pt-2 flex-wrap justify-center"
        >
          {["Free UK Shipping Over £60", "Formulated by Doctors", "No Filler Ingredients"].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0">
                <path d="M2 6L5 9L10 3" stroke={T.deepSage} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span
                className="text-[0.65rem] font-medium tracking-wider uppercase"
                style={{ color: T.textMuted }}
              >
                {t}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

function FindSupportButton() {
  return (
    <a
      href="#collection"
      id="btnFindDailySupport"
      className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full text-[0.75rem] font-semibold tracking-[0.2em] uppercase overflow-hidden transition-all duration-400"
      style={{
        backgroundColor: T.deepSage,
        color: T.pearlIvory,
        border: `1.5px solid ${T.deepSage}`,
        boxShadow: `0 4px 24px ${T.deepSage}40`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = T.sageDark;
        e.currentTarget.style.borderColor = T.champagneGold;
        e.currentTarget.style.boxShadow = `0 8px 36px ${T.deepSage}55`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = T.deepSage;
        e.currentTarget.style.borderColor = T.deepSage;
        e.currentTarget.style.boxShadow = `0 4px 24px ${T.deepSage}40`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)" }}
      />
      <span className="relative z-10">Find Your Daily Support</span>
      <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        viewBox="0 0 16 16" fill="none">
        <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function CtaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large botanical leaf silhouette — top left */}
      <svg className="absolute -top-20 -left-20 w-[420px] h-[420px] opacity-[0.04]"
        viewBox="0 0 300 300" fill="none">
        <path d="M150 280C150 280 30 200 30 100C30 30 90 0 150 40C210 0 270 30 270 100C270 200 150 280 150 280Z"
          fill={T.charcoalOlive} />
        <line x1="150" y1="280" x2="150" y2="60" stroke={T.charcoalOlive} strokeWidth="3" />
        <line x1="150" y1="160" x2="90" y2="110" stroke={T.charcoalOlive} strokeWidth="2" />
        <line x1="150" y1="190" x2="210" y2="140" stroke={T.charcoalOlive} strokeWidth="2" />
        <line x1="150" y1="130" x2="100" y2="95"  stroke={T.charcoalOlive} strokeWidth="1.5" />
        <line x1="150" y1="220" x2="200" y2="170" stroke={T.charcoalOlive} strokeWidth="1.5" />
      </svg>
      {/* Bottom-right glow */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, ${T.champagneGold}12 0%, transparent 70%)` }}
      />
      {/* Fine dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
        <defs>
          <pattern id="ctaDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={T.charcoalOlive} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctaDots)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
const footerLinks = {
  explore: [
    { label: "Shop All",      href: "#shop" },
    { label: "Collections",   href: "#collections" },
    { label: "Our Science",   href: "#science" },
    { label: "Ingredients",   href: "#ingredients" },
    { label: "How It Works",  href: "#how" },
  ],
  company: [
    { label: "Our Story",     href: "#our-story" },
    { label: "Education",     href: "#education" },
    { label: "Journal",       href: "#journal" },
    { label: "Contact Us",    href: "#contact" },
    { label: "Stockists",     href: "#stockists" },
  ],
};

function Footer() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  }

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: T.charcoalOlive }}
      role="contentinfo"
    >
      <FooterBackground />

      {/* ── Main footer body ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* ── Column 1: Brand ── */}
          <div className="flex flex-col gap-7 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group w-fit">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${T.deepSage}30`, border: `1px solid ${T.deepSage}50` }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ color: T.champagneGold }}>
                  <path d="M12 3C12 3 5 8 5 14C5 17.866 8.134 21 12 21C15.866 21 19 17.866 19 14C19 8 12 3 12 3Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 21V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M12 16C12 16 9 13 8 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M12 14C12 14 15 11 16 8"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="font-serif text-lg font-light tracking-wide"
                  style={{ color: T.pearlIvory }}
                >
                  Ageless
                </span>
                <span
                  className="font-serif text-lg font-light italic tracking-wide -mt-1"
                  style={{ color: T.champagneGold }}
                >
                  Longevity
                </span>
              </div>
            </a>

            {/* Tagline */}
            <p
              className="text-sm font-light leading-[1.75] max-w-[220px]"
              style={{ color: `${T.pearlIvory}80` }}
            >
              Science-backed support for healthy ageing. Formulated by doctors. Inspired by nature.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { label: "Instagram", icon: <InstagramIcon /> },
                { label: "TikTok",    icon: <TiktokIcon /> },
                { label: "Facebook",  icon: <FacebookIcon /> },
                { label: "Pinterest", icon: <PinterestIcon /> },
              ].map(({ label, icon }) => (
                <FooterSocialBtn key={label} label={label} icon={icon} />
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Doctor Founded", "GMP Certified"].map(cert => (
                <span
                  key={cert}
                  className="text-[0.58rem] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${T.pearlIvory}10`,
                    border: `1px solid ${T.pearlIvory}20`,
                    color: `${T.pearlIvory}70`,
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* ── Column 2: Explore ── */}
          <FooterLinksColumn title="Explore" links={footerLinks.explore} />

          {/* ── Column 3: Company ── */}
          <FooterLinksColumn title="Company" links={footerLinks.company} />

          {/* ── Column 4: Newsletter ── */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[0.65rem] font-semibold tracking-[0.28em] uppercase"
                style={{ color: T.antiqueGold }}
              >
                Stay Connected
              </span>
              <h3
                className="font-serif text-xl font-light leading-snug"
                style={{ color: T.pearlIvory }}
              >
                Longevity insights, direct to you.
              </h3>
            </div>

            <p
              className="text-sm font-light leading-[1.7]"
              style={{ color: `${T.pearlIvory}70` }}
            >
              Evidence-informed articles, new product launches, and habit tips — no noise.
            </p>

            {/* Newsletter form */}
            {!submitted ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div
                  className="relative flex items-center rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    border: `1px solid ${focused ? T.champagneGold : `${T.pearlIvory}25`}`,
                    backgroundColor: `${T.pearlIvory}08`,
                  }}
                >
                  <input
                    id="newsletterEmail"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-[13px]"
                    style={{
                      color: T.pearlIvory,
                      caretColor: T.champagneGold,
                    }}
                  />
                </div>
                <button
                  id="btnNewsletterSubscribe"
                  type="submit"
                  className="group w-full py-3.5 rounded-xl text-[0.75rem] font-semibold tracking-[0.18em] uppercase transition-all duration-300"
                  style={{
                    backgroundColor: `${T.deepSage}`,
                    color: T.pearlIvory,
                    border: `1px solid ${T.deepSage}`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = T.sageDark;
                    e.currentTarget.style.borderColor = T.champagneGold;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = T.deepSage;
                    e.currentTarget.style.borderColor = T.deepSage;
                  }}
                >
                  Subscribe
                </button>
                <p
                  className="text-[0.6rem] font-light leading-snug"
                  style={{ color: `${T.pearlIvory}45` }}
                >
                  No spam, ever. Unsubscribe anytime. Privacy protected.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-2 px-5 py-5 rounded-xl text-center"
                style={{
                  backgroundColor: `${T.deepSage}25`,
                  border: `1px solid ${T.champagneGold}40`,
                }}
              >
                <span className="text-xl">✨</span>
                <p className="font-serif text-base font-light" style={{ color: T.champagneGold }}>
                  Welcome to the journey.
                </p>
                <p className="text-xs font-light" style={{ color: `${T.pearlIvory}70` }}>
                  We'll be in touch soon.
                </p>
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div
        className="relative z-10 mx-6 md:mx-12 lg:mx-20"
        style={{ height: "1px", background: `linear-gradient(to right, transparent, ${T.champagneGold}50, transparent)` }}
      />

      {/* ── Footer bottom bar ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <p
            className="text-[0.65rem] font-light tracking-wide"
            style={{ color: `${T.pearlIvory}45` }}
          >
            © {new Date().getFullYear()} Ageless Longevity Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link, i) => (
              <a
                key={link}
                href="#"
                className="text-[0.62rem] font-light tracking-wide transition-colors duration-300"
                style={{ color: `${T.pearlIvory}45` }}
                onMouseEnter={e => e.currentTarget.style.color = T.antiqueGold}
                onMouseLeave={e => e.currentTarget.style.color = `${T.pearlIvory}45`}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            id="btnBackToTop"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 transition-all duration-300 group"
            style={{ color: `${T.pearlIvory}45` }}
            onMouseEnter={e => e.currentTarget.style.color = T.antiqueGold}
            onMouseLeave={e => e.currentTarget.style.color = `${T.pearlIvory}45`}
          >
            <span className="text-[0.62rem] tracking-wider uppercase">Top</span>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center border transition-border duration-300"
              style={{ borderColor: "currentColor" }}
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>

        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   Footer sub-components
───────────────────────────────────────────────────────────── */
function FooterLinksColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-5">
      <span
        className="text-[0.65rem] font-semibold tracking-[0.28em] uppercase"
        style={{ color: T.antiqueGold }}
      >
        {title}
      </span>
      <nav className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="text-sm font-light tracking-wide transition-all duration-300 w-fit relative group"
            style={{ color: `${T.pearlIvory}CC` }}
            onMouseEnter={e => {
              e.currentTarget.style.color = T.antiqueGold;
              e.currentTarget.style.paddingLeft = "8px";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = `${T.pearlIvory}CC`;
              e.currentTarget.style.paddingLeft = "0px";
            }}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function FooterSocialBtn({ label, icon }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        backgroundColor: `${T.pearlIvory}0D`,
        border: `1px solid ${T.pearlIvory}18`,
        color: `${T.pearlIvory}80`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = `${T.antiqueGold}20`;
        e.currentTarget.style.borderColor = `${T.antiqueGold}60`;
        e.currentTarget.style.color = T.antiqueGold;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = `${T.pearlIvory}0D`;
        e.currentTarget.style.borderColor = `${T.pearlIvory}18`;
        e.currentTarget.style.color = `${T.pearlIvory}80`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}
    </a>
  );
}

function FooterBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top edge gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${T.champagneGold}35, transparent)` }}
      />
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[300px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${T.deepSage}18 0%, transparent 70%)` }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${T.antiqueGold}0A 0%, transparent 70%)` }}
      />
      {/* Faint dot grid */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.025 }}>
        <defs>
          <pattern id="footerDots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill={T.pearlIvory} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footerDots)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Social Icons (inline SVG, no external deps)
───────────────────────────────────────────────────────────── */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.141-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.136-1.867 3.136-4.563 0-2.386-1.715-4.052-4.163-4.052-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.774.741 2.276.082.099.094.186.07.287-.076.313-.244.995-.277 1.134-.044.183-.146.222-.336.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.522 0 10-4.477 10-10S17.522 2 12 2z"
        fill="currentColor" opacity="0.9"/>
    </svg>
  );
}
