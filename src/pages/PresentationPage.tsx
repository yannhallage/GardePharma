import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const PresentationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };
  const handleGetStarted = () => {
    navigate('/localisation');
  };

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] // cubic-bezier
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.68, -0.55, 0.27, 1.55] // backOut
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img 
                  src="https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg" 
                  alt="GardePharma Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">GardePharma</h1>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleLogin}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                Se connecter
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <motion.div 
              className="text-center lg:text-left"
              variants={heroVariants}
            >
              <motion.h2 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Trouvez votre <span className="text-blue-600">pharmacie de garde</span> en un clic
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                GardePharma révolutionne la recherche de pharmacies de garde en vous offrant 
                une solution complète et intuitive pour les urgences pharmaceutiques.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3"
                  >
                    Trouver une pharmacie
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                  >
                    En savoir plus
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Image principale */}
            <motion.div 
              className="relative"
              variants={imageVariants}
            >
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-2xl border"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://www.ville-clichy.fr/uploads/Image/4b/IMF_ACCROCHE/GAB_CLICHY/58792_024_pharmacie-de-garde.jpg" 
                  alt="Pharmacie de garde" 
                  className="w-full h-auto rounded-lg"
                />
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  variants={badgeVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  🔥 Nouveau
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça fonctionne ?
            </h3>
            <p className="text-lg text-gray-600">
              Une solution simple et efficace pour les urgences pharmaceutiques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-3xl">📍</span>
                  </motion.div>
                  <CardTitle className="text-xl">Localisation en temps réel</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Géolocalisez automatiquement votre position et trouvez les pharmacies 
                    de garde les plus proches de chez vous avec une précision optimale.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-3xl">⏰</span>
                  </motion.div>
                  <CardTitle className="text-xl">Disponibilité instantanée</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Consultez les horaires de garde, la capacité d'accueil et les services 
                    disponibles de chaque pharmacie en temps réel.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <motion.div 
                    className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-3xl">📞</span>
                  </motion.div>
                  <CardTitle className="text-xl">Contact direct</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Appelez directement la pharmacie ou obtenez l'itinéraire pour vous y rendre 
                    en un seul clic grâce à l'intégration native.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Interface intuitive
            </h3>
            <p className="text-lg text-gray-600">
              Deux modes de visualisation pour une expérience optimale
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map View */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">Mode Carte</Badge>
                <h4 className="text-xl font-semibold">Visualisation cartographique</h4>
              </div>
              <p className="text-gray-600">
                Explorez les pharmacies de garde sur une carte interactive. Visualisez leur 
                emplacement exact, les distances et les informations essentielles d'un simple coup d'œil.
                Géolocalisation précise et mise à jour en temps réel.
              </p>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Carte interactive" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 to-transparent"></div>
                  <motion.div 
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    📍 Géolocalisation
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">Carte interactive avec géolocalisation</p>
              </motion.div>
            </motion.div>

            {/* Cards View */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
              whileHover={{ x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-green-100 text-green-800">Mode Cartes</Badge>
                <h4 className="text-xl font-semibold">Vue détaillée</h4>
              </div>
              <p className="text-gray-600">
                Consultez les pharmacies sous forme de cartes détaillées avec toutes les 
                informations importantes : horaires, services, notes et contacts. Filtrage 
                intelligent et tri personnalisable.
              </p>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="https://www.ville-clichy.fr/uploads/Image/4b/IMF_ACCROCHE/GAB_CLICHY/58792_024_pharmacie-de-garde.jpg" 
                    alt="Cartes détaillées" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/40 to-transparent"></div>
                  <motion.div 
                    className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-green-600"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    📋 Informations
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">Cartes détaillées avec filtres</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image d'expérience */}
            <motion.div 
              className="relative"
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-xl border">
                <img 
                  src="https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Expérience utilisateur GardePharma" 
                  className="w-full h-auto rounded-lg"
                />
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                  variants={badgeVariants}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  ✨ Expérience optimale
                </motion.div>
              </div>
            </motion.div>

            {/* Contenu */}
            <motion.div 
              className="space-y-6"
              variants={itemVariants}
            >
              <h3 className="text-3xl font-bold text-gray-900">
                Une expérience utilisateur exceptionnelle
              </h3>
              <p className="text-lg text-gray-600">
                GardePharma a été conçu pour offrir une expérience fluide et intuitive. 
                Que vous soyez en urgence ou que vous planifiez à l'avance, notre application 
                vous guide vers la solution la plus adaptée.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-sm border"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-blue-600 text-sm">⚡</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-sm">Interface rapide</h4>
                      <p className="text-xs text-gray-500">Chargement instantané</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-sm border"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-green-600 text-sm">🎯</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-sm">Précision GPS</h4>
                      <p className="text-xs text-gray-500">Localisation exacte</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-sm border"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-purple-600 text-sm">📱</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-sm">Mobile first</h4>
                      <p className="text-xs text-gray-500">Optimisé mobile</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-4 rounded-lg shadow-sm border"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="text-orange-600 text-sm">🔄</span>
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-sm">Temps réel</h4>
                      <p className="text-xs text-gray-500">Mise à jour continue</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir GardePharma ?
            </h3>
            <p className="text-lg text-gray-600">
              Une solution complète pour les urgences pharmaceutiques
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors group"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl">⚡</span>
              </motion.div>
              <h4 className="font-semibold mb-2">Rapide</h4>
              <p className="text-sm text-gray-600">Trouvez une pharmacie en quelques secondes</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors group"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl">🎯</span>
              </motion.div>
              <h4 className="font-semibold mb-2">Précis</h4>
              <p className="text-sm text-gray-600">Informations fiables et à jour</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors group"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl">📱</span>
              </motion.div>
              <h4 className="font-semibold mb-2">Mobile</h4>
              <p className="text-sm text-gray-600">Optimisé pour tous les appareils</p>
            </motion.div>

            <motion.div 
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors group"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl">🆓</span>
              </motion.div>
              <h4 className="font-semibold mb-2">Gratuit</h4>
              <p className="text-sm text-gray-600">Service entièrement gratuit</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600 relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-3xl font-bold text-white mb-4">
            Prêt à trouver votre pharmacie de garde ?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'utilisateurs qui font confiance à GardePharma pour leurs urgences pharmaceutiques
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Commencer maintenant
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <motion.div 
                className="flex items-center space-x-3 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img 
                    src="https://media.designrush.com/inspiration_images/549120/conversions/Pharma_ee5626592827-desktop.jpg" 
                    alt="GardePharma Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-semibold">GardePharma</h4>
              </motion.div>
              <p className="text-gray-400 text-sm">
                Votre partenaire de confiance pour les urgences pharmaceutiques.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Fonctionnalités</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Géolocalisation</li>
                <li>Horaires de garde</li>
                <li>Contact direct</li>
                <li>Itinéraires</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Aide</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Signalement</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Légal</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Mentions légales</li>
                <li>Confidentialité</li>
                <li>CGU</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 GardePharma. Tous droits réservés.
            </p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default PresentationPage; 