import React, { useEffect, useState } from "react";
import {
  ArrowRight, ArrowUpRight, BarChart3, Check, ChevronDown, Code2,
  Globe2, Layers3, Menu, MonitorSmartphone, Palette, Rocket,
  Search, Server, ShoppingCart, Sparkles, Star, X, Zap, ShieldCheck,
  Clock3, MessageCircle, Mail, MapPin, Phone, ExternalLink
} from "lucide-react";
import { Link, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import emailjs from '@emailjs/browser';


const services = [
  { slug:"business-websites", icon:Globe2, title:"Business Websites", short:"High-converting websites that make your business look credible and easy to discover.", text:"We design responsive, fast and conversion-focused business websites around your goals, customers and brand.", bullets:["Custom responsive UI/UX","Mobile-first development","Contact & lead capture","Analytics-ready setup"] },
  { slug:"ecommerce", icon:ShoppingCart, title:"E-commerce Solutions", short:"Sell online with a polished storefront built around your products and customers.", text:"From product catalogues to checkout journeys, we build practical e-commerce experiences that are easy to manage and scale.", bullets:["Product & category management","Secure checkout integrations","Order workflows","Mobile shopping experience"] },
  { slug:"web-applications", icon:Code2, title:"Web Applications", short:"Purpose-built web apps that turn repetitive processes into simple digital workflows.", text:"We build tailored web applications for dashboards, internal tools, customer portals and other business processes.", bullets:["Custom application architecture","Role-based experiences","Interactive dashboards","API-ready foundations"] },
  { slug:"website-redesigns", icon:Palette, title:"Website Redesigns", short:"Give an outdated website a sharper visual identity and a better customer journey.", text:"We transform dated websites into modern digital experiences while preserving what already works.", bullets:["UX and content review","Modern visual system","Performance improvements","Migration-friendly approach"] },
  { slug:"maintenance-support", icon:ShieldCheck, title:"Maintenance & Support", short:"Keep your website secure, healthy and useful after launch.", text:"Our ongoing support plans help businesses keep websites updated, monitored and ready for growth.", bullets:["Content and technical updates","Security-minded maintenance","Performance checks","Priority support options"] },
  { slug:"seo-digital-growth", icon:Search, title:"SEO & Digital Growth", short:"Build a stronger organic presence and turn more searches into opportunities.", text:"We prepare your website for search visibility with technical SEO foundations and content-friendly structures.", bullets:["Technical SEO foundations","On-page optimization","Search-friendly structure","Performance and tracking setup"] },
  { slug:"domain-hosting", icon:Server, title:"Domain & Hosting", short:"Reliable foundations for your website, from domain setup to hosting guidance.", text:"We help you get the essentials right and keep your web presence running on dependable infrastructure.", bullets:["Domain setup assistance","Hosting configuration","SSL setup","DNS and deployment support"] }
];

const portfolio = [
  { title:"Kijani Commerce", type:"E-commerce concept", desc:"A clean online retail experience designed for mobile shoppers.", gradient:"g1" },
  { title:"Nuru Advisory", type:"Professional services", desc:"A confident corporate website with a conversion-led information architecture.", gradient:"g2" },
  { title:"Atlas Operations", type:"Web application concept", desc:"A dashboard experience that brings business workflows into one place.", gradient:"g3" }
];

const testimonials = [
  { quote:"Shalom's approach is refreshingly practical. They focused on what the website needed to achieve, not just how it should look.", name:"Dr. Daisy Masibo", role:"Business Owner" },
  { quote:"The process feels collaborative from the first conversation. You can tell the team cares about making technology useful.", name:"Nephine Minyiri", role:"Operations Lead" },
  { quote:"A strong mix of design, speed and business thinking. Exactly what a growing company needs from a digital partner.", name:"Daniel Upao", role:"Founder" }
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
    }, {threshold:.12});
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return <Link to="/" className="logo" aria-label="Shalom Technology Solutions home">
    <span className="logo-mark"><span>S</span></span>
    <span className="logo-copy"><b>SHALOM</b><small>TECHNOLOGY SOLUTIONS</small></span>
  </Link>
}

