/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
    if(typeof thali!=="object"||Array.isArray(thali)||thali===null||typeof(thali.name)!=="string"||!Array.isArray(thali.items)||isNaN(thali.price)||typeof(thali.isVeg)!=="boolean"){
      return "";
    }
    if(thali.isVeg){
      return `${thali.name.toUpperCase()} (Veg) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`
    }else{
      return `${thali.name.toUpperCase()} (Non-Veg) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`
    }
}

export function getThaliStats(thalis) {
  // Your code here
  if(!Array.isArray(thalis)||thalis.length===0){
    return null;
  }
  let vegCount=thalis.filter(items=>items.isVeg===true).length;
  let nonVegCount=thalis.filter(items=>items.isVeg===false).length;
  let totalThalis=thalis.length;
  let avgPrice=((thalis.reduce((accum,current)=>accum+current.price,0))/thalis.length).toFixed(2);
  let prices=thalis.map(items=>items.price)
  let cheapest=Math.min(...prices);
  let costliest=Math.max(...prices);
  let names=thalis.map(items=>items.name);
  return {totalThalis,vegCount,nonVegCount,avgPrice,cheapest,costliest,names}
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if(!Array.isArray(thalis)||typeof(query)!=="string"){
    return [];
  }
  const q = query.toLowerCase();

  return thalis.filter(thali =>thali.name?.toLowerCase().includes(q)||thali.items?.some(item =>item.toLowerCase().includes(q)));
  //let me try to explain: with thalis.filter were are iterating to each object of the array passed to us to find if something matches the condition(), in first part of the condition it takes out name property of the iterating element and makes it to lower case and compare it with query given  if its true it will return that element, if not match it will look in or part that is 2nd part. in 2nd part it will first take out the items from the element then since it is array it will go inside the some method in which the elements inside items iterate, now for each element in item it make it to lower case and then compare with query using the include
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here
  if(typeof(customerName)!=="string"||!Array.isArray(thalis)||thalis.length===0){
    return ""
  }
  let totalPrice=thalis.reduce((accum,current)=>accum+current.price,0);
  let lineItem=thalis.map(thali=>`- ${thali.name} x Rs.${thali.price}`);
  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineItem.join("\n")}\n---\nTotal: Rs.${totalPrice}\nItems: ${thalis.length}`
}
