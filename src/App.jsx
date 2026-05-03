import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --bg: #020409;
  --bg2: #050816;
  --glass: rgba(255,255,255,0.035);
  --glass2: rgba(255,255,255,0.06);
  --border: rgba(255,255,255,0.08);
  --border-glow: rgba(0,245,255,0.3);
  --cyan: #00F5FF;
  --cyan-dim: rgba(0,245,255,0.15);
  --violet: #BF5FFF;
  --violet-dim: rgba(191,95,255,0.15);
  --pink: #FF2D78;
  --pink-dim: rgba(255,45,120,0.12);
  --green: #00FFA3;
  --text: #EEF2FF;
  --text2: #A0AABF;
  --muted: #4A5270;
  --danger: #FF4D6D;
  --success: #00FFA3;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── Plasma background ── */
.plasma-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}
.plasma-bg::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background:
    radial-gradient(ellipse 80% 50% at 20% 10%, rgba(0,245,255,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 80%, rgba(191,95,255,0.08) 0%, transparent 55%),
    radial-gradient(ellipse 50% 40% at 60% 20%, rgba(255,45,120,0.05) 0%, transparent 50%),
    radial-gradient(ellipse 90% 70% at 40% 90%, rgba(0,255,163,0.04) 0%, transparent 60%);
  animation: plasmaShift 18s ease-in-out infinite alternate;
}
.plasma-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
@keyframes plasmaShift {
  0% { transform: translate(0,0) scale(1); }
  33% { transform: translate(-3%,2%) scale(1.03); }
  66% { transform: translate(2%,-3%) scale(0.97); }
  100% { transform: translate(-1%,1%) scale(1.02); }
}

.scanline {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.03) 2px,
    rgba(0,0,0,0.03) 4px
  );
  pointer-events: none;
}

.app { min-height: 100vh; position: relative; }
.content { position: relative; z-index: 1; }

/* ── Header ── */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.5rem;
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px) saturate(180%);
  background: rgba(2,4,9,0.82);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  cursor: pointer;
  background: linear-gradient(90deg, var(--cyan), var(--violet), var(--pink));
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: logoShimmer 4s linear infinite;
}
@keyframes logoShimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
.header-pills { display: flex; gap: 0.5rem; align-items: center; }
.pill {
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--muted);
  background: var(--glass);
}
.pill-cyan {
  border-color: rgba(0,245,255,0.25);
  color: var(--cyan);
  background: var(--cyan-dim);
  box-shadow: 0 0 12px rgba(0,245,255,0.1);
}

/* ── Hero ── */
.hero {
  padding: 6rem 2.5rem 4rem;
  text-align: center;
  max-width: 920px;
  margin: 0 auto;
  position: relative;
}
.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-55%);
  width: 600px;
  height: 300px;
  background: radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--cyan);
  font-weight: 500;
  margin-bottom: 2rem;
  border: 1px solid rgba(0,245,255,0.2);
  padding: 0.4rem 1.1rem;
  border-radius: 100px;
  background: var(--cyan-dim);
  box-shadow: 0 0 20px rgba(0,245,255,0.08), inset 0 1px 0 rgba(255,255,255,0.06);
}
.hero-eyebrow::before { content: '◈'; font-size: 0.55rem; }
.hero h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 1.03;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}
.hero h1 .plain { color: var(--text); }
.hero h1 .grad {
  background: linear-gradient(135deg, var(--cyan) 0%, var(--violet) 50%, var(--pink) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero p {
  font-size: 1.05rem;
  color: var(--text2);
  line-height: 1.8;
  font-weight: 300;
  max-width: 560px;
  margin: 0 auto 3.5rem;
}

.stats-row {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: var(--glass);
  backdrop-filter: blur(12px);
  box-shadow: 0 0 40px rgba(0,245,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06);
}
.stat-item {
  padding: 1.2rem 2rem;
  border-right: 1px solid var(--border);
  text-align: center;
}
.stat-item:last-child { border-right: none; }
.stat-num {
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.stat-lbl {
  font-size: 0.6rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0.25rem;
}

/* ── Tools grid ── */
.tools-section { padding: 3rem 2.5rem 5rem; max-width: 1280px; margin: 0 auto; }
.sec-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.sec-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--muted);
  white-space: nowrap;
}
.sec-line { flex: 1; height: 1px; background: linear-gradient(to right, var(--border), transparent); }
.sec-badge {
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
  border: 1px solid rgba(0,245,255,0.2);
  color: var(--cyan);
  background: var(--cyan-dim);
  white-space: nowrap;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}
.tool-card {
  background: var(--glass);
  backdrop-filter: blur(12px);
  padding: 1.85rem 1.75rem;
  cursor: pointer;
  transition: all 0.28s ease;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  position: relative;
  overflow: hidden;
}
.tool-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,245,255,0.04) 0%, rgba(191,95,255,0.03) 100%);
  opacity: 0;
  transition: opacity 0.3s;
}
.tool-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.tool-card:hover { background: var(--glass2); transform: scale(1.005); }
.tool-card:hover::before, .tool-card:hover::after { opacity: 1; }
.tool-card:hover .tool-icon-wrap { box-shadow: 0 0 20px rgba(0,245,255,0.25); }

.tool-icon-wrap {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem;
  background: var(--glass2);
  border: 1px solid var(--border);
  transition: all 0.28s;
  margin-bottom: 0.35rem;
}
.badge {
  font-size: 0.53rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.18rem 0.55rem;
  border-radius: 100px;
}
.badge-ai {
  background: var(--cyan-dim);
  color: var(--cyan);
  border: 1px solid rgba(0,245,255,0.25);
  box-shadow: 0 0 8px rgba(0,245,255,0.1);
}
.badge-free {
  background: var(--violet-dim);
  color: var(--violet);
  border: 1px solid rgba(191,95,255,0.25);
}
.tool-top { display: flex; align-items: flex-start; justify-content: space-between; }
.tool-name {
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}
.tool-desc { font-size: 0.8rem; color: var(--text2); line-height: 1.6; flex: 1; }
.tool-cta {
  font-size: 0.72rem;
  color: var(--muted);
  transition: all 0.2s;
  margin-top: 0.35rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.tool-card:hover .tool-cta { color: var(--cyan); }

/* ── Tool view ── */
.tool-view { min-height: 100vh; }
.tool-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2.5rem;
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(24px);
  background: rgba(2,4,9,0.88);
  position: sticky;
  top: 0;
  z-index: 100;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text2);
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--glass);
  font-family: 'Inter', sans-serif;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  transition: all 0.2s;
}
.back-btn:hover { color: var(--cyan); border-color: rgba(0,245,255,0.3); background: var(--cyan-dim); }
.nav-title {
  font-family: 'Syne', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

/* ── SEO landing ── */
.seo-hero { padding: 3rem 2.5rem 0.5rem; max-width: 820px; margin: 0 auto; }
.seo-eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--cyan);
  font-weight: 600;
  margin-bottom: 0.85rem;
}
.seo-hero h1 {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 0.85rem;
  letter-spacing: -0.02em;
}
.seo-hero h1 em {
  font-style: normal;
  background: linear-gradient(90deg, var(--cyan), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.seo-hero p { font-size: 0.9rem; color: var(--text2); line-height: 1.75; margin-bottom: 1.25rem; }
.seo-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.seo-chip {
  font-size: 0.7rem;
  color: var(--text2);
  background: var(--glass);
  border: 1px solid var(--border);
  padding: 0.28rem 0.75rem;
  border-radius: 100px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.seo-chip::before { content: '✦'; color: var(--cyan); font-size: 0.45rem; }

.tool-content { max-width: 760px; margin: 0 auto; padding: 2.5rem 2.5rem 4rem; }
.tool-content h2 {
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--text) 60%, var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.subtitle { color: var(--text2); font-size: 0.88rem; margin-bottom: 2.25rem; line-height: 1.7; }

/* ── Form elements ── */
.field { margin-bottom: 1.15rem; }
.field label {
  display: block;
  font-size: 0.67rem;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
.field input, .field textarea, .field select {
  width: 100%;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  padding: 0.82rem 1.1rem;
  outline: none;
  transition: all 0.2s;
  backdrop-filter: blur(8px);
}
.field input:focus, .field textarea:focus, .field select:focus {
  border-color: rgba(0,245,255,0.4);
  box-shadow: 0 0 0 3px rgba(0,245,255,0.07), 0 0 20px rgba(0,245,255,0.05);
  background: var(--glass2);
}
.field textarea { resize: vertical; min-height: 100px; line-height: 1.65; }
.field select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5270' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}
.field input[type=date], .field input[type=time] { color-scheme: dark; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

/* ── Button ── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.88rem 2rem;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.25s;
  width: 100%;
  margin-top: 0.25rem;
  letter-spacing: 0.01em;
  position: relative;
  overflow: hidden;
}
.btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(255,255,255,0.08), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}
.btn:hover::before { transform: translateX(100%); }
.btn-primary {
  background: linear-gradient(135deg, rgba(0,245,255,0.9), rgba(191,95,255,0.9));
  color: #020409;
  font-weight: 700;
  box-shadow: 0 0 30px rgba(0,245,255,0.2), 0 4px 15px rgba(0,0,0,0.3);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 0 50px rgba(0,245,255,0.35), 0 8px 25px rgba(0,0,0,0.4);
}
.btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }

/* ── Results ── */
.result-box {
  margin-top: 2rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.85rem;
  animation: fadeUp 0.35s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(12px);
}
.result-box::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--cyan), transparent);
}
.result-label {
  font-size: 0.58rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--cyan);
  margin-bottom: 1rem;
  font-weight: 600;
}
.result-text { font-size: 0.9rem; line-height: 1.9; color: var(--text); white-space: pre-wrap; }
.big-num {
  font-family: 'Syne', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.loading-box {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.5rem;
  color: var(--text2);
  font-size: 0.88rem;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 14px;
  margin-top: 2rem;
  animation: fadeUp 0.3s ease;
  backdrop-filter: blur(12px);
}
.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(0,245,255,0.15);
  border-top-color: var(--cyan);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(0,245,255,0.2);
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }

.calc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-top: 2rem;
  animation: fadeUp 0.35s ease;
}
.calc-card {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.4rem;
  text-align: center;
  backdrop-filter: blur(12px);
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s;
}
.calc-card:hover { border-color: rgba(0,245,255,0.2); }
.calc-val {
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}
.calc-lbl { font-size: 0.62rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.3rem; }

.option-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.5rem; }
.opt-btn {
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--text2);
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  cursor: pointer;
  transition: all 0.18s;
  white-space: nowrap;
  backdrop-filter: blur(8px);
}
.opt-btn.on {
  border-color: rgba(0,245,255,0.4);
  background: var(--cyan-dim);
  color: var(--cyan);
  box-shadow: 0 0 12px rgba(0,245,255,0.12);
}
.opt-btn:hover:not(.on) { border-color: rgba(255,255,255,0.15); color: var(--text); }

.bar-row { margin: 0.85rem 0; }
.bar-meta { display: flex; justify-content: space-between; font-size: 0.77rem; margin-bottom: 0.35rem; }
.bar-track { height: 4px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 3px; transition: width 0.7s ease; }

.copy-btn {
  margin-top: 1.1rem;
  background: var(--glass);
  border: 1px solid var(--border);
  color: var(--text2);
  padding: 0.48rem 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s;
  backdrop-filter: blur(8px);
}
.copy-btn:hover { color: var(--cyan); border-color: rgba(0,245,255,0.3); }
.copy-btn.done { color: var(--green); border-color: rgba(0,255,163,0.3); }

.tab-row { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 2rem; gap: 0; overflow-x: auto; }
.tab-btn {
  padding: 0.65rem 1.1rem;
  font-size: 0.8rem;
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
  white-space: nowrap;
}
.tab-btn.on { color: var(--cyan); }
.tab-btn.on::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--cyan), var(--violet)); border-radius: 2px; }

.toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 1.25rem; }
.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  backdrop-filter: blur(8px);
}
.toggle-label { font-size: 0.82rem; color: var(--text); }
.toggle-sw {
  width: 38px;
  height: 22px;
  background: rgba(255,255,255,0.06);
  border-radius: 11px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid var(--border);
  flex-shrink: 0;
}
.toggle-sw.on { background: linear-gradient(90deg, var(--cyan), var(--violet)); border-color: transparent; box-shadow: 0 0 12px rgba(0,245,255,0.25); }
.toggle-sw::after { content: ''; position: absolute; width: 14px; height: 14px; background: #fff; border-radius: 50%; top: 3px; left: 3px; transition: transform 0.2s; }
.toggle-sw.on::after { transform: translateX(16px); }

.stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.7rem; margin-top: 1.5rem; animation: fadeUp 0.3s ease; }
.stat-card {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 0.75rem;
  text-align: center;
  backdrop-filter: blur(8px);
  transition: border-color 0.2s;
}
.stat-card:hover { border-color: rgba(0,245,255,0.2); }
.stat-val {
  font-family: 'Syne', sans-serif;
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--cyan), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.stat-lbl { font-size: 0.6rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.15rem; }

