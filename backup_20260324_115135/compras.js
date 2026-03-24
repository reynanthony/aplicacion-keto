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
if(!stored||stored==="null"||stored==="undefined"){
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
}else{
try{
var foods=JSON.parse(stored);
var hasValidData=foods.length>0&&typeof foods[0].calories==="number";
if(!hasValidData){
console.log("Data corrupted, reinitializing...");
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
}
}catch(e){
console.log("Parse error, reinitializing...");
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
}
}
}

function getFoods(){
var stored=localStorage.getItem("ketoFoods");
if(stored&&stored!=="null"&&stored!="undefined"){
try{
var foods=JSON.parse(stored);
if(Array.isArray(foods)&&foods.length>0){
var hasValidData=typeof foods[0].calories==="number";
if(hasValidData){
foods.forEach(function(f){
if(!f.units)f.units=[{name:"gramos",grams:1},{name:"libras",grams:453.6},{name:"kilos",grams:1000}];
});
return foods;
}
}
}catch(e){}
}
localStorage.setItem("ketoFoods",JSON.stringify(defaultFoods));
return defaultFoods;
}

function getDespensa(){
var stored=localStorage.getItem("despensa");
if(stored){
try{return JSON.parse(stored);}catch(e){return {};}
}
return {};
}

function saveDespensa(data){
localStorage.setItem("despensa",JSON.stringify(data));
}

var addingFoodId=null;
var addingFoodUnits=[];
var addingFoodCurrentUnit=0;

function openAddModal(foodId){
var foods=getFoods();
var food=foods.find(function(f){return f.id===foodId});
if(!food)return;
addingFoodId=foodId;
addingFoodUnits=food.units||[{name:"gramos",grams:1}];
addingFoodCurrentUnit=0;
document.getElementById("addFoodName").textContent=food.name;
document.getElementById("addFoodPortion").textContent="1 "+addingFoodUnits[0].name+" = "+Math.round(addingFoodUnits[0].grams)+"g";
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
var active=index===addingFoodCurrentUnit?"bg-primary-container text-white":"bg-surface-container text-white/70 hover:bg-surface-container-high";
html+='<button onclick="selectUnit('+index+')" class="px-3 py-2 rounded-lg text-sm font-medium transition-all '+active+'">'+unit.name+'</button>';
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
addingFoodId=null;
}

function updateAddPreview(){
var qty=parseFloat(document.getElementById("addQuantity").value)||0;
var unit=addingFoodUnits[addingFoodCurrentUnit];
var totalGrams=Math.round(qty*unit.grams);
document.getElementById("addPreview").textContent=totalGrams.toLocaleString()+" g";
}

function confirmAdd(){
if(!addingFoodId)return;
var qty=parseFloat(document.getElementById("addQuantity").value)||0;
if(qty<=0){alert("Ingresa una cantidad válida");return;}
var unit=addingFoodUnits[addingFoodCurrentUnit];
var totalGrams=Math.round(qty*unit.grams);
if(totalGrams<=0){alert("La cantidad en gramos debe ser mayor a 0");return;}
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
toast.classList.remove("hidden","opacity-0","translate-y-4","pointer-events-none");
toast.classList.add("opacity-100","translate-y-0");
setTimeout(function(){
toast.classList.add("opacity-0","translate-y-4","pointer-events-none");
toast.classList.remove("opacity-100","translate-y-0");
},2000);
}

function getStockColor(percent){
if(percent<=10)return"#ff7351";
if(percent<=25)return"#ffb300";
if(percent<=50)return"#ffc107";
return"#4caf50";
}

function fmt(n){
if(typeof n!=="number"||isNaN(n))return"0";
return n.toLocaleString("en-US");
}

