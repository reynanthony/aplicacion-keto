// Importar utilidades de seguridad (cargado antes en el HTML)
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
console.log("[compras] Foods initialized with defaults");
return;
}
var hasValidData=foods.length>0&&typeof foods[0].calories==="number";
if(!hasValidData){
console.log("[compras] Data corrupted, reinitializing...");
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

var addingFoodId=null;
var addingFoodUnits=[];
var addingFoodCurrentUnit=0;

function getFoodRiskAnalysis(foodName, grams){
var netCarbsPer100=0;
if(window.inspectorKeto&&typeof window.inspectorKeto.inspeccionarReceta==="function"){
var report=window.inspectorKeto.inspeccionarReceta({
id:"tmp_food",
title:foodName,
porciones:1,
ingredients:[(grams||100)+"g "+foodName]
});
if(report&&report.ingredientes_analizados&&report.ingredientes_analizados.length>0){
var item=report.ingredientes_analizados[0];
return {
nivel:item.nivel,
sugerencia:item.sugerencia,
carbs:item.carb_netos_estimados
};
}
}
// Fallback por net carbs cuando no estÃ¡ cargado el inspector
var foods=getFoods();
var food=foods.find(function(f){return f.name===foodName;});
if(food){
netCarbsPer100=Math.max(0,(parseFloat(food.carbs)||0)-(parseFloat(food.fiber)||0));
}
var nivel=netCarbsPer100>20?"critico":(netCarbsPer100>6?"moderado":"seguro");
return {
nivel:nivel,
sugerencia:nivel==="critico"?"Reemplazar por alternativa keto de menor carbohidrato":"Compatible con keto en porcion adecuada",
carbs:Math.round((netCarbsPer100*(grams||100))/100*10)/10
};
}

function renderRiskPill(level){
var config={
critico:{label:"Crítico",cls:"kc-c-red"},
moderado:{label:"Moderado",cls:"kc-c-amber"},
seguro:{label:"Seguro",cls:"kc-c-mint"}
};
var meta=config[level]||config.moderado;
return '<span class="kc-chip kc-chip--sm '+meta.cls+'">'+meta.label+'</span>';
}

function updateAddRiskInfo(food,grams){
var panel=document.getElementById("addRiskInfo");
if(!panel||!food)return;
var analysis=getFoodRiskAnalysis(food.name,grams||100);
var html='<div class="mt-2">'+renderRiskPill(analysis.nivel)+'</div>';
html+='<p class="text-xs text-on-surface-variant mt-2">Estimado: '+analysis.carbs+'g netos por porcion seleccionada.</p>';
if(analysis.nivel==="critico"){
html+='<p class="text-xs text-yellow-300 mt-1">Sugerencia: '+analysis.sugerencia+'</p>';
}
panel.innerHTML=html;
}

function openAddModal(foodId){
var foods=getFoods();
var food=foods.find(function(f){return f.id===foodId});
if(!food)return;
addingFoodId=foodId;
addingFoodUnits=food.units||[{name:"gramos",grams:1}];
addingFoodCurrentUnit=0;
document.getElementById("addFoodName").textContent=food.name;
document.getElementById("addFoodPortion").textContent="1 "+addingFoodUnits[0].name+" = "+Math.round(addingFoodUnits[0].grams)+"g";
updateAddRiskInfo(food,addingFoodUnits[0].grams);
document.getElementById("addQuantity").value=1;
document.getElementById("addModal").classList.remove("hidden");
document.getElementById("addModal").classList.add("flex");
renderUnitSelector();
updateAddPreview();
}

function renderUnitSelector(){
var container=document.getElementById("unitSelector");
var html="";
addingFoodUnits.forEach(function(unit,index){
var active=index===addingFoodCurrentUnit?"kc-btn--primary":"kc-btn--secondary";
html+='<button onclick="selectUnit('+index+')" class="kc-btn kc-btn--sm '+active+'" style="margin:0 6px 6px 0">'+unit.name+'</button>';
});
container.innerHTML=html;
}

function selectUnit(index){
addingFoodCurrentUnit=index;
renderUnitSelector();
updateAddPreview();
}

function closeAddModal(){
document.getElementById("addModal").classList.add("hidden");
document.getElementById("addModal").classList.remove("flex");
var panel=document.getElementById("addRiskInfo");
if(panel){panel.innerHTML="";}
addingFoodId=null;
}

function updateAddPreview(){
var qty=parseFloat(document.getElementById("addQuantity").value)||0;
var unit=addingFoodUnits[addingFoodCurrentUnit];
var totalGrams=Math.round(qty*unit.grams);
document.getElementById("addPreview").textContent=totalGrams.toLocaleString()+" g";
if(addingFoodId){
var foods=getFoods();
var food=foods.find(function(f){return f.id===addingFoodId;});
if(food){updateAddRiskInfo(food,totalGrams);}
}
}

function confirmAdd(){
if(!addingFoodId)return;
var qty=parseFloat(document.getElementById("addQuantity").value)||0;
if(qty<=0){window.showToast("Ingresa una cantidad valida", 3000, "warning");return;}
var foods=getFoods();
var food=foods.find(function(f){return f.id===addingFoodId;});
if(!food){window.showToast("No se encontro el alimento", 3000, "warning");return;}
var unit=addingFoodUnits[addingFoodCurrentUnit];
var totalGrams=Math.round(qty*unit.grams);
if(totalGrams<=0){window.showToast("La cantidad en gramos debe ser mayor a 0", 3000, "warning");return;}
var analysis=getFoodRiskAnalysis(food.name,totalGrams);
if(analysis.nivel==="critico"){
var proceed=confirm("Este alimento es CRITICO para cetosis.\n\n"+analysis.sugerencia+"\n\nDeseas agregarlo de todos modos?");
if(!proceed){return;}
}
var despensa=getDespensa();
if(despensa[addingFoodId]){
despensa[addingFoodId].stock+=totalGrams;
}else{
despensa[addingFoodId]={stock:totalGrams,lastUpdated:new Date().toISOString()};
}
saveDespensa(despensa);
closeAddModal();
loadDespensa();
showToast(qty+" "+unit.name+" agregados");
}

function removeFromDespensa(foodId){
var foods=getFoods();
var food=foods.find(function(f){return f.id===foodId});
if(confirm("Eliminar "+food.name+" de tu despensa?")){
var despensa=getDespensa();
delete despensa[foodId];
saveDespensa(despensa);
loadDespensa();
showToast("Eliminado de la despensa");
}
}

function updateStock(foodId,delta){
var despensa=getDespensa();
if(despensa[foodId]){
despensa[foodId].stock=Math.max(0,despensa[foodId].stock+delta);
despensa[foodId].lastUpdated=new Date().toISOString();
saveDespensa(despensa);
loadDespensa();
}
}

function showToast(message){
var toast=document.getElementById("toast");
document.getElementById("toastMessage").textContent=message;
toast.classList.remove("hidden");
clearTimeout(window._cmpToastT);
window._cmpToastT=setTimeout(function(){toast.classList.add("hidden");},2200);
}

function loadDespensa(){
var container=document.getElementById("despensaList");
if(!container){return;}
var foods=getFoods();
var despensa=getDespensa();
var catColors={"Proteínas":"#ff4d00","Grasas":"#ffb300","Verduras":"#4caf50","Lácteos":"#9c27b0","Frutos secos":"#ff9800","Otros":"#9c27b0"};
var catIcons={"Proteínas":"egg_alt","Grasas":"water_drop","Verduras":"eco","Lácteos":"restaurant","Frutos secos":"cookie","Otros":"shopping_bag"};
var categories=["Proteínas","Grasas","Verduras","Lácteos","Frutos secos","Otros"];
var totalCal=0,totalItems=0,totalStock=0,activeCats=0;
var catData={};
categories.forEach(function(cat){
catData[cat]={items:[],cal:0,stock:0};
});
foods.forEach(function(f){
var item=despensa[f.id];
var stock=0;
if(item){
stock=parseFloat(item.stock)||parseFloat(item.quantity)||0;
}
if(stock>0){
var portion=parseFloat(f.portion)||100;
var calories=parseFloat(f.calories)||0;
var ratio=stock/portion;
var cal=Math.round(calories*ratio);
catData[f.category].items.push({food:f,stock:stock,cal:cal});
catData[f.category].cal+=cal;
catData[f.category].stock+=stock;
totalCal+=cal;
totalStock+=stock;
totalItems++;
}
});
categories.forEach(function(cat){
if(catData[cat].items.length>0)activeCats++;
});

// KPIs del inventario (mismo modelo gauge que "Hoy")
var stockDisp=totalStock>=1000?fmt(totalStock/1000)+' kg':fmt(totalStock)+' g';
var setK=function(id,v){var e=document.getElementById(id);if(e)e.textContent=v;};
setK('kpiKcal',fmt(totalCal));
setK('kpiItems',totalItems);
setK('kpiStock',stockDisp);
setK('kpiCats',activeCats);
var catsBar=document.getElementById('kpiCatsBar');
if(catsBar)catsBar.style.width=Math.round(activeCats/6*100)+'%';

if(totalItems===0){
container.innerHTML='<div class="cmp-empty"><span class="material-symbols-outlined">inventory_2</span><p>Tu despensa está vacía</p><p class="sub">Ve a "Agregar" para empezar</p></div>';
return;
}

var catAccent={"Proteínas":"kc-c-red","Grasas":"kc-c-amber","Verduras":"kc-c-mint","Lácteos":"kc-c-cyan","Frutos secos":"kc-c-amber","Otros":"kc-c-cyan"};
var html='';
categories.forEach(function(cat){
if(catData[cat].items.length===0)return;
var accent=catAccent[cat]||'kc-c-cyan';
html+='<div class="cmp-cat '+accent+'">';
html+='<div class="cmp-cat__h">';
html+='<div class="cmp-cat__name"><span class="material-symbols-outlined" style="color:var(--c)">'+catIcons[cat]+'</span>'+cat+' <span class="cmp-cat__count">('+catData[cat].items.length+')</span></div>';
html+='<div class="cmp-cat__cal" style="color:var(--c)">'+fmt(catData[cat].cal)+' kcal</div></div>';
catData[cat].items.forEach(function(d){
var percent=Math.min((d.stock/1000)*100,100);
var color=getStockColor(percent);
var stockDisplay=d.stock>=1000?fmt(d.stock/1000)+'kg':fmt(d.stock)+'g';
var safeFoodName=escapeHtml(d.food.name);
html+='<div class="cmp-row">';
html+='<div class="cmp-row__main"><div class="cmp-row__name">'+safeFoodName+'</div>';
html+='<div class="cmp-row__meta"><div class="cmp-row__bar"><i style="width:'+percent+'%;background:'+color+'"></i></div>';
html+='<span class="cmp-row__stock" style="color:'+color+'">'+stockDisplay+'</span></div></div>';
html+='<div class="cmp-row__cal">'+fmt(d.cal)+'<small> kcal</small></div>';
html+='<button class="cmp-step" onclick="updateStock(\''+d.food.id+'\',-100)">−</button>';
html+='<button class="cmp-step" onclick="updateStock(\''+d.food.id+'\',100)">+</button>';
html+='<button class="cmp-del" onclick="removeFromDespensa(\''+d.food.id+'\')">×</button>';
html+='</div>';
});
html+='</div>';
});
container.innerHTML=html;
}

function loadAvailable(){
var container=document.getElementById("availableList");
var foods=getFoods();
var despensa=getDespensa();
var catColors={"Proteínas":"#ff4d00","Grasas":"#ffb300","Verduras":"#4caf50","Lácteos":"#9c27b0","Frutos secos":"#ff9800","Otros":"#9c27b0"};
var categories=["Proteínas","Grasas","Verduras","Lácteos","Frutos secos","Otros"];
var html="";
categories.forEach(function(cat){
var catFoods=foods.filter(function(f){return f.category===cat&&(!despensa[f.id]||despensa[f.id].stock<=0)});
if(catFoods.length>0){
html+='<div class="cmp-groupt"><span class="dot" style="background:'+catColors[cat]+'"></span>'+cat+'</div>';
catFoods.forEach(function(food){
var safeFoodName = escapeHtml(food.name);
var riskInfo=getFoodRiskAnalysis(food.name,food.portion||100);
html+='<div class="cmp-food" onclick="openAddModal(\''+food.id+'\')">';
html+='<span class="material-symbols-outlined" style="color:var(--kc-amber);font-size:19px">add_circle</span>';
html+='<span class="cmp-food__name">'+safeFoodName+'</span>';
html+=renderRiskPill(riskInfo.nivel);
html+='<span class="cmp-food__g">'+food.portion+'g</span></div>';
});
}
});
if(html===""){
html='<p class="kc-label" style="text-align:center;padding:24px 0">Todos los alimentos ya están en tu despensa</p>';
}
container.innerHTML=html;
}

function switchTab(tab){
['tabDespensa','tabAvailable','tabPlan'].forEach(function(id){
  var el=document.getElementById(id);
  if(el) el.classList.remove('is-active');
});
['despensaSection','availableSection','planSection'].forEach(function(id){
  var el=document.getElementById(id);
  if(el) el.classList.add('hidden');
});
var tabId,secId;
if(tab==='plan'){tabId='tabPlan';secId='planSection';}
else if(tab==='available'){tabId='tabAvailable';secId='availableSection';}
else{tabId='tabDespensa';secId='despensaSection';}
var t=document.getElementById(tabId); if(t) t.classList.add('is-active');
var s=document.getElementById(secId); if(s) s.classList.remove('hidden');
if(tab==='plan') loadPlanShoppingList();
else if(tab==='available') loadAvailable();
else loadDespensa();
}

function loadPlanShoppingList(){
  var container=document.getElementById('planShoppingList');
  if(!container) return;
  var today=new Date();
  var needed={};
  for(var i=0;i<7;i++){
    var d=new Date(today); d.setDate(today.getDate()+i);
    var dk=d.toISOString().slice(0,10);
    var plan=safeParseJSON(localStorage.getItem('mealPlan_'+dk),{});
    ['desayuno','almuerzo','cena','snacks'].forEach(function(meal){
      (plan[meal]||[]).forEach(function(item){
        var key=item.name||item.id||'item';
        if(!needed[key]) needed[key]={name:key,totalG:0,days:0,id:item.id};
        needed[key].totalG+=parseFloat(item.portion||100);
        needed[key].days++;
      });
    });
  }
  var items=Object.values(needed);
  if(!items.length){
    container.innerHTML='<div class="cmp-empty"><span class="material-symbols-outlined">event_busy</span><p>No hay alimentos en el plan de esta semana.</p><a href="/app/plan" class="kc-btn kc-btn--secondary kc-btn--sm" style="margin-top:14px;text-decoration:none">Ir al plan</a></div>';
    return;
  }
  var despensa=getDespensa();
  var html='<div class="kc-eyebrow" style="margin-bottom:10px">'+items.length+' alimento'+(items.length>1?'s':'')+' · próximos 7 días</div>';
  items.sort(function(a,b){return b.totalG-a.totalG;}).forEach(function(item){
    var entry=item.id?despensa[item.id]:null;
    var stockG=entry?(parseFloat(entry.stock)||0):0;
    var needed2=Math.round(item.totalG);
    var enough=stockG>=needed2;
    html+='<div class="cmp-plan">';
    html+='<span class="kc-ico '+(enough?'kc-c-mint':'kc-c-red')+'"><span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">'+(enough?'check_circle':'shopping_cart')+'</span></span>';
    html+='<div class="cmp-plan__main">';
    html+='<div class="cmp-plan__name">'+escapeHtml(item.name)+'</div>';
    html+='<div class="cmp-plan__sub">Necesitas '+needed2+'g · '+item.days+' comida'+(item.days>1?'s':'')+'</div>';
    html+='</div>';
    if(enough){
      html+='<span class="cmp-plan__flag" style="color:var(--kc-mint)">✓ Tienes</span>';
    }else{
      var falta=needed2-Math.round(stockG);
      html+='<span class="cmp-plan__flag" style="color:var(--kc-red)">Falta '+falta+'g</span>';
    }
    html+='</div>';
  });
  container.innerHTML=html;
}

function resetDespensaData(){
if(confirm("Esto eliminará todos los datos de la despensa y reiniciará los alimentos. ¿Continuar?")){
localStorage.removeItem("despensa");
localStorage.removeItem("ketoFoods");
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
showToast("Datos reiniciados");
loadDespensa();
}
}

document.addEventListener("DOMContentLoaded",function(){
initFoods();
switchTab("despensa");
document.getElementById("addQuantity").addEventListener("input",updateAddPreview);
});