function Header() {
  const [open,setOpen] = useState(false);
  const location = useLocation();
  useEffect(()=>setOpen(false),[location.pathname]);
  const links = [["/services","Services"],["/about","About"],["/blog","Blog"],["/contact","Contact"]];
  return <header className="header">
    <div className="container nav">
      <Logo />
      <button className="mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
      <nav className={open?"nav-links open":"nav-links"}>
        {links.map(([to,label])=><NavLink key={to} to={to} className={({isActive})=>isActive?"active":""}>{label}</NavLink>)}
        <Link className="nav-cta" to="/contact">Book Consultation <ArrowUpRight size={16}/></Link>
      </nav>
    </div>
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><Logo/><p className="footer-intro">Modern web solutions for ambitious businesses across East Africa.</p></div>
      <div><h4>Explore</h4><Link to="/services">Services</Link>
      {/* <Link to="/portfolio">Portfolio</Link> */}
      <Link to="/about">About</Link><Link to="/blog">Blog</Link></div>
      <Link to="https://docs.google.com/forms/d/e/1FAIpQLSeD83qQGwnF7h_S06dqocR_SaixsO_-oMY8PNNFRJc5JnI3OA/viewform?usp=sharing&ouid=115064769298718409451">Careers</Link>
      <div><h4>Services</h4>{services.slice(0,4).map(s=><Link key={s.slug} to={"/services/"+s.slug}>{s.title}</Link>)}</div>
      <div><h4>Start a project</h4><a href="tel:+254703947330"><Phone size={15}/> +254 703 947 330</a><a href="mailto:muthonihannahhailu@gmail.com"><Mail size={15}/> muthonihannahhailu@gmail.com</a><Link to="/contact" className="footer-button">Free consultation <ArrowRight size={15}/></Link></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Shalom Technology Solutions. All rights reserved.</span><span><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></span></div>
  </footer>
}

function Layout({children}) { return <><Header/><main>{children}</main><Footer/></> }

function SectionTitle({eyebrow,title,body,center=false}) {
  return <div className={"section-title reveal "+(center?"center":"")}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{body&&<p>{body}</p>}</div>
}

function CTA() {
  return <section className="cta-section"><div className="container cta-box reveal"><div><span className="eyebrow">Ready when you are</span><h2>Let's build something <em>remarkable.</em></h2><p>Tell us what you want your website to achieve. We'll help you map out the smartest next step.</p></div><Link className="button button-light" to="/contact">Book a Free Consultation <ArrowRight size={18}/></Link></div></section>
}

