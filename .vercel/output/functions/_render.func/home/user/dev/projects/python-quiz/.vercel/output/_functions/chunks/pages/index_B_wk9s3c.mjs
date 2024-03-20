/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, i as renderHead, j as renderComponent, k as renderSlot } from '../astro_Cfk_dyvs.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                          */
import $$Menu from './Menu_CEiT6uVl.mjs';
import $$Question from './Question_ExzZAN59.mjs';
import $$Results from './Results_BhFMaERQ.mjs';

const $$Astro$3 = createAstro();
const $$Background = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Background;
  return renderTemplate`${maybeRenderHead()}<div class="fixed inset-0 -z-10 bg-midnight-blue"> <div class="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f009_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f009_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> </div>`;
}, "/home/user/dev/projects/python-quiz/src/components/Background.astro", void 0);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="h-[100dvh] flex flex-col overflow-hidden"> ${renderComponent($$result, "Background", $$Background, {})} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/user/dev/projects/python-quiz/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$Github = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Github;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path></svg>`;
}, "/home/user/dev/projects/python-quiz/src/icons/github.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dev Quiz", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex-grow mx-auto w-[80%] overflow-hidden" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Menu", $$Menu, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Question", $$Question, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Results", $$Results, { "data-astro-cid-j7pv25f6": true })} </main> <footer class="text-lg py-5 text-white flex justify-center gap-3 items-center font-['Fredoka']" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>Hecho por</span> <a target="_blank" href="https://github.com/lbrione/python-quiz" class="text-py-yellow flex items-center gap-1" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Github", $$Github, { "data-astro-cid-j7pv25f6": true })}
lbrione
</a> </footer> ` })}  `;
}, "/home/user/dev/projects/python-quiz/src/pages/index.astro", void 0);

const $$file = "/home/user/dev/projects/python-quiz/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
