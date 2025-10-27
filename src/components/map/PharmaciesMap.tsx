// import React, { useState, useMemo } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { Phone, Navigation, MapPin, Clock, Star, Users } from "lucide-react";

// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//     iconUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//     shadowUrl:
//         "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// interface Pharmacy {
//     id: number;
//     name: string;
//     address: string;
//     phone: string;
//     location: [number, number];
//     type: string;
//     rating: number;
//     reviews: number;
//     staff: number;
//     openHours: string;
// }

// const pharmacies: Pharmacy[] = [
//     {
//         id: 1,
//         name: "Pharmacie Centrale",
//         address: "12 Rue de la Santé, Paris",
//         phone: "+33 1 23 45 67 89",
//         location: [48.8566, 2.3522],
//         type: "H24",
//         rating: 4.5,
//         reviews: 128,
//         staff: 12,
//         openHours: "Ouvert 24/7",
//     },
//     {
//         id: 2,
//         name: "Pharmacie de la Gare",
//         address: "8 Avenue de Lyon, Paris",
//         phone: "+33 1 98 76 54 32",
//         location: [48.8443, 2.3744],
//         type: "Jour",
//         rating: 4.2,
//         reviews: 89,
//         staff: 8,
//         openHours: "08h00 - 20h00",
//     },
// ];

// export const PharmaciesMap = () => {
//     const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
//         null
//     );

//     // 🔹 Empêche Leaflet de réutiliser le même container DOM entre deux montages
//     const mapKey = useMemo(
//         () => selectedPharmacy?.id ?? "default",
//         [selectedPharmacy?.id]
//     );

//     return (
//         <div className="flex flex-col md:flex-row gap-4 p-4">
//             {/* Liste des pharmacies */}
//             <div className="w-full md:w-1/3 space-y-4">
//                 {pharmacies.map((pharmacy) => (
//                     <div
//                         key={pharmacy.id}
//                         className={`p-4 rounded-lg shadow-md cursor-pointer transition border ${selectedPharmacy?.id === pharmacy.id
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200 bg-white"
//                             }`}
//                         onClick={() => setSelectedPharmacy(pharmacy)}
//                     >
//                         <h3 className="text-lg font-semibold flex items-center gap-2">
//                             <MapPin size={18} className="text-green-500" /> {pharmacy.name}
//                         </h3>
//                         <p className="text-gray-600">{pharmacy.address}</p>
//                         <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
//                             <span className="flex items-center gap-1">
//                                 <Clock size={14} /> {pharmacy.openHours}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <Star size={14} className="text-yellow-500" /> {pharmacy.rating}
//                             </span>
//                             <span className="flex items-center gap-1">
//                                 <Users size={14} /> {pharmacy.staff}
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Carte Leaflet */}
//             <div className="w-full md:w-2/3 h-[500px]">
//                 <MapContainer
//                     key={mapKey} // 🔹 Forcer un container unique
//                     center={selectedPharmacy?.location ?? [48.8566, 2.3522]}
//                     zoom={13}
//                     scrollWheelZoom={true}
//                     className="h-full w-full rounded-lg shadow-md"
//                 >
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="&copy; OpenStreetMap contributors"
//                     />
//                     {pharmacies.map((pharmacy) => (
//                         <Marker key={pharmacy.id} position={pharmacy.location}>
//                             <Popup>
//                                 <div>
//                                     <h3 className="font-semibold">{pharmacy.name}</h3>
//                                     <p className="text-sm text-gray-500">{pharmacy.address}</p>
//                                     <p className="mt-1 flex items-center gap-1">
//                                         <Phone size={14} /> {pharmacy.phone}
//                                     </p>
//                                     <a
//                                         href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.location[0]},${pharmacy.location[1]}`}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-green-600 underline text-sm mt-2 inline-block"
//                                     >
//                                         <Navigation size={14} className="inline-block mr-1" />
//                                         Itinéraire
//                                     </a>
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             </div>
//         </div>
//     );
// }
