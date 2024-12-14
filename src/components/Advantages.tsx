import React from 'react';
import { FileText, Lightbulb, Diamond, Shield } from 'lucide-react';

const advantages = [
  {
    title: "UN OUTIL À 100% DESTINÉ AUX PROFESSIONNELS DE L'IMMOBILIER",
    description: "Notre objectif est de fournir un service sécurisé, garantissant à nos partenaires que leurs informations sont utilisées de manière éthique et confidentielle.",
    icon: Shield,
    bgColor: "bg-[#4A4238]", // Marron foncé
  },
  {
    title: "UNE BASE DE DONNÉES EN TEMPS RÉEL",
    description: "Nos partenaires bénéficient d'une base de données à jour. Elle est essentielle dans un environnement, où la précision et la fraîcheur des informations sont cruciales.",
    icon: Lightbulb,
    bgColor: "bg-[#B4A99A]", // Beige moyen
  },
  {
    title: "DÉJÀ PLUS DE 50 PARTENAIRES",
    description: "En seulement quelques mois, nous avons su gagner la confiance d'une cinquantaine de professionnels du secteur. Leurs retours nous poussent à renforcer cette communauté.",
    icon: Diamond,
    bgColor: "bg-[#8C7E6D]", // Marron clair
  }
];

const features = [
  {
    title: "DES INFORMATIONS FIABLES",
    description: "Données vérifiées et mises à jour régulièrement",
    icon: FileText,
  },
  {
    title: "UNE SOLUTION NOVATRICE",
    description: "Technologies avancées pour une analyse précise",
    icon: Lightbulb,
  },
  {
    title: "UN OUTIL PRÉCIEUX À L'ESTIMATION",
    description: "Estimations basées sur des données réelles du marché",
    icon: Diamond,
  },
  {
    title: "CONFIDENTIALITÉ ET TRANSPARENCE",
    description: "Sécurité et protection des données garanties",
    icon: Shield,
  }
];

export default function Advantages() {
  return (
    <div className="relative overflow-hidden">
      {/* Section Avantages Principaux */}
      <div className="py-24 bg-[#F5F0EB]"> {/* Beige très clair pour le fond */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className={`${advantage.bgColor} rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300`}
              >
                <div className="p-8 h-full flex flex-col justify-between text-white">
                  <div>
                    <advantage.icon className="h-12 w-12 mb-6" />
                    <h3 className="text-xl font-bold mb-4 leading-tight">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-100 leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Caractéristiques */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl hover:bg-[#F5F0EB] transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center p-3 bg-[#E5DED5] rounded-xl mb-4">
                  <feature.icon className="h-8 w-8 text-[#4A4238]" />
                </div>
                <h4 className="text-lg font-semibold text-[#4A4238] mb-2">
                  {feature.title}
                </h4>
                <p className="text-[#8C7E6D]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
