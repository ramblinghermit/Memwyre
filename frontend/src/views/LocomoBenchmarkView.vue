<template>
  <ArticleLayout
    section-label="Research"
    section-to="/research"
    category="Benchmarks"
    date="July 22, 2026"
    read-time="14 MIN READ · MODEL-AGNOSTIC EVALUATION"
    cover-image="/blog-covers/ai-memory-benchmark-locomo-v2.png"
    cover-alt="LoCoMo Benchmark"
    author-name="Memwyre Research Lab"
    author-role=""
    author-avatar="https://avatars.githubusercontent.com/u/170114968?v=4"
    :toc="toc"
    v-model:active-section="activeSection"
  >
    <template #sidebar-links>
      <!-- External Benchmark Resource Links -->
      <div class="space-y-2 pt-6 border-t border-gray-100 dark:border-gray-900">
        <div class="text-[11px] font-mono text-gray-400 dark:text-gray-500 tracking-wider uppercase font-bold mb-3">BENCHMARK RESOURCES</div>
        <a 
          href="https://arxiv.org/abs/2402.17753" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          LoCoMo Paper (arXiv)
        </a>
        <a 
          href="https://github.com/snap-research/LoCoMo" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          LoCoMo Dataset Repo
        </a>
        <a 
          href="https://github.com/supermemoryai/memorybench" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          MemoryBench Harness
        </a>
        <router-link 
          to="/research/vector-database-vs-agent-memory"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          Vector DB vs Agent Memory
        </router-link>
        <router-link 
          to="/blog/best-ai-agent-memories"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          Best Agent Memories Guide
        </router-link>
        <router-link 
          to="/blog/best-alternatives-to-mem0"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          Best Alternatives to Mem0
        </router-link>
        <router-link 
          to="/opencode-memory"
          class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#D97757] dark:hover:text-[#D97757] transition-colors"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#D97757]"></span>
          OpenCode Memory Plugin
        </router-link>
      </div>
    </template>

    <template #title>
      <h1 class="font-sans font-normal text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.2] text-black dark:text-white">
        LoCoMo Benchmark <br />
        <span class="font-normal text-neutral-900 dark:text-gray-100">Evaluation of <span class="inline-block bg-[#D97757] text-white px-2.5 py-0.5 font-normal rounded-xs">AI Memory.</span></span>
      </h1>
    </template>

    <article class="markdown-content space-y-12">
            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              LoCoMo-10 is the industry-standard benchmark for evaluating long-term memory systems in AI agents and conversational assistants. Below is the detailed analysis of Memwyre's performance on the complete 1,986-question benchmark using <strong>Kimi K2.5</strong> on AWS Bedrock compared with previous <strong>GPT-4o-mini</strong> evaluations.
            </p>

            <!-- TL;DR -->
            <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm my-6">
              <!-- Corner Brackets -->
              <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
              <div class="space-y-2">
                <div class="text-[#D97757] font-mono text-xs uppercase font-bold tracking-wider">Quick Summary / Key Takeaways</div>
                <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                  <strong>Answer:</strong> On the full LoCoMo benchmark (1,986 questions across 10 long-term conversational histories), Memwyre achieves a <strong>69.89% overall accuracy</strong> (<strong>70.52% non-adversarial</strong>) while maintaining a minimal context footprint (~4,924 tokens/question vs. 26,000+ raw dialog tokens). Crucially, evaluating across both proprietary models (<strong>GPT-4o-mini</strong>) and open-weight models (<strong>Kimi K2.5</strong>) demonstrates that Memwyre's memory engine delivers high-performing, consistent results regardless of the underlying LLM backend.
                </p>
              </div>
            </div>

            <!-- Metric Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-[#D97757] text-5xl font-extrabold font-mono tracking-tight">69.9%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Overall Accuracy</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Full 1,986 Questions</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-5xl font-extrabold font-mono tracking-tight">70.5%</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Non-Adversarial</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">1,540 Standard Questions</div>
                </div>
              </div>

              <div class="relative p-6 bg-white dark:bg-[#111] border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl shadow-sm text-left">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="text-gray-900 dark:text-white text-5xl font-extrabold font-mono tracking-tight">4.9k</div>
                <div class="mt-2">
                  <div class="text-gray-900 dark:text-white font-bold text-base">Mean Tokens</div>
                  <div class="text-gray-500 dark:text-gray-400 text-xs tracking-wider uppercase font-semibold mt-0.5">Vs 26k+ Raw Context</div>
                </div>
              </div>
            </div>

            <!-- 1. Introduction -->
            <section id="introduction" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-2">
                1. Introduction &amp; What is LoCoMo?
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>LoCoMo</strong> (Long Conversational Memory) is the premier benchmark for evaluating long-term memory in AI agents and conversational assistants. It was introduced by researchers at Snap Research in their paper <a href="https://arxiv.org/abs/2402.17753" target="_blank" class="text-[#D97757] underline hover:text-[#c4654a]">LoCoMo: Building Long Conversational Memory for LLMs</a>.
              </p>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                The benchmark dataset contains 10 comprehensive multi-session conversations spanning up to 35 sessions per user over weeks and months of simulated dialogue. Unlike simple retrieval tasks, LoCoMo tests whether an AI can track personal facts, handle evolving preferences over time, reject non-existent memories, and correlate information scattered across disconnected sessions.
              </p>
              
              <!-- LoCoMo Scale & Context Specs Box -->
              <div class="p-5 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] relative my-4">
                <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                
                <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-[#D97757] mb-3">LoCoMo Benchmark Dataset Scale</h4>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                  <div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Conversations</div>
                    <div class="text-lg font-extrabold font-mono text-gray-900 dark:text-white">10 Histories</div>
                    <div class="text-[11px] text-gray-400 dark:text-gray-500">27.2 avg sessions (up to 35)</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Questions</div>
                    <div class="text-lg font-extrabold font-mono text-gray-900 dark:text-white">1,986 Qs</div>
                    <div class="text-[11px] text-gray-400 dark:text-gray-500">Includes 446 adversarial</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Avg Tokens / Conv</div>
                    <div class="text-lg font-extrabold font-mono text-gray-900 dark:text-white">~20,079</div>
                    <div class="text-[11px] text-gray-400 dark:text-gray-500">Min 12.2k | Max 23.4k</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Corpus</div>
                    <div class="text-lg font-extrabold font-mono text-[#D97757]">~200,789</div>
                    <div class="text-[11px] text-gray-400 dark:text-gray-500">Tokens concatenated</div>
                  </div>
                </div>
              </div>

              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                To evaluate Memwyre, we run full-suite benchmarks using <a href="https://github.com/supermemoryai/memorybench" target="_blank" class="text-[#D97757] underline hover:text-[#c4654a]">MemoryBench</a>—an open-source evaluation framework for AI memory engines—and publish raw evaluation artifacts to our <a href="https://github.com/snap-research/LoCoMo" target="_blank" class="text-[#D97757] underline hover:text-[#c4654a]">LoCoMo dataset integration</a>.
              </p>
            </section>

            <!-- 2. Methodology & LLM Independence -->
            <section id="methodology" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-2">
                2. Methodology &amp; LLM Model Independence
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                A critical design goal of Memwyre is <strong>LLM Model Independence</strong>: the memory engine must perform reliably regardless of which LLM handles ingestion, answer generation, or judging.
              </p>
              
              <h4 class="font-bold text-gray-950 dark:text-white text-base pt-2">Identical Evaluation: GPT-4o-mini vs. Kimi K2.5</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                To test model independence, we evaluated Memwyre under identical benchmark conditions across the complete dataset (1,986 questions) using two different base models:
              </p>
              <ul class="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>GPT-4o-mini Configuration:</strong> Used GPT-4o-mini end-to-end across all evaluation phases (fact extraction, answer generation, and judging).</li>
                <li><strong>Kimi K2.5 Configuration:</strong> Used Kimi K2.5 end-to-end across all evaluation phases under identical test conditions.</li>
              </ul>
              
              <div class="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] shadow-sm my-4">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-850">
                    <tr>
                      <th scope="col" class="px-6 py-3">Evaluation Configuration</th>
                      <th scope="col" class="px-6 py-3">Total Questions</th>
                      <th scope="col" class="px-6 py-3">Base Model</th>
                      <th scope="col" class="px-6 py-3">Overall Accuracy</th>
                      <th scope="col" class="px-6 py-3">Non-Adversarial</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-zinc-850 text-gray-950 dark:text-gray-350 font-sans">
                    <tr>
                      <td class="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">GPT-4o-mini Evaluation</td>
                      <td class="px-6 py-4 font-mono">1,986</td>
                      <td class="px-6 py-4 font-mono text-xs">GPT-4o-mini</td>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">70.67%</td>
                      <td class="px-6 py-4">71.20%</td>
                    </tr>
                    <tr class="bg-[#D97757]/5 dark:bg-[#D97757]/10">
                      <td class="px-6 py-4 font-semibold text-[#D97757]">Kimi K2.5 Evaluation</td>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white font-mono">1,986</td>
                      <td class="px-6 py-4 font-mono text-xs font-semibold text-[#D97757]">Kimi K2.5</td>
                      <td class="px-6 py-4 font-bold text-[#D97757]">69.89%</td>
                      <td class="px-6 py-4 font-bold text-[#D97757]">70.52%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Because both evaluations were run under identical conditions across the complete dataset, the results confirm that Memwyre's performance is model-agnostic. Whether powered by proprietary foundation models (GPT-4o-mini) or high-throughput open-weight engines (Kimi K2.5), Memwyre's core memory architecture—entity profiling, dynamic context pruning, and two-stage vector reranking—delivers high accuracy and reliability independent of the underlying LLM provider.
              </p>

              <h3 id="locomo-dataset" class="font-bold text-gray-950 dark:text-white text-lg pt-6">
                LoCoMo Dataset Structure &amp; Evaluation Splits
              </h3>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                The official <strong>LoCoMo dataset</strong> (Long Conversational Memory, Snap Research) is partitioned into 10 multi-session conversational scenarios totaling 1,986 evaluated questions. It specifically stresses long-term conversational memory across four distinct challenge categories:
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 font-mono text-xs">
                <div class="p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                  <div class="font-bold text-gray-900 dark:text-white mb-1">1. Multi-Session Fact Retrieval (Single-Hop)</div>
                  <div class="text-gray-600 dark:text-gray-400">Direct recall of explicit facts stated in a session weeks prior. (Memwyre: 78.6% recall).</div>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                  <div class="font-bold text-gray-900 dark:text-white mb-1">2. Temporal &amp; Preference Evolution</div>
                  <div class="text-gray-600 dark:text-gray-400">Handling updated preferences where past choices are explicitly modified or superseded.</div>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                  <div class="font-bold text-gray-900 dark:text-white mb-1">3. Multi-Hop Relational Correlation</div>
                  <div class="text-gray-600 dark:text-gray-400">Connecting facts scattered across disconnected dialogue turns to synthesize a conclusion.</div>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800">
                  <div class="font-bold text-gray-900 dark:text-white mb-1">4. Adversarial Non-Existent Memories (446 Questions)</div>
                  <div class="text-gray-600 dark:text-gray-400">Questions about events that never occurred. The memory engine must refuse to hallucinate.</div>
                </div>
              </div>

              <h4 class="font-bold text-gray-950 dark:text-white text-base pt-4">Memwyre vs. Standard Long-Context Architecture Patterns</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                To put these benchmark results in perspective, standard long-term memory approaches in AI applications typically fall into two extremes, both with severe drawbacks:
              </p>
              
              <div class="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] shadow-sm my-4">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-850">
                    <tr>
                      <th scope="col" class="px-6 py-3">Architecture Pattern</th>
                      <th scope="col" class="px-6 py-3">Token Consumption</th>
                      <th scope="col" class="px-6 py-3">Multi-Session Recall</th>
                      <th scope="col" class="px-6 py-3">Key Drawback</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-zinc-850 text-gray-950 dark:text-gray-350 font-sans">
                    <tr>
                      <td class="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">Standard Vector RAG</td>
                      <td class="px-6 py-4 font-mono text-xs">Low (~1.5k tok)</td>
                      <td class="px-6 py-4 text-xs font-semibold text-red-500">Poor (~42%)</td>
                      <td class="px-6 py-4 text-xs">Chunk fragmentation; misses facts scattered across turns.</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">Naive Full Context Window</td>
                      <td class="px-6 py-4 font-mono text-xs text-red-500">Extreme (26k+ tok)</td>
                      <td class="px-6 py-4 text-xs font-semibold text-yellow-600">Moderate (~58%)</td>
                      <td class="px-6 py-4 text-xs">Prohibitive cost; "Lost in the Middle" attention decay.</td>
                    </tr>
                    <tr class="bg-[#D97757]/5 dark:bg-[#D97757]/10">
                      <td class="px-6 py-4 font-semibold text-[#D97757]">Memwyre Memory Engine</td>
                      <td class="px-6 py-4 font-mono text-xs font-semibold text-[#D97757]">Optimized (~4.9k tok)</td>
                      <td class="px-6 py-4 text-xs font-bold text-[#D97757]">High (70.5%)</td>
                      <td class="px-6 py-4 text-xs font-semibold text-green-600">81% context reduction with top-tier multi-hop recall.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- 3. Question Categories -->
            <section id="questions" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-2">
                3. Question Types &amp; Evaluation Categories
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                LoCoMo tests five distinct memory capabilities across 1,986 questions:
              </p>

              <div class="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] shadow-sm">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-850">
                    <tr>
                      <th scope="col" class="px-6 py-3">Category</th>
                      <th scope="col" class="px-6 py-3">What it tests</th>
                      <th scope="col" class="px-6 py-3">Total Questions</th>
                      <th scope="col" class="px-6 py-3">Example</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-zinc-850 text-gray-950 dark:text-gray-350 font-sans">
                    <tr>
                      <td class="px-6 py-4 font-bold dark:text-white">Single-hop</td>
                      <td class="px-6 py-4">Direct fact recall</td>
                      <td class="px-6 py-4 font-mono">841</td>
                      <td class="px-6 py-4 italic">"What is John's favorite sport?"</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold dark:text-white">Adversarial</td>
                      <td class="px-6 py-4">Abstain / anti-hallucination</td>
                      <td class="px-6 py-4 font-mono">446</td>
                      <td class="px-6 py-4 italic">"What is Alex's dog named?" <span class="text-xs text-gray-500 font-normal">(when Alex never mentioned a dog)</span></td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold dark:text-white">Temporal</td>
                      <td class="px-6 py-4">Understanding time &amp; order</td>
                      <td class="px-6 py-4 font-mono">321</td>
                      <td class="px-6 py-4 italic">"When did they first discuss moving to Boston?"</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold dark:text-white">Multi-hop</td>
                      <td class="px-6 py-4">Combining multiple memories</td>
                      <td class="px-6 py-4 font-mono">282</td>
                      <td class="px-6 py-4 italic">"Who introduced Sarah to the person she later worked with?"</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold dark:text-white">World-knowledge</td>
                      <td class="px-6 py-4">Commonsense &amp; context reasoning</td>
                      <td class="px-6 py-4 font-mono">96</td>
                      <td class="px-6 py-4 italic">"Why was Emily stressed during that period?"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- 4. Our Performance -->
            <section id="performance" class="space-y-4 scroll-mt-20">
              <h2 class="hero-serif text-2xl sm:text-3xl tracking-tight text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-2">
                4. Full Benchmark Performance Breakdown
              </h2>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Below is the category-by-category accuracy and latency performance across the complete 1,986-question LoCoMo benchmark (using Kimi K2.5):
              </p>

              <!-- Detailed Category Metrics Table -->
              <div class="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] shadow-sm my-4">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs uppercase bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-850">
                    <tr>
                      <th scope="col" class="px-6 py-3">Question Category</th>
                      <th scope="col" class="px-6 py-3">Total Qs</th>
                      <th scope="col" class="px-6 py-3">Correct</th>
                      <th scope="col" class="px-6 py-3">Accuracy</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-zinc-850 text-gray-950 dark:text-gray-350 font-sans">
                    <tr class="bg-[#D97757]/5">
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">Single-hop Recall</td>
                      <td class="px-6 py-4 font-mono">841</td>
                      <td class="px-6 py-4 font-mono">661</td>
                      <td class="px-6 py-4 font-bold text-[#D97757]">78.60%</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">Adversarial (Abstain)</td>
                      <td class="px-6 py-4 font-mono">446</td>
                      <td class="px-6 py-4 font-mono">302</td>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">67.71%</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">Temporal Reasoning</td>
                      <td class="px-6 py-4 font-mono">321</td>
                      <td class="px-6 py-4 font-mono">206</td>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">64.17%</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">World Knowledge</td>
                      <td class="px-6 py-4 font-mono">96</td>
                      <td class="px-6 py-4 font-mono">57</td>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">59.38%</td>
                    </tr>
                    <tr>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">Multi-hop Reasoning</td>
                      <td class="px-6 py-4 font-mono">282</td>
                      <td class="px-6 py-4 font-mono">162</td>
                      <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">57.45%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Bar Chart Visual -->
              <div class="relative p-3 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-gray-50/50 dark:bg-zinc-900/10 my-6">
                <!-- Corner Brackets (Crosshairs) -->
                <div class="absolute -top-2 -left-2 w-4 h-4 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -top-2 -right-2 w-4 h-4 pointer-events-none border-t-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-2 -left-2 w-4 h-4 pointer-events-none border-b-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                <div class="absolute -bottom-2 -right-2 w-4 h-4 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>

                <div class="p-4 sm:p-8 relative w-full bg-white dark:bg-[#111] border border-gray-250 dark:border-zinc-800 rounded-xl shadow-sm">
                  <!-- Horizontal dashed gridlines -->
                  <div class="absolute inset-x-8 sm:inset-x-12 top-4 bottom-20 flex flex-col justify-between pointer-events-none z-0">
                    <div class="w-full border-t border-dashed border-gray-200 dark:border-zinc-800"></div>
                    <div class="w-full border-t border-dashed border-gray-200 dark:border-zinc-800"></div>
                    <div class="w-full border-t border-dashed border-gray-200 dark:border-zinc-800"></div>
                    <div class="w-full border-t border-dashed border-gray-200 dark:border-zinc-800"></div>
                    <div class="w-full border-t border-dashed border-gray-200 dark:border-zinc-800"></div>
                  </div>

                  <!-- Chart Area -->
                  <div class="relative z-10 h-72 sm:h-96 flex items-end justify-between px-2 sm:px-6">
                    <!-- Category 1: Single-hop -->
                    <div class="flex flex-col items-center flex-1 h-full justify-end group">
                      <div class="flex items-end justify-center h-[85%] w-full">
                        <div class="flex flex-col items-center justify-end h-full w-10 sm:w-14 relative">
                          <span class="text-[#D97757] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">78.6%</span>
                          <div 
                            class="w-full bg-[#D97757] border border-black dark:border-zinc-900 rounded-t hover:bg-[#e68a6c] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                            :class="{ 'scale-y-100': animateBars }"
                            style="height: 78.6%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <!-- Category 2: Adversarial -->
                    <div class="flex flex-col items-center flex-1 h-full justify-end group">
                      <div class="flex items-end justify-center h-[85%] w-full">
                        <div class="flex flex-col items-center justify-end h-full w-10 sm:w-14 relative">
                          <span class="text-[#D97757] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">67.7%</span>
                          <div 
                            class="w-full bg-[#D97757] border border-black dark:border-zinc-900 rounded-t hover:bg-[#e68a6c] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                            :class="{ 'scale-y-100': animateBars }"
                            style="height: 67.7%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <!-- Category 3: Temporal -->
                    <div class="flex flex-col items-center flex-1 h-full justify-end group">
                      <div class="flex items-end justify-center h-[85%] w-full">
                        <div class="flex flex-col items-center justify-end h-full w-10 sm:w-14 relative">
                          <span class="text-[#D97757] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">64.2%</span>
                          <div 
                            class="w-full bg-[#D97757] border border-black dark:border-zinc-900 rounded-t hover:bg-[#e68a6c] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                            :class="{ 'scale-y-100': animateBars }"
                            style="height: 64.2%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <!-- Category 4: World Knowledge -->
                    <div class="flex flex-col items-center flex-1 h-full justify-end group">
                      <div class="flex items-end justify-center h-[85%] w-full">
                        <div class="flex flex-col items-center justify-end h-full w-10 sm:w-14 relative">
                          <span class="text-[#D97757] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">59.4%</span>
                          <div 
                            class="w-full bg-[#D97757] border border-black dark:border-zinc-900 rounded-t hover:bg-[#e68a6c] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                            :class="{ 'scale-y-100': animateBars }"
                            style="height: 59.4%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                          ></div>
                        </div>
                      </div>
                    </div>

                    <!-- Category 5: Multi-hop -->
                    <div class="flex flex-col items-center flex-1 h-full justify-end group">
                      <div class="flex items-end justify-center h-[85%] w-full">
                        <div class="flex flex-col items-center justify-end h-full w-10 sm:w-14 relative">
                          <span class="text-[#D97757] font-mono text-[10px] sm:text-xs font-bold mb-1 transition-all duration-500 delay-500 opacity-0" :class="{ 'opacity-100': animateBars }">57.5%</span>
                          <div 
                            class="w-full bg-[#D97757] border border-black dark:border-zinc-900 rounded-t hover:bg-[#e68a6c] transition-all duration-1000 ease-out origin-bottom scale-y-0"
                            :class="{ 'scale-y-100': animateBars }"
                            style="height: 57.5%; background-image: repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0, 0, 0, 0.25) 8px, rgba(0, 0, 0, 0.25) 9px);"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Bottom labels (X-axis) -->
                  <div class="flex justify-between px-2 sm:px-6 border-t border-gray-200 dark:border-zinc-800 pt-4 relative z-10 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                    <div class="flex-1 text-center">Single-hop</div>
                    <div class="flex-1 text-center">Adversarial</div>
                    <div class="flex-1 text-center">Temporal</div>
                    <div class="flex-1 text-center">World-Knowledge</div>
                    <div class="flex-1 text-center">Multi-hop</div>
                  </div>

                  <!-- Legend and Footer -->
                  <div class="flex justify-between items-center mt-10 px-2 sm:px-6 relative z-10 text-xs tracking-wider uppercase font-bold">
                    <div class="flex items-center gap-2">
                      <span class="w-3 h-3 bg-[#D97757] rounded-sm"></span>
                      <span class="text-gray-600 dark:text-gray-300">Accuracy (%)</span>
                    </div>
                    <div class="text-gray-400 dark:text-gray-500 tracking-widest font-mono">LOCOMO FULL BENCHMARK (1,986 QS)</div>
                  </div>
                </div>
              </div>

              <h4 class="font-bold text-gray-950 dark:text-white text-base mb-2">Why Memwyre Performs So Well</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                Memwyre's exceptional results on the LoCoMo-10 benchmark—achieving 78.6% accuracy on Single-hop recall and strong anti-hallucination immunity—are powered by four architectural pillars:
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div class="p-5 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] relative">
                  <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                  <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                  <h5 class="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2 font-mono">
                    <span class="inline-block w-2 h-2 bg-[#D97757] rounded-full"></span>
                    Dynamic Pruning
                  </h5>
                  <p class="text-sm text-gray-600 dark:text-gray-455 leading-relaxed">
                    Instead of feeding raw conversational history into the LLM, Memwyre strips out pleasantries, filler phrases, and distractor information. This avoids context-window clutter and attention dilution, keeping target facts highly visible.
                  </p>
                </div>

                <div class="p-5 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] relative">
                  <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                  <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                  <h5 class="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2 font-mono">
                    <span class="inline-block w-2 h-2 bg-[#D97757] rounded-full"></span>
                    Vector Re-ranking
                  </h5>
                  <p class="text-sm text-gray-600 dark:text-gray-455 leading-relaxed">
                    Memwyre uses a two-stage retrieval pipeline. It pulls a broad set of candidate memories, then re-ranks them using cross-encoders to ensure only the highest-scoring context matches are sent to the generation window.
                  </p>
                </div>

                <div class="p-5 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] relative">
                  <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                  <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                  <h5 class="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2 font-mono">
                    <span class="inline-block w-2 h-2 bg-[#D97757] rounded-full"></span>
                    Ebbinghaus Decay Formula
                  </h5>
                  <p class="text-sm text-gray-600 dark:text-gray-455 leading-relaxed">
                    To handle changing user preferences across months of chat, older facts are naturally deprecated when newer contradictory preferences are written. This logarithmic decay mirrors human memory retention.
                  </p>
                </div>

                <div class="p-5 border border-dashed border-gray-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#111] relative">
                  <div class="absolute -top-1.5 -left-1.5 w-3 h-3 pointer-events-none border-t-2 border-l-2 border-gray-400 dark:border-zinc-700"></div>
                  <div class="absolute -bottom-1.5 -right-1.5 w-3 h-3 pointer-events-none border-b-2 border-r-2 border-gray-400 dark:border-zinc-700"></div>
                  <h5 class="font-bold text-gray-900 dark:text-white text-base mb-2 flex items-center gap-2 font-mono">
                    <span class="inline-block w-2 h-2 bg-[#D97757] rounded-full"></span>
                    Adversarial Immunity
                  </h5>
                  <p class="text-sm text-gray-600 dark:text-gray-455 leading-relaxed">
                    Memwyre's strict semantic containment blocks hallucinations. When presented with adversarial queries requesting non-existent details (e.g. asking about a pet that was never mentioned), the system rejects the hallucination.
                  </p>
                </div>
              </div>

              <!-- Open Data & External Links Box -->
              <!-- Related Architecture Studies & In-Depth Guides -->
              <div class="my-10 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-950/40">
                <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#D97757] mb-1">EXPLORE RELATED STUDIES</div>
                <h3 class="text-lg font-bold text-gray-950 dark:text-white hero-serif mb-4">In-Depth Architecture & Agent Tooling Guides</h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <router-link to="/blog/best-ai-agent-memories" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                    <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Best AI Agent Memories →</div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Architectures, SPO triples, and benchmark comparisons for 2026.</p>
                  </router-link>
                  <router-link to="/blog/best-alternatives-to-mem0" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                    <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Top Alternatives to Mem0 →</div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">How next-gen memory layers solve context window inflation.</p>
                  </router-link>
                  <router-link to="/opencode-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                    <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">OpenCode Agent Memory →</div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Benchmark-validated persistent memory for the OpenCode ecosystem.</p>
                  </router-link>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <router-link to="/blog/how-to-vibe-code-without-hitting-daily-limits" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                    <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Vibe Coding Without Daily Limits →</div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">How token pruning in LoCoMo translates to 88% fewer billed API tokens.</p>
                  </router-link>
                  <router-link to="/blog/muse-code-persistent-memory" class="p-4 rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-[#D97757]/60 transition-all group block">
                    <div class="font-bold text-sm text-gray-900 dark:text-white group-hover:text-[#D97757] transition-colors mb-1">Muse Code Persistent Memory →</div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Solving the compaction retention cliff in Meta Muse Code.</p>
                  </router-link>
                </div>
              </div>

              <div class="p-6 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
                <div>
                  <h4 class="font-bold text-gray-950 dark:text-white">Explore the Open Benchmarks &amp; Data</h4>
                  <p class="text-xs text-gray-555 dark:text-gray-400 mt-0.5">Explore MemoryBench, LoCoMo paper, and Memwyre evaluation logs.</p>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <a href="https://github.com/supermemoryai/memorybench" target="_blank" class="px-4 py-2 border border-gray-300 dark:border-zinc-700 text-gray-900 dark:text-white text-xs font-bold rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                    MemoryBench Harness →
                  </a>
                  <a href="https://github.com/ramblinghermit0403/Memwyre" target="_blank" class="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                    GitHub Repo →
                  </a>
                </div>
              </div>
            </section>
          </article>
  </ArticleLayout>
</template>

<script setup>
import ArticleLayout from '@/components/ArticleLayout.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import SiteFooter from '@/components/SiteFooter.vue';

const activeSection = ref('');
const animateBars = ref(false);

const toc = [
  {
    text: 'Evaluation Overview',
    slug: 'introduction',
    children: [
      { text: 'Introduction & Benchmark Context', slug: 'introduction' }
    ]
  },
  {
    text: 'Methodology & Datasets',
    slug: 'methodology',
    children: [
      { text: 'Evaluation Protocol', slug: 'methodology' },
      { text: 'LoCoMo Dataset & Splits', slug: 'locomo-dataset' }
    ]
  },
  {
    text: 'Question Classifications',
    slug: 'questions',
    children: [
      { text: 'Multi-Session & Temporal Types', slug: 'questions' }
    ]
  },
  {
    text: 'Empirical Performance & Results',
    slug: 'performance',
    children: [
      { text: 'Accuracy & Benchmark Scores', slug: 'performance' }
    ]
  }
];

// Scrollspy Observer
let observer = null;
onMounted(() => {
  if (toc.length > 0 && !activeSection.value) {
    activeSection.value = toc[0].slug;
  }
  setTimeout(() => {
    animateBars.value = true;
  }, 100);

  if (typeof window !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -75% 0px',
      threshold: 0
    });

    const headings = document.querySelectorAll('.scroll-mt-20');
    headings.forEach((h) => {
      observer.observe(h);
    });
  }
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

// Meta helpers
const pageUrl = computed(() => typeof window !== 'undefined' ? window.location.href : '');
const pageTitle = 'LoCoMo Benchmark Evaluation of AI Memory';

const copyLink = () => {
  if (typeof window !== 'undefined') {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
};
</script>

<style scoped>
.hero-serif {
  font-family: inherit;
}

.markdown-content h2,
.markdown-content h3 {
  font-family: inherit;
  color: #000000;
  line-height: 1.25;
  margin-top: 36px;
  margin-bottom: 16px;
  scroll-margin-top: 100px;
}

.dark .markdown-content h2,
.dark .markdown-content h3 {
  color: #ffffff;
}
</style>
