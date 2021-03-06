"use strict";

/**
* StarCityApp Module
*
* Description
*/
angular.module('StarCityApp')
.factory('ArrayFactory', function(){
  var _ = {};
  _.auditionsCategories = function() {
    return ['Actors','Models','Singers','Dancers',"Stunts Men","Choreographers"];
  }

  _.auditionsGenders = function() {
    return ["male","female","male&female"];
  }

  _.auditionsTypes = function() {
    return ['Movies/Film','Play','Music Videos','Documentary','Concert/Show','TV Series','Others'];
  }

  _.objToArray = function(obj) {
    var result = [];

    for(var each in obj) {
      result.push(each);
    }

    return result;
  }

  _.formatAuditions = function(data,myView = false) {
    var options = {
      enableFiltering: true,
      columnDefs: [
        {field: 'name',displayName: "Audition",cellTemplate: '<a ng-controller="AuditionsController" ui-sref="dashboard.container.auditions.view({audition_id:row.entity.id})">'+"{{row.entity.name}}"+'</a>'},
        {field: 'category',displayName:'Categories',cellTemplate:'<p>{{row.entity.category.join(",\n")}}</p>'},
        {field: 'date',displayName: "Audition Date",cellFilter:'date'},
        {field: "age.from",displayName: "Age Range",cellTemplate: '<span>{{row.entity.age.from}} - {{row.entity.age.to}}</span>'}
      ],
      data: data,
      multiSelect: true
    };

    if(!myView) {
        options.columnDefs.push({field: "apply",cellTemplate: '<button ng-disabled="userType === \'star_maker\'" ng-controller="AuditionsController" ng-click="apply(row.entity.id)">Apply</button>'});
    } else {
        var f = {field: "delete",cellTemplate: '<button ng-controller="AuditionsController" ng-click="delete(row.entity.id)">Delete</button>'};
        options.columnDefs.push(f);
    }

    return options;
  }


  return _;
})