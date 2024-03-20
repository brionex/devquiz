import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_Cfk_dyvs.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DKH2VjXf.css"},{"type":"inline","content":"section[data-astro-cid-euy2btza].hide-menu{animation:hide-elem .3s forwards ease-in}\n"}],"routeData":{"route":"/sections/menu","isIndex":false,"type":"page","pattern":"^\\/sections\\/Menu\\/?$","segments":[[{"content":"sections","dynamic":false,"spread":false}],[{"content":"Menu","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sections/Menu.astro","pathname":"/sections/Menu","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DKH2VjXf.css"},{"type":"inline","content":"div[data-astro-cid-hzr35ht4]:has(.correct,.incorrect){pointer-events:none}.incorrect[data-astro-cid-hzr35ht4]{--tw-bg-opacity: 1;background-color:rgb(248 113 113 / var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.incorrect[data-astro-cid-hzr35ht4]:hover{--tw-bg-opacity: 1;background-color:rgb(248 113 113 / var(--tw-bg-opacity))}.incorrect[data-astro-cid-hzr35ht4]{animation:incorrect .6s forwards}.correct[data-astro-cid-hzr35ht4]{--tw-bg-opacity: 1;background-color:rgb(74 222 128 / var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.correct[data-astro-cid-hzr35ht4]:hover{--tw-bg-opacity: 1;background-color:rgb(74 222 128 / var(--tw-bg-opacity))}.correct[data-astro-cid-hzr35ht4]{animation:correct .6s forwards}@keyframes incorrect{10%{transform:scale(1.3)}25%{transform:scale(1.3) rotate(-10deg)}50%{transform:scale(1.3) rotate(10deg)}75%{transform:scale(1.3) rotate(-10deg)}to{transform:scale(1) rotate(0)}}@keyframes correct{50%{transform:scale(1.5)}to{transform:scale(1)}}section[data-astro-cid-hzr35ht4].show-question{display:flex;animation:show-elem .3s both .5s}\n"}],"routeData":{"route":"/sections/question","isIndex":false,"type":"page","pattern":"^\\/sections\\/Question\\/?$","segments":[[{"content":"sections","dynamic":false,"spread":false}],[{"content":"Question","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sections/Question.astro","pathname":"/sections/Question","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DKH2VjXf.css"},{"type":"inline","content":"section[data-astro-cid-2j2ebsok]:not(.hidden){display:none}div[data-astro-cid-2j2ebsok]{display:grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr))}div[data-astro-cid-2j2ebsok] span[data-astro-cid-2j2ebsok]{display:grid;color:#fff;place-items:center;aspect-ratio:1/1;border:1px solid}\n"}],"routeData":{"route":"/sections/results","isIndex":false,"type":"page","pattern":"^\\/sections\\/Results\\/?$","segments":[[{"content":"sections","dynamic":false,"spread":false}],[{"content":"Results","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sections/Results.astro","pathname":"/sections/Results","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"function o(n,t){typeof n==\"string\"&&(n=document.querySelector(n)),n.innerHTML=`\n  <span class=\"text-out\">${n.textContent}</span>\n  <span class=\"text-in\">${t}</span>`;const r=()=>{n.innerHTML=t,n.removeEventListener(\"animationend\",r)};n.addEventListener(\"animationend\",r)}const i=(n,t=document)=>t.querySelector(n),a=i(\".quiz-menu\"),c=i(\".quiz-question\"),d=i(\".options\",c),e=JSON.parse(i(\"[data-json]\").dataset.json);let s=0;function u(){o(\".progress-number\",s+1),o(\".question\",e[s].question),Array.from(d.children).forEach((n,t)=>{o(n,e[s].options[t]),n.classList.remove(\"correct\",\"incorrect\")})}function f({target:n}){n.tagName===\"BUTTON\"&&(n.textContent===e[s].correctAnswer?n.classList.add(\"correct\"):n.classList.add(\"incorrect\"),s++,setTimeout(()=>{if(s===e.length){alert(\"fin\");return}u()},0))}function p({target:n}){n.tagName===\"BUTTON\"&&(a.classList.add(\"hide-menu\"),c.classList.add(\"show-question\"),u())}a.addEventListener(\"click\",p);c.addEventListener(\"click\",f);\n"}],"styles":[{"type":"inline","content":".glide-text{display:inline-block;overflow:hidden;line-height:normal;position:relative}.glide-text span{width:100%;text-align:center;display:none}.glide-text span.text-in{display:block;animation:textIn .5s ease}.glide-text span.text-out{position:absolute;display:block;animation:textOut .5s ease}@keyframes textIn{0%{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes textOut{0%{transform:translateY(0)}75%{opacity:0}to{transform:translateY(-100%);opacity:0}}\n"},{"type":"external","src":"/_astro/index.DKH2VjXf.css"},{"type":"inline","content":"@font-face{font-family:Fredoka;src:url(/fonts/Fredoka-VariableFont.ttf) format(\"truetype\")}@font-face{font-family:JetBrainsMono;src:url(/fonts/JetBrainsMono.ttf) format(\"truetype\")}body{font-family:JetBrainsMono,Verdana,Geneva,Tahoma,sans-serif}@keyframes hide-elem{20%{transform:translateY(50px)}to{transform:translateY(-200%);opacity:0;display:none}}@keyframes show-elem{0%{transform:translateY(-200%);opacity:0}80%{transform:translateY(50px)}to{transform:translateY(0);opacity:1}}@keyframes hide-show-elem{10%{transform:translateY(30px)}50%{transform:translateY(-200%);opacity:0}80%{transform:translateY(30px)}to{ransform:translateY(0);opacity:1}}\nsection[data-astro-cid-euy2btza].hide-menu{animation:hide-elem .3s forwards ease-in}\ndiv[data-astro-cid-hzr35ht4]:has(.correct,.incorrect){pointer-events:none}.incorrect[data-astro-cid-hzr35ht4]{--tw-bg-opacity: 1;background-color:rgb(248 113 113 / var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.incorrect[data-astro-cid-hzr35ht4]:hover{--tw-bg-opacity: 1;background-color:rgb(248 113 113 / var(--tw-bg-opacity))}.incorrect[data-astro-cid-hzr35ht4]{animation:incorrect .6s forwards}.correct[data-astro-cid-hzr35ht4]{--tw-bg-opacity: 1;background-color:rgb(74 222 128 / var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgb(0 0 0 / var(--tw-text-opacity))}.correct[data-astro-cid-hzr35ht4]:hover{--tw-bg-opacity: 1;background-color:rgb(74 222 128 / var(--tw-bg-opacity))}.correct[data-astro-cid-hzr35ht4]{animation:correct .6s forwards}@keyframes incorrect{10%{transform:scale(1.3)}25%{transform:scale(1.3) rotate(-10deg)}50%{transform:scale(1.3) rotate(10deg)}75%{transform:scale(1.3) rotate(-10deg)}to{transform:scale(1) rotate(0)}}@keyframes correct{50%{transform:scale(1.5)}to{transform:scale(1)}}section[data-astro-cid-hzr35ht4].show-question{display:flex;animation:show-elem .3s both .5s}\nsection[data-astro-cid-2j2ebsok]:not(.hidden){display:none}div[data-astro-cid-2j2ebsok]{display:grid;grid-template-columns:repeat(auto-fit,minmax(50px,1fr))}div[data-astro-cid-2j2ebsok] span[data-astro-cid-2j2ebsok]{display:grid;color:#fff;place-items:center;aspect-ratio:1/1;border:1px solid}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/user/dev/projects/python-quiz/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/sections/Menu.astro":"chunks/pages/Menu_CEiT6uVl.mjs","/src/pages/sections/Question.astro":"chunks/pages/Question_ExzZAN59.mjs","/src/pages/sections/Results.astro":"chunks/pages/Results_BhFMaERQ.mjs","/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_DzKYn7ad.mjs","/src/pages/index.astro":"chunks/pages/index_B_wk9s3c.mjs","\u0000@astrojs-manifest":"manifest_BQtPC9LY.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_DQqY89cn.mjs","\u0000@astro-page:src/pages/sections/Menu@_@astro":"chunks/Menu_DwkUM3Ou.mjs","\u0000@astro-page:src/pages/sections/Question@_@astro":"chunks/Question_CPJqmiVB.mjs","\u0000@astro-page:src/pages/sections/Results@_@astro":"chunks/Results_iHVurMZa.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_DOEMaAyV.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.BU0nm7JO.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.DKH2VjXf.css","/favicon.svg","/fonts/Fredoka-VariableFont.ttf","/fonts/JetBrainsMono.ttf","/images/python.svg"],"buildFormat":"directory"});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
