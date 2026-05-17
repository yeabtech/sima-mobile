export const CATEGORIES = [
  // 📱 Devices
  "Smartphones",
  "Feature Phones",
  "Foldable Phones",
  "Gaming Phones",
  "Refurbished Phones",

  // 🎧 Audio
  "Earbuds",
  "Headphones",
  "Neckband Earphones",
  "Wired Earphones",
  "Microphones",

  // 🔌 Charging & Power
  "Chargers",
  "Fast Chargers",
  "Wireless Chargers",
  "Cables",
  "Power Banks",
  "Car Chargers",
  "Charging Stations",

  // 🛡️ Protection
  "Cases",
  "Screen Protectors",
  "Camera Protectors",
  "Waterproof Cases",
  "Phone Sleeves",

  // 📷 Content Creation
  "Tripods",
  "Selfie Sticks",
  "Ring Lights",
  "Gimbals",
  "Camera Lenses",

  // 🎮 Gaming
  "Gaming Controllers",
  "Cooling Fans",
  "Gaming Triggers",
  "Gaming Headsets",

  // 🚗 Car Accessories
  "Car Mounts",
  "Magnetic Holders",
  "Bluetooth Transmitters",

  // 🌐 Storage & Connectivity
  "Memory Cards",
  "USB Drives",
  "OTG Adapters",
  "SIM Cards",
  "Bluetooth Adapters",

  // ⌚ Wearables
  "Smartwatches",
  "Fitness Bands",
  "Smart Glasses",

  // 🧩 Spare Parts
  "Batteries",
  "Displays",
  "Touch Screens",
  "Motherboards",
  "Camera Modules",
  "Speakers",
  "Microphone Parts",
  "Charging Ports",
  "Buttons",
  "Fingerprint Sensors",

  // 🧰 Repair Tools
  "Repair Kits",
  "Screwdriver Sets",
  "Opening Tools",
  "Soldering Tools",
  "Anti-static Tools",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICONS: Record<Category, string> = {
  // 📱 Devices
  Smartphones: "📱",
  "Feature Phones": "☎️",
  "Foldable Phones": "📲",
  "Gaming Phones": "🎮",
  "Refurbished Phones": "♻️",

  // 🎧 Audio
  Earbuds: "🎵",
  Headphones: "🎧",
  "Neckband Earphones": "🎶",
  "Wired Earphones": "🔊",
  Microphones: "🎤",

  // 🔌 Charging & Power
  Chargers: "🔌",
  "Fast Chargers": "⚡",
  "Wireless Chargers": "📡",
  Cables: "🔗",
  "Power Banks": "🔋",
  "Car Chargers": "🚗",
  "Charging Stations": "🏠",

  // 🛡️ Protection
  Cases: "📦",
  "Screen Protectors": "🛡️",
  "Camera Protectors": "📷",
  "Waterproof Cases": "💧",
  "Phone Sleeves": "👜",

  // 📷 Content Creation
  Tripods: "📸",
  "Selfie Sticks": "🤳",
  "Ring Lights": "💡",
  Gimbals: "🎥",
  "Camera Lenses": "🔍",

  // 🎮 Gaming
  "Gaming Controllers": "🕹️",
  "Cooling Fans": "❄️",
  "Gaming Triggers": "🎯",
  "Gaming Headsets": "🎧",

  // 🚗 Car Accessories
  "Car Mounts": "🚗",
  "Magnetic Holders": "🧲",
  "Bluetooth Transmitters": "📶",

  // 🌐 Storage & Connectivity
  "Memory Cards": "💾",
  "USB Drives": "🖥️",
  "OTG Adapters": "🔄",
  "SIM Cards": "📲",
  "Bluetooth Adapters": "📡",

  // ⌚ Wearables
  Smartwatches: "⌚",
  "Fitness Bands": "🏃",
  "Smart Glasses": "🕶️",

  // 🧩 Spare Parts
  Batteries: "🔋",
  Displays: "🖥️",
  "Touch Screens": "👆",
  Motherboards: "🧠",
  "Camera Modules": "📷",
  Speakers: "🔊",
  "Microphone Parts": "🎤",
  "Charging Ports": "🔌",
  Buttons: "🔘",
  "Fingerprint Sensors": "🆔",

  // 🧰 Repair Tools
  "Repair Kits": "🧰",
  "Screwdriver Sets": "🪛",
  "Opening Tools": "🔧",
  "Soldering Tools": "🔥",
  "Anti-static Tools": "⚡",
};