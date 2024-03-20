/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../astro_Cfk_dyvs.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                             */

const QuestionsJson = [
	{
		question: "¿Resultado de 2 + 2 en Python?",
		options: [
			"4",
			"22",
			"5",
			"10"
		],
		correctAnswer: "4"
	},
	{
		question: "¿Cómo imprimir 'Hola mundo' en Python?",
		options: [
			"print('Hola mundo')",
			"echo 'Hola mundo'",
			"println('Hola mundo')",
			"printf('Hola mundo')"
		],
		correctAnswer: "print('Hola mundo')"
	},
	{
		question: "Tipo de datos de 'True' en Python",
		options: [
			"String",
			"Boolean",
			"Integer",
			"Float"
		],
		correctAnswer: "Boolean"
	},
	{
		question: "Operador para elevar a potencia en Python",
		options: [
			"**",
			"^",
			"^^",
			"*^"
		],
		correctAnswer: "**"
	},
	{
		question: "Cuál es el lenguaje interpretado?",
		options: [
			"C",
			"Java",
			"Python",
			"C++"
		],
		correctAnswer: "Python"
	},
	{
		question: "Qué devuelve la función len()?",
		options: [
			"Longitud",
			"Lista",
			"Iterador",
			"Tipo de dato"
		],
		correctAnswer: "Longitud"
	},
	{
		question: "Tipo de dato para texto en Python",
		options: [
			"Str",
			"String",
			"Txt",
			"Text"
		],
		correctAnswer: "Str"
	},
	{
		question: "Cómo se declara una lista vacía?",
		options: [
			"list()",
			"{}",
			"[]",
			"list[]"
		],
		correctAnswer: "[]"
	},
	{
		question: "Operador de pertenencia en Python",
		options: [
			"in",
			"of",
			"is",
			"at"
		],
		correctAnswer: "in"
	},
	{
		question: "Método para agregar elemento a lista",
		options: [
			"append()",
			"push()",
			"add()",
			"insert()"
		],
		correctAnswer: "append()"
	},
	{
		question: "Cómo se representa un comentario en Python?",
		options: [
			"//",
			"/* */",
			"#",
			"--"
		],
		correctAnswer: "#"
	},
	{
		question: "Cuál es el valor booleano de True?",
		options: [
			"1",
			"0",
			"True",
			"False"
		],
		correctAnswer: "True"
	},
	{
		question: "Cuál es el resultado de 'hola' + 'mundo'?",
		options: [
			"holamundo",
			"'hola' + 'mundo'",
			"hola mundo",
			"Error"
		],
		correctAnswer: "holamundo"
	},
	{
		question: "Cuál es el operador para división entera?",
		options: [
			"/",
			"//",
			"%",
			"div"
		],
		correctAnswer: "//"
	},
	{
		question: "Tipo de datos para números enteros",
		options: [
			"Int",
			"Integer",
			"Number",
			"Num"
		],
		correctAnswer: "Int"
	},
	{
		question: "Cómo se verifica si dos objetos son iguales?",
		options: [
			"==",
			"===",
			"=",
			"equals()"
		],
		correctAnswer: "=="
	},
	{
		question: "Operador de asignación en Python",
		options: [
			"=",
			"==",
			":=",
			"->"
		],
		correctAnswer: "="
	},
	{
		question: "Método para eliminar último elemento de lista",
		options: [
			"pop()",
			"delete()",
			"remove()",
			"last()"
		],
		correctAnswer: "pop()"
	},
	{
		question: "Cómo se declara una tupla vacía?",
		options: [
			"{}",
			"tupla()",
			"()",
			"tuple{}"
		],
		correctAnswer: "()"
	},
	{
		question: "Qué devuelve la función range(5)?",
		options: [
			"Lista de 0 a 5",
			"Lista de 1 a 5",
			"Lista de 1 a 4",
			"Lista de 0 a 4"
		],
		correctAnswer: "Lista de 0 a 4"
	}
];

const $$Astro = createAstro();
const $$Question = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Question;
  const json = JSON.stringify(QuestionsJson);
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(json, "data-json")} class="quiz-question hidden py-10 flex-col gap-11 text-white" data-astro-cid-hzr35ht4> <p class="progress font-['Fredoka'] gap-2 text-xl text-center drop-shadow-sm flex items-center justify-center text-gray-300" data-astro-cid-hzr35ht4>
Pregunta <span class="glide-text progress-number" data-astro-cid-hzr35ht4>0</span> de ${QuestionsJson.length} </p> <h2 class="glide-text question text-3xl text-center font-bold" data-astro-cid-hzr35ht4>Pregunta</h2> <div class="options grid grid-cols-1 place-items-center *:py-3 *:border gap-3 *:text-center *:w-[90%] md:*:w-[80%] hover:*:text-black *:max-w-[400px] hover:*:bg-py-yellow cursor-default *:font-medium text-lg" data-astro-cid-hzr35ht4> <button class="glide-text" data-astro-cid-hzr35ht4>opcion</button> <button class="glide-text" data-astro-cid-hzr35ht4>opcion</button> <button class="glide-text" data-astro-cid-hzr35ht4>opcion</button> <button class="glide-text" data-astro-cid-hzr35ht4>opcion</button> </div> </section> `;
}, "/home/user/dev/projects/python-quiz/src/pages/sections/Question.astro", void 0);

const $$file = "/home/user/dev/projects/python-quiz/src/pages/sections/Question.astro";
const $$url = "/sections/Question";

export { $$Question as default, $$file as file, $$url as url };
