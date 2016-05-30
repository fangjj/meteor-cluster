import { Meteor } from 'meteor/meteor';
import { Cluster } from 'meteor/meteorhacks:cluster';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'microservice.test'() {
    const processorConnection = Cluster.discoverConnection('processor');
    return processorConnection.call('test');
  }
})