.pwd-box {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 1.1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  backdrop-filter: blur(8px);
  transition: border-color 0.2s;
}
.pwd-box:hover { border-color: rgba(0,245,255,0.2); }
.pwd-text {
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  word-break: break-all;
  color: var(--cyan);
  line-height: 1.5;
  flex: 1;
  text-shadow: 0 0 10px rgba(0,245,255,0.3);
}

.tz-cards { display: flex; flex-direction: column; gap: 0.7rem; margin-top: 1.75rem; animation: fadeUp 0.35s ease; }
.tz-card {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(8px);
}
.tz-card.src { border-color: rgba(0,245,255,0.3); box-shadow: 0 0 20px rgba(0,245,255,0.05); }
.tz-zone { font-size: 0.72rem; color: var(--muted); }
.tz-time {
  font-family: 'Syne', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}
.swap-btn {
  background: var(--glass);
  border: 1px solid var(--border);
  color: var(--text2);
  padding: 0 1.1rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  height: 46px;
  flex-shrink: 0;
  backdrop-filter: blur(8px);
}
.swap-btn:hover { border-color: rgba(0,245,255,0.35); color: var(--cyan); box-shadow: 0 0 15px rgba(0,245,255,0.1); }

/* ── Affiliate cards ── */
.affiliate-section { max-width: 820px; margin: 0 auto; padding: 0 2.5rem 1rem; }
.aff-hd {
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.aff-hd::after { content: ''; flex: 1; height: 1px; background: linear-gradient(to right, var(--border), transparent); }
.aff-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.6rem; }
.aff-card {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.22s;
  text-decoration: none;
  display: block;
  backdrop-filter: blur(8px);
}
.aff-card:hover { border-color: rgba(0,245,255,0.3); background: var(--glass2); transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,0,0,0.3), 0 0 20px rgba(0,245,255,0.07); }
.aff-icon { font-size: 1.5rem; margin-bottom: 0.4rem; }
.aff-name { font-family: 'Syne', sans-serif; font-size: 0.82rem; font-weight: 700; color: var(--text); }
.aff-desc { font-size: 0.67rem; color: var(--muted); margin-top: 0.2rem; }
.aff-cta { font-size: 0.63rem; color: var(--cyan); margin-top: 0.35rem; }

/* ── FAQ ── */
.faq-section { max-width: 820px; margin: 0 auto; padding: 2rem 2.5rem 1rem; }
.faq-title { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-bottom: 1.25rem; }
.faq-item { border-top: 1px solid var(--border); padding: 1rem 0; }
.faq-q { font-size: 0.88rem; font-weight: 500; color: var(--text); margin-bottom: 0; cursor: pointer; display: flex; justify-content: space-between; gap:1rem; }
.faq-q span:last-child { color: var(--cyan); flex-shrink: 0; }
.faq-a { font-size: 0.82rem; color: var(--text2); line-height: 1.75; padding-top: 0.65rem; }

.related-section { max-width: 820px; margin: 0 auto; padding: 1rem 2.5rem 3rem; }
.related-title { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }
.related-grid { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.related-chip {
  padding: 0.38rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.77rem;
  color: var(--text2);
  cursor: pointer;
  transition: all 0.18s;
  background: var(--glass);
  backdrop-filter: blur(8px);
}
.related-chip:hover { color: var(--cyan); border-color: rgba(0,245,255,0.35); background: var(--cyan-dim); }

/* ── SEO why block ── */
.why-section { max-width: 1280px; margin: 0 auto; padding: 1rem 2.5rem 4rem; }
.why-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px,1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; margin-top: 1.5rem; }
.why-block {
  background: var(--glass);
  backdrop-filter: blur(12px);
  padding: 2rem;
  transition: background 0.2s;
}
.why-block:hover { background: var(--glass2); }
.why-icon { font-size: 1.5rem; margin-bottom: 0.85rem; }
.why-block h3 { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.6rem; color: var(--text); letter-spacing: -0.01em; }
.why-block p { font-size: 0.8rem; color: var(--text2); line-height: 1.75; }
.kw-row { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.85rem; }
.kw { font-size: 0.62rem; color: var(--muted); background: rgba(255,255,255,0.04); border: 1px solid var(--border); padding: 0.16rem 0.52rem; border-radius: 4px; }

/* ── Footer ── */
.footer { text-align: center; padding: 4rem 2.5rem; border-top: 1px solid var(--border); }
.footer-logo {
  font-family: 'Syne', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--cyan), var(--violet), var(--pink));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  display: inline-block;
}
.footer-sub { font-size: 0.78rem; color: var(--muted); line-height: 2; }
.footer-links { display: flex; justify-content: center; flex-wrap: wrap; gap: 0.4rem 1.25rem; margin: 0.85rem 0; }
.footer-link { font-size: 0.75rem; color: var(--muted); cursor: pointer; transition: color 0.2s; }
.footer-link:hover { color: var(--cyan); }

