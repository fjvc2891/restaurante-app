import json
import os

data = [
  {"model": "menu.category", "pk": 1, "fields": {"name": "Entradas", "slug": "entradas", "icon": "salad", "order": 1}},
  {"model": "menu.category", "pk": 2, "fields": {"name": "Platos Fuertes", "slug": "platos-fuertes", "icon": "dish", "order": 2}},
  {"model": "menu.category", "pk": 3, "fields": {"name": "Bebidas", "slug": "bebidas", "icon": "cup", "order": 3}},
  {"model": "menu.category", "pk": 4, "fields": {"name": "Postres", "slug": "postres", "icon": "cake", "order": 4}},

  {"model": "menu.menuitem", "pk": 1, "fields": {"category": 1, "name": "Ensalada Cesar", "description": "Lechuga romana, crutones, queso parmesano y aderezo Cesar clasico.", "price": "18000.00", "image": "", "available": True, "featured": False}},
  {"model": "menu.menuitem", "pk": 2, "fields": {"category": 1, "name": "Sopa del Dia", "description": "Sopa casera preparada con ingredientes frescos del mercado.", "price": "14000.00", "image": "", "available": True, "featured": False}},
  {"model": "menu.menuitem", "pk": 3, "fields": {"category": 1, "name": "Tabla de Quesos", "description": "Seleccion de quesos artesanales con mermelada y pan tostado.", "price": "32000.00", "image": "", "available": True, "featured": True}},

  {"model": "menu.menuitem", "pk": 4, "fields": {"category": 2, "name": "Bandeja Paisa", "description": "Frijoles, chicharron, chorizo, huevo frito, aguacate, arroz y arepa.", "price": "38000.00", "image": "", "available": True, "featured": True}},
  {"model": "menu.menuitem", "pk": 5, "fields": {"category": 2, "name": "Filete de Res", "description": "Filete a la plancha con papas francesas y ensalada fresca.", "price": "55000.00", "image": "", "available": True, "featured": True}},
  {"model": "menu.menuitem", "pk": 6, "fields": {"category": 2, "name": "Pollo a la Broaster", "description": "Pollo crujiente marinado, acampanyado de papas y guacamole.", "price": "32000.00", "image": "", "available": True, "featured": False}},
  {"model": "menu.menuitem", "pk": 7, "fields": {"category": 2, "name": "Pasta Carbonara", "description": "Pasta al dente con salsa cremosa, panceta y queso parmesano.", "price": "29000.00", "image": "", "available": True, "featured": False}},

  {"model": "menu.menuitem", "pk": 8, "fields": {"category": 3, "name": "Limonada de Coco", "description": "Refrescante limonada con leche de coco.", "price": "12000.00", "image": "", "available": True, "featured": False}},
  {"model": "menu.menuitem", "pk": 9, "fields": {"category": 3, "name": "Jugo Natural", "description": "Jugo de fruta fresca del dia. Pregunte al mesero.", "price": "9000.00", "image": "", "available": True, "featured": False}},
  {"model": "menu.menuitem", "pk": 10, "fields": {"category": 3, "name": "Cafe Americano", "description": "Cafe de origen colombiano, preparado en espresso.", "price": "7000.00", "image": "", "available": True, "featured": False}},

  {"model": "menu.menuitem", "pk": 11, "fields": {"category": 4, "name": "Tres Leches", "description": "Suave bizcocho banyado en tres tipos de leche con crema chantilly.", "price": "16000.00", "image": "", "available": True, "featured": True}},
  {"model": "menu.menuitem", "pk": 12, "fields": {"category": 4, "name": "Brownie con Helado", "description": "Brownie de chocolate caliente con bola de helado de vainilla.", "price": "18000.00", "image": "", "available": True, "featured": False}}
]

file_path = r'c:\Users\Francisco\Documents\eclipse-workspace\Restaurante\backend\menu\fixtures\initial_data.json'
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully wrote {file_path}")
