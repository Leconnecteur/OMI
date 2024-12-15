import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Property } from '@/types/property';
import { useUserProperties } from '@/hooks/useUserProperties';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const PropertyHistory: React.FC = () => {
  const { properties, loading } = useUserProperties();
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Générer la liste des mois disponibles
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    properties.forEach((property) => {
      if (property.createdAt) {
        const date = new Date(property.createdAt);
        const monthKey = format(date, 'yyyy-MM');
        months.add(monthKey);
      }
    });
    return Array.from(months).sort().reverse();
  }, [properties]);

  // Filtrer les propriétés par mois
  const filteredProperties = useMemo(() => {
    if (selectedMonth === 'all') return properties;
    
    return properties.filter((property) => {
      if (!property.createdAt) return false;
      const date = new Date(property.createdAt);
      const propertyMonth = format(date, 'yyyy-MM');
      return propertyMonth === selectedMonth;
    });
  }, [properties, selectedMonth]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Historique des biens saisis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select
            value={selectedMonth}
            onValueChange={setSelectedMonth}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner un mois" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les mois</SelectItem>
              {availableMonths.map((month) => (
                <SelectItem key={month} value={month}>
                  {format(new Date(month), 'MMMM yyyy', { locale: fr })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date de saisie</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Surface</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    {property.createdAt
                      ? format(new Date(property.createdAt), 'dd/MM/yyyy', { locale: fr })
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.price.toLocaleString('fr-FR')} €</TableCell>
                  <TableCell>{property.surface} m²</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyHistory;
