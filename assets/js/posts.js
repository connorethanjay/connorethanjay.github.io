/* =========================================================
   Blue View — POSTS DATA
   ---------------------------------------------------------
   HOW TO ADD A NEW POST:
   Copy one object block below, paste it at the TOP of the
   POSTS array, and edit the fields. The homepage list and a
   dedicated page (post.html?slug=...) update automatically.

   Fields:
     slug     -> unique URL id, lowercase-with-dashes
     title    -> post title
     date     -> display date, e.g. "Jul 2026"
     tags     -> array of short labels
     summary  -> 1–2 sentence intro shown under the title
     body     -> the article in Markdown (between the backticks)

   Markdown quick reference:
     ## Heading        -> section heading
     **bold**          -> bold text
     `inline code`     -> inline code
     ```lang ... ```   -> code block
     > quote           -> callout box
     - item            -> bullet list
   ========================================================= */

const POSTS = [
  {
    slug: "rocev2-vs-infiniband",
    title: "Why I chose RoCEv2 over InfiniBand for my homelab fabric",
    date: "Jun 28 2026",
    tags: ["Networking", "RoCEv2"],
    summary: "InfiniBand is the gold standard for low-latency fabrics — so why did I build my 100GbE homelab on RoCEv2 instead? It came down to cost, ecosystem, and the lessons I wanted to learn.",
    body: `
When I started planning my Blue View homelab, the first big decision was the transport fabric. I wanted to learn RDMA so I could mirror the patterns I've read about in HPC & financial environments. That left me with two realistic options: **InfiniBand** or **RoCEv2** (RDMA over Converged Ethernet).

## The case for InfiniBand

InfiniBand is built for this. It is lossless by design, the latency is lower, and the tooling (\`ibstat\`, \`perfquery\`, the subnet manager) is mature and battle-tested.

> If latency and a the toolkit were my only priorities, InfiniBand would win every time. But a homelab is as much about *learning* as it is about benchmarks.

## Why RoCEv2 won

Three reasons tipped the scale:

- **Cost & availability.** Used 100GbE Ethernet NICs and Cisco Nexus switches are abundant and relatively cheap on the secondhand market. Infiniband gear from what I could find costs noticeably more and is harder to source.
- **Transferable skills.** RoCEv2 will force me to actually understand DCB, PFC and ECN — the same knobs to tune in production datacenter networks. That knowledge will carry far beyond this homelab.
- **One fabric to rule them all.** Ethernet means my storage, management and RDMA traffic can share the same physical network with proper QoS separation.

## Making Ethernet lossless

The catch with RoCEv2 is that Ethernet is *not* lossless by default. RDMA hates packet loss, so you have to build losslessness yourself with **PFC (Priority Flow Control)** and **ECN (Explicit Congestion Notification)**.

Admittedly I am working on learning these features, so I have not added a section to this post regarding this. It will come soon enough.

## Takeaway

If you need a guaranteed lossless fabric with the least effort, InfiniBand is likely your best choice. But if you want to deeply understand the datacenter Ethernet stack and build skills that map directly onto production networks, I think **RoCEv2 is the more educational path**, and that is exactly what a homelab is for.
`
  },
  {
    slug: "college-graduation",
    title: "My College Graduation - one month later",
    date: "June 28 2026",
    tags: ["College", "Future"],
    summary: "Three years of Computer Networking & Cybersecurity at Champlain College are wrapped up. A short reflection how I feel about it.",
    body: `
After approximately three years of studies and more personal struggles than I could count, my B.S. in **Networking & Cybersecurity** at Champlain College is achieved. It still feels strange to write that it's completed.

## What actually stuck

The most valuable things I learned weren't the ones I expected going in:

- **People come and go. Try to stick with the people that appreciate you.** Throughout my time in college, I could see the people that appreciated my presense, and those that wanted me out of the room quicker than I can say "Cisco". Try to stick around those who actually appreciate you.
- **Engineer things freak people out.** Every project where I was slightly out of my depth were nearly stopped by upper-level college officials. In spirit with the message above, get close with your professors. They might stick up for you when you're trying to build something incredible.
- **Write things down.** Half the reason this blog exists is that I kept losing my own hard-fought-for notes. Document clearly and you will do great things.

> This degree is a credential. The experiences are what matter.

## What I'd do differently

I handled many interactions poorly. I know that for a fact because it closed me off from many people. I think I would have benefit from going into college with a more open-minded perspective.

## What's next

Every day, I'm working on production infrastructure, by night the Blue View homelab keeps improving. The near-term roadmap:

- Finish the 100GbE RoCEv2 fabric writeups (part two is coming!)
- Hopefully push **BulwarkOS** toward a usable first release!
- Keep this journal alive with the things I learn along the way.

Thanks for reading — this is just the start.
`
  }
];

// Make available to plain <script> consumers.
window.POSTS = POSTS;
