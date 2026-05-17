import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        category: "Smartphones",
        description:
          "Flagship Android phone with advanced camera system and S Pen support.",
        imageUrl:
          "https://images.unsplash.com/photo-1610945415295-d9bbf132e32c?w=800&q=80",
        featured: true,
        metadata: {
          brand: "Samsung",
          modelNumber: "S24 Ultra",
          ram: "12GB",
          storage: "512GB",
          camera: "200MP",
          battery: "5000mAh",
        },
      },
      {
        name: "iPhone 15 Pro",
        price: 999.99,
        category: "Smartphones",
        description: "Titanium design with A17 Pro chip and pro camera system.",
        imageUrl:
          "https://images.unsplash.com/photo-1695048063142-9f63ea0f3a0a?w=800&q=80",
        featured: true,
        metadata: {
          brand: "Apple",
          modelNumber: "A3101",
          ram: "8GB",
          storage: "256GB",
          camera: "48MP",
          battery: "3274mAh",
        },
      },
      {
        name: "Anker 65W GaN Charger",
        price: 49.99,
        category: "Chargers",
        description: "Compact fast charger for phones, tablets, and laptops.",
        imageUrl:
          "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
        featured: true,
        metadata: {
          type: "Charger",
          power: "65W",
          fastCharging: true,
          ports: "2",
        },
      },
      {
        name: "Sony WF-1000XM5",
        price: 299.99,
        category: "Earbuds",
        description: "Industry-leading noise cancelling true wireless earbuds.",
        imageUrl:
          "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
        featured: false,
        metadata: {
          brand: "Sony",
          batteryLife: "8 hours",
          bluetoothVersion: "5.3",
          noiseCancelling: true,
        },
      },
      {
        name: "Spigen Ultra Hybrid Case",
        price: 24.99,
        category: "Cases",
        description: "Crystal clear protection with reinforced corners.",
        imageUrl:
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
        featured: false,
        metadata: {
          brand: "Spigen",
          material: "TPU + Polycarbonate",
          compatibility: "iPhone 15 Pro",
        },
      },
      {
        name: "USB-C to Lightning Cable",
        price: 19.99,
        category: "Cables",
        description: "Durable braided cable with fast charging support.",
        imageUrl:
          "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80",
        featured: false,
        metadata: {
          length: "1.2m",
          type: "USB-C to Lightning",
          fastCharging: true,
        },
      },
    ],
  });

  console.log("Seed completed: sample products created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
