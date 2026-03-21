var shoppingData = [
  {category: "Proteinas", iconColor: "#ff4d00", icon: "egg_alt", items: [
    {name: "Huevos", qty: "35 unidades"},
    {name: "Pechuga / muslos pollo", qty: "2.5 kg"},
    {name: "Carne molida 80/20", qty: "1.5 kg"},
    {name: "Carne res (corte graso)", qty: "1.2 kg"},
    {name: "Carne cerdo", qty: "1.2 kg"},
    {name: "Queso mozzarella", qty: "500 g"}
  ]},
  {category: "Verduras", iconColor: "#4caf50", icon: "eco", items: [
    {name: "Lechuga, pepino, tomate", qty: "3, 4, 6 uds"},
    {name: "Brocoli + coliflor", qty: "2 kg c/u"},
    {name: "Hongos", qty: "1.5 kg"}
  ]},
  {category: "Grasas", iconColor: "#ffb300", icon: "water_drop", items: [
    {name: "Aceite de oliva virgen", qty: "1 litro"},
    {name: "Mantequilla sin sal", qty: "500 g"}
  ]},
  {category: "Frutos secos", iconColor: "#ff9800", icon: "cookie", items: [
    {name: "Almendras crudas", qty: "300 g"}
  ]},
  {category: "Otros", iconColor: "#9c27b0", icon: "shopping_bag", items: [
    {name: "Aguacates", qty: "10-12 uds"}
  ]}
];

function loadShoppingList() {
  var container = document.getElementById("shoppingList");
  var stored = JSON.parse(localStorage.getItem("shop") || "{}");
  var html = "";
  
  for (var i = 0; i < shoppingData.length; i++) {
    var section = shoppingData[i];
    html += '<div class="space-y-2">';
    html += '<div class="flex items-center gap-3 px-4 py-3 bg-surface-container-high rounded-t-xl">';
    html += '<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">';
    html += '<span class="material-symbols-outlined" style="color:' + section.iconColor + '">' + section.icon + '</span>';
    html += '</div><p class="font-headline font-bold text-white">' + section.category + '</p></div>';
    
    for (var j = 0; j < section.items.length; j++) {
      var item = section.items[j];
      var key = section.category + "-" + item.name;
      var checked = stored[key] || false;
      html += '<div class="flex items-center gap-4 px-4 py-4 bg-surface-container-low cursor-pointer hover:bg-surface-container transition-all border-b border-white/5 ' + (checked ? 'opacity-50' : '') + '" onclick="toggleItem(\'' + key + '\')">';
      html += '<div class="w-6 h-6 rounded-md border-2 ' + (checked ? 'bg-primary-container border-primary-container' : 'border-on-surface-variant') + ' flex items-center justify-center flex-shrink-0">';
      if (checked) {
        html += '<span class="material-symbols-outlined text-white text-sm" style="font-variation-settings:\'FILL\' 1">check</span>';
      }
      html += '</div><div class="flex-1"><p class="font-headline font-medium text-white ' + (checked ? 'line-through' : '') + '">' + item.name + '</p><p class="text-sm text-on-surface-variant">' + item.qty + '</p></div></div>';
    }
    html += '</div>';
  }
  
  container.innerHTML = html;
}

function toggleItem(key) {
  var stored = JSON.parse(localStorage.getItem("shop") || "{}");
  stored[key] = !stored[key];
  localStorage.setItem("shop", JSON.stringify(stored));
  loadShoppingList();
}

function printList() {
  var printWindow = window.open("", "_blank");
  var html = "<html><head><title>Lista de Compras Keto</title>";
  html += "<style>body{font-family:system-ui;padding:20px;background:#fff;color:#000}h1{margin-bottom:20px}h2{margin-top:20px;padding:10px;background:#eee}li{padding:5px 0}</style>";
  html += "</head><body><h1>Lista de Compras - KetoLab</h1>";
  
  for (var i = 0; i < shoppingData.length; i++) {
    var section = shoppingData[i];
    html += "<h2>" + section.category + "</h2><ul>";
    for (var j = 0; j < section.items.length; j++) {
      var item = section.items[j];
      html += "<li>" + item.name + " - " + item.qty + "</li>";
    }
    html += "</ul>";
  }
  
  html += "</body></html>";
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}

loadShoppingList();