function loadDespensa(){
var container=document.getElementById("despensaList");
if(!container){console.error("Container not found");return;}
var foods=getFoods();
var despensa=getDespensa();
console.log("Despensa:", despensa);
console.log("Foods count:", foods.length);
var catColors={"Proteínas":"#ff4d00","Grasas":"#ffb300","Verduras":"#4caf50","Lácteos":"#9c27b0","Frutos secos":"#ff9800","Otros":"#9c27b0"};
var catIcons={"Proteínas":"egg_alt","Grasas":"water_drop","Verduras":"eco","Lácteos":"restaurant","Frutos secos":"cookie","Otros":"shopping_bag"};
var categories=["Proteínas","Grasas","Verduras","Lácteos","Frutos secos","Otros"];
var totalCal=0,totalItems=0,totalStock=0,activeCats=0;
var catData={};
categories.forEach(function(cat){
catData[cat]={items:[],cal:0,stock:0};
});
foods.forEach(function(f){
if(despensa[f.id]&&despensa[f.id].stock>0){
var item=despensa[f.id];
var stock=parseFloat(item.stock)||0;
var portion=parseFloat(f.portion)||100;
var calories=parseFloat(f.calories)||0;
var ratio=stock/portion;
var cal=Math.round(calories*ratio);
console.log(f.name+": stock="+stock+", portion="+portion+", cal="+cal);
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
if(totalItems===0){
container.innerHTML='<div style="background:#1e1c1c;border-radius:12px;padding:32px;text-align:center;border:1px solid rgba(255,255,255,0.1);">';
container.innerHTML+='<span class="material-symbols-outlined" style="font-size:48px;color:rgba(255,255,255,0.2)">inventory_2</span>';
container.innerHTML+='<p style="color:rgba(255,255,255,0.6);margin:12px 0 4px">Tu despensa está vacía</p>';
container.innerHTML+='<p style="color:rgba(255,255,255,0.4);font-size:13px">Ve a "Agregar Alimentos" para empezar</p></div>';
return;
}
var html='<div style="background:linear-gradient(135deg,rgba(255,77,0,0.15),rgba(255,179,0,0.1));border-radius:12px;padding:16px;margin-bottom:16px;border:1px solid rgba(255,77,0,0.2);">';
html+='<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">';
html+='<div><div style="font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase">Total kcal</div>';
html+='<div style="font-size:28px;font-weight:bold;color:#fff">'+fmt(totalCal)+'</div></div>';
html+='<div style="display:flex;gap:16px;">';
html+='<div style="text-align:center"><div style="font-size:16px;font-weight:bold;color:#fff">'+totalItems+'</div><div style="font-size:10px;color:rgba(255,255,255,0.5)">alimentos</div></div>';
html+='<div style="text-align:center"><div style="font-size:16px;font-weight:bold;color:#fff">'+(totalStock>=1000?fmt(totalStock/1000)+'kg':fmt(totalStock)+'g')+'</div><div style="font-size:10px;color:rgba(255,255,255,0.5)">stock</div></div>';
html+='<div style="text-align:center"><div style="font-size:16px;font-weight:bold;color:#fff">'+activeCats+'</div><div style="font-size:10px;color:rgba(255,255,255,0.5)">categorías</div></div>';
html+='</div></div>';
categories.forEach(function(cat){
if(catData[cat].items.length===0)return;
html+='<div style="background:#1e1c1c;border-radius:10px;padding:12px;margin-bottom:10px;border:1px solid rgba(255,255,255,0.08);">';
html+='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
html+='<div style="display:flex;align-items:center;gap:8px;">';
html+='<span class="material-symbols-outlined" style="font-size:20px;color:'+catColors[cat]+'">'+catIcons[cat]+'</span>';
html+='<span style="font-size:14px;font-weight:600;color:#fff">'+cat+'</span>';
html+='<span style="font-size:11px;color:rgba(255,255,255,0.5)">('+catData[cat].items.length+')</span></div>';
html+='<div style="font-size:14px;font-weight:bold;color:'+catColors[cat]+'">'+fmt(catData[cat].cal)+' kcal</div></div>';
html+='<div style="display:flex;flex-direction:column;gap:6px;">';
catData[cat].items.forEach(function(d){
var percent=Math.min((d.stock/1000)*100,100);
var color=getStockColor(percent);
var stockDisplay=d.stock>=1000?fmt(d.stock/1000)+'kg':fmt(d.stock)+'g';
html+='<div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.03);border-radius:6px;padding:8px;font-size:12px;">';
html+='<div style="flex:1;min-width:0;"><div style="color:#fff;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+d.food.name+'</div>';
html+='<div style="display:flex;align-items:center;gap:6px;margin-top:2px;">';
html+='<div style="flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">';
html+='<div style="width:'+percent+'%;height:100%;background:'+color+';border-radius:2px;"></div></div>';
html+='<span style="color:'+color+';font-size:10px;white-space:nowrap">'+stockDisplay+'</span></div></div>';
html+='<div style="text-align:right;min-width:40px;"><span style="font-weight:bold;color:#fff;font-size:12px">'+fmt(d.cal)+'</span><span style="font-size:9px;color:rgba(255,255,255,0.4)"> kcal</span></div>';
html+='<button onclick="updateStock(\''+d.food.id+'\',-100)" style="width:24px;height:24px;border-radius:4px;background:rgba(255,255,255,0.1);border:none;color:#fff;font-size:14px;cursor:pointer;padding:0;line-height:1">−</button>';
html+='<button onclick="updateStock(\''+d.food.id+'\',100)" style="width:24px;height:24px;border-radius:4px;background:rgba(255,255,255,0.1);border:none;color:#fff;font-size:14px;cursor:pointer;padding:0;line-height:1">+</button>';
html+='<button onclick="removeFromDespensa(\''+d.food.id+'\')" style="width:24px;height:24px;border-radius:4px;background:rgba(255,100,100,0.15);border:none;color:#ff6464;font-size:14px;cursor:pointer;padding:0;line-height:1">×</button></div>';
});
html+='</div></div>';
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
html+='<div class="mb-4">';
html+='<div class="flex items-center gap-2 mb-2">';
html+='<div class="w-3 h-3 rounded-full" style="background:'+catColors[cat]+'"></div>';
html+='<h4 class="text-sm font-medium text-on-surface-variant">'+cat+'</h4></div>';
html+='<div class="space-y-1">';
catFoods.forEach(function(food){
html+='<div class="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all" onclick="openAddModal(\''+food.id+'\')">';
html+='<span class="material-symbols-outlined text-on-surface-variant text-lg">add_circle</span>';
html+='<span class="text-sm text-white flex-1">'+food.name+'</span>';
html+='<span class="text-xs text-on-surface-variant">'+food.portion+'g</span></div>';
});
html+='</div></div>';
}
});
if(html===""){
html='<p class="text-center text-on-surface-variant py-8">Todos los alimentos ya están en tu despensa</p>';
}
container.innerHTML=html;
}

function switchTab(tab){
document.getElementById("tabDespensa").classList.remove("bg-primary-container","text-white");
document.getElementById("tabDespensa").classList.add("bg-surface-container","text-on-surface-variant");
document.getElementById("tabAvailable").classList.remove("bg-primary-container","text-white");
document.getElementById("tabAvailable").classList.add("bg-surface-container","text-on-surface-variant");
document.getElementById("despensaSection").classList.add("hidden");
document.getElementById("availableSection").classList.add("hidden");
if(tab==="despensa"){
document.getElementById("tabDespensa").classList.remove("bg-surface-container","text-on-surface-variant");
document.getElementById("tabDespensa").classList.add("bg-primary-container","text-white");
document.getElementById("despensaSection").classList.remove("hidden");
loadDespensa();
}else{
document.getElementById("tabAvailable").classList.remove("bg-surface-container","text-on-surface-variant");
document.getElementById("tabAvailable").classList.add("bg-primary-container","text-white");
document.getElementById("availableSection").classList.remove("hidden");
loadAvailable();
}
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
