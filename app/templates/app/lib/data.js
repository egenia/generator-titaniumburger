var w = {
  bons : function(){

    return [
      {
        id : 1,
        title : 'Bon',
        category_name : 'Lunette',
        category_id : 1,
        description : 'Description du bon',
        partner_name : 'Afflelou',
        partner_id : 1
      }
    ];

  },
  category : function(){

    return [
      {
        id : 1,
        name : 'Accueil',
        weight : 1
      },
      {
        id : 2,
        name : 'Catégorie 1',
        weight : 2
      }
    ];

  }
};

module.exports = w;
