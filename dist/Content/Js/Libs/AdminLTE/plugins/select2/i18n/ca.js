!function(){if(jQuery&&jQuery.fn&&jQuery.fn.select2&&jQuery.fn.select2.amd)var e=jQuery.fn.select2.amd;return e.define("select2/i18n/ca",[],function(){return{errorLoading:function(){return"La càrrega ha fallat"},inputTooLong:function(e){var t=e.input.length-e.maximum,n="Si us plau, elimina "+t+" car";return n+=1==t?"àcter":"àcters"},inputTooShort:function(e){var t=e.minimum-e.input.length,n="Si us plau, introdueix "+t+" car";return n+=1==t?"àcter":"àcters"},loadingMore:function(){return"Carregant més resultats…"},maximumSelected:function(e){var t="Només es pot seleccionar "+e.maximum+" element";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No s'han trobat resultats"},searching:function(){return"Cercant…"}}}),{define:e.define,require:e.require}}();