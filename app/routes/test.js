import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findAll('manuscript');
    },

    actions: {
        queryFacetChanged(facet) {
            debugger;
        }
    }
});