@media(max-width:640px){
  .hero h1 { font-size: 2.8rem; }
  .stats-row { flex-direction: column; }
  .stat-item { border-right: none; border-bottom: 1px solid var(--border); }
  .stat-item:last-child { border-bottom: none; }
  .row, .calc-grid, .toggle-grid, .stats-grid { grid-template-columns: 1fr; }
  .tools-grid { grid-template-columns: 1fr; }
  .header, .tool-nav { padding: 1rem 1.25rem; }
  .tool-content, .seo-hero, .affiliate-section, .related-section, .faq-section, .tools-section, .why-section { padding-left: 1.25rem; padding-right: 1.25rem; }
  .hero { padding: 4rem 1.25rem 3rem; }
  .pwd-box { flex-direction: column; align-items: flex-start; }
  .tz-card { flex-direction: column; align-items: flex-start; gap: 0.3rem; }
}
`;

// ─── AI helper ──────────────────────────────────────────────────────
async function ai(user, system="") {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages:[{role:"user",content:user}] })
  });
  const d = await r.json(); return d.content[0].text;
}
function Spin(){ return <span className="spinner"/>; }
function Loading({msg}){ return <div className="loading-box"><Spin/>{msg}</div>; }

// ── Affiliate sections ──────────────────────────────────────────────
function MealKits(){
  const items=[{icon:"🟢",name:"HelloFresh",desc:"Most popular — 16 free meals",cta:"Claim offer →",url:"https://hellofresh.com"},{icon:"🔵",name:"EveryPlate",desc:"From $4.99/serving",cta:"Get started →",url:"https://everyplate.com"},{icon:"🌿",name:"Green Chef",desc:"Certified organic",cta:"Try it →",url:"https://greenchef.com"},{icon:"🍷",name:"Blue Apron",desc:"Chef-designed recipes",cta:"View plans →",url:"https://blueapron.com"}];
  return(<div className="affiliate-section"><div className="aff-hd">Recommended Meal Kit Services</div><div className="aff-grid">{items.map(i=><a key={i.name} className="aff-card" href={i.url} target="_blank" rel="noopener noreferrer"><div className="aff-icon">{i.icon}</div><div className="aff-name">{i.name}</div><div className="aff-desc">{i.desc}</div><div className="aff-cta">{i.cta}</div></a>)}</div></div>);
}
function StreamingLinks(){
  const items=[{icon:"🔴",name:"Netflix",desc:"Originals & movies",cta:"Start streaming →",url:"https://netflix.com"},{icon:"📦",name:"Prime Video",desc:"Free with Prime",cta:"Watch now →",url:"https://amazon.com/prime"},{icon:"✨",name:"Disney+",desc:"Marvel, Star Wars",cta:"Subscribe →",url:"https://disneyplus.com"},{icon:"🍎",name:"Apple TV+",desc:"Award-winning originals",cta:"Free trial →",url:"https://tv.apple.com"},{icon:"🟣",name:"Max",desc:"HBO & originals",cta:"Watch now →",url:"https://max.com"},{icon:"🟡",name:"Hulu",desc:"Live TV + on-demand",cta:"Get Hulu →",url:"https://hulu.com"}];
  return(<div className="affiliate-section"><div className="aff-hd">Stream Your Picks Tonight</div><div className="aff-grid">{items.map(i=><a key={i.name} className="aff-card" href={i.url} target="_blank" rel="noopener noreferrer"><div className="aff-icon">{i.icon}</div><div className="aff-name">{i.name}</div><div className="aff-desc">{i.desc}</div><div className="aff-cta">{i.cta}</div></a>)}</div></div>);
}

// ── SEO landing wrapper ─────────────────────────────────────────────
const SEO={
  symptom:{ey:"Free Symptom Checker Online",h1:<><em>Symptom Checker</em> — AI Health Guidance Instantly</>,desc:"Describe your symptoms and get AI-powered guidance on possible causes, home care tips, and when to see a doctor.",chips:["Instant results","500+ conditions","Home care tips","Warning signs"],faqs:[{q:"Is this accurate?",a:"This tool provides general health information to help you understand possible causes. It is not diagnostic and does not replace professional medical advice."},{q:"Is my data private?",a:"Yes — your symptoms are processed in real-time and never stored or shared with anyone."},{q:"What symptoms can I check?",a:"Any physical symptom — pain, fever, rashes, digestive issues, fatigue, respiratory symptoms, and much more."}],rel:["Health Calculator","Calorie Counter","Budget Calculator"]},
  recipe:{ey:"Recipe Finder — What Can I Cook With These Ingredients",h1:<><em>Recipe Finder</em> — Cook Anything From What You Have</>,desc:"Enter the ingredients in your kitchen and get two complete, step-by-step recipes instantly. Works with any combination.",chips:["Any ingredients","Dietary filters","Step-by-step instructions","Instant"],faqs:[{q:"How many ingredients do I need?",a:"Even 2–3 ingredients works. The more you add, the more tailored the recipes."},{q:"Does it support dietary restrictions?",a:"Yes — vegetarian, vegan, gluten-free, keto, dairy-free, and low-carb."},{q:"Are the recipes beginner-friendly?",a:"All recipes include clear numbered steps for any skill level."}],rel:["Calorie Counter","Health Calculator","Budget Calculator"]},
  watch:{ey:"What to Watch Tonight — AI Movie & TV Recommendations",h1:<><em>What to Watch</em> Tonight — AI Picks for Your Mood</>,desc:"Tell us your mood and get five handpicked movie and TV show recommendations instantly — no scrolling required.",chips:["Mood-based picks","Movies & series","Platform info","Hidden gems"],faqs:[{q:"How does the recommendation work?",a:"Our AI analyzes your mood, content type, and genre preference to curate five perfectly matched recommendations."},{q:"Which platforms are included?",a:"Netflix, Prime Video, Disney+, Apple TV+, Max, Hulu and more."},{q:"Can I filter by genre?",a:"Yes — Drama, Comedy, Action, Horror, Romance, Thriller, Sci-Fi, Fantasy, Crime."}],rel:["AI Writer","Symptom Checker","Age Calculator"]},
  writer:{ey:"Free AI Writing Tool — Cover Letters Emails Captions",h1:<><em>AI Writer</em> — Perfect Words, Instantly</>,desc:"Generate cover letters, professional emails, Instagram captions, TikTok scripts, LinkedIn posts and more in seconds.",chips:["10+ content types","7 tone options","Ready to send","No templates"],faqs:[{q:"What can I generate?",a:"Cover letters, professional emails, Instagram captions, TikTok scripts, LinkedIn posts, apology messages, thank you notes, text messages, product descriptions, and bios."},{q:"How human-sounding is it?",a:"The AI writes in a natural, human voice specific to your context — not generic AI text."},{q:"Can I edit the output?",a:"Absolutely — one-click copy makes it easy to paste and edit anywhere."}],rel:["Word Counter","Recipe Finder","Symptom Checker"]},
  health:{ey:"Free BMI Calculator & Health Calculator",h1:<><em>BMI Calculator</em> — Calories, Macros & More</>,desc:"Calculate your BMI, daily calorie needs, ideal weight, water intake, and macro targets instantly. The most complete free health calculator.",chips:["BMI & category","Daily calories","Water intake","Macro breakdown"],faqs:[{q:"How accurate is BMI?",a:"BMI uses the WHO formula (weight ÷ height²). It's a useful general indicator but doesn't account for muscle mass."},{q:"How are calories calculated?",a:"We use the Mifflin-St Jeor equation — the most accurate formula — combined with your activity multiplier."},{q:"What's a healthy BMI?",a:"18.5–24.9 is normal. Under 18.5 is underweight, 25–29.9 is overweight, 30+ is obese."}],rel:["Symptom Checker","Calorie Counter","Budget Calculator"]},
  budget:{ey:"Free Monthly Budget Calculator",h1:<><em>Budget Calculator</em> — Track Every Dollar</>,desc:"Enter your income and monthly expenses to see exactly where your money goes, your real savings rate, and annual projections.",chips:["Visual breakdown","Savings rate","Annual projections","7 categories"],faqs:[{q:"How should I budget?",a:"The 50/30/20 rule: 50% needs, 30% wants, 20% savings. Our calculator shows you exactly where you stand."},{q:"What's a good savings rate?",a:"Financial experts recommend at least 20%. Above 30% puts you on track for financial independence."},{q:"Why track expenses?",a:"Most people underestimate spending by 20–40%. Seeing the visual breakdown reveals easy areas to cut back."}],rel:["Loan Calculator","Tip Calculator","Percentage Calculator"]},
  currency:{ey:"Free Live Currency Converter",h1:<><em>Currency Converter</em> — Live Exchange Rates</>,desc:"Convert between 30+ global currencies using live exchange rates. Includes African currencies — NGN, GHS, KES, ZAR.",chips:["Live rates","30+ currencies","African currencies","Instant"],faqs:[{q:"Are rates live?",a:"Yes — fetched in real-time from open exchange rate APIs every conversion."},{q:"Which currencies?",a:"USD, EUR, GBP, JPY, NGN, GHS, KES, ZAR, AED, INR, CNY, and 20+ more."},{q:"How often do rates change?",a:"FX rates fluctuate constantly. Our rates update in real-time with each conversion."}],rel:["Percentage Calculator","Budget Calculator","Tip Calculator"]},
  loan:{ey:"Free Loan Calculator — Monthly Payment Calculator",h1:<><em>Loan Calculator</em> — Monthly Payment & Total Interest</>,desc:"Calculate your exact monthly payment, total interest, and full loan cost for any loan — mortgage, car, personal, or student.",chips:["Monthly payment","Total interest","Any loan type","Amortization"],faqs:[{q:"How is payment calculated?",a:"We use the standard amortization formula: M = P[r(1+r)^n]/[(1+r)^n-1] where P is principal, r is monthly rate, n is number of payments."},{q:"What's a good personal loan rate?",a:"6–12% APR is generally considered good for personal loans."},{q:"Does this work for mortgages?",a:"Yes — enter your loan amount, interest rate, and term to get your full mortgage payment breakdown."}],rel:["Budget Calculator","Percentage Calculator","Currency Calculator"]},
  age:{ey:"Free Age Calculator — Exact Age in Years Days Hours",h1:<><em>Age Calculator</em> — Your Exact Age & More</>,desc:"Your precise age in years, months, and days — plus zodiac sign, birthstone, day of week born, and days to your next birthday.",chips:["Exact to the day","Zodiac & birthstone","Days to birthday","Born-on weekday"],faqs:[{q:"How exact is it?",a:"Precise to years, months, and days — accounting for leap years and varying month lengths."},{q:"What else does it show?",a:"Total days lived, days to next birthday, zodiac sign, birthstone, day of week born, and generation decade."},{q:"Can I use any date?",a:"Yes — any valid past date works."}],rel:["Time Zone Converter","Word Counter","Random Number Generator"]},
  word:{ey:"Free Word Counter — Character Count & Reading Time",h1:<><em>Word Counter</em> — Live Text Analysis</>,desc:"Count words, characters, sentences, and paragraphs in real time. Get reading time, speaking time, unique word count, and more.",chips:["Live count","Reading time","Speaking time","Unique words"],faqs:[{q:"How is reading time calculated?",a:"At 200 words per minute — the average adult silent reading speed."},{q:"What is speaking time?",a:"Estimated at 130 words per minute — the average comfortable speaking pace."},{q:"Characters with or without spaces?",a:"We show both so you can meet any requirement."}],rel:["AI Writer","Password Generator","Percentage Calculator"]},
  password:{ey:"Free Strong Password Generator",h1:<><em>Password Generator</em> — Secure & Random</>,desc:"Generate 3 strong, random passwords in one click. Choose your length and character types. Never use a weak password again.",chips:["3 passwords at once","Up to 64 chars","Strength meter","Symbols option"],faqs:[{q:"How strong are they?",a:"A 16-char password with all character types has ~10^29 possible combinations — effectively uncrackable."},{q:"Are they saved?",a:"No — generated entirely in your browser, never transmitted or stored."},{q:"What length?",a:"Security experts recommend at least 16 characters. For banking/email, use 20+ with all types enabled."}],rel:["Word Counter","AI Writer","Unit Converter"]},
  percent:{ey:"Free Percentage Calculator Online",h1:<><em>Percentage Calculator</em> — Three Types in One</>,desc:"Calculate any percentage problem: what percent of a number, what percentage one number is of another, or percentage change.",chips:["Three modes","Instant results","Percentage change","No sign-up"],faqs:[{q:"What are the three modes?",a:"1) What is X% of Y. 2) X is what % of Y. 3) Percentage change from X to Y."},{q:"How do I calculate a discount?",a:"Mode 1: enter the discount % and original price to find the amount off."},{q:"How do I calculate % increase?",a:"Mode 3: enter original value as X and new value as Y."}],rel:["Tip Calculator","Budget Calculator","Loan Calculator"]},
  tip:{ey:"Free Tip Calculator — Split Bill Calculator",h1:<><em>Tip Calculator</em> — Split Any Bill Instantly</>,desc:"Calculate tips and split any restaurant bill. Choose your tip %, enter how many people, see exactly what each person pays.",chips:["Any tip %","Bill splitting","Per-person","Custom tip"],faqs:[{q:"Standard tip %?",a:"15% for adequate service, 18–20% standard, 25%+ for exceptional."},{q:"Unequal splits?",a:"Calculate the total + tip, then divide as agreed between the group."},{q:"Pre-tax or post-tax?",a:"Technically on pre-tax, but tipping on the total is common for simplicity."}],rel:["Budget Calculator","Percentage Calculator","Currency Converter"]},
  unit:{ey:"Free Unit Converter — Length Weight Temperature Speed",h1:<><em>Unit Converter</em> — Any Unit, Instantly</>,desc:"Convert between any units of measurement — length, weight, temperature, volume, speed, and data storage.",chips:["6 categories","Instant","Temperature","Data storage"],faqs:[{q:"Which categories?",a:"Length, Weight, Temperature, Volume, Speed, and Data."},{q:"Celsius to Fahrenheit?",a:"Select Temperature, enter value, choose Celsius → Fahrenheit."},{q:"Kilometers to miles?",a:"Select Length, enter value, choose Kilometer → Mile."}],rel:["Currency Converter","Percentage Calculator","Age Calculator"]},
  timezone:{ey:"Free Time Zone Converter — World Time Zones",h1:<><em>Time Zone Converter</em> — Global Time, Instantly</>,desc:"Convert any time across up to 3 global time zones at once. Covers Africa, Asia, Europe, and the Americas.",chips:["3 zones at once","20+ time zones","African cities","DST aware"],faqs:[{q:"Which zones?",a:"UTC, New York, LA, London, Paris, Dubai, Mumbai, Lagos, Accra, Nairobi, Tokyo, Sydney, and more."},{q:"Does it handle DST?",a:"Yes — uses your browser's Intl API which auto-accounts for daylight saving changes."},{q:"Why do I need this?",a:"For global calls, international scheduling, or coordinating across continents."}],rel:["Age Calculator","Currency Converter","Unit Converter"]},
  gpa:{ey:"Free GPA Calculator — College Cumulative GPA",h1:<><em>GPA Calculator</em> — Calculate Your GPA Instantly</>,desc:"Calculate semester or cumulative GPA by entering courses, grades, and credit hours. Supports letter grades and 4.0 scale.",chips:["Letter grades","Credit weighting","Cumulative GPA","Academic standing"],faqs:[{q:"How is GPA calculated?",a:"GPA = Σ(grade points × credit hours) ÷ total credit hours. An A (4.0) in a 3-credit course = 12 grade points."},{q:"GPA for honor roll?",a:"Most schools require 3.5 for Dean's List and 3.0 for honor roll."},{q:"Plus/minus grades?",a:"Yes — A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F all supported."}],rel:["Word Counter","Percentage Calculator","Budget Calculator"]},
  calorie:{ey:"Free Calorie Counter — AI Food Nutrition Lookup",h1:<><em>Calorie Counter</em> — Full Nutrition for Any Food</>,desc:"AI-powered calorie and nutrition lookup for any food, meal, or restaurant dish. Protein, carbs, fat, fiber — instantly.",chips:["Any food","Calories & macros","Restaurant meals","AI-powered"],faqs:[{q:"How accurate?",a:"Based on standard nutritional databases. Values are typical estimates — actual calories vary by preparation and portion."},{q:"Restaurant meals?",a:"Yes — describe the restaurant and dish, e.g. 'McDonald's Big Mac' or 'Chipotle chicken burrito bowl'."},{q:"What macros shown?",a:"Calories, protein, carbohydrates, fat, fiber, and sugar per typical serving."}],rel:["Health Calculator","Recipe Finder","Symptom Checker"]},
  random:{ey:"Free Random Number Generator Online",h1:<><em>Random Number Generator</em> — Any Range, Any Count</>,desc:"Generate truly random numbers between any range. Choose count, allow or exclude duplicates, sort order — up to 500 at once.",chips:["Any range","Up to 500","No duplicates","Sorted output"],faqs:[{q:"Are they truly random?",a:"Generated using JavaScript's crypto.getRandomValues API — cryptographically strong randomness."},{q:"What's it used for?",a:"Lottery numbers, raffle draws, random sampling, dice rolls, picking winners, and more."},{q:"Maximum count?",a:"Up to 500 numbers at once."}],rel:["Password Generator","Percentage Calculator","Age Calculator"]},
};

function SEOLanding({id, children, onRelated}){
  const d=SEO[id];
  const [open,setOpen]=useState(null);
  if(!d) return <div className="tool-content">{children}</div>;
  return(
    <>
      <div className="seo-hero">
        <div className="seo-eyebrow">{d.ey}</div>
        <h1>{d.h1}</h1>
        <p>{d.desc}</p>
        <div className="seo-chips">{d.chips.map(c=><span key={c} className="seo-chip">{c}</span>)}</div>
      </div>
      <div className="tool-content">{children}</div>
      {id==='recipe'&&<MealKits/>}
      {id==='watch'&&<StreamingLinks/>}
      {d.faqs&&<div className="faq-section">
        <div className="faq-title">Frequently Asked Questions</div>
        {d.faqs.map((f,i)=><div key={i} className="faq-item">
          <div className="faq-q" onClick={()=>setOpen(open===i?null:i)}><span>{f.q}</span><span>{open===i?'−':'+'}</span></div>
          {open===i&&<div className="faq-a">{f.a}</div>}
        </div>)}
      </div>}
      {d.rel&&<div className="related-section">
        <div className="related-title">You Might Also Like</div>
        <div className="related-grid">{d.rel.map(r=><button key={r} className="related-chip" onClick={()=>onRelated&&onRelated(r)}>{r}</button>)}</div>
      </div>}
    </>
  );
}

// ══════════════════════════════════════════════════════════
// TOOL COMPONENTS
// ══════════════════════════════════════════════════════════

function SymptomChecker(){
  const [age,setAge]=useState(""),[symp,setSymp]=useState(""),[res,setRes]=useState(""),[load,setLoad]=useState(false);
  const run=async()=>{setLoad(true);setRes("");try{const t=await ai(`Age:${age||"unknown"}. Symptoms:${symp}`,`You are a caring health info assistant. For described symptoms: 1) 3-5 possible causes most to least likely 2) Plain explanation 3) Home care tips 4) Warning signs to see a doctor. End: "⚠️ Always consult a healthcare professional."`);setRes(t);}catch{setRes("Something went wrong.");}setLoad(false);};
  return(<div><h2>🩺 Symptom Checker</h2><p className="subtitle">Describe what you're feeling and get clear AI-powered guidance. Not a substitute for professional medical advice.</p>
    <div className="row"><div className="field"><label>Age (optional)</label><input type="number" placeholder="e.g. 28" value={age} onChange={e=>setAge(e.target.value)}/></div></div>
    <div className="field"><label>Your Symptoms</label><textarea placeholder="e.g. headache, mild fever, sore throat since yesterday morning..." value={symp} onChange={e=>setSymp(e.target.value)} style={{minHeight:120}}/></div>
    <button className="btn btn-primary" onClick={run} disabled={load||!symp.trim()}>{load?<><Spin/>Analyzing...</>:"Check Symptoms →"}</button>
    {load&&<Loading msg="Reviewing your symptoms..."/>}
    {res&&!load&&<div className="result-box"><div className="result-label">Health Guidance</div><div className="result-text">{res}</div></div>}
  </div>);
}

function RecipeFinder(){
  const [ing,setIng]=useState(""),[diet,setDiet]=useState("None"),[res,setRes]=useState(""),[load,setLoad]=useState(false);
  const DIETS=["None","Vegetarian","Vegan","Gluten-Free","Keto","Dairy-Free","Low-Carb"];
  const run=async()=>{setLoad(true);setRes("");try{const t=await ai(`Ingredients:${ing}. Diet:${diet}`,`You are a creative chef. Suggest exactly 2 recipes. For each: name, cook time, ingredients (mark available with ✓), numbered steps, one pro tip.`);setRes(t);}catch{setRes("Something went wrong.");}setLoad(false);};
  return(<div><h2>🍳 Recipe Finder</h2><p className="subtitle">Type what's in your kitchen and get two complete recipes — right now.</p>
    <div className="field"><label>Ingredients You Have</label><textarea placeholder="e.g. chicken breast, garlic, olive oil, lemon, pasta, spinach..." value={ing} onChange={e=>setIng(e.target.value)}/></div>
    <div className="field"><label>Dietary Preference</label><div className="option-grid">{DIETS.map(d=><button key={d} className={`opt-btn ${diet===d?'on':''}`} onClick={()=>setDiet(d)}>{d}</button>)}</div></div>
    <button className="btn btn-primary" onClick={run} disabled={load||!ing.trim()}>{load?<><Spin/>Finding recipes...</>:"Find Recipes →"}</button>
    {load&&<Loading msg="Cooking up your recipes..."/>}
    {res&&!load&&<div className="result-box"><div className="result-label">Your Recipes</div><div className="result-text">{res}</div></div>}
  </div>);
}

function WatchPicker(){
  const [mood,setMood]=useState(""),[type,setType]=useState("Any"),[genre,setGenre]=useState(""),[res,setRes]=useState(""),[load,setLoad]=useState(false);
  const MOODS=["😊 Happy","😢 Emotional","😤 Unwind","😴 Chill","🤩 Hyped","🤔 Thoughtful"];
  const TYPES=["Movie","Series","Documentary","Anime","Any"];
  const GENRES=["Drama","Comedy","Action","Horror","Romance","Thriller","Sci-Fi","Fantasy","Crime"];
  const run=async()=>{setLoad(true);setRes("");try{const t=await ai(`Mood:${mood||"neutral"}. Type:${type}. Genre:${genre||"any"}.`,`Expert film critic. Give exactly 5 recommendations (mix known + hidden gems). For each: 🎬 Title (Year) — Platform, one punchy sentence why it fits this mood, ⭐ X/10.`);setRes(t);}catch{setRes("Something went wrong.");}setLoad(false);};
  return(<div><h2>📺 What to Watch</h2><p className="subtitle">Tell me your mood and get five handpicked recommendations — no endless scrolling.</p>
    <div className="field"><label>How Are You Feeling?</label><div className="option-grid">{MOODS.map(m=><button key={m} className={`opt-btn ${mood===m?'on':''}`} onClick={()=>setMood(m===mood?'':m)}>{m}</button>)}</div></div>
    <div className="field"><label>Type</label><div className="option-grid">{TYPES.map(t=><button key={t} className={`opt-btn ${type===t?'on':''}`} onClick={()=>setType(t)}>{t}</button>)}</div></div>
    <div className="field"><label>Genre (Optional)</label><div className="option-grid">{GENRES.map(g=><button key={g} className={`opt-btn ${genre===g?'on':''}`} onClick={()=>setGenre(g===genre?'':g)}>{g}</button>)}</div></div>
    <button className="btn btn-primary" onClick={run} disabled={load}>{load?<><Spin/>Finding picks...</>:"Get Recommendations →"}</button>
    {load&&<Loading msg="Curating your perfect picks..."/>}
    {res&&!load&&<div className="result-box"><div className="result-label">Your Picks Tonight</div><div className="result-text">{res}</div></div>}
  </div>);
}

function AIWriter(){
  const [type,setType]=useState(""),[tone,setTone]=useState("Professional"),[ctx,setCtx]=useState(""),[res,setRes]=useState(""),[load,setLoad]=useState(false),[cp,setCp]=useState(false);
  const TYPES=["Cover Letter","Professional Email","Instagram Caption","TikTok Script","LinkedIn Post","Apology Message","Thank You Note","Text Message","Product Description","Bio / About Me"];
  const TONES=["Professional","Friendly","Formal","Casual","Persuasive","Empathetic","Witty"];
  const run=async()=>{setLoad(true);setRes("");try{const t=await ai(`Write a ${type}. Tone:${tone}. Context:${ctx}`,`Expert copywriter. Write exactly what's asked — ready to send, no preamble. Human, natural, specific.`);setRes(t);}catch{setRes("Something went wrong.");}setLoad(false);};
  const copy=()=>{navigator.clipboard.writeText(res);setCp(true);setTimeout(()=>setCp(false),2000);};
  return(<div><h2>✍️ AI Writer</h2><p className="subtitle">Get the perfect words instantly — cover letters, emails, captions, scripts, and more.</p>
    <div className="field"><label>What Do You Need?</label><div className="option-grid">{TYPES.map(t=><button key={t} className={`opt-btn ${type===t?'on':''}`} onClick={()=>setType(t===type?'':t)}>{t}</button>)}</div></div>
    <div className="field"><label>Tone</label><div className="option-grid">{TONES.map(t=><button key={t} className={`opt-btn ${tone===t?'on':''}`} onClick={()=>setTone(t)}>{t}</button>)}</div></div>
    <div className="field"><label>Your Context</label><textarea placeholder="e.g. Applying for UX Designer role at a fintech startup. 4 years experience in product design..." value={ctx} onChange={e=>setCtx(e.target.value)} style={{minHeight:120}}/></div>
    <button className="btn btn-primary" onClick={run} disabled={load||!type||!ctx.trim()}>{load?<><Spin/>Writing...</>:"Write It →"}</button>
    {load&&<Loading msg={`Crafting your ${type||"content"}...`}/>}
    {res&&!load&&<div className="result-box"><div className="result-label">Your {type}</div><div className="result-text">{res}</div><button className={`copy-btn ${cp?'done':''}`} onClick={copy}>{cp?"✓ Copied!":"Copy to Clipboard"}</button></div>}
  </div>);
}

