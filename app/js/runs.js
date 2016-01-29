'use strict';

angular.module('myApp.runs', [])
        .run(['$rootScope', '$http', function ($rootScope, $http) {

                $rootScope.perso = {};

                $rootScope.perso.budget = 11;

                $http.get('data/types.json').success(function (data) {
                    $rootScope.listeTypes = data;
                    $rootScope.perso.type = $rootScope.listeTypes["humain"];
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

                //Types
                $rootScope.perso.changeType = function (type) {
                    this.budget = 10 - parseInt(type.cout);
                    this.type = type;
                    this.allegeance = $rootScope.listeAllegeances["Sans"];
                    this.specialite = $rootScope.listeSpecialites["Sans"];
                    this.competences = {};
                    this.pouvoirInhumain = $rootScope.listePouvoirsInhumains["Autre"];
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

                // Allegeances
                $rootScope.perso.changeAllegeance = function (allegeance) {
                    this.budget = 10 - parseInt(this.type.cout) - parseInt(allegeance.cout);
                    this.allegeance = allegeance;
                    this.competences = {};
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
                    this.specialite = specialite;
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
                    this.budget = this.budget + parseInt(this.pouvoirInhumain.cout) - parseInt(pouvoirInhumain.cout);
                    this.pouvoirInhumain = pouvoirInhumain;
                };

                $rootScope.perso.isPouvoirInhumainSelected = function (pouvoirInhumain) {
                    return (pouvoirInhumain === this.pouvoirInhumain);
                };

                //Compétences
                $rootScope.perso.haveAcccessExpertComp = function () {
                    return (this.type === $rootScope.listeTypes["prodige"] || this.type === $rootScope.listeTypes["humain"]);
                };

                $rootScope.perso.haveAcccessProdigeComp = function () {
                    return (this.type === $rootScope.listeTypes["prodige"]);
                };

                $rootScope.perso.addBasiqueComp = function (comp) {
                    if (!this.competences[comp.domaine]) {
                        this.competences[comp.domaine] = {};
                    }

                    if (!this.competences[comp.domaine][comp.nom]) {
                        this.competences[comp.domaine][comp.nom] = {};
                    }

                    if (!this.competences[comp.domaine][comp.nom]["basique"] && this.budget > 0) {
                        this.budget = this.budget - 1;

                        this.competences[comp.domaine][comp.nom]["basique"] = comp.basique;
                    }
                };

                $rootScope.perso.addAvanceComp = function (comp) {
                    this.addBasiqueComp(comp);
                    if (!this.competences[comp.domaine][comp.nom]["avance"] && this.budget > 0) {
                        this.budget = this.budget - 1;
                        this.competences[comp.domaine][comp.nom]["avance"] = comp.avance;
                    }
                };

                $rootScope.perso.addExpertComp = function (comp) {
                    this.addAvanceComp(comp);
                    if (!this.competences[comp.domaine][comp.nom]["expert"] && this.budget > 0) {
                        this.budget = this.budget - 1;
                        this.competences[comp.domaine][comp.nom]["expert"] = comp.expert;
                    }
                };

                $rootScope.perso.addProdigeComp = function (comp) {
                    this.addExpertComp(comp);
                    if (!this.competences[comp.domaine][comp.nom]["prodige"] && this.budget > 0) {
                        this.budget = this.budget - 1;
                        this.competences[comp.domaine][comp.nom]["prodige"] = comp.prodige;
                    }
                };

                $rootScope.perso.removeBasiqueComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["basique"]) {
                        delete this.competences[comp.domaine][comp.nom]["basique"];
                        this.budget = this.budget + 1;
                    }

                    this.removeAvanceComp(comp);
                };

                $rootScope.perso.removeAvanceComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["avance"]) {
                        delete this.competences[comp.domaine][comp.nom]["avance"];
                        this.budget = this.budget + 1;
                    }

                    this.removeExpertComp(comp);
                };

                $rootScope.perso.removeExpertComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["expert"]) {
                        delete this.competences[comp.domaine][comp.nom]["expert"];
                        this.budget = this.budget + 1;
                    }

                    this.removeProdigeComp(comp);
                };

                $rootScope.perso.removeProdigeComp = function (comp) {
                    if (this.competences[comp.domaine][comp.nom]["prodige"]) {
                        this.budget = this.budget + 1;
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
