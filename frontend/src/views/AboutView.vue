<template>
  <div class="force-light relative min-h-screen bg-white text-gray-900 font-sans selection:bg-[#D97757] selection:text-white [overflow-x:clip]">
    <!-- Blueprint Grid Effect -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.035]">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>

    <!-- Background Artwork / Top Ambient -->
    <div class="absolute inset-x-0 top-0 h-[420px] pointer-events-none z-0 overflow-hidden select-none">
      <img
        :src="heroWatercolorBg"
        alt=""
        class="w-full h-full object-cover object-top opacity-75"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white"></div>
    </div>

    <!-- Global Vertical Grid Guide Lines -->
    <div class="hidden lg:block absolute top-0 bottom-0 left-6 sm:left-8 lg:left-[calc(50%-640px)] w-px bg-gray-300/60 pointer-events-none select-none z-30"></div>
    <div class="hidden lg:block absolute top-0 bottom-0 right-6 sm:right-8 lg:right-[calc(50%-640px)] w-px bg-gray-300/60 pointer-events-none select-none z-30"></div>

    <div class="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 z-10 pt-28 sm:pt-32 lg:pt-36 pb-24">
      <!-- Breadcrumb & Hero Header -->
      <header class="mb-16 sm:mb-20 text-left">
        <div class="text-xs tracking-wider uppercase font-bold font-mono text-gray-400 mb-4 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#D97757]"></span>
          <span>/ ABOUT MEMWYRE</span>
        </div>
        <h1 class="hero-serif text-4xl sm:text-5xl md:text-6xl tracking-[-0.02em] leading-[1.1] text-[rgb(1,1,16)] mb-6 max-w-3xl">
          Persistent memory for developers and their <span class="italic font-medium">AI agents.</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-2xl">
          Memwyre eliminates agent amnesia. We build the shared context layer that keeps your architecture decisions, project conventions, and debugging history accessible across every session and IDE.
        </p>
      </header>

      <!-- The Story / Origin Section -->
      <section class="mb-20 text-left border-t border-gray-200/80 pt-12 sm:pt-16">
        <div class="max-w-3xl">
          <div class="text-xs font-mono uppercase tracking-widest text-[#D97757] font-bold mb-3">
            Why We're Building This
          </div>
          <h2 class="hero-serif text-2xl sm:text-3xl md:text-4xl text-gray-950 mb-6 leading-snug">
            The repetitive context problem.
          </h2>
          <div class="space-y-5 text-base sm:text-[17px] text-gray-700 leading-relaxed font-normal">
            <p>
              Anyone who writes code alongside Cursor, Claude Code, Windsurf, or ChatGPT experiences the exact same friction: you spend 20 minutes explaining your database schemas, internal routing patterns, and previous debugging iterations. You make great progress, close the terminal or editor, and the very next morning your AI has complete amnesia.
            </p>
            <p>
              Standard flat vector databases and naive RAG don't solve this. They dump thousands of raw tokens into your context window, bloat billing costs, and frequently dredge up obsolete patterns from refactors that happened three months ago.
            </p>
            <p>
              Memwyre was founded in 2026 to solve this at the protocol layer. We treat memory as a living substrate: one that captures atomic facts, decays outdated decisions naturally, and connects natively to your developer environment through the Model Context Protocol (MCP).
            </p>
          </div>
        </div>
      </section>

      <!-- FOUNDING TEAM & LEADERSHIP (Core Verification Section) -->
      <section id="leadership" class="mb-20 text-left border-t border-gray-200/80 pt-12 sm:pt-16">
        <div class="mb-8 sm:mb-10">
          <div class="text-xs font-mono uppercase tracking-widest text-[#D97757] font-bold mb-3">
            Leadership
          </div>
          <h2 class="hero-serif text-2xl sm:text-3xl md:text-4xl text-gray-950 mb-3">
            Founding Team &amp; Engineering
          </h2>
          <p class="text-base text-gray-600 max-w-2xl leading-relaxed">
            Memwyre is built and led by Himansh Shivhare, operating from Bengaluru, India with an open-source community worldwide.
          </p>
        </div>

        <!-- Founder Profile Card -->
        <div class="border border-gray-200/90 rounded-2xl bg-white p-7 sm:p-10 shadow-xs hover:border-gray-300 transition-colors">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
            <!-- Left: Avatar & Quick Info -->
            <div class="md:col-span-5 lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <div class="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border border-gray-200 shadow-sm mb-5 bg-gray-50">
                <img
                  src="https://avatars.githubusercontent.com/u/170114968?v=4"
                  alt="Himansh Shivhare - Founder & Lead Engineer of Memwyre"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="$event.target.src = 'https://ui-avatars.com/api/?name=Himansh+Shivhare&background=111827&color=ffffff&size=256'"
                />
              </div>

              <h3 class="text-2xl font-bold text-gray-950">Himansh Shivhare</h3>
              <div class="text-[#D97757] font-semibold text-sm mt-0.5 mb-2">Founder &amp; CEO, Lead Architect</div>
              
              <div class="inline-flex items-center gap-1.5 text-xs text-gray-500 font-mono mb-5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Bengaluru, India (Remote-first)</span>
              </div>

              <!-- Verified Social Links -->
              <div class="flex items-center gap-2">
                <!-- LinkedIn -->
                <a
                  href="https://linkedin.com/in/himansh-shivhare"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Himansh Shivhare on LinkedIn"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  title="LinkedIn Profile"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                <!-- GitHub -->
                <a
                  href="https://github.com/ramblinghermit0403"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Himansh Shivhare on GitHub"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  title="GitHub Profile"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <!-- X / Twitter -->
                <a
                  href="https://x.com/Memwyre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Memwyre on X"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 hover:bg-gray-50 transition-colors"
                  title="X (Twitter)"
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <!-- Email -->
                <a
                  href="mailto:himansh@memwyre.tech"
                  aria-label="Email Himansh Shivhare directly"
                  class="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:text-[#D97757] hover:border-[#D97757]/40 hover:bg-[#D97757]/5 transition-colors"
                  title="himansh@memwyre.tech"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>

              <!-- Direct email text -->
              <div class="mt-4 text-xs font-mono text-gray-500">
                <a href="mailto:himansh@memwyre.tech" class="hover:text-[#D97757] transition-colors underline">himansh@memwyre.tech</a>
              </div>
            </div>

            <!-- Right: Background & What Himansh Does -->
            <div class="md:col-span-7 lg:col-span-8 space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                Himansh is a software engineer specializing in distributed backend systems, vector retrieval architectures, and context engineering. He founded Memwyre after experiencing firsthand the daily friction of working with AI coding tools that lose context every time a session terminates.
              </p>
              <p>
                Himansh designed and built Memwyre's core architecture from the ground up: the decoupled memory protocol, the Model Context Protocol (MCP) server for Cursor and Claude Code, and the temporal decay engine that prevents context windows from clogging with outdated information.
              </p>
              <p>
                As founder and lead engineer, Himansh oversees all systems engineering, open-source development, and product strategy. He builds in the open, reviews community pull requests, and personally works with developers integrating Memwyre into their engineering stacks.
              </p>
              
              <div class="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">Distributed Systems</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">Model Context Protocol</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">Vector Retrieval</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">Python / FastAPI</span>
                <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-mono">Agent Tooling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- GUIDING PRINCIPLES -->
      <section class="mb-20 text-left border-t border-gray-200/80 pt-12 sm:pt-16">
        <div class="mb-8 sm:mb-10">
          <div class="text-xs font-mono uppercase tracking-widest text-[#D97757] font-bold mb-3">
            What Guides Us
          </div>
          <h2 class="hero-serif text-2xl sm:text-3xl md:text-4xl text-gray-950 mb-3">
            Core Engineering Principles
          </h2>
          <p class="text-base text-gray-600 max-w-2xl leading-relaxed">
            The design decisions that shape everything we build at Memwyre.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">01</div>
            <h3 class="text-lg font-bold text-gray-950 mb-2">Model Agnostic</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Your context belongs to you, not your model provider. When you switch between Claude, OpenAI, or Gemini, your accumulated knowledge, conventions, and project history remain fully intact.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">02</div>
            <h3 class="text-lg font-bold text-gray-950 mb-2">Open by Design</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Memory should be inspectable. Our core memory protocols and local MCP connector are open-source under the Apache 2.0 license, allowing you to audit, extend, and self-host.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">03</div>
            <h3 class="text-lg font-bold text-gray-950 mb-2">Natural Context Decay</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              Hoarding every token leads to bloated prompts and confused agents. Memwyre applies intelligent recency decay so superseded decisions fade while foundational architecture rules persist.
            </p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div class="text-xs font-mono font-bold text-[#D97757] uppercase tracking-wider mb-2">04</div>
            <h3 class="text-lg font-bold text-gray-950 mb-2">Zero Training on Your Data</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              We never use your private code, memories, or workspace interactions to train foundation models. All data is encrypted at rest and in transit, with full self-hosting options for air-gapped setups.
            </p>
          </div>
        </div>
      </section>

      <!-- COMPANY FACTS & VERIFICATION DETAILS -->
      <section class="mb-20 text-left border-t border-gray-200/80 pt-12 sm:pt-16">
        <div class="mb-8">
          <div class="text-xs font-mono uppercase tracking-widest text-[#D97757] font-bold mb-3">
            Company Profile
          </div>
          <h2 class="hero-serif text-2xl sm:text-3xl md:text-4xl text-gray-950 mb-3">
            Key Information
          </h2>
          <p class="text-base text-gray-600 max-w-2xl leading-relaxed">
            Essential operational details for developers, partner programs, and verification.
          </p>
        </div>

        <div class="border border-gray-200/90 rounded-2xl bg-white p-6 sm:p-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div>
              <div class="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">Company / Project</div>
              <div class="text-sm font-semibold text-gray-900">Memwyre</div>
              <div class="text-xs text-gray-500 mt-0.5">memwyre.tech</div>
            </div>

            <div>
              <div class="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">Founding Leadership</div>
              <div class="text-sm font-semibold text-gray-900">Himansh Shivhare</div>
              <div class="text-xs text-gray-500 mt-0.5">Founder &amp; Lead Engineer</div>
            </div>

            <div>
              <div class="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">Founded &amp; Location</div>
              <div class="text-sm font-semibold text-gray-900">2026 &bull; Bengaluru, India</div>
              <div class="text-xs text-gray-500 mt-0.5">Operating remote-first</div>
            </div>

            <div>
              <div class="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">Core Software License</div>
              <div class="text-sm font-semibold text-gray-900">Apache 2.0 (Open Source)</div>
              <div class="text-xs text-gray-500 mt-0.5">With managed cloud services</div>
            </div>

            <div>
              <div class="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">Source Code Repository</div>
              <div class="text-sm font-semibold text-gray-900">
                <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" rel="noopener noreferrer" class="hover:text-[#D97757] underline">
                  github.com/ramblinghermit0403/Memwyre
                </a>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">Public repo &amp; issue tracker</div>
            </div>

            <div>
              <div class="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-semibold mb-1">Official Contact</div>
              <div class="text-sm font-semibold text-gray-900">
                <a href="mailto:himansh@memwyre.tech" class="hover:text-[#D97757] underline">
                  himansh@memwyre.tech
                </a>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">Direct founder inbox</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CALL TO ACTION -->
      <section class="border border-gray-200/90 rounded-2xl bg-gray-50/60 p-8 sm:p-12 text-center sm:text-left">
        <div class="max-w-2xl">
          <div class="text-xs font-mono uppercase tracking-widest text-[#D97757] font-bold mb-2">
            Get Started
          </div>
          <h2 class="hero-serif text-2xl sm:text-3xl font-bold text-gray-950 mb-3">
            Give your AI tools persistent memory.
          </h2>
          <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
            Start free with 50 memories, connect your IDE via our open MCP server, or write directly to Himansh with any questions.
          </p>

          <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <router-link
              to="/signup"
              class="px-5 py-2.5 rounded-lg bg-[#050614] text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors shadow-xs"
            >
              Get Started Free
            </router-link>
            <a
              href="https://github.com/ramblinghermit0403/Memwyre"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold text-xs sm:text-sm hover:bg-gray-50 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View GitHub</span>
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <router-link
              to="/contact"
              class="px-5 py-2.5 rounded-lg text-gray-600 hover:text-gray-900 font-semibold text-xs sm:text-sm transition-colors"
            >
              Contact Us &rarr;
            </router-link>
          </div>
        </div>
      </section>
    </div>

    <!-- Site Footer -->
    <SiteFooter class="!mt-0" />
  </div>
</template>

<script setup>
import heroWatercolorBg from '@/assets/hero-watercolor-bg.jpg';
import SiteFooter from '@/components/SiteFooter.vue';
</script>
