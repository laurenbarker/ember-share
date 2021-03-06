import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import RouteHistoryMixin from 'ember-route-history/mixins/routes/route-history';


export default Route.extend(ApplicationRouteMixin, RouteHistoryMixin, {
    session: service(),

    beforeModel() {
        const session = this.get('session');
        if (!session.get('isAuthenticated')) {
            // eslint-disable-next-line ember/named-functions-in-promises
            session.authenticate('authenticator:osf-token', false).catch(() => {});
        }
    },
});
