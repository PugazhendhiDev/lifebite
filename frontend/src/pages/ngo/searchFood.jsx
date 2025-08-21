import { useMemo } from "react";
import { MapPin, Timer } from "lucide-react";

function SearchFood() {
  const foodList = useMemo(() => [
    {id:1, img:"https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop", title:"Veg Pulao + Curry", km:2.4, allergens:["Nuts"], expiry:"2h"},
    {id:2, img:"https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop", title:"Sandwich Trays", km:3.1, allergens:["Gluten","Dairy"], expiry:"3h"},
    {id:3, img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop", title:"Salad Bowls", km:1.2, allergens:["Soy"], expiry:"1h"}
  ], []);

  return (
    <div className="w-full min-h-screen bg-white py-10 mb-20 flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full max-w-5xl px-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Search Food</h1>
        <p className="text-gray-600 mt-2">Browse safe food nearby & request pickup</p>
      </div>
    
      <div className="w-full max-w-5xl px-6">
        {/* Available Food Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {foodList.map(food => (
            <div key={food.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <img src={food.img} alt={food.title} className="h-40 w-full object-cover"/>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{food.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <MapPin className="h-4 w-4"/> {food.km} km away
                    <Timer className="h-4 w-4 ml-3"/> {food.expiry} left
                  </div>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {food.allergens.map(a => (
                      <span key={a} className="text-xs bg-gray-200 px-2 py-1 rounded-full">Contains {a}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">Request Pickup</button>
                  <button className="flex-1 border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-50 transition-colors">Schedule</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests Section */}
      <div className="w-full max-w-5xl px-6 mt-10">
        <div className="bg-white rounded-2xl shadow-md p-6 text-gray-600">
          No active requests. Explore available food to create one.
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full max-w-5xl px-6 mt-10">
        <div className="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="NGO Name" defaultValue="Hope Shelter" className="border border-gray-300 rounded-lg px-3 py-2 w-full"/>
          <input type="text" placeholder="Phone" defaultValue="+91 98xxxxxx" className="border border-gray-300 rounded-lg px-3 py-2 w-full"/>
          <textarea placeholder="Address" defaultValue="12, Relief Street, City" className="border border-gray-300 rounded-lg px-3 py-2 w-full md:col-span-2"/>
          <button className="bg-emerald-600 text-white py-2 rounded-lg w-full md:w-auto hover:bg-emerald-700 transition-colors">Save</button>
        </div>
      </div>
    </div>
  );
}

export default SearchFood;