function Home() {
  useReveal();
  return <Layout>
    <section className="hero">
      <div className="hero-glow glow-a"/><div className="hero-glow glow-b"/>
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <div className="pill"><Sparkles size={14}/> Digital experiences built for growth</div>
          <h1>Web solutions that move your <span>business forward.</span></h1>
          <p>We design and develop stunning websites, web applications and digital solutions that help businesses stand out, connect with customers and grow online.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/contact">Book a Free Consultation <ArrowRight size={18}/></Link>
          {/* <Link className="button button-ghost" to="/portfolio">View Our Work <ArrowUpRight size={17}/></Link> */}
          </div>
          <div className="stats"><div><b>100%</b><span>Custom builds</span></div><div><b>Mobile</b><span>First approach</span></div><div><b>24/7</b><span>Digital presence</span></div></div>
        </div>
        <div className="hero-visual reveal">
          <div className="orb orb-one"/><div className="orb orb-two"/>
          <div className="browser-card main-browser">
            <div className="browser-top"><span/><span/><span/><small>shalomtech</small></div>
            <div className="browser-body">
              <div className="mini-nav"><b>SHALOM</b><span>Services</span><span>Work</span><span>About</span><i/></div>
              <div className="mock-hero"><div><small>BEAUTIFUL. FAST. RELIABLE.</small><h3>Build a digital presence that works.</h3><div className="mock-button"/></div><div className="mock-device"><div className="device-screen"><Code2/></div></div></div>
              <div className="mock-cards"><i/><i/><i/></div>
            </div>
          </div>
          <div className="float-card float-a"><Rocket size={19}/><div><b>Launch ready</b><small>Fast & responsive</small></div></div>
          <div className="float-card float-b"><BarChart3 size={19}/><div><b>Built to convert</b><small>Business-focused UX</small></div></div>
        </div>
      </div>
    </section>

    <section className="section"><div className="container"><SectionTitle eyebrow="What we do" title="Everything you need to show up online with confidence." body="From your first landing page to a complete digital platform, we combine thoughtful design with practical technology."/><div className="service-grid">{services.slice(0,6).map((s,i)=><ServiceCard key={s.slug} service={s} index={i}/>)}</div></div></section>

    <section className="section section-dark"><div className="container split"><div className="reveal"><span className="eyebrow">Why Shalom</span><h2>A digital partner, not just a web developer.</h2><p>We think about the whole customer journey: how people discover you, understand your offer, trust your brand and take action.</p><Link className="text-link" to="/about">Meet the team behind the work <ArrowRight size={17}/></Link></div><div className="value-grid reveal">{["Modern & purposeful","Fast & reliable","Business-first","Built to evolve"].map((x,i)=><div className="value" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Design and technology decisions grounded in real business outcomes.</p></div>)}</div></div></section>

    {/* <section className="section"><div className="container"><SectionTitle eyebrow="Selected concepts" title="A glimpse of what we can create." body="We don't have a client portfolio to showcase yet, so these concept projects demonstrate the level of thinking and craft we bring to every build."/>
    <div className="portfolio-grid">{portfolio.map((p,i)=><PortfolioCard key={p.title} item={p} index={i}/>)}</div><div className="center-action"><Link className="button button-outline" to="/portfolio">Explore Our Work <ArrowRight size={17}/></Link></div></div></section> */}

    <section className="section process-section">
      <div className="container">
        <SectionTitle eyebrow="Our process" title="Clear steps. No unnecessary complexity."/>
        <div className="process-grid">
          {["Discover", "Plan", "Design", "Build", "Launch"].map((x, i) => {
            const Icon = [Search, Layers3, Palette, Code2, Rocket][i];

            return (
              <div className="process-step reveal" key={x}>
                <span>0{i + 1}</span>

                <div className="process-icon">
                  <Icon size={20} />
                </div>

                <h3>{x}</h3>

                <p>
                  {[
                    "Understand your goals, audience and priorities.",
                    "Shape the sitemap, content and technical direction.",
                    "Turn the strategy into a distinctive visual experience.",
                    "Develop a fast, responsive and scalable website.",
                    "Test, refine, deploy and help you take it forward."
                  ][i]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section testimonials">
      <div className="container">
        <SectionTitle eyebrow="Client perspective" title="The kind of experience we're building toward." center/>
        <div className="testimonial-grid">{testimonials.map(t=><div className="testimonial reveal" key={t.quote}><div className="stars">{[1,2,3,4,5].map(n=><Star key={n} size={15} fill="currentColor"/>)}</div><p>“{t.quote}”</p><b>{t.name}</b><small>{t.role}</small></div>)}</div></div></section>
    <CTA/>
  </Layout>
}

function ServiceCard({service,index}) {
  const Icon=service.icon;
  return <Link className={"service-card reveal delay-"+(index%3)} to={"/services/"+service.slug}><div className="icon-box"><Icon size={21}/></div><div><h3>{service.title}</h3><p>{service.short}</p></div><ArrowUpRight className="card-arrow" size={19}/></Link>
}
function PortfolioCard({item,index}) {
  return <div className={"portfolio-card reveal delay-"+(index%3)}><div className={"project-art "+item.gradient}><div className="project-window"><span/><span/><span/><div className="art-lines"/><div className="art-block"/></div></div><div className="project-copy"><div><small>{item.type}</small><h3>{item.title}</h3></div><ArrowUpRight size={19}/><p>{item.desc}</p></div></div>
}

function PageHero({eyebrow,title,body}) { return <section className="page-hero"><div className="container reveal"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{body}</p></div></section> }

function Services() {
  useReveal();
  return <Layout><PageHero eyebrow="Services" title="Digital solutions designed around your business." body="Whether you need a simple business website or a custom web application, we build experiences that are useful, credible and ready to grow."/><section className="section"><div className="container service-list">{services.map((s,i)=><ServiceRow key={s.slug} service={s} index={i}/>)}</div></section><CTA/></Layout>
}
function ServiceRow({service,index}) {
  const Icon=service.icon;
  return <Link to={"/services/"+service.slug} className="service-row reveal"><div className="row-number">0{index+1}</div><div className="icon-box large"><Icon size={24}/></div><div className="row-content"><h2>{service.title}</h2><p>{service.text}</p></div><ArrowUpRight className="row-arrow" size={22}/></Link>
}

function ServiceDetail() {
  useReveal();
  const {slug}=useParams();
  const service=services.find(s=>s.slug===slug) || services[0];
  const Icon=service.icon;
  return <Layout><PageHero eyebrow="Service" title={service.title} body={service.text}/><section className="section"><div className="container detail-grid"><div className="detail-main reveal"><div className="icon-box xl"><Icon size={30}/></div><h2>What you get</h2><p>We combine strategy, visual design and reliable development to give your business a digital experience that looks exceptional and works hard behind the scenes.</p><div className="check-list">{service.bullets.map(x=><div key={x}><Check size={17}/><span>{x}</span></div>)}</div></div><aside className="detail-aside reveal"><span className="eyebrow">Let's talk</span><h3>Have a project in mind?</h3><p>Book a free consultation and let's turn your idea into a clear plan.</p><Link className="button button-primary" to="/contact">Book Consultation <ArrowRight size={17}/></Link></aside></div></section><CTA/></Layout>
}

function About() {
  useReveal();
  return <Layout><PageHero eyebrow="About Shalom" title="We build technology that helps businesses move with confidence." body="Shalom Technology Solutions is a modern digital agency focused on thoughtful web experiences for businesses across East Africa."/><section className="section"><div className="container split about-split"><div className="reveal"><span className="eyebrow">Our approach</span><h2>Small enough to care. Serious enough to deliver.</h2></div><div className="reveal"><p>We're building Shalom around a simple idea: technology should make business easier, clearer and more competitive. That means listening first, designing intentionally and building with the future in mind.</p><p>We work collaboratively, communicate clearly and avoid unnecessary complexity. The result is a digital presence that feels like your business—not a template.</p></div></div></section><section className="section section-light"><div className="container"><SectionTitle eyebrow="Our values" title="Principles that shape every project."/><div className="value-cards">{[["Clarity","Make the complicated feel simple."],["Craft","Sweat the details that customers notice."],["Integrity","Be honest about what works and what doesn't."],["Growth","Build for today's needs without blocking tomorrow's opportunities."]].map(([a,b])=><div className="value-card reveal" key={a}><Sparkles size={20}/><h3>{a}</h3><p>{b}</p></div>)}</div></div></section><CTA/></Layout>
}

function Portfolio() {
  useReveal();
  return <Layout><PageHero eyebrow="Portfolio" title="A preview of the quality we aim to deliver." body="We're currently building our client portfolio. Until then, explore these fictional concepts that show our preferred approach to design, structure and interaction."/><section className="section"><div className="container portfolio-grid portfolio-large">{portfolio.concat([{title:"Mwangaza Studio",type:"Creative business concept",desc:"A bold editorial-style web presence for a modern creative company.",gradient:"g4"}]).map((p,i)=><PortfolioCard key={p.title} item={p} index={i}/>)}</div></section><CTA/></Layout>
}

const posts=[
 {slug:"website-that-works","tag":"Web Strategy","title":"What makes a business website actually work?","date":"5 min read","intro":"A beautiful homepage is only the beginning. Here are the foundations that turn a website into a useful business asset."},
 {slug:"mobile-first-east-africa","tag":"Design","title":"Why mobile-first design matters for modern businesses","date":"4 min read","intro":"Your customers are already online. The experience you give them on a phone can shape their first impression of your business."},
 {slug:"before-building-website","tag":"Business","title":"7 questions to answer before building your next website","date":"6 min read","intro":"A little strategic clarity before development can save time, money and frustration later."}
];

function Blog() {
  useReveal();
  return <Layout><PageHero eyebrow="Insights" title="Ideas for building a better digital presence." body="Practical thoughts on websites, design, technology and digital growth. More articles are on the way."/><section className="section"><div className="container blog-grid">{posts.map((p,i)=><Link to={"/blog/"+p.slug} className="blog-card reveal" key={p.slug}><div className="blog-art"><span>{p.tag}</span><div><Zap size={30}/></div></div><div className="blog-copy"><small>{p.date}</small><h2>{p.title}</h2><p>{p.intro}</p><span className="text-link">Read article <ArrowRight size={15}/></span></div></Link>)}</div></section></Layout>
}
function BlogDetail() {
  useReveal();
  const {slug}=useParams(); const post=posts.find(p=>p.slug===slug)||posts[0];
  return <Layout><article className="article"><div className="container article-container reveal"><span className="eyebrow">{post.tag}</span><h1>{post.title}</h1><p className="article-lead">{post.intro}</p><div className="article-meta">{post.date} · Shalom Technology Solutions</div><div className="article-body"><h2>Start with the outcome</h2><p>A website should have a job. It might be generating enquiries, explaining a service, selling products or helping customers take the next step. Start there, then let the design and technology support that goal.</p><h2>Make the experience effortless</h2><p>Clear navigation, readable content, strong calls to action and excellent mobile performance matter more than decorative features. Good design removes friction rather than adding noise.</p><h2>Build something you can grow</h2><p>Your first version does not need every possible feature. A focused foundation makes it easier to learn from real users and improve over time.</p><blockquote>Great digital experiences feel simple because the thinking behind them is deliberate.</blockquote></div></div></article><CTA/></Layout>
}

function Contact() {
  useReveal();
  const [sent,setSent]=useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      business: formData.get("business"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    console.log("Contact form submission:", data);
    emailjs.send('service_slqwvvs', 'template_6napixb', data, {
        publicKey: 'yaYqemY3svI8LU8Fs',
      }).then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', error);
      },
    );

    setSent(true);
    alert("Thank you! Your information has been sent successfully.");
    window.location.reload();
  };
  return <Layout><PageHero eyebrow="Contact" title="Let's turn your idea into a digital plan." body="Book a free consultation. Tell us a little about your business, your goals and what you want to build."/><section className="section"><div className="container contact-grid"><div className="contact-info reveal"><span className="eyebrow">Start a conversation</span><h2>Good projects start with a good conversation.</h2><p>Use the form or reach us directly. These are placeholders for your final contact details.</p><div className="contact-items"><a href="tel:+254703947330"><span><Phone size={18}/></span><div><small>Call us</small><b>+254 703 947 330</b></div></a><a href="mailto:muthonihannahhailu@gmail.com"><span><Mail size={18}/></span><div><small>Email</small><b>muthonihannahhailu@gmail.com</b></div></a><div><span><MapPin size={18}/></span><div><small>Serving</small><b>Businesses across East Africa</b></div></div></div></div>
  <form className="contact-form" onSubmit={handleSubmit}>

    <div className="form-row">
      <label>
        Name
        <input
          name="name"
          required
          placeholder="Your name"
        />
      </label>

      <label>
        Business
        <input
          name="business"
          required
          placeholder="Business name"
        />
      </label>
    </div>

    <div className="form-row">
      <label>
        Email
        <input
          name="email"
          required
          type="email"
          placeholder="you@company.com"
        />
      </label>

      <label>
        Phone
        <input
          name="phone"
          placeholder="+254 ..."
        />
      </label>
    </div>

    <label>
      What do you need?
      <select name="service">
        <option>Business website</option>
        <option>E-commerce website</option>
        <option>Web application</option>
        <option>Website redesign</option>
        <option>Maintenance & support</option>
        <option>SEO & digital growth</option>
        <option>Domain & hosting</option>
        <option>Not sure yet</option>
      </select>
    </label>

    <label>
      Tell us about your project
      <textarea
        name="message"
        rows="6"
        placeholder="A few details about your goals, timeline or budget..."
      />
    </label>

    <button className="button button-primary" type="submit">
      Book My Free Consultation
      <ArrowRight size={17} />
    </button>

  </form>
  </div></section></Layout>
}

function Legal({type}) {
  const privacy=type==="privacy";
  return <Layout><PageHero eyebrow={privacy?"Privacy Policy":"Terms of Service"} title={privacy?"Your privacy matters.":"Clear expectations make better partnerships."} body={privacy?"This starter policy explains, in plain language, how a future Shalom Technology Solutions website may handle visitor information. Replace this text with your final legal policy before launch.":"These starter terms outline the basic relationship between Shalom Technology Solutions and website visitors or clients. Have the final version reviewed for your business and jurisdiction before launch."}/><section className="section legal"><div className="container narrow"><h2>{privacy?"1. Information we collect":"1. Services"}</h2><p>{privacy?"We may collect information you voluntarily submit through contact forms, such as your name, business, email address, phone number and project details. We may also collect basic technical information needed to operate and improve the website.":"Project scope, deliverables, timelines, pricing and responsibilities should be agreed in writing before work begins. These terms are a starting point, not a substitute for a signed client agreement."}</p><h2>{privacy?"2. How information is used":"2. Client responsibilities"}</h2><p>{privacy?"Information may be used to respond to enquiries, provide requested services, improve the website, maintain security and communicate about relevant project matters. We do not intend to sell personal information.":"Clients are responsible for providing accurate content, approvals, access credentials and timely feedback where these are required to keep a project moving."}</p><h2>{privacy?"3. Data retention & security":"3. Intellectual property"}</h2><p>{privacy?"We take reasonable steps to protect information and retain it only as long as reasonably necessary for legitimate business purposes, legal obligations or agreed services.":"Ownership, licensing and third-party assets should be specified in the project agreement. Unless otherwise agreed, third-party software, fonts, stock assets and services remain subject to their respective licenses."}</p><h2>{privacy?"4. Your choices":"4. Changes & contact"}</h2><p>{privacy?"You may contact us to ask about the personal information we hold about you or to request appropriate corrections or deletion, subject to applicable legal requirements.":"Project terms may be updated as the business evolves. Questions about a project or these starter terms can be directed to hello@shalomtech.co.ke."}</p></div></section></Layout>
}

function NotFound(){return <Layout><PageHero eyebrow="404" title="That page went somewhere else." body="The page you're looking for doesn't exist or has moved."/><div className="center-action"><Link className="button button-primary" to="/">Back Home <ArrowRight size={17}/></Link></div></Layout>}

function App() {
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/services/:slug" element={<ServiceDetail/>}/>
    {/* <Route path="/portfolio" element={<Portfolio/>}/> */}
    <Route path="/about" element={<About/>}/>
    <Route path="/blog" element={<Blog/>}/>
    <Route path="/blog/:slug" element={<BlogDetail/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/privacy" element={<Legal type="privacy"/>}/>
    <Route path="/terms" element={<Legal type="terms"/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
}

export default App;
