import compare from 'ember';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';

import { termsFilter, getUniqueList } from 'ember-share/utils/elastic-query';


export default Component.extend({
    metrics: service(),

    category: 'filter-facets',


    selected: computed('state', function() {
        return this.get('state') || [];
    }),

    changed: computed('state', function() {
        const state = isBlank(this.get('state')) ? [] : this.get('state');
        const previousState = this.get('previousState') || [];

        if (compare(previousState, state) !== 0) {
            const value = this.get('state') || [];
            this.send('setState', value);
        }
    }),

    actions: {
        setState(selected) {
            const category = this.get('category');
            const action = 'filter';
            const label = selected;

            this.get('metrics').trackEvent({ category, action, label });

            const key = this.get('key');
            const { filter, value } = this.buildQueryObjectMatch(selected.length ? selected : []);
            this.set('previousState', this.get('state'));
            this.get('updateFacet')(key, filter, value);
        },

        toggle(type) {
            let selected = this.get('selected');
            selected = selected.includes(type) ? [] : [type];
            this.send('setState', selected);
        },
    },

    buildQueryObjectMatch(selected) {
        const newValue = !selected[0] ? [] : selected;
        const newFilter = termsFilter('types', getUniqueList(newValue));
        return { filter: newFilter, value: newValue };
    },
});
