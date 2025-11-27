import { motion } from 'motion/react';
import { Clock, Timer, Globe, Play, Zap, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background grid - no animation */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
        opacity: 0.5
      }} />

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, #ffffff, #666666)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={20} style={{ color: '#000' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>PomodoroFlow</span>
            </div>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <a href="#features" style={{ fontSize: '0.875rem', color: '#999', textDecoration: 'none', transition: 'color 0.2s' }}>Features</a>
              <a href="#about" style={{ fontSize: '0.875rem', color: '#999', textDecoration: 'none', transition: 'color 0.2s' }}>About</a>
            </nav>

            <Link
              to="/app"
              style={{
                padding: '0.625rem 1.5rem',
                background: 'linear-gradient(135deg, #fff, #e0e0e0)',
                color: '#000',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Launch App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ position: 'relative', zIndex: 10, paddingTop: '5rem', paddingBottom: '6rem' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            {/* Left: Text Content */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  color: '#ccc',
                  fontWeight: 500
                }}>
                  ✨ Boost your productivity
                </span>
              </div>

              <h1 style={{ fontSize: '4rem', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                <span style={{ background: 'linear-gradient(135deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Stay Focused,
                </span>
                <br />
                <span>Get More Done</span>
              </h1>

              <p style={{ fontSize: '1.25rem', color: '#999', marginBottom: '2rem', lineHeight: 1.7 }}>
                A beautiful, minimalist Pomodoro timer with three powerful modes.
                Stay productive with customizable sessions and a distraction-free interface.
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                  to="/app"
                  style={{
                    padding: '1rem 2rem',
                    background: 'linear-gradient(135deg, #fff, #d0d0d0)',
                    color: '#000',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <Play size={20} />
                  Start Timer
                </Link>
                <a
                  href="#features"
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right: Minimalist Pattern */}
            <div style={{ position: 'relative' }}>
              <MinimalPattern />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ position: 'relative', zIndex: 10, padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>Three Powerful Modes</h2>
            <p style={{ fontSize: '1.125rem', color: '#999', maxWidth: '42rem', margin: '0 auto' }}>
              Everything you need to stay focused and track your time
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <FeatureCard
              icon={<Timer size={32} />}
              title="Pomodoro Timer"
              description="Classic work/break cycles with customizable durations. Track your rounds and stay in the flow."
            />
            <FeatureCard
              icon={<Zap size={32} />}
              title="Simple Timer"
              description="Quick countdown timer for any task. Set custom durations up to 24 hours."
            />
            <FeatureCard
              icon={<Globe size={32} />}
              title="World Clock"
              description="Live clock with 17+ timezones. Perfect for remote teams and global collaboration."
            />
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section style={{ position: 'relative', zIndex: 10, padding: '6rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.5rem 1rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '9999px' }}>
                <Moon size={16} style={{ color: '#ccc' }} />
                <span style={{ fontSize: '0.875rem', color: '#ccc', fontWeight: 500 }}>Minimal Design</span>
              </div>
              <h3 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                Designed for Focus
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#999' }}>
                {[
                  'Keyboard shortcuts for everything - stay in your flow',
                  'Minimal animations that don\'t distract',
                  'Monochrome design that keeps you focused',
                  'Works perfectly on mobile, tablet, and desktop'
                ].map((text, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.125rem' }}>
                      <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: '#fff' }} />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                aspectRatio: '1',
                borderRadius: '1.5rem',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '6rem', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>25:00</div>
                  <div style={{ fontSize: '1rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ready to Focus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ position: 'relative', zIndex: 10, padding: '6rem 0' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '1.5rem',
            padding: '4rem'
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Start Focusing Today
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#999', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem' }}>
              Join thousands of productive people using PomodoroFlow to achieve their goals.
              No signup required.
            </p>
            <Link
              to="/app"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1.25rem 2.5rem',
                background: 'linear-gradient(135deg, #fff, #d0d0d0)',
                color: '#000',
                borderRadius: '9999px',
                fontSize: '1.125rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              <Play size={20} />
              Launch Timer Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.1)', padding: '3rem 0' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'linear-gradient(135deg, #fff, #888)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={16} style={{ color: '#000' }} />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#999' }}>PomodoroFlow © 2024</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#999' }}>
              <a href="https://github.com/p-het-p/Pomo_T" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none', transition: 'color 0.2s' }}>
                GitHub
              </a>
              <span>•</span>
              <span>Made with ❤️ for productivity</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Feature Card Component - Minimal version
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div
      style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '1rem',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))'}
    >
      <div style={{
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '0.75rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
        border: '1px solid rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: '#fff'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{title}</h3>
      <p style={{ fontSize: '1rem', color: '#999', lineHeight: 1.7 }}>{description}</p>
    </div>
  );
}

// Minimal Geometric Pattern - Static with subtle hover
function MinimalPattern() {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', maxWidth: '32rem', margin: '0 auto' }}>
      {/* Simple 3x3 grid - no animations */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {/* Row 1 */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))', borderTopLeftRadius: '100%' }} />
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }} />
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))', borderTopRightRadius: '100%' }} />

        {/* Row 2 */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }} />
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.15))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Clock size={80} style={{ color: '#fff', opacity: 0.8 }} />
        </div>
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }} />

        {/* Row 3 */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))', borderBottomLeftRadius: '100%' }} />
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }} />
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))', borderBottomRightRadius: '100%' }} />
      </div>
    </div>
  );
}
