export const prerender = true;

export async function GET() {
  const buildDate = new Date().toISOString().split("T")[0];

  const content = `/* TEAM */
  Developer: Lukasz Leszko
  Contact: lukasz@leszko.dev
  Site: https://lukasz.leszko.dev
  GitHub: https://github.com/leszkolukasz
  LinkedIn: https://www.linkedin.com/in/leszkolukasz
  Role: Architect, Developer, Designer, DevOps, SEO

/* SITE */
  Last update: ${buildDate}
  Standards: HTML5, CSS3, JSON-LD, Astro Framework
  Language: English
  Doctype: HTML5
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
