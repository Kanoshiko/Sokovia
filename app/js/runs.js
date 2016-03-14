'use strict';

angular.module('myApp.runs', [])
        .run(['$rootScope', '$http', function ($rootScope, $http) {

                $rootScope.perso = {};

                $rootScope.perso.budget = 11;

                $rootScope.perso.comp_bonus = {
                    "Commun": 0,
                    "Martial": 0,
                    "Technique": 0,
                    "Scientifique": 0,
                    "Diplomatique": 0,
                    "Criminel": 0,
                    "Artistique": 0
                };

                $rootScope.perso.comp_bonus_max = {
                    "Commun": 0,
                    "Martial": 0,
                    "Technique": 0,
                    "Scientifique": 0,
                    "Diplomatique": 0,
                    "Criminel": 0,
                    "Artistique": 0
                };

                $http.get('data/types.json').success(function (data) {
                    $rootScope.listeTypes = data;
                    $rootScope.perso.type = $rootScope.listeTypes["humain"];
                });

                $http.get('data/limitations.json').success(function (data) {
                    $rootScope.listeLimitations = data;
                    $rootScope.perso.limitation = $rootScope.listeLimitations["Sans"];
                });

                $http.get('data/factions.json').success(function (data) {
                    $rootScope.listeFactions = data;
                    $rootScope.perso.faction = $rootScope.listeFactions["Autres"];
                });

                $http.get('data/allegeances.json').success(function (data) {
                    $rootScope.listeAllegeances = data;
                    $rootScope.perso.allegeance = $rootScope.listeAllegeances["Sans"];
                });

                $http.get('data/specialites.json').success(function (data) {
                    $rootScope.listeSpecialites = data;
                    $rootScope.perso.specialite = $rootScope.listeSpecialites["Sans"];
                });

                $http.get('data/competences.json').success(function (data) {
                    $rootScope.listeCompetences = data;
                    $rootScope.perso.competences = {};
                });

                $http.get('data/pouvoirs_inhumains.json').success(function (data) {
                    $rootScope.listePouvoirsInhumains = data;
                    $rootScope.perso.pouvoirInhumain = $rootScope.listePouvoirsInhumains["Autre"];
                });

                $http.get('data/pouvoirs_augmentes.json').success(function (data) {
                    $rootScope.listePouvoirsAugmentes = data;
                    $rootScope.perso.pouvoirAugmente = {};
                });

                $http.get('data/pouvoirs_mystiques.json').success(function (data) {
                    $rootScope.listePouvoirsMystiques = data;
                    $rootScope.perso.pouvoirsMystiques = {};
                });

                $http.get('data/exosquelettes.json').success(function (data) {
                    $rootScope.listeExosquelettes = data;
                    $rootScope.perso.exosquelette = $rootScope.listeExosquelettes["Autre"];
                });

                //Types
                $rootScope.perso.changeType = function (type) {
                    this.budget = 10 - parseInt(type.cout);
                    this.type = type;
                    this.allegeance = $rootScope.listeAllegeances["Sans"];
                    this.specialite = $rootScope.listeSpecialites["Sans"];
                    this.competences = {};
                    this.pouvoirInhumain = $rootScope.listePouvoirsInhumains["Autre"];
                    this.pouvoirAugmente = {};
                    this.pouvoirMystique = {};
                    this.exosquelette = {};
                };

                $rootScope.perso.isTypeSelected = function (type) {
                    return (type === this.type);
                };

                // Factions
                $rootScope.perso.changeFaction = function (faction) {
                    this.budget = this.budget + parseInt(this.faction.cout) - parseInt(faction.cout);
                    this.faction = faction;
                };

                $rootScope.perso.isFactionSelected = function (faction) {
                    return (faction === this.faction);
                };

                // Limitations
                $rootScope.perso.changeLimitation = function (limitation) {
                    this.budget = this.budget + parseInt(this.limitation.cout) - parseInt(limitation.cout);
                    this.limitation = limitation;
                };

                $rootScope.perso.isLimitationSelected = function (limitation) {
                    return (limitation === this.limitation);
                };

                // Allegeances
                $rootScope.perso.changeAllegeance = function (allegeance) {
                    this.removeAllegeance();
                    this.addAllegeance(allegeance);
                };

                $rootScope.perso.removeAllegeance = function () {
                    this.budget = this.budget + parseInt(this.allegeance.cout);

                    if (this.allegeance.nom === "La Maggia") {
                        this.comp_bonus["Criminel"] = this.comp_bonus["Criminel"] - 2;
                        this.comp_bonus_max["Criminel"] = this.comp_bonus["Criminel"] - 2;
                    }

                    if (this.allegeance.nom === "La Main") {
                        this.comp_bonus["Martial"] = this.comp_bonus["Criminel"] - 1;
                        this.comp_bonus_max["Martial"] = this.comp_bonus["Criminel"] - 1;
                        this.comp_bonus["Artistique"] = this.comp_bonus["Artistique"] - 1;
                        this.comp_bonus_max["Artistique"] = this.comp_bonus["Artistique"] - 1;
                    }

                    if (this.allegeance.nom === "Stark Industries") {
                        if (this.type !== $rootScope.listeTypes["exosquelette"])
                        {
                            this.comp_bonus["Technique"] = this.comp_bonus["Technique"] - 2;
                            this.comp_bonus_max["Technique"] = this.comp_bonus["Technique"] - 2;
                        } else {
                            this.budget = this.budget - 2;
                        }
                    }

                    this.allegeance = $rootScope.listeAllegeances["Sans"];
                };

                $rootScope.perso.addAllegeance = function (allegeance) {
                    if(this.budget < parseInt(allegeance.cout)){
                        return;
                    }

                    this.budget = this.budget - parseInt(allegeance.cout);

                    if (allegeance.nom === "La Maggia") {
                        this.comp_bonus["Criminel"] = this.comp_bonus["Criminel"] + 2;
                        this.comp_bonus_max["Criminel"] = this.comp_bonus["Criminel"] + 2;
                    }

                    if (allegeance.nom === "La Main") {
                        this.comp_bonus["Martial"] = this.comp_bonus["Criminel"] + 1;
                        this.comp_bonus_max["Martial"] = this.comp_bonus["Criminel"] + 1;
                        this.comp_bonus["Artistique"] = this.comp_bonus["Artistique"] + 1;
                        this.comp_bonus_max["Artistique"] = this.comp_bonus["Artistique"] + 1;
                    }

                    if (this.type !== $rootScope.listeTypes["exosquelette"])
                    {
                        this.comp_bonus["Technique"] = this.comp_bonus["Technique"] + 2;
                        this.comp_bonus_max["Technique"] = this.comp_bonus["Technique"] + 2;
                    } else {
                        this.budget = this.budget + 2;
                    }

                    this.allegeance = allegeance;
                };

                $rootScope.perso.isAllegeanceSelected = function (allegeance) {
                    return (allegeance === this.allegeance);
                };

                //Specialites
                $rootScope.perso.haveAcccessSpecialite = function () {
                    return (this.type !== $rootScope.listeTypes["mystique"] && this.type !== $rootScope.listeTypes["inhumain"]);
                };

                $rootScope.perso.changeSpecialite = function (specialite) {
                    this.budget = 10 - parseInt(this.type.cout) - parseInt(specialite.cout);

                    $rootScope.perso.comp_bonus = {
                        "Commun": 0,
                        "Martial": 0,
                        "Technique": 0,
                        "Scientifique": 0,
                        "Diplomatique": 0,
                        "Criminel": 0,
                        "Artistique": 0
                    };

                    $rootScope.perso.comp_bonus_max = {
                        "Commun": 0,
                        "Martial": 0,
                        "Technique": 0,
                        "Scientifique": 0,
                        "Diplomatique": 0,
                        "Criminel": 0,
                        "Artistique": 0
                    };

                    this.comp_bonus[specialite.domaine_bonus] = this.comp_bonus[specialite.domaine_bonus] + 1;
                    this.comp_bonus_max[specialite.domaine_bonus] = this.comp_bonus_max[specialite.domaine_bonus] + 1;

                    this.specialite = specialite;

                    this.addAllegeance(this.allegeance);

                    this.competences = {};
                };

                $rootScope.perso.isSpecialiteSelected = function (specialite) {
                    return (specialite === this.specialite);
                };

                // Pouvoir inhumain
                $rootScope.perso.haveAcccessPouvoirInhumain = function () {
                    return (this.type === $rootScope.listeTypes["inhumain"]);
                };

                $rootScope.perso.changePouvoirInhumain = function (pouvoirInhumain) {
                    this.pouvoirInhumain = pouvoirInhumain;
                };

                $rootScope.perso.isPouvoirInhumainSelected = function (pouvoirInhumain) {
                    return (pouvoirInhumain === this.pouvoirInhumain);
                };

                // Pouvoir augmente
                $rootScope.perso.haveAcccessPouvoirAugmente = function () {
                    return (this.type === $rootScope.listeTypes["augmente"]);
                };

                $rootScope.perso.changePouvoirAugmente = function (pouvoirAugmente) {
                    this.pouvoirAugmente = pouvoirAugmente;
                };

                $rootScope.perso.isPouvoirAugmenteSelected = function (pouvoirAugmente) {
                    return (pouvoirAugmente === this.pouvoirAugmente);
                };

                // Pouvoir mystique
                $rootScope.perso.haveAcccessPouvoirMystique = function () {
                    return (this.type === $rootScope.listeTypes["mystique"]);
                };

                $rootScope.perso.addPouvoirMystique = function (pouvoirMystique) {
                    if (pouvoirMystique.cout <= this.budget) {
                        this.budget = this.budget - parseInt(pouvoirMystique.cout);
                        this.pouvoirsMystiques[pouvoirMystique.nom] = pouvoirMystique;
                    }
                };

                $rootScope.perso.removePouvoirMystique = function (pouvoirMystique) {
                    this.budget = this.budget + parseInt(pouvoirMystique.cout);
                    delete this.pouvoirsMystiques[pouvoirMystique.nom];
                };

                $rootScope.perso.isPouvoirMystiqueSelected = function (pouvoirMystique) {
                    if (this.pouvoirsMystiques[pouvoirMystique.nom]) {
                        return true;
                    }

                    return false;
                };

                // Exosquelette
                $rootScope.perso.haveAcccessExosquelette = function () {
                    return (this.type === $rootScope.listeTypes["exosquelette"]);
                };

                $rootScope.perso.changeExosquelette = function (exosquelette) {
                    this.exosquelette = exosquelette;
                };

                $rootScope.perso.isExosqueletteSelected = function (exosquelette) {
                    return (exosquelette === this.exosquelette);
                };

                //Compétences
                $rootScope.perso.haveAcccessExpertComp = function () {
                    return (this.type === $rootScope.listeTypes["prodige"] || this.type === $rootScope.listeTypes["humain"]);
                };

                $rootScope.perso.haveAcccessProdigeComp = function () {
                    return (this.type === $rootScope.listeTypes["prodige"]);
                };

                $rootScope.perso.achatComp = function (comp) {
                    this.budget = this.budget - this.coutComp(comp);
                };

                $rootScope.perso.libereComp = function (comp) {
                    this.budget = this.budget + this.coutComp(comp);
                };

                $rootScope.perso.coutComp = function (comp) {
                    if (comp.domaine === this.specialite.domaine_malus) {
                        return 2;
                    }
                    return 1;
                };

                $rootScope.perso.isCompGratuite = function (comp) {
                    if (this.comp_bonus[comp.domaine] > 0) {
                        return 0;
                    }

                    return this.coutComp(comp);
                };

                $rootScope.perso.addBasiqueComp = function (comp) {
                    if (!this.competences[comp.domaine]) {
                        this.competences[comp.domaine] = {};
                    }

                    if (!this.competences[comp.domaine][comp.nom]) {
                        this.competences[comp.domaine][comp.nom] = {};
                    }

                    if (!this.competences[comp.domaine][comp.nom]["basique"] && this.budget > 0) {
                        if (this.comp_bonus[comp.domaine] > 0) {
                            this.comp_bonus[comp.domaine] = this.comp_bonus[comp.domaine] - 1;
                        } else {
                            this.achatComp(comp);
                        }

                        this.competences[comp.domaine][comp.nom]["basique"] = comp.basique;
                    }
                };

                $rootScope.perso.addAvanceComp = function (comp) {
                    this.addBasiqueComp(comp);
                    if (!this.competences[comp.domaine][comp.nom]["avance"] && this.budget > 0) {
                        this.achatComp(comp);
                        this.competences[comp.domaine][comp.nom]["avance"] = comp.avance;
                    }
                };

                $rootScope.perso.addExpertComp = function (comp) {
                    this.addAvanceComp(comp);
                    if (!this.competences[comp.domaine][comp.nom]["expert"] && this.budget > 0) {
                        this.achatComp(comp);
                        this.competences[comp.domaine][comp.nom]["expert"] = comp.expert;
                    }
                };

                $rootScope.perso.addProdigeComp = function (comp) {
                    this.addExpertComp(comp);
                    if (!this.competences[comp.domaine][comp.nom]["prodige"] && this.budget > 0) {
                        this.achatComp(comp);
                        this.competences[comp.domaine][comp.nom]["prodige"] = comp.prodige;
                    }
                };

                $rootScope.perso.removeBasiqueComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["basique"]) {
                        delete this.competences[comp.domaine][comp.nom]["basique"];

                        if (this.comp_bonus[comp.domaine] < this.comp_bonus_max[comp.domaine]) {
                            this.comp_bonus[comp.domaine] = this.comp_bonus[comp.domaine] + 1;
                        } else {
                            this.libereComp(comp);
                        }
                    }

                    this.removeAvanceComp(comp);
                };

                $rootScope.perso.removeAvanceComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["avance"]) {
                        delete this.competences[comp.domaine][comp.nom]["avance"];
                        this.libereComp(comp);
                    }

                    this.removeExpertComp(comp);
                };

                $rootScope.perso.removeExpertComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["expert"]) {
                        delete this.competences[comp.domaine][comp.nom]["expert"];
                        this.libereComp(comp);
                    }

                    this.removeProdigeComp(comp);
                };

                $rootScope.perso.removeProdigeComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["prodige"]) {
                        this.libereComp(comp);
                        delete this.competences[comp.domaine][comp.nom]["prodige"];
                    }
                };

                $rootScope.perso.haveBasiqueComp = function (comp) {
                    if (this.competences[comp.domaine]) {
                        if (this.competences[comp.domaine][comp.nom]) {
                            if (this.competences[comp.domaine][comp.nom]["basique"]) {
                                return true;
                            }
                        }
                    }

                    return false;
                };

                $rootScope.perso.haveAvanceComp = function (comp) {
                    if (this.competences[comp.domaine]) {
                        if (this.competences[comp.domaine][comp.nom]) {
                            if (this.competences[comp.domaine][comp.nom]["avance"]) {
                                return true;
                            }
                        }
                    }

                    return false;
                };

                $rootScope.perso.haveExpertComp = function (comp) {
                    if (this.competences[comp.domaine]) {
                        if (this.competences[comp.domaine][comp.nom]) {
                            if (this.competences[comp.domaine][comp.nom]["expert"]) {
                                return true;
                            }
                        }
                    }

                    return false;
                };

                $rootScope.perso.haveProdigeComp = function (comp) {
                    if (this.competences[comp.domaine]) {
                        if (this.competences[comp.domaine][comp.nom]) {
                            if (this.competences[comp.domaine][comp.nom]["prodige"]) {
                                return true;
                            }
                        }
                    }

                    return false;
                };
            }]);
