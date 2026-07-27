// Capa de datos de despensa/alimentos — compartida por compras.astro (v3).
// Las funciones de render de la UI anterior (loadDespensa/loadAvailable/
// loadPlanShoppingList/switchTab/openAddModal/confirmAdd/etc, todas atadas al
// markup viejo de 3 tabs) se retiraron al reescribir compras.astro sobre v3;
// solo queda la capa de datos, reutilizable por cualquier pantalla futura.
var defaultFoods=[
{id:"f1",name:"Huevos",portion:50,calories:78,protein:6,fat:5,carbs:0.6,category:"Proteínas",units:[{name:"unidades",grams:50},{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f2",name:"Pechuga de pollo",portion:100,calories:165,protein:31,fat:3.6,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f3",name:"Carne molida 80/20",portion:100,calories:254,protein:17,fat:20,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f4",name:"Salmón",portion:100,calories:208,protein:20,fat:13,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f5",name:"Bacon",portion:50,calories:270,protein:12,fat:23,carbs:1,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f6",name:"Cerdo (lomo)",portion:100,calories:143,protein:26,fat:3.5,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f7",name:"Carne de res (bistec)",portion:100,calories:271,protein:26,fat:18,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f8",name:"Atún",portion:100,calories:132,protein:28,fat:1,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000},{name:"latas",grams:140}]},
{id:"f9",name:"Hígado de res",portion:100,calories:135,protein:20,fat:4,carbs:4,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f10",name:"Pavo molido",portion:100,calories:149,protein:27,fat:3,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f11",name:"Codornices",portion:100,calories:192,protein:25,fat:10,carbs:0,category:"Proteínas",units:[{name:"gramos",grams:1},{name:"unidades",grams:100},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f12",name:"Aguacate",portion:100,calories:160,protein:2,fat:15,carbs:9,category:"Grasas",units:[{name:"gramos",grams:1},{name:"unidades",grams:200},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f13",name:"Aceite de oliva",portion:15,calories:119,protein:0,fat:13.5,carbs:0,category:"Grasas",units:[{name:"ml",grams:0.9},{name:"cucharadas",grams:15},{name:"litros",grams:900}]},
{id:"f14",name:"Mantequilla",portion:15,calories:102,protein:0.1,fat:11.5,carbs:0,category:"Grasas",units:[{name:"gramos",grams:1},{name:"cucharadas",grams:15},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f15",name:"Aceite de coco",portion:15,calories:121,protein:0,fat:13.5,carbs:0,category:"Grasas",units:[{name:"ml",grams:0.9},{name:"cucharadas",grams:15},{name:"litros",grams:900}]},
{id:"f16",name:"Ghee",portion:15,calories:130,protein:0,fat:14,carbs:0,category:"Grasas",units:[{name:"gramos",grams:1},{name:"cucharadas",grams:15},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f17",name:"Almendras",portion:30,calories:170,protein:6,fat:15,carbs:6,category:"Frutos secos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f18",name:"Nueces",portion:30,calories:196,protein:4.6,fat:19.5,carbs:4,category:"Frutos secos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f19",name:"Macadamia",portion:30,calories:204,protein:2.2,fat:21.5,carbs:4,category:"Frutos secos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f20",name:"Pecanas",portion:30,calories:196,protein:2.6,fat:20,carbs:4,category:"Frutos secos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f21",name:"Semillas de chía",portion:30,calories:138,protein:4.7,fat:9,carbs:12,category:"Frutos secos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f22",name:"Semillas de linaza",portion:30,calories:150,protein:5,fat:12,carbs:8,category:"Frutos secos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f23",name:"Brócoli",portion:100,calories:34,protein:2.8,fat:0.4,carbs:7,category:"Verduras",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f24",name:"Coliflor",portion:100,calories:25,protein:2,fat:0.3,carbs:5,category:"Verduras",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f25",name:"Espinacas",portion:100,calories:23,protein:2.9,fat:0.4,carbs:3.6,category:"Verduras",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f26",name:"Champiñones",portion:100,calories:22,protein:3.1,fat:0.3,carbs:3.3,category:"Verduras",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f27",name:"Pimiento rojo",portion:100,calories:31,protein:1,fat:0.3,carbs:6,category:"Verduras",units:[{name:"gramos",grams:1},{name:"unidades",grams:120},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f28",name:"Pepino",portion:100,calories:15,protein:0.7,fat:0.1,carbs:3.6,category:"Verduras",units:[{name:"gramos",grams:1},{name:"unidades",grams:300},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f29",name:"Lechuga",portion:100,calories:15,protein:1.4,fat:0.2,carbs:2.9,category:"Verduras",units:[{name:"gramos",grams:1},{name:"unidades",grams:200},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f30",name:"Tomate",portion:100,calories:18,protein:0.9,fat:0.2,carbs:3.9,category:"Verduras",units:[{name:"gramos",grams:1},{name:"unidades",grams:150},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f31",name:"Cebolla",portion:100,calories:40,protein:1.1,fat:0.1,carbs:9.3,category:"Verduras",units:[{name:"gramos",grams:1},{name:"unidades",grams:150},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f32",name:"Ajo",portion:3,calories:4,protein:0.2,fat:0,carbs:1,category:"Verduras",units:[{name:"gramos",grams:1},{name:"dientes",grams:4},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f33",name:"Calabacín",portion:100,calories:17,protein:1.2,fat:0.3,carbs:3.1,category:"Verduras",units:[{name:"gramos",grams:1},{name:"unidades",grams:250},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f34",name:"Apio",portion:100,calories:16,protein:0.7,fat:0.2,carbs:3,category:"Verduras",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f35",name:"Queso mozzarella",portion:100,calories:280,protein:28,fat:17,carbs:3.1,category:"Lácteos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f36",name:"Queso cheddar",portion:30,calories:120,protein:7,fat:10,carbs:0.4,category:"Lácteos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f37",name:"Queso parmesano",portion:30,calories:111,protein:10,fat:7,carbs:0.4,category:"Lácteos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f38",name:"Queso crema",portion:30,calories:100,protein:2,fat:10,carbs:0.4,category:"Lácteos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f39",name:"Nata para cocinar",portion:100,calories:340,protein:2,fat:36,carbs:3,category:"Lácteos",units:[{name:"ml",grams:0.9},{name:"litros",grams:900}]},
{id:"f40",name:"Queso feta",portion:30,calories:75,protein:4,fat:6,carbs:1,category:"Lácteos",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f41",name:"Cacao puro",portion:10,calories:23,protein:2,fat:1.4,carbs:6,category:"Otros",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f42",name:"Coco rallado",portion:30,calories:187,protein:2,fat:18,carbs:8,category:"Otros",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f43",name:"Edamame",portion:100,calories:121,protein:12,fat:5,carbs:10,category:"Otros",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]},
{id:"f44",name:"Café con mantequilla",portion:240,calories:230,protein:2,fat:24,carbs:0,category:"Otros",units:[{name:"ml",grams:0.9},{name:"tazas",grams:240}]},
{id:"f45",name:"Chocolate negro 90%",portion:30,calories:150,protein:2,fat:13,carbs:4,category:"Otros",units:[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}]}
];

function initFoods(){
var stored=localStorage.getItem("ketoFoods");
var foods = safeParseJSON(stored, null);
if(!foods || !Array.isArray(foods) || foods.length === 0){
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
return;
}
var hasValidData=foods.length>0&&typeof foods[0].calories==="number";
if(!hasValidData){
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
}
}

function getFoods(){
var stored=localStorage.getItem("ketoFoods");
var foods = safeParseJSON(stored, null);
if(foods && Array.isArray(foods) && foods.length > 0 && typeof foods[0].calories === "number"){
foods.forEach(function(f){
if(!f.units)f.units=[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}];
});
return foods;
}
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
return defaultFoods;
}

function getDespensa(){
return safeParseJSON(localStorage.getItem("despensa"), {});
}

function saveDespensa(data){
localStorage.setItem("despensa",JSON.stringify(data));
}
