import React from 'react';
import { BarChart3, Map, LineChart } from 'lucide-react';

const features = [
  {
    name: 'Analyse de marché',
    description: "Suivez l'évolution des prix et anticipez les tendances grâce à notre base de donnée.",
    icon: BarChart3,
  },
  {
    name: 'Cartographie interactive',
    description: 'Visualisez les données immobilières sur une carte détaillée.',
    icon: Map,
  },
  {
    name: 'Données en temps réel',
    description: 'Accédez aux dernières transactions et suivez les variations du marché en direct.',
    icon: LineChart,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      {/* Cercles décoratifs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#B4A99A] rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#8C7E6D] rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#E5DED5] rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center p-3 bg-[#F5F0EB] rounded-xl mb-6">
                <feature.icon className="h-8 w-8 text-[#4A4238]" />
              </div>
              <h3 className="text-xl font-semibold text-[#4A4238] mb-4">
                {feature.name}
              </h3>
              <p className="text-[#8C7E6D] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}