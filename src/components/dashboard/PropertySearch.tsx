import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
  Chip,
  Button,
  Paper,
  Collapse,
  useTheme,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import {
  House as HouseIcon,
  Apartment as ApartmentIcon,
  Landscape as LandscapeIcon,
  LocationCity as LocationCityIcon,
  Euro as EuroIcon,
  SquareFoot as SquareFootIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  CalendarMonth as CalendarIcon,
  Construction as ConstructionIcon,
  Thermostat as ThermostatIcon,
  Co2 as Co2Icon,
  LocalParking as ParkingIcon,
  Terrain as TerrainIcon,
  WaterDrop as WaterIcon,
  ElectricBolt as ElectricIcon,
  Home as HomeIcon,
  Explore as ExploreIcon,
  Deck as DeckIcon,
  Print as PrintIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';
import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Property, PropertyCondition, EPCRating, ExteriorType, ExposureType } from '../../types/property';
import logoImage from '../../assets/logo.png';

// Fonctions utilitaires pour les traductions
const translateCondition = (condition: PropertyCondition): string => {
  const translations: { [key in PropertyCondition]: string } = {
    'to-renovate': 'À rénover',
    'to-refresh': 'À rafraîchir',
    'good': 'Bon état',
    'very-good': 'Très bon état',
    'renovated': 'Rénové',
    'new': 'Neuf',
    'high-end': 'Haut de gamme',
    'vefa': 'VEFA'
  };
  return translations[condition];
};

const translateExterior = (exterior: ExteriorType | null | undefined): string => {
  if (!exterior) return 'Aucun';
  const translations: { [key in ExteriorType]: string } = {
    'none': 'Aucun',
    'garden': 'Jardin',
    'terrace': 'Terrasse',
    'balcon': 'Balcon'
  };
  return translations[exterior];
};