function CalorieCounter(){
  const [query,setQuery]=useState(""),[serving,setServing]=useState("1 serving"),[res,setRes]=useState(""),[load,setLoad]=useState(false);
  const QUICK=["1 cup oatmeal","Big Mac meal","Avocado toast","Banana","Grilled chicken 200g","Starbucks Frappuccino","2 scrambled eggs","Can of Coke"];
  const run=async()=>{setLoad(true);setRes("");try{const t=await ai(`Food:${query}. Serving:${serving}`,`Nutritionist with database access. Provide: 🍽️ Food name (serving size) • Calories: X kcal • Protein: Xg • Carbs: Xg (Fiber: Xg, Sugar: Xg) • Fat: Xg • Sodium: Xmg. Add a 2-sentence nutritional note. Be precise using standard database values.`);setRes(t);}catch{setRes("Something went wrong.");}setLoad(false);};
  return(<div><h2>🥗 Calorie Counter</h2><p className="subtitle">AI-powered nutrition lookup for any food, meal, or restaurant dish — calories, protein, carbs, fat, and more.</p>
    <div className="field"><label>What Did You Eat?</label><textarea placeholder="e.g. Chipotle chicken burrito bowl with rice, black beans, corn salsa, sour cream" value={query} onChange={e=>setQuery(e.target.value)} style={{minHeight:80}}/></div>
    <div className="field"><label>Quick Examples</label><div className="option-grid">{QUICK.map(q=><button key={q} className="opt-btn" onClick={()=>setQuery(q)}>{q}</button>)}</div></div>
    <div className="field"><label>Serving Size</label><input placeholder="e.g. 1 serving, 200g, 1 cup" value={serving} onChange={e=>setServing(e.target.value)}/></div>
    <button className="btn btn-primary" onClick={run} disabled={load||!query.trim()}>{load?<><Spin/>Looking up nutrition...</>:"Get Nutrition Info →"}</button>
    {load&&<Loading msg="Calculating nutritional information..."/>}
    {res&&!load&&<div className="result-box"><div className="result-label">Nutritional Information</div><div className="result-text">{res}</div></div>}
  </div>);
}

