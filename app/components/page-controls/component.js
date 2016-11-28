import Ember from 'ember';

export default Ember.Component.extend({
    atFirstPage: Ember.computed.equal('page', 1),

    atLastPage: Ember.computed('page', 'totalPages', function() {
        return this.get('page') === this.get('totalPages');
    }),

    pageLinks: Ember.computed('page', 'totalPages', function() {
        const radius = 2;
        const page = this.get('page');
        const total = this.get('totalPages');
        const pages = [1];
        if (page > radius + 2) {
            pages.push(null);
        }
        for (let i = Math.max(page - radius, 2); i <= Math.min(page + radius, total); i++) {
            pages.push(i);
        }
        if (page + radius + 1 < total) {
            pages.push(null);
        }
        if (page + radius < total) {
            pages.push(total);
        }
        return pages;
    }),

    actions: {
        loadPage(page) {
            this.get('loadPage')(page);
        },

        prevPage() {
            this.get('loadPage')(this.get('page') - 1);
        },

        nextPage() {
            this.get('loadPage')(this.get('page') + 1);
        }
    }
});