const translateExposure = (exposure: ExposureType | null | undefined): string => {
  if (!exposure) return 'Non spécifié';
  const translations: { [key in ExposureType]: string } = {
    'N': 'Nord',
    'NE': 'Nord-Est',
    'E': 'Est',
    'SE': 'Sud-Est',
    'S': 'Sud',
    'SO': 'Sud-Ouest',
    'O': 'Ouest',
    'NO': 'Nord-Ouest'
  };
  return translations[exposure];
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const PropertySearch = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minSurface: '',
    maxSurface: '',
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Charger les villes uniques depuis la base de données
  useEffect(() => {
    const loadCities = async () => {
      try {
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        const uniqueCities = new Set<string>();
        
        querySnapshot.forEach((doc) => {
          const property = doc.data();
          if (property.city) {
            uniqueCities.add(property.city);
          }
        });

        setCities(Array.from(uniqueCities).sort());
      } catch (error) {
        console.error("Erreur lors du chargement des villes:", error);
      }
    };

    loadCities();
  }, []);

  // Charger tous les biens au démarrage
  useEffect(() => {
    const loadAllProperties = async () => {
      try {
        setLoading(true);
        const propertiesRef = collection(db, 'properties');
        const querySnapshot = await getDocs(propertiesRef);
        const propertiesData: Property[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Property;
          propertiesData.push({
            id: doc.id,
            ...data
          });
        });

        setProperties(propertiesData);
      } catch (error) {
        console.error("Erreur lors du chargement des biens:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllProperties();
  }, []);

  // Mettre à jour les filtres actifs
  useEffect(() => {
    const newActiveFilters: string[] = [];
    if (filters.type) newActiveFilters.push(`Type: ${filters.type === 'apartment' ? 'Appartement' : filters.type === 'house' ? 'Maison' : 'Terrain'}`);
    if (filters.city) newActiveFilters.push(`Ville: ${filters.city}`);
    if (filters.minPrice) newActiveFilters.push(`Prix min: ${Number(filters.minPrice).toLocaleString()}€`);
    if (filters.maxPrice) newActiveFilters.push(`Prix max: ${Number(filters.maxPrice).toLocaleString()}€`);
    if (filters.minSurface) newActiveFilters.push(`Surface min: ${filters.minSurface}m²`);
    if (filters.maxSurface) newActiveFilters.push(`Surface max: ${filters.maxSurface}m²`);
    setActiveFilters(newActiveFilters);
  }, [filters]);

  // Gérer les changements de filtres
  const handleFilterChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  // Gérer le changement de ville
  const handleCityChange = (event: React.SyntheticEvent, newValue: string | null) => {
    setFilters(prev => ({
      ...prev,
      city: newValue || ''
    }));
  };

  // Réinitialiser les filtres
  const handleResetFilters = () => {
    setFilters({
      type: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      minSurface: '',
      maxSurface: '',
    });
  };

  // Supprimer un filtre spécifique
  const handleRemoveFilter = (filterLabel: string) => {
    const [label] = filterLabel.split(': ');
    let fieldToReset = '';
    
    switch (label.toLowerCase()) {
      case 'type':
        fieldToReset = 'type';
        break;
      case 'ville':
        fieldToReset = 'city';
        break;
      case 'prix min':
        fieldToReset = 'minPrice';
        break;
      case 'prix max':
        fieldToReset = 'maxPrice';
        break;
      case 'surface min':
        fieldToReset = 'minSurface';
        break;
      case 'surface max':
        fieldToReset = 'maxSurface';
        break;
    }

    if (fieldToReset) {
      setFilters(prev => ({
        ...prev,
        [fieldToReset]: ''
      }));
    }
  };

  // Filtrer les propriétés
  useEffect(() => {
    const filterProperties = async () => {
      try {
        setLoading(true);
        const propertiesRef = collection(db, 'properties');
        let queryRef = query(propertiesRef);
        
        // Construire la requête
        let conditions = [];
        
        if (filters.type) {
          conditions.push(where('type', '==', filters.type));
        }
        
        // Appliquer les conditions de la requête
        if (conditions.length > 0) {
          queryRef = query(propertiesRef, ...conditions);
        }
        
        const querySnapshot = await getDocs(queryRef);
        let filteredProperties = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Property[];
        
        // Filtrer côté client pour les autres critères
        if (filters.city) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.city?.toLowerCase().includes(filters.city.toLowerCase())
          );
        }
        
        if (filters.minPrice) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.price >= Number(filters.minPrice)
          );
        }
        
        if (filters.maxPrice) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.price <= Number(filters.maxPrice)
          );
        }
        
        if (filters.minSurface) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.surface >= Number(filters.minSurface)
          );
        }
        
        if (filters.maxSurface) {
          filteredProperties = filteredProperties.filter(prop => 
            prop.surface <= Number(filters.maxSurface)
          );
        }
        
        setProperties(filteredProperties);
      } catch (error) {
        console.error("Erreur lors du filtrage:", error);
      } finally {
        setLoading(false);
      }
    };

    filterProperties();
  }, [filters]);

  // Gérer l'ouverture du dialogue
  const handleOpenDialog = (property: Property) => {
    setSelectedProperty(property);
  };

  // Gérer la fermeture du dialogue
  const handleCloseDialog = () => {
    setSelectedProperty(null);
  };

  // Composant pour le dialogue des détails
  const PropertyDetailsDialog = () => {
    if (!selectedProperty) return null;

    const contentRef = useRef<HTMLDivElement>(null);

    // Fonction pour l'impression
    const handlePrint = () => {
      const printWindow = window.open('', '_blank');
      if (printWindow && contentRef.current) {
        // Créer une copie du contenu sans les icônes Material-UI
        const contentClone = contentRef.current.cloneNode(true) as HTMLElement;
        // Supprimer les icônes SVG
        contentClone.querySelectorAll('svg').forEach(svg => {
          svg.remove();
        });
        
        printWindow.document.write(`
          <html>
            <head>
              <title>Détails de la propriété</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  color: #333;
                }
                .logo {
                  width: 150px;
                  height: auto;
                  display: block;
                  margin: 0 auto 20px;
                }
                .section {
                  margin-bottom: 20px;
                }
                .section-title {
                  color: #1976d2;
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 10px;
                  padding-bottom: 5px;
                  border-bottom: 2px solid #1976d2;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 15px;
                  background-color: white;
                }
                th, td {
                  padding: 8px;
                  text-align: left;
                  border: 1px solid #ddd;
                }
                th {
                  background-color: #f5f5f5;
                  width: 40%;
                }
                @media print {
                  body {
                    padding: 0;
                  }
                  .section {
                    page-break-inside: avoid;
                  }
                }
              </style>
            </head>
            <body>
              <img src="${logoImage}" alt="OMI Logo" class="logo" />
              <h1 style="color: #1976d2; margin-bottom: 20px; text-align: center;">
                ${selectedProperty.type === 'apartment' ? 'Appartement' :
                  selectedProperty.type === 'house' ? 'Maison' : 'Terrain'}
              </h1>
              ${contentClone.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 250);
      }
    };

    // Fonction pour générer le PDF
    const handlePDF = async () => {
      try {
        const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
          import('jspdf'),
          import('html2canvas')
        ]);

        if (contentRef.current) {
          // Désactiver les boutons pendant la génération
          const buttons = document.querySelectorAll('button, [role="button"]');
          buttons.forEach(button => button.setAttribute('disabled', 'true'));

          const tempContainer = document.createElement('div');
          tempContainer.style.cssText = `
            padding: 20px;
            background: white;
            width: 800px;
          `;

          // Ajouter le logo
          const logoWrapper = document.createElement('div');
          logoWrapper.style.cssText = `
            text-align: center;
            margin-bottom: 20px;
          `;
          const logo = new Image();
          logo.src = logoImage;
          logo.style.width = '150px';
          logo.style.height = 'auto';
          logoWrapper.appendChild(logo);
          tempContainer.appendChild(logoWrapper);

          // Ajouter le titre
          const title = document.createElement('h1');
          title.style.cssText = `
            color: #1976d2;
            text-align: center;
            margin-bottom: 20px;
            font-family: Arial, sans-serif;
          `;
          title.textContent = selectedProperty.type === 'apartment' ? 'Appartement' :
                            selectedProperty.type === 'house' ? 'Maison' : 'Terrain';
          tempContainer.appendChild(title);

          // Ajouter le contenu
          const contentClone = contentRef.current.cloneNode(true) as HTMLElement;
          contentClone.querySelectorAll('svg').forEach(svg => svg.remove());
          tempContainer.appendChild(contentClone);

          // Ajouter à la page mais cacher
          tempContainer.style.position = 'absolute';
          tempContainer.style.left = '-9999px';
          document.body.appendChild(tempContainer);

          // Attendre que le logo soit chargé
          await new Promise((resolve) => {
            if (logo.complete) {
              resolve(null);
            } else {
              logo.onload = () => resolve(null);
            }
          });

          const canvas = await html2canvas(tempContainer, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false
          });

          // Nettoyer
          document.body.removeChild(tempContainer);

          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);

          // Réactiver les boutons
          buttons.forEach(button => button.removeAttribute('disabled'));

          pdf.save(`propriete_${selectedProperty.id}.pdf`);
        }
      } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        // Réactiver les boutons en cas d'erreur
        const buttons = document.querySelectorAll('button, [role="button"]');
        buttons.forEach(button => button.removeAttribute('disabled'));
      }
    };

    // Sections communes à tous les types de biens
    const commonSections = [
      {
        title: "Informations générales",
        items: [
          { label: "Type", value: selectedProperty.type === 'apartment' ? 'Appartement' : selectedProperty.type === 'house' ? 'Maison' : 'Terrain', icon: <HomeIcon /> },
          { label: "Adresse", value: selectedProperty.address, icon: <LocationCityIcon /> },
          { label: "Ville", value: selectedProperty.city, icon: <LocationCityIcon /> },
          { label: "Quartier", value: selectedProperty.district, icon: <LocationCityIcon /> },
        ]
      },
      {
        title: "Prix et dates",
        items: [
          { label: "Prix de vente", value: `${selectedProperty.price.toLocaleString()}€`, icon: <EuroIcon /> },
          { label: "Prix du mandat", value: `${selectedProperty.firstMandatePrice.toLocaleString()}€`, icon: <EuroIcon /> },
          { label: "Date de vente", value: formatDate(selectedProperty.saleDate), icon: <CalendarIcon /> },
          { label: "Date du mandat", value: formatDate(selectedProperty.firstMandateDate), icon: <CalendarIcon /> },
        ]
      }
    ];

    // Sections spécifiques pour les appartements et maisons
    const buildingSections = [
      {
        title: "Caractéristiques",
        items: [
          { label: "Surface", value: `${selectedProperty.surface}m²`, icon: <SquareFootIcon /> },
          { label: "État", value: translateCondition(selectedProperty.condition), icon: <ConstructionIcon /> },
          { label: "Places de parking", value: selectedProperty.parkingSpots.toString(), icon: <ParkingIcon /> },
          { label: "Année de construction", value: selectedProperty.constructionYear || "Non spécifié", icon: <ConstructionIcon /> },
        ]
      },
      {
        title: "Performance énergétique",
        items: [
          { label: "DPE", value: selectedProperty.epcElectricity || "Non spécifié", icon: <ElectricIcon /> },
          { label: "GES", value: selectedProperty.epcGes || "Non spécifié", icon: <Co2Icon /> },
        ]
      }
    ];

    // Sections spécifiques aux appartements
    const apartmentSections = [
      {
        title: "Spécificités appartement",
        items: [
          { label: "Étage", value: selectedProperty.floor || "Non spécifié", icon: <HomeIcon /> },
          { label: "Extérieur", value: translateExterior(selectedProperty.exterior), icon: <DeckIcon /> },
          { label: "Exposition", value: translateExposure(selectedProperty.exposure), icon: <ExploreIcon /> },
        ]
      }
    ];

    // Sections spécifiques aux maisons
    const houseSections = [
      {
        title: "Spécificités maison",
        items: [
          { label: "Surface du terrain", value: selectedProperty.plotSurface ? `${selectedProperty.plotSurface}m²` : "Non spécifié", icon: <TerrainIcon /> },
          { label: "Exposition", value: translateExposure(selectedProperty.exposure), icon: <ExploreIcon /> },
        ]
      }
    ];

    // Sections spécifiques aux terrains
    const landSections = [
      {
        title: "Caractéristiques du terrain",
        items: [
          { label: "Surface", value: `${selectedProperty.surface}m²`, icon: <SquareFootIcon /> },
          { label: "Assainissement", value: selectedProperty.sanitation || "Non spécifié", icon: <WaterIcon /> },
          { label: "Viabilisation", value: selectedProperty.servicing === 'yes' ? 'Oui' : 'Non', icon: <ElectricIcon /> },
        ]
      }
    ];

    // Sélection des sections en fonction du type de bien
    let detailSections = [...commonSections];
    if (selectedProperty.type === 'apartment') {
      detailSections = [...detailSections, ...buildingSections, ...apartmentSections];
    } else if (selectedProperty.type === 'house') {
      detailSections = [...detailSections, ...buildingSections, ...houseSections];
    } else if (selectedProperty.type === 'land') {
      detailSections = [...detailSections, ...landSections];
    }

    return (
      <Dialog
        open={true}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              {selectedProperty.type === 'apartment' ? <ApartmentIcon /> : 
               selectedProperty.type === 'house' ? <HouseIcon /> : <LandscapeIcon />}
              <Typography variant="h6">
                {selectedProperty.type === 'apartment' ? 'Appartement' :
                 selectedProperty.type === 'house' ? 'Maison' : 'Terrain'}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handlePrint} title="Imprimer">
                <PrintIcon />
              </IconButton>
              <IconButton onClick={handlePDF} title="Télécharger en PDF">
                <PdfIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <div ref={contentRef}>
            {detailSections.map((section) => (
              <Box key={section.title} mb={3} className="section">
                <Typography variant="h6" color="primary" gutterBottom className="section-title">
                  {section.title}
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      {section.items.map((item) => (
                        <TableRow key={item.label}>
                          <TableCell style={{ width: '40%' }}>
                            <Box display="flex" alignItems="center" gap={1}>
                              {item.icon}
                              <Typography>{item.label}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{item.value}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Fonction pour obtenir l'icône de la propriété
  const getPropertyIcon = (type: string) => {
    switch (type) {
      case 'apartment':
        return <ApartmentIcon />;
      case 'house':
        return <HouseIcon />;
      case 'land':
        return <LandscapeIcon />;
      default:
        return <HouseIcon />;
    }
  };

  return (
    <Container>
      {/* En-tête des filtres */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <FilterListIcon />
          </IconButton>
          <Typography variant="h6">Filtres de recherche</Typography>
        </Box>
        {activeFilters.length > 0 && (
          <Button
            startIcon={<ClearIcon />}
            onClick={handleResetFilters}
            color="primary"
            variant="outlined"
            size="small"
          >
            Réinitialiser
          </Button>
        )}
      </Box>

      {/* Filtres actifs */}
      {activeFilters.length > 0 && (
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {activeFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter}
              onDelete={() => handleRemoveFilter(filter)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      )}

      {/* Panneau des filtres */}
      <Collapse in={showFilters}>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Filtre Type de bien */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                fullWidth
                label="Type de bien"
                value={filters.type}
                onChange={handleFilterChange('type')}
                InputProps={{
                  startAdornment: <HouseIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              >
                <MenuItem value="">Tous les types</MenuItem>
                <MenuItem value="apartment">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ApartmentIcon /> Appartement
                  </Box>
                </MenuItem>
                <MenuItem value="house">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HouseIcon /> Maison
                  </Box>
                </MenuItem>
                <MenuItem value="land">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LandscapeIcon /> Terrain
                  </Box>
                </MenuItem>
              </TextField>
            </Grid>

            {/* Filtre Ville avec Autocomplete */}
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                fullWidth
                options={cities}
                value={filters.city}
                onChange={handleCityChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ville"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <LocationCityIcon sx={{ mr: 1, color: 'action.active' }} />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Filtres Prix */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Prix minimum"
                type="number"
                value={filters.minPrice}
                onChange={handleFilterChange('minPrice')}
                InputProps={{
                  startAdornment: <EuroIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Prix maximum"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilterChange('maxPrice')}
                InputProps={{
                  startAdornment: <EuroIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>

            {/* Filtres Surface */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Surface minimum"
                type="number"
                value={filters.minSurface}
                onChange={handleFilterChange('minSurface')}
                InputProps={{
                  startAdornment: <SquareFootIcon sx={{ mr: 1, color: 'action.active' }} />,
                  endAdornment: <Typography color="text.secondary">m²</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Surface maximum"
                type="number"
                value={filters.maxSurface}
                onChange={handleFilterChange('maxSurface')}
                InputProps={{
                  startAdornment: <SquareFootIcon sx={{ mr: 1, color: 'action.active' }} />,
                  endAdornment: <Typography color="text.secondary">m²</Typography>,
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Collapse>

      {/* Liste des résultats */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {properties.length} résultat{properties.length !== 1 ? 's' : ''} trouvé{properties.length !== 1 ? 's' : ''}
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <Typography>Chargement...</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
                onClick={() => handleOpenDialog(property)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {getPropertyIcon(property.type)}
                    <Typography variant="h6" component="div">
                      {property.type === 'apartment' ? 'Appartement' :
                       property.type === 'house' ? 'Maison' : 'Terrain'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationCityIcon color="action" />
                      <Typography>{property.city}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EuroIcon color="action" />
                      <Typography>{property.price.toLocaleString()}€</Typography>
                    </Box>
                    
                    {property.surface && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SquareFootIcon color="action" />
                        <Typography>{property.surface}m²</Typography>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {selectedProperty && <PropertyDetailsDialog />}
    </Container>
  );
};

export default PropertySearch;
