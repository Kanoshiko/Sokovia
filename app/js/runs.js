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
                    $rootScope.perso.faction = $rootScope.listeFactions["autres"];
                });

                $http.get('data/specialites.json').success(function (data) {
                    $rootScope.listeSpecialites = data;
                    $rootScope.perso.specialite = $rootScope.listeSpecialites["sans"];
                });

                $http.get('data/competences.json').success(function (data) {
                    $rootScope.listeCompetences = data;
                    $rootScope.perso.competences = {};
                });

                //Types
                $rootScope.perso.changeType = function (type) {
                    $rootScope.perso.budget = 10 - parseInt(type.cout);
                    $rootScope.perso.type = type;
                    $rootScope.perso.specialite = $rootScope.listeSpecialites["sans"];
                    $rootScope.perso.competences = {};
                };

                $rootScope.perso.isTypeSelected = function (type) {
                    return (type === $rootScope.perso.type);
                };

                // Factions
                $rootScope.perso.changeFaction = function (faction) {
                    $rootScope.perso.budget = $rootScope.perso.budget + parseInt($rootScope.perso.faction.cout) - parseInt(faction.cout);
                    $rootScope.perso.faction = faction;
                };

                $rootScope.perso.isFactionSelected = function (faction) {
                    return (faction === $rootScope.perso.faction);
                };

                //Specialites
                $rootScope.perso.changeSpecialite = function (specialite) {
                    $rootScope.perso.budget = 10 - parseInt($rootScope.perso.type.cout) - parseInt(specialite.cout);
                    $rootScope.perso.specialite = specialite;
                    $rootScope.perso.competences = {};
                };

                $rootScope.perso.isSpecialiteSelected = function (specialite) {
                    return (specialite === $rootScope.perso.specialite);
                };

                //Compétences
                $rootScope.perso.haveAcccessExpertComp = function () {
                    return ($rootScope.perso.type === $rootScope.listeTypes["prodige"] || $rootScope.perso.type === $rootScope.listeTypes["humain"]);
                };

                $rootScope.perso.haveAcccessSurhumainComp = function () {
                    return ($rootScope.perso.type === $rootScope.listeTypes["prodige"] || $rootScope.perso.type === $rootScope.listeTypes["augmente"]);
                };

                $rootScope.perso.addBasiqueComp = function (comp) {
                    if (!$rootScope.perso.competences[comp.nom.toString() + "1"] && $rootScope.perso.budget > 0) {
                        $rootScope.perso.budget = $rootScope.perso.budget - 1;
                        $rootScope.perso.competences[comp.nom.toString() + "1"] = comp.nom + " - basique : " + comp.basique;
                    }
                };

                $rootScope.perso.addAvanceComp = function (comp) {
                    $rootScope.perso.addBasiqueComp(comp);
                    if (!$rootScope.perso.competences[comp.nom.toString() + "2"] && $rootScope.perso.budget > 0) {
                        $rootScope.perso.budget = $rootScope.perso.budget - 1;
                        $rootScope.perso.competences[comp.nom.toString() + "2"] = comp.nom + " - avance : " + comp.avance;
                    }
                }

                $rootScope.perso.addExpertComp = function (comp) {
                    $rootScope.perso.addAvanceComp(comp);
                    if (!$rootScope.perso.competences[comp.nom.toString() + "3"] && $rootScope.perso.budget > 0) {
                        $rootScope.perso.budget = $rootScope.perso.budget - 1;
                        $rootScope.perso.competences[comp.nom.toString() + "3"] = comp.nom + " - expert : " + comp.expert;
                    }
                }

                $rootScope.perso.addSurhumainComp = function (comp) {
                    if ($rootScope.perso.type !== $rootScope.listeTypes["augmente"]) {
                        $rootScope.perso.addExpertComp(comp);
                        if (!$rootScope.perso.competences[comp.nom.toString() + "4"] && $rootScope.perso.budget > 0) {
                            $rootScope.perso.budget = $rootScope.perso.budget - 1;
                            $rootScope.perso.competences[comp.nom.toString() + "4"] = comp.nom + " - surhumain : " + comp.surhumain;
                        }
                    } else {
                        if (!$rootScope.perso.competences[comp.nom.toString() + "4"] && $rootScope.perso.budget > 0) {
                            $rootScope.perso.budget = $rootScope.perso.budget - 1;
                            $rootScope.perso.competences[comp.nom.toString() + "4"] = comp.nom + " - surhumain : " + comp.surhumain;
                        }
                    }
                }

                $rootScope.perso.removeBasiqueComp = function (comp) {
                    if ($rootScope.perso.competences[comp.nom.toString() + "1"]) {
                        delete $rootScope.perso.competences[comp.nom.toString() + "1"];
                        $rootScope.perso.budget = $rootScope.perso.budget + 1;
                    }

                    $rootScope.perso.removeAvanceComp(comp);
                };

                $rootScope.perso.removeAvanceComp = function (comp) {
                    if ($rootScope.perso.competences[comp.nom.toString() + "2"]) {
                        delete $rootScope.perso.competences[comp.nom.toString() + "2"];
                        $rootScope.perso.budget = $rootScope.perso.budget + 1;
                    }

                    $rootScope.perso.removeExpertComp(comp);
                }

                $rootScope.perso.removeExpertComp = function (comp) {
                    if ($rootScope.perso.competences[comp.nom.toString() + "3"]) {
                        delete $rootScope.perso.competences[comp.nom.toString() + "3"];
                        $rootScope.perso.budget = $rootScope.perso.budget + 1;
                    }

                    if ($rootScope.perso.type !== $rootScope.listeTypes["augmente"]) {
                        $rootScope.perso.removeSurhumainComp(comp);
                    }
                }

                $rootScope.perso.removeSurhumainComp = function (comp) {
                    if ($rootScope.perso.competences[comp.nom.toString() + "4"]) {
                        $rootScope.perso.budget = $rootScope.perso.budget + 1;
                        delete $rootScope.perso.competences[comp.nom.toString() + "4"];
                    }
                }

                $rootScope.perso.haveBasiqueComp = function (comp) {
                    return $rootScope.perso.competences[comp.nom + "1"];
                };

                $rootScope.perso.haveAvanceComp = function (comp) {
                    return $rootScope.perso.competences[comp.nom + "2"];
                };

                $rootScope.perso.haveExpertComp = function (comp) {
                    return $rootScope.perso.competences[comp.nom + "3"];
                };

                $rootScope.perso.haveSurhumainComp = function (comp) {
                    return $rootScope.perso.competences[comp.nom + "4"];
                };
            }]);