function BudgetCalc(){
  const [income,setIncome]=useState("");
  const [exp,setExp]=useState({housing:"",food:"",transport:"",utilities:"",entertainment:"",savings:"",other:""});
  const [res,setRes]=useState(null);
  const LABELS={housing:"🏠 Housing",food:"🍔 Food",transport:"🚗 Transport",utilities:"⚡ Utilities",entertainment:"🎬 Entertainment",savings:"💎 Savings",other:"📦 Other"};
  const COLORS={housing:"#00F5FF",food:"#00FFA3",transport:"#FF4D6D",utilities:"#BF5FFF",entertainment:"#FFD700",savings:"#60A5FA",other:"#6B7A99"};
  const calc=()=>{const inc=parseFloat(income)||0;const parsed=Object.fromEntries(Object.entries(exp).map(([k,v])=>[k,parseFloat(v)||0]));const total=Object.values(parsed).reduce((a,b)=>a+b,0);setRes({inc,parsed,total,left:inc-total,rate:inc>0?((parsed.savings/inc)*100).toFixed(1):0});};
  return(<div><h2>💰 Budget Calculator</h2><p className="subtitle">Enter your income and expenses to see exactly where every dollar goes — with visual breakdown.</p>
    <div className="field"><label>Monthly Income (after tax)</label><input type="number" placeholder="0.00" value={income} onChange={e=>setIncome(e.target.value)}/></div>
    <div className="row">{Object.keys(exp).map(k=><div className="field" key={k}><label>{LABELS[k]}</label><input type="number" placeholder="0.00" value={exp[k]} onChange={e=>setExp(p=>({...p,[k]:e.target.value}))}/></div>)}</div>
    <button className="btn btn-primary" onClick={calc} disabled={!income}>Calculate Budget →</button>
    {res&&<><div className="calc-grid">
      <div className="calc-card"><div className="calc-val" style={{background:res.left>=0?'linear-gradient(135deg,#00FFA3,#00F5FF)':'linear-gradient(135deg,#FF4D6D,#FF2D78)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>${Math.abs(res.left).toLocaleString()}</div><div className="calc-lbl">{res.left>=0?'Unallocated':'Deficit'}</div></div>
      <div className="calc-card"><div className="calc-val">{res.rate}%</div><div className="calc-lbl">Savings Rate</div></div>
      <div className="calc-card"><div className="calc-val">${res.total.toLocaleString()}</div><div className="calc-lbl">Total Expenses</div></div>
      <div className="calc-card"><div className="calc-val">${(res.parsed.savings*12).toLocaleString()}</div><div className="calc-lbl">Annual Savings</div></div>
    </div>
    <div className="result-box" style={{marginTop:'1rem'}}><div className="result-label">Expense Breakdown</div>
      {Object.entries(res.parsed).map(([k,v])=>v>0&&<div className="bar-row" key={k}><div className="bar-meta"><span style={{color:'var(--text)'}}>{LABELS[k]}</span><span style={{color:'var(--muted)'}}>${v.toLocaleString()} · {res.inc>0?((v/res.inc)*100).toFixed(1):0}%</span></div><div className="bar-track"><div className="bar-fill" style={{width:`${Math.min((v/res.inc)*100,100)}%`,background:COLORS[k],boxShadow:`0 0 6px ${COLORS[k]}55`}}/></div></div>)}
    </div></>}
  </div>);
}

function LoanCalc(){
  const [principal,setPrincipal]=useState(""),[rate,setRate]=useState(""),[term,setTerm]=useState(""),[unit,setUnit]=useState("years"),[res,setRes]=useState(null);
  const calc=()=>{const p=parseFloat(principal),r=parseFloat(rate)/100/12,n=unit==="years"?parseFloat(term)*12:parseFloat(term);if(!p||!r||!n)return;const monthly=p*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);const totalPaid=monthly*n,interest=totalPaid-p;setRes({monthly:monthly.toFixed(2),totalPaid:totalPaid.toFixed(2),interest:interest.toFixed(2),p:p.toFixed(2),pct:((p/totalPaid)*100).toFixed(1)});};
  return(<div><h2>🏦 Loan Calculator</h2><p className="subtitle">Calculate your exact monthly payment, total interest, and full loan cost for any type of loan.</p>
    <div className="field"><label>Loan Amount ($)</label><input type="number" placeholder="e.g. 25000" value={principal} onChange={e=>setPrincipal(e.target.value)}/></div>
    <div className="row">
      <div className="field"><label>Annual Interest Rate (%)</label><input type="number" placeholder="e.g. 6.5" step="0.1" value={rate} onChange={e=>setRate(e.target.value)}/></div>
      <div className="field"><label>Loan Term</label><div style={{display:'flex',gap:'0.5rem'}}><input type="number" placeholder="e.g. 5" value={term} onChange={e=>setTerm(e.target.value)} style={{flex:1}}/><select value={unit} onChange={e=>setUnit(e.target.value)} style={{width:'110px'}}><option value="years">Years</option><option value="months">Months</option></select></div></div>
    </div>
    <button className="btn btn-primary" onClick={calc} disabled={!principal||!rate||!term}>Calculate Loan →</button>
    {res&&<><div className="calc-grid">
      <div className="calc-card" style={{gridColumn:'1/-1'}}><div className="calc-val" style={{fontSize:'2.8rem'}}>${res.monthly}<span style={{fontSize:'1rem',WebkitTextFillColor:'var(--muted)',color:'var(--muted)'}}>/mo</span></div><div className="calc-lbl">Monthly Payment</div></div>
      <div className="calc-card"><div className="calc-val">${parseFloat(res.totalPaid).toLocaleString()}</div><div className="calc-lbl">Total Amount Paid</div></div>
      <div className="calc-card"><div className="calc-val" style={{background:'linear-gradient(135deg,#FF4D6D,#FF2D78)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>${parseFloat(res.interest).toLocaleString()}</div><div className="calc-lbl">Total Interest Paid</div></div>
      <div className="calc-card"><div className="calc-val" style={{background:'linear-gradient(135deg,#00FFA3,#00F5FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{res.pct}%</div><div className="calc-lbl">Principal of Total</div></div>
      <div className="calc-card"><div className="calc-val">${parseFloat(res.p).toLocaleString()}</div><div className="calc-lbl">Principal Borrowed</div></div>
    </div>
    <div className="result-box" style={{marginTop:'1rem'}}><div className="result-label">Loan Breakdown</div>
      <div className="bar-row"><div className="bar-meta"><span style={{color:'var(--text)'}}>Principal</span><span style={{color:'var(--muted)'}}>${parseFloat(res.p).toLocaleString()}</span></div><div className="bar-track"><div className="bar-fill" style={{width:`${res.pct}%`,background:'var(--success)',boxShadow:'0 0 6px rgba(0,255,163,0.4)'}}/></div></div>
      <div className="bar-row"><div className="bar-meta"><span style={{color:'var(--text)'}}>Interest</span><span style={{color:'var(--muted)'}}>${parseFloat(res.interest).toLocaleString()}</span></div><div className="bar-track"><div className="bar-fill" style={{width:`${100-parseFloat(res.pct)}%`,background:'var(--danger)',boxShadow:'0 0 6px rgba(255,77,109,0.4)'}}/></div></div>
    </div></>}
  </div>);
}

function HealthCalc(){
  const [gender,setGender]=useState("female"),[age,setAge]=useState(""),[height,setHeight]=useState(""),[weight,setWeight]=useState(""),[act,setAct]=useState("moderate"),[res,setRes]=useState(null);
  const ACTS=[{k:"sedentary",l:"Sedentary",m:1.2},{k:"light",l:"Light",m:1.375},{k:"moderate",l:"Moderate",m:1.55},{k:"active",l:"Very Active",m:1.725},{k:"athlete",l:"Athlete",m:1.9}];
  const calc=()=>{const h=parseFloat(height),w=parseFloat(weight),a=parseFloat(age);if(!h||!w||!a)return;const bmi=(w/(h/100)**2).toFixed(1);const cat=bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":"Obese";const bmr=gender==="male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;const mult=ACTS.find(x=>x.k===act)?.m||1.55;const tdee=Math.round(bmr*mult);setRes({bmi,cat,tdee,water:((w*35)/1000).toFixed(1),idealLow:Math.round(18.5*(h/100)**2),idealHigh:Math.round(24.9*(h/100)**2),loss:tdee-500,gain:tdee+300,protein:Math.round(tdee*0.25/4),carbs:Math.round(tdee*0.45/4)});};
  return(<div><h2>⚖️ Health Calculator</h2><p className="subtitle">BMI, daily calories, water intake, ideal weight range, and macros — all in one calculation.</p>
    <div className="field"><label>Sex</label><div className="option-grid"><button className={`opt-btn ${gender==='female'?'on':''}`} onClick={()=>setGender('female')}>Female</button><button className={`opt-btn ${gender==='male'?'on':''}`} onClick={()=>setGender('male')}>Male</button></div></div>
    <div className="row"><div className="field"><label>Age</label><input type="number" placeholder="e.g. 28" value={age} onChange={e=>setAge(e.target.value)}/></div><div className="field"><label>Height (cm)</label><input type="number" placeholder="e.g. 165" value={height} onChange={e=>setHeight(e.target.value)}/></div><div className="field"><label>Weight (kg)</label><input type="number" placeholder="e.g. 65" value={weight} onChange={e=>setWeight(e.target.value)}/></div></div>
    <div className="field"><label>Activity Level</label><div className="option-grid">{ACTS.map(a=><button key={a.k} className={`opt-btn ${act===a.k?'on':''}`} onClick={()=>setAct(a.k)}>{a.l}</button>)}</div></div>
    <button className="btn btn-primary" onClick={calc} disabled={!height||!weight||!age}>Calculate →</button>
    {res&&<div className="calc-grid">
      <div className="calc-card"><div className="calc-val">{res.bmi}</div><div className="calc-lbl">BMI · {res.cat}</div></div>
      <div className="calc-card"><div className="calc-val">{res.tdee}</div><div className="calc-lbl">Maintain (cal/day)</div></div>
      <div className="calc-card"><div className="calc-val">{res.water}L</div><div className="calc-lbl">Daily Water</div></div>
      <div className="calc-card"><div className="calc-val" style={{fontSize:'1.2rem'}}>{res.idealLow}–{res.idealHigh}kg</div><div className="calc-lbl">Ideal Weight Range</div></div>
      <div className="calc-card"><div className="calc-val" style={{background:'linear-gradient(135deg,#FF4D6D,#FF2D78)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{res.loss}</div><div className="calc-lbl">Weight Loss (cal)</div></div>
      <div className="calc-card"><div className="calc-val" style={{background:'linear-gradient(135deg,#00FFA3,#00F5FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{res.gain}</div><div className="calc-lbl">Weight Gain (cal)</div></div>
      <div className="calc-card"><div className="calc-val">{res.protein}g</div><div className="calc-lbl">Daily Protein</div></div>
      <div className="calc-card"><div className="calc-val">{res.carbs}g</div><div className="calc-lbl">Daily Carbs</div></div>
    </div>}
  </div>);
}

function CurrencyConverter(){
  const [amount,setAmount]=useState("1"),[from,setFrom]=useState("USD"),[to,setTo]=useState("EUR"),[result,setResult]=useState(null),[rate,setRate]=useState(null),[load,setLoad]=useState(false),[err,setErr]=useState("");
  const CURR=[{c:"USD",n:"US Dollar"},{c:"EUR",n:"Euro"},{c:"GBP",n:"British Pound"},{c:"JPY",n:"Japanese Yen"},{c:"CAD",n:"Canadian Dollar"},{c:"AUD",n:"Australian Dollar"},{c:"CHF",n:"Swiss Franc"},{c:"CNY",n:"Chinese Yuan"},{c:"INR",n:"Indian Rupee"},{c:"KRW",n:"South Korean Won"},{c:"MXN",n:"Mexican Peso"},{c:"BRL",n:"Brazilian Real"},{c:"SGD",n:"Singapore Dollar"},{c:"HKD",n:"Hong Kong Dollar"},{c:"ZAR",n:"South African Rand"},{c:"NGN",n:"Nigerian Naira"},{c:"GHS",n:"Ghanaian Cedi"},{c:"KES",n:"Kenyan Shilling"},{c:"EGP",n:"Egyptian Pound"},{c:"AED",n:"UAE Dirham"},{c:"SAR",n:"Saudi Riyal"},{c:"TRY",n:"Turkish Lira"},{c:"NOK",n:"Norwegian Krone"},{c:"SEK",n:"Swedish Krona"},{c:"NZD",n:"New Zealand Dollar"},{c:"MYR",n:"Malaysian Ringgit"},{c:"PHP",n:"Philippine Peso"},{c:"THB",n:"Thai Baht"},{c:"IDR",n:"Indonesian Rupiah"},{c:"PLN",n:"Polish Zloty"}];
  const convert=async()=>{setLoad(true);setErr("");setResult(null);try{const res=await fetch(`https://open.er-api.com/v6/latest/${from}`);const d=await res.json();if(d.result==="success"){const r=d.rates[to];setRate(r);setResult((parseFloat(amount)*r).toFixed(6).replace(/\.?0+$/,''));}else setErr("Could not fetch live rates.");}catch{setErr("Network error. Please check connection.");}setLoad(false);};
  const swap=()=>{setFrom(to);setTo(from);setResult(null);setRate(null);};
  return(<div><h2>💱 Currency Converter</h2><p className="subtitle">Live exchange rates for 30+ global currencies including NGN, GHS, KES, and ZAR.</p>
    <div className="field"><label>Amount</label><input type="number" value={amount} onChange={e=>{setAmount(e.target.value);setResult(null);}} placeholder="1.00"/></div>
    <div className="row"><div className="field"><label>From</label><select value={from} onChange={e=>{setFrom(e.target.value);setResult(null);}}>{CURR.map(c=><option key={c.c} value={c.c}>{c.c} — {c.n}</option>)}</select></div><div className="field"><label>To</label><select value={to} onChange={e=>{setTo(e.target.value);setResult(null);}}>{CURR.map(c=><option key={c.c} value={c.c}>{c.c} — {c.n}</option>)}</select></div></div>
    <div style={{display:'flex',gap:'0.75rem'}}><button className="btn btn-primary" onClick={convert} disabled={load||!amount} style={{flex:1}}>{load?<><Spin/>Fetching rate...</>:"Convert →"}</button><button className="swap-btn" onClick={swap} title="Swap">⇄</button></div>
    {result&&!load&&<div className="result-box" style={{textAlign:'center'}}><div style={{fontSize:'0.78rem',color:'var(--muted)',marginBottom:'0.5rem'}}>{amount} {from} equals</div><div className="big-num">{result} <span style={{fontSize:'1.4rem'}}>{to}</span></div><div style={{fontSize:'0.78rem',color:'var(--muted)',marginTop:'0.6rem'}}>1 {from} = {rate?.toFixed(4)} {to} · Live rate</div></div>}
    {err&&<div style={{color:'var(--danger)',marginTop:'1rem',fontSize:'0.85rem',padding:'0.75rem 1rem',background:'rgba(255,77,109,0.07)',borderRadius:'10px',border:'1px solid rgba(255,77,109,0.2)'}}>{err}</div>}
  </div>);
}

function PercentCalc(){
  const [tab,setTab]=useState(0),[a,setA]=useState(""),[b,setB]=useState("");
  const TABS=["What is X% of Y?","X is what % of Y?","% Change: X → Y"];
  const reset=i=>{setTab(i);setA("");setB("");};
  const av=parseFloat(a),bv=parseFloat(b);
  let result=null,desc="";
  if(!isNaN(av)&&!isNaN(bv)&&a&&b){if(tab===0){result=(av/100*bv).toFixed(2);desc=`${a}% of ${b} = ${result}`;}if(tab===1){result=(av/bv*100).toFixed(2)+"%";desc=`${a} is ${result} of ${b}`;}if(tab===2){const ch=((bv-av)/Math.abs(av)*100).toFixed(2);result=(parseFloat(ch)>=0?"+":"")+ch+"%";desc=`Change from ${a} to ${b}`;}}
  const isNeg=result&&result.startsWith('-');
  const CFGS=[[{l:"Percentage (%)",p:"e.g. 20"},{l:"Of Number",p:"e.g. 500"}],[{l:"Number (X)",p:"e.g. 75"},{l:"Total (Y)",p:"e.g. 300"}],[{l:"Original",p:"e.g. 200"},{l:"New Value",p:"e.g. 250"}]];
  const cfg=CFGS[tab];
  return(<div><h2>📊 Percentage Calculator</h2><p className="subtitle">Three types of percentage math — pick what you need and get an instant answer.</p>
    <div className="tab-row">{TABS.map((t,i)=><button key={t} className={`tab-btn ${tab===i?'on':''}`} onClick={()=>reset(i)}>{t}</button>)}</div>
    <div className="row"><div className="field"><label>{cfg[0].l}</label><input type="number" placeholder={cfg[0].p} value={a} onChange={e=>setA(e.target.value)}/></div><div className="field"><label>{cfg[1].l}</label><input type="number" placeholder={cfg[1].p} value={b} onChange={e=>setB(e.target.value)}/></div></div>
    {result&&<div className="result-box" style={{textAlign:'center'}}><div className="result-label">Result</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:'3.5rem',fontWeight:800,letterSpacing:'-0.02em',background:isNeg?'linear-gradient(135deg,#FF4D6D,#FF2D78)':tab===2?'linear-gradient(135deg,#00FFA3,#00F5FF)':'linear-gradient(135deg,var(--cyan),var(--violet))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{result}</div><div style={{color:'var(--muted)',fontSize:'0.82rem',marginTop:'0.4rem'}}>{desc}</div></div>}
  </div>);
}

function TipCalc(){
  const [bill,setBill]=useState(""),[tip,setTip]=useState(18),[people,setPeople]=useState("1"),[custom,setCustom]=useState("");
  const TIPS=[10,15,18,20,25];
  const eff=custom?parseFloat(custom)||0:tip;
  const billN=parseFloat(bill)||0,ppl=Math.max(1,parseInt(people)||1);
  const tipAmt=billN*eff/100,total=billN+tipAmt,perPerson=total/ppl,tipPer=tipAmt/ppl;
  return(<div><h2>🧾 Tip Calculator</h2><p className="subtitle">Calculate tips and split any bill for any group size — no awkward math at the table.</p>
    <div className="field"><label>Bill Amount ($)</label><input type="number" placeholder="0.00" value={bill} onChange={e=>setBill(e.target.value)}/></div>
    <div className="field"><label>Tip Percentage</label><div className="option-grid">{TIPS.map(t=><button key={t} className={`opt-btn ${tip===t&&!custom?'on':''}`} onClick={()=>{setTip(t);setCustom("");}}>{t}%</button>)}</div><input type="number" placeholder="Or enter custom %" value={custom} onChange={e=>setCustom(e.target.value)} style={{marginTop:'0.5rem'}}/></div>
    <div className="row"><div className="field"><label>Split Between (people)</label><input type="number" min="1" max="100" placeholder="1" value={people} onChange={e=>setPeople(e.target.value)}/></div></div>
    {bill&&<div className="calc-grid">
      <div className="calc-card"><div className="calc-val">${tipAmt.toFixed(2)}</div><div className="calc-lbl">Tip ({eff}%)</div></div>
      <div className="calc-card"><div className="calc-val">${total.toFixed(2)}</div><div className="calc-lbl">Total Bill</div></div>
      <div className="calc-card"><div className="calc-val" style={{background:'linear-gradient(135deg,#00FFA3,#00F5FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>${perPerson.toFixed(2)}</div><div className="calc-lbl">Each Person Pays</div></div>
      <div className="calc-card"><div className="calc-val" style={{background:'linear-gradient(135deg,#00FFA3,#00F5FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>${tipPer.toFixed(2)}</div><div className="calc-lbl">Tip Per Person</div></div>
    </div>}
  </div>);
}

function AgeCalculator(){
  const [dob,setDob]=useState(""),[res,setRes]=useState(null);
  const STONES=["Garnet","Amethyst","Aquamarine","Diamond","Emerald","Pearl","Ruby","Peridot","Sapphire","Opal","Topaz","Turquoise"];
  const calc=()=>{const birth=new Date(dob),now=new Date();let years=now.getFullYear()-birth.getFullYear(),months=now.getMonth()-birth.getMonth(),days=now.getDate()-birth.getDate();if(days<0){months--;days+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}if(months<0){years--;months+=12;}const totalDays=Math.floor((now-birth)/864e5);const next=new Date(now.getFullYear(),birth.getMonth(),birth.getDate());if(next<=now)next.setFullYear(now.getFullYear()+1);const daysToNext=Math.ceil((next-now)/864e5);const m=birth.getMonth()+1,d=birth.getDate();const zodiac=(m===12&&d>=22)||(m===1&&d<=19)?"Capricorn ♑":m===1||(m===2&&d<=18)?"Aquarius ♒":(m===2&&d>=19)||(m===3&&d<=20)?"Pisces ♓":(m===3&&d>=21)||(m===4&&d<=19)?"Aries ♈":(m===4&&d>=20)||(m===5&&d<=20)?"Taurus ♉":(m===5&&d>=21)||(m===6&&d<=20)?"Gemini ♊":(m===6&&d>=21)||(m===7&&d<=22)?"Cancer ♋":(m===7&&d>=23)||(m===8&&d<=22)?"Leo ♌":(m===8&&d>=23)||(m===9&&d<=22)?"Virgo ♍":(m===9&&d>=23)||(m===10&&d<=22)?"Libra ♎":(m===10&&d>=23)||(m===11&&d<=21)?"Scorpio ♏":"Sagittarius ♐";setRes({years,months,days,totalDays:totalDays.toLocaleString(),daysToNext,zodiac,stone:STONES[birth.getMonth()],dayOfWeek:birth.toLocaleDateString('en-US',{weekday:'long'}),decade:`${Math.floor(birth.getFullYear()/10)*10}s`});};
  return(<div><h2>🎂 Age Calculator</h2><p className="subtitle">Enter your birthday and discover your exact age, zodiac, birthstone, and days to your next birthday.</p>
    <div className="field"><label>Date of Birth</label><input type="date" value={dob} onChange={e=>setDob(e.target.value)} max={new Date().toISOString().split('T')[0]}/></div>
    <button className="btn btn-primary" onClick={calc} disabled={!dob}>Calculate My Age →</button>
    {res&&<><div style={{textAlign:'center',margin:'2rem 0 1.25rem'}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:'5.5rem',fontWeight:800,letterSpacing:'-0.04em',background:'linear-gradient(135deg,var(--cyan),var(--violet),var(--pink))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1}}>{res.years}</div>
      <div style={{color:'var(--text2)',fontSize:'0.9rem',marginTop:'0.5rem'}}>{res.months} months and {res.days} days old</div>
    </div>
    <div className="calc-grid">
      <div className="calc-card"><div className="calc-val">{res.totalDays}</div><div className="calc-lbl">Days Lived</div></div>
      <div className="calc-card"><div className="calc-val">{res.daysToNext}</div><div className="calc-lbl">Days to Birthday 🎉</div></div>
      <div className="calc-card"><div className="calc-val" style={{fontSize:'1.15rem'}}>{res.zodiac}</div><div className="calc-lbl">Zodiac Sign</div></div>
      <div className="calc-card"><div className="calc-val" style={{fontSize:'1.1rem'}}>{res.stone}</div><div className="calc-lbl">Birthstone 💎</div></div>
      <div className="calc-card"><div className="calc-val" style={{fontSize:'0.95rem'}}>{res.dayOfWeek}</div><div className="calc-lbl">Born On</div></div>
      <div className="calc-card"><div className="calc-val" style={{fontSize:'1.1rem'}}>{res.decade}</div><div className="calc-lbl">Generation</div></div>
    </div></>}
  </div>);
}

function WordCounter(){
  const [text,setText]=useState("");
  const words=text.trim()===""?0:text.trim().split(/\s+/).length;
  const chars=text.length,charsNS=text.replace(/\s/g,'').length;
  const sentences=text===""?0:(text.match(/[.!?]+/g)||[]).length;
  const paragraphs=text===""?0:text.split(/\n\s*\n/).filter(p=>p.trim()).length||1;
  const unique=text.trim()===""?0:new Set((text.toLowerCase().match(/\b\w+\b/g)||[])).size;
  const readMin=Math.max(1,Math.ceil(words/200)),speakMin=Math.max(1,Math.ceil(words/130));
  const longest=text.trim()===""?"-":(text.match(/\b\w+\b/g)||[]).reduce((a,b)=>b.length>a.length?b:a,"");
  return(<div><h2>📝 Word Counter</h2><p className="subtitle">Paste or type your text and get live stats — words, characters, reading time, and more.</p>
    <div className="field"><label>Your Text</label><textarea placeholder="Start typing or paste your text here..." value={text} onChange={e=>setText(e.target.value)} style={{minHeight:200}}/></div>
    {text&&<div className="stats-grid">
      <div className="stat-card"><div className="stat-val">{words.toLocaleString()}</div><div className="stat-lbl">Words</div></div>
      <div className="stat-card"><div className="stat-val">{chars.toLocaleString()}</div><div className="stat-lbl">Characters</div></div>
      <div className="stat-card"><div className="stat-val">{charsNS.toLocaleString()}</div><div className="stat-lbl">No Spaces</div></div>
      <div className="stat-card"><div className="stat-val">{sentences}</div><div className="stat-lbl">Sentences</div></div>
      <div className="stat-card"><div className="stat-val">{paragraphs}</div><div className="stat-lbl">Paragraphs</div></div>
      <div className="stat-card"><div className="stat-val">{unique}</div><div className="stat-lbl">Unique Words</div></div>
      <div className="stat-card"><div className="stat-val">{readMin}m</div><div className="stat-lbl">Read Time</div></div>
      <div className="stat-card"><div className="stat-val">{speakMin}m</div><div className="stat-lbl">Speak Time</div></div>
      <div className="stat-card"><div className="stat-val" style={{fontSize:'1rem',wordBreak:'break-all'}}>{longest}</div><div className="stat-lbl">Longest Word</div></div>
    </div>}
  </div>);
}

function PasswordGenerator(){
  const [length,setLength]=useState(16),[upper,setUpper]=useState(true),[lower,setLower]=useState(true),[nums,setNums]=useState(true),[syms,setSyms]=useState(false),[passwords,setPasswords]=useState([]),[copied,setCopied]=useState(null);
  const strength=()=>{const s=[upper,lower,nums,syms].filter(Boolean).length;if(length<8||s<2)return{l:"Weak",c:"var(--danger)",w:"20%"};if(length<12||s<3)return{l:"Fair",c:"#F59E0B",w:"50%"};if(length<16||s<4)return{l:"Strong",c:"var(--violet)",w:"75%"};return{l:"Very Strong",c:"var(--success)",w:"100%"};};
  const generate=()=>{let chars="";if(upper)chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(lower)chars+="abcdefghijklmnopqrstuvwxyz";if(nums)chars+="0123456789";if(syms)chars+="!@#$%^&*()_+-=[]{}|;:,.<>?";if(!chars)chars="abcdefghijklmnopqrstuvwxyz0123456789";const make=()=>Array.from({length},()=>chars[Math.floor(Math.random()*chars.length)]).join('');setPasswords([make(),make(),make()]);setCopied(null);};
  const copy=(pwd,i)=>{navigator.clipboard.writeText(pwd);setCopied(i);setTimeout(()=>setCopied(null),2000);};
  const s=strength();
  return(<div><h2>🔐 Password Generator</h2><p className="subtitle">Generate 3 strong, random passwords instantly — never use a weak password again.</p>
    <div className="field"><label>Length: <strong style={{color:'var(--cyan)'}}>{length} characters</strong></label><input type="range" min="6" max="64" value={length} onChange={e=>setLength(+e.target.value)} style={{width:'100%',accentColor:'var(--cyan)',margin:'0.5rem 0',cursor:'pointer'}}/><div style={{display:'flex',justifyContent:'space-between',fontSize:'0.68rem',color:'var(--muted)'}}><span>6</span><span>64</span></div></div>
    <div className="toggle-grid">{[{l:"Uppercase A–Z",v:upper,s:setUpper},{l:"Lowercase a–z",v:lower,s:setLower},{l:"Numbers 0–9",v:nums,s:setNums},{l:"Symbols !@#$",v:syms,s:setSyms}].map(({l,v,s})=><div className="toggle-item" key={l}><span className="toggle-label">{l}</span><button className={`toggle-sw ${v?'on':''}`} onClick={()=>s(!v)}/></div>)}</div>
    <div style={{margin:'0.75rem 0 1rem'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:'0.72rem',marginBottom:'0.35rem'}}><span style={{color:'var(--muted)'}}>Strength</span><span style={{color:s.c,fontWeight:600}}>{s.l}</span></div><div style={{height:'4px',background:'rgba(255,255,255,0.05)',borderRadius:'3px',overflow:'hidden'}}><div style={{height:'100%',width:s.w,background:s.c,borderRadius:'3px',transition:'all 0.35s',boxShadow:`0 0 8px ${s.c}88`}}/></div></div>
    <button className="btn btn-primary" onClick={generate}>Generate 3 Passwords →</button>
    {passwords.length>0&&<div style={{marginTop:'1.5rem',display:'flex',flexDirection:'column',gap:'0.7rem',animation:'fadeUp 0.3s ease'}}>{passwords.map((pwd,i)=><div key={i} className="pwd-box"><div className="pwd-text">{pwd}</div><button className={`copy-btn ${copied===i?'done':''}`} onClick={()=>copy(pwd,i)} style={{marginTop:0,flexShrink:0}}>{copied===i?"✓ Copied":"Copy"}</button></div>)}</div>}
  </div>);
}

function UnitConverter(){
  const CATS={Length:{units:["Millimeter","Centimeter","Meter","Kilometer","Inch","Foot","Yard","Mile"],toBase:{Millimeter:0.001,Centimeter:0.01,Meter:1,Kilometer:1000,Inch:0.0254,Foot:0.3048,Yard:0.9144,Mile:1609.344}},Weight:{units:["Milligram","Gram","Kilogram","Metric Ton","Ounce","Pound","Stone"],toBase:{Milligram:0.000001,Gram:0.001,Kilogram:1,"Metric Ton":1000,Ounce:0.0283495,Pound:0.453592,Stone:6.35029}},Temperature:{units:["Celsius","Fahrenheit","Kelvin"],special:true},Volume:{units:["Milliliter","Liter","Teaspoon","Tablespoon","Cup","Pint","Gallon"],toBase:{Milliliter:0.001,Liter:1,Teaspoon:0.00492892,Tablespoon:0.0147868,Cup:0.236588,Pint:0.473176,Gallon:3.78541}},Speed:{units:["m/s","km/h","mph","Knot"],toBase:{"m/s":1,"km/h":0.277778,mph:0.44704,Knot:0.514444}},Data:{units:["Bit","Byte","Kilobyte","Megabyte","Gigabyte","Terabyte"],toBase:{Bit:0.125,Byte:1,Kilobyte:1024,Megabyte:1048576,Gigabyte:1073741824,Terabyte:1099511627776}}};
  const [cat,setCat]=useState("Length"),[from,setFrom]=useState("Meter"),[to,setTo]=useState("Foot"),[val,setVal]=useState("");
  useEffect(()=>{const u=CATS[cat].units;setFrom(u[0]);setTo(u[1]);setVal("");},[cat]);
  const convert=()=>{const v=parseFloat(val);if(isNaN(v)||!from||!to)return null;const c=CATS[cat];if(c.special){let cel=from==="Celsius"?v:from==="Fahrenheit"?(v-32)*5/9:v-273.15;return to==="Celsius"?cel.toFixed(4):to==="Fahrenheit"?(cel*9/5+32).toFixed(4):(cel+273.15).toFixed(4);}return(v*c.toBase[from]/c.toBase[to]).toPrecision(6).replace(/\.?0+$/,'');};
  const result=convert();
  return(<div><h2>📐 Unit Converter</h2><p className="subtitle">Convert between any units — length, weight, temperature, volume, speed, and data.</p>
    <div className="field"><label>Category</label><div className="option-grid">{Object.keys(CATS).map(c=><button key={c} className={`opt-btn ${cat===c?'on':''}`} onClick={()=>setCat(c)}>{c}</button>)}</div></div>
    <div className="field"><label>Amount</label><input type="number" placeholder="Enter value..." value={val} onChange={e=>setVal(e.target.value)}/></div>
    <div className="row"><div className="field"><label>From</label><select value={from} onChange={e=>setFrom(e.target.value)}>{CATS[cat].units.map(u=><option key={u} value={u}>{u}</option>)}</select></div><div className="field"><label>To</label><select value={to} onChange={e=>setTo(e.target.value)}>{CATS[cat].units.map(u=><option key={u} value={u}>{u}</option>)}</select></div></div>
    {result!==null&&val&&<div className="result-box" style={{textAlign:'center'}}><div style={{fontSize:'0.78rem',color:'var(--muted)',marginBottom:'0.5rem'}}>{val} {from} =</div><div className="big-num">{result}</div><div style={{color:'var(--text2)',fontSize:'0.9rem',marginTop:'0.4rem'}}>{to}</div></div>}
  </div>);
}

function TimeZoneConverter(){
  const [time,setTime]=useState(()=>new Date().toTimeString().slice(0,5)),[date,setDate]=useState(()=>new Date().toISOString().split('T')[0]),[fromTZ,setFromTZ]=useState("UTC"),[toTZs,setToTZs]=useState(["America/New_York","Europe/London","Asia/Tokyo"]),[res,setRes]=useState(null);
  const TZS=[{l:"UTC",v:"UTC"},{l:"New York (ET)",v:"America/New_York"},{l:"Los Angeles (PT)",v:"America/Los_Angeles"},{l:"Chicago (CT)",v:"America/Chicago"},{l:"London (GMT/BST)",v:"Europe/London"},{l:"Paris (CET)",v:"Europe/Paris"},{l:"Dubai (GST)",v:"Asia/Dubai"},{l:"Mumbai (IST)",v:"Asia/Kolkata"},{l:"Lagos (WAT)",v:"Africa/Lagos"},{l:"Accra (GMT)",v:"Africa/Accra"},{l:"Nairobi (EAT)",v:"Africa/Nairobi"},{l:"Cairo (EET)",v:"Africa/Cairo"},{l:"Tokyo (JST)",v:"Asia/Tokyo"},{l:"Beijing (CST)",v:"Asia/Shanghai"},{l:"Singapore (SGT)",v:"Asia/Singapore"},{l:"Sydney (AEST)",v:"Australia/Sydney"},{l:"São Paulo (BRT)",v:"America/Sao_Paulo"},{l:"Johannesburg (SAST)",v:"Africa/Johannesburg"},{l:"Seoul (KST)",v:"Asia/Seoul"}];
  const convert=()=>{try{const inputDate=new Date(`${date}T${time}:00Z`);const srcStr=inputDate.toLocaleString('sv-SE',{timeZone:fromTZ});const srcDate=new Date(srcStr.replace(' ','T')+'Z');const offsetMs=inputDate-srcDate;const actualUtc=new Date(inputDate.getTime()+offsetMs);const results=toTZs.map(tz=>({label:TZS.find(t=>t.v===tz)?.l||tz,formatted:actualUtc.toLocaleString('en-US',{timeZone:tz,weekday:'short',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:true})}));setRes({results,srcLabel:TZS.find(t=>t.v===fromTZ)?.l||fromTZ});}catch(e){console.error(e);}};
  return(<div><h2>🌍 Time Zone Converter</h2><p className="subtitle">Convert any time across multiple zones at once — built for global teams and international scheduling.</p>
    <div className="row"><div className="field"><label>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></div><div className="field"><label>Time</label><input type="time" value={time} onChange={e=>setTime(e.target.value)}/></div></div>
    <div className="field"><label>From Time Zone</label><select value={fromTZ} onChange={e=>setFromTZ(e.target.value)}>{TZS.map(tz=><option key={tz.v} value={tz.v}>{tz.l}</option>)}</select></div>
    <div className="field"><label>Convert To (3 zones)</label>{[0,1,2].map(i=><select key={i} value={toTZs[i]} onChange={e=>setToTZs(p=>{const n=[...p];n[i]=e.target.value;return n;})} style={{marginBottom:'0.5rem'}}>{TZS.map(tz=><option key={tz.v} value={tz.v}>{tz.l}</option>)}</select>)}</div>
    <button className="btn btn-primary" onClick={convert}>Convert Time →</button>
    {res&&<div className="tz-cards"><div className="tz-card src"><div className="tz-zone" style={{color:'var(--cyan)'}}>◈ {res.srcLabel}</div><div className="tz-time">{time} · {new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div></div>{res.results.map((r,i)=><div key={i} className="tz-card"><div className="tz-zone">{r.label}</div><div className="tz-time">{r.formatted}</div></div>)}</div>}
  </div>);
}

function GPACalculator(){
  const GRADES=[{l:"A+",v:4.0},{l:"A",v:4.0},{l:"A-",v:3.7},{l:"B+",v:3.3},{l:"B",v:3.0},{l:"B-",v:2.7},{l:"C+",v:2.3},{l:"C",v:2.0},{l:"C-",v:1.7},{l:"D+",v:1.3},{l:"D",v:1.0},{l:"D-",v:0.7},{l:"F",v:0.0}];
  const [courses,setCourses]=useState([{name:"",grade:"A",credits:"3"},{name:"",grade:"B+",credits:"3"},{name:"",grade:"A-",credits:"3"}]),[gpa,setGpa]=useState(null);
  const addCourse=()=>setCourses(p=>[...p,{name:"",grade:"A",credits:"3"}]);
  const update=(i,f,v)=>setCourses(p=>p.map((c,idx)=>idx===i?{...c,[f]:v}:c));
  const remove=i=>setCourses(p=>p.filter((_,idx)=>idx!==i));
  const calc=()=>{const valid=courses.filter(c=>c.credits&&parseFloat(c.credits)>0);if(!valid.length)return;const tc=valid.reduce((s,c)=>s+parseFloat(c.credits),0),tp=valid.reduce((s,c)=>s+(GRADES.find(g=>g.l===c.grade)?.v||0)*parseFloat(c.credits),0),gv=(tp/tc).toFixed(3);const standing=gv>=3.9?"Summa Cum Laude 🏆":gv>=3.7?"Magna Cum Laude ⭐":gv>=3.5?"Cum Laude ✦":gv>=3.0?"Good Standing":gv>=2.0?"Satisfactory":"Academic Probation";setGpa({val:gv,tc,standing});};
  const inputStyle={background:'var(--glass)',border:'1px solid var(--border)',borderRadius:'9px',color:'var(--text)',fontFamily:'Inter,sans-serif',fontSize:'0.88rem',padding:'0.7rem 0.75rem',outline:'none'};
  return(<div><h2>🎓 GPA Calculator</h2><p className="subtitle">Calculate semester or cumulative GPA with full letter grade and credit hour support.</p>
    <div style={{display:'flex',flexDirection:'column',gap:'0.65rem',marginBottom:'1.25rem'}}>{courses.map((c,i)=><div key={i} style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
      <input placeholder={`Course ${i+1}`} value={c.name} onChange={e=>update(i,'name',e.target.value)} style={{...inputStyle,flex:2}}/>
      <select value={c.grade} onChange={e=>update(i,'grade',e.target.value)} style={{...inputStyle,flex:1,cursor:'pointer'}}>{GRADES.map(g=><option key={g.l} value={g.l}>{g.l} ({g.v.toFixed(1)})</option>)}</select>
      <input type="number" placeholder="Cred." value={c.credits} onChange={e=>update(i,'credits',e.target.value)} min="0" max="6" style={{...inputStyle,width:'70px'}}/>
      {courses.length>1&&<button onClick={()=>remove(i)} style={{background:'none',border:'1px solid var(--border)',color:'var(--muted)',borderRadius:'8px',cursor:'pointer',padding:'0.6rem 0.7rem',fontFamily:'Inter,sans-serif',fontSize:'0.8rem',transition:'all 0.2s'}}>✕</button>}
    </div>)}</div>
    <button onClick={addCourse} style={{background:'none',border:'1px solid var(--border)',color:'var(--muted)',borderRadius:'9px',cursor:'pointer',padding:'0.6rem 1.1rem',fontSize:'0.82rem',fontFamily:'Inter,sans-serif',display:'block',marginBottom:'1rem',transition:'all 0.2s'}}>+ Add Course</button>
    <button className="btn btn-primary" onClick={calc}>Calculate GPA →</button>
    {gpa&&<><div style={{textAlign:'center',margin:'2rem 0 1.25rem'}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:'5.5rem',fontWeight:800,letterSpacing:'-0.04em',background:'linear-gradient(135deg,var(--cyan),var(--violet),var(--pink))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1}}>{gpa.val}</div>
      <div style={{color:'var(--cyan)',fontSize:'0.92rem',fontWeight:600,marginTop:'0.5rem'}}>{gpa.standing}</div>
    </div>
    <div className="calc-grid"><div className="calc-card"><div className="calc-val">{gpa.tc}</div><div className="calc-lbl">Total Credits</div></div><div className="calc-card"><div className="calc-val">{courses.filter(c=>c.credits&&parseFloat(c.credits)>0).length}</div><div className="calc-lbl">Courses</div></div></div></>}
  </div>);
}

function RandomNumberGen(){
  const [min,setMin]=useState("1"),[max,setMax]=useState("100"),[count,setCount]=useState("1"),[unique,setUnique]=useState(false),[sort,setSort]=useState("none"),[numbers,setNumbers]=useState([]),[cp,setCp]=useState(false);
  const generate=()=>{const mn=parseInt(min)||0,mx=parseInt(max)||100,cnt=Math.min(Math.max(parseInt(count)||1,1),500);if(mn>=mx)return;let nums=[];if(unique){const range=mx-mn+1,actual=Math.min(cnt,range),pool=Array.from({length:range},(_,i)=>mn+i);for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}nums=pool.slice(0,actual);}else{for(let i=0;i<cnt;i++)nums.push(Math.floor(Math.random()*(mx-mn+1))+mn);}if(sort==="asc")nums.sort((a,b)=>a-b);if(sort==="desc")nums.sort((a,b)=>b-a);setNumbers(nums);};
  const copy=()=>{navigator.clipboard.writeText(numbers.join(', '));setCp(true);setTimeout(()=>setCp(false),2000);};
  const avg=numbers.length?((numbers.reduce((a,b)=>a+b,0))/numbers.length).toFixed(2):null;
  return(<div><h2>🎲 Random Number Generator</h2><p className="subtitle">Generate truly random numbers between any range — perfect for lotteries, raffles, research, and games.</p>
    <div className="row"><div className="field"><label>Minimum</label><input type="number" value={min} onChange={e=>setMin(e.target.value)}/></div><div className="field"><label>Maximum</label><input type="number" value={max} onChange={e=>setMax(e.target.value)}/></div></div>
    <div className="field"><label>How Many? (max 500)</label><input type="number" min="1" max="500" value={count} onChange={e=>setCount(e.target.value)}/></div>
    <div className="field"><label>Sort Order</label><div className="option-grid">{["none","asc","desc"].map(s=><button key={s} className={`opt-btn ${sort===s?'on':''}`} onClick={()=>setSort(s)}>{s==="none"?"No Sort":s==="asc"?"Low → High":"High → Low"}</button>)}</div></div>
    <div className="toggle-grid" style={{gridTemplateColumns:'1fr'}}><div className="toggle-item"><span className="toggle-label">No Duplicates (unique numbers only)</span><button className={`toggle-sw ${unique?'on':''}`} onClick={()=>setUnique(!unique)}/></div></div>
    <button className="btn btn-primary" onClick={generate}>Generate →</button>
    {numbers.length>0&&<>
      {numbers.length===1?<div className="result-box" style={{textAlign:'center'}}><div className="result-label">Your Random Number</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:'6rem',fontWeight:800,letterSpacing:'-0.04em',background:'linear-gradient(135deg,var(--cyan),var(--violet))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>{numbers[0]}</div></div>
      :<div className="result-box"><div className="result-label" style={{display:'flex',justifyContent:'space-between'}}><span>{numbers.length} Numbers Generated</span>{avg&&<span style={{fontWeight:400}}>Avg: {avg}</span>}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'0.45rem',maxHeight:'200px',overflowY:'auto'}}>{numbers.map((n,i)=><span key={i} style={{background:'rgba(0,245,255,0.06)',border:'1px solid rgba(0,245,255,0.15)',borderRadius:'7px',padding:'0.28rem 0.6rem',fontSize:'0.85rem',color:'var(--cyan)',fontFamily:'monospace',boxShadow:'0 0 6px rgba(0,245,255,0.08)'}}>{n}</span>)}</div>
        <button className={`copy-btn ${cp?'done':''}`} onClick={copy}>{cp?"✓ Copied!":"Copy All"}</button>
      </div>}
    </>}
  </div>);
}

// ══════════════════════════════════════════════════════════
// SHELL
// ══════════════════════════════════════════════════════════

const TOOLS=[
  {id:'symptom',icon:'🩺',name:'Symptom Checker',desc:'Describe any symptom — AI gives causes, care tips, and doctor warnings',tag:'ai'},
  {id:'recipe',icon:'🍳',name:'Recipe Finder',desc:'Enter ingredients and get two complete step-by-step recipes instantly',tag:'ai'},
  {id:'watch',icon:'📺',name:'What to Watch',desc:'AI picks five perfect movies or shows matched exactly to your mood',tag:'ai'},
  {id:'writer',icon:'✍️',name:'AI Writer',desc:'Cover letters, emails, captions, TikTok scripts — perfectly written',tag:'ai'},
  {id:'calorie',icon:'🥗',name:'Calorie Counter',desc:'AI nutrition lookup for any food, meal, or restaurant dish',tag:'ai'},
  {id:'budget',icon:'💰',name:'Budget Calculator',desc:'Visual breakdown of where your money goes and your savings rate',tag:'free'},
  {id:'loan',icon:'🏦',name:'Loan Calculator',desc:'Monthly payment, total interest, and full cost for any loan',tag:'free'},
  {id:'currency',icon:'💱',name:'Currency Converter',desc:'Live rates for 30+ currencies including NGN, GHS, KES, ZAR',tag:'free'},
  {id:'percent',icon:'📊',name:'Percentage Calculator',desc:'Three types of percentage math — answered instantly',tag:'free'},
  {id:'tip',icon:'🧾',name:'Tip Calculator',desc:'Calculate tips and split any bill for any group size',tag:'free'},
  {id:'health',icon:'⚖️',name:'Health Calculator',desc:'BMI, daily calories, water intake, ideal weight, and macros',tag:'free'},
  {id:'age',icon:'🎂',name:'Age Calculator',desc:'Exact age plus zodiac, birthstone, and days to next birthday',tag:'free'},
  {id:'gpa',icon:'🎓',name:'GPA Calculator',desc:'Semester and cumulative GPA with full letter grade support',tag:'free'},
  {id:'word',icon:'📝',name:'Word Counter',desc:'Live word, character, sentence count + reading and speak time',tag:'free'},
  {id:'password',icon:'🔐',name:'Password Generator',desc:'3 strong, unique passwords generated in one click',tag:'free'},
  {id:'unit',icon:'📐',name:'Unit Converter',desc:'Convert length, weight, temperature, volume, speed, and data',tag:'free'},
  {id:'timezone',icon:'🌍',name:'Time Zone Converter',desc:'Convert any time across up to 3 global destinations at once',tag:'free'},
  {id:'random',icon:'🎲',name:'Random Number Generator',desc:'Any range, up to 500 numbers, unique mode, sorted output',tag:'free'},
];

const COMPONENTS={symptom:SymptomChecker,recipe:RecipeFinder,budget:BudgetCalc,watch:WatchPicker,health:HealthCalc,writer:AIWriter,currency:CurrencyConverter,age:AgeCalculator,word:WordCounter,password:PasswordGenerator,percent:PercentCalc,tip:TipCalc,unit:UnitConverter,timezone:TimeZoneConverter,loan:LoanCalc,gpa:GPACalculator,calorie:CalorieCounter,random:RandomNumberGen};

function ToolCard({t,onSelect}){
  return(
    <div className="tool-card" onClick={()=>onSelect(t)}>
      <div className="tool-top">
        <div className="tool-icon-wrap">{t.icon}</div>
        <span className={`badge badge-${t.tag}`}>{t.tag==='ai'?'◈ AI':'Free'}</span>
      </div>
      <div className="tool-name">{t.name}</div>
      <div className="tool-desc">{t.desc}</div>
      <div className="tool-cta">Use tool →</div>
    </div>
  );
}

function Home({onSelect}){
  const aiTools=TOOLS.filter(t=>t.tag==='ai');
  const freeTools=TOOLS.filter(t=>t.tag==='free');
  return(
    <>
      <div className="hero">
        <div className="hero-glow"/>
        <div className="hero-eyebrow">18 AI-Powered Everyday Tools</div>
        <h1>
          <span className="plain">The toolkit for<br/></span>
          <span className="grad">life's real questions</span>
        </h1>
        <p>18 powerful tools solving the everyday problems millions search for every day — free, instant, no account needed.</p>
        <div className="stats-row">
          <div className="stat-item"><div className="stat-num">18</div><div className="stat-lbl">Tools</div></div>
          <div className="stat-item"><div className="stat-num">5</div><div className="stat-lbl">AI Powered</div></div>
          <div className="stat-item"><div className="stat-num">13</div><div className="stat-lbl">Calculators</div></div>
          <div className="stat-item"><div className="stat-num">Free</div><div className="stat-lbl">Forever</div></div>
        </div>
      </div>
      <div className="tools-section">
        <div className="sec-header"><div className="sec-title">AI Tools</div><div className="sec-line"/><div className="sec-badge">◈ Claude AI</div></div>
        <div className="tools-grid">{aiTools.map(t=><ToolCard key={t.id} t={t} onSelect={onSelect}/>)}</div>
        <div className="sec-header" style={{marginTop:'2.5rem'}}><div className="sec-title">Calculators & Converters</div><div className="sec-line"/><div className="sec-badge">Instant · Free</div></div>
        <div className="tools-grid">{freeTools.map(t=><ToolCard key={t.id} t={t} onSelect={onSelect}/>)}</div>
      </div>
      <div className="why-section">
        <div className="sec-header"><div className="sec-title">Why LifeKit</div><div className="sec-line"/></div>
        <div className="why-grid">
          {[
            {icon:'🩺',title:'Most Googled Health Searches',desc:'BMI calculators, symptom checkers, and calorie counters are among the highest-traffic tools online — with premium health ad CPM rates.',kw:['symptom checker','bmi calculator','calorie counter','health tools']},
            {icon:'💰',title:'Top Finance Search Traffic',desc:'Loan calculators, budget planners, and currency converters drive enormous daily traffic with some of the highest advertising rates on the internet.',kw:['loan calculator','budget planner','currency converter','finance tools']},
            {icon:'📺',title:'"What to Watch" — #1 Googled Question',desc:'"What to watch tonight" is searched millions of times daily. Our AI recommender solves it in seconds — and links directly to streaming platforms.',kw:['what to watch tonight','movie recommendations','best shows 2025','streaming guide']},
            {icon:'✍️',title:'AI Writing Drives Daily Return Visits',desc:'Millions search daily for help with cover letters, emails, and social captions. AI writing tools build habits — users come back every single day.',kw:['ai cover letter','professional email writer','caption generator','tiktok script']},
          ].map(b=><div key={b.title} className="why-block"><div className="why-icon">{b.icon}</div><h3>{b.title}</h3><p>{b.desc}</p><div className="kw-row">{b.kw.map(k=><span key={k} className="kw">{k}</span>)}</div></div>)}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-logo">LifeKit</div>
        <div className="footer-sub">18 free AI-powered everyday tools · No account required</div>
        <div className="footer-links">{TOOLS.map(t=><span key={t.id} className="footer-link">{t.name}</span>)}</div>
        <div style={{marginTop:'1rem',fontSize:'0.7rem',color:'var(--muted)'}}>© 2025 LifeKit · Free forever · Works on any device</div>
      </footer>
    </>
  );
}

export default function App(){
  const [active,setActive]=useState(null);
  const Component=active?COMPONENTS[active.id]:null;
  const handleRelated=name=>{const t=TOOLS.find(x=>x.name===name);if(t)setActive(t);};
  return(
    <div className="app">
      <style>{css}</style>
      <div className="plasma-bg"/>
      <div className="scanline"/>
      <div className="content">
        <header className="header">
          <div className="logo" onClick={()=>setActive(null)}>LifeKit</div>
          <div className="header-pills">
            <span className="pill pill-cyan">◈ Deep Space</span>
            <span className="pill">18 Tools</span>
          </div>
        </header>
        {active?(
          <div className="tool-view">
            <div className="tool-nav">
              <button className="back-btn" onClick={()=>setActive(null)}>← All Tools</button>
              <div className="nav-title">{active.icon} {active.name}</div>
            </div>
            <SEOLanding id={active.id} onRelated={handleRelated}>
              <Component/>
            </SEOLanding>
          </div>
        ):<Home onSelect={setActive}/>}
      </div>
    </div>
  );
}
