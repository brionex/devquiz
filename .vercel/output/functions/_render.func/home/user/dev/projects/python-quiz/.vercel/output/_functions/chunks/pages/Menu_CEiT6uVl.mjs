/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead } from '../astro_Cfk_dyvs.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Menu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Menu;
  return renderTemplate`${maybeRenderHead()}<section class="quiz-menu flex flex-col items-center py-14 h-full" data-astro-cid-euy2btza> <figure data-astro-cid-euy2btza> <img class="max-w-32" src="/images/python.svg" alt="imagen del logo de python" data-astro-cid-euy2btza> </figure> <h1 class="text-4xl md:text-7xl font-black text-white my-5" data-astro-cid-euy2btza>Python Quiz</h1> <div class="flex-grow grid items-end md:items-start place-items-center w-full" data-astro-cid-euy2btza> <button class="btn-start border border-white md:mt-10 py-4 text-white text-2xl hover:bg-py-yellow hover:text-black font-semibold transition-colors max-w-[350px] w-full" data-astro-cid-euy2btza>Empezar</button> </div> </section> `;
}, "/home/user/dev/projects/python-quiz/src/pages/sections/Menu.astro", void 0);

const $$file = "/home/user/dev/projects/python-quiz/src/pages/sections/Menu.astro";
const $$url = "/sections/Menu";

export { $$Menu as default, $$file as file, $$url as url };
