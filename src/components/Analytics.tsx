import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { period: '30j', value: 4.2 },
  { period: '60j', value: 5.8 },
  { period: '90j', value: 6.5 },
  { period: '120j', value: 7.2 },
  { period: '150j', value: 8.1 },
  { period: '180j', value: 8.9 },
];

const typologyData = [
  { name: 'T1', value: 15 },
  { name: 'T2', value: 30 },
  { name: 'T3', value: 25 },
  { name: 'T4', value: 20 },
  { name: 'T5+', value: 10 },
];

const COLORS = ['#E5DED5', '#B4A99A', '#8C7E6D', '#4A4238', '#2A261F'];

export default function Analytics() {
  return (
    <div className="py-24 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#4A4238] mb-4">
            Analyses Détaillées du Marché
          </h2>
          <p className="text-xl text-[#8C7E6D]">
            Des données précises pour des décisions éclairées
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Graphique des délais de vente */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-[#4A4238] mb-6">
              Délai de Vente et Négociation
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DED5" />
                  <XAxis dataKey="period" stroke="#8C7E6D" />
                  <YAxis stroke="#8C7E6D" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F5F0EB',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#8C7E6D"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Graphique des typologies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-[#4A4238] mb-6">
              Répartition par Typologie
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typologyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={160}
                    fill="#8C7E6D"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {typologyData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F5F0EB',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Section des caractéristiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "1 RAPPORT ACTUALISÉ PAR MOIS",
              description: "Une analyse mensuelle complète des tendances du marché"
            },
            {
              title: "ANALYSES DÉTAILLÉES",
              description: "Données précises et segmentées par secteur géographique"
            },
            {
              title: "PRÉSENTATION DES TENDANCES",
              description: "Interventions sur site ou à distance pour présenter les évolutions du marché à vos équipes"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
            >
              <h4 className="text-xl font-semibold text-[#4A4238] mb-4">
                {item.title}
              </h4>
              <p className="text-[#8C7E6D]">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
