perfisSelecionados = new ReactiveDict('PerfisSelecionados');

ReactiveDict.prototype.valoresVerdadeiros = function(){
    var perfis = [];
    var keys = this.keys;
    var self = this;

    Object.keys(keys).forEach(function(key){
      if (self.get(key)){
        perfis.push(key);
      }
    }); 

    return perfis;
}

Template.selecionarPerfis.onRendered(function(){

    var swpSelecionarPerfis = new Swiper('.selecionar-perfis', {
        slidesPerColumn: 1,
        paginationClickable: true,
        spaceBetween: 0,
        slidesPerView: 'auto',     
    });		

    var templatesPerfil = {};
    var self = this;

    this.perfilObserver = Perfis.find({userId: Meteor.userId()}).observeChanges({
        added: function(id, fields){  
            var doc = function(){
                return Perfis.findOne({_id:id});
            }

            swpSelecionarPerfis.appendSlide('<div class="swiper-slide" id="slide-perfil-' + id + '"></div>');
            var parentSlidePerfil = self.$('#slide-perfil-' + id).get(0);
            templatesPerfil[id] = Blaze.renderWithData(Template.perfilItem, doc, parentSlidePerfil);

            swpSelecionarPerfis.update(true);
        },
        removed: function(id){
            var slideAvatar = self.$('#slide-perfil-' + id).index();

            $("#slide-perfil" + id).fadeOut(function(){
                swpSelecionarPerfis.removeSlide(slideAvatar);  
                swpSelecionarPerfis.update(true);
                Blaze.remove(templatesPerfil[_id]);
            });
        },
        changed:function(doc){
            
        }
    });
})

Template.perfilItem.events({
    'click .social-icon':function(e,tmpl){
        var perfilId = tmpl.data._id;

        perfisSelecionados.set(perfilId, !perfisSelecionados.get(perfilId));
    }
})

Template.perfilItem.helpers({
    selecionado:function(){
        var perfilId = Template.instance().data._id;

        return perfisSelecionados.equals(perfilId,true);
    }
})
Template.selecionarPerfis.onDestroyed(function(){
    this.perfilObserver.stop();
})
